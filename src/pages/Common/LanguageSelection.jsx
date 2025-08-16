import React from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";

export default function LanguageSelection() {
  const navigate = useNavigate();

  const handleLanguageSelect = () => {
    navigate("/auth-choice");
  };

  return (
<div style={{ 
  textAlign: "center", 
  marginTop: "6rem", 
  padding: "0 1rem" // padding so buttons don't touch screen edges
}}>
    <Logo width="250px" />
  <h1 style={{ fontSize: "1rem" , marginTop: "-1rem"}}>Select Your Language</h1>
  <div style={{ 
    marginTop: "1rem", 
    display: "flex", 
    flexDirection: "column", 
    gap: "1rem", 
    alignItems: "center" 
  }}>
    <Button label="සිංහල" onClick={handleLanguageSelect} />
    <Button label="தமிழ்" onClick={handleLanguageSelect} />
    <Button label="English" onClick={handleLanguageSelect} /> 
  </div>
</div>
  );
}
