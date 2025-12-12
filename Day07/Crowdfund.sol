// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Crowdfund {
    address public owner;
    uint256 public goal;
    uint256 public deadline;
    uint256 public totalFunded;

    mapping (address => uint256) public contributions;

    event Funded(address indexed contributor, uint256 amount);
    event Withdrawn(uint256 amount);
    event Refunded(address indexed contributor, uint256 amount);

    constructor(uint256 _goal, uint256 _durationMinutes) {
        owner = msg.sender;
        goal = _goal;
        deadline = block.timestamp + (_durationMinutes* 1 minutes);
    }

        function fund() external payable {
            require(block.timestamp < deadline, "Campaign Ended");
            require(msg.value > 0, "Send ETH");

            contributions[msg.sender] += msg.value;
            totalFunded += msg.value;

            emit Funded(msg.sender, msg.value);
        }

        function withdraw() external {
        require(msg.sender == owner, "Not owner");
        require(block.timestamp >= deadline, "Still active");
        require(totalFunded >= goal, "Goal not met");

        uint256 amount = address(this).balance;
        payable(owner).transfer(amount);

        emit Withdrawn(amount);
    }


    function refund() external {
        require(block.timestamp >= deadline, "Still active");
        require(totalFunded < goal, "Goal met, cannot refund");

        uint256 amount = contributions[msg.sender];
        require(amount > 0, "No contributions");

        contributions[msg.sender] = 0;
        payable(msg.sender).transfer(amount);

        emit Refunded(msg.sender, amount);
    }
}