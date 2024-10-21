
"use client";
import { useState, useEffect } from 'react';
import GigCard from './components/GigCard';
import { ethers } from 'ethers';
import { contractAddress, abi } from './utils/web3'; 
import { getProvider } from './utils/web3Config';


interface Gig {
  id: ethers.BigNumber; 
  freelancer: string;
  descriptionIPFSHash: string;
  price: ethers.BigNumber;
  isActive: boolean;
}

export default function Home() {
  const [featuredGigs, setFeaturedGigs] = useState<Gig[]>([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchFeaturedGigs = async () => {
      const provider = getProvider(); 
      if (provider) {
        const contract = new ethers.Contract(contractAddress, abi, provider);
        
        try {
        
          const gigsData = await contract.getFeaturedGigs(); 

          
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
          setLoading(false); 
        }
      } else {
        setLoading(false);
      }
    };

    fetchFeaturedGigs();
  }, []);

  if (loading) return <div>Loading...</div>; 

  return (
    <main>
      <h1 className="text-4xl font-bold mb-6">Web3 Freelancer Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredGigs.map(gig => (
          <GigCard key={gig.id.toString()} gig={gig} /> 
        ))}
      </div>
    </main>
  );
}
