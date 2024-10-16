import Link from 'next/link'
import { ethers } from 'ethers'

interface Gig {
  id: ethers.BigNumber;
  freelancer: string;
  descriptionIPFSHash: string;
  price: ethers.BigNumber;
  isActive: boolean;
}

export default function GigCard({ gig }: { gig: Gig }) {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Gig ID: {gig.id.toString()}</h3>
      <p className="text-gray-600 mb-2">IPFS Hash: {gig.descriptionIPFSHash}</p>
      <p className="font-bold mb-2">
        {ethers.utils.formatEther(gig.price)} ETH
      </p>
      <p className="mb-2">Freelancer: {gig.freelancer.slice(0, 6)}...{gig.freelancer.slice(-4)}</p>
      <p className="mb-2">Status: {gig.isActive ? 'Active' : 'Inactive'}</p>
      <Link href={`/gigs/${gig.id}`} className="text-blue-500 hover:underline">
        View Details
      </Link>
    </div>
  )
}