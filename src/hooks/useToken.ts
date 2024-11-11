// hooks/useTokens.ts
import { useState, useEffect } from 'react';
import { Itoken } from '../interfaces';
import { axiosInstance } from '../apis/api';
import { GET_API } from '../apis/GET/getApis';

interface UseTokensReturn {
  tokens: Itoken[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>; // Function to manually refetch tokens
}

const useTokens = (searchQuery?:{}): UseTokensReturn => {
  const [tokens, setTokens] = useState<Itoken[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTokens = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(GET_API.GET_ALL_TOKENS(searchQuery));
      console.log(response)
      setTokens(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tokens');
      console.error('Error fetching tokens:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  return {
    tokens,
    loading,
    error,
    refetch: fetchTokens
  };
};

export default useTokens;