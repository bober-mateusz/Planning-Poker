import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import UserCard from '../components/Cards/UserCard';
import EstimateCards from '../components/EstimateCards';
import FlexBox from '../components/FlexBox/FlexBox';
import GenericButton from '../components/Input/GenericButton';
import { useUserContext } from '../components/Context/UserContext';
import { useWebSocket } from '../components/Context/WebSocketContext'
import { useEffect } from 'react';


export default function PlanningPokerPage() {
  const { userName, userID, roomID, roomName} = useUserContext();
  const { socket } = useWebSocket();
  const [users] = useState([]);
  const [pointSelection] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  
  useEffect(() => {
    if (!socket) return;

    const handleMessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.action === 'ping') {
        console.log('Ping response:', message);
        // Optional: setUsers or update UI if needed
      }
    };

    socket.addEventListener('message', handleMessage);

    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket]);

  const sendPing = () => {
    socket.send(JSON.stringify({
      action: 'ping',
      userName,
      userID,
      roomID,
      roomName,
    }));
  };


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
        <GenericButton
          variant="contained"
          size="large"
          onClick={sendPing}
        >
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
          onClick={console.log("handle")}
          selectedValue={pointSelection}
        />
      </Box>
    </FlexBox>
  );
}
