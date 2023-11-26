const mongoose = require("mongoose");

// set exec to be the exact query exec function from mongoose
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = function () {
  // All code here, before 'return exec.apply(...)' will run before a query is executed
  console.log("\nAbout to run a query");

  // 'this' is the current query
  console.log("Query:", this.getQuery());
  console.log("collection", this.mongooseCollection.name);

  // copy getQuery func so it's return value is not accidentally modified
  const key = Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name,
  });
  console.log("key:", key);

  return exec.apply(this, arguments);
};
