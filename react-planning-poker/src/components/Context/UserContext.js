/* eslint-disable no-undef */
import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext(null);

const EXPIRY_HOURS = 12;

export const UserContextProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState(''); // userName state
  const [userSocket, setUserSocket] = useState(null); // userSocket state
  const [roomID, setRoomID] = useState(''); // roomID state
  const [roomName, setRoomName] = useState(''); // roomName state
  const USER_STORAGE_KEY = 'pp_user';

  // Fetches the user ID from localStorage if it exists
  // This runs on startup of the app
  const fetchUserID = async () => {
    const stored = localStorage.getItem(USER_STORAGE_KEY);

    if (stored) {
      try {
        const { userID, timestamp } = JSON.parse(stored);
        const isExpired =
          Date.now() - timestamp > EXPIRY_HOURS * 60 * 60 * 1000;

        if (userID && !isExpired) {
          setUserID(userID); // Sets userID from localStorage
          // shouldFetchNewUser = false;
          console.log('Loaded userID from localStorage:', userID);
        }
      } catch (err) {
        console.warn('No userID found in localStorage:', err);
      }
    }
  };

  useEffect(() => {
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
        USER_STORAGE_KEY, //Including this in context for now, should be in a constants file
        setUserName, // Setter for userName
        setUserID, // Setter for userID
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
