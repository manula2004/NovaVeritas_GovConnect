"""
GovConnect - Sri Lankan Government Services Platform
Unified Backend Server
"""

import os
import logging
import uuid
import qrcode
import io
import base64
import random
from datetime import datetime, timedelta
from functools import wraps
from typing import Dict, Any, Optional, List, Union

from flask import Flask, request, jsonify, g
from flask_cors import CORS
from flask_mail import Mail, Message
from flask_socketio import SocketIO, emit, join_room

import firebase_admin
from firebase_admin import credentials, auth, firestore, storage
import jwt
from werkzeug.security import check_password_hash, generate_password_hash

from database.firebase_config import initialize_firebase, get_db, get_storage, firebase_manager
from config import Config

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global variables for Firebase
db = None
bucket = None

class GovConnectServer:
    """Main server class integrating all components"""
    
    def __init__(self):
        self.app: Optional[Flask] = None
        self.mail: Optional[Mail] = None
        self.socketio: Optional[SocketIO] = None
        
    def create_app(self):
        """Create and configure the Flask application"""
        
        # Initialize Flask
        self.app = Flask(__name__)
        self.app.config.from_object(Config)
        
        # Enable CORS
        CORS(self.app, supports_credentials=True)
        
        # Initialize Firebase
        self._initialize_firebase()
        
        # Initialize extensions
        self._initialize_extensions()
        
        # Register routes
        self._register_routes()
        
        # Setup error handlers
        self._setup_error_handlers()
        
        logger.info("GovConnect server initialized successfully")
        return self.app
    
    def _initialize_firebase(self):
        """Initialize Firebase Admin SDK using database configuration"""
        global db, bucket
        
        try:
            firebase_key_path = os.getenv("FIREBASE_KEY_PATH", "keys/nova-veritas-firebase-adminsdk-fbsvc-4e2f37a3d9.json")
            
            if not os.path.exists(firebase_key_path):
                raise FileNotFoundError(f"Firebase key file not found: {firebase_key_path}")
            
            # Use the professional database configuration
            initialize_firebase(firebase_key_path)
            
            # Get database and storage instances
            db = get_db()
            bucket = get_storage()
            
            logger.info("Firebase initialized successfully using database configuration")
            
        except Exception as e:
            logger.error(f"Firebase initialization failed: {e}")
            raise
    
    def _initialize_extensions(self):
        """Initialize Flask extensions"""
        
        # Initialize Mail
        self.mail = Mail(self.app)
        
        # Initialize SocketIO
        self.socketio = SocketIO(self.app, cors_allowed_origins="*")
        
        # Setup SocketIO events
        self._setup_socketio()
    
    def _setup_socketio(self):
        """Setup SocketIO events"""
        
        @self.socketio.on('connect')
        def handle_connect():
            logger.info(f"Client connected: {request.sid}")
        
        @self.socketio.on('disconnect')
        def handle_disconnect():
            logger.info(f"Client disconnected: {request.sid}")
    
    def _register_routes(self):
        """Register all application routes"""
        
        # Health check
        @self.app.route('/health')
        def health_check():
            return jsonify({
                'status': 'healthy',
                'timestamp': datetime.utcnow().isoformat(),
                'version': '1.0.0',
                'components': {
                    'authentication': True,
                    'database': firebase_manager.health_check(),
                    'booking': True,
                    'analytics': True,
                    'feedback': True,
                    'complaints': True,
                    'notifications': True
                }
            })
        
        # Database-specific health check
        @self.app.route('/health/database')
        def database_health():
            return jsonify({
                'database_connected': firebase_manager.health_check(),
                'timestamp': datetime.utcnow().isoformat()
            })
        
        # === AUTHENTICATION ROUTES (Person 1) ===
        self._register_auth_routes()
        
        # === BOOKING ROUTES (Person 3) ===
        self._register_booking_routes()
        
        # === ANALYTICS ROUTES (Person 3) ===
        self._register_analytics_routes()
        
        # === FEEDBACK ROUTES (Person 4) ===
        self._register_feedback_routes()
        
        # === COMPLAINT ROUTES (Person 4) ===
        self._register_complaint_routes()
        
        # === NOTIFICATION ROUTES (Person 5) ===
        self._register_notification_routes()
        
        # === OFFICER DASHBOARD ROUTES ===
        self._register_officer_routes()
        
        # === DOCUMENT MANAGEMENT ROUTES ===
        self._register_document_routes()
    
    def _track_analytics_event(self, event_type: str, nic: str, department: str = None, additional_data: dict = None):
        """Track an analytics event for user activity monitoring"""
        try:
            from database.firebase_config import get_db
            
            event_data = {
                'type': event_type,
                'nic': nic,
                'timestamp': datetime.utcnow().isoformat()
            }
            
            if department:
                event_data['department'] = department
                
            if additional_data:
                event_data.update(additional_data)
            
            # Add to analytics_events collection
            db = get_db()
            db.collection('analytics_events').add(event_data)
            
            logger.info(f"Analytics event tracked: {event_type} for NIC {nic}")
            
        except Exception as e:
            # Don't let analytics tracking errors break the main functionality
            logger.error(f"Analytics tracking error: {e}")
    
    def _register_auth_routes(self):
        """Authentication routes"""
        
        @self.app.route('/api/auth/register', methods=['POST'])
        def register():
            try:
                data = request.get_json()
                
                # Validate required fields
                required_fields = ['email', 'password', 'name', 'nic']
                for field in required_fields:
                    if not data.get(field):
                        return jsonify({'error': f'{field} is required'}), 400
                
                # Create Firebase Auth user
                user_record = auth.create_user(
                    email=data['email'],
                    password=data['password'],
                    display_name=data['name']
                )
                
                # Set role
                role = data.get('role', 'citizen')
                auth.set_custom_user_claims(user_record.uid, {'role': role})
                
                # Store profile in Firestore with new schema
                user_profile = {
                    'fullName': data['name'],  # Updated field name
                    'email': data['email'],
                    'nic': data['nic'],
                    'phoneNumber': data.get('phone', ''),
                    'bloodGroup': data.get('blood_group', 'O+'),
                    'address': {
                        'addressLine1': data.get('address', ''),
                        'addressLine2': '',
                        'city': data.get('city', '')
                    },
                    'dateOfBirth': datetime.strptime(data.get('date_of_birth', '1990-01-01'), '%Y-%m-%d') if data.get('date_of_birth') else datetime(1990, 1, 1),
                    'gender': data.get('gender', 'other'),
                    'firebaseUid': user_record.uid,
                    'isActive': True,
                    'profileImage': ''
                }
                
                if role == 'citizen':
                    # Use NIC as document ID for citizens
                    db.collection('citizens').document(data['nic']).set(user_profile)
                    
                    # Track user registration analytics
                    self._track_analytics_event('user_registered', data['nic'])
                else:
                    # Keep officers in users collection
                    officer_profile = {
                        'uid': user_record.uid,
                        'email': data['email'],
                        'name': data['name'],
                        'role': role,
                        'phone': data.get('phone', ''),
                        'created_at': datetime.utcnow(),
                        'is_active': True
                    }
                    db.collection('users').document(user_record.uid).set(officer_profile)
                
                return jsonify({
                    'message': 'User registered successfully',
                    'uid': user_record.uid,
                    'role': role
                }), 201
                
            except Exception as e:
                logger.error(f"Registration error: {e}")
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/auth/login', methods=['POST'])
        def login():
            try:
                data = request.get_json()
                id_token = data.get('idToken')
                
                if not id_token:
                    return jsonify({'error': 'ID token required'}), 400
                
                # Verify Firebase ID token
                decoded_token = auth.verify_id_token(id_token)
                uid = decoded_token['uid']
                
                # Get user info
                user_record = auth.get_user(uid)
                custom_claims = user_record.custom_claims or {}
                role = custom_claims.get('role', 'citizen')
                
                # Generate JWT
                jwt_token = self._generate_jwt(uid, role)
                
                # Track login analytics for citizens
                try:
                    if role == 'citizen':
                        citizens = db.collection('citizens').where('firebaseUid', '==', uid).limit(1).get()
                        if citizens:
                            nic = citizens[0].id
                            self._track_analytics_event('user_login', nic)
                except Exception as analytics_error:
                    logger.error(f"Analytics tracking error for login: {analytics_error}")
                
                return jsonify({
                    'token': jwt_token,
                    'role': role,
                    'expires_in': 3600
                })
                
            except Exception as e:
                logger.error(f"Login error: {e}")
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/auth/logout', methods=['POST'])
        @self._require_auth
        def logout():
            """Logout user and invalidate token"""
            try:
                uid = g.user['uid']
                
                # Update last_login timestamp to help with token validation
                db.collection('users').document(uid).update({
                    'last_logout': datetime.utcnow()
                })
                
                return jsonify({'message': 'Logged out successfully'}), 200
                
            except Exception as e:
                logger.error(f"Logout error: {e}")
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/auth/refresh', methods=['POST'])
        @self._require_auth
        def refresh_token():
            """Refresh JWT token"""
            try:
                uid = g.user['uid']
                role = g.user['role']
                
                # Generate new JWT
                new_token = self._generate_jwt(uid, role)
                
                return jsonify({
                    'token': new_token,
                    'expires_in': 3600
                }), 200
                
            except Exception as e:
                logger.error(f"Token refresh error: {e}")
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/auth/forgot-password', methods=['POST'])
        def forgot_password():
            """Send password reset email"""
            try:
                data = request.get_json()
                email = data.get('email')
                
                if not email:
                    return jsonify({'error': 'Email is required'}), 400
                
                # Generate password reset link (would typically send email)
                link = auth.generate_password_reset_link(email)
                
                # For now, return the link (in production, send via email)
                return jsonify({
                    'message': 'Password reset link generated',
                    'reset_link': link  # Remove in production
                }), 200
                
            except Exception as e:
                logger.error(f"Password reset error: {e}")
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/auth/profile', methods=['GET'])
        @self._require_auth
        def get_profile():
            """Get user profile"""
            try:
                uid = g.user['uid']
                role = g.user['role']
                
                if role == 'citizen':
                    # Get citizen profile by firebaseUid
                    citizens = db.collection('citizens').where('firebaseUid', '==', uid).limit(1).get()
                    if citizens:
                        profile = citizens[0].to_dict()
                        if profile:
                            profile['id'] = citizens[0].id  # This will be the NIC
                            return jsonify(profile), 200
                else:
                    # Get staff/admin profile
                    user_doc = db.collection('users').document(uid).get()
                    if user_doc.exists:
                        user_data = user_doc.to_dict()
                        if user_data:
                            return jsonify(user_data), 200
                
                return jsonify({'error': 'Profile not found'}), 404
                
            except Exception as e:
                logger.error(f"Get profile error: {e}")
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/auth/profile', methods=['PUT'])
        @self._require_auth
        def update_profile():
            """Update user profile"""
            try:
                data = request.get_json()
                uid = g.user['uid']
                role = g.user['role']
                
                # Remove sensitive fields
                data.pop('uid', None)
                data.pop('role', None)
                data.pop('created_at', None)
                
                data['updated_at'] = datetime.utcnow()
                
                if role == 'citizen':
                    # Update citizen profile using firebaseUid
                    citizens = db.collection('citizens').where('firebaseUid', '==', uid).limit(1).get()
                    if citizens:
                        citizen_doc = citizens[0]
                        # Map any field name updates
                        if 'name' in data:
                            data['fullName'] = data.pop('name')
                        if 'phone' in data:
                            data['phoneNumber'] = data.pop('phone')
                            
                        db.collection('citizens').document(citizen_doc.id).update(data)
                        return jsonify({'message': 'Profile updated successfully'}), 200
                else:
                    # Update staff/admin profile
                    db.collection('users').document(uid).update(data)
                    return jsonify({'message': 'Profile updated successfully'}), 200
                
                return jsonify({'error': 'Profile not found'}), 404
                
            except Exception as e:
                logger.error(f"Update profile error: {e}")
                return jsonify({'error': str(e)}), 500
    
    def _register_booking_routes(self):
        """Booking system routes"""
        
        @self.app.route('/api/departments', methods=['GET'])
        def get_departments():
            """Get list of government departments"""
            try:
                departments = [
                    {
                        'id': 'medical',
                        'name': 'Medical Services',
                        'description': 'Medical certificates, health checkups',
                        'services': ['Health Certificate', 'Medical Checkup', 'Vaccination Records'],
                        'working_hours': '8:00 AM - 4:00 PM',
                        'location': 'Medical Department, Ground Floor'
                    },
                    {
                        'id': 'passport',
                        'name': 'Passport Services',
                        'description': 'Passport applications and renewals',
                        'services': ['New Passport', 'Passport Renewal', 'Lost Passport'],
                        'working_hours': '9:00 AM - 3:00 PM',
                        'location': 'Immigration Department, 2nd Floor'
                    },
                    {
                        'id': 'license',
                        'name': 'License Services',
                        'description': 'Driving licenses and permits',
                        'services': ['Driving License', 'License Renewal', 'International Permit'],
                        'working_hours': '8:30 AM - 4:30 PM',
                        'location': 'Transport Department, 1st Floor'
                    }
                ]
                
                return jsonify(departments), 200
                
            except Exception as e:
                logger.error(f"Get departments error: {e}")
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/departments/<department>/services', methods=['GET'])
        def get_department_services(department):
            """Get services for specific department"""
            try:
                services_map = {
                    'medical': [
                        {'id': 'health_cert', 'name': 'Health Certificate', 'duration': 30, 'fee': 500},
                        {'id': 'medical_checkup', 'name': 'Medical Checkup', 'duration': 60, 'fee': 1000},
                        {'id': 'vaccination', 'name': 'Vaccination Records', 'duration': 15, 'fee': 200}
                    ],
                    'passport': [
                        {'id': 'new_passport', 'name': 'New Passport', 'duration': 45, 'fee': 3500},
                        {'id': 'renewal', 'name': 'Passport Renewal', 'duration': 30, 'fee': 2500},
                        {'id': 'lost_passport', 'name': 'Lost Passport', 'duration': 60, 'fee': 5000}
                    ],
                    'license': [
                        {'id': 'new_license', 'name': 'New Driving License', 'duration': 90, 'fee': 2000},
                        {'id': 'renewal', 'name': 'License Renewal', 'duration': 20, 'fee': 1000},
                        {'id': 'international', 'name': 'International Permit', 'duration': 30, 'fee': 1500}
                    ]
                }
                
                if department not in services_map:
                    return jsonify({'error': 'Department not found'}), 404
                
                return jsonify(services_map[department]), 200
                
            except Exception as e:
                logger.error(f"Get services error: {e}")
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/departments/<department>/timeslots', methods=['GET'])
        @self._require_auth
        def get_available_timeslots(department):
            """Get available time slots for department"""
            try:
                date = request.args.get('date')  # YYYY-MM-DD format
                if not date:
                    return jsonify({'error': 'Date parameter required'}), 400
                
                department_id = department.lower()
                collections_map = {
                    'medical': 'medicalTimeSlots',
                    'passport': 'passportTimeSlots',
                    'license': 'licenseTimeSlots'
                }
                
                if department_id not in collections_map:
                    return jsonify({'error': 'Invalid department'}), 400
                
                slot_collection = collections_map[department_id]
                
                # Query available slots for the date
                slots = db.collection(slot_collection)\
                    .where('date', '==', date)\
                    .where('availability', '==', 'available')\
                    .order_by('startTime')\
                    .get()
                
                available_slots = []
                for slot in slots:
                    slot_data = slot.to_dict()
                    if slot_data:
                        slot_data['id'] = slot.id
                        available_slots.append(slot_data)
                
                # Track timeslot search analytics for citizens
                try:
                    if g.user.get('role') == 'citizen':
                        citizens = db.collection('citizens').where('firebaseUid', '==', g.user['uid']).limit(1).get()
                        if citizens:
                            nic = citizens[0].id
                            self._track_analytics_event('timeslot_search', nic, department_id, {
                                'searchDate': date,
                                'slotsFound': len(available_slots)
                            })
                except Exception as analytics_error:
                    logger.error(f"Analytics tracking error for timeslot search: {analytics_error}")
                
                return jsonify(available_slots), 200
                
            except Exception as e:
                logger.error(f"Get timeslots error: {e}")
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/departments/<department>/timeslots', methods=['POST'])
        @self._require_auth
        def create_timeslots(department):
            """Create time slots for department (admin only)"""
            try:
                if g.user['role'] not in ['admin', 'staff']:
                    return jsonify({'error': 'Admin access required'}), 403
                
                data = request.get_json()
                date = data.get('date')
                start_time = data.get('start_time')
                end_time = data.get('end_time')
                slot_duration = data.get('slot_duration', 30)  # minutes
                
                if not all([date, start_time, end_time]):
                    return jsonify({'error': 'Date, start_time, and end_time required'}), 400
                
                department_id = department.lower()
                collections_map = {
                    'medical': 'medicalTimeSlots',
                    'passport': 'passportTimeSlots',
                    'license': 'licenseTimeSlots'
                }
                
                if department_id not in collections_map:
                    return jsonify({'error': 'Invalid department'}), 400
                
                slot_collection = collections_map[department_id]
                
                # Generate time slots
                start = datetime.strptime(f"{date} {start_time}", "%Y-%m-%d %H:%M")
                end = datetime.strptime(f"{date} {end_time}", "%Y-%m-%d %H:%M")
                delta = timedelta(minutes=slot_duration)
                
                created_slots = []
                current = start
                
                while current < end:
                    slot_data = {
                        'date': date,
                        'startTime': current.strftime('%H:%M'),
                        'endTime': (current + delta).strftime('%H:%M'),
                        'availability': 'available',
                        'department': department_id,
                        'created_at': datetime.utcnow(),
                        'capacity': 1
                    }
                    
                    # Add slot to database
                    doc_ref = db.collection(slot_collection).add(slot_data)
                    slot_data['id'] = doc_ref[1].id
                    created_slots.append(slot_data)
                    
                    current += delta
                
                return jsonify({
                    'message': f'Created {len(created_slots)} time slots',
                    'slots': created_slots
                }), 201
                
            except Exception as e:
                logger.error(f"Create timeslots error: {e}")
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/appointments/<department>', methods=['POST'])
        @self._require_auth
        def create_appointment(department):
            try:
                data = request.get_json()
                user_id = g.user['uid']
                
                # Get user's NIC
                if g.user['role'] == 'citizen':
                    citizens = db.collection('citizens').where('uid', '==', user_id).limit(1).get()
                    if not citizens:
                        return jsonify({'error': 'Citizen profile not found'}), 404
                    nic = citizens[0].id
                else:
                    return jsonify({'error': 'Only citizens can book appointments'}), 403
                
                # Validate department and get collections
                department_id = department.lower()
                collections_map = {
                    'medical': ('medicalTimeSlots', 'medicalAppointments'),
                    'passport': ('passportTimeSlots', 'passportAppointments'),
                    'license': ('licenseTimeSlots', 'licenseAppointments')
                }
                
                if department_id not in collections_map:
                    return jsonify({'error': 'Invalid department'}), 400
                
                slot_collection, appointment_collection = collections_map[department_id]
                slot_id = data.get('timeSlotId')
                
                # Check slot availability
                slot_ref = db.collection(slot_collection).document(slot_id)
                slot_doc = slot_ref.get()
                
                if not slot_doc.exists:
                    return jsonify({'error': 'Time slot not found'}), 404
                
                slot_data = slot_doc.to_dict()
                if not slot_data:
                    return jsonify({'error': 'Invalid slot data'}), 500
                    
                if slot_data.get('availability') != 'available':
                    return jsonify({'error': 'Time slot not available'}), 400
                
                # Generate appointment
                appointment_id = str(uuid.uuid4())
                ref_code = f"{department.upper()}-{datetime.now().strftime('%Y%m%d%H%M')}-{random.randint(1000, 9999)}"
                
                # Generate QR code
                qr = qrcode.QRCode(version=1, box_size=10, border=5)
                qr.add_data(ref_code)
                qr.make(fit=True)
                qr_img = qr.make_image(fill_color="black", back_color="white")
                buffer = io.BytesIO()
                qr_img.save(buffer, format='PNG')
                qr_base64 = base64.b64encode(buffer.getvalue()).decode()
                
                # Create appointment data with new schema fields
                appointment_data = {
                    'appointmentId': appointment_id,
                    'nic': nic,
                    'timeSlotId': slot_id,
                    'scheduledDateTime': slot_data['startTime'],
                    'status': 'confirmed',
                    'qrCode': qr_base64,
                    'reference': ref_code,
                    'feedback': ''
                }
                
                # Add department-specific fields according to new schema
                if department_id == 'medical':
                    appointment_data.update({
                        'reports': ''  # URL to medical reports
                    })
                elif department_id == 'passport':
                    appointment_data.update({
                        'applicationForm': data.get('applicationForm', ''),  # URL to uploaded PDF
                        'supportingDocuments': data.get('supportingDocuments', []),  # Array of URLs
                        'deliveryStatus': 'pending',
                        'remarks': data.get('remarks', '')
                    })
                elif department_id == 'license':
                    appointment_data.update({
                        'applicationForm': data.get('applicationForm', ''),  # URL to uploaded PDF
                        'supportingDocuments': data.get('supportingDocuments', []),  # Array of URLs
                        'appointmentType': data.get('appointmentType', 'new license'),
                        'deliveryStatus': 'pending'
                    })
                
                # Save appointment
                db.collection(appointment_collection).document(appointment_id).set(appointment_data)
                
                # Track booking analytics
                self._track_analytics_event('booking_created', nic, department_id, {
                    'appointmentId': appointment_id,
                    'reference': ref_code
                })
                
                # Update slot
                slot_ref.update({
                    'availability': 'booked',
                    'bookedBy': nic,
                    'bookedAt': datetime.utcnow()
                })
                
                # Send notification
                self._send_notification(
                    user_id,
                    'Appointment Confirmed',
                    f'Your {department} appointment has been confirmed. Reference: {ref_code}'
                )
                
                return jsonify({
                    'message': 'Appointment created successfully',
                    'appointmentId': appointment_id,
                    'reference': ref_code,
                    'qrCode': qr_base64
                }), 201
                
            except Exception as e:
                logger.error(f"Create appointment error: {e}")
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/appointments/user/<nic>', methods=['GET'])
        @self._require_auth
        def get_user_appointments(nic):
            try:
                # Check access permissions
                user_role = g.user.get('role')
                if user_role == 'citizen':
                    # Citizens can only see their own appointments
                    citizens = db.collection('citizens').where('firebaseUid', '==', g.user['uid']).limit(1).get()
                    if not citizens or citizens[0].id != nic:
                        return jsonify({'error': 'Access denied'}), 403
                
                appointments = []
                collections = ['medicalAppointments', 'passportAppointments', 'licenseAppointments']
                
                for collection_name in collections:
                    docs = db.collection(collection_name).where('nic', '==', nic).get()
                    for doc in docs:
                        appointment = doc.to_dict()
                        if appointment:  # Null safety check
                            appointment['id'] = doc.id
                            appointments.append(appointment)
                
                return jsonify({'appointments': appointments})
                
            except Exception as e:
                return jsonify({'error': str(e)}), 500
    
    def _register_analytics_routes(self):
        """Analytics routes"""
        
        @self.app.route('/api/analytics/summary', methods=['GET'])
        @self._require_role(['admin', 'officer'])
        def analytics_summary():
            try:
                summary = {
                    'total_appointments': 0,
                    'departments': {},
                    'generated_at': datetime.utcnow().isoformat()
                }
                
                collections = {
                    'medical': 'medicalAppointments',
                    'passport': 'passportAppointments',
                    'license': 'licenseAppointments'
                }
                
                for dept, collection_name in collections.items():
                    docs = list(db.collection(collection_name).get())
                    total = len(docs)
                    summary['total_appointments'] += total
                    
                    # Count by status
                    status_counts = {}
                    for doc in docs:
                        doc_data = doc.to_dict()
                        if doc_data:
                            status = doc_data.get('status', 'unknown')
                        else:
                            status = 'unknown'
                        status_counts[status] = status_counts.get(status, 0) + 1
                    
                    summary['departments'][dept] = {
                        'total': total,
                        'status_breakdown': status_counts
                    }
                
                return jsonify(summary)
                
            except Exception as e:
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/analytics/peak-hours', methods=['GET'])
        @self._require_role(['admin', 'officer'])
        def peak_booking_hours():
            """Get peak booking hours across all departments"""
            try:
                hour_counts = {}
                collections = ['medicalAppointments', 'passportAppointments', 'licenseAppointments']
                
                for collection_name in collections:
                    appointments = db.collection(collection_name).stream()
                    for doc in appointments:
                        data = doc.to_dict()
                        if not data:
                            continue
                            
                        scheduled_dt = data.get("scheduledDateTime")
                        if scheduled_dt:
                            try:
                                # Handle different datetime formats
                                if isinstance(scheduled_dt, str):
                                    # Try different parsing methods
                                    try:
                                        dt = datetime.fromisoformat(scheduled_dt.replace('Z', '+00:00'))
                                    except:
                                        try:
                                            dt = datetime.strptime(scheduled_dt, "%B %d, %Y at %I:%M:%S %p UTC%z")
                                        except:
                                            continue
                                else:
                                    # Firestore timestamp
                                    dt = scheduled_dt
                                
                                hour = dt.hour
                                hour_counts[hour] = hour_counts.get(hour, 0) + 1
                                
                            except Exception as e:
                                logger.error(f"Error parsing datetime: {e}")
                                continue
                
                return jsonify(hour_counts)
                
            except Exception as e:
                logger.error(f"Peak hours analytics error: {e}")
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/analytics/department-load', methods=['GET'])
        @self._require_role(['admin', 'officer'])
        def department_load():
            """Get appointment load per department"""
            try:
                departments = {
                    'medical': 'medicalAppointments',
                    'passport': 'passportAppointments', 
                    'license': 'licenseAppointments'
                }
                load = {}
                
                for dept_name, collection_name in departments.items():
                    try:
                        appointments = list(db.collection(collection_name).stream())
                        load[dept_name] = len(appointments)
                    except Exception as e:
                        logger.error(f"Error getting load for {dept_name}: {e}")
                        load[dept_name] = 0
                
                return jsonify(load)
                
            except Exception as e:
                logger.error(f"Department load analytics error: {e}")
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/analytics/no-show-rate', methods=['GET'])
        @self._require_role(['admin', 'officer'])
        def no_show_rate():
            """Calculate no-show rate per department"""
            try:
                departments = {
                    'medical': 'medicalAppointments',
                    'passport': 'passportAppointments',
                    'license': 'licenseAppointments'
                }
                rates = {}
                
                for dept_name, collection_name in departments.items():
                    total = 0
                    no_show = 0
                    
                    try:
                        for doc in db.collection(collection_name).stream():
                            data = doc.to_dict()
                            if data:
                                total += 1
                                if data.get("status") == "no-show":
                                    no_show += 1
                        
                        rates[dept_name] = {
                            'total_appointments': total,
                            'no_shows': no_show,
                            'no_show_rate': (no_show / total) if total > 0 else 0,
                            'percentage': f"{((no_show / total) * 100):.1f}%" if total > 0 else "0.0%"
                        }
                        
                    except Exception as e:
                        logger.error(f"Error calculating no-show rate for {dept_name}: {e}")
                        rates[dept_name] = {
                            'total_appointments': 0,
                            'no_shows': 0,
                            'no_show_rate': 0,
                            'percentage': "0.0%"
                        }
                
                return jsonify(rates)
                
            except Exception as e:
                logger.error(f"No-show rate analytics error: {e}")
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/analytics/avg-processing-time', methods=['GET'])
        @self._require_role(['admin', 'officer'])
        def avg_processing_time():
            """Calculate average processing time per department"""
            try:
                departments = {
                    'medical': 'medicalAppointments',
                    'passport': 'passportAppointments',
                    'license': 'licenseAppointments'
                }
                avg_times = {}
                
                for dept_name, collection_name in departments.items():
                    total_time = 0
                    count = 0
                    
                    try:
                        for doc in db.collection(collection_name).stream():
                            data = doc.to_dict()
                            if not data:
                                continue
                                
                            created = data.get("createdAt") or data.get("created_at")
                            processed = data.get("processedAt") or data.get("processed_at")
                            
                            if created and processed:
                                try:
                                    # Handle different datetime formats
                                    if isinstance(created, str):
                                        t1 = datetime.fromisoformat(created.replace('Z', '+00:00'))
                                    else:
                                        t1 = created
                                        
                                    if isinstance(processed, str):
                                        t2 = datetime.fromisoformat(processed.replace('Z', '+00:00'))
                                    else:
                                        t2 = processed
                                    
                                    processing_time = (t2 - t1).total_seconds()
                                    total_time += processing_time
                                    count += 1
                                    
                                except Exception as parse_error:
                                    logger.error(f"Error parsing dates for processing time: {parse_error}")
                                    continue
                        
                        avg_seconds = (total_time / count) if count > 0 else 0
                        avg_hours = avg_seconds / 3600
                        avg_days = avg_hours / 24
                        
                        avg_times[dept_name] = {
                            'appointments_processed': count,
                            'avg_seconds': round(avg_seconds, 2),
                            'avg_hours': round(avg_hours, 2),
                            'avg_days': round(avg_days, 2),
                            'human_readable': f"{round(avg_days, 1)} days" if avg_days >= 1 else f"{round(avg_hours, 1)} hours"
                        }
                        
                    except Exception as e:
                        logger.error(f"Error calculating processing time for {dept_name}: {e}")
                        avg_times[dept_name] = {
                            'appointments_processed': 0,
                            'avg_seconds': 0,
                            'avg_hours': 0,
                            'avg_days': 0,
                            'human_readable': "No data"
                        }
                
                return jsonify(avg_times)
                
            except Exception as e:
                logger.error(f"Processing time analytics error: {e}")
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/analytics/dashboard', methods=['GET'])
        @self._require_role(['admin', 'officer'])
        def analytics_dashboard():
            """Comprehensive analytics dashboard with all metrics"""
            try:
                # Get all analytics data in one request
                dashboard_data = {
                    'generated_at': datetime.utcnow().isoformat(),
                    'summary': {},
                    'peak_hours': {},
                    'department_load': {},
                    'no_show_rates': {},
                    'processing_times': {},
                    'user_activity': {}
                }
                
                # Get summary data (reuse existing logic)
                collections = {
                    'medical': 'medicalAppointments',
                    'passport': 'passportAppointments',
                    'license': 'licenseAppointments'
                }
                
                total_appointments = 0
                departments_summary = {}
                
                for dept, collection_name in collections.items():
                    docs = list(db.collection(collection_name).get())
                    total = len(docs)
                    total_appointments += total
                    
                    # Count by status
                    status_counts = {}
                    for doc in docs:
                        doc_data = doc.to_dict()
                        if doc_data:
                            status = doc_data.get('status', 'unknown')
                        else:
                            status = 'unknown'
                        status_counts[status] = status_counts.get(status, 0) + 1
                    
                    departments_summary[dept] = {
                        'total': total,
                        'status_breakdown': status_counts
                    }
                
                dashboard_data['summary'] = {
                    'total_appointments': total_appointments,
                    'departments': departments_summary
                }
                
                # Get user activity from analytics_events
                try:
                    analytics_events = list(db.collection('analytics_events').stream())
                    event_types = {}
                    departments_activity = {}
                    
                    for event_doc in analytics_events:
                        event_data = event_doc.to_dict()
                        if event_data:
                            event_type = event_data.get('type', 'unknown')
                            department = event_data.get('department', 'general')
                            
                            event_types[event_type] = event_types.get(event_type, 0) + 1
                            departments_activity[department] = departments_activity.get(department, 0) + 1
                    
                    dashboard_data['user_activity'] = {
                        'total_events': len(analytics_events),
                        'event_types': event_types,
                        'department_activity': departments_activity
                    }
                    
                except Exception as e:
                    logger.error(f"Error getting user activity analytics: {e}")
                    dashboard_data['user_activity'] = {
                        'total_events': 0,
                        'event_types': {},
                        'department_activity': {}
                    }
                
                return jsonify(dashboard_data)
                
            except Exception as e:
                logger.error(f"Analytics dashboard error: {e}")
                return jsonify({'error': str(e)}), 500
    
    def _register_feedback_routes(self):
        """Feedback system routes"""
        
        @self.app.route('/api/feedback/submit', methods=['POST'])
        @self._require_auth
        def submit_feedback():
            try:
                data = request.get_json()
                user_id = g.user['uid']
                
                appointment_id = data.get('appointment_id')
                appointment_type = data.get('appointment_type')
                feedback_text = data.get('feedback')
                rating = data.get('rating', 5)
                
                if not all([appointment_id, appointment_type, feedback_text]):
                    return jsonify({'error': 'Missing required fields'}), 400
                
                # Validate appointment exists and belongs to user
                collections_map = {
                    'medical': 'medicalAppointments',
                    'passport': 'passportAppointments',
                    'license': 'licenseAppointments'
                }
                
                collection_name = collections_map.get(appointment_type)
                if not collection_name:
                    return jsonify({'error': 'Invalid appointment type'}), 400
                
                appointment_ref = db.collection(collection_name).document(appointment_id)
                appointment_doc = appointment_ref.get()
                
                if not appointment_doc.exists:
                    return jsonify({'error': 'Appointment not found'}), 404
                
                appointment_data = appointment_doc.to_dict()
                if not appointment_data:
                    return jsonify({'error': 'Invalid appointment data'}), 500
                if appointment_data.get('userId') != user_id:
                    return jsonify({'error': 'Access denied'}), 403
                
                # Update appointment with feedback
                appointment_ref.update({
                    'feedback': feedback_text,
                    'rating': rating,
                    'feedbackSubmittedAt': datetime.utcnow()
                })
                
                return jsonify({'message': 'Feedback submitted successfully'}), 201
                
            except Exception as e:
                return jsonify({'error': str(e)}), 500
    
    def _register_complaint_routes(self):
        """Complaint system routes"""
        
        @self.app.route('/api/complaints/submit', methods=['POST'])
        @self._require_auth
        def submit_complaint():
            try:
                data = request.get_json()
                user_id = g.user['uid']
                
                # Get user's NIC
                if g.user['role'] == 'citizen':
                    citizens = db.collection('citizens').where('uid', '==', user_id).limit(1).get()
                    if not citizens:
                        return jsonify({'error': 'Citizen profile not found'}), 404
                    nic = citizens[0].id
                else:
                    return jsonify({'error': 'Only citizens can submit complaints'}), 403
                
                department = data.get('department')
                description = data.get('description')
                
                if not all([department, description]):
                    return jsonify({'error': 'Department and description required'}), 400
                
                # Create complaint
                complaint_id = str(uuid.uuid4())
                complaint_data = {
                    'nic': nic,
                    'userId': user_id,
                    'department': department,
                    'description': description,
                    'status': 'submitted',
                    'createdAt': datetime.utcnow()
                }
                
                db.collection('complaints').document(complaint_id).set(complaint_data)
                
                # Track complaint analytics
                self._track_analytics_event('complaint_submitted', nic, department, {
                    'complaintId': complaint_id
                })
                
                return jsonify({
                    'message': 'Complaint submitted successfully',
                    'complaint_id': complaint_id
                }), 201
                
            except Exception as e:
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/complaints/user/<nic>', methods=['GET'])
        @self._require_auth
        def get_user_complaints(nic):
            try:
                # Check access permissions
                user_role = g.user.get('role')
                if user_role == 'citizen':
                    citizens = db.collection('citizens').where('uid', '==', g.user['uid']).limit(1).get()
                    if not citizens or citizens[0].id != nic:
                        return jsonify({'error': 'Access denied'}), 403
                
                complaints = []
                docs = db.collection('complaints').where('nic', '==', nic).get()
                
                for doc in docs:
                    complaint = doc.to_dict()
                    if complaint:  # Null safety check
                        complaint['id'] = doc.id
                        complaints.append(complaint)
                
                return jsonify({'complaints': complaints})
                
            except Exception as e:
                return jsonify({'error': str(e)}), 500
    
    def _register_notification_routes(self):
        """Notification routes"""
        
        @self.app.route('/api/notifications', methods=['GET'])
        @self._require_auth
        def get_notifications():
            try:
                user_id = g.user['uid']
                
                notifications = []
                docs = db.collection('notifications')\
                    .where('user_id', '==', user_id)\
                    .order_by('created_at', direction=firestore.Query.DESCENDING)\
                    .limit(50).get()
                
                for doc in docs:
                    notification = doc.to_dict()
                    if notification:
                        notification['id'] = doc.id
                        notifications.append(notification)
                
                return jsonify({'notifications': notifications})
                
            except Exception as e:
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/notifications/<notification_id>/read', methods=['POST'])
        @self._require_auth
        def mark_notification_read(notification_id):
            try:
                db.collection('notifications').document(notification_id).update({
                    'is_read': True,
                    'read_at': datetime.utcnow()
                })
                
                return jsonify({'message': 'Notification marked as read'})
                
            except Exception as e:
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/notifications/send', methods=['POST'])
        @self._require_auth
        def send_notification():
            """Send notification to user(s) - Admin/Staff only"""
            try:
                if g.user['role'] not in ['admin', 'staff']:
                    return jsonify({'error': 'Admin access required'}), 403
                
                data = request.get_json()
                user_ids = data.get('user_ids', [])
                title = data.get('title', '')
                message = data.get('message', '')
                notification_type = data.get('type', 'system_announcement')
                send_email = data.get('send_email', True)  # Default to True for email
                
                if not all([user_ids, title, message]):
                    return jsonify({'error': 'user_ids, title, and message required'}), 400
                
                sent_count = 0
                for user_id in user_ids:
                    notification_data = {
                        'user_id': user_id,
                        'title': title,
                        'message': message,
                        'type': notification_type,
                        'created_at': datetime.utcnow(),
                        'is_read': False,
                        'sent_by': g.user['uid'],
                        'channels': {
                            'in_app': True,
                            'email': send_email
                        }
                    }
                    
                    # Store notification in database
                    doc_ref = db.collection('notifications').add(notification_data)
                    
                    # Send real-time notification
                    self._send_realtime_notification(user_id, notification_data)
                    
                    # Send email if requested
                    if send_email:
                        self._send_email_notification(user_id, title, message)
                    
                    sent_count += 1
                
                return jsonify({
                    'message': f'Sent {sent_count} notifications',
                    'sent_count': sent_count
                }), 200
                
            except Exception as e:
                logger.error(f"Send notification error: {e}")
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/notifications/preferences', methods=['GET'])
        @self._require_auth
        def get_notification_preferences():
            """Get user notification preferences"""
            try:
                user_id = g.user['uid']
                role = g.user['role']
                
                # Get preferences from appropriate collection
                if role == 'citizen':
                    # Get from citizens collection using firebaseUid
                    citizens = db.collection('citizens').where('firebaseUid', '==', user_id).limit(1).get()
                    if citizens:
                        citizen_data = citizens[0].to_dict()
                        if citizen_data:
                            preferences = citizen_data.get('notification_preferences', {
                                'email_notifications': True,
                                'appointment_reminders': True,
                                'status_updates': True,
                                'system_announcements': True
                            })
                            return jsonify(preferences), 200
                else:
                    # Get from users collection for officers
                    user_doc = db.collection('users').document(user_id).get()
                    if user_doc.exists:
                        user_data = user_doc.to_dict()
                        if user_data:
                            preferences = user_data.get('notification_preferences', {
                                'email_notifications': True,
                                'appointment_reminders': True,
                                'status_updates': True,
                                'system_announcements': True
                            })
                            return jsonify(preferences), 200
                
                return jsonify({'error': 'User not found'}), 404
                
            except Exception as e:
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/notifications/preferences', methods=['PUT'])
        @self._require_auth
        def update_notification_preferences():
            """Update user notification preferences"""
            try:
                data = request.get_json()
                user_id = g.user['uid']
                role = g.user['role']
                
                # Update preferences in appropriate collection
                if role == 'citizen':
                    # Update in citizens collection
                    citizens = db.collection('citizens').where('firebaseUid', '==', user_id).limit(1).get()
                    if citizens:
                        db.collection('citizens').document(citizens[0].id).update({
                            'notification_preferences': data
                        })
                else:
                    # Update in users collection for officers
                    db.collection('users').document(user_id).update({
                        'notification_preferences': data,
                        'updated_at': datetime.utcnow()
                    })
                
                return jsonify({'message': 'Preferences updated successfully'}), 200
                
            except Exception as e:
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/notifications/schedule-reminder', methods=['POST'])
        @self._require_auth
        def schedule_appointment_reminder():
            """Schedule 24-hour appointment reminder"""
            try:
                if g.user['role'] not in ['admin', 'staff']:
                    return jsonify({'error': 'Admin access required'}), 403
                
                data = request.get_json()
                appointment_id = data.get('appointment_id')
                department = data.get('department')
                
                if not all([appointment_id, department]):
                    return jsonify({'error': 'appointment_id and department required'}), 400
                
                # Get appointment details
                collection_map = {
                    'medical': 'medicalAppointments',
                    'passport': 'passportAppointments',
                    'license': 'licenseAppointments'
                }
                
                collection_name = collection_map.get(department)
                if not collection_name:
                    return jsonify({'error': 'Invalid department'}), 400
                
                appointment_doc = db.collection(collection_name).document(appointment_id).get()
                if not appointment_doc.exists:
                    return jsonify({'error': 'Appointment not found'}), 404
                
                appointment_data = appointment_doc.to_dict()
                if not appointment_data:
                    return jsonify({'error': 'Invalid appointment data'}), 500
                    
                user_id = appointment_data.get('userId')
                scheduled_time = appointment_data.get('scheduledDateTime')
                
                # Create reminder notification
                reminder_data = {
                    'user_id': user_id,
                    'title': 'Appointment Reminder',
                    'message': f'Your {department} appointment is scheduled for tomorrow at {scheduled_time}. Please bring required documents.',
                    'type': 'appointment_reminder',
                    'created_at': datetime.utcnow(),
                    'is_read': False,
                    'appointment_id': appointment_id,
                    'department': department,
                    'scheduled_for': '24_hours_before'
                }
                
                # Store reminder
                db.collection('notifications').add(reminder_data)
                
                return jsonify({'message': 'Reminder scheduled successfully'}), 200
                
            except Exception as e:
                return jsonify({'error': str(e)}), 500
    
    def _send_realtime_notification(self, user_id, notification_data):
        """Send real-time notification via WebSocket"""
        try:
            if hasattr(self, 'socketio'):
                self.socketio.emit('notification', notification_data, room=user_id)
        except Exception as e:
            logger.error(f"Real-time notification error: {e}")
    
    def _send_email_notification(self, user_id, title, message):
        """Send email notification"""
        try:
            # Get user email from database
            user_doc = db.collection('users').document(user_id).get()
            if not user_doc.exists:
                return False
            
            user_data = user_doc.to_dict()
            email = user_data.get('email')
            name = user_data.get('name', 'User')
            
            if not email:
                return False
            
            # Check if user has email notifications enabled
            preferences = user_data.get('notification_preferences', {})
            if not preferences.get('email_notifications', True):
                return False
            
            # Email configuration (using Flask-Mail)
            if self.mail:
                from flask_mail import Message
                
                msg = Message(
                    subject=f"Government Center - {title}",
                    recipients=[email],
                    body=f"""
Dear {name},

{message}

Thank you,
Government Center Team

---
This is an automated message. Please do not reply to this email.
If you need assistance, please contact our office directly.
                    """,
                    html=f"""
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background-color: #2c5aa0; color: white; padding: 20px; text-align: center; }}
        .content {{ padding: 20px; background-color: #f9f9f9; }}
        .footer {{ background-color: #333; color: white; padding: 10px; text-align: center; font-size: 12px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Government Center Notification</h2>
        </div>
        <div class="content">
            <h3>{title}</h3>
            <p>Dear {name},</p>
            <p>{message}</p>
            <p>Thank you,<br>Government Center Team</p>
        </div>
        <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>If you need assistance, please contact our office directly.</p>
        </div>
    </div>
</body>
</html>
                    """
                )
                
                self.app.mail.send(msg)
                return True
            
            return False
            
        except Exception as e:
            logger.error(f"Email notification error: {e}")
            return False
    
    def _register_officer_routes(self):
        """Officer dashboard routes for appointment management"""
        
        @self.app.route('/api/officer/appointments', methods=['GET'])
        @self._require_auth
        def get_officer_appointments():
            """Get all appointments for officer dashboard"""
            try:
                if g.user['role'] not in ['admin', 'staff']:
                    return jsonify({'error': 'Officer access required'}), 403
                
                department = request.args.get('department', 'all')
                status = request.args.get('status', 'all')
                date_filter = request.args.get('date', 'today')
                
                appointments = []
                
                # Define collections to search
                collections = ['medicalAppointments', 'passportAppointments', 'licenseAppointments']
                if department != 'all':
                    collection_map = {
                        'medical': ['medicalAppointments'],
                        'passport': ['passportAppointments'],
                        'license': ['licenseAppointments']
                    }
                    collections = collection_map.get(department, collections)
                
                # Build date filter
                today = datetime.utcnow().date()
                if date_filter == 'today':
                    start_date = today
                    end_date = today
                elif date_filter == 'week':
                    start_date = today
                    end_date = today + timedelta(days=7)
                elif date_filter == 'month':
                    start_date = today
                    end_date = today + timedelta(days=30)
                else:
                    start_date = None
                    end_date = None
                
                for collection_name in collections:
                    query = db.collection(collection_name)
                    
                    # Apply status filter
                    if status != 'all':
                        query = query.where('status', '==', status)
                    
                    docs = query.order_by('scheduledDateTime').get()
                    
                    for doc in docs:
                        appointment = doc.to_dict()
                        if appointment:
                            appointment['id'] = doc.id
                            appointment['department'] = collection_name.replace('Appointments', '')
                            
                            # Apply date filter if specified
                            if start_date and end_date:
                                scheduled_date = datetime.fromisoformat(
                                    appointment.get('scheduledDateTime', '')
                                ).date()
                                if not (start_date <= scheduled_date <= end_date):
                                    continue
                            
                            appointments.append(appointment)
                
                # Sort by scheduled time
                appointments.sort(key=lambda x: x.get('scheduledDateTime', ''))
                
                return jsonify({
                    'appointments': appointments,
                    'total': len(appointments),
                    'filters': {
                        'department': department,
                        'status': status,
                        'date': date_filter
                    }
                })
                
            except Exception as e:
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/officer/appointments/<appointment_id>/status', methods=['PUT'])
        @self._require_auth
        def update_appointment_status(appointment_id):
            """Update appointment status"""
            try:
                if g.user['role'] not in ['admin', 'staff']:
                    return jsonify({'error': 'Officer access required'}), 403
                
                data = request.get_json()
                new_status = data.get('status')
                notes = data.get('notes', '')
                department = data.get('department')
                
                if not all([new_status, department]):
                    return jsonify({'error': 'status and department required'}), 400
                
                valid_statuses = ['pending', 'confirmed', 'completed', 'cancelled', 'no-show']
                if new_status not in valid_statuses:
                    return jsonify({'error': f'Invalid status. Must be one of: {valid_statuses}'}), 400
                
                # Find appointment in correct collection
                collection_map = {
                    'medical': 'medicalAppointments',
                    'passport': 'passportAppointments',
                    'license': 'licenseAppointments'
                }
                
                collection_name = collection_map.get(department)
                if not collection_name:
                    return jsonify({'error': 'Invalid department'}), 400
                
                # Update appointment
                update_data = {
                    'status': new_status,
                    'updated_at': datetime.utcnow(),
                    'updated_by': g.user['uid']
                }
                
                if notes:
                    update_data['officer_notes'] = notes
                
                db.collection(collection_name).document(appointment_id).update(update_data)
                
                # Send notification to user
                appointment_doc = db.collection(collection_name).document(appointment_id).get()
                if appointment_doc.exists:
                    appointment_data = appointment_doc.to_dict()
                    user_id = appointment_data.get('userId')
                    
                    if user_id:
                        notification_data = {
                            'user_id': user_id,
                            'title': 'Appointment Status Update',
                            'message': f'Your {department} appointment status has been updated to: {new_status}',
                            'type': 'status_update',
                            'created_at': datetime.utcnow(),
                            'is_read': False,
                            'appointment_id': appointment_id
                        }
                        
                        db.collection('notifications').add(notification_data)
                        self._send_realtime_notification(user_id, notification_data)
                
                return jsonify({'message': 'Appointment status updated successfully'})
                
            except Exception as e:
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/officer/dashboard/stats', methods=['GET'])
        @self._require_auth
        def get_officer_dashboard_stats():
            """Get dashboard statistics for officers"""
            try:
                if g.user['role'] not in ['admin', 'staff']:
                    return jsonify({'error': 'Officer access required'}), 403
                
                today = datetime.utcnow().date()
                stats = {
                    'today': {'total': 0, 'pending': 0, 'confirmed': 0, 'completed': 0, 'no_show': 0},
                    'week': {'total': 0, 'pending': 0, 'confirmed': 0, 'completed': 0, 'no_show': 0},
                    'departments': {'medical': 0, 'passport': 0, 'license': 0}
                }
                
                collections = ['medicalAppointments', 'passportAppointments', 'licenseAppointments']
                
                for collection_name in collections:
                    docs = db.collection(collection_name).get()
                    department = collection_name.replace('Appointments', '')
                    
                    for doc in docs:
                        appointment = doc.to_dict()
                        if not appointment:
                            continue
                        
                        scheduled_date = datetime.fromisoformat(
                            appointment.get('scheduledDateTime', '')
                        ).date()
                        
                        status = appointment.get('status', 'pending')
                        
                        # Count by department
                        stats['departments'][department] += 1
                        
                        # Count by date
                        if scheduled_date == today:
                            stats['today']['total'] += 1
                            stats['today'][status.replace('-', '_')] += 1
                        
                        # Week stats (next 7 days)
                        if today <= scheduled_date <= today + timedelta(days=7):
                            stats['week']['total'] += 1
                            stats['week'][status.replace('-', '_')] += 1
                
                return jsonify(stats)
                
            except Exception as e:
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/officer/appointments/<appointment_id>/reschedule', methods=['POST'])
        @self._require_auth
        def reschedule_appointment(appointment_id):
            """Reschedule an appointment"""
            try:
                if g.user['role'] not in ['admin', 'staff']:
                    return jsonify({'error': 'Officer access required'}), 403
                
                data = request.get_json()
                new_datetime = data.get('scheduledDateTime')
                department = data.get('department')
                reason = data.get('reason', 'Rescheduled by staff')
                
                if not all([new_datetime, department]):
                    return jsonify({'error': 'scheduledDateTime and department required'}), 400
                
                collection_map = {
                    'medical': 'medicalAppointments',
                    'passport': 'passportAppointments',
                    'license': 'licenseAppointments'
                }
                
                collection_name = collection_map.get(department)
                if not collection_name:
                    return jsonify({'error': 'Invalid department'}), 400
                
                # Update appointment
                update_data = {
                    'scheduledDateTime': new_datetime,
                    'status': 'confirmed',
                    'rescheduled_at': datetime.utcnow(),
                    'rescheduled_by': g.user['uid'],
                    'reschedule_reason': reason,
                    'updated_at': datetime.utcnow()
                }
                
                db.collection(collection_name).document(appointment_id).update(update_data)
                
                # Send notification to user
                appointment_doc = db.collection(collection_name).document(appointment_id).get()
                if appointment_doc.exists:
                    appointment_data = appointment_doc.to_dict()
                    user_id = appointment_data.get('userId')
                    
                    if user_id:
                        notification_data = {
                            'user_id': user_id,
                            'title': 'Appointment Rescheduled',
                            'message': f'Your {department} appointment has been rescheduled to {new_datetime}. Reason: {reason}',
                            'type': 'reschedule',
                            'created_at': datetime.utcnow(),
                            'is_read': False,
                            'appointment_id': appointment_id
                        }
                        
                        db.collection('notifications').add(notification_data)
                        self._send_realtime_notification(user_id, notification_data)
                        self._send_email_notification(user_id, 'Appointment Rescheduled', notification_data['message'])
                
                return jsonify({'message': 'Appointment rescheduled successfully'})
                
            except Exception as e:
                return jsonify({'error': str(e)}), 500
    
    def _register_document_routes(self):
        """Document management routes"""
        
        @self.app.route('/api/documents/upload', methods=['POST'])
        @self._require_auth  
        def upload_document():
            """Upload a document"""
            try:
                if 'file' not in request.files:
                    return jsonify({'error': 'No file provided'}), 400
                
                file = request.files['file']
                document_type = request.form.get('type', 'general')
                appointment_id = request.form.get('appointment_id')
                
                if file.filename == '':
                    return jsonify({'error': 'No file selected'}), 400
                
                # Validate file type
                allowed_extensions = {'.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'}
                file_ext = os.path.splitext(file.filename)[1].lower()
                
                if file_ext not in allowed_extensions:
                    return jsonify({'error': f'File type not allowed. Allowed: {", ".join(allowed_extensions)}'}), 400
                
                # Generate unique filename
                unique_filename = f"{g.user['uid']}_{datetime.utcnow().timestamp()}_{file.filename}"
                
                # Save file locally
                upload_dir = os.path.join(self.app.config.get('UPLOAD_FOLDER', 'uploads'), g.user['uid'])
                os.makedirs(upload_dir, exist_ok=True)
                
                file_path = os.path.join(upload_dir, unique_filename)
                file.save(file_path)
                
                # Store metadata in database
                document_data = {
                    'user_id': g.user['uid'],
                    'filename': file.filename,
                    'unique_filename': unique_filename,
                    'file_path': file_path,
                    'document_type': document_type,
                    'file_size': os.path.getsize(file_path),
                    'uploaded_at': datetime.utcnow(),
                    'status': 'uploaded'
                }
                
                if appointment_id:
                    document_data['appointment_id'] = appointment_id
                
                doc_ref = db.collection('documents').add(document_data)
                document_id = doc_ref[1].id
                
                # Track document upload analytics (get NIC for citizens)
                try:
                    if g.user.get('role') == 'citizen':
                        citizens = db.collection('citizens').where('firebaseUid', '==', g.user['uid']).limit(1).get()
                        if citizens:
                            nic = citizens[0].id
                            self._track_analytics_event('document_uploaded', nic, None, {
                                'documentId': document_id,
                                'documentType': document_type,
                                'filename': file.filename
                            })
                except Exception as analytics_error:
                    logger.error(f"Analytics tracking error for document upload: {analytics_error}")
                
                return jsonify({
                    'message': 'Document uploaded successfully',
                    'document_id': document_id,
                    'filename': file.filename
                }), 200
                
            except Exception as e:
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/documents', methods=['GET'])
        @self._require_auth
        def get_user_documents():
            """Get user's documents"""
            try:
                docs = db.collection('documents')\
                    .where('user_id', '==', g.user['uid'])\
                    .order_by('uploaded_at', direction=firestore.Query.DESCENDING)\
                    .get()
                
                documents = []
                for doc in docs:
                    document = doc.to_dict()
                    if document:
                        document['id'] = doc.id
                        # Don't expose file system path
                        del document['file_path']
                        documents.append(document)
                
                return jsonify({'documents': documents})
                
            except Exception as e:
                return jsonify({'error': str(e)}), 500
        
        @self.app.route('/api/documents/<document_id>', methods=['DELETE'])
        @self._require_auth
        def delete_document(document_id):
            """Delete a document"""
            try:
                # Get document info
                doc_ref = db.collection('documents').document(document_id)
                doc = doc_ref.get()
                
                if not doc.exists:
                    return jsonify({'error': 'Document not found'}), 404
                
                document = doc.to_dict()
                
                # Check ownership or admin access
                if document['user_id'] != g.user['uid'] and g.user['role'] not in ['admin', 'staff']:
                    return jsonify({'error': 'Access denied'}), 403
                
                # Delete physical file
                file_path = document.get('file_path')
                if file_path and os.path.exists(file_path):
                    os.remove(file_path)
                
                # Delete from database
                doc_ref.delete()
                
                return jsonify({'message': 'Document deleted successfully'})
                
            except Exception as e:
                return jsonify({'error': str(e)}), 500
    
    def _setup_error_handlers(self):
        """Setup error handlers"""
        
        @self.app.errorhandler(404)
        def not_found(error):
            return jsonify({'error': 'Endpoint not found'}), 404
        
        @self.app.errorhandler(500)
        def internal_error(error):
            logger.error(f"Internal error: {error}")
            return jsonify({'error': 'Internal server error'}), 500
        
        @self.app.errorhandler(403)
        def forbidden(error):
            return jsonify({'error': 'Access forbidden'}), 403
        
        @self.app.errorhandler(401)
        def unauthorized(error):
            return jsonify({'error': 'Authentication required'}), 401
    
    def _require_auth(self, f):
        """Authentication decorator"""
        @wraps(f)
        def decorated_function(*args, **kwargs):
            auth_header = request.headers.get('Authorization')
            
            if not auth_header or not auth_header.startswith('Bearer '):
                return jsonify({'error': 'Authorization header required'}), 401
            
            token = auth_header.split(' ')[1]
            
            try:
                payload = jwt.decode(token, self.app.config['SECRET_KEY'], algorithms=['HS256'])
                g.user = payload
            except jwt.ExpiredSignatureError:
                return jsonify({'error': 'Token has expired'}), 401
            except jwt.InvalidTokenError:
                return jsonify({'error': 'Invalid token'}), 401
            
            return f(*args, **kwargs)
        
        return decorated_function
    
    def _require_role(self, allowed_roles):
        """Role-based access decorator"""
        def decorator(f):
            @wraps(f)
            @self._require_auth
            def decorated_function(*args, **kwargs):
                user_role = g.user.get('role')
                if user_role not in allowed_roles:
                    return jsonify({'error': 'Insufficient permissions'}), 403
                return f(*args, **kwargs)
            return decorated_function
        return decorator
    
    def _generate_jwt(self, uid, role):
        """Generate JWT token"""
        payload = {
            'uid': uid,
            'role': role,
            'iat': datetime.utcnow(),
            'exp': datetime.utcnow() + timedelta(hours=1)
        }
        return jwt.encode(payload, self.app.config['SECRET_KEY'], algorithm='HS256')
    
    def _send_notification(self, user_id, title, message, notification_type='general'):
        """Send notification to user"""
        try:
            notification_data = {
                'user_id': user_id,
                'title': title,
                'message': message,
                'type': notification_type,
                'created_at': datetime.utcnow(),
                'is_read': False
            }
            
            doc_ref = db.collection('notifications').add(notification_data)
            
            # Send real-time notification via SocketIO
            self.socketio.emit('new_notification', {
                'id': doc_ref[1].id,
                'title': title,
                'message': message,
                'type': notification_type
            }, room=f'user_{user_id}')
            
        except Exception as e:
            logger.error(f"Error sending notification: {e}")


def create_app():
    """Application factory"""
    server = GovConnectServer()
    return server.create_app()


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
