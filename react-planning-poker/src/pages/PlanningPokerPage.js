import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box, Typography } from '@mui/material';
import UserCard from '../components/Cards/UserCard';
import EstimateCards from '../components/EstimateCards';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import FlexBox from '../components/FlexBox/FlexBox';
import GenericButton from '../components/Input/GenericButton';

// Sample user data
const userNames = ['Hello', 'Hello2'];
var roomId = 1;

export default function PlanningPokerPage() {
  const [user] = React.useState(userNames[0]);
  const [isRevealed, setIsRevealed] = React.useState(false);
  const [pointSelection, setPointSelection] = React.useState('?');
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
  localStorage.setItem('userId', userId);

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

  const handleVote = (vote) => {
    sendMessage(JSON.stringify({ action: 'vote', roomId, userId, vote }));
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
        {userNames.map((userName) => (
          <UserCard
            key={userName}
            userName={userName}
            points={isRevealed && userName === user ? pointSelection : '?'}
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
        <EstimateCards handleOnClick={handlePointSelection} />
      </Box>
      <Box>
        <GenericButton onClick={() => handleVote(3)}>Vote 3</GenericButton>
      </Box>
    </FlexBox>
  );
}
