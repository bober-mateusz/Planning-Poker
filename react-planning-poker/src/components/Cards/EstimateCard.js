import React from 'react';
import Typography from '@mui/material/Typography';
import { Card, ButtonBase } from '@mui/material';

export default function EstimateCard({ value, handleOnClick }) {
  return (
    <ButtonBase key={value} sx={{ borderRadius: 2 }}>
      <Card
        onClick={() => handleOnClick(value)}
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
          backgroundColor: (theme) => theme.palette.primary.contrastText, // Accessing theme color
          padding: (theme) => theme.spacing(2), // Accessing theme spacing
        }}
      >
        <Typography variant="h4">{value}</Typography>
      </Card>
    </ButtonBase>
  );
}
