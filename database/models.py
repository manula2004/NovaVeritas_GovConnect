"""
Additional Data Models
Person 2 - Database Setup

Users, Notifications, and Documents models
"""

from datetime import datetime
from typing import Dict, Any, List, Optional
from dataclasses import dataclass
from enum import Enum

class UserRole(Enum):
    """User roles in the system"""
    CITIZEN = "citizen"
    STAFF = "staff"
    ADMIN = "admin"
    SUPER_ADMIN = "super_admin"

class NotificationType(Enum):
    """Notification types"""
    APPOINTMENT_CONFIRMED = "appointment_confirmed"
    APPOINTMENT_REMINDER = "appointment_reminder"
    APPOINTMENT_CANCELLED = "appointment_cancelled"
    STATUS_UPDATE = "status_update"
    SYSTEM_ANNOUNCEMENT = "system_announcement"
    DOCUMENT_READY = "document_ready"

class DocumentType(Enum):
    """Document types"""
    PASSPORT = "passport"
    LICENSE = "license"
    NIC = "nic"
    BIRTH_CERTIFICATE = "birth_certificate"
    MARRIAGE_CERTIFICATE = "marriage_certificate"
    PROFILE_PHOTO = "profile_photo"
    SUPPORTING_DOC = "supporting_document"

@dataclass
class User:
    """User model - separate from Citizens for authentication"""
    uid: str  # Firebase Auth UID
    email: str
    role: UserRole
    citizen_id: Optional[str] = None  # Links to Citizens collection
    staff_id: Optional[str] = None    # Links to Staff collection
    created_at: datetime = None
    last_login: Optional[datetime] = None
    is_active: bool = True
    profile_complete: bool = False
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "uid": self.uid,
            "email": self.email,
            "role": self.role.value,
            "citizenId": self.citizen_id,
            "staffId": self.staff_id,
            "createdAt": self.created_at or datetime.now(),
            "lastLogin": self.last_login,
            "isActive": self.is_active,
            "profileComplete": self.profile_complete
        }

@dataclass
class Notification:
    """Notification model"""
    notification_id: str
    user_id: str  # User UID
    type: NotificationType
    title: str
    message: str
    created_at: datetime = None
    read_at: Optional[datetime] = None
    is_read: bool = False
    data: Optional[Dict[str, Any]] = None  # Additional data
    priority: str = "normal"  # normal, high, urgent
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "notificationId": self.notification_id,
            "userId": self.user_id,
            "type": self.type.value,
            "title": self.title,
            "message": self.message,
            "createdAt": self.created_at or datetime.now(),
            "readAt": self.read_at,
            "isRead": self.is_read,
            "data": self.data or {},
            "priority": self.priority
        }

@dataclass
class Document:
    """Document model for file management"""
    document_id: str
    owner_id: str  # User UID or Citizen ID
    type: DocumentType
    original_name: str
    storage_path: str  # Firebase Storage path
    file_size: int  # bytes
    mime_type: str
    created_at: datetime = None
    updated_at: Optional[datetime] = None
    is_verified: bool = False
    verified_by: Optional[str] = None  # Staff ID
    verification_date: Optional[datetime] = None
    metadata: Optional[Dict[str, Any]] = None
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "documentId": self.document_id,
            "ownerId": self.owner_id,
            "type": self.type.value,
            "originalName": self.original_name,
            "storagePath": self.storage_path,
            "fileSize": self.file_size,
            "mimeType": self.mime_type,
            "createdAt": self.created_at or datetime.now(),
            "updatedAt": self.updated_at,
            "isVerified": self.is_verified,
            "verifiedBy": self.verified_by,
            "verificationDate": self.verification_date,
            "metadata": self.metadata or {}
        }

# Schema definitions for Firestore
USERS_SCHEMA = {
    "uid": {"type": "string", "required": True, "description": "Firebase Auth UID"},
    "email": {"type": "string", "required": True, "description": "User email address"},
    "role": {"type": "string", "required": True, "enum": ["citizen", "staff", "admin", "super_admin"]},
    "citizenId": {"type": "string", "required": False, "description": "Reference to Citizens collection"},
    "staffId": {"type": "string", "required": False, "description": "Reference to Staff collection"},
    "createdAt": {"type": "timestamp", "required": True},
    "lastLogin": {"type": "timestamp", "required": False},
    "isActive": {"type": "boolean", "required": True, "default": True},
    "profileComplete": {"type": "boolean", "required": True, "default": False}
}

NOTIFICATIONS_SCHEMA = {
    "notificationId": {"type": "string", "required": True, "description": "Unique notification ID"},
    "userId": {"type": "string", "required": True, "description": "Target user UID"},
    "type": {"type": "string", "required": True, "enum": [
        "appointment_confirmed", "appointment_reminder", "appointment_cancelled",
        "status_update", "system_announcement", "document_ready"
    ]},
    "title": {"type": "string", "required": True, "description": "Notification title"},
    "message": {"type": "string", "required": True, "description": "Notification message"},
    "createdAt": {"type": "timestamp", "required": True},
    "readAt": {"type": "timestamp", "required": False},
    "isRead": {"type": "boolean", "required": True, "default": False},
    "data": {"type": "map", "required": False, "description": "Additional notification data"},
    "priority": {"type": "string", "required": True, "enum": ["normal", "high", "urgent"], "default": "normal"}
}

DOCUMENTS_SCHEMA = {
    "documentId": {"type": "string", "required": True, "description": "Unique document ID"},
    "ownerId": {"type": "string", "required": True, "description": "Owner user UID or citizen ID"},
    "type": {"type": "string", "required": True, "enum": [
        "passport", "license", "nic", "birth_certificate", "marriage_certificate",
        "profile_photo", "supporting_document"
    ]},
    "originalName": {"type": "string", "required": True, "description": "Original filename"},
    "storagePath": {"type": "string", "required": True, "description": "Firebase Storage path"},
    "fileSize": {"type": "number", "required": True, "description": "File size in bytes"},
    "mimeType": {"type": "string", "required": True, "description": "MIME type"},
    "createdAt": {"type": "timestamp", "required": True},
    "updatedAt": {"type": "timestamp", "required": False},
    "isVerified": {"type": "boolean", "required": True, "default": False},
    "verifiedBy": {"type": "string", "required": False, "description": "Staff ID who verified"},
    "verificationDate": {"type": "timestamp", "required": False},
    "metadata": {"type": "map", "required": False, "description": "Additional document metadata"}
}

# Firestore indexes for additional collections
ADDITIONAL_INDEXES = [
    # Users collection indexes
    {
        "collectionGroup": "users",
        "queryScope": "COLLECTION",
        "fields": [
            {"fieldPath": "email", "order": "ASCENDING"},
            {"fieldPath": "isActive", "order": "ASCENDING"}
        ]
    },
    {
        "collectionGroup": "users", 
        "queryScope": "COLLECTION",
        "fields": [
            {"fieldPath": "role", "order": "ASCENDING"},
            {"fieldPath": "createdAt", "order": "DESCENDING"}
        ]
    },
    
    # Notifications collection indexes
    {
        "collectionGroup": "notifications",
        "queryScope": "COLLECTION", 
        "fields": [
            {"fieldPath": "userId", "order": "ASCENDING"},
            {"fieldPath": "isRead", "order": "ASCENDING"},
            {"fieldPath": "createdAt", "order": "DESCENDING"}
        ]
    },
    {
        "collectionGroup": "notifications",
        "queryScope": "COLLECTION",
        "fields": [
            {"fieldPath": "userId", "order": "ASCENDING"},
            {"fieldPath": "type", "order": "ASCENDING"},
            {"fieldPath": "createdAt", "order": "DESCENDING"}
        ]
    },
    {
        "collectionGroup": "notifications",
        "queryScope": "COLLECTION",
        "fields": [
            {"fieldPath": "priority", "order": "ASCENDING"},
            {"fieldPath": "isRead", "order": "ASCENDING"},
            {"fieldPath": "createdAt", "order": "DESCENDING"}
        ]
    },
    
    # Documents collection indexes
    {
        "collectionGroup": "documents",
        "queryScope": "COLLECTION",
        "fields": [
            {"fieldPath": "ownerId", "order": "ASCENDING"},
            {"fieldPath": "type", "order": "ASCENDING"},
            {"fieldPath": "createdAt", "order": "DESCENDING"}
        ]
    },
    {
        "collectionGroup": "documents",
        "queryScope": "COLLECTION",
        "fields": [
            {"fieldPath": "ownerId", "order": "ASCENDING"},
            {"fieldPath": "isVerified", "order": "ASCENDING"},
            {"fieldPath": "createdAt", "order": "DESCENDING"}
        ]
    },
    {
        "collectionGroup": "documents",
        "queryScope": "COLLECTION",
        "fields": [
            {"fieldPath": "type", "order": "ASCENDING"},
            {"fieldPath": "isVerified", "order": "ASCENDING"},
            {"fieldPath": "verificationDate", "order": "DESCENDING"}
        ]
    }
]

class ExtendedCollectionNames:
    """Extended collection names including additional models"""
    # Original collections
    CITIZENS = "citizens"
    APPOINTMENTS = "appointments"
    STAFF = "staff"
    TIME_SLOTS = "timeSlots"
    SERVICE_CATEGORIES = "serviceCategories"
    PASSPORT_APPOINTMENTS = "passportAppointments"
    LICENSE_APPOINTMENTS = "licenseAppointments"
    NIC_APPOINTMENTS = "nicAppointments"
    BIRTH_CERTIFICATE_APPOINTMENTS = "birthCertificateAppointments"
    MARRIAGE_CERTIFICATE_APPOINTMENTS = "marriageCertificateAppointments"
    COMPLAINTS = "complaints"
    FEEDBACK = "feedback"
    
    # Additional collections
    USERS = "users"
    NOTIFICATIONS = "notifications"
    DOCUMENTS = "documents"

# Combined schemas
EXTENDED_SCHEMAS = {
    ExtendedCollectionNames.USERS: USERS_SCHEMA,
    ExtendedCollectionNames.NOTIFICATIONS: NOTIFICATIONS_SCHEMA,
    ExtendedCollectionNames.DOCUMENTS: DOCUMENTS_SCHEMA
}
