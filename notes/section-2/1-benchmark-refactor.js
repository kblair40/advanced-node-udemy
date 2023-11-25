// Each child in cluster will have 1 thread available.  Helps with benchmarking
process.env.UV_THREADPOOL_SIZE = 1;

const cluster = require("cluster");
console.log("Master:", cluster.isMaster);

if (cluster.isMaster) {
  cluster.fork(); // One child, with one thread available (UV_THREADPOOL_SIZE = 1)
  //   cluster.fork();
  //   cluster.fork();
  //   cluster.fork();
  //   cluster.fork();

  // A generally good practice is to use the same number of children as there
  //   are physical/logical cores.
} else {
  const express = require("express");
  const crypto = require("crypto");

  const app = express();

  app.get("/", (req, res) => {
    crypto.pbkdf2("a", "b", 100_000, 512, "sha512", () => {
      res.send("done");
    });
  });

  app.get("/fast", (req, res) => {
    res.send("This was fast!");
  });

  app.listen(3000);
}

// ab -c 1 -n 1 localhost:3000/
//  - 279 mean processing
