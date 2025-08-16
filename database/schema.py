"""
Firestore Database Schema Design
Person 2 - Database Setup

GovConnect Database Schema for Sri Lankan Government Services
EXACT structure as specified - no additional properties
"""

from datetime import datetime
from typing import Dict, List, Optional, Any

# Enums for status fields
BLOOD_GROUPS = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"]
GENDER_OPTIONS = ["male", "female", "other"]
PASSPORT_STATUS = ["active", "expired", "lost", "cancelled"]
LICENSE_STATUS = ["active", "expired", "suspended", "revoked"]
APPOINTMENT_STATUS = ["pending", "confirmed", "in_progress", "completed", "cancelled"]
LICENSE_APPOINTMENT_STATUS = ["pending", "confirmed", "in_progress", "passed", "failed", "cancelled"]
MEDICAL_APPOINTMENT_STATUS = ["pending", "confirmed", "completed", "cancelled"]
DELIVERY_STATUS = ["pending", "out for delivery", "delivered"]
APPOINTMENT_TYPE = ["new license", "license renewal"]
AVAILABILITY_STATUS = ["available", "booked", "blocked"]
COMPLAINT_STATUS = ["submitted", "under_review", "in_progress", "resolved", "closed"]
DEPARTMENTS = ["passport", "license", "medical"]

# Collection Schemas - EXACT as specified

# 1. Citizens Collection (Document ID: NIC)
CITIZENS_SCHEMA = {
    "nic": str,
    "fullName": str,
    "email": str,
    "bloodGroup": str,
    "phoneNumber": str,
    "address": {
        "addressLine1": str,
        "addressLine2": str,
        "city": str
    },
    "dateOfBirth": datetime,
    "gender": str,
    "firebaseUid": str,
    "isActive": bool,
    "profileImage": str
}

# 2. Passports Collection (Document ID: passport number)
PASSPORTS_SCHEMA = {
    "passportNumber": str,
    "nic": str,
    "issuedDate": datetime,
    "expiryDate": datetime,
    "placeOfIssue": str,
    "status": str
}

# 3. Licenses Collection (Document ID: license number)
LICENSES_SCHEMA = {
    "licenseNumber": str,
    "nic": str,
    "issuedDate": datetime,
    "expiryDate": datetime,
    "vehicleType": str,
    "status": str
}

# 4. Passport Appointments Collection
PASSPORT_APPOINTMENTS_SCHEMA = {
    "appointmentId": str,
    "nic": str,
    "applicationForm": str,
    "supportingDocuments": List[str],
    "scheduledDateTime": datetime,
    "timeSlotId": str,
    "status": str,
    "qrCode": str,
    "deliveryStatus": str,
    "remarks": str
}

# 5. License Appointments Collection
LICENSE_APPOINTMENTS_SCHEMA = {
    "appointmentId": str,
    "nic": str,
    "applicationForm": str,
    "supportingDocuments": List[str],
    "scheduledDateTime": datetime,
    "timeSlotId": str,
    "status": str,
    "qrCode": str,
    "appointmentType": str,
    "deliveryStatus": str
}

# 6. Medical Appointments Collection
MEDICAL_APPOINTMENTS_SCHEMA = {
    "appointmentId": str,
    "nic": str,
    "scheduledDateTime": datetime,
    "timeSlotId": str,
    "status": str,
    "reports": str
}

# 7. Passport Time Slots Collection
PASSPORT_TIME_SLOTS_SCHEMA = {
    "timeSlotId": str,
    "startTime": datetime,
    "endTime": datetime,
    "location": str,
    "availability": str
}

# 8. License Time Slots Collection
LICENSE_TIME_SLOTS_SCHEMA = {
    "timeSlotId": str,
    "startTime": datetime,
    "endTime": datetime,
    "location": str,
    "availability": str
}

# 9. Medical Time Slots Collection
MEDICAL_TIME_SLOTS_SCHEMA = {
    "timeSlotId": str,
    "startTime": datetime,
    "endTime": datetime,
    "location": str,
    "availability": str
}

# 10. Passport Staff Collection
PASSPORT_STAFF_SCHEMA = {
    "passportStaffId": str,
    "name": str,
    "email": str
}

# 11. RMV Staff Collection
RMV_STAFF_SCHEMA = {
    "rmvStaffId": str,
    "name": str,
    "email": str
}

# 12. Medical Staff Collection
MEDICAL_STAFF_SCHEMA = {
    "medicalStaffId": str,
    "name": str,
    "email": str
}

# 13. Complaints Collection
COMPLAINTS_SCHEMA = {
    "complaintId": str,
    "nic": str,
    "department": str,
    "description": str,
    "status": str
}

# Collection Names Constants
class CollectionNames:
    CITIZENS = 'citizens'
    PASSPORTS = 'passports'
    LICENSES = 'licenses'
    PASSPORT_APPOINTMENTS = 'passportAppointments'
    LICENSE_APPOINTMENTS = 'licenseAppointments'
    MEDICAL_APPOINTMENTS = 'medicalAppointments'
    PASSPORT_TIME_SLOTS = 'passportTimeSlots'
    LICENSE_TIME_SLOTS = 'licenseTimeSlots'
    MEDICAL_TIME_SLOTS = 'medicalTimeSlots'
    PASSPORT_STAFF = 'passportStaff'
    RMV_STAFF = 'rmvStaff'
    MEDICAL_STAFF = 'medicalStaff'
    COMPLAINTS = 'complaints'

# All schemas combined
ALL_SCHEMAS = {
    CollectionNames.CITIZENS: CITIZENS_SCHEMA,
    CollectionNames.PASSPORTS: PASSPORTS_SCHEMA,
    CollectionNames.LICENSES: LICENSES_SCHEMA,
    CollectionNames.PASSPORT_APPOINTMENTS: PASSPORT_APPOINTMENTS_SCHEMA,
    CollectionNames.LICENSE_APPOINTMENTS: LICENSE_APPOINTMENTS_SCHEMA,
    CollectionNames.MEDICAL_APPOINTMENTS: MEDICAL_APPOINTMENTS_SCHEMA,
    CollectionNames.PASSPORT_TIME_SLOTS: PASSPORT_TIME_SLOTS_SCHEMA,
    CollectionNames.LICENSE_TIME_SLOTS: LICENSE_TIME_SLOTS_SCHEMA,
    CollectionNames.MEDICAL_TIME_SLOTS: MEDICAL_TIME_SLOTS_SCHEMA,
    CollectionNames.PASSPORT_STAFF: PASSPORT_STAFF_SCHEMA,
    CollectionNames.RMV_STAFF: RMV_STAFF_SCHEMA,
    CollectionNames.MEDICAL_STAFF: MEDICAL_STAFF_SCHEMA,
    CollectionNames.COMPLAINTS: COMPLAINTS_SCHEMA
}
