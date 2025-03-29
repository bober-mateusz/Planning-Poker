import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Box } from '@mui/material';

export default function Background({ children, sx = {}, ...props }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      padding={3}
      sx={{
        background:
          'linear-gradient(135deg, rgba(0, 0, 255, 0.7), rgba(0, 0, 128, 0.7))', // Blue gradient
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...sx, // Allow external styles to override defaults
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

// ✅ Add PropTypes validation
Background.propTypes = {
  children: PropTypes.node, // 'children' can be any valid React node
  sx: PropTypes.object, // 'sx' is an object (used for styles)
};
