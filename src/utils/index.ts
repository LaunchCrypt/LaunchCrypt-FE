import { BigNumber, ethers } from 'ethers';
import { FUJI_CHAIN_ID, FUJI_PROVIDER, NETWORK_LIST } from '../constant';
import { axiosInstance, PATCH_API } from '../apis/api';
import Swal from 'sweetalert2';

export const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export const formatAddressLong = (address: string, slice:number) => {
    if (!address) return '';
    return `${address.slice(0, slice)}...${address.slice(-slice)}`;
}

export const formatBalance = (balance: string, slice: number) => {
    if (!balance) return '';
    return `${balance.slice(0, slice)}`;
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
    let balance = await contract.balanceOf(account);
    balance = BigNumber.from(balance._hex);
    console.log(ethers.utils.formatEther(balance));
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
        contract = new ethers.Contract(contractAddress, ['function buy() payable'], signer);
        tx = await contract.buy({ value: ethers.utils.parseEther(amount) });
    } else {
        contract = new ethers.Contract(contractAddress, ['function sell(uint)'], signer);
        tx = await contract.sell(amount);
    }
    return tx;
}

export const approveERC20 = async (contractAddress: string, spender: string, amount: string) => {
    if (!window.ethereum) {
        throw new Error("Ethereum provider is not available");
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ['function approve(address,uint)'], signer);
    const tx = await contract.approve(spender, ethers.utils.parseEther(amount));
    return tx;
}

export const getLiquidityPoolReserve = async (address: string) => {
    if (!window.ethereum) {
        throw new Error("Ethereum provider is not available");
    }
    const contract = new ethers.Contract(address, ['function tokenReserve() view returns (uint)',
        'function collateral() view returns (uint)'], FUJI_PROVIDER);
    const reserve = await contract.tokenReserve();
    const collateral = await contract.collateral();
    return {
        reserve, collateral
    };
}

export const calculateAmountReceived = (amountIn, reserveIn, reserveOut) => {
    let res = (reserveOut * amountIn * 997 / 1000) / (reserveIn + amountIn * 997 / 1000)
    if (res == 0) {
        return 0
    }
    return res.toFixed(9)
}



export const calculateAmountNeeded = (amountOut, reserveIn, reserveOut) => {
    let res = 1000 / 997 * (amountOut * reserveIn) / (reserveOut - amountOut);
    if (res == 0) {
        return 0
    }
    return res.toFixed(9)
}


export function showAlert(transactionHash: string, message: string) {
    Swal.fire({
        customClass: {
            popup: 'rounded-lg shadow-xl',
            title: 'text-gray-800 font-medium text-xl mb-2',
            confirmButton: 'bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600',
            actions: 'space-x-2',
        },
        text: 'Successfully swapped',
        icon: 'success',
        iconColor: '#a855f7',
        background: '#1a1a2e',
        showConfirmButton: true,
        confirmButtonText: 'OK',
        showCloseButton: true,
        html: `
        <p class="mb-4 text-purple-200/80">${message}</p>
        <a href="https://testnet.snowtrace.io/tx/${transactionHash}" 
           target="_blank" 
           class="inline-flex items-center text-purple-500 hover:text-purple-600">
            <span>View on Snowtrace</span>
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
        </a>
      `
    });
}

