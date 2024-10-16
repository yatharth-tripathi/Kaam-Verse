import { Web3Provider } from './contexts/Web3Provider';
import NavBar from './components/NavBar';
import '../styles/globals.css';

export const metadata = {
  title: 'Web3 Freelancer Marketplace',
  description: 'Decentralized platform for freelancers and clients',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          <NavBar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </Web3Provider>
      </body>
    </html>
  );
}