export const PATCH_API = {
    UPDATE_LIQUIDITY_PAIR: (contractAddress: string) => {
        return `liquidity-pairs/${contractAddress}`;
    },
    UPDATE_USER: (publicKey: string) => {
        return `user/${publicKey}`;
    },
    UPDATE_USER_STAKE: (publicKey: string) => {
        return `stake/${publicKey}`;
    },
    UPDATE_TRADING_PAIR_RESERVE: (contractAddress: string) => {
        return `trading-pairs/${contractAddress}`;
    }
};