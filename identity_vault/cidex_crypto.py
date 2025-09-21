import hashlib
import json
import base64
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from typing import Dict, Any, Tuple
import secrets
import time
from datetime import datetime

class CiDexCrypto:
    """CiDex encryption format for metadata protection"""
    
    CURRENT_VERSION = "v1.0"
    SALT_LENGTH = 16
    
    @classmethod
    def generate_key_from_wallet(cls, wallet_address: str, additional_entropy: str = "") -> bytes:
        """Generate encryption key from wallet address and additional entropy"""
        combined_data = f"{wallet_address}:{additional_entropy}:{int(time.time())}"
        salt = hashlib.sha256(combined_data.encode()).digest()[:cls.SALT_LENGTH]
        
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
        )
        key = base64.urlsafe_b64encode(kdf.derive(wallet_address.encode()))
        return key
    
    @classmethod  
    def encrypt_metadata(cls, metadata: Dict[Any, Any], wallet_address: str) -> Tuple[str, str]:
        """
        Encrypt metadata into CiDex format
        Returns: (encrypted_data, key_hash)
        """
        # Generate unique key for this metadata
        entropy = secrets.token_hex(16)
        key = cls.generate_key_from_wallet(wallet_address, entropy)
        key_hash = hashlib.sha256(key).hexdigest()
        
        # Create cipher instance
        cipher = Fernet(key)
        
        # Prepare metadata with CiDex headers
        cidex_metadata = {
            "version": cls.CURRENT_VERSION,
            "timestamp": datetime.utcnow().isoformat(),
            "wallet": wallet_address,
            "entropy": entropy,
            "data": metadata
        }
        
        # Convert to JSON and encrypt
        json_data = json.dumps(cidex_metadata, sort_keys=True).encode()
        encrypted_data = cipher.encrypt(json_data)
        
        # Encode to base64 for storage
        encrypted_b64 = base64.b64encode(encrypted_data).decode()
        
        return encrypted_b64, key_hash
    
    @classmethod
    def decrypt_metadata(cls, encrypted_data: str, wallet_address: str, entropy: str) -> Dict[Any, Any]:
        """
        Decrypt CiDex format metadata
        """
        try:
            # Regenerate key
            key = cls.generate_key_from_wallet(wallet_address, entropy)
            cipher = Fernet(key)
            
            # Decode and decrypt
            encrypted_bytes = base64.b64decode(encrypted_data.encode())
            decrypted_data = cipher.decrypt(encrypted_bytes)
            
            # Parse JSON
            cidex_metadata = json.loads(decrypted_data.decode())
            
            # Verify wallet address matches
            if cidex_metadata.get("wallet") != wallet_address:
                raise ValueError("Wallet address mismatch")
            
            return cidex_metadata["data"]
            
        except Exception as e:
            raise ValueError(f"Failed to decrypt CiDex metadata: {str(e)}")
    
    @classmethod
    def create_metadata_hash(cls, identity_data: Dict[Any, Any]) -> str:
        """Create consistent hash for identity metadata"""
        # Sort keys for consistent hashing
        json_str = json.dumps(identity_data, sort_keys=True)
        return hashlib.sha256(json_str.encode()).hexdigest()
    
    @classmethod
    def validate_cidex_format(cls, encrypted_data: str, key_hash: str) -> bool:
        """Validate that data is in proper CiDex format"""
        try:
            # Basic validation - should be valid base64
            base64.b64decode(encrypted_data.encode())
            
            # Key hash should be valid hex
            int(key_hash, 16)
            
            return len(key_hash) == 64  # SHA256 hex length
            
        except:
            return False

class IdentityProtection:
    """Enhanced protection utilities for identity data"""
    
    @classmethod
    def create_sovereign_signature(cls, identity_id: str, wallet_address: str) -> str:
        """Create gTek sovereign signature for identity"""
        timestamp = int(time.time())
        signature_data = f"gTek:SOVEREIGN:{identity_id}:{wallet_address}:{timestamp}"
        signature_hash = hashlib.sha256(signature_data.encode()).hexdigest()
        return f"gTek-{signature_hash[:16]}-{timestamp}"
    
    @classmethod
    def validate_wallet_ownership(cls, wallet_address: str, signature: str) -> bool:
        """Validate wallet ownership (placeholder for actual wallet signature verification)"""
        # In real implementation, this would verify cryptographic signature
        # For now, basic validation
        return len(wallet_address) > 32 and len(signature) > 10
    
    @classmethod
    def generate_license_terms(cls, license_type: str, usage_rights: list) -> str:
        """Generate standardized license terms"""
        base_terms = f"""
gTek Sovereign Identity License Agreement
License Type: {license_type.upper()}
Usage Rights: {', '.join(usage_rights)}

This license grants the specified usage rights under the gTek Sovereign OmniLicense framework.
All usage is monitored and logged. Unauthorized use will result in automatic enforcement.

Terms:
1. Licensed usage only for specified purposes
2. Attribution required for all derivative works  
3. Automatic micro-payment processing for usage
4. Real-time monitoring and audit trail
5. Revocation rights reserved by identity owner

© gTek Industries Sovereign Identity Vault System
"""
        return base_terms.strip()