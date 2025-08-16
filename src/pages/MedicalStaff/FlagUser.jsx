import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, User, FileText, Calendar } from 'lucide-react';
import Logo from '../../components/Logo';

const FlagUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId || '';
  
  const [formData, setFormData] = useState({
    userId: userId,
    userName: '',
    nic: '',
    flagReason: '',
    flagType: 'Medical Concern',
    description: '',
    severity: 'Medium',
    restrictions: '',
    followUpRequired: false,
    reviewDate: '',
    flaggedBy: 'Dr. Medical Staff' // This would come from auth context
  });

  const handleGoBack = () => {
    navigate('/MedicalStaff/BrowseUser');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Flagging user with data:', formData);
    // Here you would typically make an API call to flag the user
    alert('User has been successfully flagged!');
    navigate('/MedicalStaff/BrowseUser');
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
      marginBottom: '30px',
      paddingBottom: '20px',
      borderBottom: '2px solid #e5e7eb'
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
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    section: {
      backgroundColor: '#f9fafb',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid #e5e7eb'
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
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151'
    },
    input: {
      padding: '12px',
      border: '2px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '16px',
      fontFamily: 'Montserrat, sans-serif',
      outline: 'none',
      transition: 'border-color 0.2s ease'
    },
    select: {
      padding: '12px',
      border: '2px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '16px',
      fontFamily: 'Montserrat, sans-serif',
      outline: 'none',
      transition: 'border-color 0.2s ease',
      backgroundColor: '#ffffff'
    },
    textarea: {
      padding: '12px',
      border: '2px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '16px',
      fontFamily: 'Montserrat, sans-serif',
      outline: 'none',
      transition: 'border-color 0.2s ease',
      minHeight: '100px',
      resize: 'vertical'
    },
    checkboxGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    checkbox: {
      width: '18px',
      height: '18px',
      cursor: 'pointer'
    },
    checkboxLabel: {
      fontSize: '14px',
      color: '#374151',
      cursor: 'pointer'
    },
    row: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px'
    },
    buttonGroup: {
      display: 'flex',
      gap: '15px',
      justifyContent: 'flex-end',
      marginTop: '30px'
    },
    button: {
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontFamily: 'Montserrat, sans-serif'
    },
    cancelButton: {
      backgroundColor: '#6b7280',
      color: '#ffffff'
    },
    submitButton: {
      backgroundColor: '#ef4444',
      color: '#ffffff'
    },
    warningBox: {
      backgroundColor: '#fef3c7',
      border: '2px solid #f59e0b',
      borderRadius: '8px',
      padding: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '20px'
    },
    warningText: {
      color: '#92400e',
      fontSize: '14px',
      fontWeight: '500'
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.header}>
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
            <h1 style={styles.title}>Flag Medical Patient</h1>
          </div>
        </div>

        <div style={styles.warningBox}>
          <AlertTriangle size={24} color="#f59e0b" />
          <span style={styles.warningText}>
            Warning: Flagging a user will add restrictions to their medical clearance and may affect their ability to obtain licenses or passports.
          </span>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              <User size={20} />
              User Information
            </h3>
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>User ID</label>
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Enter user ID"
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>User Name</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Enter user name"
                  required
                />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>NIC Number</label>
              <input
                type="text"
                name="nic"
                value={formData.nic}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Enter NIC number"
                required
              />
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              <AlertTriangle size={20} />
              Flag Details
            </h3>
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Flag Type</label>
                <select
                  name="flagType"
                  value={formData.flagType}
                  onChange={handleInputChange}
                  style={styles.select}
                  required
                >
                  <option value="Medical Concern">Medical Concern</option>
                  <option value="Vision Impairment">Vision Impairment</option>
                  <option value="Hearing Impairment">Hearing Impairment</option>
                  <option value="Physical Disability">Physical Disability</option>
                  <option value="Mental Health">Mental Health</option>
                  <option value="Substance Abuse">Substance Abuse</option>
                  <option value="Chronic Condition">Chronic Condition</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Severity Level</label>
                <select
                  name="severity"
                  value={formData.severity}
                  onChange={handleInputChange}
                  style={styles.select}
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Flag Reason</label>
              <input
                type="text"
                name="flagReason"
                value={formData.flagReason}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Brief reason for flagging"
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Detailed Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                style={styles.textarea}
                placeholder="Provide detailed medical findings and concerns..."
                required
              />
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              <FileText size={20} />
              Restrictions & Follow-up
            </h3>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Restrictions/Recommendations</label>
              <textarea
                name="restrictions"
                value={formData.restrictions}
                onChange={handleInputChange}
                style={styles.textarea}
                placeholder="Specify any restrictions or recommendations for this user..."
              />
            </div>
            <div style={styles.row}>
              <div style={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  name="followUpRequired"
                  checked={formData.followUpRequired}
                  onChange={handleInputChange}
                  style={styles.checkbox}
                  id="followUpRequired"
                />
                <label htmlFor="followUpRequired" style={styles.checkboxLabel}>
                  Follow-up appointment required
                </label>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Review Date</label>
                <input
                  type="date"
                  name="reviewDate"
                  value={formData.reviewDate}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
            </div>
          </div>

          <div style={styles.buttonGroup}>
            <button
              type="button"
              style={{...styles.button, ...styles.cancelButton}}
              onClick={handleGoBack}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{...styles.button, ...styles.submitButton}}
            >
              Flag User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlagUser;
