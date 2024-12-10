export const PATCH_API = {
    UPDATE_LIQUIDITY_PAIR: (contractAddress: string) => {
        return `liquidity-pairs/${contractAddress}`;
    },
    UPDATE_USER: (publicKey: string) => {
        return `user/${publicKey}`;
    }
};