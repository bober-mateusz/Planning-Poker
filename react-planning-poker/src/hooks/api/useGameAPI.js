/* eslint-disable no-undef */
export const useGameAPI = () => {
  const createUser = async () => {
    const response = await fetch('http://localhost:8080/api/create-user');
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return response.json();
  };

  const createRoom = async ({ roomName, userName, userID }) => {
    console.log('Creating room with:', { roomName, userName, userID });
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
  return {
    createUser,
    createRoom,
  };
};
