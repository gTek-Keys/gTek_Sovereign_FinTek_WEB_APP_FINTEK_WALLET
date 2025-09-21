import json
import os
from pathlib import Path
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid
from .models import Identity, DigitalLicense, UsageLog, LicenseStatus, UsageType
from .cidex_crypto import CiDexCrypto, IdentityProtection

class IdentityVaultStorage:
    """File-based storage for identity vault (can be extended to use databases)"""
    
    def __init__(self, storage_path: str = "./vault_data"):
        self.storage_path = Path(storage_path)
        self.storage_path.mkdir(exist_ok=True)
        
        # Create subdirectories
        (self.storage_path / "identities").mkdir(exist_ok=True)
        (self.storage_path / "licenses").mkdir(exist_ok=True)
        (self.storage_path / "usage_logs").mkdir(exist_ok=True)
        (self.storage_path / "metadata").mkdir(exist_ok=True)
    
    def _save_json(self, file_path: Path, data: Dict[Any, Any]) -> None:
        """Save data to JSON file"""
        with open(file_path, 'w') as f:
            json.dump(data, f, indent=2, default=str)
    
    def _load_json(self, file_path: Path) -> Optional[Dict[Any, Any]]:
        """Load data from JSON file"""
        if not file_path.exists():
            return None
        try:
            with open(file_path, 'r') as f:
                return json.load(f)
        except:
            return None
    
    def save_identity(self, identity: Identity) -> bool:
        """Save identity to storage"""
        try:
            file_path = self.storage_path / "identities" / f"{identity.id}.json"
            self._save_json(file_path, identity.dict())
            return True
        except Exception as e:
            print(f"Error saving identity: {e}")
            return False
    
    def get_identity(self, identity_id: str) -> Optional[Identity]:
        """Retrieve identity by ID"""
        file_path = self.storage_path / "identities" / f"{identity_id}.json"
        data = self._load_json(file_path)
        if data:
            return Identity(**data)
        return None
    
    def search_identities(self, query: str) -> List[Identity]:
        """Search identities by name, brand, or alias"""
        results = []
        identities_dir = self.storage_path / "identities"
        
        for file_path in identities_dir.glob("*.json"):
            data = self._load_json(file_path)
            if data:
                identity = Identity(**data)
                # Search in full name, brand names, and aliases
                searchable_text = " ".join([
                    identity.full_name.lower(),
                    " ".join(identity.brand_names).lower(),
                    " ".join(identity.aliases).lower()
                ])
                
                if query.lower() in searchable_text:
                    results.append(identity)
        
        return results
    
    def get_identities_by_wallet(self, wallet_address: str) -> List[Identity]:
        """Get all identities owned by a wallet"""
        results = []
        identities_dir = self.storage_path / "identities"
        
        for file_path in identities_dir.glob("*.json"):
            data = self._load_json(file_path)
            if data and data.get("owner_wallet") == wallet_address:
                results.append(Identity(**data))
        
        return results
    
    def save_license(self, license: DigitalLicense) -> bool:
        """Save digital license"""
        try:
            file_path = self.storage_path / "licenses" / f"{license.license_id}.json"
            self._save_json(file_path, license.dict())
            return True
        except Exception as e:
            print(f"Error saving license: {e}")
            return False
    
    def get_license(self, license_id: str) -> Optional[DigitalLicense]:
        """Retrieve license by ID"""
        file_path = self.storage_path / "licenses" / f"{license_id}.json"
        data = self._load_json(file_path)
        if data:
            return DigitalLicense(**data)
        return None
    
    def get_licenses_for_identity(self, identity_id: str) -> List[DigitalLicense]:
        """Get all licenses for an identity"""
        results = []
        licenses_dir = self.storage_path / "licenses"
        
        for file_path in licenses_dir.glob("*.json"):
            data = self._load_json(file_path)
            if data and data.get("identity_id") == identity_id:
                results.append(DigitalLicense(**data))
        
        return results
    
    def get_licenses_by_wallet(self, wallet_address: str) -> List[DigitalLicense]:
        """Get all licenses owned by a wallet"""
        results = []
        licenses_dir = self.storage_path / "licenses"
        
        for file_path in licenses_dir.glob("*.json"):
            data = self._load_json(file_path)
            if data and data.get("licensee_wallet") == wallet_address:
                results.append(DigitalLicense(**data))
        
        return results
    
    def log_usage(self, usage_log: UsageLog) -> bool:
        """Log identity usage"""
        try:
            # Create daily log file
            date_str = usage_log.timestamp.strftime("%Y-%m-%d")
            log_dir = self.storage_path / "usage_logs" / date_str
            log_dir.mkdir(exist_ok=True)
            
            file_path = log_dir / f"{usage_log.log_id}.json"
            self._save_json(file_path, usage_log.dict())
            return True
        except Exception as e:
            print(f"Error logging usage: {e}")
            return False
    
    def get_usage_logs(self, identity_id: Optional[str] = None, 
                      wallet_address: Optional[str] = None,
                      start_date: Optional[datetime] = None,
                      end_date: Optional[datetime] = None,
                      authorized_only: bool = False) -> List[UsageLog]:
        """Retrieve usage logs with filtering"""
        results = []
        usage_logs_dir = self.storage_path / "usage_logs"
        
        # If date range specified, only check those directories
        if start_date and end_date:
            current_date = start_date.date()
            end_date_only = end_date.date()
            
            while current_date <= end_date_only:
                date_str = current_date.strftime("%Y-%m-%d")
                day_dir = usage_logs_dir / date_str
                
                if day_dir.exists():
                    for file_path in day_dir.glob("*.json"):
                        data = self._load_json(file_path)
                        if data:
                            log = UsageLog(**data)
                            if self._matches_usage_filter(log, identity_id, wallet_address, authorized_only):
                                results.append(log)
                
                current_date = current_date.replace(day=current_date.day + 1)
        else:
            # Check all log files
            for day_dir in usage_logs_dir.iterdir():
                if day_dir.is_dir():
                    for file_path in day_dir.glob("*.json"):
                        data = self._load_json(file_path)
                        if data:
                            log = UsageLog(**data)
                            if self._matches_usage_filter(log, identity_id, wallet_address, authorized_only):
                                results.append(log)
        
        # Sort by timestamp
        results.sort(key=lambda x: x.timestamp, reverse=True)
        return results
    
    def _matches_usage_filter(self, log: UsageLog, identity_id: Optional[str], 
                            wallet_address: Optional[str], authorized_only: bool) -> bool:
        """Check if usage log matches filter criteria"""
        if identity_id and log.identity_id != identity_id:
            return False
        
        if wallet_address and log.user_wallet != wallet_address:
            return False
        
        if authorized_only and not log.authorized:
            return False
        
        return True
    
    def get_analytics_summary(self, identity_id: str) -> Dict[str, Any]:
        """Get analytics summary for an identity"""
        logs = self.get_usage_logs(identity_id=identity_id)
        
        total_usage = len(logs)
        authorized_usage = len([log for log in logs if log.authorized])
        unauthorized_usage = total_usage - authorized_usage
        
        # Usage by type
        usage_by_type = {}
        for log in logs:
            usage_type = log.usage_type
            usage_by_type[usage_type] = usage_by_type.get(usage_type, 0) + 1
        
        # Platform breakdown
        platforms = {}
        for log in logs:
            platform = log.platform
            platforms[platform] = platforms.get(platform, 0) + 1
        
        return {
            "total_usage": total_usage,
            "authorized_usage": authorized_usage,
            "unauthorized_usage": unauthorized_usage,
            "usage_by_type": usage_by_type,
            "platforms": platforms,
            "last_usage": logs[0].timestamp if logs else None
        }