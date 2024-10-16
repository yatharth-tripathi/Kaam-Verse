'use client';

import Link from 'next/link';
import { useWeb3Context } from '../contexts/Web3Provider';

export default function NavBar() {
  const { address, connectWallet } = useWeb3Context();
  console.log('NavBar Address:', address);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Web3 Freelancer
        </Link>
        <div className="flex items-center">
          <Link href="/create-gig" className="mr-4 hover:text-blue-400">
            Create Gig
          </Link>
          <Link href="/dashboard" className="mr-4 hover:text-blue-400">
            Dashboard
          </Link>
          {address ? (
            <span className="mr-4">
              Connected: {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          ) : (
            <button 
              onClick={connectWallet}
              className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              aria-label="Connect Wallet"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}