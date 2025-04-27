import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlanningPokerPage from './pages/PlanningPokerPage'; // Import your specific page component
import HomePage from './pages/HomePage'; // Import your homepage component
import CreateGamePage from './pages/CreateGamePage';
import Background from './components/Background/Background';
import { UserContextProvider } from './components/Context/UserContext';
import { WebSocketProvider } from './components/Context/WebSocketContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import JoinRoomPage from './pages/JoinRoomPage';
const queryClient = new QueryClient();
export default function App() {
  return (
    <Background>
      <UserContextProvider>
        <WebSocketProvider>
          <QueryClientProvider client={queryClient}>
            <Router>
              <Routes>
                {/* Define your routes here */}
                <Route path="/" element={<HomePage />} /> {/* Homepage route */}
                <Route
                  path="/planning-poker"
                  element={<PlanningPokerPage />}
                />{' '}
                <Route path="/create-game" element={<CreateGamePage />} />{' '}
                <Route
                  path="/invite/:roomID"
                  element={<JoinRoomPage />}
                />{' '}
              </Routes>
            </Router>
          </QueryClientProvider>
        </WebSocketProvider>
      </UserContextProvider>
    </Background>
  );
}
