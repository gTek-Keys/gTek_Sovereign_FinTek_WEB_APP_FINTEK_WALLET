import React, { useState, useEffect } from 'react';
import IdentityRegistration from './IdentityRegistration';
import MonitoringDashboard from './MonitoringDashboard';
import LicenseManagement from './LicenseManagement';
import LedgerViewer from './LedgerViewer';

const API_BASE = 'http://localhost:8000';

export default function IdentityVault({ walletAddress }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userIdentities, setUserIdentities] = useState([]);
  const [userLicenses, setUserLicenses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUserData();
  }, [walletAddress]);

  const loadUserData = async () => {
    setLoading(true);
    try {
      // Load user identities
      const identitiesResponse = await fetch(`${API_BASE}/wallet/${walletAddress}/identities`);
      if (identitiesResponse.ok) {
        const identitiesData = await identitiesResponse.json();
        setUserIdentities(identitiesData.identities || []);
      }

      // Load user licenses
      const licensesResponse = await fetch(`${API_BASE}/wallet/${walletAddress}/licenses`);
      if (licensesResponse.ok) {
        const licensesData = await licensesResponse.json();
        setUserLicenses(licensesData.licenses || []);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabStyle = (tab) => ({
    padding: '12px 24px',
    margin: '0 4px',
    background: activeTab === tab ? '#00ffff' : '#333',
    color: activeTab === tab ? '#000' : '#fff',
    border: 'none',
    borderRadius: '8px 8px 0 0',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.9em'
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case 'register':
        return <IdentityRegistration walletAddress={walletAddress} onRegistered={loadUserData} />;
      case 'dashboard':
        return <MonitoringDashboard walletAddress={walletAddress} identities={userIdentities} />;
      case 'licenses':
        return <LicenseManagement walletAddress={walletAddress} licenses={userLicenses} onLicenseUpdate={loadUserData} />;
      case 'logs':
        return <LedgerViewer walletAddress={walletAddress} />;
      default:
        return <MonitoringDashboard walletAddress={walletAddress} identities={userIdentities} />;
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        borderBottom: '2px solid #333',
        marginBottom: 20
      }}>
        <button 
          style={tabStyle('dashboard')}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button 
          style={tabStyle('register')}
          onClick={() => setActiveTab('register')}
        >
          📝 Register Identity
        </button>
        <button 
          style={tabStyle('licenses')}
          onClick={() => setActiveTab('licenses')}
        >
          📜 Licenses ({userLicenses.length})
        </button>
        <button 
          style={tabStyle('logs')}
          onClick={() => setActiveTab('logs')}
        >
          📋 Usage Logs
        </button>
      </div>

      {/* Status Bar */}
      <div style={{
        background: '#1a1a1a',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <strong>🔐 Vault Status:</strong> 
          <span style={{ color: '#00ff00', marginLeft: 8 }}>SECURE</span>
        </div>
        <div>
          <strong>📊 Your Identities:</strong> 
          <span style={{ color: '#00ffff', marginLeft: 8 }}>{userIdentities.length}</span>
        </div>
        <div>
          <strong>📜 Active Licenses:</strong> 
          <span style={{ color: '#ffff00', marginLeft: 8 }}>{userLicenses.length}</span>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: 40,
          color: '#00ffff'
        }}>
          <div style={{ fontSize: '2em', marginBottom: 10 }}>⏳</div>
          Loading vault data...
        </div>
      )}

      {/* Tab Content */}
      <div style={{
        background: '#1a1a1a',
        borderRadius: 8,
        padding: 20,
        minHeight: 400
      }}>
        {renderTabContent()}
      </div>
    </div>
  );
}