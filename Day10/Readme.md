# Day 10 – On-Chain Todo List Smart Contract

This project implements a decentralized Todo List using Solidity

Each user can create and manage their own tasks directly on the blockchain.

## Features

- Create tasks
- Mark tasks as completed
- Store tasks per wallet address
- Get personal task list

## Smart Contract Concepts

- Structs
- Mappings
- Arrays
- Events
- State updates

## Functions

createTask(string content)
Creates a new task for the user

completeTask(uint taskId)
Marks a task as completed

getMyTasks()
Returns all tasks created by the user

## Tools Used

- Solidity
- Remix IDE