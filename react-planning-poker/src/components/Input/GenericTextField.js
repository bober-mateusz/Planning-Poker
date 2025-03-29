import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { TextField } from '@mui/material';

function GenericTextField({
  label = 'Enter text here', // Default label
  placeholder = 'Type here',
  value,
  onChange,
  sx = {},
  ...props
}) {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      sx={{
        ...sx, // External styles
      }}
      {...props} // Pass other props like error, helperText, etc.
    />
  );
}

// ✅ Add PropTypes validation
GenericTextField.propTypes = {
  label: PropTypes.string, // Label must be a string
  placeholder: PropTypes.string, // Placeholder must be a string
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Value can be string or number
  onChange: PropTypes.func.isRequired, // onChange must be a function (required)
  sx: PropTypes.object, // Custom styles object
};

export default GenericTextField;
