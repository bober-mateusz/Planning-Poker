import * as React from 'react';
import { useState } from 'react';
import { Typography, Paper } from '@mui/material';
import FlexBox from '../FlexBox/FlexBox';
import GenericTextField from '../Input/GenericTextField';
import GenericButton from '../Input/GenericButton';
import { useUserContext } from '../Context/UserContext';

export default function CreateUserModal({ onSubmit, isLoading }) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name);
    }
  };

  return (
    <FlexBox>
      <Typography variant="h4" fontWeight="bold" sx={{ color: 'white' }}>
        Enter your name
      </Typography>
      <Paper
        sx={{
          display: 'flex',
          p: 4,
          m: 2,
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <GenericTextField
          label="Username"
          placeholder="Enter your name"
          variant="filled"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <GenericButton
          onClick={handleSubmit}
          sx={{ width: '100%' }}
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Join Game'}
        </GenericButton>
      </Paper>
    </FlexBox>
  );
}
