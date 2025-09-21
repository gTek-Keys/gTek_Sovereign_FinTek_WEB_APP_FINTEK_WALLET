# 🔐 gTek Sovereign Identity Vault

A comprehensive cybersecurity identity protection system that registers full names, brands, and aliases; encrypts metadata into CiDex format; and logs every use of the name across platforms with automated micropayment processing.

## ✨ Features Implemented

### 🔐 **Identity Registration**
- Full legal name, brand names, and aliases registration
- Wallet-based ownership verification
- CiDex encrypted metadata storage
- Sovereign control over identity data

### 📊 **Usage Monitoring & Logging**
- Real-time usage tracking across platforms
- IP address and user agent logging
- Comprehensive audit trail
- Authorization status monitoring

### 📜 **Digital Licensing System**
- Automated license request and approval workflow
- Multiple license types (Basic, Commercial, Enterprise, Custom)
- Granular usage rights management
- Terms and conditions generation

### 💰 **Micropayment Integration**
- SOL-based automatic payment processing
- Usage-based charging for authorized access
- Payment tracking and enforcement
- Wallet integration for seamless transactions

### 🛡️ **Access Control & Security**
- Unauthorized usage detection and blocking
- Automatic enforcement mechanisms
- NFT minting integration for copyright protection
- Secure CiDex encryption format

## 🏗️ Architecture

### Backend (Python/FastAPI)
```
identity_vault/
├── models.py          # Pydantic data models
├── cidex_crypto.py    # CiDex encryption utilities
├── storage.py         # File-based storage layer
├── service.py         # Core business logic
└── __init__.py        # Package initialization

identity_vault_api.py   # FastAPI REST API server
```

### Frontend (React)
```
Chat_Builder_Business-main/
├── App.js                          # Main application
└── components/
    ├── IdentityVault.js           # Main vault interface
    ├── IdentityRegistration.js    # Registration form
    ├── MonitoringDashboard.js     # Analytics dashboard
    ├── LicenseManagement.js       # License management
    └── LedgerViewer.js           # Usage log viewer
```

## 🚀 API Endpoints

### Identity Management
- `POST /register` - Register new identity with CiDex encryption
- `GET /identity/{identity_id}` - Get identity details
- `GET /search?q=name` - Search registered identities

### License Management
- `POST /license/request` - Request usage license
- `POST /license/{license_id}/approve` - Approve license (owner only)
- `POST /license/{license_id}/revoke` - Revoke license

### Usage Monitoring
- `POST /usage/log` - Log identity usage with authorization check
- `GET /usage/logs` - View usage logs with filtering
- `GET /analytics/{identity_id}` - Get identity analytics

### Wallet Integration
- `GET /wallet/{wallet}/identities` - Get wallet's identities
- `GET /wallet/{wallet}/licenses` - Get wallet's licenses

### System Status
- `GET /status` - System status and statistics
- `GET /health` - Health check endpoint

## 🔒 CiDex Encryption Format

Our proprietary encryption format provides:
- **Wallet-based Keys**: Encryption keys derived from wallet signatures
- **Metadata Protection**: All identity data encrypted before storage
- **Versioned Ciphers**: Upgradeable encryption standards
- **Sovereign Control**: Only wallet owner can decrypt

```json
{
  "version": "v1.0",
  "timestamp": "2025-01-01T00:00:00Z",
  "wallet": "wallet_address_here",
  "entropy": "random_entropy_string",
  "data": {
    "full_name": "Protected Name",
    "brand_names": ["Brand1", "Brand2"],
    "aliases": ["alias1", "alias2"]
  }
}
```

## 🖥️ Usage

### Starting the API Server
```bash
python identity_vault_api.py
```
Server runs on `http://localhost:8000`

### Running Tests
```bash
python test_identity_vault.py
```

### Frontend Development
The React components are designed to integrate with Phantom wallet and connect to the FastAPI backend for full functionality.

## 🔧 Dependencies

```
pydantic
fastapi
uvicorn
cryptography
python-multipart
```

## 🛡️ Security Features

- **Unauthorized Usage Detection**: Automatic blocking of unlicensed usage
- **Audit Trail**: Comprehensive logging of all identity interactions  
- **Access Control**: Granular permissions with usage rights management
- **Payment Enforcement**: Automatic micropayment processing
- **NFT Integration**: Copyright protection through blockchain
- **CiDex Encryption**: Proprietary metadata encryption system

## 📈 License Types & Pricing

| License Type | Base Fee | Description |
|-------------|----------|-------------|
| Basic | 10 SOL | Basic usage rights |
| Commercial | 100 SOL | Commercial usage allowed |
| Enterprise | 1000 SOL | Full enterprise rights |
| Custom | 500 SOL | Custom terms negotiated |

## 🎯 Usage Rights

- **View**: Basic viewing/reference
- **Reference**: Citation and attribution
- **Commercial Use**: Commercial applications
- **Derivative**: Create derivative works
- **Publication**: Publishing and distribution

## 🏢 gTek Industries Integration

This system integrates with the broader gTek Industries ecosystem:
- **Sovereign OmniLicense**: Compatible with gTek licensing framework
- **Blockchain Integration**: Solana/Ethereum compatible
- **NFT Minting**: Automatic copyright protection
- **Audit Systems**: Integration with existing audit tools

---

**© 2025 gTek Industries - Sovereign Identity Vault System v1.0**  
*Powered by CiDex Encryption & Solana Blockchain*