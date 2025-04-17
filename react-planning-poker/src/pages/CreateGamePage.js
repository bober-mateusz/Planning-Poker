import * as React from 'react';
import { Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import FlexBox from '../components/FlexBox/FlexBox';
import GenericTextField from '../components/Input/GenericTextField';
import GenericButton from '../components/Input/GenericButton';
import { useUserContext } from '../components/Context/UserContext';
import { useWebSocket } from '../components/Context/WebSocketContext';

const createGame = async ({ roomName, userName, userID }) => {
  const response = await fetch('http://localhost:8080/api/rooms/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ roomName, userName, userID }),
  });

  if (!response.ok) {
    throw new Error('Failed to create game');
  }

  return response.json();
};

export default function CreateGamePage() {
  const { userName, setUserName, userID, setRoomID, roomName, setRoomName } =
    useUserContext();
  const { setSocket } = useWebSocket();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createGame,
    onSuccess: (data) => {
      const { roomID, userID: returnedUserID } = data;
      if (!roomID || !returnedUserID) {
        console.error('Missing roomID or userID in response');
        return;
      }
      console.log('Created roomID', roomID, userID);

      const socket = new WebSocket('ws://localhost:8080/ws/poker');
      setRoomID(roomID);
      setSocket(socket);

      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            action: 'join-room',
            roomID,
            userID: returnedUserID,
          })
        );
      };

      socket.onmessage = (event) => {
        console.log('Message from server:', event.data);
      };

      navigate('/planning-poker');
    },
    onError: (error) => {
      console.error('Error creating game:', error.message);
    },
  });

  const handleCreateGame = () => {
    mutation.mutate({ roomName, userName, userID });
  };

  return (
    <FlexBox>
      <Typography variant="h4" fontWeight="bold" sx={{ color: 'white' }}>
        Create a game!
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
          onClick={handleCreateGame}
          sx={{ width: '100%' }}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Creating...' : 'Create Game'}
        </GenericButton>
      </Paper>
    </FlexBox>
  );
}
