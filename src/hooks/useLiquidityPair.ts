import { useState, useEffect } from 'react';
import { axiosInstance, GET_API } from '../apis/api';

export const useLiquidityPair = ({
    token0Address, contractAddress, pairAddress
}: {
    token0Address?: string, // case: Native token to ERC20 token
    contractAddress?: string,
    // case: ERC20 to ERC20
    pairAddress?: {
        token0Address: string,
        token1Address: string
    }
}) => {
    const [liquidityPair, setLiquidityPair] = useState({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getLiquidityPair = async () => {
        setIsLoading(true);
        setError(null);

        try {
            if (token0Address) {
                const response = await axiosInstance.get(GET_API.GET_LIQUIDITY_PAIR_BY_TOKEN(token0Address));
                setLiquidityPair(response.data);
            }

            if (contractAddress) {
                const response = await axiosInstance.get(GET_API.GET_LIQUIDITY_PAIR_BY_ADDRESS(contractAddress));
                setLiquidityPair(response.data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token0Address || contractAddress || pairAddress) {
            getLiquidityPair();
        }
    }, [token0Address, contractAddress, pairAddress]);

    return {
        liquidityPair,
        isLoading,
        error,
        getLiquidityPair,
    };
};