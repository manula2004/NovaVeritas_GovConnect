"""
Database Backup and Migration Scripts
Person 2 - Database Setup
"""

import json
import os
from datetime import datetime
from google.cloud import firestore
from database.firebase_config import get_db
from database.schema import ALL_SCHEMAS, CollectionNames
from typing import Dict, Any, List

class DatabaseBackup:
    """Database backup and restoration utilities"""
    
    def __init__(self):
        self.db = get_db()
        self.backup_dir = "backups"
        os.makedirs(self.backup_dir, exist_ok=True)
    
    def backup_collection(self, collection_name: str) -> Dict[str, Any]:
        """Backup a single collection"""
        print(f"Backing up collection: {collection_name}")
        
        docs = self.db.collection(collection_name).get()
        backup_data = {}
        
        for doc in docs:
            doc_data = doc.to_dict()
            # Convert datetime objects to ISO strings
            backup_data[doc.id] = self._serialize_data(doc_data)
        
        print(f"Backed up {len(backup_data)} documents from {collection_name}")
        return backup_data
    
    def backup_all_collections(self) -> str:
        """Backup all collections to a JSON file"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_filename = f"govconnect_backup_{timestamp}.json"
        backup_path = os.path.join(self.backup_dir, backup_filename)
        
        full_backup = {
            "backup_date": datetime.now().isoformat(),
            "collections": {}
        }
        
        for collection_name in ALL_SCHEMAS.keys():
            try:
                collection_data = self.backup_collection(collection_name)
                full_backup["collections"][collection_name] = collection_data
            except Exception as e:
                print(f"Error backing up {collection_name}: {e}")
                full_backup["collections"][collection_name] = {"error": str(e)}
        
        # Save to file
        with open(backup_path, 'w', encoding='utf-8') as f:
            json.dump(full_backup, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Full backup completed: {backup_path}")
        return backup_path
    
    def restore_collection(self, collection_name: str, data: Dict[str, Any]):
        """Restore a single collection from backup data"""
        print(f"Restoring collection: {collection_name}")
        
        collection_ref = self.db.collection(collection_name)
        restored_count = 0
        
        for doc_id, doc_data in data.items():
            if doc_data.get("error"):
                print(f"Skipping {doc_id} due to backup error: {doc_data['error']}")
                continue
            
            try:
                # Deserialize data (convert ISO strings back to datetime)
                deserialized_data = self._deserialize_data(doc_data)
                collection_ref.document(doc_id).set(deserialized_data)
                restored_count += 1
            except Exception as e:
                print(f"Error restoring document {doc_id}: {e}")
        
        print(f"Restored {restored_count} documents to {collection_name}")
    
    def restore_from_backup(self, backup_file_path: str):
        """Restore all collections from a backup file"""
        print(f"Restoring from backup: {backup_file_path}")
        
        with open(backup_file_path, 'r', encoding='utf-8') as f:
            backup_data = json.load(f)
        
        collections_data = backup_data.get("collections", {})
        
        for collection_name, collection_data in collections_data.items():
            if collection_data.get("error"):
                print(f"Skipping {collection_name} due to backup error")
                continue
            
            try:
                self.restore_collection(collection_name, collection_data)
            except Exception as e:
                print(f"Error restoring collection {collection_name}: {e}")
        
        print("✅ Restoration completed")
    
    def _serialize_data(self, data: Any) -> Any:
        """Convert datetime objects to ISO strings for JSON serialization"""
        if isinstance(data, datetime):
            return data.isoformat()
        elif isinstance(data, dict):
            return {k: self._serialize_data(v) for k, v in data.items()}
        elif isinstance(data, list):
            return [self._serialize_data(item) for item in data]
        else:
            return data
    
    def _deserialize_data(self, data: Any) -> Any:
        """Convert ISO strings back to datetime objects"""
        if isinstance(data, str):
            # Try to parse as datetime
            try:
                return datetime.fromisoformat(data)
            except (ValueError, TypeError):
                return data
        elif isinstance(data, dict):
            return {k: self._deserialize_data(v) for k, v in data.items()}
        elif isinstance(data, list):
            return [self._deserialize_data(item) for item in data]
        else:
            return data

class DatabaseMigration:
    """Database migration utilities"""
    
    def __init__(self):
        self.db = get_db()
    
    def add_field_to_collection(self, collection_name: str, field_name: str, default_value: Any):
        """Add a new field to all documents in a collection"""
        print(f"Adding field '{field_name}' to collection '{collection_name}'")
        
        docs = self.db.collection(collection_name).get()
        updated_count = 0
        
        for doc in docs:
            doc_data = doc.to_dict()
            if field_name not in doc_data:
                doc.reference.update({field_name: default_value})
                updated_count += 1
        
        print(f"Added field to {updated_count} documents")
    
    def rename_field_in_collection(self, collection_name: str, old_field: str, new_field: str):
        """Rename a field in all documents of a collection"""
        print(f"Renaming field '{old_field}' to '{new_field}' in collection '{collection_name}'")
        
        docs = self.db.collection(collection_name).get()
        updated_count = 0
        
        for doc in docs:
            doc_data = doc.to_dict()
            if old_field in doc_data:
                value = doc_data[old_field]
                doc.reference.update({
                    new_field: value,
                    old_field: firestore.DELETE_FIELD
                })
                updated_count += 1
        
        print(f"Renamed field in {updated_count} documents")
    
    def update_schema_version(self, version: str):
        """Update schema version in database"""
        self.db.collection('_metadata').document('schema').set({
            'version': version,
            'updated_at': datetime.now()
        })
        print(f"Updated schema version to {version}")

# Command-line interface
if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python backup_migration.py backup")
        print("  python backup_migration.py restore <backup_file>")
        print("  python backup_migration.py add_field <collection> <field> <value>")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "backup":
        backup = DatabaseBackup()
        backup_file = backup.backup_all_collections()
        print(f"Backup saved to: {backup_file}")
    
    elif command == "restore" and len(sys.argv) == 3:
        backup_file = sys.argv[2]
        backup = DatabaseBackup()
        backup.restore_from_backup(backup_file)
    
    elif command == "add_field" and len(sys.argv) == 5:
        collection = sys.argv[2]
        field = sys.argv[3]
        value = sys.argv[4]
        migration = DatabaseMigration()
        migration.add_field_to_collection(collection, field, value)
    
    else:
        print("Invalid command or arguments")
