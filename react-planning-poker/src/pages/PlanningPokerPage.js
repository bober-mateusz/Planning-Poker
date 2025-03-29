import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { io } from "socket.io-client";
import { Box, Typography } from "@mui/material";
import UserCard from "../components/Cards/UserCard";
import EstimateCards from "../components/EstimateCards";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

// Sample user data
const userNames = ["Hello", "Hello2"];
var roomId = 1

export default function PlanningPokerPage() {

  const [users, setUsers] = useState(0);
  const [votes, setVotes] = useState({});
  const userId = localStorage.getItem("userId") || uuidv4();
  localStorage.setItem("userId", userId);

  const { sendMessage, lastJsonMessage } = useWebSocket("ws://localhost:8080/poker", {
      onOpen: () => sendMessage(JSON.stringify({ action: "join-room", roomId, userId })),
  });

  useEffect(() => {
      if (lastJsonMessage) {
          if (lastJsonMessage.action === "update-room") {
              setUsers(lastJsonMessage.users);
          } else if (lastJsonMessage.action === "vote-update") {
              setVotes(lastJsonMessage.votes);
          }
      }
  }, [lastJsonMessage]);

  const handleVote = (vote) => {
      sendMessage(JSON.stringify({ action: "vote", roomId, userId, vote }));
  };

  return (
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

        {/* Placeholder Vote Button */}
        <Box sx={{ marginTop: 3 }}>
          <button
            onClick={() => handleVote(3)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Vote 3
          </button>
        </Box>
      </Box>
  );
}
