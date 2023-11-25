const cluster = require("cluster");

//
console.log("Is Master:", cluster.isMaster);

/**
 * First time file is executed
 *  - Is the file being executed in 'master' mode?
 *    - If it is, fork it to cause it to be executed in 'slave' (aka 'child') mode
 */
if (cluster.isMaster) {
  // cause index.js to be executed *again* in 'slave' (aka 'child') mode
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
  // ^ fork 4 slave/child instances
} else {
  // Child instances here.  They will act as regular servers and do nothing else
  const express = require("express");

  const app = express();

  // Do as much cpu work as possible, for some set 'duration'
  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }

  app.get("/", (req, res) => {
    // doWork(5000) will delay the response by 5 seconds (5000ms);
    doWork(5000);
    res.send("Worked");
  });

  app.get("/fast", (req, res) => {
    // With multiple instances, this should resolve immediately.
    // With 1 instance, it will only resolve immediately if the instance isn't
    //  locked doing other work
    res.send("This was fast!");
  });

  app.listen(3000);
}
