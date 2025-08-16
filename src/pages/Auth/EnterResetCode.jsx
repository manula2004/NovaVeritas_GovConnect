import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputWithIcon from "../../components/InputWithIcon";
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import BackIcon from '../../assets/Icons/BackIcon';

export default function EnterCodePage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Code entered:', { code });
    navigate('/set-new-password');
  };

  const handleResendCode = () => {
    console.log('Resend code request for email');
    // Add logic to resend code if needed
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
        onClick={() => navigate('/reset-password')}
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
        Enter the Code
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

        <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "1rem" }}>
          Enter the code that was sent to your email
        </p>

        <InputWithIcon
          icon={null} // No icon for code input, adjust as needed
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <div
          style={{
            fontSize: "0.9rem",
            color: "#555",
            textAlign: "center",
            width: "100%"
          }}
        >
          Didn't get the code?{' '}
          <span
            style={{
              color: "#033EA1",
              cursor: "pointer"
            }}
            onClick={handleResendCode}
          >
            <b>Resend</b>
          </span>
        </div>

        {/* Submit button */}
        <Button
          label="Submit"
          type="submit"
          style={{ width: "100%" }}
        />
      </form>
    </div>
  );
}