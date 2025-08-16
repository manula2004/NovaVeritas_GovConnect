import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, FileText, Phone, Calendar, MapPin } from 'lucide-react';

const EditUserProfilePage2 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    personalDetails: '',
    nicDetails: '',
    phoneNumber: '',
    appointmentDate: '',
    address: '',
    emergencyContact1: '',
    emergencyContact2: '',
    email: '',
    bankDetails: '',
    bloodGroup: ''
  });

  const handleGoBack = () => navigate('/citizen/profile/edit');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDone = () => {
    console.log('Form submitted:', formData);
    navigate('/citizen/profile/edit/page3');
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.backArrow} onClick={handleGoBack}>
            <ArrowLeft size={24} color="#000000" />
          </div>
        </div>
        
        <div style={styles.content}>
          {/* Logo Section */}
          <div style={styles.logoSection}>
            <div style={styles.logoContainer}>
              <div style={styles.logoIcon}>
                <div style={styles.logoShape}></div>
              </div>
            </div>
            <h2 style={styles.logoText}>GovConnect</h2>
          </div>

          {/* Form Fields */}
          <div style={styles.formContainer}>
            {/* Personal Details */}
            <div style={styles.inputGroup}>
              <div style={styles.inputContainer}>
                <User size={20} color="#6b7280" style={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.personalDetails}
                  onChange={(e) => handleInputChange('personalDetails', e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>

            {/* NIC Details */}
            <div style={styles.inputGroup}>
              <div style={styles.inputContainer}>
                <FileText size={20} color="#6b7280" style={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Enter your NIC number"
                  value={formData.nicDetails}
                  onChange={(e) => handleInputChange('nicDetails', e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>

            {/* Phone Number */}
            <div style={styles.inputGroup}>
              <div style={styles.inputContainer}>
                <Phone size={20} color="#6b7280" style={styles.inputIcon} />
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>

            {/* Appointment Date */}
            <div style={styles.inputGroup}>
              <div style={styles.inputContainer}>
                <Calendar size={20} color="#6b7280" style={styles.inputIcon} />
                <input
                  type="date"
                  placeholder="Select appointment date"
                  value={formData.appointmentDate}
                  onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>

            {/* Address */}
            <div style={styles.inputGroup}>
              <div style={styles.inputContainer}>
                <MapPin size={20} color="#6b7280" style={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>

            {/* Emergency Contact 1 */}
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder="Enter emergency contact 1"
                value={formData.emergencyContact1}
                onChange={(e) => handleInputChange('emergencyContact1', e.target.value)}
                style={styles.inputPlain}
              />
            </div>

            {/* Emergency Contact 2 */}
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder="Enter emergency contact 2"
                value={formData.emergencyContact2}
                onChange={(e) => handleInputChange('emergencyContact2', e.target.value)}
                style={styles.inputPlain}
              />
            </div>

            {/* Email */}
            <div style={styles.inputGroup}>
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={styles.inputPlain}
              />
            </div>

            {/* Bank Details */}
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder="Enter your bank details"
                value={formData.bankDetails}
                onChange={(e) => handleInputChange('bankDetails', e.target.value)}
                style={styles.inputPlain}
              />
            </div>

            {/* Blood Group */}
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder="Enter your blood group"
                value={formData.bloodGroup}
                onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                style={styles.inputPlain}
              />
            </div>
          </div>

          {/* Plan Information */}
          <div style={styles.planInfo}>
            <span style={styles.planText}>Your subscription plan: </span>
            <div style={styles.planBadge}>
              <span style={styles.planBadgeText}>Ultimate 2.0</span>
            </div>
          </div>

          {/* Done Button */}
          <div style={styles.actionSection}>
            <button
              onClick={handleDone}
              style={styles.doneButton}
            >
              Continue
            </button>
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
    borderBottom: '1px solid #e5e5e5'
  },
  backArrow: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logoSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '40px'
  },
  logoContainer: {
    marginBottom: '16px'
  },
  logoIcon: {
    width: '80px',
    height: '80px',
    backgroundColor: '#033ea1',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  logoShape: {
    width: '40px',
    height: '50px',
    backgroundColor: '#ffffff',
    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
    position: 'relative'
  },
  logoText: {
    color: '#033ea1',
    fontSize: '24px',
    fontWeight: '700',
    margin: 0
  },
  formContainer: {
    width: '100%',
    maxWidth: '500px',
    marginBottom: '32px'
  },
  inputGroup: {
    marginBottom: '16px'
  },
  inputContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  inputIcon: {
    position: 'absolute',
    left: '16px',
    zIndex: 1,
    flexShrink: 0
  },
  input: {
    width: '100%',
    padding: '16px 16px 16px 52px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
    color: '#6b7280',
    transition: 'border-color 0.2s ease'
  },
  inputPlain: {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
    color: '#6b7280',
    transition: 'border-color 0.2s ease'
  },
  planInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '32px'
  },
  planText: {
    color: '#6b7280',
    fontSize: '16px',
    fontWeight: '500'
  },
  planBadge: {
    backgroundColor: '#033ea1',
    borderRadius: '6px',
    padding: '4px 12px'
  },
  planBadgeText: {
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600'
  },
  actionSection: {
    width: '100%',
    maxWidth: '300px'
  },
  doneButton: {
    backgroundColor: '#033ea1',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    padding: '16px 24px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    boxShadow: '0 4px 12px rgba(3, 62, 161, 0.3)',
    transition: 'all 0.2s ease'
  }
};

export default EditUserProfilePage2;
