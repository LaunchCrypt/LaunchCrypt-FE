import { useState, useEffect } from 'react';
import { axiosInstance, GET_API } from '../apis/api';
import { IqueryAll } from '../interfaces';

export const useTradingPair = ({
    token0Address,
    token1Address,
    contractAddress,
    searchQuery
}: {
    token0Address?: string,
    token1Address?: string,
    contractAddress?: string,
    searchQuery?: IqueryAll
}) => {
    const [allTradingPair, setAllTradingPair] = useState([]);
    const [tradingPair, setTradingPair] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getAllTradingPairs = async () => {
        setIsLoading(true);
        setError(null);
        try {
            let searchQueryAfterFormat
            if (searchQuery?.keyword) {
                searchQueryAfterFormat = searchQuery
            }
            else {
                searchQueryAfterFormat = { ...searchQuery, keyword: "" }
            }
            const response = await axiosInstance.get(GET_API.GET_ALL_TRADING_PAIRS(searchQueryAfterFormat));
            setAllTradingPair(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    }

    const getTradingPair = async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (token0Address && token1Address) {
                const response = await axiosInstance.get(GET_API.GET_TRADING_PAIR_BY_TOKEN(token0Address, token1Address));
                setTradingPair(response.data)
            }

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (token0Address && token1Address) {
            getTradingPair()
        }
    }, [token0Address, token1Address])


    return {
        tradingPair,
        allTradingPair,
        isLoading,
        error,
        getAllTradingPairs,
        getTradingPair,
    }
}