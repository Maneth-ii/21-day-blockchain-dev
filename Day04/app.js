// app.js

// 1. **REPLACE THIS** with the ABI array copied from Remix (TodoList.json)
const TODO_LIST_ABI = 
    [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_content",
				"type": "string"
			}
		],
		"name": "createTask",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "completed",
				"type": "bool"
			}
		],
		"name": "TaskCompleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "content",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "completed",
				"type": "bool"
			}
		],
		"name": "TaskCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "toggleCompleted",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "taskCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tasks",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "content",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "completed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
;

const TODO_LIST_ADDRESS = "0x7fc3d163f16773e66ff97460424acdfed3379de2";
let web3;
let todoList;
let appAccount;

// --- INITIALIZATION ---
window.addEventListener('load', async () => {
    // Modern dApp browsers (MetaMask, Trust, etc.)
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            // 1. Request account access (triggers MetaMask pop-up)
            // This is the correct modern way and also returns the accounts
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // 2. RETRIEVE ACCOUNTS USING THE CORRECT API
            const accounts = await web3.eth.getAccounts(); // **CORRECTED LINE**
            
            // Handle cases where accounts array might be empty
            if (accounts.length === 0) {
                 throw new Error("No accounts available after connection request.");
            }
            
            appAccount = accounts[0];
            document.getElementById('account-address').innerText = appAccount;
            await loadContract();
            return;
        } catch (error) {
            console.error("Connection error or User rejected request:", error);
            // This alert is what you saw initially
            alert("Please connect to MetaMask and select an account."); 
        }
    }
    // Legacy dApp browsers
    else if (window.web3) {
        web3 = new Web3(web3.currentProvider);
        const accounts = await web3.eth.getAccounts();
        appAccount = accounts[0];
        document.getElementById('account-address').innerText = appAccount;
        await loadContract();
        return;
    }
    // No wallet detected
    else {
        alert("No Ethereum wallet detected! Please install MetaMask: https://metamask.io");
        // Optional: add a nice button to install
        document.getElementById('account-address').innerHTML = 
            '<a href="https://metamask.io" target="_blank" style="color:red;">Install MetaMask →</a>';
    }
});
// --- LOAD CONTRACT INSTANCE ---
async function loadContract() {
    // Instantiate the contract using the ABI and the Address
    todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
    await renderTasks();
}

// --- RENDER FUNCTIONS ---
async function renderTasks() {
    const taskCount = await todoList.methods.taskCount().call();
    const $taskList = document.getElementById('taskList');
    $taskList.innerHTML = ''; // Clear the list

    for (let i = 1; i <= taskCount; i++) {
        // Call the public getter for the tasks array
        const task = await todoList.methods.tasks(i - 1).call();
        
        const content = task.content;
        const completed = task.completed;

        // Build HTML for the task
        const $li = document.createElement('li');
        $li.innerHTML = `
            <input type="checkbox" id="task-${task.id}" ${completed ? 'checked' : ''} 
                   onclick="App.toggleCompleted(${task.id})">
            <label style="text-decoration: ${completed ? 'line-through' : 'none'}">${content}</label>
        `;
        $taskList.appendChild($li);
    }
}

// --- TRANSACTION FUNCTIONS ---
const App = {
    createTask: async (e) => {
        e.preventDefault();
        const content = document.getElementById('newTask').value;
        if (!content) return;

        try {
            // Send the transaction (this triggers MetaMask)
            await todoList.methods.createTask(content).send({ from: appAccount,gas: '500000' });
            document.getElementById('newTask').value = '';
            await renderTasks(); // Re-render the list after transaction is mined
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed! Check console for details.");
        }
    },
    
    toggleCompleted: async (id) => {
        try {
            // Send the transaction to flip the status
            await todoList.methods.toggleCompleted(id).send({ from: appAccount,gas: '500000' });
            await renderTasks(); // Re-render the list after transaction is mined
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Toggle failed! Check console for details.");
        }
    }
};