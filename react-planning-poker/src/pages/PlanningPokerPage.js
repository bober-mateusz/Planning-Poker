/* eslint-disable no-undef */
import * as React from 'react';
import { Box, Typography, Switch, FormControlLabel } from '@mui/material';
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
  const [isContextLoaded, setIsContextLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [userVotes, setUserVotes] = useState({});
  const { socket } = useWebSocket();

  const [isRevealed, setIsRevealed] = useState(false);
  const [voteSubmission, setVoteSubmission] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    userID: userID,
    username: username,
  });
  const [isCreateRoomInviteSnackbarOpen, setIsCreateRoomInviteSnackbarOpen] =
    useState(false);
  const handleCreateRoomInviteSnackbarClose = () => {
    setIsCreateRoomInviteSnackbarOpen(false);
  };
  useEffect(() => {
    if (userID && username) {
      setCurrentUser({ userID, username });
    }
  }, [userID, username]);
  useEffect(() => {
    if (userID) {
      setIsContextLoaded(true);
    }
  }, [userID]);
  useEffect(() => {
    if (!isContextLoaded || !socket || !userID || !username || !roomID) return;
    console.log('blah');
    const joinRoom = () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            action: 'join-room',
            userID: userID,
            username: username,
            roomID: roomID,
          })
        );

        setTimeout(() => {
          socket.send(
            JSON.stringify({
              action: 'get-room-state',
              roomID,
            })
          );
        }, 100);
      }
    };

    const handleOpen = () => {
      joinRoom();
    };

    const handleMessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.action) {
        case 'users-updated':
          setUsers(data.users || []);
          break;
        case 'vote-submitted':
          setUserVotes(data.votes);
          console.log('users', users);
          break;
        case 'vote-removed':
          setUserVotes(data.votes);
          break;
        case 'visibility-updated':
          setIsRevealed(data.isRevealed);
          break;
        case 'room-state':
          setUsers(data.users || []);
          setUserVotes(data.votes || {});
          setIsRevealed(!!data.isRevealed);
          setVoteSubmission(data.votes?.[userID] || '');
          setHasVoted(!!data.votes?.[userID]);
          break;
        default:
          break;
      }
    };
    if (socket.readyState === WebSocket.CONNECTING) {
      console.log('Socket is connecting, waiting for open event');
      socket.addEventListener('open', joinRoom);
    } else if (socket.readyState === WebSocket.OPEN) {
      console.log('Socket is already open, joining room');
      joinRoom();
    }
    socket.addEventListener('message', handleMessage);

    return () => {
      socket.removeEventListener('message', handleMessage);
      socket.removeEventListener('open', handleOpen);
    };
  }, [socket, isContextLoaded, userID, username, roomID]);

  const getUserRows = () => {
    const currentUserFromArray = users.find((user) => {
      return user.userID === currentUser.userID;
    });

    const userToInsert = currentUserFromArray || currentUser;
    const otherUsers = users.filter(
      (user) => user.userID !== currentUser.userID
    );
    if (users.length <= 8) {
      const insertIndex = Math.floor(otherUsers.length / 2);
      return {
        topRow: [
          ...otherUsers.slice(0, insertIndex),
          userToInsert,
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
        userToInsert,
        ...rest.slice(insertIndex),
      ];
      return { topRow, bottomRow };
    }
  };
  const { topRow, bottomRow } = getUserRows();
  const handleVoteSubmission = (newVote) => {
    console.log(newVote);
    const vote = newVote === voteSubmission ? '' : newVote;
    setVoteSubmission(vote);
    setHasVoted(vote !== '');

    if (socket && socket.readyState === WebSocket.OPEN) {
      const action = vote ? 'vote-submitted' : 'vote-removed';
      socket.send(
        JSON.stringify({
          action: action,
          userID: userID,
          roomID: roomID,
          vote: vote,
        })
      );
    }
    console.log(userVotes);
  };

  const handleCreateRoomInvite = () => {
    navigator.clipboard.writeText(createRoomInvite(roomID));
    setIsCreateRoomInviteSnackbarOpen(true);
  };
  const handleVisibilityChange = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const newIsRevealed = !isRevealed;
      setIsRevealed(newIsRevealed);  // Update local state immediately
      socket.send(
        JSON.stringify({
          action: newIsRevealed ? 'reveal-votes' : 'hide-votes',
          roomID: roomID,
          isRevealed: newIsRevealed
        })
      );
    }
  };
  if (!isContextLoaded) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <FlexBox>
      <Box>
        <Typography variant="h4" fontWeight="bold" sx={{ color: 'white' }}>
          Planning Poker
        </Typography>
      </Box>
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Room: {roomname}
        </Typography>
      </Box>

      {/* Buttons */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <FormControlLabel
          control={
            <Switch
              checked={isRevealed}
              onChange={handleVisibilityChange}
              color="primary"
            />
          }
          label={isRevealed ? 'Hide Votes' : 'Show Votes'}
        />

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
              key={user.userID}
              username={user.username}
              points={
                isRevealed
                  ? user.userID === currentUser.userID
                    ? voteSubmission
                    : userVotes[user.userID] || ''
                  : ''
              }
              hasVoted={
                user.userID === currentUser.userID
                  ? hasVoted
                  : !!userVotes[user.userID]
              }
              isCurrentUser={user.userID === currentUser.userID}
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
          handleOnClick={handleVoteSubmission}
          selectedValue={voteSubmission}
        />
      </Box>
      <CreateRoomInviteSnackbar
        open={isCreateRoomInviteSnackbarOpen}
        handleClose={handleCreateRoomInviteSnackbarClose}
      />
    </FlexBox>
  );
}
