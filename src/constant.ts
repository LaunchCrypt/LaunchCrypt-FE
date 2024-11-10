import { Inetwork } from "./interfaces"

export const INFURA_API_KEY = "82ab51a996044e25b56164f8bf068bfe"
export const NETWORK_LIST: Inetwork[] = [
    { name: "Ethereum", symbol: "ETH", image: "Ethereum-logo.svg" },
    { name: "Solana", symbol: "SOL", image: "Solana-logo.svg"},
    { name: "Aptos", symbol: "APT", image: "Aptos-logo.svg" },
]

export const ADMIN_ADDRESS = "0xd2826132FBD5962338e2A37DdC5345A6fE3e6640"
export const FACTORY_CONTRACT_ADDRESS = "0xf472D49c5ce8a38b82C69E03eeF7061f0C19455F"
export const CREATE_TOKEN_FEE = 1.2 // 20% fee
export const FUJI_CHAIN_ID = '0xA869'
export const FUJI_RPC_URL = "https://api.avax-test.network/ext/bc/C/rpc"
export const BACKEND_URL = "http://localhost:3000"