import { useState, useEffect } from 'react';
import { Itoken } from '../interfaces';
import { axiosInstance } from '../apis/api';
import { GET_API } from '../apis/GET/getApis';

const useExternalToken = (searchQuery?:{}) => {
    const [allExternalToken, setAllExternalToken] = useState<Itoken[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const fetchExToken = async () => {
        try {
            const response = await axiosInstance.get(GET_API.GET_ALL_EXTERNAL_TOKENS(searchQuery));
            setAllExternalToken(response.data);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to fetch token');
        } finally {
            setLoading(false);
        }
    }

    return {
        allExternalToken,
        loading,
        error,
        refetch: fetchExToken
    }
}

export default useExternalToken;