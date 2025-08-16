import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditUserProfile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the first page of the profile editing flow
    navigate('/citizen/profile/edit/page2', { replace: true });
  }, [navigate]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'Montserrat, sans-serif'
    }}>
      <p>Redirecting to profile editor...</p>
    </div>
  );
};

export default EditUserProfile;