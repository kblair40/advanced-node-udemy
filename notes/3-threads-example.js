const crypto = require("crypto");

// const start = Date.now();
// crypto.pbkdf2("a", "b", 100_000, 512, "sha512", () => {
//   console.log("1:", Date.now() - start);
// });

// crypto.pbkdf2("a", "b", 100_000, 512, "sha512", () => {
//   console.log("2:", Date.now() - start);
// });

/**
 * Two important notes...
 *  1. When running this file, both calls to pbkdf2 will occur at the exact same time
 *  2. We are not modifiying the 'start' variable at all
 *      - So, instead of total time to complete being function_1_time + function_2_time,
 *          it is the total time the longest call takes to complete
 *
 * If node were truly single-threaded, the second function call would wait for the
 *  first function to complete before it would start.
 */

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
