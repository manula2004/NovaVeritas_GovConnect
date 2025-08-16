import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../components/Logo";
import Button from "../../../components/Button";
import BackIcon from "../../../assets/Icons/BackIcon";
import InputWithIcon from "../../../components/InputWithIcon";

export default function BookAppointment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    date: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment booked:", formData);

    alert("Appointment request submitted!");
    navigate('/citizen/medical'); // Back after submit
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "4rem",
        padding: "0 1rem",
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
        onClick={() => navigate('/citizen/medical')}
      >
        <BackIcon />
      </div>

      {/* Logo */}
      <Logo width="160px" />

      {/* Title */}
      <h1
        style={{
          fontSize: "1.5rem",
          marginTop: "1rem",
          marginBottom: "2rem",
          color: "#1a202c",
        }}
      >
        Book An Appointment
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
          maxWidth: "350px",
          margin: "0 auto",
        }}
      >

        {/* Patient's Name */}
          <InputWithIcon
            type="text"
            name="name"
            placeholder="Patient's Name"
            value={formData.name}
            onChange={handleChange}
            showIcon={false}
          />


        <InputWithIcon
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          showIcon={false}
        />

        <InputWithIcon
          type="date"
          name="date"
          placeholder="Preferred Date"
          value={formData.date}
          onChange={handleChange}
          showIcon={false}
        />

        {/* Remarks */}
        <textarea
          name="remarks"
          placeholder="Remarks"
          value={formData.remarks}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            fontFamily: "Montserrat, sans-serif",
            height: "80px",
            resize: "none",
          }}
        />

        {/* Submit */}
        <Button label="Submit" type="submit" style={{ width: "100%" }} />
      </form>
    </div>
  );
}
