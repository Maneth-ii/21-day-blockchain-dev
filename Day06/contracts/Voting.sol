// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public hasVoted;
    uint public candidateCount;

    constructor(string[] memory _names) {
        for (uint i = 0; i < _names.length; i++) {
            candidates[i] = Candidate(_names[i], 0);
        }
        candidateCount = _names.length;
    }

    function vote(uint candidateIndex) public {
        require(!hasVoted[msg.sender], "Already voted");
        require(candidateIndex < candidateCount, "Invalid candidate");

        hasVoted[msg.sender] = true;
        candidates[candidateIndex].voteCount++;
    }

    function getVotes(uint candidateIndex) public view returns (uint) {
        require(candidateIndex < candidateCount, "Invalid candidate");
        return candidates[candidateIndex].voteCount;
    }
}
