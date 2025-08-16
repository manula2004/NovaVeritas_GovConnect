import React from 'react';
import PropTypes from 'prop-types';
import EmailIcon from '../assets/Icons/EmailIcon';
import './InputWithIcon.css';


const InputWithIcon = ({
  type = 'text',
  placeholder = '',
  iconColor = '#033EA1',
  iconPosition = 'right',
  icon: IconComponent,
  showIcon = true,
  ...inputProps
}) => {
  return (
    <div className={`input-with-icon ${iconPosition}-icon`}>
      <input
        type={type}
        placeholder={placeholder}
        className="form-input"
        {...inputProps}
      />
      {showIcon && (
        <span className="input-icon" style={{ color: iconColor }}>
          {IconComponent ? <IconComponent /> : <EmailIcon />}
        </span>
      )}
    </div>
  );
};


InputWithIcon.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  iconColor: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  icon: PropTypes.elementType,
  showIcon: PropTypes.bool,
};

export default InputWithIcon;