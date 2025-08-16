import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ApplyPassport = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to passport services page
    navigate('/citizen/passport', { replace: true });
  }, [navigate]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'Montserrat, sans-serif'
    }}>
      <p>Redirecting to passport services...</p>
    </div>
  );
};

export default ApplyPassport;
