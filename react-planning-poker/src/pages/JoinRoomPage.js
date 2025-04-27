/* eslint-disable no-undef */
import * as React from 'react';
import { useUserContext } from '../components/Context/UserContext';
import { useGameMutations } from '../hooks/mutations/useGameMutation';
import CreateUserModal from '../components/Modals/CreateUserModal';
import { useParams } from 'react-router-dom';

export default function JoinRoomPage() {
  const { roomID } = useParams();
  const { setUserName } = useUserContext();
  const { createUserMutation, addUserToRoomMutation } = useGameMutations();
  console.log('In JoinRoomPage, roomID:', roomID);
  const [pageIsLoading, setPageIsLoading] = React.useState(false);
  const handleJoinRoom = async (username) => {
    setPageIsLoading(true);
    setUserName(username);
    try {
      const userData = await createUserMutation.mutateAsync(username);
      console.log('user created:', userData);

      await addUserToRoomMutation.mutateAsync({
        roomID,
        userID: userData.userID,
      });
      // Handle successful room join logic here
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Error joining room:', error);
      // Handle error logic here
    } finally {
      setPageIsLoading(false);
    }
  };
  return (
    <CreateUserModal onSubmit={handleJoinRoom} isLoading={pageIsLoading} />
  );
}
