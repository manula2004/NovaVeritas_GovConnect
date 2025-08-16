import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../components/Logo";
import Button from "../../../components/Button";
import BackIcon from "../../../assets/Icons/BackIcon";

export default function LicenseServices() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "4rem",
        padding: "0 1rem",
        position: "relative"
      }}
    >
      {/* Back arrow */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          cursor: "pointer",
          color: "#033EA1"
        }}
        onClick={() => navigate('/citizen/dashboard')}
      >
        <BackIcon />
      </div>

      {/* Logo */}
      <Logo width="180px" />

      {/* Subtitle */}
      <p
        style={{
          fontSize: "1rem",
          marginTop: "1.5rem",
          marginBottom: "2rem",
          color: "#1a202c",
          fontWeight: "500"
        }}
      >
        Please select the type of application you want to proceed with.
      </p>

      {/* Options */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          width: "100%",
          maxWidth: "320px",
          margin: "0 auto"
        }}
      >
        <Button
          label="Get a New Driving License"
          onClick={() => navigate("/citizen/license/apply")}
          iconRight="›"
          style={{ width: "100%" }}
        />
        <Button
          label="Renew Existing License"
          onClick={() => navigate("/citizen/license/renew")}
          iconRight="›"
          style={{ width: "100%" }}
        />
        <Button
          label="Track License Delivery"
          onClick={() => navigate("/citizen/license/track")}
          iconRight="›"
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}
