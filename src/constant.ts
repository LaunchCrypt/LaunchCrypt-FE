import { ethers } from "ethers"
import { Inetwork, IqueryAll } from "./interfaces"

export const INFURA_API_KEY = "82ab51a996044e25b56164f8bf068bfe"
export const NETWORK_LIST: Inetwork[] = [
    { name: "Avalanche", symbol: "AVAX", image: "Avalanche-logo.svg" },
    { name: "Solana", symbol: "SOL", image: "Solana-logo.svg"},
    { name: "Aptos", symbol: "APT", image: "Aptos-logo.svg" },
]

export const ADMIN_ADDRESS = "0xd2826132FBD5962338e2A37DdC5345A6fE3e6640"
export const FACTORY_CONTRACT_ADDRESS = "0x20F4E1b0F46094A1e2ffBD10eb0f104DdE3De139"
export const TRADING_PAIR_CONTRACT_ADDRESS = "0xAD6b1A850Cda60CB9F2A132832e5306214F767C7"
export const STAKE_CONTRACT_ADDRESS = "0x3932fEe4B649bDEc1ffD0c002C73E908F5b90C90"
export const CREATE_TOKEN_FEE = 1.2 // 20% fee
export const FUJI_CHAIN_ID = '0xA869'
export const FUJI_RPC_URL = "https://api.avax-test.network/ext/bc/C/rpc"
export const FUJI_PROVIDER = new ethers.providers.JsonRpcProvider(FUJI_RPC_URL)
export const BACKEND_URL = "http://localhost:3000"
export const VIRTUAL_LIQUIDITY = 100;


export const DEFAULT_QUERY_ALL: IqueryAll = {
    page: 1,
    limit: 20,
    sortField: "createdAt",
    sortOrder: 'asc'
}