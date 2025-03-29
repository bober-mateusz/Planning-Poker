import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Button } from '@mui/material';

// Make the button customizable with props
function GenericButton({
  children, // To allow dynamic text inside the button
  onClick, // To handle button click events
  variant = 'contained', // Default variant (can be overridden)
  color = 'primary', // Default color (can be overridden)
  sx = {}, // For custom styling
  ...props // To handle any other props
}) {
  return (
    <Button
      variant={variant} // "contained", "outlined", etc.
      color={color} // "primary", "secondary", etc.
      onClick={onClick} // Button click handler
      sx={sx} // Custom styles
      {...props} // Other props like `disabled`, `size`, etc.
    >
      {children}
    </Button>
  );
}

// ✅ Add PropTypes validation
GenericButton.propTypes = {
  children: PropTypes.node.isRequired, // Ensures the button has content
  onClick: PropTypes.func, // Function for handling clicks
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']), // Restricts to valid MUI variants
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'error',
    'info',
    'warning',
  ]), // Restricts to valid MUI colors
  sx: PropTypes.object, // Custom styles object
};

export default GenericButton;
