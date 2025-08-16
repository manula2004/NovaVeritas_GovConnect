"""
Database Seeding Scripts
Person 2 - Database Setup

Creates initial data for development and testing
"""

from datetime import datetime, timedelta
from database.firebase_config import get_db
from database.schema import CollectionNames
from database.validation import DataValidator
import random

class DatabaseSeeder:
    """Database seeding utilities for initial data"""
    
    def __init__(self):
        self.db = get_db()
        self.validator = DataValidator()
    
    def seed_staff_data(self):
        """Seed initial staff data"""
        print("Seeding staff data...")
        
        staff_data = [
            {
                "staffId": "STF001",
                "firstName": "Amara",
                "lastName": "Silva",
                "email": "amara.silva@gov.lk",
                "phoneNumber": "+94771234567",
                "department": "Immigration",
                "position": "Senior Officer",
                "role": "staff",
                "createdAt": datetime.now(),
                "isActive": True
            },
            {
                "staffId": "STF002", 
                "firstName": "Priya",
                "lastName": "Fernando",
                "email": "priya.fernando@gov.lk",
                "phoneNumber": "+94771234568",
                "department": "Transport",
                "position": "Vehicle Inspector",
                "role": "staff",
                "createdAt": datetime.now(),
                "isActive": True
            },
            {
                "staffId": "STF003",
                "firstName": "Rajesh",
                "lastName": "Perera",
                "email": "rajesh.perera@gov.lk",
                "phoneNumber": "+94771234569",
                "department": "Health",
                "position": "Medical Officer",
                "role": "staff", 
                "createdAt": datetime.now(),
                "isActive": True
            },
            {
                "staffId": "ADM001",
                "firstName": "Sunitha",
                "lastName": "Jayawardena",
                "email": "sunitha.jayawardena@gov.lk",
                "phoneNumber": "+94771234570",
                "department": "Administration",
                "position": "System Administrator",
                "role": "admin",
                "createdAt": datetime.now(),
                "isActive": True
            }
        ]
        
        for staff in staff_data:
            self.db.collection(CollectionNames.STAFF).add(staff)
        
        print(f"✅ Seeded {len(staff_data)} staff members")
    
    def seed_service_categories(self):
        """Seed service categories"""
        print("Seeding service categories...")
        
        categories = [
            {
                "categoryId": "passport",
                "categoryName": "Passport Services",
                "description": "New passport applications and renewals",
                "isActive": True,
                "createdAt": datetime.now()
            },
            {
                "categoryId": "license",
                "categoryName": "Driving License",
                "description": "Driving license applications and renewals",
                "isActive": True,
                "createdAt": datetime.now()
            },
            {
                "categoryId": "nic",
                "categoryName": "National ID Card",
                "description": "National Identity Card services",
                "isActive": True,
                "createdAt": datetime.now()
            },
            {
                "categoryId": "birth",
                "categoryName": "Birth Certificate",
                "description": "Birth certificate applications",
                "isActive": True,
                "createdAt": datetime.now()
            },
            {
                "categoryId": "marriage",
                "categoryName": "Marriage Certificate",
                "description": "Marriage certificate services",
                "isActive": True,
                "createdAt": datetime.now()
            }
        ]
        
        for category in categories:
            self.db.collection(CollectionNames.SERVICE_CATEGORIES).add(category)
        
        print(f"✅ Seeded {len(categories)} service categories")
    
    def seed_time_slots(self):
        """Seed time slots for appointments"""
        print("Seeding time slots...")
        
        # Create time slots for next 30 days
        start_date = datetime.now().replace(hour=9, minute=0, second=0, microsecond=0)
        
        time_slots = []
        for day in range(30):
            current_date = start_date + timedelta(days=day)
            
            # Skip weekends
            if current_date.weekday() >= 5:
                continue
            
            # Create slots from 9 AM to 4 PM (every 30 minutes)
            for hour in range(9, 16):
                for minute in [0, 30]:
                    slot_time = current_date.replace(hour=hour, minute=minute)
                    
                    # Randomly assign departments
                    departments = ["Immigration", "Transport", "Health", "Civil Registration"]
                    department = random.choice(departments)
                    
                    time_slot = {
                        "date": slot_time.strftime("%Y-%m-%d"),
                        "time": slot_time.strftime("%H:%M"),
                        "department": department,
                        "maxAppointments": 5,
                        "bookedAppointments": 0,
                        "isAvailable": True,
                        "createdAt": datetime.now()
                    }
                    
                    time_slots.append(time_slot)
        
        # Add to database in batches
        batch_size = 50
        for i in range(0, len(time_slots), batch_size):
            batch = self.db.batch()
            batch_slots = time_slots[i:i + batch_size]
            
            for slot in batch_slots:
                doc_ref = self.db.collection(CollectionNames.TIME_SLOTS).document()
                batch.set(doc_ref, slot)
            
            batch.commit()
        
        print(f"✅ Seeded {len(time_slots)} time slots")
    
    def seed_sample_citizens(self):
        """Seed sample citizen data"""
        print("Seeding sample citizens...")
        
        sample_citizens = [
            {
                "nic": "199912345678",
                "firstName": "Kamal",
                "lastName": "Perera",
                "email": "kamal.perera@email.com",
                "phoneNumber": "+94771111111",
                "address": "123 Galle Road, Colombo 03",
                "dateOfBirth": datetime(1999, 5, 15),
                "gender": "Male",
                "createdAt": datetime.now(),
                "isVerified": True
            },
            {
                "nic": "198587654321",
                "firstName": "Nisha",
                "lastName": "Fernando",
                "email": "nisha.fernando@email.com", 
                "phoneNumber": "+94772222222",
                "address": "456 Kandy Road, Kandy",
                "dateOfBirth": datetime(1985, 10, 20),
                "gender": "Female",
                "createdAt": datetime.now(),
                "isVerified": True
            },
            {
                "nic": "199201234567",
                "firstName": "Saman",
                "lastName": "Silva",
                "email": "saman.silva@email.com",
                "phoneNumber": "+94773333333",
                "address": "789 Negombo Road, Negombo",
                "dateOfBirth": datetime(1992, 3, 8),
                "gender": "Male",
                "createdAt": datetime.now(),
                "isVerified": False
            }
        ]
        
        for citizen in sample_citizens:
            self.db.collection(CollectionNames.CITIZENS).add(citizen)
        
        print(f"✅ Seeded {len(sample_citizens)} sample citizens")
    
    def seed_sample_appointments(self):
        """Seed sample appointments"""
        print("Seeding sample appointments...")
        
        # Get some time slots and citizens
        time_slots = list(self.db.collection(CollectionNames.TIME_SLOTS).limit(10).stream())
        citizens = list(self.db.collection(CollectionNames.CITIZENS).limit(3).stream())
        
        if not time_slots or not citizens:
            print("⚠️ No time slots or citizens found. Please seed those first.")
            return
        
        sample_appointments = []
        statuses = ["pending", "confirmed", "completed", "cancelled"]
        
        for i, slot in enumerate(time_slots[:6]):
            citizen = random.choice(citizens)
            slot_data = slot.to_dict()
            citizen_data = citizen.to_dict()
            
            appointment = {
                "citizenId": citizen.id,
                "citizenNic": citizen_data.get("nic"),
                "citizenName": f"{citizen_data.get('firstName')} {citizen_data.get('lastName')}",
                "serviceType": random.choice(["passport", "license", "nic", "birth"]),
                "appointmentDate": slot_data.get("date"),
                "appointmentTime": slot_data.get("time"),
                "timeSlotId": slot.id,
                "department": slot_data.get("department"),
                "status": random.choice(statuses),
                "notes": f"Sample appointment {i+1}",
                "createdAt": datetime.now(),
                "queueNumber": i + 1
            }
            
            sample_appointments.append(appointment)
        
        for appointment in sample_appointments:
            self.db.collection(CollectionNames.APPOINTMENTS).add(appointment)
        
        print(f"✅ Seeded {len(sample_appointments)} sample appointments")
    
    def seed_all(self):
        """Seed all initial data"""
        print("🌱 Starting database seeding...")
        
        try:
            self.seed_staff_data()
            self.seed_service_categories()
            self.seed_time_slots()
            self.seed_sample_citizens()
            self.seed_sample_appointments()
            
            print("✅ Database seeding completed successfully!")
            
        except Exception as e:
            print(f"❌ Error during seeding: {e}")
            raise
    
    def clear_all_data(self):
        """Clear all data from collections (for testing)"""
        print("⚠️ Clearing all data...")
        
        collections = [
            CollectionNames.CITIZENS,
            CollectionNames.APPOINTMENTS,
            CollectionNames.STAFF,
            CollectionNames.TIME_SLOTS,
            CollectionNames.SERVICE_CATEGORIES,
            CollectionNames.PASSPORT_APPOINTMENTS,
            CollectionNames.LICENSE_APPOINTMENTS,
            CollectionNames.NIC_APPOINTMENTS,
            CollectionNames.BIRTH_CERTIFICATE_APPOINTMENTS,
            CollectionNames.MARRIAGE_CERTIFICATE_APPOINTMENTS,
            CollectionNames.COMPLAINTS,
            CollectionNames.FEEDBACK
        ]
        
        for collection_name in collections:
            docs = self.db.collection(collection_name).stream()
            for doc in docs:
                doc.reference.delete()
            print(f"Cleared {collection_name}")
        
        print("✅ All data cleared")

# Command-line interface
if __name__ == "__main__":
    import sys
    
    seeder = DatabaseSeeder()
    
    if len(sys.argv) > 1:
        command = sys.argv[1]
        
        if command == "seed":
            seeder.seed_all()
        elif command == "clear":
            confirm = input("Are you sure you want to clear all data? (yes/no): ")
            if confirm.lower() == "yes":
                seeder.clear_all_data()
            else:
                print("Operation cancelled")
        elif command == "staff":
            seeder.seed_staff_data()
        elif command == "categories":
            seeder.seed_service_categories()
        elif command == "slots":
            seeder.seed_time_slots()
        elif command == "citizens":
            seeder.seed_sample_citizens()
        elif command == "appointments":
            seeder.seed_sample_appointments()
        else:
            print("Unknown command")
    else:
        print("Usage:")
        print("  python seeding.py seed          # Seed all data")
        print("  python seeding.py clear         # Clear all data")
        print("  python seeding.py staff         # Seed staff only")
        print("  python seeding.py categories    # Seed categories only")
        print("  python seeding.py slots         # Seed time slots only")
        print("  python seeding.py citizens      # Seed citizens only")
        print("  python seeding.py appointments  # Seed appointments only")
