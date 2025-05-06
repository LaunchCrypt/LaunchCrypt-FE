import { BigNumber, ethers } from 'ethers';
import { FUJI_CHAIN_ID, FUJI_PROVIDER, NETWORK_LIST } from '../constant';
import { axiosInstance, PATCH_API } from '../apis/api';
import Swal from 'sweetalert2';

export const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export const formatAddressLong = (address: string, slice: number) => {
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

export const base64toUrl = (base64: string, mimeType: string) => {
    return `data:${mimeType};base64,${base64}`;
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
    return ethers.utils.formatEther(balance);
}

export const swapWithNativeToken = async (
    amount: string,
    amountOutMin: string,
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
    try {
        if (type === 'buy') {
            contract = new ethers.Contract(contractAddress, ['function buy(uint) payable'], signer);
            tx = await contract.buy(
                amountOutMin,
                { value: ethers.utils.parseEther(amount) }
            );
        } else {
            contract = new ethers.Contract(contractAddress, ['function sell(uint,uint)'], signer);
            tx = await contract.sell(amount, amountOutMin);
        }
        return tx;
    } catch (error) {
        throw error;
    }
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

export const callStakeContract = async (contractAddress: string, amount: number, duration: number) => {
    if (!window.ethereum) {
        throw new Error("Ethereum provider is not available");
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ['function stake(uint) payable'], signer);
    const tx = await contract.stake(
        duration,
        { value: ethers.utils.parseEther(amount.toString()) }
    );
    return tx;
}

export const callClaimRewardContract = async (contractAddress: string) => {
    if (!window.ethereum) {
        throw new Error("Ethereum provider is not available");
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ['function claimRewards()'], signer);
    const tx = await contract.claimRewards();
    return tx;
}

export const callUnstakeContract = async (contractAddress: string) => {
    if (!window.ethereum) {
        throw new Error("Ethereum provider is not available");
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ['function withdraw()'], signer);
    const tx = await contract.withdraw();
    return tx;
}
export const callCreatePoolContract = async (contractAddress: string, firstTokenAddress: string, secondTokenAddress: string) => {
    if (!window.ethereum) {
        throw new Error("Ethereum provider is not available");
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ['function deployNewTradingPair(address,address)'], signer);
    const tx = await contract.deployNewTradingPair(
        firstTokenAddress,
        secondTokenAddress
    );
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

export const calculateAmountReceived = (amountIn, reserveIn, reserveOut, poolFee) => {
    let res = (reserveOut * amountIn * (1000 - poolFee) / 1000) / (reserveIn + amountIn * (1000 - poolFee) / 1000)
    if (res == 0) {
        return '0'
    }
    return res.toFixed(9)
}


// input: AVAX (needed), Token In: ERC20 
export const calculateAmountNeededReceiveAvax = (amountOut, reserveIn, reserveOut, poolFee) => {
    const actualAvaxOut = amountOut * 1000 / (1000 - poolFee);
    // (y-dy)(x+dx) = xy
    // (y-dy')(x+dx) = xy ( y' is actualAvaxOut)
    // -xdy' + ydx - dxdy' = 0
    // dx ( y - dy' ) = xdy'
    // dx = xdy' / ( y-dy')
    const res = (reserveIn * actualAvaxOut) / (reserveOut - actualAvaxOut);
    if (res == 0) {
        return "0"
    }
    return res.toFixed(9)
}

// input = ERC20 (needed), Token In: AVAX 
export const calculateAmountNeededReceiveToken = (amountOut, reserveIn, reserveOut, poolFee) => {
    // (x+dx')(y-dy) = xy (user input dy, find dx) 
    // ydx' - xdy - dx'dy = 0 
    // dx' ( y-dy) = xdy
    // dx' = xdy / (y-dy)
    // dx = dx' * 1000 / (1000-fee)
    const amountNeededAfterFee = (reserveIn * amountOut) / (reserveOut - amountOut);
    const res = amountNeededAfterFee * 1000 / (1000 - poolFee);
    if (res == 0) {
        return "0"
    }
    return res.toFixed(9)
}

// input AVAX => Token in: AVAX, receive: ERC20
export const calculateAmountERC20Received = (amountIn, reserveIn, reserveOut, poolFee) => {
    // (x+dx')(y-dy) = xy (user input dx, find dy)
    // dy = ydx' / (x+dx')
    // dy = y(dx * (1000-fee) / 1000) / (x + dx * (1000-fee) / 1000)
    const amountReceived = (reserveOut * amountIn * (1000 - poolFee) / 1000) / (reserveIn + amountIn * (1000 - poolFee) / 1000);
    if (amountReceived == 0) {
        return "0"
    }
    return amountReceived.toFixed(9)
}

// input ERC20 => Token in: ERC20, receive: AVAX
export const calculateAmountAVAXReceived = (amountIn, reserveIn, reserveOut, poolFee) => {
    // (x+dx)(y-dy) = xy (user input dx, find dy')
    // dy = ydx/(x+dx)
    // dy' = dy * (1000-fee) / 1000
    const amountReceived = (reserveOut * amountIn * (1000 - poolFee) / 1000) / (reserveIn + amountIn);
    if (amountReceived == 0) {
        return "0"
    }
    return amountReceived.toFixed(9)
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

export function showFailedAlert(message: string) {
    Swal.fire({
        customClass: {
            popup: 'rounded-lg shadow-xl',
            title: 'text-gray-200 font-medium text-xl mb-2',
            confirmButton: 'bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600',
            actions: 'space-x-2',
        },
        title: 'Transaction Failed',
        icon: 'error',
        iconColor: '#f43f5e',
        background: '#1a1a2e',
        showConfirmButton: true,
        confirmButtonText: 'OK',
        showCloseButton: true,
        html: `<p class="mb-2 text-red-500">${message}</p>`
    });
}

export const convertUnixTimestampToTime = (timestamp: number) => {
    const seconds = timestamp % 60;
    const minutes = Math.floor((timestamp / 60) % 60);
    const hours = Math.floor((timestamp / 3600) % 24);
    const days = Math.floor(timestamp / (3600 * 24));

    const timeComponents: string[] = [];
    if (days > 0) timeComponents.push(`${days} days`);
    if (hours > 0) timeComponents.push(`${hours} hours`);
    if (minutes > 0) timeComponents.push(`${minutes} minutes`);
    if (seconds > 0 && timeComponents.length === 0) timeComponents.push(`${seconds} seconds`);

    return timeComponents.join(' ');
};

export const getPreciseTimeDifference = (dateString: string) => {
    const givenDate = new Date(dateString);
    const currentDate = new Date();

    const differenceMs = currentDate.getTime() - givenDate.getTime();

    // Calculate each unit while accounting for remainders
    const secondsTotal = Math.floor(differenceMs / 1000);

    const years = Math.floor(secondsTotal / (365.25 * 24 * 60 * 60));
    const remainingSecondsAfterYears = secondsTotal % (365.25 * 24 * 60 * 60);

    const days = Math.floor(remainingSecondsAfterYears / (24 * 60 * 60));
    const remainingSecondsAfterDays = remainingSecondsAfterYears % (24 * 60 * 60);

    const hours = Math.floor(remainingSecondsAfterDays / (60 * 60));
    const remainingSecondsAfterHours = remainingSecondsAfterDays % (60 * 60);

    const minutes = Math.floor(remainingSecondsAfterHours / 60);
    const seconds = remainingSecondsAfterHours % 60;

    const parts: string[] = [];
    if (years > 0) {
        parts.push(`${years} year${years > 1 ? 's' : ''}`);
        return parts.join(', ') + ' ago';
    }
    if (days > 0) {
        parts.push(`${days} day${days > 1 ? 's' : ''}`);
        return parts.join(', ') + ' ago';
    }
    if (hours > 0) {
        parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
        return parts.join(', ') + ' ago';
    }
    if (minutes > 0) {
        parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
        return parts.join(', ') + ' ago';
    }
}

export function formatEthereumAddress(paddedAddress) {
    // Validate input
    if (!paddedAddress || typeof paddedAddress !== 'string') {
      throw new Error('Invalid address: Input must be a non-empty string');
    }
    
    // Check if the address starts with '0x'
    const hasPrefix = paddedAddress.startsWith('0x');
    const addressWithoutPrefix = hasPrefix ? paddedAddress.slice(2) : paddedAddress;
    
    // Regular expression to match a standard Ethereum address (40 hex characters)
    const ethAddressRegex = /^(0{0,24})([0-9a-fA-F]{40})$/;
    const match = addressWithoutPrefix.match(ethAddressRegex);
    
    if (!match) {
      throw new Error('Invalid Ethereum address format');
    }
    
    // Extract the actual address part (without padding)
    const actualAddress = match[2];
    
    // Return with the 0x prefix
    return '0x' + actualAddress;
  }

export const calculateAmountOutExternalToken = (amountIn, reserveIn, reserveOut) => {
    const amountInAfterFee = amountIn * 997 / 1000;
    const amountOut = amountInAfterFee * reserveOut / (reserveIn + amountInAfterFee);
    return amountOut.toFixed(9)
}

export const calculateAmountInNeededExternalToken = (amountOut, reserveIn, reserveOut) => {
    const amountInAfterFee = amountOut * reserveIn / (reserveOut - amountOut)
    const amountIn = amountInAfterFee * 1000 / 997
    return amountIn.toFixed(9)
}
    