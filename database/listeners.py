"""
Real-time Database Listeners
Monitors database changes for notifications and real-time updates
"""

from firebase_admin import firestore
from database.firebase_config import get_db
from database.schema import CollectionNames
from typing import Callable, Dict, Any
import logging

logger = logging.getLogger(__name__)

class DatabaseListener:
    """Real-time database listeners for GovConnect"""
    
    def __init__(self):
        self.db = get_db()
        self.listeners = {}
    
    def listen_appointment_status_changes(self, callback: Callable[[str, Dict[str, Any]], None]):
        """Listen for appointment status changes"""
        
        def on_appointment_change(doc_snapshot, changes, read_time):
            for change in changes:
                if change.type.name == 'MODIFIED':
                    doc_data = change.document.to_dict()
                    old_status = getattr(change.document, '_old_status', None)
                    new_status = doc_data.get('status')
                    
                    if old_status != new_status:
                        logger.info(f"Appointment {change.document.id} status changed: {old_status} -> {new_status}")
                        callback(change.document.id, doc_data)
        
        # Listen to all appointment collections
        collections = [
            CollectionNames.PASSPORT_APPOINTMENTS,
            CollectionNames.LICENSE_APPOINTMENTS,
            CollectionNames.MEDICAL_APPOINTMENTS
        ]
        
        for collection_name in collections:
            listener = self.db.collection(collection_name).on_snapshot(on_appointment_change)
            self.listeners[f"{collection_name}_status"] = listener
    
    def listen_new_appointments(self, callback: Callable[[str, Dict[str, Any]], None]):
        """Listen for new appointment creations"""
        
        def on_new_appointment(doc_snapshot, changes, read_time):
            for change in changes:
                if change.type.name == 'ADDED':
                    doc_data = change.document.to_dict()
                    logger.info(f"New appointment created: {change.document.id}")
                    callback(change.document.id, doc_data)
        
        collections = [
            CollectionNames.PASSPORT_APPOINTMENTS,
            CollectionNames.LICENSE_APPOINTMENTS,
            CollectionNames.MEDICAL_APPOINTMENTS
        ]
        
        for collection_name in collections:
            listener = self.db.collection(collection_name).on_snapshot(on_new_appointment)
            self.listeners[f"{collection_name}_new"] = listener
    
    def listen_citizen_updates(self, callback: Callable[[str, Dict[str, Any]], None]):
        """Listen for citizen profile updates"""
        
        def on_citizen_change(doc_snapshot, changes, read_time):
            for change in changes:
                if change.type.name in ['ADDED', 'MODIFIED']:
                    doc_data = change.document.to_dict()
                    logger.info(f"Citizen profile updated: {change.document.id}")
                    callback(change.document.id, doc_data)
        
        listener = self.db.collection(CollectionNames.CITIZENS).on_snapshot(on_citizen_change)
        self.listeners['citizens_updates'] = listener
    
    def listen_complaint_submissions(self, callback: Callable[[str, Dict[str, Any]], None]):
        """Listen for new complaint submissions"""
        
        def on_new_complaint(doc_snapshot, changes, read_time):
            for change in changes:
                if change.type.name == 'ADDED':
                    doc_data = change.document.to_dict()
                    logger.info(f"New complaint submitted: {change.document.id}")
                    callback(change.document.id, doc_data)
        
        listener = self.db.collection(CollectionNames.COMPLAINTS).on_snapshot(on_new_complaint)
        self.listeners['complaints_new'] = listener
    
    def listen_time_slot_changes(self, callback: Callable[[str, Dict[str, Any]], None]):
        """Listen for time slot availability changes"""
        
        def on_slot_change(doc_snapshot, changes, read_time):
            for change in changes:
                if change.type.name == 'MODIFIED':
                    doc_data = change.document.to_dict()
                    if doc_data.get('availability') == 'available':
                        logger.info(f"Time slot became available: {change.document.id}")
                        callback(change.document.id, doc_data)
        
        collections = [
            CollectionNames.PASSPORT_TIME_SLOTS,
            CollectionNames.LICENSE_TIME_SLOTS,
            CollectionNames.MEDICAL_TIME_SLOTS
        ]
        
        for collection_name in collections:
            listener = self.db.collection(collection_name).on_snapshot(on_slot_change)
            self.listeners[f"{collection_name}_availability"] = listener
    
    def stop_all_listeners(self):
        """Stop all active listeners"""
        for name, listener in self.listeners.items():
            listener.unsubscribe()
            logger.info(f"Stopped listener: {name}")
        self.listeners.clear()

# Example usage functions
def setup_notification_listeners():
    """Setup listeners for notification system (Person 5 will use this)"""
    listener = DatabaseListener()
    
    def on_status_change(appointment_id: str, data: Dict[str, Any]):
        # Person 5 will implement notification logic here
        print(f"Send notification: Appointment {appointment_id} status changed to {data.get('status')}")
    
    def on_new_appointment(appointment_id: str, data: Dict[str, Any]):
        # Person 5 will implement notification logic here
        print(f"Send confirmation: New appointment {appointment_id} created for {data.get('nic')}")
    
    listener.listen_appointment_status_changes(on_status_change)
    listener.listen_new_appointments(on_new_appointment)
    
    return listener

# Global listener instance
db_listener = DatabaseListener()
