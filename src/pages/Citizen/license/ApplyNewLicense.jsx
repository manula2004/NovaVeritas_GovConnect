import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const DrivingLicenseForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nameWithInitials: '',
    fullNameWithoutInitials: '',
    birthDate: '',
    gender: '',
    nicNumber: '',
    contactNumber: '',
    permanentAddress: '',
    postalCode: '',
    districtProvince: '',
    licenseTypes: [],
    preferredTestLocation: '',
    licenseCategoryCode: '',
    medicalRefNumber: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    nicCopy: null,
    passportPhoto: null,
    eyeTest: null,
    proofOfAddress: null
  });

  const licenseCategories = [
    { code: 'A1', description: 'Motorcycle ≤ 100cc' },
    { code: 'A', description: 'Motorcycle > 100cc' },
    { code: 'B1', description: 'Motor Tricycle / Tuktak' },
    { code: 'B', description: 'Car, Van, Jeep ≤ 3500kg' },
    { code: 'C', description: 'Heavy Motor Lorry ≤ 16000kg' },
    { code: 'D', description: 'Bus / Motor Coach' },
    { code: 'E', description: 'Special Purpose Vehicle' },
    { code: 'G1', description: 'Hand Tractor' }
  ];

  const handleGoBack = () => {
    navigate('/citizen/license');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleFileUpload = (fileType) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,.pdf';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setUploadedFiles(prev => ({
          ...prev,
          [fileType]: file.name
        }));
      }
    };
    input.click();
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
              placeholder="Enter your name with initials"
              value={formData.nameWithInitials}
              onChange={(e) => handleInputChange('nameWithInitials', e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Enter your full name without initials"
              value={formData.fullNameWithoutInitials}
              onChange={(e) => handleInputChange('fullNameWithoutInitials', e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Enter your birth date (DD/MM/YYYY)"
              value={formData.birthDate}
              onChange={(e) => handleInputChange('birthDate', e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Gender"
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
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
        </div>

        {/* Address Details Section */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Address Details</h3>
          
          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Permanent Address"
              value={formData.permanentAddress}
              onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="District/Province"
              value={formData.districtProvince}
              onChange={(e) => handleInputChange('districtProvince', e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        {/* Type Of License Section */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Type Of License</h3>
          <div style={styles.checkboxColumn}>
            {['Light Vehicle', 'Heavy Vehicle', 'Special Vehicle'].map((option) => (
              <label key={option} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.licenseTypes.includes(option)}
                  onChange={() => handleCheckboxChange('licenseTypes', option)}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Preferred Test Location */}
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Preferred Test Location"
            value={formData.preferredTestLocation}
            onChange={(e) => handleInputChange('preferredTestLocation', e.target.value)}
            style={styles.input}
          />
        </div>

        {/* License Category Code */}
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Enter Your License Category Code"
            value={formData.licenseCategoryCode}
            onChange={(e) => handleInputChange('licenseCategoryCode', e.target.value)}
            style={styles.input}
          />
        </div>

        {/* License Category Table */}
        <div style={styles.section}>
          <p style={styles.tableNote}>
            Please select the license category code from the list below:
          </p>
          <div style={styles.table}>
            <div style={styles.tableHeader}>
              <div style={styles.tableCell}>Code</div>
              <div style={styles.tableCell}>Description</div>
            </div>
            {licenseCategories.map((category) => (
              <div key={category.code} style={styles.tableRow}>
                <div style={styles.tableCell}>{category.code}</div>
                <div style={styles.tableCell}>{category.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Supporting Document Upload Section */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Supporting Document Upload</h3>
          
          <div style={styles.uploadItem}>
            <span style={styles.uploadLabel}>
              NIC copy / Scan
              {uploadedFiles.nicCopy && (
                <span style={styles.uploadedFile}> - {uploadedFiles.nicCopy}</span>
              )}
            </span>
            <button 
              style={styles.uploadButton}
              onClick={() => handleFileUpload('nicCopy')}
            >
              Upload ↓
            </button>
          </div>

          <div style={styles.uploadItem}>
            <span style={styles.uploadLabel}>
              Passport size photograph
              {uploadedFiles.passportPhoto && (
                <span style={styles.uploadedFile}> - {uploadedFiles.passportPhoto}</span>
              )}
            </span>
            <button 
              style={styles.uploadButton}
              onClick={() => handleFileUpload('passportPhoto')}
            >
              Upload ↓
            </button>
          </div>

          <div style={styles.uploadItem}>
            <span style={styles.uploadLabel}>
              Eye test certificate
              {uploadedFiles.eyeTest && (
                <span style={styles.uploadedFile}> - {uploadedFiles.eyeTest}</span>
              )}
            </span>
            <button 
              style={styles.uploadButton}
              onClick={() => handleFileUpload('eyeTest')}
            >
              Upload ↓
            </button>
          </div>

          <div style={styles.uploadItem}>
            <span style={styles.uploadLabel}>
              Proof of address (If different from NIC)
              {uploadedFiles.proofOfAddress && (
                <span style={styles.uploadedFile}> - {uploadedFiles.proofOfAddress}</span>
              )}
            </span>
            <button 
              style={styles.uploadButton}
              onClick={() => handleFileUpload('proofOfAddress')}
            >
              Upload ↓
            </button>
          </div>

          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Medical Test Reference Number"
              value={formData.medicalRefNumber}
              onChange={(e) => handleInputChange('medicalRefNumber', e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Enter Your Ref.No"
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
    height: '120px',
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
    top: '10px',
    transform: 'translateX(-50%)'
  },
  personHead: {
    width: '25px',
    height: '25px',
    backgroundColor: '#fbbf24',
    borderRadius: '50%',
    marginBottom: '3px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  personBody: {
    width: '35px',
    height: '45px',
    backgroundColor: '#3b82f6',
    borderRadius: '6px 6px 0 0'
  },
  document: {
    position: 'absolute',
    left: '15px',
    top: '25px',
    width: '40px',
    height: '50px',
    backgroundColor: '#ffffff',
    border: '2px solid #3b82f6',
    borderRadius: '3px',
    padding: '3px'
  },
  docHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '3px'
  },
  docIcon: {
    width: '6px',
    height: '6px',
    backgroundColor: '#3b82f6',
    borderRadius: '1px',
    marginRight: '3px'
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
    marginTop: '3px'
  },
  docContentLine: {
    height: '2px',
    backgroundColor: '#e5e7eb',
    marginBottom: '2px'
  },
  idCard: {
    position: 'absolute',
    right: '15px',
    top: '35px',
    width: '35px',
    height: '40px',
    backgroundColor: '#ffffff',
    border: '2px solid #3b82f6',
    borderRadius: '3px',
    padding: '3px'
  },
  idCardTop: {
    width: '100%',
    height: '12px',
    backgroundColor: '#f3f4f6',
    borderRadius: '1px',
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
    marginBottom: '24px'
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
  checkboxColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  checkbox: {
    width: '16px',
    height: '16px',
    marginRight: '8px',
    accentColor: '#3b82f6'
  },
  checkboxText: {
    color: '#374151',
    fontSize: '14px'
  },
  tableNote: {
    color: '#374151',
    fontSize: '14px',
    marginBottom: '12px',
    margin: '0 0 12px 0',
    lineHeight: '1.4'
  },
  table: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '20px'
  },
  tableHeader: {
    display: 'flex',
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb'
  },
  tableRow: {
    display: 'flex',
    borderBottom: '1px solid #f3f4f6'
  },
  tableCell: {
    padding: '12px',
    fontSize: '14px',
    color: '#374151',
    flex: 1,
    borderRight: '1px solid #e5e7eb'
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
  uploadedFile: {
    color: '#059669',
    fontSize: '12px',
    fontStyle: 'italic'
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

export default DrivingLicenseForm;