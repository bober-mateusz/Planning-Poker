/* eslint-disable no-undef */
import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext(null);

const EXPIRY_HOURS = 12;

export const UserContextProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);
  const [username, setUserName] = useState(''); // username state
  const [userSocket, setUserSocket] = useState(null); // userSocket state
  const [roomID, setRoomID] = useState(''); // roomID state
  const [roomname, setRoomName] = useState(''); // roomname state
  const USER_STORAGE_KEY = 'pp_user';
  const getStorageKey = (key) => {
    if (key === 'userID') {
      return `${USER_STORAGE_KEY}_${key}`;
    }
    return `${USER_STORAGE_KEY}_${userID}_${key}`;
  };

  useEffect(() => {
    if (!userID) {
      const stored = localStorage.getItem(`${USER_STORAGE_KEY}_userID`);
      if (stored) {
        const { value, timestamp } = JSON.parse(stored);
        const isExpired =
          Date.now() - timestamp > EXPIRY_HOURS * 60 * 60 * 1000;
        if (!isExpired) setUserID(value);
      }
    } else {
      localStorage.setItem(
        `${USER_STORAGE_KEY}_userID`,
        JSON.stringify({
          value: userID,
          timestamp: Date.now(),
        })
      );
    }
  }, [userID]);

  useEffect(() => {
    if (!username && userID) {
      const stored = localStorage.getItem(getStorageKey('username'));
      if (stored) {
        const { value, timestamp } = JSON.parse(stored);
        const isExpired =
          Date.now() - timestamp > EXPIRY_HOURS * 60 * 60 * 1000;
        if (!isExpired) setUserName(value);
      }
    } else if (username && userID) {
      localStorage.setItem(
        getStorageKey('username'),
        JSON.stringify({
          value: username,
          timestamp: Date.now(),
        })
      );
    }
  }, [username, userID]);

  useEffect(() => {
    if (!roomID && userID) {
      const stored = localStorage.getItem(getStorageKey('roomID'));
      if (stored) {
        const { value, timestamp } = JSON.parse(stored);
        const isExpired =
          Date.now() - timestamp > EXPIRY_HOURS * 60 * 60 * 1000;
        if (!isExpired) setRoomID(value);
      }
    } else if (roomID && userID) {
      localStorage.setItem(
        getStorageKey('roomID'),
        JSON.stringify({
          value: roomID,
          timestamp: Date.now(),
        })
      );
    }
  }, [roomID, userID]);

  useEffect(() => {
    if (!roomname && userID) {
      const stored = localStorage.getItem(getStorageKey('roomname'));
      if (stored) {
        const { value, timestamp } = JSON.parse(stored);
        const isExpired =
          Date.now() - timestamp > EXPIRY_HOURS * 60 * 60 * 1000;
        if (!isExpired) setRoomName(value);
      }
    } else if (roomname && userID) {
      localStorage.setItem(
        getStorageKey('roomname'),
        JSON.stringify({
          value: roomname,
          timestamp: Date.now(),
        })
      );
    }
  }, [roomname, userID]);

  // Providing context values to children components
  return (
    <UserContext.Provider
      value={{
        userID,
        username,
        userSocket,
        roomID,
        roomname,
        USER_STORAGE_KEY, //Including this in context for now, should be in a constants file
        setUserName, // Setter for username
        setUserID, // Setter for userID
        setUserSocket, // Setter for userSocket
        setRoomID, // Setter for roomID
        setRoomName, // Setter for roomname
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
