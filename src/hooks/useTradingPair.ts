import { useState, useEffect } from 'react';
import { axiosInstance, GET_API } from '../apis/api';
import { IqueryAll } from '../interfaces';

export const useTradingPair = ({
    searchQuery
}: {
    searchQuery?: IqueryAll
}) => {
    const [allTradingPair, setAllTradingPair] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getAllTradingPairs = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(GET_API.GET_ALL_TRADING_PAIRS(searchQuery));
            setAllTradingPair(response.data);
            console.log("response", response)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    }


    return {
        allTradingPair,
        isLoading,
        error,
        getAllTradingPairs
    }   
}