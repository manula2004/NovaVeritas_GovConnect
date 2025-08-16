import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Phone, Mail } from 'lucide-react';

const PassportApplicationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    serviceType: '',
    travelDocuments: [],
    presentTravelDocNo: '',
    nmrpNo: '',
    nicNumber: '',
    surname: '',
    otherNames: '',
    permanentAddress: '',
    district: '',
    dateOfBirth: '',
    birthCertificateNo: '',
    birthCertificateDistrict: '',
    placeOfBirth: '',
    sex: '',
    profession: '',
    dualCitizenship: '',
    dualCitizenshipNo: '',
    foreignNationality: '',
    foreignPassportNo: '',
    mobilePhone: '',
    email: '',
    signatureFile: '',
    fatherGuardianNic: '',
    fatherPresentTravelDoc: '',
    motherGuardianNic: '',
    motherPresentTravelDoc: ''
  });

  const handleGoBack = () => {
    navigate('/citizen/passport');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field, value, isMultiple = false) => {
    if (isMultiple) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].includes(value)
          ? prev[field].filter(item => item !== value)
          : [...prev[field], value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleUploadSignature = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,.pdf';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log('Selected file:', file.name);
        setFormData(prev => ({
          ...prev,
          signatureFile: file.name
        }));
      }
    };
    input.click();
  };

  const handleDone = () => {
    console.log('Form submitted:', formData);
    // Navigate to citizen dashboard after successful submission
    navigate('/citizen/dashboard');
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
            <div style={styles.passportDoc}>
              <div style={styles.passportCover}></div>
              <div style={styles.passportPages}>
                <div style={styles.passportPage}></div>
                <div style={styles.passportPage}></div>
              </div>
            </div>
            <div style={styles.certificate}>
              <div style={styles.certHeader}></div>
              <div style={styles.certContent}>
                <div style={styles.certLine}></div>
                <div style={styles.certLine}></div>
                <div style={styles.certLine}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div style={styles.formContainer}>
        {/* Type of Service */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Type of service:</h3>
          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.serviceType === 'oneDay'}
                onChange={() => handleCheckboxChange('serviceType', 'oneDay')}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>One Day</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.serviceType === 'standard'}
                onChange={() => handleCheckboxChange('serviceType', 'standard')}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>Standard</span>
            </label>
          </div>
        </div>

        {/* Type of Travel Document */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Type of travel document:</h3>
          <div style={styles.checkboxColumn}>
            {['All countries', 'Middle east countries', 'Emergency certificate', 'Identity certificate'].map((option) => (
              <label key={option} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.travelDocuments.includes(option)}
                  onChange={() => handleCheckboxChange('travelDocuments', option, true)}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Present Travel Document */}
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Present travel document No. (If any)"
            value={formData.presentTravelDocNo}
            onChange={(e) => handleInputChange('presentTravelDocNo', e.target.value)}
            style={styles.input}
          />
        </div>

        {/* NMRP No */}
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="NMRP No. (If any)"
            value={formData.nmrpNo}
            onChange={(e) => handleInputChange('nmrpNo', e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Personal Information Fields */}
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
            type="text"
            placeholder="Surname"
            value={formData.surname}
            onChange={(e) => handleInputChange('surname', e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Other Names"
            value={formData.otherNames}
            onChange={(e) => handleInputChange('otherNames', e.target.value)}
            style={styles.input}
          />
        </div>

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
            placeholder="District"
            value={formData.district}
            onChange={(e) => handleInputChange('district', e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <div style={styles.inputWithIcon}>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              style={{...styles.input, paddingRight: '48px'}}
              placeholder=""
            />
            <Calendar size={16} color="#3b82f6" style={styles.inputIcon} />
          </div>
        </div>

        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Birth Certificate No."
            value={formData.birthCertificateNo}
            onChange={(e) => handleInputChange('birthCertificateNo', e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Birth Certificate District"
            value={formData.birthCertificateDistrict}
            onChange={(e) => handleInputChange('birthCertificateDistrict', e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Place of Birth"
            value={formData.placeOfBirth}
            onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Sex Selection */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Sex:</h3>
          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.sex === 'female'}
                onChange={() => handleCheckboxChange('sex', 'female')}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>Female</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.sex === 'male'}
                onChange={() => handleCheckboxChange('sex', 'male')}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>Male</span>
            </label>
          </div>
        </div>

        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Profession/Occupation/Job"
            value={formData.profession}
            onChange={(e) => handleInputChange('profession', e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Dual Citizenship */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Have you obtained Dual Citizenship in Sri Lanka?</h3>
          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.dualCitizenship === 'yes'}
                onChange={() => handleCheckboxChange('dualCitizenship', 'yes')}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>Yes</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.dualCitizenship === 'no'}
                onChange={() => handleCheckboxChange('dualCitizenship', 'no')}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>No</span>
            </label>
          </div>
        </div>

        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="If Yes, Dual Citizenship No."
            value={formData.dualCitizenshipNo}
            onChange={(e) => handleInputChange('dualCitizenshipNo', e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="If Yes, Foreign Nationality"
            value={formData.foreignNationality}
            onChange={(e) => handleInputChange('foreignNationality', e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="If Yes, Foreign Passport No."
            value={formData.foreignPassportNo}
            onChange={(e) => handleInputChange('foreignPassportNo', e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <div style={styles.inputWithIcon}>
            <input
              type="tel"
              placeholder="Mobile/Phone No."
              value={formData.mobilePhone}
              onChange={(e) => handleInputChange('mobilePhone', e.target.value)}
              style={{...styles.input, paddingRight: '48px'}}
            />
            <Phone size={16} color="#3b82f6" style={styles.inputIcon} />
          </div>
        </div>

        <div style={styles.inputGroup}>
          <div style={styles.inputWithIcon}>
            <input
              type="email"
              placeholder="E-mail Address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              style={{...styles.input, paddingRight: '48px'}}
            />
            <Mail size={16} color="#3b82f6" style={styles.inputIcon} />
          </div>
        </div>

        {/* Child Information */}
        <div style={styles.childSection}>
          <p style={styles.childSectionText}>
            If this application is for a child below the age of 16 years, following information must also be provided.
          </p>
          
          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Father/Guardian NIC No. / Present Travel Document No."
              value={formData.fatherGuardianNic}
              onChange={(e) => handleInputChange('fatherGuardianNic', e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Mother/Guardian NIC No. / Present Travel Document No."
              value={formData.motherGuardianNic}
              onChange={(e) => handleInputChange('motherGuardianNic', e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        {/* Signature Upload */}
        <div style={styles.uploadSection}>
          <span style={styles.uploadLabel}>
            Upload your <span style={styles.signatureLink}>Signature</span>
            {formData.signatureFile && (
              <span style={styles.uploadedFile}> - {formData.signatureFile}</span>
            )}
          </span>
          <button 
            style={styles.uploadButton}
            onClick={handleUploadSignature}
          >
            Upload ↓
          </button>
        </div>

        {/* Done Button */}
        <div style={styles.submitSection}>
          <button
            onClick={handleDone}
            style={styles.doneButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#1e40af';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#2563eb';
            }}
          >
            Done
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
  passportDoc: {
    position: 'absolute',
    left: '15px',
    top: '25px',
    width: '40px',
    height: '50px'
  },
  passportCover: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1e40af',
    borderRadius: '3px',
    border: '1px solid #3b82f6'
  },
  passportPages: {
    position: 'absolute',
    top: '5px',
    left: '5px',
    right: '5px'
  },
  passportPage: {
    height: '2px',
    backgroundColor: '#ffffff',
    marginBottom: '3px',
    opacity: 0.8
  },
  certificate: {
    position: 'absolute',
    right: '15px',
    top: '35px',
    width: '45px',
    height: '40px',
    backgroundColor: '#ffffff',
    border: '2px solid #3b82f6',
    borderRadius: '3px',
    padding: '3px'
  },
  certHeader: {
    width: '100%',
    height: '8px',
    backgroundColor: '#f3f4f6',
    borderRadius: '1px',
    marginBottom: '3px'
  },
  certContent: {
    marginTop: '3px'
  },
  certLine: {
    height: '2px',
    backgroundColor: '#e5e7eb',
    marginBottom: '2px'
  },
  formContainer: {
    padding: '0 20px',
    paddingBottom: '40px'
  },
  section: {
    marginBottom: '20px'
  },
  sectionTitle: {
    color: '#374151',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '12px',
    margin: '0 0 12px 0'
  },
  checkboxGroup: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
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
  inputGroup: {
    marginBottom: '16px'
  },
  inputWithIcon: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
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
  inputIcon: {
    position: 'absolute',
    right: '16px',
    flexShrink: 0
  },
  childSection: {
    marginTop: '24px',
    marginBottom: '24px'
  },
  childSectionText: {
    color: '#374151',
    fontSize: '14px',
    lineHeight: '1.4',
    marginBottom: '16px',
    margin: '0 0 16px 0'
  },
  uploadSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    padding: '8px 0'
  },
  uploadLabel: {
    color: '#374151',
    fontSize: '14px',
    flex: 1,
    marginRight: '16px'
  },
  signatureLink: {
    color: '#3b82f6',
    textDecoration: 'none'
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
  doneButton: {
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

export default PassportApplicationForm;