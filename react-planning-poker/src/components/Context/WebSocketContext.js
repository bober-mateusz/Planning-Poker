// import React, { createContext, useContext, useEffect, useState } from 'react';

// // Create a WebSocket context to provide the WebSocket connection
// const WebSocketContext = createContext(null);

// export const useWebSocket = () => {
//   return useContext(WebSocketContext);
// };

// export const WebSocketProvider = ({ children }) => {
//   const [webSocket, setWebSocket] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     const ws = new WebSocket('ws://localhost:8080/poker'); // Replace with your WebSocket endpoint

//     ws.onopen = () => {
//       console.log('WebSocket connection established');
//       setIsConnected(true);
//     };

//     ws.onclose = () => {
//       console.log('WebSocket connection closed');
//       setIsConnected(false);
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     setWebSocket(ws);

//     // Clean up WebSocket when the component is unmounted
//     return () => {
//       if (ws) {
//         ws.close();
//       }
//     };
//   }, []);

//   return (
//     <WebSocketContext.Provider value={{ webSocket, isConnected }}>
//       {children}
//     </WebSocketContext.Provider>
//   );
// };
