import * as React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import FlexBox from '../components/FlexBox/FlexBox';
import GenericTextField from '../components/Input/GenericTextField';
import { Paper } from '@mui/material';
import GenericButton from '../components/Input/GenericButton';
export default function CreateGamePage() {
  return (
    <FlexBox>
      {/* Title */}
      <Typography variant="h4" fontWeight="bold" sx={{ color: 'white' }}>
        Create a game!
      </Typography>

      <Paper
        sx={{
          display: 'flex',
          p: 4,
          m: 2,
          alignContent: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <GenericTextField
          placeholder="Game Room Name"
          label="Game name"
          variant="filled"
        ></GenericTextField>

        <Link to="/planning-poker" style={{ textDecoration: 'none' }}>
          <GenericButton sx={{ width: '100%' }}>Enter Game</GenericButton>
        </Link>
      </Paper>
    </FlexBox>
  );
}
