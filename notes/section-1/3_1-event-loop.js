/**
 * Every program has exactly one event loop
 *
 */

//
// Example life cycle of a node application

// node myFile.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// Pretend a file called 'myFile' is running a function called runContents()
// New timers, tasks, operations are recorded from myFile running
myFile.runContents();

// Dummy helper function to tell while loop if it should executed again.
function shouldContinue() {
  // 1. Check if there any functions registered with setTimeout, setInterval, or setImmediate
  //      - If yes, run those functions
  // 2. Any pending OS tasks? (ex. server listening to port)
  // 3. Any pending long running operations? (ex. fs module)
  return (
    pendingTimers.length || pendingOSTasks.length || pendingOperations.length
  );
}

// In the event loop, every execution of this loop is 1 "tick"
while (shouldContinue()) {
  // 1. Node looks at pendingTimers and sees if any functions are ready to be called
  //        - setTimeout and setIntveral only
  // 2. Node looks at pendingOSTasks and pendingOperations and calls relevant callbacks
  // 3. Node pauses execution temporarily and waits for new events to occur.
  //      Node contiues when...
  //        - a new pendingOSTask is done
  //        - a new pendingOperation is done
  //        - a timer is about to complete
  // 4. Look at pendingTimers.  Call any setImmediate
  // 5. Handle any 'close' events
}

// exit back to terminal
