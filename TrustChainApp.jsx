// TrustChain Capsule Web App
'use client';

import { useEffect, useMemo, useState } from 'react';
import { clusterApiUrl, PublicKey } from '@solana/web3.js';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

import '@solana/wallet-adapter-react-ui/styles.css';

export default function TrustChainApp() {
  const [capsuleTx, setCapsuleTx] = useState('');
  const [metadataUri, setMetadataUri] = useState('');

  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  useEffect(() => {
    setCapsuleTx('Loading...');
    const fetchMetadata = async () => {
      try {
        const mintAddress = new PublicKey(
          'GKWPEPNZyiS7vSgdzFKk76UoJa8XvM9SEA2ysd2DMaie'
        );
        const metadataProgramId = new PublicKey(
          'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
        );
        const [metadataPDA] = await PublicKey.findProgramAddress(
          [
            Buffer.from('metadata'),
            metadataProgramId.toBuffer(),
            mintAddress.toBuffer(),
          ],
          metadataProgramId
        );
        setCapsuleTx(metadataPDA.toBase58());
        setMetadataUri(
          'https://ipfs.io/ipfs/QmSjmKW7is3qdpbev4TUyiquJWXahKekyzrSGq4fsxWdoi'
        );
      } catch (error) {
        setCapsuleTx('Error loading metadata');
        setMetadataUri('');
      }
    };
    fetchMetadata();
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-black text-white p-10">
            <h1 className="text-3xl font-bold mb-4">
              TrustChain Capsule NFT Viewer
            </h1>
            <WalletMultiButton className="mb-4" />
            <div className="bg-gray-900 p-4 rounded-xl">
              <p>
                <strong>Capsule Metadata Address (PDA):</strong>
              </p>
              <p className="text-green-400 break-all">{capsuleTx}</p>
              <p className="mt-4">
                <strong>Metadata:</strong>
              </p>
              {metadataUri ? (
                <a
                  href={metadataUri}
                  className="text-blue-400 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {metadataUri}
                </a>
              ) : (
                <span className="text-red-400">No metadata available</span>
              )}
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
