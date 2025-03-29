<<<<<<< Updated upstream
import * as React from 'react';
import { Box, Typography } from '@mui/material';
import UserCard from '../components/Cards/UserCard';
import EstimateCards from '../components/EstimateCards';
import FlexBox from '../components/FlexBox/FlexBox';

// Sample user data
const userNames = ['Hello', 'Hello2'];
=======
import * as React from "react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { io } from "socket.io-client";
import { Box, Typography } from "@mui/material";
import UserCard from "../components/PointCard";
import EstimateCards from "../components/EstimateCards";

// Sample user data
const userNames = ["Hello", "Hello2"];
var roomId = 1
>>>>>>> Stashed changes

export default function PlanningPokerPage() {

  const [users, setUsers] = useState([]);
  const [vote, setVote] = useState(null);

  const userId = localStorage.getItem("userId") || uuidv4();
  localStorage.setItem("userId", userId);
  const socket = io("http://localhost:4000");

  useEffect(() => {
    socket.emit("join-room", roomId, userId);

    socket.on("update-room", (roomUsers) => {
        setUsers(roomUsers);
        console.log(roomUsers);
    });

    socket.on("vote-update", (vote) => {
        console.log("New vote:", vote);
    });

    return () => {
        socket.disconnect();
    };
}, [roomId]);

const handleVote = (value) => {
    setVote(value);
    socket.emit("vote", roomId, { userId, vote: value });
};

  return (
<<<<<<< Updated upstream
    <FlexBox>
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ marginBottom: 3, color: 'white' }}
        >
          Planning Poker
        </Typography>
=======
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between" // Distributes space between items
      minHeight="100vh" // Ensures full viewport height
      padding={3} // Optional padding for spacing
      sx={{
        background:
          "linear-gradient(135deg, rgba(0, 0, 255, 0.7), rgba(0, 0, 128, 0.7))", // Blue gradient
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2>Room: {roomId}</h2>
      {/* Title */}
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ marginBottom: 3, color: "white" }}
      >
        Planning Poker
      </Typography>
>>>>>>> Stashed changes

        {/* User Cards */}
        <Box
          display="flex"
          justifyContent="center"
          gap={2}
          flexWrap="no-wrap"
          flexDirection="row"
        >
          {userNames.map((userName) => (
            <UserCard key={userName} userName={userName} points="3" />
          ))}
        </Box>

        {/* Estimate Cards */}
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="row"
          width="100%"
          sx={{ marginTop: 3 }} // Adds margin to the top of the EstimateCards
        >
          <EstimateCards />
        </Box>
      </Box>
    </FlexBox>
  );
}
