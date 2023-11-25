const express = require("express");
const { Worker } = require("worker_threads");

const app = express();

app.get("/", (req, res) => {
  const worker = new Worker("./notes/section-2/worker.js");

  // message arg will be value provided to postMessage in ./worker.js
  worker.on("message", function (message) {
    console.log(message);
    res.send("" + message);
  });

  worker.postMessage("start!");
});

app.get("/fast", (req, res) => {
  res.send("Fast result");
});

app.listen(3000);

// pm2 start ./notes/section-2/3-worker-threads.js -i 0
