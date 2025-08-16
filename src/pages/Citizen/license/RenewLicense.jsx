import React, { useState } from 'react';
import { ArrowLeft, Upload, User, FileText, Phone, Mail, Calendar, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LicenseRenewalForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    nicNumber: '',
    contactNumber: '',
    emailAddress: '',
    licenseNumber: '',
    licenseType: '',
    issueDate: '',
    expiryDate: '',
    currentAddress: '',
    updatedContactNumber: '',
    medicalRefNumber: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    passport: null,
    eyeTest: null,
    previousLicense: null
  });

  const handleGoBack = () => {
    navigate('/citizen/license'); // Go back to license services
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (fileType) => {
    console.log(`Uploading ${fileType} file...`);
    // Simulate file upload
    setUploadedFiles(prev => ({
      ...prev,
      [fileType]: `${fileType}_uploaded.pdf`
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    console.log('Uploaded files:', uploadedFiles);
    // Navigate back to license menu after successful submission
    navigate('/citizen/license');
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.backArrow} onClick={handleGoBack}>
          <ArrowLeft size={24} color="#1e40af" />
        </div>
      </div>

      {/* Illustration */}
      <div style={styles.illustrationContainer}>
        <div style={styles.illustration}>
          <div style={styles.personContainer}>
            <div style={styles.person}>
              <div style={styles.personHead}></div>
              <div style={styles.personBody}></div>
            </div>
            <div style={styles.document}>
              <div style={styles.docHeader}>
                <div style={styles.docIcon}></div>
                <div style={styles.docLines}>
                  <div style={styles.docLine}></div>
                  <div style={styles.docLine}></div>
                </div>
              </div>
              <div style={styles.docContent}>
                <div style={styles.docContentLine}></div>
                <div style={styles.docContentLine}></div>
                <div style={styles.docContentLine}></div>
              </div>
            </div>
            <div style={styles.idCard}>
              <div style={styles.idCardTop}></div>
              <div style={styles.idCardContent}>
                <div style={styles.idCardLine}></div>
                <div style={styles.idCardLine}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div style={styles.formContainer}>
        {/* Personal Information Section */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Personal Information</h3>
          
          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="NIC Number"
              value={formData.nicNumber}
              onChange={(e) => handleInputChange('nicNumber', e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="tel"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={(e) => handleInputChange('contactNumber', e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email Address"
              value={formData.emailAddress}
              onChange={(e) => handleInputChange('emailAddress', e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        {/* Current License Detail Section */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Current License Detail</h3>
          
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
              type="text"
              placeholder="License Type/Category"
              value={formData.licenseType}
              onChange={(e) => handleInputChange('licenseType', e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="date"
              placeholder="Issue Date"
              value={formData.issueDate}
              onChange={(e) => handleInputChange('issueDate', e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="date"
              placeholder="Expiry Date"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        {/* Update Details Section */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Update Details(If changed)</h3>
          
          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Current Address"
              value={formData.currentAddress}
              onChange={(e) => handleInputChange('currentAddress', e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="tel"
              placeholder="Contact Number"
              value={formData.updatedContactNumber}
              onChange={(e) => handleInputChange('updatedContactNumber', e.target.value)}
              style={styles.highlightInput}
            />
          </div>
        </div>

        {/* Supporting Document Upload Section */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Supporting Document Upload</h3>
          
          <div style={styles.uploadSection}>
            <div style={styles.uploadItem}>
              <span style={styles.uploadLabel}>Passport size photograph</span>
              <button 
                style={styles.uploadButton}
                onClick={() => handleFileUpload('passport')}
              >
                Upload ↓
              </button>
            </div>

            <div style={styles.uploadItem}>
              <span style={styles.uploadLabel}>Eye test certificate</span>
              <button 
                style={styles.uploadButton}
                onClick={() => handleFileUpload('eyeTest')}
              >
                Upload ↓
              </button>
            </div>

            <div style={styles.uploadItem}>
              <span style={styles.uploadLabel}>Upload Your Previous License Photo</span>
              <button 
                style={styles.uploadButton}
                onClick={() => handleFileUpload('previousLicense')}
              >
                Upload ↓
              </button>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <span style={styles.uploadLabel}>Medical Test Reference Number</span>
            <input
              type="text"
              placeholder="Enter Your Ref.No"
              value={formData.medicalRefNumber}
              onChange={(e) => handleInputChange('medicalRefNumber', e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div style={styles.submitSection}>
          <button
            onClick={handleSubmit}
            style={styles.submitButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#1e40af';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#2563eb';
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    padding: '16px',
    display: 'flex',
    alignItems: 'center'
  },
  backArrow: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  illustrationContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 0',
    marginBottom: '20px'
  },
  illustration: {
    width: '200px',
    height: '150px',
    position: 'relative'
  },
  personContainer: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  person: {
    position: 'absolute',
    left: '50%',
    top: '20px',
    transform: 'translateX(-50%)'
  },
  personHead: {
    width: '30px',
    height: '30px',
    backgroundColor: '#fbbf24',
    borderRadius: '50%',
    marginBottom: '5px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  personBody: {
    width: '40px',
    height: '50px',
    backgroundColor: '#3b82f6',
    borderRadius: '8px 8px 0 0'
  },
  document: {
    position: 'absolute',
    left: '20px',
    top: '30px',
    width: '50px',
    height: '65px',
    backgroundColor: '#ffffff',
    border: '2px solid #3b82f6',
    borderRadius: '4px',
    padding: '4px'
  },
  docHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '4px'
  },
  docIcon: {
    width: '8px',
    height: '8px',
    backgroundColor: '#3b82f6',
    borderRadius: '2px',
    marginRight: '4px'
  },
  docLines: {
    flex: 1
  },
  docLine: {
    height: '2px',
    backgroundColor: '#e5e7eb',
    marginBottom: '2px'
  },
  docContent: {
    marginTop: '4px'
  },
  docContentLine: {
    height: '2px',
    backgroundColor: '#e5e7eb',
    marginBottom: '3px'
  },
  idCard: {
    position: 'absolute',
    right: '20px',
    top: '40px',
    width: '35px',
    height: '45px',
    backgroundColor: '#ffffff',
    border: '2px solid #3b82f6',
    borderRadius: '4px',
    padding: '3px'
  },
  idCardTop: {
    width: '100%',
    height: '15px',
    backgroundColor: '#f3f4f6',
    borderRadius: '2px',
    marginBottom: '3px'
  },
  idCardContent: {
    marginTop: '3px'
  },
  idCardLine: {
    height: '2px',
    backgroundColor: '#e5e7eb',
    marginBottom: '2px'
  },
  formContainer: {
    padding: '0 20px',
    paddingBottom: '40px'
  },
  section: {
    marginBottom: '32px'
  },
  sectionTitle: {
    color: '#374151',
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '16px',
    margin: '0 0 16px 0'
  },
  inputGroup: {
    marginBottom: '16px'
  },
  input: {
    width: '100%',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#f3f4f6',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    color: '#6b7280',
    transition: 'border-color 0.2s ease'
  },
  highlightInput: {
    width: '100%',
    padding: '16px',
    borderRadius: '8px',
    border: '2px solid #8b5cf6',
    backgroundColor: '#f3f4f6',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    color: '#6b7280',
    transition: 'border-color 0.2s ease'
  },
  uploadSection: {
    marginBottom: '20px'
  },
  uploadItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    padding: '8px 0'
  },
  uploadLabel: {
    color: '#374151',
    fontSize: '14px',
    flex: 1,
    marginRight: '16px'
  },
  uploadButton: {
    backgroundColor: 'transparent',
    color: '#2563eb',
    border: '1px solid #2563eb',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  submitSection: {
    marginTop: '32px'
  },
  submitButton: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '16px 24px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
    transition: 'all 0.2s ease'
  }
};

export default LicenseRenewalForm;