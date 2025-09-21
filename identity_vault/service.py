import uuid
from datetime import datetime, timedelta
from typing import List, Optional, Dict, Any, Tuple
from .models import (
    Identity, DigitalLicense, UsageLog, LicenseStatus, UsageType, 
    LicenseType, IdentityRegistration, LicenseRequest, UsageQuery
)
from .storage import IdentityVaultStorage
from .cidex_crypto import CiDexCrypto, IdentityProtection

class IdentityVaultService:
    """Core service for cybersecurity identity vault operations"""
    
    def __init__(self, storage_path: str = "./vault_data"):
        self.storage = IdentityVaultStorage(storage_path)
        self.crypto = CiDexCrypto()
    
    def register_identity(self, registration: IdentityRegistration) -> Tuple[bool, str, Optional[Identity]]:
        """
        Register a new identity in the vault
        Returns: (success, message, identity)
        """
        try:
            # Validate wallet ownership (in real implementation, verify signature)
            if not IdentityProtection.validate_wallet_ownership(
                registration.owner_wallet, "placeholder_signature"
            ):
                return False, "Invalid wallet ownership", None
            
            # Check for duplicate names
            existing_identities = self.storage.search_identities(registration.full_name)
            for existing in existing_identities:
                if existing.full_name.lower() == registration.full_name.lower():
                    return False, "Identity name already registered", None
            
            # Generate unique ID
            identity_id = str(uuid.uuid4())
            
            # Prepare metadata for encryption
            metadata = {
                "full_name": registration.full_name,
                "brand_names": registration.brand_names,
                "aliases": registration.aliases,
                "contact_email": registration.contact_email,
                "registration_timestamp": datetime.utcnow().isoformat()
            }
            
            # Encrypt metadata using CiDex format
            encrypted_data, key_hash = self.crypto.encrypt_metadata(
                metadata, registration.owner_wallet
            )
            
            # Create identity object
            identity = Identity(
                id=identity_id,
                full_name=registration.full_name,
                brand_names=registration.brand_names,
                aliases=registration.aliases,
                owner_wallet=registration.owner_wallet,
                metadata_hash=key_hash
            )
            
            # Save to storage
            if self.storage.save_identity(identity):
                return True, "Identity registered successfully", identity
            else:
                return False, "Failed to save identity", None
            
        except Exception as e:
            return False, f"Registration error: {str(e)}", None
    
    def get_identity(self, identity_id: str) -> Optional[Identity]:
        """Retrieve identity by ID"""
        return self.storage.get_identity(identity_id)
    
    def search_identities(self, query: str) -> List[Identity]:
        """Search identities by name, brand, or alias"""
        return self.storage.search_identities(query)
    
    def request_license(self, license_request: LicenseRequest) -> Tuple[bool, str, Optional[DigitalLicense]]:
        """
        Request a digital license for identity usage
        Returns: (success, message, license)
        """
        try:
            # Verify identity exists
            identity = self.storage.get_identity(license_request.identity_id)
            if not identity:
                return False, "Identity not found", None
            
            # Check if requester is the owner (automatic approval)
            auto_approve = license_request.licensee_wallet == identity.owner_wallet
            
            # Calculate payment amount based on license type
            payment_amount = self._calculate_license_fee(
                license_request.license_type, 
                license_request.usage_rights
            )
            
            # Generate license terms
            terms = IdentityProtection.generate_license_terms(
                license_request.license_type.value,
                [right.value for right in license_request.usage_rights]
            )
            
            # Create license
            license_id = str(uuid.uuid4())
            license = DigitalLicense(
                license_id=license_id,
                identity_id=license_request.identity_id,
                licensee_wallet=license_request.licensee_wallet,
                license_type=license_request.license_type,
                status=LicenseStatus.ACTIVE if auto_approve else LicenseStatus.PENDING,
                usage_rights=license_request.usage_rights,
                payment_amount=payment_amount,
                terms=terms
            )
            
            # Save license
            if self.storage.save_license(license):
                status_msg = "License approved (owner)" if auto_approve else "License pending approval"
                return True, status_msg, license
            else:
                return False, "Failed to save license", None
                
        except Exception as e:
            return False, f"License request error: {str(e)}", None
    
    def approve_license(self, license_id: str, approver_wallet: str) -> Tuple[bool, str]:
        """Approve a pending license (only identity owner can approve)"""
        try:
            license = self.storage.get_license(license_id)
            if not license:
                return False, "License not found"
            
            identity = self.storage.get_identity(license.identity_id)
            if not identity:
                return False, "Associated identity not found"
            
            # Only identity owner can approve
            if approver_wallet != identity.owner_wallet:
                return False, "Only identity owner can approve licenses"
            
            # Update license status
            license.status = LicenseStatus.ACTIVE
            
            if self.storage.save_license(license):
                return True, "License approved successfully"
            else:
                return False, "Failed to update license"
                
        except Exception as e:
            return False, f"License approval error: {str(e)}"
    
    def log_identity_usage(self, identity_id: str, user_wallet: str, usage_type: UsageType,
                          platform: str, ip_address: str, user_agent: str) -> Tuple[bool, str, bool]:
        """
        Log identity usage and check authorization
        Returns: (logged_successfully, message, authorized)
        """
        try:
            # Check if usage is authorized
            authorized, license_id, payment_amount = self._check_usage_authorization(
                identity_id, user_wallet, usage_type
            )
            
            # Create usage log
            log_id = str(uuid.uuid4())
            usage_log = UsageLog(
                log_id=log_id,
                identity_id=identity_id,
                user_wallet=user_wallet,
                usage_type=usage_type,
                platform=platform,
                ip_address=ip_address,
                user_agent=user_agent,
                authorized=authorized,
                license_id=license_id,
                payment_amount=payment_amount
            )
            
            # Log usage
            if self.storage.log_usage(usage_log):
                if authorized:
                    # Process micropayment (placeholder)
                    self._process_micropayment(identity_id, user_wallet, payment_amount)
                    return True, "Usage logged and authorized", True
                else:
                    return True, "Usage logged - UNAUTHORIZED", False
            else:
                return False, "Failed to log usage", False
                
        except Exception as e:
            return False, f"Usage logging error: {str(e)}", False
    
    def get_usage_logs(self, query: UsageQuery) -> List[UsageLog]:
        """Get usage logs with filtering"""
        return self.storage.get_usage_logs(
            identity_id=query.identity_id,
            wallet_address=query.user_wallet,
            start_date=query.start_date,
            end_date=query.end_date,
            authorized_only=query.authorized_only
        )
    
    def get_identity_analytics(self, identity_id: str) -> Dict[str, Any]:
        """Get analytics for an identity"""
        return self.storage.get_analytics_summary(identity_id)
    
    def get_wallet_identities(self, wallet_address: str) -> List[Identity]:
        """Get all identities owned by a wallet"""
        return self.storage.get_identities_by_wallet(wallet_address)
    
    def get_wallet_licenses(self, wallet_address: str) -> List[DigitalLicense]:
        """Get all licenses owned by a wallet"""
        return self.storage.get_licenses_by_wallet(wallet_address)
    
    def _check_usage_authorization(self, identity_id: str, user_wallet: str, 
                                 usage_type: UsageType) -> Tuple[bool, Optional[str], Optional[float]]:
        """
        Check if identity usage is authorized
        Returns: (authorized, license_id, payment_amount)
        """
        try:
            # Get identity
            identity = self.storage.get_identity(identity_id)
            if not identity:
                return False, None, None
            
            # Owner always authorized
            if user_wallet == identity.owner_wallet:
                return True, None, 0.0
            
            # Check for valid licenses
            licenses = self.storage.get_licenses_by_wallet(user_wallet)
            for license in licenses:
                if (license.identity_id == identity_id and 
                    license.status == LicenseStatus.ACTIVE and
                    usage_type in license.usage_rights):
                    
                    # Check expiration
                    if license.expires_at and datetime.utcnow() > license.expires_at:
                        continue
                    
                    return True, license.license_id, license.payment_amount * 0.01  # Micro-payment
            
            return False, None, None
            
        except Exception:
            return False, None, None
    
    def _calculate_license_fee(self, license_type: LicenseType, usage_rights: List[UsageType]) -> float:
        """Calculate license fee based on type and usage rights"""
        base_fees = {
            LicenseType.BASIC: 10.0,
            LicenseType.COMMERCIAL: 100.0,
            LicenseType.ENTERPRISE: 1000.0,
            LicenseType.CUSTOM: 500.0
        }
        
        usage_multipliers = {
            UsageType.VIEW: 1.0,
            UsageType.REFERENCE: 1.5,
            UsageType.COMMERCIAL_USE: 5.0,
            UsageType.DERIVATIVE: 3.0,
            UsageType.PUBLICATION: 2.0
        }
        
        base_fee = base_fees.get(license_type, 100.0)
        total_multiplier = sum(usage_multipliers.get(right, 1.0) for right in usage_rights)
        
        return base_fee * max(total_multiplier, 1.0)
    
    def _process_micropayment(self, identity_id: str, payer_wallet: str, amount: float) -> bool:
        """Process micropayment for identity usage (placeholder)"""
        # In real implementation, integrate with Solana/FinTek wallet
        print(f"Processing micropayment: {amount} SOL from {payer_wallet} for identity {identity_id}")
        return True
    
    def revoke_license(self, license_id: str, revoker_wallet: str) -> Tuple[bool, str]:
        """Revoke a license (only identity owner or licensee can revoke)"""
        try:
            license = self.storage.get_license(license_id)
            if not license:
                return False, "License not found"
            
            identity = self.storage.get_identity(license.identity_id)
            if not identity:
                return False, "Associated identity not found"
            
            # Only owner or licensee can revoke
            if revoker_wallet not in [identity.owner_wallet, license.licensee_wallet]:
                return False, "Unauthorized to revoke license"
            
            license.status = LicenseStatus.REVOKED
            
            if self.storage.save_license(license):
                return True, "License revoked successfully"
            else:
                return False, "Failed to revoke license"
                
        except Exception as e:
            return False, f"License revocation error: {str(e)}"