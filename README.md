# GovConnect - Sri Lankan Government Services Platform

A unified digital platform for Sri Lankan government services including medical appointments, passport applications, and license renewals with comprehensive analytics tracking.

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure Firebase**
   - Place your Firebase service account key in `keys/` directory
   - Update `.env` with your Firebase configuration

3. **Run the Application**
   ```bash
   python server.py
   ```

4. **Access the Platform**
   - Server: http://localhost:5000
   - Health Check: http://localhost:5000/health

## 📊 Database Structure

The application uses Firebase Firestore with 14 collections:

- **citizens** - Citizen profiles (NIC as document ID)
- **passports** - Passport records
- **licenses** - License records  
- **medicalTimeSlots** - Available medical appointment slots
- **passportTimeSlots** - Available passport appointment slots
- **licenseTimeSlots** - Available license appointment slots
- **medicalAppointments** - Medical appointments
- **passportAppointments** - Passport appointments
- **licenseAppointments** - License appointments
- **medicalStaff** - Medical department staff
- **passportStaff** - Passport department staff
- **rmvStaff** - RMV department staff
- **complaints** - User complaints and feedback
- **analytics_events** - User activity tracking and analytics

## 🔧 Configuration

Key configuration files:
- `config.py` - Application configuration
- `.env` - Environment variables
- `database/firebase_config.py` - Firebase setup

## 📈 Analytics System

The platform includes comprehensive analytics tracking that automatically monitors user activities:

### Tracked Events
- **User Registration** - New citizen sign-ups
- **User Login** - Authentication events
- **Appointment Booking** - Service bookings across all departments
- **Complaint Submission** - User feedback and complaints
- **Document Upload** - File upload activities
- **Time Slot Search** - Availability queries

### Analytics Features
- **Real-time tracking** - Events logged immediately
- **Privacy-focused** - Only citizen activities tracked
- **Rich context** - Department, timestamps, and metadata
- **Fail-safe design** - Analytics errors don't affect core functionality

## 🛠️ Utilities

Essential scripts for database management:
```bash
python verify_structure.py   # Verify database structure
python database_dump.py      # Backup database
python database_restore.py   # Restore from backup
```

## 📁 Project Structure

```
├── server.py                 # Main application server
├── config.py                 # Configuration settings
├── database/                 # Database configuration and models
├── static/                   # Static assets (images, CSS, JS)
├── docs/                     # Documentation files
├── keys/                     # Firebase service account keys
├── scripts/                  # Database utilities and seeding
├── database_backups/         # Database backup files
└── uploads/                  # User file uploads
```

## 🔐 Features

- **Authentication** - Firebase Auth with JWT tokens
- **Appointment Booking** - Real-time slot management across departments
- **Document Upload** - Secure file handling with validation
- **Advanced Analytics** - Peak hours, department load, no-show rates, processing times
- **Analytics Tracking** - Comprehensive user activity monitoring
- **Complaint System** - Multi-department feedback management
- **Multi-department Support** - Medical, Passport, License services
- **Health Monitoring** - System and database health checks

## 📋 API Endpoints

### Health & Status
- `GET /health` - System health check
- `GET /health/database` - Database connectivity

### Authentication  
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - User profile

### Departments & Services
- `GET /api/departments` - List all departments
- `GET /api/departments/{dept}/services` - Department services
- `GET /api/departments/{dept}/timeslots` - Available time slots

### Appointments
- `POST /api/appointments/{department}` - Book appointment
- `GET /api/appointments/user/{nic}` - User appointments

### Analytics
- `GET /api/analytics/summary` - Basic analytics summary
- `GET /api/analytics/peak-hours` - Peak booking hours analysis
- `GET /api/analytics/department-load` - Department appointment load
- `GET /api/analytics/no-show-rate` - No-show rates by department
- `GET /api/analytics/avg-processing-time` - Average processing times
- `GET /api/analytics/dashboard` - Comprehensive analytics dashboard

### Feedback & Complaints
- `POST /api/feedback/submit` - Submit feedback
- `POST /api/complaints/submit` - Submit complaint
- `GET /api/complaints/user/{nic}` - User complaints

## 🚀 Production Deployment

1. **Environment Setup**
   - Configure production Firebase project
   - Set environment variables in `.env`
   - Update firestore security rules

2. **Database Setup**
   - Import firestore indexes: `firestore_corrected.indexes.json`
   - Configure firestore rules: `firestore.rules`
   - Seed initial data if needed

3. **Server Deployment**
   - Deploy to your preferred hosting platform
   - Ensure all dependencies are installed
   - Configure SSL/HTTPS for production

## 🛠️ Development

This is a Flask-based application with Firebase backend integration, designed for Sri Lankan government digital services. The system is production-ready with comprehensive testing and analytics integration.
