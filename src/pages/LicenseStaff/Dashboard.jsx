import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import { ArrowLeft, Droplets, User, CheckCircle, Users, Truck } from 'lucide-react';

const RMVStaffWelcome = () => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate('/login');

  const handleAppointmentClick = () => {
  navigate('/LicenseStaff/appointment');
  };

  const handleBrowseUserClick = () => {
    navigate('/license-staff/browse-users');
  };

  const handleIssueDeliveryClick = () => {
    navigate('/license-staff/update-status');
  };

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
            <h1 style={styles.title}>R.M.V Staff</h1>
          </div>
        </div>
        
        <div style={styles.content}>
          {/* Profile Section */}
          <div style={styles.profileSection}>
            <div style={styles.profileIcon}>
              <User size={48} color="#033ea1" />
            </div>
            <h2 style={styles.welcomeText}>Welcome</h2>
          </div>

          {/* Action Cards */}
          <div style={styles.actionsContainer}>
            {/* Appointment Card */}
            <div style={styles.actionCard}>
              <div style={styles.cardIcon}>
                <CheckCircle size={32} color="#033ea1" />
              </div>
              <button 
                style={styles.actionButton}
                onClick={handleAppointmentClick}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#022d7a';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#033ea1';
                }}
                onMouseDown={(e) => {
                  e.target.style.transform = 'translateY(1px)';
                }}
                onMouseUp={(e) => {
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Appointment
              </button>
            </div>

            {/* Browse User Card */}
            <div style={styles.actionCard}>
              <div style={styles.cardIcon}>
                <Users size={32} color="#033ea1" />
              </div>
              <button 
                style={styles.actionButton}
                onClick={handleBrowseUserClick}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#022d7a';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#033ea1';
                }}
                onMouseDown={(e) => {
                  e.target.style.transform = 'translateY(1px)';
                }}
                onMouseUp={(e) => {
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Browse User
              </button>
            </div>

            {/* Issue & Delivery Card */}
            <div style={styles.actionCard}>
              <div style={styles.cardIcon}>
                <Truck size={32} color="#033ea1" />
              </div>
              <button 
                style={styles.actionButton}
                onClick={handleIssueDeliveryClick}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#022d7a';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#033ea1';
                }}
                onMouseDown={(e) => {
                  e.target.style.transform = 'translateY(1px)';
                }}
                onMouseUp={(e) => {
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Issue & Delivery
              </button>
            </div>
          </div>
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
    minHeight: '100vh'
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    padding: '32px',
    minHeight: '80vh'
  },
  header: {
    backgroundColor: 'white',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderBottom: '1px solid #e5e5e5'
  },
  backArrow: {
    position: 'absolute',
    left: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  dropletIcon: {
    marginBottom: '8px'
  },
  title: {
    color: '#000000',
    fontSize: '24px',
    fontWeight: '700',
    textAlign: 'center',
    margin: 0
  },
  content: {
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '40px'
  },
  profileIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    border: '3px solid #033ea1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px'
  },
  welcomeText: {
    color: '#000000',
    fontSize: '20px',
    fontWeight: '600',
    margin: 0
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    width: '100%',
    maxWidth: '220px'
  },
  actionCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    border: '1px solid #e5e5e5'
  },
  cardIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionButton: {
    backgroundColor: '#033ea1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '1rem',
    fontSize: '16px',
    fontWeight: '600',
    width: '100%',
    minWidth: '180px',
    maxWidth: 'none',
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'block',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    transition: 'background-color 0.2s ease, transform 0.1s ease'
  }
};

export default RMVStaffWelcome;