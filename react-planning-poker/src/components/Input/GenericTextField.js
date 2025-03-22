import React from 'react';
import { TextField } from '@mui/material';

export default function GenericTextField({
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
