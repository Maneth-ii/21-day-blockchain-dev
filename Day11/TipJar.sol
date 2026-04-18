// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TipJar {

    address public owner;

    struct Tip {
        address sender;
        uint amount;
        string message;
    }

    Tip[] public tips;

    event Tipped(address indexed sender, uint amount, string message);
    event Withdrawn(uint amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function sendTip(string memory _message) public payable {
        require(msg.value > 0, "Send some ETH");

        tips.push(Tip({
            sender: msg.sender,
            amount: msg.value,
            message: _message
        }));

        emit Tipped(msg.sender, msg.value, _message);
    }

    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0, "No funds");

        payable(owner).transfer(balance);

        emit Withdrawn(balance);
    }

    function getTips() public view returns (Tip[] memory) {
        return tips;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}