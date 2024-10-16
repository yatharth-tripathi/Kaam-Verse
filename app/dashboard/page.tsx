'use client'

import { useState, useEffect } from 'react'
import { useWeb3Context } from '../contexts/Web3Provider'
import GigCard from '../components/GigCard'
import { ethers } from 'ethers'

interface Job {
  id: string; 
  gigId: string; 
  amount: string; 
  completed: boolean;
  disputed: boolean;
}

export default function DashboardPage() {
  const { contract, address } = useWeb3Context()
  const [userGigs, setUserGigs] = useState<any[]>([])
  const [userJobs, setUserJobs] = useState<Job[]>([])

  useEffect(() => {
    const fetchUserData = async () => {
      if (contract && address) {
        try {
          const gigs = await contract.getUserGigs(address)
          const jobs = await contract.getUserJobs(address)
          setUserGigs(gigs)
          setUserJobs(jobs)
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }
    }
    fetchUserData()
  }, [contract, address])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <h2 className="text-xl font-semibold mt-6 mb-2">Your Gigs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userGigs.map((gig, index) => (
          <GigCard key={index} gig={gig} />
        ))}
      </div>
      <h2 className="text-xl font-semibold mt-6 mb-2">Your Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userJobs.map((job, index) => (
          <div key={index} className="border p-4 rounded">
            <h3 className="font-bold">Job ID: {job.id.toString()}</h3>
            <p>Gig ID: {job.gigId.toString()}</p>
            <p>Amount: {ethers.utils.formatEther(job.amount)} ETH</p>
            <p>Status: {job.completed ? 'Completed' : job.disputed ? 'Disputed' : 'In Progress'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
