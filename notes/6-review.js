/**
 * Basic process of a node module being executed
 *
 * 1. All modules being "required" are executed
 * 2. Event Loop begins
 *   - First checks timers, OS tasks and threadpools for any potential tasks
 *     - If none exist, exit the program
 *     - If any do exist, execute them
 *   - Pause.  Wait for stuff to happen.  Ex. task(s) to complete or a timer to expire
 *   - Run any setImmediate functions
 *   - Handle 'close' events
 * 3. Go back to start of loop, indefinitely
 */
