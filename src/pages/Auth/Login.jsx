import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputWithIcon from "../../components/InputWithIcon";
import PasswordInput from "../../components/PasswordInput";
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import EmailIcon from '../../assets/Icons/EmailIcon';
import BackIcon from '../../assets/Icons/BackIcon';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    console.log('Login attempt with:', { email, password });
    
    // Role-based navigation based on username/ID pattern
    const username = email.toLowerCase();
    
    // Extract the first character to determine user type
    const firstChar = username.charAt(0);
    
    if (/^[0-9]/.test(username)) {
      // NIC starting with number -> Citizen
      console.log('Citizen login detected');
      navigate('/citizen/dashboard');
    } else if (firstChar === 'm') {
      // ID starting with 'M' -> Medical Staff
      console.log('Medical staff login detected');
      navigate('/medical-staff/dashboard');
    } else if (firstChar === 'p') {
      // ID starting with 'P' -> Passport Staff
      console.log('Passport staff login detected');
      navigate('/passport-staff/dashboard');
    } else if (firstChar === 'r') {
      // ID starting with 'R' -> License Staff (RMV)
      console.log('License staff login detected');
      navigate('/license-staff/dashboard');
    } else {
      // Default to citizen dashboard for other cases
      console.log('Default to citizen dashboard');
      navigate('/citizen/dashboard');
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "4rem",
        padding: "0 1rem",
        position: "relative"
      }}
    >
      {/* Back icon */}
      <div
        style={{
          position: "absolute",
          top: "-3rem",
          left: "1rem",
          cursor: "pointer",
          color: "#033EA1"
        }}
        onClick={() => navigate('/auth-choice')}
      >
        <BackIcon />
      </div>

      {/* Logo */}
      <Logo width="250px" />

      <h1
        style={{
          fontSize: "1.5rem",
          marginTop: "0.5rem",
          marginBottom: "1.5rem",
          color: "#1a202c"
        }}
      >
        Login to Your Account
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          width: "100%",
          maxWidth: "300px",
          margin: "0 auto"
        }}
      >
        {error && (
          <div
            style={{
              color: "#dc2626",
              fontSize: "0.9rem",
              textAlign: "center"
            }}
          >
            {error}
          </div>
        )}

        <InputWithIcon
          icon={EmailIcon}
          iconPosition="right"
          type="text"
          placeholder="Enter NIC or Staff ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Forgot password */}
        <div
          style={{
            fontSize: "0.9rem",
            color: "#555",
            textAlign: "left",
            width: "100%"
          }}
        >
          Forgot Password?{' '}
          <span
            style={{
              color: "#033EA1",
              cursor: "pointer"
              
            }}
            onClick={() => navigate("/reset-password")}
          >
            <b>Reset now</b>
          </span>
        </div>

        {/* Login button */}
        <Button
          label="Log in"
          type="submit"
          onClick={() => navigate("/citizen/Dashboard")}
          style={{ width: "100%" }}
        />
      </form>
    </div>
  );
}
