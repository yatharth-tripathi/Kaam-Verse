interface Profile {
    wallet: string;
    name: string;
    bio: string;
    isFreelancer: boolean;
  }
  
  export default function ProfileCard({ profile }: { profile: Profile }) {
    return (
      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">{profile.name}</h2>
        <p className="text-gray-600 mb-2">{profile.bio}</p>
        <p className="mb-2">
          Address: {profile.wallet.slice(0, 6)}...{profile.wallet.slice(-4)}
        </p>
        <p>Type: {profile.isFreelancer ? 'Freelancer' : 'Client'}</p>
      </div>
    )
  }