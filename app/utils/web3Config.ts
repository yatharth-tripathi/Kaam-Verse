import { ethers } from 'ethers';

export const CONTRACT_ADDRESS = '0xE49f4DA288eFB423C1dDeE422E2AEF47F4734A73';

export const CONTRACT_ABI = [
    
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_jobId",
                    "type": "uint256"
                }
            ],
            "name": "completeJob",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_descriptionIPFSHash",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                }
            ],
            "name": "createGig",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "jobId",
                    "type": "uint256"
                }
            ],
            "name": "DisputeInitiated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "jobId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "favorFreelancer",
                    "type": "bool"
                }
            ],
            "name": "DisputeResolved",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "gigId",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "freelancer",
                    "type": "address"
                }
            ],
            "name": "GigCreated",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_gigId",
                    "type": "uint256"
                }
            ],
            "name": "hireFreelancer",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_jobId",
                    "type": "uint256"
                }
            ],
            "name": "initiateDispute",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "jobId",
                    "type": "uint256"
                }
            ],
            "name": "JobCompleted",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "jobId",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "gigId",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "client",
                    "type": "address"
                }
            ],
            "name": "JobStarted",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_profileIPFSHash",
                    "type": "string"
                },
                {
                    "internalType": "bool",
                    "name": "_isFreelancer",
                    "type": "bool"
                }
            ],
            "name": "registerUser",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_jobId",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "_favorFreelancer",
                    "type": "bool"
                }
            ],
            "name": "resolveDispute",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "isFreelancer",
                    "type": "bool"
                }
            ],
            "name": "UserRegistered",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_gigId",
                    "type": "uint256"
                }
            ],
            "name": "getGig",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "freelancer",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "descriptionIPFSHash",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "price",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isActive",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct FreelancerMarketplace.Gig",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_jobId",
                    "type": "uint256"
                }
            ],
            "name": "getJob",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "gigId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "client",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "freelancer",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "completed",
                            "type": "bool"
                        },
                        {
                            "internalType": "bool",
                            "name": "disputed",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct FreelancerMarketplace.Job",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "getUserGigs",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "freelancer",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "descriptionIPFSHash",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "price",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isActive",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct FreelancerMarketplace.Gig[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "getUserJobs",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "gigId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "client",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "freelancer",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "completed",
                            "type": "bool"
                        },
                        {
                            "internalType": "bool",
                            "name": "disputed",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct FreelancerMarketplace.Job[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "gigs",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "freelancer",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "descriptionIPFSHash",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isActive",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "jobs",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "gigId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "client",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "freelancer",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "completed",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "disputed",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "nextGigId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "nextJobId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "users",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "wallet",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "profileIPFSHash",
                    "type": "string"
                },
                {
                    "internalType": "bool",
                    "name": "isFreelancer",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    
];

export const getProvider = () => {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    return new ethers.providers.Web3Provider(window.ethereum);
  }
  return null;
};

export const getContract = (providerOrSigner: ethers.providers.Web3Provider | ethers.Signer) => {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, providerOrSigner);
};