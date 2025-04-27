/* eslint-disable no-undef */
import * as React from 'react';
import { Box, Typography } from '@mui/material';
import UserCard from '../components/Cards/UserCard';
import EstimateCards from '../components/EstimateCards';
import { useEffect, useState } from 'react';
import FlexBox from '../components/FlexBox/FlexBox';
import GenericButton from '../components/Input/GenericButton';
import { useUserContext } from '../components/Context/UserContext';
import { createRoomInvite } from '../hooks/utils/createRoomInvite';
import CreateRoomInviteSnackbar from '../components/Snackbars/CreateRoomInviteSnackbar';
import { useWebSocket } from '../components/Context/WebSocketContext';

export default function PlanningPokerPage() {
  const { username, roomID, roomname, userID } = useUserContext();
  const [users, setUsers] = useState([username]);
  const { socket } = useWebSocket();
  const [currentUser] = useState(username);
  const [isCreateRoomInviteSnackbarOpen, setIsCreateRoomInviteSnackbarOpen] =
    useState(false);
  const handleCreateRoomInviteSnackbarClose = () => {
    setIsCreateRoomInviteSnackbarOpen(false);
  };

  useEffect(() => {
    console.log('roomname:', roomname);
    console.log('userid:', userID);
    if (!socket) return;

    const handleMessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.action) {
        case 'users-updated':
          setUsers(data.users);
          break;
        default:
          break;
      }
    };

    socket.addEventListener('message', handleMessage);

    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket]);

  const getUserRows = () => {
    const currentUserIndex = users.indexOf(currentUser);
    const otherUsers = [
      ...users.slice(0, currentUserIndex),
      ...users.slice(currentUserIndex + 1),
    ];

    if (users.length <= 8) {
      const insertIndex = Math.floor(otherUsers.length / 2);
      return {
        topRow: [
          ...otherUsers.slice(0, insertIndex),
          currentUser,
          ...otherUsers.slice(insertIndex),
        ],
        bottomRow: [],
      };
    } else {
      const topRow = otherUsers.slice(0, 8);
      const rest = otherUsers.slice(8);
      const insertIndex = Math.floor(rest.length / 2);
      const bottomRow = [
        ...rest.slice(0, insertIndex),
        currentUser,
        ...rest.slice(insertIndex),
      ];
      return { topRow, bottomRow };
    }
  };

  const { topRow, bottomRow } = getUserRows();
  const [isRevealed, setIsRevealed] = useState(false);
  const [pointSelection, setPointSelection] = useState('');
  const [hasVoted, setHasVoted] = useState(false);

  const handlePointSelection = (newPoint) => {
    setPointSelection(newPoint === pointSelection ? '' : newPoint);
    setHasVoted(newPoint !== pointSelection);
  };

  const handleRevealPoints = () => setIsRevealed(true);
  const handleHidePoints = () => setIsRevealed(false);


  const handleCreateRoomInvite = () => {
    navigator.clipboard.writeText(createRoomInvite(roomID));
    setIsCreateRoomInviteSnackbarOpen(true);
  };

  return (
    <FlexBox>
      <Box>
        <Typography variant="h4" fontWeight="bold" sx={{ color: 'white' }}>
          Planning Poker
        </Typography>
      </Box>
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Room: {roomID}
        </Typography>
      </Box>

      {/* Buttons */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <GenericButton
          variant="contained"
          size="large"
          onClick={handleRevealPoints}
          disabled={isRevealed}
        >
          Reveal
        </GenericButton>

        <GenericButton
          variant="contained"
          size="large"
          onClick={handleHidePoints}
          disabled={!isRevealed}
        >
          Hide
        </GenericButton>

        <GenericButton variant="contained" size="large">
          Ping
        </GenericButton>
        <GenericButton
          variant="contained"
          size="large"
          onClick={handleCreateRoomInvite}
        >
          Invite
        </GenericButton>
      </Box>

      {[topRow, bottomRow].map((row, i) => (
        <Box
          key={i}
          display="flex"
          justifyContent="center"
          gap={2}
          flexWrap="no-wrap"
          flexDirection="row"
        >
          {row.map((user) => (
            <UserCard
              key={user}
              username={user}
              points={isRevealed && user === currentUser ? pointSelection : ''}
              hasVoted={user === currentUser && hasVoted}
            />
          ))}
        </Box>
      ))}

      <Box
        display="flex"
        justifyContent="center"
        flexDirection="row"
        width="100%"
        sx={{ marginTop: 3 }}
      >
        <EstimateCards
          handleOnClick={handlePointSelection}
          selectedValue={pointSelection}
        />
      </Box>
      <CreateRoomInviteSnackbar
        open={isCreateRoomInviteSnackbarOpen}
        handleClose={handleCreateRoomInviteSnackbarClose}
      />
    </FlexBox>
  );
}
