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
