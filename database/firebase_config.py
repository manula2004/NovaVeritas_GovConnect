"""
Firebase Configuration and Connection Management
"""

import firebase_admin
from firebase_admin import credentials, firestore, storage
import os
from typing import Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class FirebaseManager:
    """Singleton class for managing Firebase connections"""
    
    _instance = None
    _db = None
    _bucket = None
    _initialized = False
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(FirebaseManager, cls).__new__(cls)
        return cls._instance
    
    def initialize(self, service_account_path: Optional[str] = None):
        """Initialize Firebase Admin SDK"""
        if self._initialized:
            return
        
        try:
            if service_account_path and os.path.exists(service_account_path):
                # Use service account key file
                cred = credentials.Certificate(service_account_path)
                firebase_admin.initialize_app(cred, {
                    'storageBucket': 'nova-veritas.appspot.com'  
                })
            else:
                # Use default credentials (for deployed environments)
                firebase_admin.initialize_app()
            
            self._db = firestore.client()
            self._bucket = storage.bucket()
            self._initialized = True
            
            logger.info("Firebase initialized successfully")
            
        except Exception as e:
            logger.error(f"Failed to initialize Firebase: {str(e)}")
            raise
    
    @property
    def db(self):
        """Get Firestore database instance"""
        if not self._initialized:
            self.initialize()
        return self._db
    
    @property
    def bucket(self):
        """Get Storage bucket instance"""
        if not self._initialized:
            self.initialize()
        return self._bucket
    
    def health_check(self) -> bool:
        """Check if Firebase connection is healthy"""
        try:
            # Try to read from a system collection
            self.db.collection('_health').limit(1).get()
            return True
        except Exception as e:
            logger.error(f"Firebase health check failed: {str(e)}")
            return False

# Global instance
firebase_manager = FirebaseManager()

def get_db():
    """Get Firestore database instance"""
    return firebase_manager.db

def get_storage():
    """Get Storage bucket instance"""
    return firebase_manager.bucket

def initialize_firebase(service_account_path: Optional[str] = None):
    """Initialize Firebase with optional service account path"""
    firebase_manager.initialize(service_account_path)
