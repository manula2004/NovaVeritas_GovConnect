import React from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../../assets/Icons/BackIcon";

export default function LicenseStatus() {
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
        onClick={() => navigate('/citizen/license')}
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
        License Application Status
      </h1>

      {/* Status Section */}
      <div
        style={{
          backgroundColor: "#f7fafc",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "1.5rem",
          border: "1px solid #e2e8f0",
        }}
      >
        <h2
          style={{
            fontSize: "1.2rem",
            fontWeight: "500",
            marginBottom: "1rem",
            color: "#2d3748",
          }}
        >
          Application Status
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "#4a5568",
            marginBottom: "0.5rem",
          }}
        >
          <strong>Status:</strong> {applicationStatus}
        </p>
        <p
          style={{
            fontSize: "1rem",
            color: "#4a5568",
          }}
        >
          <strong>Expected Completion:</strong> {appointmentDate}
        </p>
      </div>

      {/* Progress Steps */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "1.5rem",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
        }}
      >
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: "500",
            marginBottom: "1rem",
            color: "#2d3748",
          }}
        >
          Progress Steps
        </h3>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: "#48bb78",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "white", fontSize: "12px" }}>✓</span>
            </div>
            <span style={{ color: "#2d3748" }}>Application Submitted</span>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: "#ed8936",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "white", fontSize: "12px" }}>2</span>
            </div>
            <span style={{ color: "#2d3748" }}>Document Verification</span>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: "#e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#a0aec0", fontSize: "12px" }}>3</span>
            </div>
            <span style={{ color: "#a0aec0" }}>License Processing</span>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: "#e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#a0aec0", fontSize: "12px" }}>4</span>
            </div>
            <span style={{ color: "#a0aec0" }}>Ready for Collection</span>
          </div>
        </div>
      </div>
    </div>
  );
}
