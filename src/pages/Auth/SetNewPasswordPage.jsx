import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputWithIcon from "../../components/InputWithIcon";
import PasswordInput from "../../components/PasswordInput";
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import BackIcon from '../../assets/Icons/BackIcon';

export default function SetNewPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    console.log('New password set:', { newPassword });
    navigate('/login');
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
        onClick={() => navigate('/enter-reset-code')}
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
        Set New Password
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

        <PasswordInput
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <PasswordInput
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Submit button */}
        <Button
          label="Set New Password"
          type="submit"
          style={{ width: "100%" }}
        />
      </form>
    </div>
  );
}