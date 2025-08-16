import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Eye, EyeOff, Upload } from 'lucide-react';

const Register = () => {
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
  const [errors, setErrors] = useState({});

  const handleGoBack = () => navigate('/auth-choice');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        nicImage: file
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nicNumber.trim()) {
      newErrors.nicNumber = 'NIC number is required';
    } else if (!/^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(formData.nicNumber)) {
      newErrors.nicNumber = 'Invalid NIC format';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.nicImage) {
      newErrors.nicImage = 'NIC image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Registration data:', formData);
      // Navigate to profile editing flow to complete registration
      navigate('/citizen/profile/edit/page2');
    }
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

          <h2 style={styles.title}>Create Account - Step 1 of 4</h2>
          <p style={styles.subtitle}>
            Start by providing your NIC and creating your login credentials. 
            You'll complete your profile details in the next steps.
          </p>

          <form onSubmit={handleSubmit}>
            {/* NIC Number */}
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder="Enter your NIC number"
                value={formData.nicNumber}
                onChange={(e) => handleInputChange('nicNumber', e.target.value)}
                style={{
                  ...styles.input,
                  borderColor: errors.nicNumber ? '#ef4444' : '#d1d5db'
                }}
              />
              {errors.nicNumber && <span style={styles.errorText}>{errors.nicNumber}</span>}
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
                  style={{
                    ...styles.inputWithIcon,
                    borderColor: errors.email ? '#ef4444' : '#d1d5db'
                  }}
                />
              </div>
              {errors.email && <span style={styles.errorText}>{errors.email}</span>}
            </div>

            {/* Password */}
            <div style={styles.inputGroup}>
              <div style={styles.inputContainer}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  style={{
                    ...styles.passwordInput,
                    borderColor: errors.password ? '#ef4444' : '#d1d5db'
                  }}
                />
                <div
                  style={styles.eyeIcon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} color="#6b7280" /> : <Eye size={20} color="#6b7280" />}
                </div>
              </div>
              {errors.password && <span style={styles.errorText}>{errors.password}</span>}
            </div>

            {/* Confirm Password */}
            <div style={styles.inputGroup}>
              <div style={styles.inputContainer}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  style={{
                    ...styles.passwordInput,
                    borderColor: errors.confirmPassword ? '#ef4444' : '#d1d5db'
                  }}
                />
                <div
                  style={styles.eyeIcon}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} color="#6b7280" /> : <Eye size={20} color="#6b7280" />}
                </div>
              </div>
              {errors.confirmPassword && <span style={styles.errorText}>{errors.confirmPassword}</span>}
            </div>

            {/* NIC Image Upload */}
            <div style={styles.inputGroup}>
              <div style={styles.uploadContainer}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={styles.fileInput}
                  id="nicImageUpload"
                />
                <label htmlFor="nicImageUpload" style={styles.uploadLabel}>
                  <Upload size={20} color="#6b7280" />
                  <span style={styles.uploadText}>
                    {formData.nicImage ? formData.nicImage.name : 'Upload NIC Image'}
                  </span>
                </label>
              </div>
              {errors.nicImage && <span style={styles.errorText}>{errors.nicImage}</span>}
            </div>

            {/* Submit Button */}
            <button type="submit" style={styles.submitButton}>
              Continue to Next Step
            </button>
          </form>

          {/* Login Link */}
          <div style={styles.loginLink}>
            <span>Already have an account? </span>
            <button
              type="button"
              onClick={() => navigate('/login')}
              style={styles.linkButton}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    margin: 0,
    padding: 0,
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    padding: '20px',
    borderBottom: '1px solid #e5e7eb'
  },
  backArrow: {
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#f3f4f6'
    }
  },
  progressWrapper: {
    padding: '0 20px 20px'
  },
  progressTrack: {
    width: '100%',
    height: '4px',
    backgroundColor: '#e5e7eb',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  progressFill: {
    width: '33%',
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: '2px'
  },
  content: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column'
  },
  logoSection: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  logoImage: {
    width: '80px',
    height: '80px',
    objectFit: 'contain'
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '10px',
    margin: '0 0 10px 0'
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '30px',
    lineHeight: '1.5'
  },
  inputGroup: {
    marginBottom: '20px'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box'
  },
  inputContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  inputWithIcon: {
    width: '100%',
    padding: '12px 16px 12px 48px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box'
  },
  passwordInput: {
    width: '100%',
    padding: '12px 48px 12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box'
  },
  inputIcon: {
    position: 'absolute',
    left: '16px',
    zIndex: 1
  },
  eyeIcon: {
    position: 'absolute',
    right: '16px',
    cursor: 'pointer',
    zIndex: 1
  },
  uploadContainer: {
    width: '100%'
  },
  fileInput: {
    display: 'none'
  },
  uploadLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    backgroundColor: '#f9fafb',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box'
  },
  uploadText: {
    color: '#6b7280',
    fontSize: '16px'
  },
  errorText: {
    color: '#ef4444',
    fontSize: '14px',
    marginTop: '4px',
    display: 'block'
  },
  submitButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '20px'
  },
  loginLink: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
    color: '#6b7280'
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#3b82f6',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '14px'
  }
};

export default Register;