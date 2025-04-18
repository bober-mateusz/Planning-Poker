/* eslint-disable no-undef */
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../components/Context/UserContext';
import { useWebSocket } from '../../components/Context/WebSocketContext';
import { useGameAPI } from '../api/useGameAPI';

export const useGameMutations = () => {
  const { username, setUserName, setUserID, setRoomID, USER_STORAGE_KEY } =
    useUserContext();
  const { setSocket } = useWebSocket();
  const navigate = useNavigate();
  const { createUser, createRoom } = useGameAPI();

  const createRoomMutation = useMutation({
    mutationFn: createRoom,
    onSuccess: (data) => {
      console.log(data);
      const { roomID, userID: returnedUserID } = data;
      if (!roomID || !returnedUserID) {
        console.error('Missing roomID or userID in response');
        return;
      }

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
      console.log('Error creating room:', error);
      console.error('Error creating game:', error.message);
    },
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      const { userID } = data;
      if (!userID) {
        console.log(data);
        console.error('Missing userID in response');
        return;
      }
      console.log('User created:', userID);
      setUserID(userID);
      setUserName(username);
      localStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify({ userID: data.userID, timestamp: Date.now() })
      );
    },
    onError: (error) => {
      console.error('Error creating user:', error.message);
    },
  });

  const handleCreateGame = async (roomname) => {
    try {
      const userData = await createUserMutation.mutateAsync();
      await createRoomMutation.mutateAsync({
        roomname,
        username,
        userID: userData.userID,
      });
    } catch (error) {
      console.error('Error in create game flow:', error);
    }
  };

  return {
    handleCreateGame,
    isLoading: createUserMutation.isPending || createRoomMutation.isPending,
    error: createUserMutation.error || createRoomMutation.error,
  };
};
