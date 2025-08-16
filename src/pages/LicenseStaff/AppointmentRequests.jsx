import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import { ArrowLeft, Droplets, Download, Check, X } from 'lucide-react';

const RMVStaffReview = () => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate('/license-staff/dashboard');

  const handleDownload = (applicationId) => {
    console.log('Downloading application:', applicationId);
    // Add your download logic here
  };

  const handleApprove = (applicationId) => {
    console.log('Approving application:', applicationId);
    // Add your approve logic here
  };

  const handleReject = (applicationId) => {
    console.log('Rejecting application:', applicationId);
    // Add your reject logic here
  };

  const applications = [
    { id: 1, type: "nic_application_type" },
    { id: 2, type: "nic_application_type" },
    { id: 3, type: "nic_application_type" }
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
            <h1 style={styles.title}>R.M.V Staff</h1>
          </div>
        </div>
        
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Review</h2>
          
          {/* Applications List */}
          <div style={styles.applicationsContainer}>
            {applications.map((application) => (
              <div key={application.id} style={styles.applicationRow}>
                {/* Download Button */}
                <div 
                  style={styles.downloadButton}
                  onClick={() => handleDownload(application.id)}
                >
                  <Download size={20} color="#47a7ff" />
                </div>
                
                {/* Application Type */}
                <div style={styles.applicationText}>
                  {application.type}
                </div>
                
                {/* Action Buttons */}
                <div style={styles.actionButtons}>
                  {/* Approve Button */}
                  <button
                    style={styles.approveButton}
                    onClick={() => handleApprove(application.id)}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#16a34a';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#22c55e';
                    }}
                  >
                    <Check size={16} color="white" />
                  </button>
                  
                  {/* Reject Button */}
                  <button
                    style={styles.rejectButton}
                    onClick={() => handleReject(application.id)}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#dc2626';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#ef4444';
                    }}
                  >
                    <X size={16} color="white" />
                  </button>
                </div>
              </div>
            ))}
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
    padding: '20px'
  },
  sectionTitle: {
    color: '#000000',
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '20px',
    margin: '0 0 20px 0'
  },
  applicationsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  applicationRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    border: '1px solid #e5e5e5',
    gap: '12px'
  },
  downloadButton: {
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease'
  },
  applicationText: {
    flex: 1,
    color: '#000000',
    fontSize: '16px',
    fontWeight: '500'
  },
  actionButtons: {
    display: 'flex',
    gap: '8px'
  },
  approveButton: {
    backgroundColor: '#22c55e',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  },
  rejectButton: {
    backgroundColor: '#ef4444',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  }
};

export default RMVStaffReview;