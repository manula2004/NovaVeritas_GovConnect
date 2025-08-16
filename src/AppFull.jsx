import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth Components
import AuthChoice from "./pages/Auth/AuthChoice";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ResetPasswordPage from "./pages/Auth/ResetPassword";
import EnterCodePage from "./pages/Auth/EnterResetCode";
import SetNewPasswordPage from "./pages/Auth/SetNewPasswordPage";
import AdminDashboard from "./pages/Auth/AdminDashboard";

// Common Components
import LanguageSelection from "./pages/Common/LanguageSelection";
import NotFound from "./pages/Common/NotFound";

// Citizen Components
import Dashboard from "./pages/Citizen/Dashboard";
import ComplaintForm from "./pages/Citizen/ComplaintForm";
import EditUserProfile from "./pages/Citizen/EditUserProfilePage1";

// Citizen Passport
import PassportServices from "./pages/Citizen/passport/PassportServices";
import ApplyPassport from "./pages/Citizen/passport/ApplyPassport";
import TrackPassport from "./pages/Citizen/passport/TrackPassport";
import NewPassport from "./pages/Citizen/passport/NewPassport";

// Citizen License
import LicenseServices from "./pages/Citizen/license/LicenseServices";
import ApplyLicense from "./pages/Citizen/license/ApplyLicense";
import TrackApplication from "./pages/Citizen/license/TrackApplication";
import TrackLicense from "./pages/Citizen/license/TrackLicense";
import ApplyNewLicense from "./pages/Citizen/license/ApplyNewLicense";
import RenewLicense from "./pages/Citizen/license/RenewLicense";

// Citizen Medical
import MedicalServices from "./pages/Citizen/medical/MedicalServices";
import MedicalAppointment from "./pages/Citizen/medical/appointment";

// Medical Staff
import MedicalStaffDashboard from "./pages/MedicalStaff/Dashboard";
import MedicalStaffMedicalReports from "./pages/MedicalStaff/MedicalReports";
import MedicalStaffAppointmentRequests from "./pages/MedicalStaff/AppointmentRequests";
import MedicalStaffBrowseUser from "./pages/MedicalStaff/BrowseUser";
import MedicalStaffFlagUser from "./pages/MedicalStaff/FlagUser";

// License Staff
import LicenseStaffDashboard from "./pages/LicenseStaff/Dashboard";
import LicenseStaffAppointmentRequests from "./pages/LicenseStaff/AppointmentRequests";
import LicenseStaffBrowseUser from "./pages/LicenseStaff/BrowseUser";
import UpdateLicenseStatus from "./pages/LicenseStaff/UpdateLicenseStatus";

// Passport Staff
import PassportStaffDashboard from "./pages/PassportStaff/Dashboard";
import PassportStaffAppointmentRequests from "./pages/PassportStaff/AppointmentRequests";
import PassportStaffBrowseUser from "./pages/PassportStaff/BrowseUser";
import PassportStaffFlagUser from "./pages/PassportStaff/FlagUser";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<LanguageSelection />} />
        <Route path="*" element={<NotFound />} />
        
        {/* Auth Routes */}
        <Route path="/auth-choice" element={<AuthChoice />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/enter-reset-code" element={<EnterCodePage />} />
        <Route path="/set-new-password" element={<SetNewPasswordPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Citizen Routes */}
        <Route path="/citizen/dashboard" element={<Dashboard />} />
        <Route path="/citizen/complaint" element={<ComplaintForm />} />
        <Route path="/citizen/profile/edit" element={<EditUserProfile />} />
        
        {/* Citizen Passport Routes */}
        <Route path="/citizen/passport" element={<PassportServices />} />
        <Route path="/citizen/passport/apply" element={<ApplyPassport />} />
        <Route path="/citizen/passport/new" element={<NewPassport />} />
        <Route path="/citizen/passport/track" element={<TrackPassport />} />
        
        {/* Citizen License Routes */}
        <Route path="/citizen/license" element={<LicenseServices />} />
        <Route path="/citizen/license/apply" element={<ApplyLicense />} />
        <Route path="/citizen/license/apply-new" element={<ApplyNewLicense />} />
        <Route path="/citizen/license/renew" element={<RenewLicense />} />
        <Route path="/citizen/license/track-application" element={<TrackApplication />} />
        <Route path="/citizen/license/track" element={<TrackLicense />} />
        
        {/* Citizen Medical Routes */}
        <Route path="/citizen/medical" element={<MedicalServices />} />
        <Route path="/citizen/medical/appointment" element={<MedicalAppointment />} />

        {/* Medical Staff Routes */}
        <Route path="/medical-staff/dashboard" element={<MedicalStaffDashboard />} />
        <Route path="/medical-staff/reports" element={<MedicalStaffMedicalReports />} />
        <Route path="/medical-staff/appointments" element={<MedicalStaffAppointmentRequests />} />
        <Route path="/medical-staff/browse-users" element={<MedicalStaffBrowseUser />} />
        <Route path="/medical-staff/flag-user" element={<MedicalStaffFlagUser />} />

        {/* License Staff Routes */}
        <Route path="/license-staff/dashboard" element={<LicenseStaffDashboard />} />
        <Route path="/license-staff/appointments" element={<LicenseStaffAppointmentRequests />} />
        <Route path="/license-staff/browse-users" element={<LicenseStaffBrowseUser />} />
        <Route path="/license-staff/update-status" element={<UpdateLicenseStatus />} />

        {/* Passport Staff Routes */}
        <Route path="/passport-staff/dashboard" element={<PassportStaffDashboard />} />
        <Route path="/passport-staff/appointments" element={<PassportStaffAppointmentRequests />} />
        <Route path="/passport-staff/browse-users" element={<PassportStaffBrowseUser />} />
        <Route path="/passport-staff/flag-user" element={<PassportStaffFlagUser />} />
      </Routes>
    </Router>
  );
}
