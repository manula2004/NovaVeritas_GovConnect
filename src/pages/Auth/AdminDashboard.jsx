import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import Button from "../../components/Button";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "4rem",
        padding: "0 1rem",
      }}
    >
      {/* Logo */}
      <Logo width="200px" />

      {/* Title */}
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          marginTop: "1rem",
          marginBottom: "2rem",
          color: "#1a202c",
        }}
      >
        Admin Dashboard
      </h1>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          width: "100%",
          maxWidth: "300px",
          margin: "0 auto",
        }}
      >
        <Button
          label="Medical"
          onClick={() => navigate("/MedicalStaff/dashboard")}
          style={{ width: "100%" }}
        />
        <Button
          label="Passport"
          onClick={() => navigate("/PassportStaff/dashboard")}
          style={{ width: "100%" }}
        />
        <Button
          label="License"
          onClick={() => navigate("/LicenseStaff/dashboard")}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}
