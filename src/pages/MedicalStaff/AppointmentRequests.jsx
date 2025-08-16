import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import { ArrowLeft, Droplets } from 'lucide-react';

const MedicalStaff = () => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate('/medical-staff/dashboard');

  const handleViewPatientDetails = (patientId) => {
    console.log('Viewing details for patient:', patientId);
    // Add your patient details navigation logic here
  };

  const handleReserveSlot = (patientId) => {
    console.log('Reserving slot for patient:', patientId);
    // Add your slot reservation logic here
  };

  const appointments = [
    { id: 1, name: "Patient's Name" },
    { id: 2, name: "Patient's Name" },
    { id: 3, name: "Patient's Name" },
    { id: 4, name: "Patient's Name" }
  ];

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.backArrow} onClick={handleGoBack}>
            <ArrowLeft size={24} color="#000000" />
          </div>
          <div style={styles.headerContent}>
            <div style={styles.dropletIcon}>
              <Droplets size={24} color="#47a7ff" />
            </div>
            <h1 style={styles.title}>Medical Staff</h1>
          </div>
        </div>
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Appointments</h2>
          {appointments.map((appointment) => (
            <div key={appointment.id} style={styles.appointmentCard}>
              <div style={styles.patientName}>{appointment.name}</div>
              <div 
                style={styles.patientDetails} 
                onClick={() => handleViewPatientDetails(appointment.id)}
              >
                Patient's Details
              </div>
              <button
                style={styles.reserveButton}
                onClick={() => handleReserveSlot(appointment.id)}
              >
                Reserve slot
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: 'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    margin: 0,
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    padding: '32px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '32px',
  },
  backArrow: {
    cursor: 'pointer',
    marginRight: '16px',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  dropletIcon: {
    marginLeft: '8px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#033ea1',
    marginLeft: '8px',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#033ea1',
    marginBottom: '20px',
    margin: '0 0 20px 0',
  },
  appointmentCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '16px',
    border: '1px solid #e5e5e5'
  },
  patientName: {
    color: '#000000',
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '8px'
  },
  patientDetails: {
    color: '#47a7ff',
    fontSize: '14px',
    marginBottom: '16px',
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  reserveButton: {
  backgroundColor: '#033ea1',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  padding: '1rem',
  fontSize: '16px',
  fontWeight: '600',
  width: '100% !important',
  minWidth: '180px !important',
  maxWidth: 'none !important',
  boxSizing: 'border-box',
  cursor: 'pointer',
  display: 'block !important',
  justifyContent: 'center !important',
  alignItems: 'center !important',
  textAlign: 'center !important',
  transition: 'background-color 0.2s ease, transform 0.1s ease'
  }
};

export default MedicalStaff;