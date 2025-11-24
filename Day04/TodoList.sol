// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TodoList {
    // 1. DATA STRUCTURE: Define a custom data type for a task
    struct Task {
        uint id;
        string content;
        bool completed;
    }

    // 2. STATE VARIABLE: A dynamic array to store all Task structs
    Task[] public tasks;
    
    // 3. STATE VARIABLE: Counter to generate unique, 1-based IDs
    uint public taskCount = 0;

    // 4. EVENTS: Crucial for the front-end (DApp) to listen for updates
    event TaskCreated(uint id, string content, bool completed);
    event TaskCompleted(uint id, bool completed);

    // 5. CONSTRUCTOR: Runs only once on deployment
    constructor() {
        // Create an initial task when the contract is deployed
        createTask("Complete Day 4 of 21 Days of Blockchain Dev");
    }

    // 6. FUNCTION: Logic to create and add a new task
    function createTask(string memory _content) public {
        taskCount++;
        // .push() adds the new Task struct to the end of the tasks array
        tasks.push(Task(taskCount, _content, false)); 
        
        // Emit the event to notify the front-end
        emit TaskCreated(taskCount, _content, false);
    }
    
    // 7. FUNCTION: Logic to toggle the completion status
    // Takes the 1-based ID from the user
    function toggleCompleted(uint _id) public {
        // Find the task in storage (using storage saves gas)
        // We use _id - 1 because Solidity arrays are 0-indexed, but our IDs start at 1
        Task storage task = tasks[_id - 1]; 
        
        // Require check: Ensure the task exists before modifying it
        require(_id > 0 && _id <= taskCount, "Invalid task ID");
        
        // Flip the boolean status
        task.completed = !task.completed;
        
        // Emit the event
        emit TaskCompleted(_id, task.completed);
    }
}