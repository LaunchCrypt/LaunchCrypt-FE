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
    },
    GET_STAKE_BY_USER: (publicKey: string) => {
        return `stake/${publicKey}`;
    },
    GET_TOKEN_BY_SYMBOL: (symbol: string) => {
        return `token/${symbol}`;
    },
    GET_TOKEN_BY_ADDRESS: (address: string) => {
        return `token/contractAddress?contractAddress=${address}`;
    },
    GET_STATS: () => {
        return `stats`;
    },
    GET_USER_TABLE_DATA: () => {
        return `user/tableData`
    },
    GET_ALL_TRADING_PAIRS: (queryAll?: IqueryAll) => {
        return `trading-pairs?page=${queryAll?.page}&limit=${queryAll?.limit}&sortField=${queryAll?.sortField}&sortOrder=${queryAll?.sortOrder}&keyword=${queryAll?.keyword}`;
    },
    GET_TRADING_PAIR_BY_TOKEN:(tokenA:string, tokenB:string) => {
        return `trading-pairs/token-pair?tokenA=${tokenA}&tokenB=${tokenB}`;
    },
    GET_TRADING_PAIR_BY_ADDRESS: (contractAddress: string) => {
        return `trading-pairs/contract?contractAddress=${contractAddress}`;
    },
    GET_ALL_EXTERNAL_TOKENS: (queryAll?: IqueryAll) => {
        return `ex-token?page=${queryAll?.page}&limit=${queryAll?.limit}&sortField=${queryAll?.sortField}&sortOrder=${queryAll?.sortOrder}&keyword=${queryAll?.keyword}`;
    },
    GET_TOKEN_DISTRIBUTION: (tokenAddress: string) => {
        return `token/token-distribution?tokenAddress=${tokenAddress}`;
    }
};