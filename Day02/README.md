# 🚀 Day 02: Simple Wallet Contract (Payable Functions & Transfers)

## 🎯 Day's Goal

The primary objective for Day 02 was to **build a basic contract capable of holding and managing native currency (Ether)**, introducing critical concepts like payable functions, contract ownership, and safe Ether transfer.

## 🧠 Concepts Covered

* **`pragma solidity ^0.8.0`**: Defining the compiler version.
* **`payable` Keyword**: Understanding its use on addresses, functions (`receive()` and `constructor`), and the constructor to enable Ether reception.
* **State Variable (`owner`)**: Storing and initializing the address of the contract deployer (the owner) in the constructor.
* **`receive() external payable`**: The special function that executes when the contract receives Ether without a function call (plain transaction).
* **`address(this).balance`**: How to securely check the total native currency balance of the contract itself.
* **`require()`**: Using checks for security, such as verifying the caller (`msg.sender == owner`) and sufficient balance.
* **Safe Ether Transfer (`.call{value: _amount}("")`)**: Implementing the modern, low-level method for secure Ether transfer, which is best practice over `.transfer()` or `.send()`.

## 🛠️ Project Implementation

This folder contains the Truffle project, showcasing the deployment and functionality of the `SimpleWallet` contract.

### 1. Contract: `contracts/SimpleWallet.sol`

* **Purpose**: A basic Ethereum wallet that allows the creator to deposit and later withdraw Ether.
* **Key Functions**:
    * **`constructor()`**: Sets the deployer as the contract `owner`. Made `payable` to receive an initial deposit on creation.
    * **`receive()`**: Accepts inbound Ether transactions.
    * **`getBalance()`**: Returns the contract's current Ether balance.
    * **`withdraw(uint256 _amount)`**: Allows only the `owner` to send a specified amount of Ether from the contract's balance to their address.

### 2. Deployment Script: `migrations/2_deploy_wallet.js`

* The script deploys the `SimpleWallet` and sends an **initial value of 1 Ether** during deployment to demonstrate the `payable` constructor.

## 💻 How to Run This Project (Truffle & Ganache)

1.  **Start Ganache:** Open your Ganache GUI or run the CLI.
2.  **Navigate:** `cd Day02`
3.  **Compile:** `truffle compile`
4.  **Deploy (Migrate):** `truffle migrate --reset`

---
## ✨ Next Steps (Day 03)

Tomorrow, I will focus on **[Topic for Day 3, e.g., using OpenZeppelin standards, implementing token burning, or writing comprehensive JavaScript tests for this wallet contract]**.