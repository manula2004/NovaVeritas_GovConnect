import React, { useState } from 'react';
import EyeIcon from '../assets/Icons/EyeIcon';
import './InputWithIcon.css';

const PasswordInput = ({ ...props }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="input-with-icon right-icon">
      <input
        {...props}
        type={visible ? 'text' : 'password'}
        className="form-input"
      />
      <button
        type="button"
        className="toggle-password"
        onClick={() => setVisible(!visible)}
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        <EyeIcon />
      </button>
    </div>
  );
};

export default PasswordInput;