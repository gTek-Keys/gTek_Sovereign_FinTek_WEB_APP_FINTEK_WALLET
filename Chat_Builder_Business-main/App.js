
import React, { useEffect, useState } from 'react';
import IdentityVault from './components/IdentityVault';

export default function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    if ('solana' in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
        provider.connect().then((response) => {
          setWalletConnected(true);
          setWalletAddress(response.publicKey.toString());
        });
      }
    }
  }, []);

  const connectWallet = async () => {
    if ('solana' in window) {
      const provider = window.solana;
      try {
        const response = await provider.connect();
        setWalletConnected(true);
        setWalletAddress(response.publicKey.toString());
      } catch (error) {
        console.error('Wallet connection failed:', error);
      }
    }
  };

  return (
    <div style={{ 
      padding: 20, 
      fontFamily: 'Arial, sans-serif',
      background: '#0a0a0a',
      color: '#fff',
      minHeight: '100vh'
    }}>
      <header style={{ 
        textAlign: 'center', 
        marginBottom: 40,
        borderBottom: '2px solid #00ffff',
        paddingBottom: 20
      }}>
        <h1 style={{ color: '#00ffff', fontSize: '2.5em', margin: 0 }}>
          🔐 gTek Sovereign Identity Vault
        </h1>
        <p style={{ color: '#ccc', fontSize: '1.1em' }}>
          Cybersecurity Identity Protection with CiDex Encryption
        </p>
      </header>

      {walletConnected ? (
        <div>
          <div style={{ 
            background: '#1a1a1a', 
            padding: 15, 
            borderRadius: 8, 
            marginBottom: 20,
            borderLeft: '4px solid #00ff00'
          }}>
            <strong>✅ Wallet Connected:</strong> {walletAddress.substring(0, 20)}...
          </div>
          <IdentityVault walletAddress={walletAddress} />
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: 100 }}>
          <h2 style={{ color: '#fff', marginBottom: 30 }}>Connect Your Wallet to Continue</h2>
          <button 
            onClick={connectWallet}
            style={{
              background: 'linear-gradient(45deg, #00ffff, #0080ff)',
              border: 'none',
              padding: '15px 30px',
              fontSize: '1.1em',
              color: '#000',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Connect Phantom Wallet
          </button>
        </div>
      )}
    </div>
  );
}
