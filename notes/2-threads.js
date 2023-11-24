/**
 * PROCESS
 * - an instance of a program the cpu is executing
 *
 * Within a process, multiple threads can exist.
 *
 * THREAD
 * - a set of instructions that can be sent to the cpu for execution
 *
 * SCHEDULING
 * - Refers to the OS's ability to decide which thread to process at any
 *      given point in time
 *
 * METHODS FOR IMPROVING THREAD PROCESSING
 * - Adding CPU cores
 *      - One core can process more than one thread (multithreading)
 * - Examine work being done by each thread
 *      - CPU can detect when it is idle
 * - Allow OS scheduler to detect long I/O times due to expensive operations
 */
