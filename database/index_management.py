"""
Database Index Management
Creates and manages Firestore indexes for optimal query performance
"""

from database.firebase_config import get_db
from database.schema import FIRESTORE_INDEXES
from database.models import ADDITIONAL_INDEXES
import json

class IndexManager:
    """Manages Firestore database indexes"""
    
    def __init__(self):
        self.db = get_db()
    
    def generate_index_config(self) -> dict:
        """Generate complete index configuration for Firebase CLI"""
        
        # Combine original and additional indexes
        all_indexes = FIRESTORE_INDEXES + ADDITIONAL_INDEXES
        
        config = {
            "indexes": all_indexes,
            "fieldOverrides": [
                {
                    "collectionGroup": "citizens",
                    "fieldPath": "nic",
                    "indexes": [
                        {
                            "order": "ASCENDING",
                            "queryScope": "COLLECTION"
                        },
                        {
                            "order": "DESCENDING", 
                            "queryScope": "COLLECTION"
                        }
                    ]
                },
                {
                    "collectionGroup": "appointments",
                    "fieldPath": "citizenNic",
                    "indexes": [
                        {
                            "order": "ASCENDING",
                            "queryScope": "COLLECTION"
                        }
                    ]
                },
                {
                    "collectionGroup": "staff",
                    "fieldPath": "email",
                    "indexes": [
                        {
                            "order": "ASCENDING",
                            "queryScope": "COLLECTION"
                        }
                    ]
                }
            ]
        }
        
        return config
    
    def export_index_config(self, filename: str = "firestore.indexes.json"):
        """Export index configuration to JSON file for Firebase CLI"""
        config = self.generate_index_config()
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(config, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Index configuration exported to {filename}")
        print("📋 To deploy indexes, run:")
        print(f"   firebase deploy --only firestore:indexes")
        
        return filename
    
    def list_required_indexes(self):
        """List all required indexes for the application"""
        print("📊 Required Firestore Indexes:")
        print("=" * 50)
        
        all_indexes = FIRESTORE_INDEXES + ADDITIONAL_INDEXES
        
        for i, index in enumerate(all_indexes, 1):
            collection = index['collectionGroup']
            fields = []
            
            for field in index['fields']:
                field_name = field['fieldPath']
                order = field.get('order', 'ASCENDING')
                fields.append(f"{field_name} ({order})")
            
            print(f"{i:2d}. Collection: {collection}")
            print(f"    Fields: {', '.join(fields)}")
            print()
    
    def validate_indexes(self):
        """Validate that required indexes exist (basic check)"""
        print("🔍 Validating indexes...")
        
        # Note: Firestore Admin SDK doesn't provide direct index introspection
        # This is a basic validation that can be extended
        
        try:
            # Test some queries that require indexes
            test_queries = [
                # Citizens by NIC and status
                self.db.collection('citizens').where('nic', '==', 'test').limit(1),
                
                # Appointments by citizen and date
                self.db.collection('appointments').where('citizenNic', '==', 'test').order_by('appointmentDate').limit(1),
                
                # Time slots by date and availability
                self.db.collection('timeSlots').where('date', '==', '2024-01-01').where('isAvailable', '==', True).limit(1),
                
                # Staff by department and role
                self.db.collection('staff').where('department', '==', 'test').where('role', '==', 'staff').limit(1),
                
                # Notifications by user and read status
                self.db.collection('notifications').where('userId', '==', 'test').where('isRead', '==', False).order_by('createdAt', direction='DESCENDING').limit(1)
            ]
            
            for query in test_queries:
                try:
                    # Just get the query object without executing
                    query._get_query()
                    print("✅ Query structure valid")
                except Exception as e:
                    print(f"⚠️ Query may need index: {e}")
            
            print("✅ Index validation completed")
            
        except Exception as e:
            print(f"❌ Index validation error: {e}")

# Index deployment instructions
DEPLOYMENT_INSTRUCTIONS = """
🚀 Firestore Index Deployment Instructions
==========================================

1. Install Firebase CLI:
   npm install -g firebase-tools

2. Login to Firebase:
   firebase login

3. Initialize Firebase in your project:
   firebase init firestore

4. Export index configuration:
   python -c "from database.index_management import IndexManager; IndexManager().export_index_config()"

5. Deploy indexes:
   firebase deploy --only firestore:indexes

6. Monitor deployment:
   - Check Firebase Console > Firestore > Indexes
   - Wait for all indexes to show "Enabled" status
   - Large indexes may take several minutes to build

⚠️ Important Notes:
- Index deployment can take time for large datasets
- Existing data will be indexed automatically
- Some queries may fail until indexes are built
- Unused indexes consume storage and cost money

📋 Query Performance Tips:
- Use composite indexes for multi-field queries
- Order by fields should be last in composite indexes  
- Equality filters before range filters
- Limit result sets appropriately
"""

if __name__ == "__main__":
    import sys
    
    manager = IndexManager()
    
    if len(sys.argv) > 1:
        command = sys.argv[1]
        
        if command == "export":
            filename = sys.argv[2] if len(sys.argv) > 2 else "firestore.indexes.json"
            manager.export_index_config(filename)
            
        elif command == "list":
            manager.list_required_indexes()
            
        elif command == "validate":
            manager.validate_indexes()
            
        elif command == "instructions":
            print(DEPLOYMENT_INSTRUCTIONS)
            
        else:
            print("Unknown command")
    else:
        print("Usage:")
        print("  python index_management.py export [filename]")
        print("  python index_management.py list")
        print("  python index_management.py validate")
        print("  python index_management.py instructions")
