// app/page.tsx
"use client";
import { useState, useEffect } from 'react';
import GigCard from './components/GigCard';
import { ethers } from 'ethers';
import { contractAddress, abi } from './utils/web3'; // Adjust this according to your project structure
import { getProvider } from './utils/web3Config'; // Ensure this imports correctly

// Define the Gig interface here to keep it consistent
interface Gig {
  id: ethers.BigNumber; // Use ethers.BigNumber for id
  freelancer: string;
  descriptionIPFSHash: string;
  price: ethers.BigNumber;
  isActive: boolean;
}

export default function Home() {
  const [featuredGigs, setFeaturedGigs] = useState<Gig[]>([]); // Specify Gig[] as the type
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchFeaturedGigs = async () => {
      const provider = getProvider(); // Get the web3 provider
      if (provider) {
        const contract = new ethers.Contract(contractAddress, abi, provider);
        
        try {
          // Fetch the featured gigs from your contract
          const gigsData = await contract.getFeaturedGigs(); // Replace this with your actual contract method

          // Map the fetched data to the Gig interface
          const formattedGigs: Gig[] = gigsData.map((gig: any) => ({
            id: gig.id,
            freelancer: gig.freelancer,
            descriptionIPFSHash: gig.descriptionIPFSHash,
            price: gig.price,
            isActive: gig.isActive,
          }));

          setFeaturedGigs(formattedGigs);
        } catch (error) {
          console.error("Error fetching featured gigs:", error);
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      } else {
        setLoading(false); // Set loading to false if provider is not available
      }
    };

    fetchFeaturedGigs();
  }, []);

  if (loading) return <div>Loading...</div>; // Show loading state

  return (
    <main>
      <h1 className="text-4xl font-bold mb-6">Web3 Freelancer Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredGigs.map(gig => (
          <GigCard key={gig.id.toString()} gig={gig} /> // Use toString() to ensure the key is a string
        ))}
      </div>
    </main>
  );
}
