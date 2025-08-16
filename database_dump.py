"""
Firebase Database Dump Script
Creates a local backup of all Firestore collections
"""

import sys
import os
import json
from datetime import datetime
from typing import Dict, Any

# Add database directory to path
sys.path.append('database')
from firebase_config import initialize_firebase, get_db

def convert_firestore_data(data: Any) -> Any:
    """Convert Firestore data types to JSON-serializable format"""
    if hasattr(data, 'to_dict'):
        return data.to_dict()
    elif isinstance(data, dict):
        return {k: convert_firestore_data(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [convert_firestore_data(item) for item in data]
    elif hasattr(data, 'isoformat'):  # datetime objects
        return data.isoformat()
    elif hasattr(data, '__dict__'):  # Firestore references
        return str(data)
    else:
        return data

def dump_collection(db, collection_name: str) -> Dict[str, Any]:
    """Dump a single collection to dictionary"""
    print(f"📦 Dumping collection: {collection_name}")
    
    collection_data = {}
    try:
        docs = db.collection(collection_name).get()
        
        for doc in docs:
            doc_id = doc.id
            doc_data = doc.to_dict()
            
            # Convert any special Firestore types
            cleaned_data = convert_firestore_data(doc_data)
            collection_data[doc_id] = cleaned_data
        
        print(f"   ✅ Exported {len(collection_data)} documents")
        
    except Exception as e:
        print(f"   ❌ Error dumping {collection_name}: {str(e)}")
        collection_data = {"error": str(e)}
    
    return collection_data

def create_database_dump():
    """Create complete database dump"""
    print("🚀 Starting Firebase Database Dump")
    print("=" * 50)
    
    # Initialize Firebase
    try:
        initialize_firebase('keys/nova-veritas-firebase-adminsdk-fbsvc-4e2f37a3d9.json')
        db = get_db()
        print("✅ Firebase connection established")
    except Exception as e:
        print(f"❌ Firebase initialization failed: {e}")
        return
    
    # Define collections to dump
    collections = [
        'citizens',
        'passports', 
        'licenses',
        'passportAppointments',
        'licenseAppointments',
        'medicalAppointments',
        'passportTimeSlots',
        'licenseTimeSlots',
        'medicalTimeSlots',
        'passportStaff',
        'rmvStaff',
        'medicalStaff',
        'complaints',
        'analytics_events'
    ]
    
    # Create dump data structure
    dump_data = {
        'metadata': {
            'dump_timestamp': datetime.now().isoformat(),
            'dump_version': '1.0',
            'total_collections': len(collections),
            'source': 'Firebase Firestore',
            'project_id': 'nova-veritas'
        },
        'collections': {}
    }
    
    # Dump each collection
    total_documents = 0
    for collection_name in collections:
        collection_data = dump_collection(db, collection_name)
        dump_data['collections'][collection_name] = collection_data
        
        if isinstance(collection_data, dict) and 'error' not in collection_data:
            total_documents += len(collection_data)
    
    # Update metadata
    dump_data['metadata']['total_documents'] = total_documents
    
    # Create backup directory
    backup_dir = 'database_backups'
    os.makedirs(backup_dir, exist_ok=True)
    
    # Generate filename with timestamp
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    dump_filename = f'firestore_dump_{timestamp}.json'
    dump_path = os.path.join(backup_dir, dump_filename)
    
    # Save dump to file
    try:
        with open(dump_path, 'w', encoding='utf-8') as f:
            json.dump(dump_data, f, indent=2, ensure_ascii=False, default=str)
        
        print(f"\n🎉 Database dump completed successfully!")
        print(f"📁 File saved: {dump_path}")
        print(f"📊 Total collections: {len(collections)}")
        print(f"📄 Total documents: {total_documents}")
        
        # Get file size
        file_size = os.path.getsize(dump_path)
        file_size_mb = file_size / (1024 * 1024)
        print(f"💾 File size: {file_size_mb:.2f} MB")
        
        # Create summary report
        create_dump_summary(dump_data, dump_path)
        
    except Exception as e:
        print(f"❌ Failed to save dump: {e}")

def create_dump_summary(dump_data: Dict, dump_path: str):
    """Create a summary report of the dump"""
    summary_path = dump_path.replace('.json', '_summary.txt')
    
    with open(summary_path, 'w', encoding='utf-8') as f:
        f.write("FIREBASE DATABASE DUMP SUMMARY\n")
        f.write("=" * 40 + "\n\n")
        
        # Metadata
        metadata = dump_data['metadata']
        f.write(f"Dump Timestamp: {metadata['dump_timestamp']}\n")
        f.write(f"Total Collections: {metadata['total_collections']}\n")
        f.write(f"Total Documents: {metadata['total_documents']}\n")
        f.write(f"Source: {metadata['source']}\n")
        f.write(f"Project ID: {metadata['project_id']}\n\n")
        
        # Collection details
        f.write("COLLECTION DETAILS:\n")
        f.write("-" * 20 + "\n")
        
        collections = dump_data['collections']
        for collection_name, collection_data in collections.items():
            if isinstance(collection_data, dict) and 'error' not in collection_data:
                doc_count = len(collection_data)
                f.write(f"{collection_name:<25} {doc_count:>5} documents\n")
            else:
                f.write(f"{collection_name:<25} ERROR\n")
        
        f.write(f"\nSummary saved: {summary_path}\n")
    
    print(f"📋 Summary report: {summary_path}")

def restore_instructions():
    """Print restore instructions"""
    print("\n" + "=" * 50)
    print("📖 RESTORE INSTRUCTIONS")
    print("=" * 50)
    print("To restore this backup:")
    print("1. Use the Firebase Admin SDK")
    print("2. Read the JSON file")
    print("3. Iterate through collections and documents")
    print("4. Use batch writes for efficiency")
    print("\nExample restore code:")
    print("```python")
    print("import json")
    print("with open('firestore_dump_YYYYMMDD_HHMMSS.json', 'r') as f:")
    print("    dump_data = json.load(f)")
    print("    for collection_name, docs in dump_data['collections'].items():")
    print("        for doc_id, doc_data in docs.items():")
    print("            db.collection(collection_name).document(doc_id).set(doc_data)")
    print("```")

if __name__ == '__main__':
    create_database_dump()
    restore_instructions()
