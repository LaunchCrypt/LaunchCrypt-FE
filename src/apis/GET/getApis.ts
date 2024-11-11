import { IqueryAll } from "../../interfaces";

export const GET_API = {
    GET_NATIVE_TOKEN_PRICE: (symbol: string, interval: string, limit: number, type: "dayMonth" | "time") => {
        return `token/native-price-history?symbol=${symbol}&interval=${interval}&limit=${limit}&type=${type}`;
    },
    GET_ALL_TOKENS: (queryAll?: IqueryAll) => {
        return `token?page=${queryAll?.page}&limit=${queryAll?.limit}&sortField=${queryAll?.sortField}&sortOrder=${queryAll?.sortOrder}`;
    }
};