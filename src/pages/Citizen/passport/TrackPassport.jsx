import React from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../../assets/Icons/BackIcon";

export default function PassportStatus() {
  const navigate = useNavigate();

  // Dummy values for now (replace with backend data later)
  const applicationStatus = "In Progress";
  const appointmentDate = "2025-08-20";

  return (
    <div
      style={{
        textAlign: "left",
        marginTop: "4rem",
        padding: "0 1.5rem",
        position: "relative",
      }}
    >
      {/* Back arrow */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          cursor: "pointer",
          color: "#033EA1",
        }}
        onClick={() => navigate('/citizen/passport')}
      >
        <BackIcon />
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          marginBottom: "2rem",
          color: "#1a202c",
          textAlign: "center",
        }}
      >
        Passport Application Status
      </h1>

      {/* Status Section */}
      <div
        style={{
          background: "#F9F9F9",
          borderRadius: "12px",
          padding: "1rem",
          marginBottom: "1rem",
          boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ fontWeight: "600", marginBottom: "0.5rem" }}>
          Application Status
        </p>
        <p style={{ color: "#033EA1", fontSize: "1.1rem" }}>
          {applicationStatus}
        </p>
      </div>

      {/* Appointment Date Section */}
      <div
        style={{
          background: "#F9F9F9",
          borderRadius: "12px",
          padding: "1rem",
          boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ fontWeight: "600", marginBottom: "0.5rem" }}>
          Appointment Date
        </p>
        <p style={{ color: "#033EA1", fontSize: "1.1rem" }}>
          {appointmentDate}
        </p>
      </div>
    </div>
  );
}
