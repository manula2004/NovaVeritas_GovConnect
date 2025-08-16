import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Logo */}
        <div style={styles.logoSection}>
          <Logo width="120px" />
        </div>

        {/* 404 Message */}
        <div style={styles.messageSection}>
          <h1 style={styles.errorCode}>404</h1>
          <h2 style={styles.errorMessage}>Page Not Found</h2>
          <p style={styles.description}>
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={styles.actionButtons}>
          <button
            onClick={() => navigate('/')}
            style={styles.homeButton}
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate(-1)}
            style={styles.backButton}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '20px'
  },
  content: {
    textAlign: 'center',
    maxWidth: '500px',
    backgroundColor: '#ffffff',
    padding: '48px 32px',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0'
  },
  logoSection: {
    marginBottom: '32px'
  },
  messageSection: {
    marginBottom: '32px'
  },
  errorCode: {
    fontSize: '72px',
    fontWeight: '700',
    color: '#033ea1',
    margin: '0 0 16px 0',
    lineHeight: 1
  },
  errorMessage: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#374151',
    margin: '0 0 16px 0'
  },
  description: {
    fontSize: '16px',
    color: '#6b7280',
    margin: 0,
    lineHeight: 1.5
  },
  actionButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  homeButton: {
    backgroundColor: '#033ea1',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(3, 62, 161, 0.3)',
    transition: 'all 0.2s ease'
  },
  backButton: {
    backgroundColor: '#f9fafb',
    color: '#6b7280',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }
};
