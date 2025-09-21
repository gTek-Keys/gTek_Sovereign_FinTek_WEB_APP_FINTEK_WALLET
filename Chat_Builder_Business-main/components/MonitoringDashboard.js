import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:8000';

export default function MonitoringDashboard({ walletAddress, identities }) {
  const [analytics, setAnalytics] = useState({});
  const [selectedIdentity, setSelectedIdentity] = useState(null);
  const [recentUsage, setRecentUsage] = useState([]);

  useEffect(() => {
    if (identities.length > 0 && !selectedIdentity) {
      setSelectedIdentity(identities[0]);
    }
  }, [identities]);

  useEffect(() => {
    if (selectedIdentity) {
      loadIdentityAnalytics(selectedIdentity.id);
      loadRecentUsage(selectedIdentity.id);
    }
  }, [selectedIdentity]);

  const loadIdentityAnalytics = async (identityId) => {
    try {
      const response = await fetch(`${API_BASE}/analytics/${identityId}`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data.analytics || {});
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  const loadRecentUsage = async (identityId) => {
    try {
      const response = await fetch(`${API_BASE}/usage/logs?identity_id=${identityId}`);
      if (response.ok) {
        const data = await response.json();
        setRecentUsage(data.logs.slice(0, 10) || []);
      }
    } catch (error) {
      console.error('Error loading recent usage:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (identities.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 60 }}>
        <div style={{ fontSize: '4em', marginBottom: 20 }}>🔍</div>
        <h2 style={{ color: '#00ffff', marginBottom: 10 }}>No Identities Registered</h2>
        <p style={{ color: '#ccc', marginBottom: 30 }}>
          Register your first identity to start protecting your digital presence
        </p>
        <div style={{
          background: '#2a2a2a',
          padding: 20,
          borderRadius: 8,
          borderLeft: '4px solid #00ffff'
        }}>
          <h3 style={{ color: '#fff', margin: '0 0 10px 0' }}>🚀 Get Started</h3>
          <p style={{ color: '#ccc', margin: 0 }}>
            Click the "Register Identity" tab to create your first secured identity vault entry
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ color: '#00ffff', marginBottom: 20 }}>📊 Identity Monitoring Dashboard</h2>

      {/* Identity Selector */}
      <div style={{ marginBottom: 30 }}>
        <label style={{ color: '#00ffff', fontWeight: 'bold', display: 'block', marginBottom: 10 }}>
          Select Identity to Monitor:
        </label>
        <select
          value={selectedIdentity?.id || ''}
          onChange={(e) => {
            const identity = identities.find(i => i.id === e.target.value);
            setSelectedIdentity(identity);
          }}
          style={{
            padding: '10px',
            background: '#333',
            color: '#fff',
            border: '1px solid #555',
            borderRadius: 6,
            fontSize: '1em',
            minWidth: 300
          }}
        >
          {identities.map(identity => (
            <option key={identity.id} value={identity.id}>
              {identity.full_name} ({identity.brand_names.join(', ')})
            </option>
          ))}
        </select>
      </div>

      {selectedIdentity && (
        <>
          {/* Identity Summary */}
          <div style={{
            background: '#2a2a2a',
            padding: 20,
            borderRadius: 8,
            marginBottom: 20,
            borderLeft: '4px solid #00ff00'
          }}>
            <h3 style={{ color: '#00ff00', margin: '0 0 15px 0' }}>
              🔐 {selectedIdentity.full_name}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 15 }}>
              <div>
                <strong style={{ color: '#00ffff' }}>Identity ID:</strong>
                <div style={{ color: '#ccc', fontSize: '0.9em' }}>{selectedIdentity.id}</div>
              </div>
              <div>
                <strong style={{ color: '#00ffff' }}>Brands:</strong>
                <div style={{ color: '#ccc', fontSize: '0.9em' }}>
                  {selectedIdentity.brand_names.length > 0 ? selectedIdentity.brand_names.join(', ') : 'None'}
                </div>
              </div>
              <div>
                <strong style={{ color: '#00ffff' }}>Aliases:</strong>
                <div style={{ color: '#ccc', fontSize: '0.9em' }}>
                  {selectedIdentity.aliases.length > 0 ? selectedIdentity.aliases.join(', ') : 'None'}
                </div>
              </div>
              <div>
                <strong style={{ color: '#00ffff' }}>Created:</strong>
                <div style={{ color: '#ccc', fontSize: '0.9em' }}>
                  {formatDate(selectedIdentity.created_at)}
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: 20,
            marginBottom: 30
          }}>
            <div style={{
              background: '#1a3d1a',
              padding: 20,
              borderRadius: 8,
              textAlign: 'center',
              border: '1px solid #00ff00'
            }}>
              <div style={{ fontSize: '2.5em', marginBottom: 10 }}>📈</div>
              <div style={{ color: '#00ff00', fontSize: '2em', fontWeight: 'bold' }}>
                {analytics.total_usage || 0}
              </div>
              <div style={{ color: '#ccc' }}>Total Usage Events</div>
            </div>

            <div style={{
              background: '#1a1a3d',
              padding: 20,
              borderRadius: 8,
              textAlign: 'center',
              border: '1px solid #0080ff'
            }}>
              <div style={{ fontSize: '2.5em', marginBottom: 10 }}>✅</div>
              <div style={{ color: '#0080ff', fontSize: '2em', fontWeight: 'bold' }}>
                {analytics.authorized_usage || 0}
              </div>
              <div style={{ color: '#ccc' }}>Authorized Usage</div>
            </div>

            <div style={{
              background: '#3d1a1a',
              padding: 20,
              borderRadius: 8,
              textAlign: 'center',
              border: '1px solid #ff4444'
            }}>
              <div style={{ fontSize: '2.5em', marginBottom: 10 }}>⚠️</div>
              <div style={{ color: '#ff4444', fontSize: '2em', fontWeight: 'bold' }}>
                {analytics.unauthorized_usage || 0}
              </div>
              <div style={{ color: '#ccc' }}>Unauthorized Usage</div>
            </div>

            <div style={{
              background: '#3d3d1a',
              padding: 20,
              borderRadius: 8,
              textAlign: 'center',
              border: '1px solid #ffff00'
            }}>
              <div style={{ fontSize: '2.5em', marginBottom: 10 }}>🏢</div>
              <div style={{ color: '#ffff00', fontSize: '2em', fontWeight: 'bold' }}>
                {Object.keys(analytics.platforms || {}).length}
              </div>
              <div style={{ color: '#ccc' }}>Active Platforms</div>
            </div>
          </div>

          {/* Recent Usage Activity */}
          <div style={{
            background: '#2a2a2a',
            padding: 20,
            borderRadius: 8,
            marginBottom: 20
          }}>
            <h3 style={{ color: '#00ffff', marginBottom: 15 }}>📋 Recent Usage Activity</h3>
            
            {recentUsage.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 30, color: '#666' }}>
                No usage recorded yet
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #555' }}>
                      <th style={{ color: '#00ffff', padding: 10, textAlign: 'left' }}>Time</th>
                      <th style={{ color: '#00ffff', padding: 10, textAlign: 'left' }}>Platform</th>
                      <th style={{ color: '#00ffff', padding: 10, textAlign: 'left' }}>Usage Type</th>
                      <th style={{ color: '#00ffff', padding: 10, textAlign: 'left' }}>User</th>
                      <th style={{ color: '#00ffff', padding: 10, textAlign: 'left' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsage.map((log, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #333' }}>
                        <td style={{ padding: 10, color: '#ccc', fontSize: '0.9em' }}>
                          {formatDate(log.timestamp)}
                        </td>
                        <td style={{ padding: 10, color: '#fff' }}>{log.platform}</td>
                        <td style={{ padding: 10, color: '#fff' }}>{log.usage_type}</td>
                        <td style={{ padding: 10, color: '#ccc', fontSize: '0.9em' }}>
                          {log.user_wallet.substring(0, 12)}...
                        </td>
                        <td style={{ padding: 10 }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: 4,
                            fontSize: '0.8em',
                            background: log.authorized ? '#1a4d1a' : '#4d1a1a',
                            color: log.authorized ? '#00ff00' : '#ff4444'
                          }}>
                            {log.authorized ? '✅ AUTHORIZED' : '❌ UNAUTHORIZED'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Platform Breakdown */}
          {analytics.platforms && Object.keys(analytics.platforms).length > 0 && (
            <div style={{
              background: '#2a2a2a',
              padding: 20,
              borderRadius: 8
            }}>
              <h3 style={{ color: '#00ffff', marginBottom: 15 }}>🏢 Platform Usage Breakdown</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 15 }}>
                {Object.entries(analytics.platforms).map(([platform, count]) => (
                  <div key={platform} style={{
                    background: '#1a1a1a',
                    padding: 15,
                    borderRadius: 6,
                    textAlign: 'center'
                  }}>
                    <div style={{ color: '#00ffff', fontWeight: 'bold', marginBottom: 5 }}>
                      {platform}
                    </div>
                    <div style={{ color: '#fff', fontSize: '1.5em' }}>{count}</div>
                    <div style={{ color: '#999', fontSize: '0.8em' }}>usage events</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}