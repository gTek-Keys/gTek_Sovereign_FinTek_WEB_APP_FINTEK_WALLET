from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from typing import List, Optional
import os
from datetime import datetime

from identity_vault.service import IdentityVaultService
from identity_vault.models import (
    Identity, DigitalLicense, UsageLog, IdentityRegistration, 
    LicenseRequest, UsageQuery, UsageType, LicenseType
)

# Initialize FastAPI app
app = FastAPI(
    title="gTek Sovereign Identity Vault API",
    description="Cybersecurity Identity Vault with CiDex encryption and usage monitoring",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize service
vault_service = IdentityVaultService()

def get_client_ip(request: Request) -> str:
    """Extract client IP address from request"""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host

@app.get("/", response_class=HTMLResponse)
async def root():
    """API documentation page"""
    return """
    <html>
        <head>
            <title>gTek Sovereign Identity Vault</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; background: #0a0a0a; color: #fff; }
                h1 { color: #00ffff; }
                .endpoint { background: #1a1a1a; padding: 20px; margin: 10px 0; border-left: 4px solid #00ffff; }
                code { background: #333; padding: 2px 6px; color: #00ff00; }
            </style>
        </head>
        <body>
            <h1>🔐 gTek Sovereign Identity Vault API</h1>
            <p>Cybersecurity identity protection with CiDex encryption and usage monitoring.</p>
            
            <div class="endpoint">
                <h3>📝 Register Identity</h3>
                <p><code>POST /register</code> - Register a new identity</p>
            </div>
            
            <div class="endpoint">
                <h3>🔍 Search Identities</h3>
                <p><code>GET /search?q=name</code> - Search registered identities</p>
            </div>
            
            <div class="endpoint">
                <h3>📜 Request License</h3>
                <p><code>POST /license/request</code> - Request usage license</p>
            </div>
            
            <div class="endpoint">
                <h3>📊 Usage Monitoring</h3>
                <p><code>POST /usage/log</code> - Log identity usage</p>
                <p><code>GET /usage/logs</code> - View usage logs</p>
            </div>
            
            <div class="endpoint">
                <h3>💰 Wallet Management</h3>
                <p><code>GET /wallet/{wallet}/identities</code> - Get wallet identities</p>
                <p><code>GET /wallet/{wallet}/licenses</code> - Get wallet licenses</p>
            </div>
            
            <p><a href="/docs" style="color: #00ffff;">📚 Interactive API Documentation</a></p>
        </body>
    </html>
    """

# Identity Management Endpoints

@app.post("/register", response_model=dict)
async def register_identity(registration: IdentityRegistration):
    """Register a new identity in the vault"""
    success, message, identity = vault_service.register_identity(registration)
    
    if success:
        return {
            "success": True,
            "message": message,
            "identity_id": identity.id,
            "identity": identity.dict()
        }
    else:
        raise HTTPException(status_code=400, detail=message)

@app.get("/identity/{identity_id}", response_model=dict)
async def get_identity(identity_id: str):
    """Get identity details by ID"""
    identity = vault_service.get_identity(identity_id)
    if identity:
        return {"identity": identity.dict()}
    else:
        raise HTTPException(status_code=404, detail="Identity not found")

@app.get("/search", response_model=dict)
async def search_identities(q: str):
    """Search identities by name, brand, or alias"""
    identities = vault_service.search_identities(q)
    return {
        "query": q,
        "results": [identity.dict() for identity in identities],
        "count": len(identities)
    }

# License Management Endpoints

@app.post("/license/request", response_model=dict)
async def request_license(license_request: LicenseRequest):
    """Request a digital license for identity usage"""
    success, message, license = vault_service.request_license(license_request)
    
    if success:
        return {
            "success": True,
            "message": message,
            "license_id": license.license_id,
            "license": license.dict()
        }
    else:
        raise HTTPException(status_code=400, detail=message)

@app.post("/license/{license_id}/approve", response_model=dict)
async def approve_license(license_id: str, approver_wallet: str):
    """Approve a pending license (identity owner only)"""
    success, message = vault_service.approve_license(license_id, approver_wallet)
    
    if success:
        return {"success": True, "message": message}
    else:
        raise HTTPException(status_code=400, detail=message)

@app.post("/license/{license_id}/revoke", response_model=dict)
async def revoke_license(license_id: str, revoker_wallet: str):
    """Revoke a license"""
    success, message = vault_service.revoke_license(license_id, revoker_wallet)
    
    if success:
        return {"success": True, "message": message}
    else:
        raise HTTPException(status_code=400, detail=message)

# Usage Monitoring Endpoints

@app.post("/usage/log", response_model=dict)
async def log_usage(
    identity_id: str,
    user_wallet: str,
    usage_type: UsageType,
    platform: str,
    request: Request
):
    """Log identity usage and check authorization"""
    ip_address = get_client_ip(request)
    user_agent = request.headers.get("User-Agent", "Unknown")
    
    success, message, authorized = vault_service.log_identity_usage(
        identity_id, user_wallet, usage_type, platform, ip_address, user_agent
    )
    
    if success:
        return {
            "success": True,
            "message": message,
            "authorized": authorized
        }
    else:
        raise HTTPException(status_code=400, detail=message)

@app.get("/usage/logs", response_model=dict)
async def get_usage_logs(
    identity_id: Optional[str] = None,
    user_wallet: Optional[str] = None,
    platform: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    authorized_only: bool = False
):
    """Get usage logs with filtering"""
    
    # Parse dates if provided
    start_dt = datetime.fromisoformat(start_date) if start_date else None
    end_dt = datetime.fromisoformat(end_date) if end_date else None
    
    query = UsageQuery(
        identity_id=identity_id,
        user_wallet=user_wallet,
        platform=platform,
        start_date=start_dt,
        end_date=end_dt,
        authorized_only=authorized_only
    )
    
    logs = vault_service.get_usage_logs(query)
    
    return {
        "logs": [log.dict() for log in logs],
        "count": len(logs),
        "filters": query.dict()
    }

# Analytics Endpoints

@app.get("/analytics/{identity_id}", response_model=dict)
async def get_identity_analytics(identity_id: str):
    """Get analytics for an identity"""
    analytics = vault_service.get_identity_analytics(identity_id)
    return {"identity_id": identity_id, "analytics": analytics}

# Wallet Management Endpoints

@app.get("/wallet/{wallet_address}/identities", response_model=dict)
async def get_wallet_identities(wallet_address: str):
    """Get all identities owned by a wallet"""
    identities = vault_service.get_wallet_identities(wallet_address)
    return {
        "wallet": wallet_address,
        "identities": [identity.dict() for identity in identities],
        "count": len(identities)
    }

@app.get("/wallet/{wallet_address}/licenses", response_model=dict)
async def get_wallet_licenses(wallet_address: str):
    """Get all licenses owned by a wallet"""
    licenses = vault_service.get_wallet_licenses(wallet_address)
    return {
        "wallet": wallet_address,
        "licenses": [license.dict() for license in licenses],
        "count": len(licenses)
    }

# System Status Endpoints

@app.get("/status", response_model=dict)
async def get_system_status():
    """Get system status and statistics"""
    return {
        "status": "active",
        "version": "1.0.0",
        "encryption": "CiDex v1.0",
        "vault_secure": True,
        "timestamp": datetime.utcnow().isoformat()
    }

# Health Check
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)