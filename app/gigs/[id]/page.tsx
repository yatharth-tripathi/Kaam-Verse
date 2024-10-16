'use client'

import { useState, useEffect } from 'react'
import { useWeb3Context } from '@/app/contexts/Web3Provider'
import { ethers } from 'ethers'
import { getFromIPFS } from '../../utils/ipfs'

interface Gig {
  id: string; 
  price: string; 
  freelancer: string; 
  isActive: boolean; 
  descriptionIPFSHash: string; 
}

export default function GigDetailsPage({ params }: { params: { id: string } }) {
  const { contract, address } = useWeb3Context()
  const [gig, setGig] = useState<Gig | null>(null)
  const [gigDetails, setGigDetails] = useState<any>(null)

  useEffect(() => {
    const fetchGigData = async () => {
      if (contract) {
        try {
          const gigData = await contract.getGig(params.id)
          setGig(gigData)
          const ipfsData = await getFromIPFS(gigData.descriptionIPFSHash)
          setGigDetails(ipfsData)
        } catch (error) {
          console.error('Error fetching gig data:', error)
        }
      }
    }
    fetchGigData()
  }, [contract, params.id])

  const handleHire = async () => {
    if (contract && gig) {
      try {
        const tx = await contract.hireFreelancer(gig.id, { value: gig.price })
        await tx.wait()
    
      } catch (error) {
        console.error('Error hiring freelancer:', error)
        
      }
    }
  }

  if (!gig || !gigDetails) return <div>Loading...</div>

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{gigDetails.title}</h1>
      <p className="mb-4">{gigDetails.description}</p>
      <p className="font-bold mb-2">Price: {ethers.utils.formatEther(gig.price)} ETH</p>
      <p className="mb-2">Freelancer: {gig.freelancer}</p>
      <p className="mb-4">Status: {gig.isActive ? 'Active' : 'Inactive'}</p>
      {gig.isActive && gig.freelancer !== address && (
        <button
          onClick={handleHire}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Hire Freelancer
        </button>
      )}
    </div>
  )
}
