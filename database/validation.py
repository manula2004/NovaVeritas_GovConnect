"""
Data Validation and Sanitization Functions
Person 2 - Database Setup

Comprehensive validation for Sri Lankan government data formats
"""

import re
from datetime import datetime, date
from typing import Dict, Any, List, Optional, Union
import html

class DataValidator:
    """Comprehensive data validation for GovConnect application"""
    
    def __init__(self):
        # Sri Lankan NIC patterns
        self.old_nic_pattern = re.compile(r'^[0-9]{9}[VvXx]$')
        self.new_nic_pattern = re.compile(r'^[0-9]{12}$')
        
        # Phone number patterns
        self.mobile_pattern = re.compile(r'^\+94[0-9]{9}$')
        self.landline_pattern = re.compile(r'^\+94[0-9]{9}$')
        
        # Email pattern
        self.email_pattern = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
        
        # Passport pattern (Sri Lankan)
        self.passport_pattern = re.compile(r'^[N][0-9]{7}$')
        
        # License number pattern
        self.license_pattern = re.compile(r'^[B][0-9]{7}$')
    
    def validate_nic(self, nic: str) -> Dict[str, Any]:
        """
        Validate Sri Lankan NIC number (both old and new formats)
        
        Args:
            nic: NIC number to validate
            
        Returns:
            Dict with validation result and extracted info
        """
        if not nic:
            return {"valid": False, "error": "NIC is required"}
        
        nic = nic.strip().upper()
        
        # Check old format (9 digits + V/X)
        if self.old_nic_pattern.match(nic):
            return self._validate_old_nic(nic)
        
        # Check new format (12 digits)
        elif self.new_nic_pattern.match(nic):
            return self._validate_new_nic(nic)
        
        else:
            return {
                "valid": False,
                "error": "Invalid NIC format. Use 9 digits + V/X or 12 digits"
            }
    
    def _validate_old_nic(self, nic: str) -> Dict[str, Any]:
        """Validate old format NIC (9 digits + V/X)"""
        try:
            year_part = int(nic[:2])
            day_part = int(nic[2:5])
            
            # Determine century
            current_year = datetime.now().year
            if year_part <= (current_year % 100):
                birth_year = 2000 + year_part
            else:
                birth_year = 1900 + year_part
            
            # Extract gender and day of year
            if day_part > 500:
                gender = "Female"
                day_of_year = day_part - 500
            else:
                gender = "Male"
                day_of_year = day_part
            
            # Validate day of year
            if day_of_year < 1 or day_of_year > 366:
                return {"valid": False, "error": "Invalid day of year in NIC"}
            
            return {
                "valid": True,
                "format": "old",
                "birth_year": birth_year,
                "gender": gender,
                "day_of_year": day_of_year
            }
        
        except ValueError:
            return {"valid": False, "error": "Invalid numeric values in NIC"}
    
    def _validate_new_nic(self, nic: str) -> Dict[str, Any]:
        """Validate new format NIC (12 digits)"""
        try:
            year_part = int(nic[:4])
            day_part = int(nic[4:7])
            
            # Extract gender and day of year
            if day_part > 500:
                gender = "Female"
                day_of_year = day_part - 500
            else:
                gender = "Male"
                day_of_year = day_part
            
            # Validate year
            current_year = datetime.now().year
            if year_part < 1900 or year_part > current_year:
                return {"valid": False, "error": "Invalid birth year in NIC"}
            
            # Validate day of year
            if day_of_year < 1 or day_of_year > 366:
                return {"valid": False, "error": "Invalid day of year in NIC"}
            
            return {
                "valid": True,
                "format": "new",
                "birth_year": year_part,
                "gender": gender,
                "day_of_year": day_of_year
            }
        
        except ValueError:
            return {"valid": False, "error": "Invalid numeric values in NIC"}
    
    def validate_email(self, email: str) -> Dict[str, Any]:
        """
        Validate email address
        
        Args:
            email: Email address to validate
            
        Returns:
            Dict with validation result
        """
        if not email:
            return {"valid": False, "error": "Email is required"}
        
        email = email.strip().lower()
        
        if not self.email_pattern.match(email):
            return {"valid": False, "error": "Invalid email format"}
        
        # Check for common typos
        common_domains = ["gmail.com", "yahoo.com", "hotmail.com", "gov.lk"]
        domain = email.split("@")[1]
        
        return {
            "valid": True,
            "normalized": email,
            "domain": domain,
            "is_government": domain.endswith(".gov.lk")
        }
    
    def validate_phone(self, phone: str) -> Dict[str, Any]:
        """
        Validate Sri Lankan phone number
        
        Args:
            phone: Phone number to validate
            
        Returns:
            Dict with validation result
        """
        if not phone:
            return {"valid": False, "error": "Phone number is required"}
        
        phone = phone.strip()
        
        # Remove common separators
        phone = re.sub(r'[\s\-\(\)]', '', phone)
        
        # Convert local format to international
        if phone.startswith('0'):
            phone = '+94' + phone[1:]
        elif not phone.startswith('+94'):
            phone = '+94' + phone
        
        # Validate format
        if self.mobile_pattern.match(phone):
            return {
                "valid": True,
                "normalized": phone,
                "type": "mobile"
            }
        elif self.landline_pattern.match(phone):
            return {
                "valid": True,
                "normalized": phone,
                "type": "landline"
            }
        else:
            return {
                "valid": False,
                "error": "Invalid Sri Lankan phone number format"
            }
    
    def validate_passport_number(self, passport: str) -> Dict[str, Any]:
        """
        Validate Sri Lankan passport number
        
        Args:
            passport: Passport number to validate
            
        Returns:
            Dict with validation result
        """
        if not passport:
            return {"valid": False, "error": "Passport number is required"}
        
        passport = passport.strip().upper()
        
        if self.passport_pattern.match(passport):
            return {
                "valid": True,
                "normalized": passport,
                "country": "Sri Lanka"
            }
        else:
            return {
                "valid": False,
                "error": "Invalid Sri Lankan passport format (should be N followed by 7 digits)"
            }
    
    def validate_license_number(self, license_num: str) -> Dict[str, Any]:
        """
        Validate Sri Lankan driving license number
        
        Args:
            license_num: License number to validate
            
        Returns:
            Dict with validation result
        """
        if not license_num:
            return {"valid": False, "error": "License number is required"}
        
        license_num = license_num.strip().upper()
        
        if self.license_pattern.match(license_num):
            return {
                "valid": True,
                "normalized": license_num,
                "country": "Sri Lanka"
            }
        else:
            return {
                "valid": False,
                "error": "Invalid Sri Lankan license format (should be B followed by 7 digits)"
            }
    
    def sanitize_text(self, text: str, max_length: int = 255) -> str:
        """
        Sanitize text input by removing HTML and limiting length
        
        Args:
            text: Text to sanitize
            max_length: Maximum allowed length
            
        Returns:
            Sanitized text
        """
        if not text:
            return ""
        
        # Remove HTML tags and decode entities
        sanitized = html.escape(text.strip())
        
        # Remove extra whitespace
        sanitized = re.sub(r'\s+', ' ', sanitized)
        
        # Limit length
        if len(sanitized) > max_length:
            sanitized = sanitized[:max_length].rstrip()
        
        return sanitized
    
    def validate_date(self, date_str: str, format_str: str = "%Y-%m-%d") -> Dict[str, Any]:
        """
        Validate date string
        
        Args:
            date_str: Date string to validate
            format_str: Expected date format
            
        Returns:
            Dict with validation result
        """
        if not date_str:
            return {"valid": False, "error": "Date is required"}
        
        try:
            parsed_date = datetime.strptime(date_str, format_str).date()
            
            # Check if date is reasonable (not too far in past/future)
            today = date.today()
            min_date = date(1900, 1, 1)
            max_date = date(today.year + 10, 12, 31)
            
            if parsed_date < min_date or parsed_date > max_date:
                return {
                    "valid": False,
                    "error": f"Date must be between {min_date} and {max_date}"
                }
            
            return {
                "valid": True,
                "parsed_date": parsed_date,
                "iso_format": parsed_date.isoformat()
            }
        
        except ValueError:
            return {
                "valid": False,
                "error": f"Invalid date format. Expected: {format_str}"
            }
    
    def validate_appointment_data(self, appointment_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Validate complete appointment data
        
        Args:
            appointment_data: Appointment data to validate
            
        Returns:
            Dict with validation results and sanitized data
        """
        errors = []
        sanitized_data = {}
        
        # Validate citizen NIC
        if "citizenNic" in appointment_data:
            nic_result = self.validate_nic(appointment_data["citizenNic"])
            if not nic_result["valid"]:
                errors.append(f"NIC: {nic_result['error']}")
            else:
                sanitized_data["citizenNic"] = appointment_data["citizenNic"].strip().upper()
        
        # Validate appointment date
        if "appointmentDate" in appointment_data:
            date_result = self.validate_date(appointment_data["appointmentDate"])
            if not date_result["valid"]:
                errors.append(f"Date: {date_result['error']}")
            else:
                sanitized_data["appointmentDate"] = date_result["iso_format"]
        
        # Validate appointment time
        if "appointmentTime" in appointment_data:
            time_str = appointment_data["appointmentTime"]
            if not re.match(r'^([01]?[0-9]|2[0-3]):[0-5][0-9]$', time_str):
                errors.append("Time: Invalid time format (use HH:MM)")
            else:
                sanitized_data["appointmentTime"] = time_str
        
        # Validate service type
        valid_services = ["passport", "license", "nic", "birth", "marriage"]
        if "serviceType" in appointment_data:
            service = appointment_data["serviceType"].lower()
            if service not in valid_services:
                errors.append(f"Service: Must be one of {valid_services}")
            else:
                sanitized_data["serviceType"] = service
        
        # Sanitize notes
        if "notes" in appointment_data:
            sanitized_data["notes"] = self.sanitize_text(appointment_data["notes"], 500)
        
        # Validate department
        valid_departments = ["Immigration", "Transport", "Health", "Civil Registration"]
        if "department" in appointment_data:
            dept = appointment_data["department"]
            if dept not in valid_departments:
                errors.append(f"Department: Must be one of {valid_departments}")
            else:
                sanitized_data["department"] = dept
        
        return {
            "valid": len(errors) == 0,
            "errors": errors,
            "sanitized_data": sanitized_data
        }
    
    def validate_citizen_data(self, citizen_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Validate complete citizen registration data
        
        Args:
            citizen_data: Citizen data to validate
            
        Returns:
            Dict with validation results and sanitized data
        """
        errors = []
        sanitized_data = {}
        
        # Validate NIC
        if "nic" in citizen_data:
            nic_result = self.validate_nic(citizen_data["nic"])
            if not nic_result["valid"]:
                errors.append(f"NIC: {nic_result['error']}")
            else:
                sanitized_data["nic"] = citizen_data["nic"].strip().upper()
                sanitized_data["gender"] = nic_result.get("gender")
        
        # Validate email
        if "email" in citizen_data:
            email_result = self.validate_email(citizen_data["email"])
            if not email_result["valid"]:
                errors.append(f"Email: {email_result['error']}")
            else:
                sanitized_data["email"] = email_result["normalized"]
        
        # Validate phone
        if "phoneNumber" in citizen_data:
            phone_result = self.validate_phone(citizen_data["phoneNumber"])
            if not phone_result["valid"]:
                errors.append(f"Phone: {phone_result['error']}")
            else:
                sanitized_data["phoneNumber"] = phone_result["normalized"]
        
        # Sanitize text fields
        text_fields = ["firstName", "lastName", "address"]
        for field in text_fields:
            if field in citizen_data:
                sanitized_data[field] = self.sanitize_text(citizen_data[field], 100)
                if not sanitized_data[field]:
                    errors.append(f"{field}: Required field cannot be empty")
        
        # Validate date of birth
        if "dateOfBirth" in citizen_data:
            dob_result = self.validate_date(citizen_data["dateOfBirth"])
            if not dob_result["valid"]:
                errors.append(f"Date of Birth: {dob_result['error']}")
            else:
                sanitized_data["dateOfBirth"] = dob_result["parsed_date"]
        
        return {
            "valid": len(errors) == 0,
            "errors": errors,
            "sanitized_data": sanitized_data
        }

# Convenience functions for quick validation
def validate_nic(nic: str) -> bool:
    """Quick NIC validation"""
    validator = DataValidator()
    return validator.validate_nic(nic)["valid"]

def validate_email(email: str) -> bool:
    """Quick email validation"""
    validator = DataValidator()
    return validator.validate_email(email)["valid"]

def validate_phone(phone: str) -> bool:
    """Quick phone validation"""
    validator = DataValidator()
    return validator.validate_phone(phone)["valid"]

# Example usage
if __name__ == "__main__":
    validator = DataValidator()
    
    # Test NIC validation
    test_nics = ["199912345678", "991234567V", "invalid"]
    for nic in test_nics:
        result = validator.validate_nic(nic)
        print(f"NIC {nic}: {result}")
    
    # Test email validation
    test_emails = ["test@gov.lk", "invalid-email", "user@gmail.com"]
    for email in test_emails:
        result = validator.validate_email(email)
        print(f"Email {email}: {result}")
    
    # Test phone validation
    test_phones = ["+94771234567", "0771234567", "invalid"]
    for phone in test_phones:
        result = validator.validate_phone(phone)
        print(f"Phone {phone}: {result}")
 