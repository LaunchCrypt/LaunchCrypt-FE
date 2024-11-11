import { useState, useEffect } from 'react';
import Web3 from 'web3';

interface UseBalanceReturn {
  balance: string | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useMetaMaskBalance = (address?: string): UseBalanceReturn => {
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const getWeb3 = async () => {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }
    return new Web3(window.ethereum);
  };

  const fetchBalance = async () => {
    if (!address) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const web3 = await getWeb3();
      
      // Get balance in Wei
      const balanceInWei = await web3.eth.getBalance(address);
      
      // Convert Wei to Ether
      const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');
      
      setBalance(balanceInEth);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch balance'));
      setBalance(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Listen for account changes
    const handleAccountsChanged = () => {
      fetchBalance();
    };

    // Listen for chain changes
    const handleChainChanged = () => {
      fetchBalance();
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    fetchBalance();

    // Cleanup listeners
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [address]);

  return {
    balance,
    loading,
    error,
    refetch: fetchBalance
  };
};