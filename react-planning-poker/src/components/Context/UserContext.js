import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext(null);
const USER_STORAGE_KEY = 'pp_user';
const EXPIRY_HOURS = 12;

export const UserContextProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState(''); // userName state
  const [userSocket, setUserSocket] = useState(null); // userSocket state
  const [roomID, setRoomID] = useState(''); // roomID state
  const [roomName, setRoomName] = useState(''); // roomName state

  useEffect(() => {
    const fetchUserID = async () => {
      const stored = localStorage.getItem(USER_STORAGE_KEY);

      let shouldFetchNewUser = true;

      if (stored) {
        try {
          const { userID, timestamp } = JSON.parse(stored);
          const isExpired =
            Date.now() - timestamp > EXPIRY_HOURS * 60 * 60 * 1000;

          if (userID && !isExpired) {
            setUserID(userID); // Sets userID from localStorage
            shouldFetchNewUser = false;
            console.log('Loaded userID from localStorage:', userID);
          }
        } catch (err) {
          console.warn('Corrupt localStorage entry, resetting userID');
        }
      }

      if (shouldFetchNewUser) {
        try {
          const response = await fetch('http://localhost:8080/api/create-user');
          const data = await response.json();

          setUserID(data.userID); // Sets userID from API response
          localStorage.setItem(
            USER_STORAGE_KEY,
            JSON.stringify({ userID: data.userID, timestamp: Date.now() })
          );
          console.log('Fetched new userID:', data.userID);
        } catch (error) {
          console.error('Error fetching user ID:', error);
        }
      }
    };

    fetchUserID();
  }, []);

  // Providing context values to children components
  return (
    <UserContext.Provider
      value={{
        userID,
        userName,
        userSocket,
        roomID,
        roomName,
        setUserName, // Setter for userName
        setUserSocket, // Setter for userSocket
        setRoomID, // Setter for roomID
        setRoomName, // Setter for roomName
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
