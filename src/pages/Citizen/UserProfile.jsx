import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Edit, FileText } from 'lucide-react';
import Logo from '../../components/Logo';

const UserProfile = () => {
  const navigate = useNavigate();
  
  // This will eventually come from the backend/database
  const [userProfile, setUserProfile] = useState({
    personalInfo: {
      fullName: 'Ahmed Hassan Al-Mahmoud',
      nic: '123456789012',
      email: 'ahmed.hassan@email.com',
      phone: '+965-1234-5678',
      dateOfBirth: '1990-05-15',
      nationality: 'Kuwaiti',
      gender: 'Male'
    },
    address: {
      governorate: 'Al Ahmadi',
      area: 'Fahaheel',
      block: '4',
      street: 'Street 12',
      building: 'Building 45',
      apartment: 'Apt 3'
    },
    documents: {
      passport: {
        number: 'PS123456789',
        issueDate: '2022-03-15',
        expiryDate: '2032-03-15',
        status: 'Active'
      },
      license: {
        number: 'DL987654321',
        type: 'Driving License',
        issueDate: '2021-08-20',
        expiryDate: '2031-08-20',
        status: 'Active'
      }
    },
    accountInfo: {
      registrationDate: '2024-01-15',
      lastLogin: '2024-08-16',
      accountStatus: 'Active'
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: Fetch user profile data from backend
    // fetchUserProfile();
  }, []);

  const handleGoBack = () => {
    navigate('/citizen/dashboard');
  };

  const handleEditProfile = () => {
    navigate('/citizen/profile/edit');
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? '#10B981' : '#EF4444';
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
      maxWidth: '800px',
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
      justifyContent: 'space-between',
      marginBottom: '30px',
      paddingBottom: '20px',
      borderBottom: '2px solid #e5e7eb'
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center'
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
    editButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px',
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    profileSection: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '30px'
    },
    section: {
      backgroundColor: '#f9fafb',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      marginBottom: '20px'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px'
    },
    infoItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    label: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    value: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#1f2937'
    },
    statusBadge: {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      color: '#ffffff',
      display: 'inline-block',
      width: 'fit-content'
    },
    fullWidth: {
      gridColumn: '1 / -1'
    },
    avatar: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      backgroundColor: '#3b82f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      fontSize: '32px',
      fontWeight: '600',
      marginBottom: '15px'
    },
    profileHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '30px'
    },
    profileInfo: {
      flex: 1
    },
    userName: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '5px'
    },
    userRole: {
      fontSize: '14px',
      color: '#6b7280',
      fontWeight: '500'
    }
  };

  if (loading) {
    return (
      <div style={styles.body}>
        <div style={styles.container}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px'
          }}>
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerLeft}>
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
              <h1 style={styles.title}>My Profile</h1>
            </div>
          </div>
          <button
            style={styles.editButton}
            onClick={handleEditProfile}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            <Edit size={16} />
            Edit Profile
          </button>
        </div>

        <div style={styles.profileHeader}>
          <div style={styles.avatar}>
            {userProfile.personalInfo.fullName.split(' ').map(name => name[0]).join('').substring(0, 2)}
          </div>
          <div style={styles.profileInfo}>
            <div style={styles.userName}>{userProfile.personalInfo.fullName}</div>
            <div style={styles.userRole}>Citizen • ID: {userProfile.personalInfo.nic}</div>
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <User size={20} />
            Personal Information
          </h3>
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <span style={styles.label}>Full Name</span>
              <span style={styles.value}>{userProfile.personalInfo.fullName}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.label}>NIC Number</span>
              <span style={styles.value}>{userProfile.personalInfo.nic}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.label}>Date of Birth</span>
              <span style={styles.value}>{userProfile.personalInfo.dateOfBirth}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.label}>Nationality</span>
              <span style={styles.value}>{userProfile.personalInfo.nationality}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.label}>Gender</span>
              <span style={styles.value}>{userProfile.personalInfo.gender}</span>
            </div>
          </div>
        </div>

        <div style={styles.profileSection}>
          <div>
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <Mail size={20} />
                Contact Information
              </h3>
              <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                  <span style={styles.label}>Email</span>
                  <span style={styles.value}>{userProfile.personalInfo.email}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.label}>Phone</span>
                  <span style={styles.value}>{userProfile.personalInfo.phone}</span>
                </div>
              </div>
            </div>

            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <MapPin size={20} />
                Address
              </h3>
              <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                  <span style={styles.label}>Governorate</span>
                  <span style={styles.value}>{userProfile.address.governorate}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.label}>Area</span>
                  <span style={styles.value}>{userProfile.address.area}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.label}>Block</span>
                  <span style={styles.value}>{userProfile.address.block}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.label}>Street</span>
                  <span style={styles.value}>{userProfile.address.street}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.label}>Building</span>
                  <span style={styles.value}>{userProfile.address.building}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.label}>Apartment</span>
                  <span style={styles.value}>{userProfile.address.apartment}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <FileText size={20} />
                Documents
              </h3>
              <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                  <span style={styles.label}>Passport Number</span>
                  <span style={styles.value}>{userProfile.documents.passport.number}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.label}>Passport Status</span>
                  <span 
                    style={{
                      ...styles.statusBadge,
                      backgroundColor: getStatusColor(userProfile.documents.passport.status)
                    }}
                  >
                    {userProfile.documents.passport.status}
                  </span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.label}>License Number</span>
                  <span style={styles.value}>{userProfile.documents.license.number}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.label}>License Status</span>
                  <span 
                    style={{
                      ...styles.statusBadge,
                      backgroundColor: getStatusColor(userProfile.documents.license.status)
                    }}
                  >
                    {userProfile.documents.license.status}
                  </span>
                </div>
              </div>
            </div>

            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <Calendar size={20} />
                Account Information
              </h3>
              <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                  <span style={styles.label}>Member Since</span>
                  <span style={styles.value}>{userProfile.accountInfo.registrationDate}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.label}>Last Login</span>
                  <span style={styles.value}>{userProfile.accountInfo.lastLogin}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.label}>Account Status</span>
                  <span 
                    style={{
                      ...styles.statusBadge,
                      backgroundColor: getStatusColor(userProfile.accountInfo.accountStatus)
                    }}
                  >
                    {userProfile.accountInfo.accountStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
