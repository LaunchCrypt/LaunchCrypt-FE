export const GET_API = {
    GET_NATIVE_TOKEN_PRICE: (symbol: string, interval: string, limit: number, type: "dayMonth" | "time") => {
        return `token/native-price-history?symbol=${symbol}&interval=${interval}&limit=${limit}&type=${type}`;
    }
    // GET_ALL_TOKENS: () => {}
};