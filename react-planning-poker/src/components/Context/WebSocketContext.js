// components/Context/WebSocketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const ws = new WebSocket('ws://localhost:8080/ws/poker');
    setSocket(ws);

    return () => {
      ws.close();
      setSocket(null);
    };
  }, []);
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
