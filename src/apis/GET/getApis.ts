import { IqueryAll } from "../../interfaces";

export const GET_API = {
    GET_NATIVE_TOKEN_PRICE: (symbol: string, interval: string, limit: number, type: "dayMonth" | "time") => {
        return `token/native-price-history?symbol=${symbol}&interval=${interval}&limit=${limit}&type=${type}`;
    },
    GET_WALLET_TOKENS: (publicKey: string, chainId: string) => {
        return `user/token/${publicKey}/${chainId}`;
    },
    GET_ALL_TOKENS: (queryAll?: IqueryAll) => {
        return `token?page=${queryAll?.page}&limit=${queryAll?.limit}&sortField=${queryAll?.sortField}&sortOrder=${queryAll?.sortOrder}`;
    },
    GET_ALL_LIQUIDITY_PAIRS: (queryAll?: IqueryAll) => {
        return `liquidity-pairs?page=${queryAll?.page}&limit=${queryAll?.limit}&sortField=${queryAll?.sortField}&sortOrder=${queryAll?.sortOrder}&keyword=${queryAll?.keyword}`;
    },
    GET_LIQUIDITY_PAIR_BY_TOKEN: (tokenAddress: string) => {
        return `liquidity-pairs/token?address=${tokenAddress}`;
    },
    GET_LIQUIDITY_PAIR_BY_ADDRESS: (contractAddress: string) => {
        return `liquidity-pairs/contract?contractAddress=${contractAddress}`;
    },
    GET_USER_BY_PUBLIC_KEY: (publicKey: string) => {
        return `user/${publicKey}`;
    }
};