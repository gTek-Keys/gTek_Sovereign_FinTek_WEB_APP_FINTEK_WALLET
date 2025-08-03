
import React, { useEffect, useState } from 'react';

export default function App() {
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    if ('solana' in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
        provider.connect().then(() => setWalletConnected(true));
      }
    }
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>CodexGPT NFT Mint Portal</h1>
      {walletConnected ? (
        <p>Wallet Connected — Ready to Mint</p>
      ) : (
        <button onClick={() => window.solana.connect()}>Connect Wallet</button>
      )}
    </div>
  );
}
