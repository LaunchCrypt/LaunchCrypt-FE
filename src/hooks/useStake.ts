import { useState, useEffect } from 'react';
import { axiosInstance, GET_API, POST_API } from '../apis/api';

export const useStake = () => {
    const [stake, setStake] = useState({
        amount: 0,
        startTime: 0,
        duration: 0
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getStakeByStaker = async (staker: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(GET_API.GET_STAKE_BY_USER(staker));
            setStake(response.data);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    }

    const callStakeBackend = async (staker: string, amount:number, duration:number) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.post(POST_API.CREATE_NEW_STAKE(),{
                staker,
                amount,
                startTime: Math.floor(new Date().getTime() / 1000),
                duration
            });
            setStake(response.data);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    }
    return {
        stake,
        isLoading,
        error,
        getStakeByStaker,
        callStakeBackend
    };
}