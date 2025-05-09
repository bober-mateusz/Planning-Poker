import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

export default function FlexBox({ children, sx = {}, ...props }) {
  return (
    <>
      {/* This should probably be moved to a header component */}
      <Link to="/" style={{ position: 'absolute', top: 10, left: 10 }}>
        <HomeIcon fontSize="large" sx={{ color: 'secondary.main' }} />
      </Link>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        flexWrap="wrap"
        flexDirection="column"
        sx={{ position: 'relative', ...sx }}
        {...props}
      >
        {children}
      </Box>
    </>
  );
}

// ✅ Add PropTypes validation
FlexBox.propTypes = {
  children: PropTypes.node, // 'children' can be any valid React node
  sx: PropTypes.object, // 'sx' is an object (used for styles)
};
