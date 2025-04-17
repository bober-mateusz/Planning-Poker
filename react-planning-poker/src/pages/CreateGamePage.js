import * as React from 'react';
import { Typography, Paper } from '@mui/material';
import FlexBox from '../components/FlexBox/FlexBox';
import GenericTextField from '../components/Input/GenericTextField';
import GenericButton from '../components/Input/GenericButton';
import { useUserContext } from '../components/Context/UserContext';
import { useGameMutations } from '../hooks/mutations/useGameMutation';

export default function CreateGamePage() {
  const { userName, setUserName, roomName, setRoomName } = useUserContext();
  const { handleCreateGame, isLoading, error } = useGameMutations();

  return (
    <FlexBox>
      <Typography variant="h4" fontWeight="bold" sx={{ color: 'white' }}>
        Create a game!
      </Typography>

      {error && <Typography color="error">Error: {error.message}</Typography>}
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
          label="Game name"
          placeholder="Game Room Name"
          variant="filled"
          required
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />

        <GenericTextField
          label="Username"
          placeholder="Username"
          variant="filled"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <GenericButton
          onClick={() => handleCreateGame(roomName)}
          sx={{ width: '100%' }}
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Game'}
        </GenericButton>
      </Paper>
    </FlexBox>
  );
}
