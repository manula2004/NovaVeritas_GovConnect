"""
Firebase Database Restore Script
Restores database from a local backup dump
"""

import sys
import os
import json
from datetime import datetime
from typing import Dict, Any

# Add database directory to path
sys.path.append('database')
from firebase_config import initialize_firebase, get_db

def restore_from_dump(dump_file_path: str, confirm_restore: bool = False):
    """Restore database from dump file"""
    
    if not os.path.exists(dump_file_path):
        print(f"❌ Dump file not found: {dump_file_path}")
        return False
    
    print("🔄 Starting Firebase Database Restore")
    print("=" * 50)
    print(f"📁 Source file: {dump_file_path}")
    
    # Safety confirmation
    if not confirm_restore:
        print("\n⚠️  WARNING: This will overwrite existing data!")
        print("⚠️  Make sure you have a current backup before proceeding!")
        confirm = input("\nType 'CONFIRM' to proceed with restore: ")
        if confirm != 'CONFIRM':
            print("❌ Restore cancelled by user")
            return False
    
    # Initialize Firebase
    try:
        initialize_firebase('keys/nova-veritas-firebase-adminsdk-fbsvc-4e2f37a3d9.json')
        db = get_db()
        print("✅ Firebase connection established")
    except Exception as e:
        print(f"❌ Firebase initialization failed: {e}")
        return False
    
    # Load dump data
    try:
        with open(dump_file_path, 'r', encoding='utf-8') as f:
            dump_data = json.load(f)
        print("✅ Dump file loaded successfully")
    except Exception as e:
        print(f"❌ Failed to load dump file: {e}")
        return False
    
    # Validate dump structure
    if 'collections' not in dump_data:
        print("❌ Invalid dump file format - missing 'collections'")
        return False
    
    metadata = dump_data.get('metadata', {})
    print(f"📊 Dump info: {metadata.get('total_collections', 'Unknown')} collections, {metadata.get('total_documents', 'Unknown')} documents")
    print(f"📅 Created: {metadata.get('dump_timestamp', 'Unknown')}")
    
    # Restore collections
    collections = dump_data['collections']
    total_restored = 0
    failed_collections = []
    
    for collection_name, documents in collections.items():
        if isinstance(documents, dict) and 'error' not in documents:
            print(f"\n📦 Restoring collection: {collection_name}")
            
            try:
                # Use batch writes for efficiency
                batch = db.batch()
                batch_count = 0
                
                for doc_id, doc_data in documents.items():
                    doc_ref = db.collection(collection_name).document(doc_id)
                    batch.set(doc_ref, doc_data)
                    batch_count += 1
                    
                    # Commit batch every 500 operations (Firestore limit)
                    if batch_count >= 500:
                        batch.commit()
                        batch = db.batch()
                        batch_count = 0
                
                # Commit remaining operations
                if batch_count > 0:
                    batch.commit()
                
                doc_count = len(documents)
                total_restored += doc_count
                print(f"   ✅ Restored {doc_count} documents")
                
            except Exception as e:
                print(f"   ❌ Failed to restore {collection_name}: {e}")
                failed_collections.append(collection_name)
        else:
            print(f"\n📦 Skipping {collection_name} (contains errors)")
            failed_collections.append(collection_name)
    
    # Summary
    print(f"\n🎉 Restore completed!")
    print(f"📄 Total documents restored: {total_restored}")
    
    if failed_collections:
        print(f"❌ Failed collections: {', '.join(failed_collections)}")
    else:
        print("✅ All collections restored successfully")
    
    return len(failed_collections) == 0

def list_available_dumps():
    """List available dump files"""
    backup_dir = 'database_backups'
    
    if not os.path.exists(backup_dir):
        print("❌ No backup directory found")
        return []
    
    dump_files = [f for f in os.listdir(backup_dir) if f.endswith('.json')]
    
    if not dump_files:
        print("❌ No dump files found")
        return []
    
    print("📁 Available backup files:")
    for i, filename in enumerate(dump_files, 1):
        filepath = os.path.join(backup_dir, filename)
        file_size = os.path.getsize(filepath) / (1024 * 1024)  # MB
        mod_time = datetime.fromtimestamp(os.path.getmtime(filepath))
        print(f"   {i}. {filename}")
        print(f"      Size: {file_size:.2f} MB, Modified: {mod_time.strftime('%Y-%m-%d %H:%M:%S')}")
    
    return [os.path.join(backup_dir, f) for f in dump_files]

def interactive_restore():
    """Interactive restore process"""
    print("🔄 Firebase Database Restore Tool")
    print("=" * 40)
    
    # List available dumps
    dump_files = list_available_dumps()
    
    if not dump_files:
        return
    
    # Select dump file
    try:
        choice = int(input(f"\nSelect backup file (1-{len(dump_files)}): ")) - 1
        if 0 <= choice < len(dump_files):
            selected_file = dump_files[choice]
            restore_from_dump(selected_file)
        else:
            print("❌ Invalid selection")
    except ValueError:
        print("❌ Please enter a valid number")

if __name__ == '__main__':
    if len(sys.argv) > 1:
        # Command line mode
        dump_file = sys.argv[1]
        confirm = len(sys.argv) > 2 and sys.argv[2] == '--confirm'
        restore_from_dump(dump_file, confirm)
    else:
        # Interactive mode
        interactive_restore()
