# Simple Solidity Lottery

A fully decentralized, transparent on-chain lottery built with Solidity.

Players pay exactly **1 ETH** to enter.  
When there are **at least 3 players**, the manager can pick a random winner who receives **100% of the contract balance**.

Warning: This is an educational/example contract. It uses `block.difficulty` + `block.timestamp` as a source of randomness which is **not secure** against miner manipulation. For production use, integrate Chainlink VRF or another verifiable randomness solution.

## Features
- Only 1 ETH entry fee  
- Manager-only functions protected  
- View contract balance (manager only)  
- Simple & clean code – perfect for learning Solidity  
- Compatible with Solidity 0.7.x – 0.8.x  

## How It Works

1. Manager deploys the contract
2. Players call `participate()` and send exactly 1 ETH
3. Once ≥3 players have entered, manager calls `pickWinner()`
4. A winner is selected (pseudo-random)
5. Winner receives the entire contract balance
6. Contract resets for the next round

## Functions

| Function         | Description                       | Access         |
|------------------|-----------------------------------|----------------|
| `participate()`  | Enter lottery (send 1 ETH)        | Public         |
| `getBalance()`   | View contract balance             | Manager only   |
| `pickWinner()`   | Pick winner & send prize          | Manager only   |
