const https = require("https");

const start = Date.now();

function doRequest() {
  // 'res' is an object that emits events from google servers
  https
    .request("https://www.google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log(Date.now() - start);
      });
    })
    .end();
}

/**
 * All 6 calls below will execute simultaneously, despite the 4-thread "limit".
 *
 * Libuv delegates the request making to the underlying operating system and just
 *  waits for the operating system to to respond with whatever the request returned
 *
 * The operating system will determine the thread "limit" without ever touching
 *  node's thread pool
 */

doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
