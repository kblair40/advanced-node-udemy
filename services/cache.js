const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");

const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
client.hget = util.promisify(client.hget);
// set exec to be the exact query exec function from mongoose
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  // if key is provided on options object, set it as the query's hashKey
  this.hashKey = JSON.stringify(options.key || "");
  return this;
};

mongoose.Query.prototype.exec = async function () {
  console.log("useCache:", this.useCache);
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }
  // copy getQuery func so it's return value is not accidentally modified
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );
  //   console.log("key:", key);

  // See if we have a value for 'key' in redis
  // const cacheValue = await client.get(key);
  const cacheValue = await client.hget(this.hashKey, key);

  // If we do, return it
  if (cacheValue) {
    console.log("\nCache value:", cacheValue);

    const doc = JSON.parse(cacheValue);

    // cacheValue needs to be converted to a mongoose 'document' before returning it
    // 'this.model' is the model the query is for.
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }

  // Otherwise, issue the query and store the result
  const result = await exec.apply(this, arguments);
  console.log("\nDB Result:", result);

  client.hset(this.hashKey, key, JSON.stringify(result), "EX", 10);
  //   client.set(key, JSON.stringify(result), "EX", 10);

  return result;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};
