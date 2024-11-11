import { BigNumber, ethers } from 'ethers';
import { FUJI_CHAIN_ID, FUJI_PROVIDER, NETWORK_LIST } from '../constant';

export const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export const formatAddressLong = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
}

export const formatBalance = (balance: string) => {
    if (!balance) return '';
    return `${balance.slice(0, 6)}`;
}

export const getETHBalance = async (account: string): Promise<string> => {
    if (!window.ethereum) {
        throw new Error("Ethereum provider is not available");
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const balance = await provider.getBalance(account);
    return ethers.utils.formatEther(balance); // Convert balance to a string in ETH
};

export const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
}

export const updateURLParameter = (param: string, value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set(param, value);
    window.location.href = url.toString();
    window.history.pushState({}, '', url.toString());
};


export const get_network = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const networkParam = urlParams.get('network');
    if (networkParam) {
        const foundNetwork = NETWORK_LIST.find(net => net.name.toLowerCase() === networkParam);
        return foundNetwork;
    }
    return NETWORK_LIST[0];
}

export const truncateText = (text: string, maxLength: number = 100) => {
    if (!text) return "Not provided";
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
};


export const estimateFee = async (provider: any, contractAddress: string, encodedData: string) => {
    const gasEstimate = await provider.estimateGas({
        to: contractAddress,
        data: encodedData
    });

    const gasPrice = await provider.getGasPrice();
    console.log(gasPrice.toString());

    const gasCostInWei = gasEstimate.mul(gasPrice);

    // Convert gas cost to Ether
    return ethers.utils.formatEther(gasCostInWei);
}

export async function urlToFile(imageUrl) {
    try {
        // Fetch the image
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        // Create file name from URL or use a default name
        const fileName = imageUrl.split('/').pop() || 'image.jpg';

        // Create File object
        const file = new File([blob], fileName, { type: blob.type });
        return file;
    } catch (error) {
        console.error('Error converting URL to File:', error);
        return null;
    }
}

export const base64toUrl = (base64: string) => {
    return `data:image/svg+xml;base64,${base64}`
}

export const checkFujiNetwork = async () => {
    const currentChainId = await window.ethereum?.request({ method: 'eth_chainId' });
    if (currentChainId !== FUJI_CHAIN_ID) {
        try {
            await window.ethereum?.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: FUJI_CHAIN_ID }],
            });
        } catch (err) {
            if (err.code === 4902) {
                await window.ethereum?.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: FUJI_CHAIN_ID,
                            chainName: 'Avalanche Fuji Testnet',
                            nativeCurrency: {
                                name: 'AVAX',
                                symbol: 'AVAX',
                                decimals: 18,
                            },
                            rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
                            blockExplorerUrls: ['https://testnet.snowtrace.io/'],
                        },
                    ],
                });
                await window.ethereum?.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: FUJI_CHAIN_ID }],
                });
            }
        }
    }
}

export const getERC20Balance = async (account: string, contractAddress: string): Promise<string> => {
    if (!window.ethereum) {
        throw new Error("Ethereum provider is not available");
    }
    const contract = new ethers.Contract(contractAddress, ['function balanceOf(address) view returns (uint)'], FUJI_PROVIDER);
    const balance = await contract.balanceOf(account);
    return ethers.utils.formatEther(balance);
}

export const swapWithNativeToken = async (
    amount: string,
    contractAddress: string,
    type: 'buy' | 'sell'
) => {
    if (!window.ethereum) {
        throw new Error("Ethereum provider is not available");
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    let contract;
    let tx;
    if (type === 'buy') {
        contract = new ethers.Contract(contractAddress, ['function buy(uint)'], signer);
        tx = await contract.buy(amount);
    } else {
        contract = new ethers.Contract(contractAddress, ['function sell(uint)'], signer);
        tx = await contract.sell(amount);
    }
    return tx;
}