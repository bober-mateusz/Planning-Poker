import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box, Typography } from '@mui/material';
import UserCard from '../components/Cards/UserCard';
import EstimateCards from '../components/EstimateCards';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import FlexBox from '../components/FlexBox/FlexBox';
import GenericButton from '../components/Input/GenericButton';

var roomId = 1;

export default function PlanningPokerPage() {
  const getAllClients = () => {
    return [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
    ];
  };
  const users = getAllClients();
  const [currentUser] = React.useState(users[0]);
  const getUserRows = () => {
    const currentUserIndex = users.indexOf(currentUser);
    const otherUsers = [
      ...users.slice(0, currentUserIndex),
      ...users.slice(currentUserIndex + 1),
    ];

    if (users.length <= 8) {
      // All users fit in a single row
      const insertIndex = Math.floor(otherUsers.length / 2);
      const singleRow = [
        ...otherUsers.slice(0, insertIndex),
        currentUser,
        ...otherUsers.slice(insertIndex),
      ];
      return { topRow: singleRow, bottomRow: [] };
    } else {
      // Split into two rows: 8 top, rest bottom
      const topRow = otherUsers.slice(0, 8);
      const bottomRest = otherUsers.slice(8);
      const insertIndex = Math.floor(bottomRest.length / 2);
      const bottomRow = [
        ...bottomRest.slice(0, insertIndex),
        currentUser,
        ...bottomRest.slice(insertIndex),
      ];
      return { topRow, bottomRow };
    }
  };

  const { topRow, bottomRow } = getUserRows();
  const [isRevealed, setIsRevealed] = React.useState(false);
  const [pointSelection, setPointSelection] = React.useState('');
  const handlePointSelection = React.useCallback((newPoint) => {
    setPointSelection(newPoint);
  });
  const handleRevealPoints = React.useCallback(() => {
    if (isRevealed == false) setIsRevealed(!isRevealed);
  });
  const handleHidePoints = React.useCallback(() => {
    if (isRevealed == true) {
      setIsRevealed(!isRevealed);
    }
  });

  const [, setUsers] = useState(0);
  const [, setVotes] = useState({});
  const userId = localStorage.getItem('userId') || uuidv4();
  // localStorage.setItem('userId', userId);

  // The API calls ultimately should be refactored into its own file
  const { sendMessage, lastJsonMessage } = useWebSocket(
    'ws://localhost:8080/poker',
    {
      onOpen: () =>
        sendMessage(JSON.stringify({ action: 'join-room', roomId, userId })),
    }
  );

  useEffect(() => {
    if (lastJsonMessage) {
      if (lastJsonMessage.action === 'update-room') {
        setUsers(lastJsonMessage.users);
      } else if (lastJsonMessage.action === 'vote-update') {
        setVotes(lastJsonMessage.votes);
      }
    }
  }, [lastJsonMessage]);

  // const handleVote = (vote) => {
  //   sendMessage(JSON.stringify({ action: 'vote', roomId, userId, vote }));
  // };

  return (
    <FlexBox>
      <Box>
        <Typography variant="h4" fontWeight="bold" sx={{ color: 'white' }}>
          Planning Poker
        </Typography>
      </Box>
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Room: {roomId}
        </Typography>
      </Box>
      {/* Title */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <GenericButton
          variant="contained"
          size="large"
          onClick={handleRevealPoints}
          disabled={isRevealed} // Disable when points are already revealed
        >
          Reveal
        </GenericButton>

        <GenericButton
          variant="contained"
          size="large"
          onClick={handleHidePoints}
          disabled={!isRevealed} // Disable when points are already hidden
        >
          Hide
        </GenericButton>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        gap={2}
        flexWrap="no-wrap"
        flexDirection="row"
      >
        {topRow.map((user) => (
          <UserCard
            key={user}
            userName={user}
            points={isRevealed && user === currentUser ? pointSelection : ''}
            hasVoted={
              user === currentUser &&
              pointSelection !== '' &&
              pointSelection !== undefined
            } // Check if the user has voted
          />
        ))}
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        gap={2}
        flexWrap="no-wrap"
        flexDirection="row"
      >
        {bottomRow.map((user) => (
          <UserCard
            key={user}
            userName={user}
            points={isRevealed && user === currentUser ? pointSelection : ''}
            hasVoted={
              user === currentUser &&
              pointSelection !== '' &&
              pointSelection !== undefined
            }
          />
        ))}
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="row"
        width="100%"
        sx={{ marginTop: 3 }} // Adds margin to the top of the EstimateCards
      >
        <EstimateCards
          handleOnClick={handlePointSelection}
          selectedValue={pointSelection}
        />
      </Box>
    </FlexBox>
  );
}
