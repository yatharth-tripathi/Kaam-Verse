import { create } from 'ipfs-http-client';


const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

/**

 * @param data - The data to be uploaded (can be an object or any data that can be stringified).
 * @returns The IPFS hash/path of the uploaded data.
 */
export const uploadToIPFS = async (data: any): Promise<string> => {
  try {
    const result = await ipfs.add(JSON.stringify(data));
    return result.path; 
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
};

/**
 * Retrieves data from IPFS by its hash.
 * @param hash - The IPFS hash/path of the data.
 * @returns The data retrieved from IPFS (parsed from JSON).
 */
export const getFromIPFS = async (hash: string): Promise<any> => {
  try {
    const stream = ipfs.cat(hash);
    let data = '';

    for await (const chunk of stream) {
      data += chunk.toString();  
    }

    return JSON.parse(data);  
  } catch (error) {
    console.error('Error fetching from IPFS:', error);
    throw error;
  }
};
