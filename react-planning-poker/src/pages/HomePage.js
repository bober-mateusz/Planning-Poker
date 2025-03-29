import * as React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation
import FlexBox from '../components/FlexBox/FlexBox';
import GenericButton from '../components/Input/GenericButton';

export default function HomePage() {
  return (
    <FlexBox>
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{ marginBottom: 4, color: 'white' }}
      >
        Create a game!
      </Typography>
      <Typography
        variant="h6"
        sx={{ marginBottom: 4, color: 'white', textAlign: 'center' }}
      >
        A simple way to estimate and plan your projects with your team. Click
        below to start a new planning session.
      </Typography>
      <Link to="/create-game" style={{ textDecoration: 'none' }}>
        <GenericButton
          variant="contained"
          color="primary"
          size="large"
          sx={{
            padding: '10px 20px',
            borderRadius: 3,
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          Start Planning Poker
        </GenericButton>
      </Link>
    </FlexBox>
  );
}
