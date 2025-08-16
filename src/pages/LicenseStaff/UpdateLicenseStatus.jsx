import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, CheckCircle, AlertTriangle } from 'lucide-react';
import Logo from '../../components/Logo';

const UpdateLicenseStatus = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [applications] = useState([
    { 
      id: 'LA001', 
      applicantName: 'Ahmed Hassan', 
      nic: '123456789012', 
      licenseType: 'Driving License', 
      status: 'Under Review', 
      submittedDate: '2024-01-15',
      documents: 'Complete'
    },
    { 
      id: 'LA002', 
      applicantName: 'Fatima Al-Zahra', 
      nic: '234567890123', 
      licenseType: 'Commercial License', 
      status: 'Pending Verification', 
      submittedDate: '2024-01-18',
      documents: 'Missing Medical Certificate'
    },
    { 
      id: 'LA003', 
      applicantName: 'Omar Abdullah', 
      nic: '345678901234', 
      licenseType: 'Motorcycle License', 
      status: 'Ready for Approval', 
      submittedDate: '2024-01-20',
      documents: 'Complete'
    },
    { 
      id: 'LA004', 
      applicantName: 'Layla Ibrahim', 
      nic: '456789012345', 
      licenseType: 'Driving License', 
      status: 'Rejected', 
      submittedDate: '2024-01-12',
      documents: 'Invalid NIC Copy'
    }
  ]);

  const handleGoBack = () => {
    navigate('/LicenseStaff/dashboard');
  };

  const filteredApplications = applications.filter(app =>
    app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.nic.includes(searchTerm) ||
    app.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusUpdate = (appId, newStatus) => {
    console.log(`Updating application ${appId} to status: ${newStatus}`);
    // Here you would typically make an API call to update the status
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Under Review': return '#F59E0B';
      case 'Pending Verification': return '#EF4444';
      case 'Ready for Approval': return '#10B981';
      case 'Approved': return '#059669';
      case 'Rejected': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const getDocumentColor = (documents) => {
    return documents === 'Complete' ? '#10B981' : '#EF4444';
  };

  const styles = {
    body: {
      fontFamily: 'Montserrat, sans-serif',
      margin: 0,
      padding: 0,
      backgroundColor: '#f0f4f8',
      minHeight: '100vh'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginTop: '20px'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '30px',
      paddingBottom: '20px',
      borderBottom: '2px solid #e5e7eb'
    },
    backArrow: {
      cursor: 'pointer',
      marginRight: '20px',
      padding: '8px',
      borderRadius: '8px',
      backgroundColor: '#f3f4f6',
      transition: 'all 0.2s ease'
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1f2937',
      margin: 0
    },
    searchSection: {
      marginBottom: '30px'
    },
    searchContainer: {
      position: 'relative',
      maxWidth: '400px'
    },
    searchInput: {
      width: '100%',
      padding: '12px 45px 12px 15px',
      border: '2px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '16px',
      fontFamily: 'Montserrat, sans-serif',
      outline: 'none',
      transition: 'border-color 0.2s ease'
    },
    searchIcon: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#6b7280'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    tableHeader: {
      backgroundColor: '#f9fafb',
      fontWeight: '600',
      color: '#374151'
    },
    th: {
      padding: '15px',
      textAlign: 'left',
      borderBottom: '2px solid #e5e7eb',
      fontSize: '14px',
      fontWeight: '600'
    },
    td: {
      padding: '15px',
      borderBottom: '1px solid #e5e7eb',
      fontSize: '14px'
    },
    statusBadge: {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      color: '#ffffff',
      display: 'inline-block'
    },
    documentStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '12px',
      fontWeight: '500'
    },
    actionButtons: {
      display: 'flex',
      gap: '8px',
      flexDirection: 'column'
    },
    actionButton: {
      padding: '6px 12px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: '12px',
      fontWeight: '500',
      color: '#ffffff'
    },
    approveButton: {
      backgroundColor: '#10b981'
    },
    rejectButton: {
      backgroundColor: '#ef4444'
    },
    reviewButton: {
      backgroundColor: '#3b82f6'
    },
    noResults: {
      textAlign: 'center',
      color: '#6b7280',
      fontSize: '16px',
      padding: '40px',
      fontStyle: 'italic'
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div 
            style={styles.backArrow} 
            onClick={handleGoBack}
            onMouseOver={(e) => e.target.style.backgroundColor = '#e5e7eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#f3f4f6'}
          >
            <ArrowLeft size={24} color="#000000" />
          </div>
          <div style={styles.headerContent}>
            <Logo width="120px" />
            <h1 style={styles.title}>Update License Status</h1>
          </div>
        </div>

        <div style={styles.searchSection}>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by name, NIC, or application ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
            <Search size={20} style={styles.searchIcon} />
          </div>
        </div>

        {filteredApplications.length > 0 ? (
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.th}>Application ID</th>
                <th style={styles.th}>Applicant Name</th>
                <th style={styles.th}>NIC</th>
                <th style={styles.th}>License Type</th>
                <th style={styles.th}>Current Status</th>
                <th style={styles.th}>Submitted Date</th>
                <th style={styles.th}>Documents</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr key={app.id}>
                  <td style={styles.td}>{app.id}</td>
                  <td style={styles.td}>{app.applicantName}</td>
                  <td style={styles.td}>{app.nic}</td>
                  <td style={styles.td}>{app.licenseType}</td>
                  <td style={styles.td}>
                    <span 
                      style={{
                        ...styles.statusBadge,
                        backgroundColor: getStatusColor(app.status)
                      }}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td style={styles.td}>{app.submittedDate}</td>
                  <td style={styles.td}>
                    <div style={{
                      ...styles.documentStatus,
                      color: getDocumentColor(app.documents)
                    }}>
                      {app.documents === 'Complete' ? (
                        <CheckCircle size={16} />
                      ) : (
                        <AlertTriangle size={16} />
                      )}
                      {app.documents}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionButtons}>
                      {app.status === 'Ready for Approval' && (
                        <button
                          style={{...styles.actionButton, ...styles.approveButton}}
                          onClick={() => handleStatusUpdate(app.id, 'Approved')}
                        >
                          Approve
                        </button>
                      )}
                      {app.status !== 'Rejected' && app.status !== 'Approved' && (
                        <button
                          style={{...styles.actionButton, ...styles.rejectButton}}
                          onClick={() => handleStatusUpdate(app.id, 'Rejected')}
                        >
                          Reject
                        </button>
                      )}
                      {app.status === 'Pending Verification' && (
                        <button
                          style={{...styles.actionButton, ...styles.reviewButton}}
                          onClick={() => handleStatusUpdate(app.id, 'Under Review')}
                        >
                          Review
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={styles.noResults}>
            No applications found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateLicenseStatus;
