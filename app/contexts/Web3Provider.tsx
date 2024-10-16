'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { getProvider, getContract } from '../utils/web3Config';

interface Web3ContextType {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  contract: ethers.Contract | null;
  address: string | null;
  connectWallet: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function useWeb3Context() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3Context must be used within a Web3Provider');
  }
  return context;
}

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = useCallback(async () => {
    try {
      const provider = await getProvider();
      if (provider) {
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const contract = getContract(signer);

        setProvider(provider);
        setSigner(signer);
        setContract(contract);
        setAddress(address);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  }, []);

  useEffect(() => {
    const checkConnection = async () => {
      const provider = await getProvider();
      if (provider) {
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          const contract = getContract(signer);
          setProvider(provider);
          setSigner(signer);
          setContract(contract);
          setAddress(address);
        }
      }
    };

    checkConnection();
  }, []);

  return (
    <Web3Context.Provider value={{ provider, signer, contract, address, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
}