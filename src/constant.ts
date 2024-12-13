import { ethers } from "ethers"
import { Inetwork, IqueryAll } from "./interfaces"

export const INFURA_API_KEY = "82ab51a996044e25b56164f8bf068bfe"
export const NETWORK_LIST: Inetwork[] = [
    { name: "Avalanche", symbol: "AVAX", image: "Avalanche-logo.svg" },
    { name: "Solana", symbol: "SOL", image: "Solana-logo.svg"},
    { name: "Aptos", symbol: "APT", image: "Aptos-logo.svg" },
]

export const ADMIN_ADDRESS = "0xd2826132FBD5962338e2A37DdC5345A6fE3e6640"
export const FACTORY_CONTRACT_ADDRESS = "0x303078b83c52Ee1cCa682C54cC6c075267c2256e"
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