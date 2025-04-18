/* eslint-disable no-undef */
export const useGameAPI = () => {
  const createUser = async () => {
    const response = await fetch('http://localhost:8080/api/create-user');
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return response.json();
  };

  const createRoom = async ({ roomname, username, userID }) => {
    console.log('Creating room with:', { roomname, username, userID });
    const response = await fetch('http://localhost:8080/api/rooms/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, userID, roomname }),
    });
    if (!response.ok) {
      throw new Error('Failed to create game');
    }

    return response.json();
  };

  const getAllUsers = async () => {
    const response = await fetch('http://localhost:8080/api/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  };

  return {
    createUser,
    createRoom,
    getAllUsers,
  };
};
