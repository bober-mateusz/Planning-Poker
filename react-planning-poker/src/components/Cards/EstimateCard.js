import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Card, ButtonBase } from '@mui/material';

export default function EstimateCard({ value, selected }) {
  return (
    <ButtonBase key={value} sx={{ borderRadius: 2 }}>
      <Card
        onClick={console.log("onclick")}
        sx={{
          width: { xs: 60, sm: 80, md: 100 }, // Responsive width
          height: { xs: 60, sm: 80, md: 100 }, // Responsive height
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          cursor: 'pointer',
          transition: '0.2s',
          '&:hover': { bgcolor: 'primary.light' }, // Accessing theme color
          borderRadius: (theme) => theme.shape.borderRadius * 1, // Accessing theme shape value
          boxShadow: (theme) => theme.shadows[7], // Accessing theme shadow
          backgroundColor: (theme) =>
            selected
              ? theme.palette.primary.main
              : theme.palette.background.unselected, // Accessing theme color
          color: (theme) =>
            selected
              ? theme.palette.primary.contrastText
              : theme.palette.text.primary,
          padding: (theme) => theme.spacing(2), // Accessing theme spacing
        }}
      >
        <Typography variant="h4">{value}</Typography>
      </Card>
    </ButtonBase>
  );
}

// **PropTypes Validation**
EstimateCard.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Allow string or number
  selected: PropTypes.bool, // Optional boolean prop
};
