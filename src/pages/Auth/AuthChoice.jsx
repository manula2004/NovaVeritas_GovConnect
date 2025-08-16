import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Logo from "../../components/Logo";
import BackIcon from '../../assets/Icons/BackIcon';

export default function AuthChoice() {
  const navigate = useNavigate();

  return (
    <div style={{
      textAlign: "center",
      marginTop: "6rem",
      padding: "0 1rem" // Consistent padding with LanguageSelection
    }}>
      <div
        style={{
          position: "absolute",
          top: "-3rem",
          left: "1rem",
          cursor: "pointer",
          color: "#033EA1"
        }}
        onClick={() => navigate("/")}
      >
        <BackIcon />
      </div>
      <Logo width="250px" /> {/* Same logo size as LanguageSelection */}
      
      <h1 style={{
        fontSize: "1.5rem", // Slightly larger than LanguageSelection's title
        marginTop: "0.5rem", // More balanced spacing than negative margin
        marginBottom: "1.5rem",
        color: "#1a202c" // Adding color for better readability
      }}>
        Welcome to GovConnect
      </h1>
      
      <div style={{
        marginTop: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        width: "100%",
        maxWidth: "300px", // Constrain width for better mobile readability
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        <Button 
          label="Login" 
          onClick={() => navigate("/login")} 
          style={{ width: "100%" }}
        />
        <Button 
          label="Sign Up" 
          onClick={() => navigate("/register")} 
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}