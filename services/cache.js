const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");

const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);
// set exec to be the exact query exec function from mongoose
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function () {
  // copy getQuery func so it's return value is not accidentally modified
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );
  //   console.log("key:", key);

  // See if we have a value for 'key' in redis
  const cacheValue = await client.get(key);

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

  client.set(key, JSON.stringify(result));

  return result;

  //   return exec.apply(this, arguments);
};
