import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const MedicalReports = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/citizen/medical');
  };

  return (
    <div style={styles.container}>
      {/* Header with back button */}
      <div style={styles.header}>
        <div style={styles.backButton} onClick={handleGoBack}>
          <ArrowLeft size={24} color="#033ea1" />
        </div>
        <h1 style={styles.title}>Medical Reports</h1>
      </div>

      {/* Main content */}
      <div style={styles.content}>
        <div style={styles.messageContainer}>
          <div style={styles.iconContainer}>
            <div style={styles.icon}>📋</div>
          </div>
          
          <h2 style={styles.heading}>No Medical Reports Available</h2>
          
          <p style={styles.message}>
            There are currently no medical reports to display. Medical reports will appear here 
            once they have been generated and approved by our medical staff.
          </p>
          
          <p style={styles.subMessage}>
            If you believe this is an error or if you have recently completed medical examinations, 
            please contact our support team for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: 'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    backgroundColor: '#ffffff',
    padding: '20px 24px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  backButton: {
    cursor: 'pointer',
    marginRight: '16px',
    padding: '8px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#f1f5f9'
    }
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0
  },
  content: {
    padding: '60px 24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 100px)'
  },
  messageContainer: {
    textAlign: 'center',
    maxWidth: '500px',
    backgroundColor: '#ffffff',
    padding: '48px 32px',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0'
  },
  iconContainer: {
    marginBottom: '24px'
  },
  icon: {
    fontSize: '48px',
    display: 'inline-block'
  },
  heading: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '16px',
    margin: '0 0 16px 0'
  },
  message: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#6b7280',
    marginBottom: '16px',
    margin: '0 0 16px 0'
  },
  subMessage: {
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#9ca3af',
    margin: 0
  }
};

export default MedicalReports;
