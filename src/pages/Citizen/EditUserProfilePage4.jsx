import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const EditUserProfilePage4 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    licenseNumber: '',
    dateOfIssue: '',
    dateOfExpiry: '',
    vehicleTypes: {
      'A1': false,
      'A': false,
      'B1': false,
      'B': false,
      'C1': false,
      'C': false,
      'CE': false,
      'D1': false,
      'D': false,
      'DE': false
    }
  });

  const handleGoBack = () => navigate('/citizen/profile/edit/page3');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVehicleTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      vehicleTypes: {
        ...prev.vehicleTypes,
        [type]: !prev.vehicleTypes[type]
      }
    }));
  };

  const handleSkip = () => {
    console.log('Skipping license information...');
    navigate('/citizen/dashboard');
  };

  const handleFinish = () => {
    console.log('Finishing registration with license data:', formData);
    // Here you would typically send the data to your backend
    navigate('/citizen/dashboard');
  };

  const vehicleTypeData = [
    { code: 'A1', name: 'Motorcycle ≤ 125cc' },
    { code: 'A', name: 'Motorcycle > 125cc' },
    { code: 'B1', name: 'Three-Wheeler' },
    { code: 'B', name: 'Car' },
    { code: 'C1', name: 'Light Truck ≤ 7500kg' },
    { code: 'C', name: 'Heavy Truck > 7500kg' },
    { code: 'CE', name: 'Heavy Truck + Trailer' },
    { code: 'D1', name: 'Minibus ≤ 16 seats' },
    { code: 'D', name: 'Bus > 16 seats' },
    { code: 'DE', name: 'Bus + Trailer' }
  ];

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
              If you don't have a driving license, <span style={styles.skipLink} onClick={handleSkip}>skip</span> to complete registration
            </p>
          </div>

          {/* Form Fields */}
          <div style={styles.formContainer}>
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder="License Number"
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                style={styles.input}
              />
            </div>

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
          </div>

          {/* Vehicle Types Section */}
          <div style={styles.vehicleTypesSection}>
            <h3 style={styles.vehicleTypesTitle}>Vehicle Types Permitted</h3>
            <div style={styles.vehicleTypesGrid}>
              {vehicleTypeData.map((vehicle) => (
                <div key={vehicle.code} style={styles.vehicleTypeItem}>
                  <div
                    style={styles.vehicleTypeCard}
                    onClick={() => handleVehicleTypeChange(vehicle.code)}
                  >
                    <div style={styles.vehicleTypeHeader}>
                      <span style={styles.vehicleTypeCode}>{vehicle.code}</span>
                      {formData.vehicleTypes[vehicle.code] && (
                        <CheckCircle size={20} color="#10b981" />
                      )}
                    </div>
                    <p style={styles.vehicleTypeName}>{vehicle.name}</p>
                  </div>
                </div>
              ))}
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
              onClick={handleFinish}
              style={styles.finishButton}
            >
              Finish Registration
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
    height: '4px',
    borderRadius: '2px',
    backgroundColor: '#033ea1',
    width: '100%'
  },
  progressFilled: {
    height: '100%',
    backgroundColor: '#033ea1',
    borderRadius: '2px'
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
  vehicleTypesSection: {
    width: '100%',
    maxWidth: '700px',
    marginBottom: '40px'
  },
  vehicleTypesTitle: {
    color: '#374151',
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '24px',
    textAlign: 'center'
  },
  vehicleTypesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '16px'
  },
  vehicleTypeItem: {
    display: 'flex'
  },
  vehicleTypeCard: {
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    width: '100%',
    textAlign: 'center',
    '&:hover': {
      backgroundColor: '#f3f4f6',
      borderColor: '#033ea1'
    }
  },
  vehicleTypeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  vehicleTypeCode: {
    backgroundColor: '#033ea1',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '700',
    padding: '4px 8px',
    borderRadius: '6px'
  },
  vehicleTypeName: {
    color: '#6b7280',
    fontSize: '12px',
    margin: 0,
    lineHeight: '1.4'
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
  finishButton: {
    flex: 1,
    backgroundColor: '#10b981',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    padding: '16px 24px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
    transition: 'all 0.2s ease'
  }
};

export default EditUserProfilePage4;
