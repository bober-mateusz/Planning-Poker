/* eslint-disable no-undef */
import * as React from 'react';
import { Box, Typography } from '@mui/material';
import UserCard from '../components/Cards/UserCard';
import EstimateCards from '../components/EstimateCards';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import FlexBox from '../components/FlexBox/FlexBox';
import GenericButton from '../components/Input/GenericButton';
import { useUserContext } from '../components/Context/UserContext';

export default function PlanningPokerPage() {
  // Local client list (simulate all users)
  const { userName, roomID, roomName, userID } = useUserContext();
  const getAllClients = () => [userName, '1', '2', '3', '4', '5'];
  const users = getAllClients();
  const [currentUser] = useState(userName);

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

  // Ping logic only
  const { sendMessage, lastJsonMessage } = useWebSocket(
    'ws://localhost:8080/ws/poker',
    {
      shouldReconnect: () => false, // Only used for ping
    }
  );

  useEffect(() => {
    if (!lastJsonMessage) return;
    if (lastJsonMessage.action === 'ping') {
      console.log('Ping response:', lastJsonMessage);
    }
  }, [lastJsonMessage]);

  const sendPing = () => {
    sendMessage(
      JSON.stringify({
        action: 'ping',
        userID,
        userName,
        roomID,
        roomName,
      })
    );
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

        <GenericButton variant="contained" size="large" onClick={sendPing}>
          Ping
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
    </FlexBox>
  );
}
