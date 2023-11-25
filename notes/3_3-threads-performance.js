/**
 * UV_THREADPOOL_SIZE
 *  - Tells node how many cores it is allowed to use
 *  - Operations tend to take a bit longer with higher values due to less processing
 *      power being available to each operation, but significantly less time overall
 *      since they can all run simultaneously.
 */

process.env.UV_THREADPOOL_SIZE = 2;

const crypto = require("crypto");

const start = Date.now();
crypto.pbkdf2("a", "b", 100_000, 512, "sha512", () => {
  console.log("1:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 100_000, 512, "sha512", () => {
  console.log("2:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 100_000, 512, "sha512", () => {
  console.log("3:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 100_000, 512, "sha512", () => {
  console.log("4:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 100_000, 512, "sha512", () => {
  console.log("5:", Date.now() - start);
});
