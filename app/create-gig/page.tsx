'use client';
import { useState } from 'react';
import { useWeb3Context } from '../contexts/Web3Provider';
import { ethers } from 'ethers';

export default function CreateGigPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { contract, connectWallet, address } = useWeb3Context();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!address) {
      try {
        await connectWallet();
      } catch (error) {
        setError('Failed to connect wallet. Please try again.');
        return;
      }
    }

    if (!contract) {
      setError('Web3 not initialized. Please connect your wallet.');
      return;
    }

    if (Number(price) <= 0) {
      setError('Price must be greater than 0');
      return;
    }

    try {
      setIsLoading(true);
      const priceInWei = ethers.utils.parseEther(price);
      
      // Call the smart contract function
      const tx = await contract.createGig(title, description, priceInWei);
      
      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      
      console.log('Transaction receipt:', receipt);

      setIsLoading(false);
      setSuccess(true);
      setTitle('');
      setDescription('');
      setPrice('');
    } catch (error) {
      setIsLoading(false);
      setError('Failed to create gig. Please try again.');
      console.error('Error creating gig:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create a New Gig</h1>
          
          {error && (
            <div className="mb-6 text-red-600">
              <strong>Error:</strong> {error}
            </div>
          )}

          {success && (
            <div className="mb-6 text-green-600">
              <strong>Success:</strong> Gig created successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form fields remain the same */}
            {/* ... */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Gig'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
