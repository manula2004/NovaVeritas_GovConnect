import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Eye, EyeOff, Upload } from 'lucide-react';

const EditUserProfilePage1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nicNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    nicImage: null
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleGoBack = () => navigate('/citizen/dashboard');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (e) => {
    setFormData(prev => ({
      ...prev,
      nicImage: e.target.files[0]
    }));
  };

  const handleSendOTP = () => {
    console.log('Sending OTP to:', formData.email);
  };

  const handleConfirm = () => {
    console.log('Form submitted:', formData);
    navigate('/citizen/profile/edit/page2');
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.backArrow} onClick={handleGoBack}>
            <ArrowLeft size={24} color="#000000" />
          </div>
        </div>

        {/* Progress Bar */}
        <div style={styles.progressWrapper}>
          <div style={styles.progressTrack}>
            <div style={styles.progressFill}></div>
          </div>
        </div>

        <div style={styles.content}>
          {/* Logo */}
          <div style={styles.logoSection}>
            <img
              src="/src/assets/gc-logo.png"
              alt="GovConnect Logo"
              style={styles.logoImage}
            />
          </div>

          {/* NIC Number */}
          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Enter your NIC number"
              value={formData.nicNumber}
              onChange={(e) => handleInputChange('nicNumber', e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Email */}
          <div style={styles.inputGroup}>
            <div style={styles.inputContainer}>
              <Mail size={20} color="#6b7280" style={styles.inputIcon} />
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={{ ...styles.input, paddingLeft: '48px' }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <div style={styles.inputContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                style={{ ...styles.input, paddingRight: '48px' }}
              />
              <div
                style={styles.iconRight}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div style={styles.inputGroup}>
            <div style={styles.inputContainer}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                style={{ ...styles.input, paddingRight: '48px' }}
              />
              <div
                style={styles.iconRight}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </div>
            </div>
          </div>

          {/* Upload NIC */}
          <div style={styles.uploadSection}>
            <span style={styles.uploadLabel}>Enter Picture of NIC</span>
            <label style={styles.uploadButton}>
              <Upload size={18} />
              <span style={{ marginLeft: '6px' }}>Upload</span>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
            </label>
          </div>

          {/* Buttons */}
          <button style={styles.otpButton} onClick={handleSendOTP}>
            Send OTP
          </button>
          <button style={styles.confirmButton} onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: 'Montserrat, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    padding: '20px'
  },
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px'
  },
  backArrow: {
    cursor: 'pointer'
  },
  progressWrapper: {
    marginBottom: '20px'
  },
  progressTrack: {
    backgroundColor: '#e5e7eb',
    height: '6px',
    borderRadius: '3px'
  },
  progressFill: {
    backgroundColor: '#033ea1',
    width: '25%',
    height: '100%',
    borderRadius: '3px'
  },
  content: {
    display: 'flex',
    flexDirection: 'column'
  },
  logoSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  logoImage: {
    width: '100px',
    height: 'auto'
  },
  inputGroup: {
    marginBottom: '16px'
  },
  input: {
    width: '100%',
    padding: '14px',
    borderRadius: '10px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  inputContainer: {
    position: 'relative'
  },
  inputIcon: {
    position: 'absolute',
    top: '50%',
    left: '14px',
    transform: 'translateY(-50%)'
  },
  iconRight: {
    position: 'absolute',
    top: '50%',
    right: '14px',
    transform: 'translateY(-50%)',
    cursor: 'pointer'
  },
  uploadSection: {
    marginBottom: '16px'
  },
  uploadLabel: {
    fontSize: '14px',
    color: '#374151',
    display: 'block',
    marginBottom: '6px'
  },
  uploadButton: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    padding: '8px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  otpButton: {
    backgroundColor: '#033ea1',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '600',
    marginBottom: '10px',
    cursor: 'pointer'
  },
  confirmButton: {
    backgroundColor: '#033ea1',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '600',
    cursor: 'pointer'
  }
};

export default EditUserProfilePage1;