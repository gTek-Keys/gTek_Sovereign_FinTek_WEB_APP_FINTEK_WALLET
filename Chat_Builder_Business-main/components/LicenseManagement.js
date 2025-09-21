import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:8000';

export default function LicenseManagement({ walletAddress, licenses, onLicenseUpdate }) {
  const [activeTab, setActiveTab] = useState('my-licenses');
  const [identities, setIdentities] = useState([]);
  const [licenseRequest, setLicenseRequest] = useState({
    identity_id: '',
    license_type: 'basic',
    usage_rights: [],
    purpose: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadAvailableIdentities();
  }, []);

  const loadAvailableIdentities = async () => {
    try {
      const response = await fetch(`${API_BASE}/search?q=`);
      if (response.ok) {
        const data = await response.json();
        // Filter out identities owned by current wallet
        const otherIdentities = data.results.filter(identity => 
          identity.owner_wallet !== walletAddress
        );
        setIdentities(otherIdentities);
      }
    } catch (error) {
      console.error('Error loading identities:', error);
    }
  };

  const handleLicenseRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const requestData = {
        ...licenseRequest,
        licensee_wallet: walletAddress,
        usage_rights: licenseRequest.usage_rights
      };

      const response = await fetch(`${API_BASE}/license/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: `✅ License request submitted: ${result.license_id}` });
        setLicenseRequest({
          identity_id: '',
          license_type: 'basic',
          usage_rights: [],
          purpose: ''
        });
        if (onLicenseUpdate) onLicenseUpdate();
      } else {
        setMessage({ type: 'error', text: `❌ Request failed: ${result.detail}` });
      }
    } catch (error) {
      setMessage({ type: 'error', text: `❌ Network error: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  const handleUsageRightToggle = (right) => {
    const current = licenseRequest.usage_rights;
    const updated = current.includes(right)
      ? current.filter(r => r !== right)
      : [...current, right];
    setLicenseRequest({ ...licenseRequest, usage_rights: updated });
  };

  const getLicenseStatusColor = (status) => {
    switch (status) {
      case 'active': return '#00ff00';
      case 'pending': return '#ffff00';
      case 'expired': return '#ff8800';
      case 'revoked': return '#ff0000';
      default: return '#ccc';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const tabStyle = (tab) => ({
    padding: '10px 20px',
    margin: '0 4px',
    background: activeTab === tab ? '#00ffff' : '#333',
    color: activeTab === tab ? '#000' : '#fff',
    border: 'none',
    borderRadius: '6px 6px 0 0',
    cursor: 'pointer',
    fontWeight: 'bold'
  });

  const inputStyle = {
    width: '100%',
    padding: '10px',
    background: '#333',
    color: '#fff',
    border: '1px solid #555',
    borderRadius: '6px',
    fontSize: '1em'
  };

  return (
    <div>
      <h2 style={{ color: '#00ffff', marginBottom: 20 }}>📜 License Management</h2>

      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        borderBottom: '2px solid #333',
        marginBottom: 20
      }}>
        <button 
          style={tabStyle('my-licenses')}
          onClick={() => setActiveTab('my-licenses')}
        >
          My Licenses ({licenses.length})
        </button>
        <button 
          style={tabStyle('request-license')}
          onClick={() => setActiveTab('request-license')}
        >
          Request License
        </button>
      </div>

      {message.text && (
        <div style={{
          padding: 15,
          marginBottom: 20,
          borderRadius: 6,
          background: message.type === 'success' ? '#1a4d1a' : '#4d1a1a',
          border: `1px solid ${message.type === 'success' ? '#00ff00' : '#ff0000'}`,
          color: message.type === 'success' ? '#00ff00' : '#ff9999'
        }}>
          {message.text}
        </div>
      )}

      {activeTab === 'my-licenses' && (
        <div>
          {licenses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <div style={{ fontSize: '4em', marginBottom: 20 }}>📜</div>
              <h3 style={{ color: '#ccc', marginBottom: 10 }}>No Licenses Yet</h3>
              <p style={{ color: '#999' }}>Request licenses to use protected identities</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 20 }}>
              {licenses.map(license => (
                <div
                  key={license.license_id}
                  style={{
                    background: '#2a2a2a',
                    padding: 20,
                    borderRadius: 8,
                    borderLeft: `4px solid ${getLicenseStatusColor(license.status)}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                    <h3 style={{ color: '#fff', margin: 0 }}>
                      License {license.license_id.substring(0, 8)}...
                    </h3>
                    <span style={{
                      padding: '6px 12px',
                      borderRadius: 4,
                      background: getLicenseStatusColor(license.status) + '20',
                      color: getLicenseStatusColor(license.status),
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      fontSize: '0.8em'
                    }}>
                      {license.status}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 15 }}>
                    <div>
                      <strong style={{ color: '#00ffff' }}>Identity ID:</strong>
                      <div style={{ color: '#ccc', fontSize: '0.9em' }}>{license.identity_id}</div>
                    </div>
                    <div>
                      <strong style={{ color: '#00ffff' }}>License Type:</strong>
                      <div style={{ color: '#ccc', fontSize: '0.9em', textTransform: 'capitalize' }}>
                        {license.license_type}
                      </div>
                    </div>
                    <div>
                      <strong style={{ color: '#00ffff' }}>Usage Rights:</strong>
                      <div style={{ color: '#ccc', fontSize: '0.9em' }}>
                        {license.usage_rights.join(', ')}
                      </div>
                    </div>
                    <div>
                      <strong style={{ color: '#00ffff' }}>Payment:</strong>
                      <div style={{ color: '#ccc', fontSize: '0.9em' }}>
                        {license.payment_amount} {license.currency}
                      </div>
                    </div>
                    <div>
                      <strong style={{ color: '#00ffff' }}>Issued:</strong>
                      <div style={{ color: '#ccc', fontSize: '0.9em' }}>
                        {formatDate(license.issued_at)}
                      </div>
                    </div>
                    {license.expires_at && (
                      <div>
                        <strong style={{ color: '#00ffff' }}>Expires:</strong>
                        <div style={{ color: '#ccc', fontSize: '0.9em' }}>
                          {formatDate(license.expires_at)}
                        </div>
                      </div>
                    )}
                  </div>

                  {license.terms && (
                    <details style={{ marginTop: 15 }}>
                      <summary style={{ color: '#00ffff', cursor: 'pointer' }}>License Terms</summary>
                      <pre style={{
                        background: '#1a1a1a',
                        padding: 15,
                        borderRadius: 6,
                        color: '#ccc',
                        fontSize: '0.8em',
                        whiteSpace: 'pre-wrap',
                        marginTop: 10
                      }}>
                        {license.terms}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'request-license' && (
        <div>
          <form onSubmit={handleLicenseRequest}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ color: '#00ffff', fontWeight: 'bold', display: 'block', marginBottom: 10 }}>
                Select Identity to License *
              </label>
              <select
                style={inputStyle}
                value={licenseRequest.identity_id}
                onChange={(e) => setLicenseRequest({...licenseRequest, identity_id: e.target.value})}
                required
              >
                <option value="">Choose an identity...</option>
                {identities.map(identity => (
                  <option key={identity.id} value={identity.id}>
                    {identity.full_name} - {identity.brand_names.join(', ')}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ color: '#00ffff', fontWeight: 'bold', display: 'block', marginBottom: 10 }}>
                License Type *
              </label>
              <select
                style={inputStyle}
                value={licenseRequest.license_type}
                onChange={(e) => setLicenseRequest({...licenseRequest, license_type: e.target.value})}
              >
                <option value="basic">Basic (10 SOL)</option>
                <option value="commercial">Commercial (100 SOL)</option>
                <option value="enterprise">Enterprise (1000 SOL)</option>
                <option value="custom">Custom (500 SOL)</option>
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ color: '#00ffff', fontWeight: 'bold', display: 'block', marginBottom: 10 }}>
                Usage Rights *
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
                {['view', 'reference', 'commercial_use', 'derivative', 'publication'].map(right => (
                  <label key={right} style={{ display: 'flex', alignItems: 'center', color: '#ccc' }}>
                    <input
                      type="checkbox"
                      checked={licenseRequest.usage_rights.includes(right)}
                      onChange={() => handleUsageRightToggle(right)}
                      style={{ marginRight: 8 }}
                    />
                    {right.replace('_', ' ').toUpperCase()}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 30 }}>
              <label style={{ color: '#00ffff', fontWeight: 'bold', display: 'block', marginBottom: 10 }}>
                Purpose of License *
              </label>
              <textarea
                style={{...inputStyle, height: 100, resize: 'vertical'}}
                value={licenseRequest.purpose}
                onChange={(e) => setLicenseRequest({...licenseRequest, purpose: e.target.value})}
                placeholder="Describe how you plan to use this identity..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !licenseRequest.identity_id || licenseRequest.usage_rights.length === 0}
              style={{
                background: loading ? '#666' : 'linear-gradient(45deg, #00ffff, #0080ff)',
                color: loading ? '#ccc' : '#000',
                border: 'none',
                padding: '15px 30px',
                borderRadius: 8,
                fontSize: '1.1em',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? '⏳ Submitting...' : '📜 Request License'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}