# 🚀 Day 02: Simple Storage Contract (State Management & Initial Deployment)

## 🎯 Day's Goal

The primary objective for Day 02 was to **implement and manage persistent state within a basic smart contract**, focusing on initializing data via the constructor and allowing external functions to modify and view that data.

## 🧠 Concepts Covered

* **`pragma solidity ^0.8.19`**: Defining the specific compiler version used.
* **State Variable (`uint256 public storedData`)**: Understanding how data is stored permanently on the blockchain. The `public` keyword automatically creates a getter function.
* **`constructor(uint256 _num)`**: The function that runs only once upon deployment, used here to **initialize** the `storedData`.
* **`setNumber(uint256 _num)`**: A **transaction** function used to modify the contract's state (`storedData`).
* **`getNumber() public view returns (uint256)`**: A **call** function that reads state but does not cost gas or modify the blockchain, indicated by the `view` keyword.

## 🛠️ Project Implementation

This folder contains the Truffle project, focusing on the deployment and functionality of the `SimpleStorage` contract.

### 1. Contract: `contracts/SimpleStorage.sol`

* **Purpose**: A fundamental contract used to demonstrate reading from and writing to the blockchain state.
* **Key Functions**:
    * **`constructor()`**: Initializes the `storedData` state variable with a number provided at the time of deployment.
    * **`setNumber()`**: Updates the `storedData` to a new number.
    * **`getNumber()`**: Returns the current value of `storedData`.

### 2. Deployment Script: `migrations/2_deploy_simplestorage.js`

* **Example Deployment:** The migration script should deploy the contract and pass an initial number (e.g., `100`) to the constructor.

    *Example Migration Script Content:*
    ```javascript
    const SimpleStorage = artifacts.require("SimpleStorage");

    module.exports = function (deployer) {
      // Deploy the SimpleStorage contract and initialize storedData with 100.
      deployer.deploy(SimpleStorage, 100);
    };
    ```

## 💻 How to Run This Project (Truffle & Ganache)

1.  **Start Ganache:** Open your Ganache GUI or run the CLI.
2.  **Navigate:** `cd Day02`
3.  **Compile:** `truffle compile`
4.  **Deploy (Migrate):** `truffle migrate --reset`
