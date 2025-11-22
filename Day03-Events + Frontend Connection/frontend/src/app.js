let web3;
let contract;
let contractAddress = "0x6541c8Be22e305469ec490D42D2a6284C3005E06";

const abi = [
  {
    "inputs": [],
    "name": "count",
    "outputs": [{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs": [],
    "name":"increment",
    "outputs": [],
    "stateMutability":"nonpayable",
    "type":"function"
  }
];

window.onload = async () => {
  try {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const networkId = await web3.eth.net.getId();
      // Ganache commonly uses network id 5777
      if (networkId !== 5777) {
        console.warn(`Connected to network ${networkId} — expected 5777 (Ganache).`);
        // Try using local HTTP provider as a fallback for reads
        try {
          const httpWeb3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
          const code = await httpWeb3.eth.getCode(contractAddress);
          if (code && code !== '0x' && code !== '0x0') {
            web3 = httpWeb3; // use HTTP provider for read calls
            console.info('Falling back to local HTTP provider at http://127.0.0.1:7545 for read-only calls.');
          } else {
            alert('Contract not found at configured address on Ganache. Switch MetaMask to Localhost:7545 or redeploy.');
            return;
          }
        } catch (e) {
          console.error('Fallback HTTP provider failed', e);
          alert('Unable to connect to Ganache local node. Ensure Ganache is running on port 7545.');
          return;
        }
      }

      contract = new web3.eth.Contract(abi, contractAddress);

      await loadCount();
    } else {
      // No injected provider — try local node
      web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
      contract = new web3.eth.Contract(abi, contractAddress);
      await loadCount();
    }
  } catch (err) {
    console.error('Initialization error', err);
    alert('Error initializing web3 or contract. See console for details.');
  }
};

async function loadCount() {
  try {
    const code = await web3.eth.getCode(contractAddress);
    if (!code || code === '0x' || code === '0x0') {
      throw new Error('No contract code at address');
    }

    const c = await contract.methods.count().call();
    document.getElementById("count").innerText = c;
  } catch (err) {
    console.error('Failed to load count:', err);
    document.getElementById("count").innerText = 'error';
  }
}

async function increment() {
  try {
    const accounts = await web3.eth.getAccounts();
    if (!accounts || accounts.length === 0) {
      alert('No accounts available. Make sure your wallet is unlocked.');
      return;
    }
    await contract.methods.increment().send({ from: accounts[0] });
    await loadCount();
  } catch (err) {
    console.error('Increment failed:', err);
    alert('Transaction failed. See console for details.');
  }
}
