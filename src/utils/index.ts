import { ethers } from 'ethers';

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