import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Eye, Edit, AlertTriangle, CheckCircle } from 'lucide-react';
import Logo from '../../components/Logo';

const BrowseUser = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState([
    { 
      id: 'M001', 
      name: 'Ahmed Hassan', 
      nic: '123456789012', 
      appointmentType: 'General Checkup', 
      status: 'Active', 
      lastVisit: '2024-01-15',
      medicalHistory: 'Clean',
      flagged: false
    },
    { 
      id: 'M002', 
      name: 'Fatima Al-Zahra', 
      nic: '234567890123', 
      appointmentType: 'License Medical', 
      status: 'Pending Review', 
      lastVisit: '2024-01-18',
      medicalHistory: 'Diabetes',
      flagged: true
    },
    { 
      id: 'M003', 
      name: 'Omar Abdullah', 
      nic: '345678901234', 
      appointmentType: 'Passport Medical', 
      status: 'Completed', 
      lastVisit: '2024-01-20',
      medicalHistory: 'Clean',
      flagged: false
    },
    { 
      id: 'M004', 
      name: 'Layla Ibrahim', 
      nic: '456789012345', 
      appointmentType: 'General Checkup', 
      status: 'Failed Medical', 
      lastVisit: '2024-01-12',
      medicalHistory: 'Vision Issues',
      flagged: true
    },
    { 
      id: 'M005', 
      name: 'Yousef Mahmoud', 
      nic: '567890123456', 
      appointmentType: 'License Medical', 
      status: 'Active', 
      lastVisit: '2024-01-22',
      medicalHistory: 'Clean',
      flagged: false
    }
  ]);

  const handleGoBack = () => {
    navigate('/MedicalStaff/dashboard');
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.nic.includes(searchTerm) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewUser = (userId) => {
    console.log('Viewing user:', userId);
    // navigate(`/medical-staff/user/${userId}`);
  };

  const handleEditUser = (userId) => {
    console.log('Editing user:', userId);
    // navigate(`/medical-staff/edit-user/${userId}`);
  };

  const handleFlagUser = (userId) => {
    navigate('/MedicalStaff/FlagUser', { state: { userId } });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#10B981';
      case 'Completed': return '#059669';
      case 'Pending Review': return '#F59E0B';
      case 'Failed Medical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getMedicalHistoryColor = (history) => {
    return history === 'Clean' ? '#10B981' : '#F59E0B';
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
    flaggedIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '12px',
      fontWeight: '500'
    },
    medicalHistory: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '12px',
      fontWeight: '500'
    },
    actionButtons: {
      display: 'flex',
      gap: '8px'
    },
    actionButton: {
      padding: '6px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    viewButton: {
      backgroundColor: '#3b82f6',
      color: '#ffffff'
    },
    editButton: {
      backgroundColor: '#10b981',
      color: '#ffffff'
    },
    flagButton: {
      backgroundColor: '#ef4444',
      color: '#ffffff'
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
            <h1 style={styles.title}>Browse Medical Patients</h1>
          </div>
        </div>

        <div style={styles.searchSection}>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by name, NIC, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
            <Search size={20} style={styles.searchIcon} />
          </div>
        </div>

        {filteredUsers.length > 0 ? (
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>NIC</th>
                <th style={styles.th}>Appointment Type</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Last Visit</th>
                <th style={styles.th}>Medical History</th>
                <th style={styles.th}>Flagged</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td style={styles.td}>{user.id}</td>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.nic}</td>
                  <td style={styles.td}>{user.appointmentType}</td>
                  <td style={styles.td}>
                    <span 
                      style={{
                        ...styles.statusBadge,
                        backgroundColor: getStatusColor(user.status)
                      }}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td style={styles.td}>{user.lastVisit}</td>
                  <td style={styles.td}>
                    <div style={{
                      ...styles.medicalHistory,
                      color: getMedicalHistoryColor(user.medicalHistory)
                    }}>
                      {user.medicalHistory === 'Clean' ? (
                        <CheckCircle size={16} />
                      ) : (
                        <AlertTriangle size={16} />
                      )}
                      {user.medicalHistory}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={{
                      ...styles.flaggedIndicator,
                      color: user.flagged ? '#ef4444' : '#10b981'
                    }}>
                      {user.flagged ? (
                        <>
                          <AlertTriangle size={16} />
                          Yes
                        </>
                      ) : (
                        <>
                          <CheckCircle size={16} />
                          No
                        </>
                      )}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionButtons}>
                      <button
                        style={{...styles.actionButton, ...styles.viewButton}}
                        onClick={() => handleViewUser(user.id)}
                        title="View User"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        style={{...styles.actionButton, ...styles.editButton}}
                        onClick={() => handleEditUser(user.id)}
                        title="Edit User"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        style={{...styles.actionButton, ...styles.flagButton}}
                        onClick={() => handleFlagUser(user.id)}
                        title="Flag User"
                      >
                        <AlertTriangle size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={styles.noResults}>
            No users found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseUser;
