# Day 03 — Truffle Counter DApp

This is my **Day 3 project** from the [21 Days of Blockchain Development](https://github.com/) challenge!
We built a simple **Counter DApp** using **Truffle, Ganache, and Web3.js**.

---

## ✅ Project Overview

* **Smart Contract:** Counter.sol

  * Stores a number `count`
  * Can increment count
  * Emits events on increment
* **Frontend:** HTML + JavaScript

  * Interacts with the contract using Web3.js
  * Displays current count
  * Button to increment count

---

## 🔹 Folder Structure

```
Day03/
├── contracts/
│   └── Counter.sol
├── migrations/
│   └── 2_deploy_counter.js
├── src/
│   ├── index.html
│   └── app.js
├── test/
├── truffle-config.js
└── README.md
```

---

## 🔹 How to Run Locally

1. **Clone the repository**:

```bash
git clone https://github.com/YOUR_USERNAME/21DaysOfBlockchain.git
cd 21DaysOfBlockchain/Day03
```

2. **Install dependencies** (Truffle & Ganache required):

```bash
npm install -g truffle
```

3. **Compile contracts**:

```bash
truffle compile
```

4. **Start Ganache**:

```bash
ganache
```

5. **Deploy contracts**:

```bash
truffle migrate --reset
```

6. **Open frontend**:

* Open `src/index.html` in browser
  OR
* Use **Live Server** in VS Code

---

## 🔹 Built With

* [Solidity](https://docs.soliditylang.org/) — Smart contract language
* [Truffle](https://www.trufflesuite.com/) — Development framework
* [Ganache](https://trufflesuite.com/ganache/) — Local blockchain
* [Web3.js](https://web3js.readthedocs.io/) — Frontend blockchain interaction
* [VS Code](https://code.visualstudio.com/) — Editor

---

## 🔹 Author

**Maneth Bandara**

* 21 Days of Blockchain Developer
* [GitHub](https://github.com/maneth-ii)
* [LinkedIn](https://www.linkedin.com/in/maneth-bandara-133a0a20a/)

---
