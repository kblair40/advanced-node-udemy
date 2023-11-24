const crypto = require("crypto");

crypto.pbkdf2("a", "b", 100_000, 512, "sha512", () => {
  //
});
