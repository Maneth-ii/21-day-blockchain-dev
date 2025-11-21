// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleStorage {
    uint256 public storedData;

    constructor(uint256 _num) {
        storedData = _num;
    }

    function setNumber(uint256 _num) public{
        storedData = _num;
    }

    function getNumber() public view returns (uint256){
        return storedData;
    }

}