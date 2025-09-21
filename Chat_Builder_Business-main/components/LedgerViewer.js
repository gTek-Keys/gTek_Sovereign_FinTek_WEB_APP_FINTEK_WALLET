import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:8000';

export default function LedgerViewer({ walletAddress }) {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    identity_id: '',
    platform: '',
    authorized_only: false,
    start_date: '',
    end_date: ''
  });
  const [userIdentities, setUserIdentities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    loadUserIdentities();
    loadUsageLogs();
  }, []);

  useEffect(() => {
    loadUsageLogs();
  }, [filters]);

  const loadUserIdentities = async () => {
    try {
      const response = await fetch(`${API_BASE}/wallet/${walletAddress}/identities`);
      if (response.ok) {
        const data = await response.json();
        setUserIdentities(data.identities || []);
      }
    } catch (error) {
      console.error('Error loading identities:', error);
    }
  };

  const loadUsageLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      // Add filters if they have values
      if (filters.identity_id) params.append('identity_id', filters.identity_id);
      if (filters.platform) params.append('platform', filters.platform);
      if (filters.authorized_only) params.append('authorized_only', 'true');
      if (filters.start_date) params.append('start_date', filters.start_date);
      if (filters.end_date) params.append('end_date', filters.end_date);

      const response = await fetch(`${API_BASE}/usage/logs?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setLogs(data.logs || []);
        
        // Extract unique platforms
        const uniquePlatforms = [...new Set(data.logs.map(log => log.platform))];
        setPlatforms(uniquePlatforms);
      }
    } catch (error) {
      console.error('Error loading usage logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      identity_id: '',
      platform: '',
      authorized_only: false,
      start_date: '',
      end_date: ''
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusIcon = (authorized) => {
    return authorized ? '✅' : '❌';
  };

  const getStatusColor = (authorized) => {
    return authorized ? '#00ff00' : '#ff4444';
  };

  const inputStyle = {
    padding: '8px',
    background: '#333',
    color: '#fff',
    border: '1px solid #555',
    borderRadius: '4px',
    fontSize: '0.9em'
  };

  return (
    <div>
      <h2 style={{ color: '#00ffff', marginBottom: 20 }}>📋 Usage Ledger Viewer</h2>

      {/* Filters */}
      <div style={{
        background: '#2a2a2a',
        padding: 20,
        borderRadius: 8,
        marginBottom: 20,
        borderLeft: '4px solid #00ffff'
      }}>
        <h3 style={{ color: '#00ffff', margin: '0 0 15px 0' }}>🔍 Filter Logs</h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 15,
          marginBottom: 15
        }}>
          <div>
            <label style={{ color: '#ccc', display: 'block', marginBottom: 5 }}>Identity</label>
            <select
              style={{...inputStyle, width: '100%'}}
              value={filters.identity_id}
              onChange={(e) => setFilters({...filters, identity_id: e.target.value})}
            >
              <option value="">All Identities</option>
              {userIdentities.map(identity => (
                <option key={identity.id} value={identity.id}>
                  {identity.full_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ color: '#ccc', display: 'block', marginBottom: 5 }}>Platform</label>
            <select
              style={{...inputStyle, width: '100%'}}
              value={filters.platform}
              onChange={(e) => setFilters({...filters, platform: e.target.value})}
            >
              <option value="">All Platforms</option>
              {platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ color: '#ccc', display: 'block', marginBottom: 5 }}>Start Date</label>
            <input
              type="datetime-local"
              style={{...inputStyle, width: '100%'}}
              value={filters.start_date}
              onChange={(e) => setFilters({...filters, start_date: e.target.value})}
            />
          </div>

          <div>
            <label style={{ color: '#ccc', display: 'block', marginBottom: 5 }}>End Date</label>
            <input
              type="datetime-local"
              style={{...inputStyle, width: '100%'}}
              value={filters.end_date}
              onChange={(e) => setFilters({...filters, end_date: e.target.value})}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
          <label style={{ color: '#ccc', display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={filters.authorized_only}
              onChange={(e) => setFilters({...filters, authorized_only: e.target.checked})}
              style={{ marginRight: 8 }}
            />
            Authorized Only
          </label>

          <button
            onClick={clearFilters}
            style={{
              background: '#666',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: 40,
          color: '#00ffff'
        }}>
          <div style={{ fontSize: '2em', marginBottom: 10 }}>⏳</div>
          Loading usage logs...
        </div>
      )}

      {/* Logs Summary */}
      {!loading && (
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
            <strong style={{ color: '#00ffff' }}>Total Logs: </strong>
            <span style={{ color: '#fff' }}>{logs.length}</span>
          </div>
          <div>
            <strong style={{ color: '#00ff00' }}>Authorized: </strong>
            <span style={{ color: '#fff' }}>{logs.filter(log => log.authorized).length}</span>
          </div>
          <div>
            <strong style={{ color: '#ff4444' }}>Unauthorized: </strong>
            <span style={{ color: '#fff' }}>{logs.filter(log => !log.authorized).length}</span>
          </div>
        </div>
      )}

      {/* Logs Table */}
      {!loading && logs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60 }}>
          <div style={{ fontSize: '4em', marginBottom: 20 }}>📊</div>
          <h3 style={{ color: '#ccc', marginBottom: 10 }}>No Usage Logs Found</h3>
          <p style={{ color: '#999' }}>
            {Object.values(filters).some(v => v) ? 
              'Try adjusting your filters to see more results' :
              'No usage has been logged yet for your identities'
            }
          </p>
        </div>
      ) : !loading && (
        <div style={{
          background: '#2a2a2a',
          borderRadius: 8,
          overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#1a1a1a' }}>
                  <th style={{ color: '#00ffff', padding: 15, textAlign: 'left', borderBottom: '2px solid #333' }}>
                    Timestamp
                  </th>
                  <th style={{ color: '#00ffff', padding: 15, textAlign: 'left', borderBottom: '2px solid #333' }}>
                    Identity
                  </th>
                  <th style={{ color: '#00ffff', padding: 15, textAlign: 'left', borderBottom: '2px solid #333' }}>
                    Platform
                  </th>
                  <th style={{ color: '#00ffff', padding: 15, textAlign: 'left', borderBottom: '2px solid #333' }}>
                    Usage Type
                  </th>
                  <th style={{ color: '#00ffff', padding: 15, textAlign: 'left', borderBottom: '2px solid #333' }}>
                    User Wallet
                  </th>
                  <th style={{ color: '#00ffff', padding: 15, textAlign: 'left', borderBottom: '2px solid #333' }}>
                    Status
                  </th>
                  <th style={{ color: '#00ffff', padding: 15, textAlign: 'left', borderBottom: '2px solid #333' }}>
                    Payment
                  </th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr key={index} style={{ 
                    borderBottom: '1px solid #333',
                    background: index % 2 === 0 ? '#2a2a2a' : '#252525'
                  }}>
                    <td style={{ padding: 15, color: '#ccc', fontSize: '0.9em' }}>
                      {formatDate(log.timestamp)}
                    </td>
                    <td style={{ padding: 15, color: '#fff', fontSize: '0.9em' }}>
                      {log.identity_id.substring(0, 8)}...
                    </td>
                    <td style={{ padding: 15, color: '#fff' }}>
                      {log.platform}
                    </td>
                    <td style={{ padding: 15, color: '#fff', textTransform: 'capitalize' }}>
                      {log.usage_type.replace('_', ' ')}
                    </td>
                    <td style={{ padding: 15, color: '#ccc', fontSize: '0.9em' }}>
                      {log.user_wallet.substring(0, 12)}...
                    </td>
                    <td style={{ padding: 15 }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '4px 8px',
                        borderRadius: 4,
                        fontSize: '0.8em',
                        background: log.authorized ? '#1a4d1a' : '#4d1a1a',
                        color: getStatusColor(log.authorized)
                      }}>
                        {getStatusIcon(log.authorized)} {log.authorized ? 'AUTHORIZED' : 'UNAUTHORIZED'}
                      </span>
                    </td>
                    <td style={{ padding: 15, color: log.payment_amount ? '#00ff00' : '#666' }}>
                      {log.payment_amount ? `${log.payment_amount} SOL` : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Export Options */}
      {!loading && logs.length > 0 && (
        <div style={{
          marginTop: 20,
          textAlign: 'center'
        }}>
          <button
            onClick={() => {
              const dataStr = JSON.stringify(logs, null, 2);
              const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
              const exportFileDefaultName = `usage_logs_${new Date().toISOString().split('T')[0]}.json`;
              
              const linkElement = document.createElement('a');
              linkElement.setAttribute('href', dataUri);
              linkElement.setAttribute('download', exportFileDefaultName);
              linkElement.click();
            }}
            style={{
              background: 'linear-gradient(45deg, #00ffff, #0080ff)',
              color: '#000',
              border: 'none',
              padding: '10px 20px',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            📥 Export Logs (JSON)
          </button>
        </div>
      )}
    </div>
  );
}