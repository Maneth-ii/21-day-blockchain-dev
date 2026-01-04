# Day 8 — Read-Only Smart Contract Review

## What I did
Today I reviewed my previously deployed crowdfunding smart contract with a focus on
read-only interactions and Solidity state visibility.

Due to exams, I intentionally kept the scope light while reinforcing fundamentals.

## Concepts covered
- Public state variables and auto-generated getters
- `view` vs `pure` functions
- Gas-free read operations
- How DApps read blockchain state without transactions

## Contract reviewed
- Project: Crowdfunding Smart Contract (Day 7)
- Network: Sepolia Testnet
- Tooling: Remix + Etherscan

## Key observations
- Reading `public` variables does not require gas
- Remix and Etherscan both use `view` calls under the hood
- Only state-changing functions require wallet confirmation

## Why this matters
Understanding read-only calls is essential for:
- Efficient Web3 frontends
- Better UX (no unnecessary wallet popups)
- Optimizing gas usage

## Next step
Continue building lightweight DApps and move toward ERC-20 tokens once exams are over.
