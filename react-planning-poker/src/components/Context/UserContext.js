import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { v4 as uuidv4 } from 'uuid';

// Create a UserContext to manage the user ID
const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  // State to store the user ID
  const [userId, setUserId] = useState(null);

  // Generate a user ID when the context is initialized
  useEffect(() => {
    const generatedUserId = uuidv4(); // You can use any UUID library or custom logic here
    setUserId(generatedUserId); // Set the user ID
    console.log(generatedUserId);
  }, []); // This runs once on component mount

  // Provide the userId value to children components
  return (
    <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>
  );
};

// Custom hook to access the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};

// Define prop types for UserContextProvider
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // This validates that children is required and can be any valid React node
};
