const mongoose = require("mongoose");

// set exec to be the exact query exec function from mongoose
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = function () {
  // All code here, before 'return exec.apply(...)' will run before a query is executed
  console.log("\nAbout to run a query");

  return exec.apply(this, arguments);
};
