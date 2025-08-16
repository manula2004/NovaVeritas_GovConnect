import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const EditUserProfilePage3 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    passportNumber: '',
    dateOfIssue: '',
    dateOfExpiry: '',
    placeOfIssue: ''
  });

  const handleGoBack = () => navigate('/citizen/profile/edit/page2');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkip = () => {
    console.log('Skipping passport information...');
    navigate('/citizen/profile/edit/page4');
  };

  const handleContinue = () => {
    console.log('Continuing with passport data:', formData);
    navigate('/citizen/profile/edit/page4');
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
          {/* Progress Bar */}
          <div style={styles.progressSection}>
            <div style={styles.progressBar}>
              <div style={styles.progressFilled}></div>
              <div style={styles.progressEmpty}></div>
            </div>
          </div>

          {/* Logo Section */}
          <div style={styles.logoSection}>
            <div style={styles.logoContainer}>
              <div style={styles.logoIcon}>
                <div style={styles.logoShape}></div>
              </div>
            </div>
            <h2 style={styles.logoText}>GovConnect</h2>
          </div>

          {/* Instruction Text */}
          <div style={styles.instructionSection}>
            <p style={styles.instructionText}>
              If you don't have a passport, <span style={styles.skipLink} onClick={handleSkip}>skip</span> to the next step
            </p>
          </div>

          {/* Input Box Label */}
          <div style={styles.inputLabel}>
            <div style={styles.labelContainer}>
              <span style={styles.labelText}>Input Box/Desktop/Large</span>
            </div>
          </div>

          {/* Passport Number Input with Pattern */}
          <div style={styles.passportInputSection}>
            <div style={styles.passportInputContainer}>
              <div style={styles.passportPattern}>
                <div style={styles.patternLines}>
                  {[...Array(8)].map((_, i) => (
                    <div key={i} style={styles.patternLine}></div>
                  ))}
                </div>
                <div style={styles.passportNumberDisplay}>
                  <span style={styles.passportNumber}>
                    {formData.passportNumber || 'Passport Number'}
                  </span>
                  <div style={styles.numberBadge}>
                    <span style={styles.numberText}>171</span>
                  </div>
                </div>
              </div>
              <input
                type="text"
                placeholder="Enter passport number"
                value={formData.passportNumber}
                onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                style={styles.hiddenInput}
              />
            </div>
          </div>

          {/* Form Fields */}
          <div style={styles.formContainer}>
            <div style={styles.inputGroup}>
              <input
                type="date"
                placeholder="Date of Issue"
                value={formData.dateOfIssue}
                onChange={(e) => handleInputChange('dateOfIssue', e.target.value)}
                style={styles.input}
                onFocus={(e) => e.target.type = 'date'}
                onBlur={(e) => !e.target.value && (e.target.type = 'text')}
              />
              {!formData.dateOfIssue && (
                <span style={styles.placeholder}>Date of Issue</span>
              )}
            </div>

            <div style={styles.inputGroup}>
              <input
                type="date"
                placeholder="Date of Expiry"
                value={formData.dateOfExpiry}
                onChange={(e) => handleInputChange('dateOfExpiry', e.target.value)}
                style={styles.input}
                onFocus={(e) => e.target.type = 'date'}
                onBlur={(e) => !e.target.value && (e.target.type = 'text')}
              />
              {!formData.dateOfExpiry && (
                <span style={styles.placeholder}>Date of Expiry</span>
              )}
            </div>

            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder="Place of Issue"
                value={formData.placeOfIssue}
                onChange={(e) => handleInputChange('placeOfIssue', e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={styles.actionButtons}>
            <button
              onClick={handleSkip}
              style={styles.skipButton}
            >
              Skip
            </button>

            <button
              onClick={handleContinue}
              style={styles.continueButton}
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
  progressSection: {
    width: '100%',
    maxWidth: '400px',
    marginBottom: '40px'
  },
  progressBar: {
    display: 'flex',
    height: '4px',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  progressFilled: {
    flex: 2,
    backgroundColor: '#033ea1'
  },
  progressEmpty: {
    flex: 1,
    backgroundColor: '#e5e7eb'
  },
  logoSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '32px'
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
  instructionSection: {
    marginBottom: '24px',
    textAlign: 'center'
  },
  instructionText: {
    color: '#6b7280',
    fontSize: '16px',
    margin: 0
  },
  skipLink: {
    color: '#47a7ff',
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  inputLabel: {
    width: '100%',
    maxWidth: '500px',
    marginBottom: '16px'
  },
  labelContainer: {
    backgroundColor: '#8b5cf6',
    padding: '8px 16px',
    borderRadius: '8px 8px 0 0',
    display: 'inline-block'
  },
  labelText: {
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600'
  },
  passportInputSection: {
    width: '100%',
    maxWidth: '500px',
    marginBottom: '32px'
  },
  passportInputContainer: {
    position: 'relative'
  },
  passportPattern: {
    backgroundColor: '#f0f8ff',
    border: '2px solid #8b5cf6',
    borderRadius: '0 12px 12px 12px',
    padding: '20px',
    minHeight: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden'
  },
  patternLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: '10px'
  },
  patternLine: {
    height: '2px',
    backgroundColor: '#e0e7ff',
    borderRadius: '1px',
    transform: 'skew(-15deg)'
  },
  passportNumberDisplay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 1
  },
  passportNumber: {
    color: '#6b7280',
    fontSize: '16px',
    fontWeight: '500'
  },
  numberBadge: {
    backgroundColor: '#47a7ff',
    borderRadius: '6px',
    padding: '4px 12px'
  },
  numberText: {
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '700'
  },
  hiddenInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'text'
  },
  formContainer: {
    width: '100%',
    maxWidth: '500px',
    marginBottom: '40px'
  },
  inputGroup: {
    position: 'relative',
    marginBottom: '16px'
  },
  input: {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
    color: '#374151',
    transition: 'border-color 0.2s ease'
  },
  placeholder: {
    position: 'absolute',
    top: '50%',
    left: '16px',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
    fontSize: '16px',
    pointerEvents: 'none'
  },
  actionButtons: {
    display: 'flex',
    gap: '20px',
    width: '100%',
    maxWidth: '400px'
  },
  skipButton: {
    flex: 1,
    backgroundColor: '#f9fafb',
    color: '#6b7280',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '16px 24px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#033ea1',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    padding: '16px 24px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(3, 62, 161, 0.3)',
    transition: 'all 0.2s ease'
  }
};

export default EditUserProfilePage3;
