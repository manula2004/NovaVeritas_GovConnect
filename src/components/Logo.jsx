import React from "react";
import logo from "../assets/gc-logo.png"; // adjust if using .svg

export default function Logo({ width = "150px" }) {
  return (
    <img 
      src={logo} 
      alt="GovConnect Logo" 
      style={{ width, height: "auto" }} 
    />
  );
}
