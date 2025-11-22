// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Counter {
    uint public count;

    event CountIncreased(uint newCount);

    function increment() public {
        count++;
        emit CountIncreased(count);
    }
}
