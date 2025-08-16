import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LanguageSelection from "./pages/Common/LanguageSelection";

export default function AppTest() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LanguageSelection />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
}
