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