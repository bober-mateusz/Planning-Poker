// components/Context/WebSocketContext.js
import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  return (
    <WebSocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

WebSocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useWebSocket = () => useContext(WebSocketContext);
