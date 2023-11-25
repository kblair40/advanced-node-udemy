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

app.listen(3000);
