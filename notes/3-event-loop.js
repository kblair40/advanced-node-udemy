/**
 * Every program has exactly one event loop
 *
 */

//
// Example life cycle of a node application

// node myFile.js

// pretend a file called 'myFile' is running a function called runContents()
myFile.runContents();

// Dummy helper function to tell while loop if it should executed again.
function shouldContinue() {}

// In the event loop, every execution of this loop is 1 "tick"
while (shouldContinue()) {
  // before event loop executes, node does a quick check to see if the tick should be executed
  // If it shouldn't, the program executes back to the terminal
}

// exit back to terminal
