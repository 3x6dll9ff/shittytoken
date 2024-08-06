// connectWallet.js

export const connectWallet = async (onAccountConnected) => {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (onAccountConnected) {
                onAccountConnected(accounts[0]);
            }
        } catch (error) {
            console.error(error);
        }
    } else {
        alert('Please download MetaMask extension');
    }
};

