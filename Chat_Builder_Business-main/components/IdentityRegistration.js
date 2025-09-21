import React, { useState } from 'react';

const API_BASE = 'http://localhost:8000';

export default function IdentityRegistration({ walletAddress, onRegistered }) {
  const [formData, setFormData] = useState({
    full_name: '',
    brand_names: '',
    aliases: '',
    contact_email: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const registrationData = {
        full_name: formData.full_name.trim(),
        brand_names: formData.brand_names ? formData.brand_names.split(',').map(s => s.trim()).filter(s => s) : [],
        aliases: formData.aliases ? formData.aliases.split(',').map(s => s.trim()).filter(s => s) : [],
        owner_wallet: walletAddress,
        contact_email: formData.contact_email.trim() || null
      };

      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: `✅ Identity registered successfully! ID: ${result.identity_id}` });
        setFormData({ full_name: '', brand_names: '', aliases: '', contact_email: '' });
        if (onRegistered) onRegistered();
      } else {
        setMessage({ type: 'error', text: `❌ Registration failed: ${result.detail}` });
      }
    } catch (error) {
      setMessage({ type: 'error', text: `❌ Network error: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '8px 0',
    background: '#333',
    color: '#fff',
    border: '1px solid #555',
    borderRadius: '6px',
    fontSize: '1em'
  };

  const labelStyle = {
    display: 'block',
    color: '#00ffff',
    fontWeight: 'bold',
    marginTop: '15px',
    marginBottom: '5px'
  };

  return (
    <div>
      <h2 style={{ color: '#00ffff', marginBottom: 20 }}>📝 Register New Identity</h2>
      
      <div style={{
        background: '#2a2a2a',
        padding: 20,
        borderRadius: 8,
        marginBottom: 20,
        borderLeft: '4px solid #00ffff'
      }}>
        <h3 style={{ color: '#fff', margin: '0 0 10px 0' }}>🔐 CiDex Encryption Notice</h3>
        <p style={{ color: '#ccc', margin: 0 }}>
          Your identity metadata will be encrypted using our proprietary CiDex format 
          and secured with your wallet signature. This ensures sovereign control over your digital identity.
        </p>
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

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>
          Full Legal Name *
          <input
            type="text"
            style={inputStyle}
            value={formData.full_name}
            onChange={(e) => setFormData({...formData, full_name: e.target.value})}
            required
            placeholder="Enter your full legal name"
          />
        </label>

        <label style={labelStyle}>
          Brand Names
          <input
            type="text"
            style={inputStyle}
            value={formData.brand_names}
            onChange={(e) => setFormData({...formData, brand_names: e.target.value})}
            placeholder="Brand1, Brand2, Brand3 (comma separated)"
          />
          <small style={{ color: '#999', fontSize: '0.8em' }}>
            Optional: List any brand names associated with your identity
          </small>
        </label>

        <label style={labelStyle}>
          Aliases & Variations
          <input
            type="text"
            style={inputStyle}
            value={formData.aliases}
            onChange={(e) => setFormData({...formData, aliases: e.target.value})}
            placeholder="alias1, nickname, variation (comma separated)"
          />
          <small style={{ color: '#999', fontSize: '0.8em' }}>
            Optional: Known aliases, nicknames, or name variations
          </small>
        </label>

        <label style={labelStyle}>
          Contact Email
          <input
            type="email"
            style={inputStyle}
            value={formData.contact_email}
            onChange={(e) => setFormData({...formData, contact_email: e.target.value})}
            placeholder="your@email.com (optional)"
          />
          <small style={{ color: '#999', fontSize: '0.8em' }}>
            Optional: Contact email for license notifications
          </small>
        </label>

        <div style={{ marginTop: 30 }}>
          <button
            type="submit"
            disabled={loading || !formData.full_name.trim()}
            style={{
              background: loading ? '#666' : 'linear-gradient(45deg, #00ffff, #0080ff)',
              color: loading ? '#ccc' : '#000',
              border: 'none',
              padding: '15px 30px',
              borderRadius: 8,
              fontSize: '1.1em',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginRight: 10
            }}
          >
            {loading ? '⏳ Registering...' : '🔐 Register Identity'}
          </button>

          <div style={{ 
            display: 'inline-block',
            color: '#999',
            fontSize: '0.9em',
            marginLeft: 10,
            verticalAlign: 'middle'
          }}>
            Connected Wallet: {walletAddress.substring(0, 12)}...
          </div>
        </div>
      </form>

      <div style={{
        marginTop: 30,
        padding: 15,
        background: '#1a1a1a',
        borderRadius: 6,
        borderLeft: '4px solid #ffff00'
      }}>
        <h4 style={{ color: '#ffff00', margin: '0 0 10px 0' }}>⚠️ Important Notes</h4>
        <ul style={{ color: '#ccc', margin: 0, paddingLeft: 20 }}>
          <li>Once registered, your identity cannot be deleted, only deactivated</li>
          <li>All usage of your registered names will be monitored and logged</li>
          <li>Unauthorized use will trigger automatic enforcement mechanisms</li>
          <li>You maintain full sovereign control over licensing and permissions</li>
        </ul>
      </div>
    </div>
  );
}