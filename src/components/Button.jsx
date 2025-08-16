import React from "react";

export default function Button({ label, onClick, type = "button", className = "", iconLeft, iconRight }) {
  return (
    <button 
      className={`btn-primary ${className}`}
      onClick={onClick} 
      type={type}
    >
      {iconLeft && <span className="btn-icon-left">{iconLeft}</span>}
      {label}
      {iconRight && <span className="btn-icon-right">{iconRight}</span>}
    </button>
  );
}