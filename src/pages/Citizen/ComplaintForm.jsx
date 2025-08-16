import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, FileText, Phone, Mail, Calendar, AlertCircle } from 'lucide-react';

const ComplaintForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    nicNumber: '',
    contactNumber: '',
    emailAddress: '',
    serviceType: '',
    complaintCategory: '',
    incidentDate: '',
    description: '',
    priority: 'medium',
    attachments: []
  });

  const handleGoBack = () => {
    navigate('/citizen/dashboard');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const handleSubmit = () => {
    console.log('Complaint submitted:', formData);
    // Navigate back to dashboard after successful submission
    navigate('/citizen/dashboard');
  };

  const serviceTypes = [
    'Passport Services',
    'License Services', 
    'Medical Services',
    'General Government Services',
    'Online Services',
    'Other'
  ];

  const complaintCategories = [
    'Poor Service Quality',
    'Long Waiting Times',
    'Staff Behavior',
    'System/Technical Issues',
    'Process Delays',
    'Incorrect Information',
    'Billing/Payment Issues',
    'Other'
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.backArrow} onClick={handleGoBack}>
          <ArrowLeft size={24} color="#033ea1" />
        </div>
        <h1 style={styles.title}>Service Complaint</h1>
      </div>

      <div style={styles.content}>
        {/* Logo Section */}
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>
            <AlertCircle size={40} color="#ffffff" />
          </div>
          <h2 style={styles.logoText}>Submit Your Complaint</h2>
          <p style={styles.subtitle}>
            We take your feedback seriously. Please provide details about your concern.
          </p>
        </div>

        {/* Form */}
        <div style={styles.formContainer}>
          {/* Personal Information */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Personal Information</h3>
            
            <div style={styles.inputGroup}>
              <div style={styles.iconContainer}>
                <User size={20} color="#6b7280" />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <div style={styles.iconContainer}>
                <FileText size={20} color="#6b7280" />
              </div>
              <input
                type="text"
                placeholder="NIC Number"
                value={formData.nicNumber}
                onChange={(e) => handleInputChange('nicNumber', e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <div style={styles.iconContainer}>
                <Phone size={20} color="#6b7280" />
              </div>
              <input
                type="tel"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <div style={styles.iconContainer}>
                <Mail size={20} color="#6b7280" />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={formData.emailAddress}
                onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          {/* Complaint Details */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Complaint Details</h3>

            <div style={styles.inputGroup}>
              <select
                value={formData.serviceType}
                onChange={(e) => handleInputChange('serviceType', e.target.value)}
                style={styles.select}
              >
                <option value="">Select Service Type</option>
                {serviceTypes.map((service, index) => (
                  <option key={index} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div style={styles.inputGroup}>
              <select
                value={formData.complaintCategory}
                onChange={(e) => handleInputChange('complaintCategory', e.target.value)}
                style={styles.select}
              >
                <option value="">Select Complaint Category</option>
                {complaintCategories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div style={styles.inputGroup}>
              <div style={styles.iconContainer}>
                <Calendar size={20} color="#6b7280" />
              </div>
              <input
                type="date"
                placeholder="Incident Date"
                value={formData.incidentDate}
                onChange={(e) => handleInputChange('incidentDate', e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <textarea
                placeholder="Describe your complaint in detail..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                style={styles.textarea}
                rows={5}
              />
            </div>

            {/* Priority Level */}
            <div style={styles.prioritySection}>
              <label style={styles.priorityLabel}>Priority Level:</label>
              <div style={styles.priorityOptions}>
                {['low', 'medium', 'high'].map((priority) => (
                  <label key={priority} style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="priority"
                      value={priority}
                      checked={formData.priority === priority}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      style={styles.radio}
                    />
                    <span style={styles.radioText}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* File Upload */}
            <div style={styles.uploadSection}>
              <label style={styles.uploadLabel}>
                Attach Supporting Documents (Optional)
              </label>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileUpload}
                style={styles.fileInput}
              />
              {formData.attachments.length > 0 && (
                <div style={styles.fileList}>
                  {formData.attachments.map((file, index) => (
                    <div key={index} style={styles.fileName}>
                      📎 {file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            style={styles.submitButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1e40af'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#033ea1'}
          >
            Submit Complaint
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: 'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    backgroundColor: '#ffffff',
    padding: '20px 24px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  backArrow: {
    cursor: 'pointer',
    marginRight: '16px',
    padding: '8px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease'
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0
  },
  content: {
    padding: '40px 20px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  logoSection: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  logoIcon: {
    width: '80px',
    height: '80px',
    backgroundColor: '#dc2626',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px'
  },
  logoText: {
    color: '#1e293b',
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 12px 0'
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '16px',
    margin: 0,
    lineHeight: 1.5
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0'
  },
  section: {
    marginBottom: '32px'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '20px',
    margin: '0 0 20px 0'
  },
  inputGroup: {
    position: 'relative',
    marginBottom: '16px'
  },
  iconContainer: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1
  },
  input: {
    width: '100%',
    padding: '16px 16px 16px 48px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
    color: '#374151',
    transition: 'border-color 0.2s ease'
  },
  select: {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
    color: '#374151',
    cursor: 'pointer'
  },
  textarea: {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
    color: '#374151',
    resize: 'vertical',
    fontFamily: 'inherit'
  },
  prioritySection: {
    marginBottom: '20px'
  },
  priorityLabel: {
    display: 'block',
    fontSize: '16px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '12px'
  },
  priorityOptions: {
    display: 'flex',
    gap: '20px'
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  radio: {
    marginRight: '8px'
  },
  radioText: {
    fontSize: '16px',
    color: '#374151'
  },
  uploadSection: {
    marginBottom: '20px'
  },
  uploadLabel: {
    display: 'block',
    fontSize: '16px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '12px'
  },
  fileInput: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    fontSize: '14px',
    cursor: 'pointer'
  },
  fileList: {
    marginTop: '12px'
  },
  fileName: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '4px'
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#033ea1',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    padding: '16px 24px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(3, 62, 161, 0.3)',
    transition: 'all 0.2s ease'
  }
};

export default ComplaintForm;
