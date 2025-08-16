import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import MedicalIcon from "../../assets/Icons/MedicalIcon.svg";
import PassportIcon from "../../assets/Icons/PassportIcon.svg";
import LicenseIcon from "../../assets/Icons/LicenseIcon.svg";
import ComplaintIcon from "../../assets/Icons/ComplaintIcon.svg";
import ProfileIcon from "../../assets/Icons/ProfileIcon.svg";

export default function CitizenDashboard() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "2rem",
        padding: "0 1rem"
      }}
    >
      {/* Logo */}
      <Logo width="120px" />

      {/* Heading */}
      <h1
        style={{
          fontSize: "1.5rem",
          marginTop: "1rem",
          marginBottom: "0.5rem",
          color: "#1a202c"
        }}
      >
        Welcome to <span style={{ color: "#033EA1" }}>GOVCONNECT</span>
      </h1>
      <p
        style={{
          fontSize: "1rem",
          marginBottom: "1.5rem",
          color: "#1a202c",
          fontWeight: "500"
        }}
      >
        Select Your Service
      </p>

      {/* Services list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          width: "100%",
          maxWidth: "350px",
          margin: "0 auto"
        }}
      >
        <Button
          label="Medical Services"
          onClick={() => navigate("/citizen/medical")}
          iconLeft={<img src={MedicalIcon} alt="Medical Icon" style={{ width: 24, height: 24 }} />}
          iconRight="›"
          className="dashboard-btn"
        />
        <Button
          label="Passport Services"
          onClick={() => navigate("/citizen/passport")}
          iconLeft={<img src={PassportIcon} alt="Passport Icon" style={{ width: 24, height: 24 }} />}
          iconRight="›"
          className="dashboard-btn"
        />
        <Button
          label="License Services"
          onClick={() => navigate("/citizen/license")}
          iconLeft={<img src={LicenseIcon} alt="License Icon" style={{ width: 24, height: 24 }} />}
          iconRight="›"
          className="dashboard-btn"
        />
        <Button
          label="Service Complaints"
          onClick={() => navigate("/citizen/complaints")}
          iconLeft={<img src={ComplaintIcon} alt="Complaint Icon" style={{ width: 24, height: 24 }} />}
          iconRight="›"
          className="dashboard-btn"
        />
      </div>

      {/* Profile icon at bottom */}
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <img 
          src={ProfileIcon} 
          alt="Profile Icon" 
          width="36px" 
          height="36px" 
          style={{ 
            color: "#033EA1",
            cursor: "pointer",
            transition: "transform 0.2s ease"
          }}
          onClick={() => navigate("/citizen/profile")}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        />
      </div>
    </div>
  );
}
