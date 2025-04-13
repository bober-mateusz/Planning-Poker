import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import UserCard from '../components/Cards/UserCard';
import EstimateCards from '../components/EstimateCards';
import FlexBox from '../components/FlexBox/FlexBox';
import GenericButton from '../components/Input/GenericButton';
import { useUserContext } from '../components/Context/UserContext';
import { useWebSocket } from '../components/Context/WebSocketContext';

export default function PlanningPokerPage() {
  const { userName, userID, roomID, roomName} = useUserContext();
  const { socket: userSocket } = useWebSocket();

  const [users, setUsers] = useState([]);
  const [pointSelection, setPointSelection] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);

  // Fetch users on load
  useEffect(() => {
    if (!userSocket) return;

    const handleMessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.action === 'update-room') {
        setUsers(message.users || []);
      }
    };

    userSocket.addEventListener('message', handleMessage);

    if (userSocket.readyState === WebSocket.OPEN) {
      userSocket.send(JSON.stringify({ action: 'join-room', roomID, userID }));
    } else {
      const handleOpen = () => {
        userSocket.send(JSON.stringify({ action: 'join-room', roomID, userID }));
      };
      userSocket.addEventListener('open', handleOpen);
      return () => userSocket.removeEventListener('open', handleOpen);
    }

    return () => userSocket.removeEventListener('message', handleMessage);
  }, [userSocket, roomID, userID]);

  // Local voting only
  const handlePointSelection = useCallback(
    (newPoint) => {
      setPointSelection((prev) => (prev === newPoint ? '' : newPoint));
    },
    []
  );

  const handleRevealPoints = () => setIsRevealed(true);
  const handleHidePoints = () => setIsRevealed(false);

  // Organize user rows
  const getUserRows = () => {
    const others = users.filter((u) => u !== userName);
    if (users.length <= 8) {
      const insertIndex = Math.floor(others.length / 2);
      return {
        topRow: [
          ...others.slice(0, insertIndex),
          userName,
          ...others.slice(insertIndex),
        ],
        bottomRow: [],
      };
    } else {
      const topRow = others.slice(0, 8);
      const rest = others.slice(8);
      const insertIndex = Math.floor(rest.length / 2);
      return {
        topRow,
        bottomRow: [
          ...rest.slice(0, insertIndex),
          userName,
          ...rest.slice(insertIndex),
        ],
      };
    }
  };

  const { topRow, bottomRow } = getUserRows();

  return (
    <FlexBox>
      <Box>
        <Typography variant="h4" fontWeight="bold" sx={{ color: 'white' }}>
          Planning Poker
        </Typography>
      </Box>
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Room: {roomName}  
        </Typography>
        <Typography variant="h4" fontWeight="bold">
        RoomID: {roomID}
        </Typography>
        <Typography variant="h4" fontWeight="bold">
        USERID {userID}
        </Typography>
        <Typography variant="h4" fontWeight="bold">
        USERNAME {userName}
        </Typography>
      </Box>

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
              userName={user}
              points={isRevealed && user === userName ? pointSelection : ''}
              hasVoted={user === userName && !!pointSelection}
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
    </FlexBox>
  );
}
