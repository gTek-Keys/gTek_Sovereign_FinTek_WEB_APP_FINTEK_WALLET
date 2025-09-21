from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

class LicenseType(str, Enum):
    BASIC = "basic"
    COMMERCIAL = "commercial"
    ENTERPRISE = "enterprise"
    CUSTOM = "custom"

class LicenseStatus(str, Enum):
    ACTIVE = "active"
    EXPIRED = "expired"
    REVOKED = "revoked"
    PENDING = "pending"

class UsageType(str, Enum):
    VIEW = "view"
    REFERENCE = "reference"
    COMMERCIAL_USE = "commercial_use"
    DERIVATIVE = "derivative"
    PUBLICATION = "publication"

class Identity(BaseModel):
    id: str = Field(..., description="Unique identity identifier")
    full_name: str = Field(..., description="Full legal name")
    brand_names: List[str] = Field(default=[], description="Associated brand names")
    aliases: List[str] = Field(default=[], description="Known aliases and variations")
    owner_wallet: str = Field(..., description="Wallet address of the identity owner")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    metadata_hash: str = Field(..., description="CiDex encrypted metadata hash")
    is_active: bool = Field(default=True)

class DigitalLicense(BaseModel):
    license_id: str = Field(..., description="Unique license identifier")
    identity_id: str = Field(..., description="Associated identity ID")
    licensee_wallet: str = Field(..., description="Wallet address of licensee")
    license_type: LicenseType = Field(..., description="Type of license")
    status: LicenseStatus = Field(default=LicenseStatus.PENDING)
    usage_rights: List[UsageType] = Field(..., description="Allowed usage types")
    payment_amount: float = Field(..., description="License fee amount")
    currency: str = Field(default="SOL", description="Payment currency")
    issued_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: Optional[datetime] = Field(None, description="License expiration date")
    terms: str = Field(..., description="License terms and conditions")

class UsageLog(BaseModel):
    log_id: str = Field(..., description="Unique log entry identifier")
    identity_id: str = Field(..., description="Identity being used")
    user_wallet: str = Field(..., description="Wallet of user accessing identity")
    usage_type: UsageType = Field(..., description="Type of usage")
    platform: str = Field(..., description="Platform where usage occurred")
    ip_address: str = Field(..., description="IP address of accessor")
    user_agent: str = Field(..., description="User agent string")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    authorized: bool = Field(..., description="Whether usage was authorized")
    license_id: Optional[str] = Field(None, description="Associated license if authorized")
    payment_processed: bool = Field(default=False)
    payment_amount: Optional[float] = Field(None)

class CiDexMetadata(BaseModel):
    encrypted_data: str = Field(..., description="Encrypted metadata in CiDex format")
    encryption_key_hash: str = Field(..., description="Hash of encryption key")
    cipher_version: str = Field(default="v1.0", description="CiDex cipher version")
    created_at: datetime = Field(default_factory=datetime.utcnow)

class IdentityRegistration(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    brand_names: List[str] = Field(default=[])
    aliases: List[str] = Field(default=[])
    owner_wallet: str = Field(..., description="Wallet address for ownership verification")
    contact_email: Optional[str] = Field(None)
    
class LicenseRequest(BaseModel):
    identity_id: str = Field(..., description="Identity to license")
    licensee_wallet: str = Field(..., description="Requesting wallet address")
    license_type: LicenseType = Field(..., description="Requested license type")
    usage_rights: List[UsageType] = Field(..., description="Requested usage rights")
    purpose: str = Field(..., description="Purpose of license usage")
    
class UsageQuery(BaseModel):
    identity_id: Optional[str] = None
    user_wallet: Optional[str] = None
    platform: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    authorized_only: bool = False