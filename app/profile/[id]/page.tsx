'use client'

import { useState, useEffect } from 'react';
import { useWeb3Context } from '@/app/contexts/Web3Provider';
import ProfileCard from '../../components/ProfileCard';
import GigCard from '../../components/GigCard';
import { getFromIPFS } from '../../utils/ipfs';
import { ethers } from 'ethers';
import { contractAddress, abi } from '../../utils/web3';

interface Gig {
  id: ethers.BigNumber;
  freelancer: string; 
  descriptionIPFSHash: string; 
  price: ethers.BigNumber; 
  isActive: boolean; 
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  const { provider } = useWeb3Context();
  const [profile, setProfile] = useState<any>(null); 
  const [gigs, setGigs] = useState<Gig[]>([]); 

  useEffect(() => {
    const fetchProfile = async () => {
      if (provider) {
        const contract = new ethers.Contract(contractAddress, abi, provider); 
        const profileData = await contract.users(params.id);
        const ipfsData = await getFromIPFS(profileData.profileIPFSHash);
        setProfile({ ...profileData, ...ipfsData });

        const userGigs: Gig[] = await contract.getUserGigs(params.id);
        const formattedGigs = userGigs.map((gig: any) => ({
          id: gig.id,
          freelancer: gig.freelancer,
          descriptionIPFSHash: gig.descriptionIPFSHash,
          price: gig.price,
          isActive: gig.isActive,
        }));

        setGigs(formattedGigs); 
      }
    };
    fetchProfile();
  }, [provider, params.id]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <ProfileCard profile={profile} />
      <h2 className="text-2xl font-bold mt-8 mb-4">Gigs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gigs.map((gig) => (
          <GigCard key={gig.id.toString()} gig={gig} />
        ))}
      </div>
    </div>
  );
}
