// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TodoList {

    struct Task {
        uint id;
        string content;
        bool completed;
    }

    mapping(address => Task[]) public userTasks;

    event TaskCreated(address user, uint taskId, string content);
    event TaskCompleted(address user, uint taskId);

    function createTask(string memory _content) public {
        uint taskId = userTasks[msg.sender].length;

        userTasks[msg.sender].push(
            Task({
                id: taskId,
                content: _content,
                completed: false
            })
        );

        emit TaskCreated(msg.sender, taskId, _content);
    }

    function completeTask(uint _taskId) public {
        require(_taskId < userTasks[msg.sender].length, "Task does not exist");

        userTasks[msg.sender][_taskId].completed = true;

        emit TaskCompleted(msg.sender, _taskId);
    }

    function getMyTasks() public view returns (Task[] memory) {
        return userTasks[msg.sender];
    }
}