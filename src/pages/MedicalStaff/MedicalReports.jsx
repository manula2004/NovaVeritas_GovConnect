import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import { ArrowLeft, Droplets, Download } from 'lucide-react';

const MedicalStaffReports = () => {
  const navigate = useNavigate();
  const [patientNic, setPatientNic] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleGoBack = () => navigate('/medical-staff/dashboard');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      console.log('File uploaded:', file.name);
    }
  };

  const handleSubmit = () => {
    if (!patientNic.trim()) {
      alert("Please enter patient's NIC");
      return;
    }
    if (!uploadedFile) {
      alert("Please upload a report file");
      return;
    }
    
    console.log('Submitting report for NIC:', patientNic);
    console.log('File:', uploadedFile);
    // Add your submit logic here
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.backArrow} onClick={handleGoBack}>
            <ArrowLeft size={24} color="#000000" />
          </div>
          <div style={styles.headerContent}>
            <div style={styles.dropletIcon}>
              <Droplets size={24} color="#47a7ff" />
            </div>
            <h1 style={styles.title}>Medical Staff</h1>
          </div>
        </div>
        
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Reports</h2>
          
          <div style={styles.formContainer}>
            <input
              type="text"
              placeholder="Enter Patient's NIC"
              value={patientNic}
              onChange={(e) => setPatientNic(e.target.value)}
              style={styles.nicInput}
            />

            <div style={styles.uploadSection}>
              <label style={styles.uploadLabel}>
                <div style={styles.uploadContent}>
                  <Download size={20} color="#47a7ff" />
                  <span>Upload Patient's reports here</span>
                </div>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  style={styles.hiddenInput}
                />
              </label>
              
              {uploadedFile && (
                <div style={styles.fileSelected}>
                  File selected: {uploadedFile.name}
                </div>
              )}
            </div>

            <button 
              style={styles.submitButton}
              onClick={handleSubmit}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#022d7a';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#033ea1';
              }}
              onMouseDown={(e) => {
                e.target.style.transform = 'translateY(1px)';
              }}
              onMouseUp={(e) => {
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Submit
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
    justifyContent: 'center',
    position: 'relative',
    borderBottom: '1px solid #e5e5e5'
  },
  backArrow: {
    position: 'absolute',
    left: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  dropletIcon: {
    marginBottom: '8px'
  },
  title: {
    color: '#000000',
    fontSize: '24px',
    fontWeight: '700',
    textAlign: 'center',
    margin: 0
  },
  content: {
    padding: '20px'
  },
  sectionTitle: {
    color: '#000000',
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '20px',
    margin: '0 0 20px 0'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  nicInput: {
    width: '100%',
    padding: '16px',
    fontSize: '16px',
    border: '1px solid #e5e5e5',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
    color: '#666',
    outline: 'none',
    boxSizing: 'border-box'
  },
  uploadSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  uploadLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    border: '2px dashed #47a7ff',
    borderRadius: '8px',
    backgroundColor: '#f8fafe',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  uploadContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#47a7ff',
    fontSize: '16px'
  },
  hiddenInput: {
    display: 'none'
  },
  fileSelected: {
    fontSize: '14px',
    color: '#47a7ff',
    textAlign: 'center'
  },
  submitButton: {
    backgroundColor: '#033ea1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    width: 'auto',
    margin: '0 auto',
    display: 'block',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, transform 0.1s ease'
  }
};

export default MedicalStaffReports;