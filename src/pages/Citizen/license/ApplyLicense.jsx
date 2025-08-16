import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ApplyLicense = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to license services page
    navigate('/citizen/license', { replace: true });
  }, [navigate]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'Montserrat, sans-serif'
    }}>
      <p>Redirecting to license services...</p>
    </div>
  );
};

export default ApplyLicense;
