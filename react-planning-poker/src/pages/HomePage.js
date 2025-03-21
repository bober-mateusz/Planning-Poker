import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link for navigation

// const formSection = styled({});

export default function HomePage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      padding={3}
      sx={{
        background: "", // Blue gradient
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "navy"
      }}
    >
      {/* Title */}
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{ marginBottom: 4, color: "white" }}
      >
        Create a game!
      </Typography>

      {/* Description */}
      <Typography
        variant="h6"
        sx={{ marginBottom: 4, color: "white", textAlign: "center" }}
      >
        A simple way to estimate and plan your projects with your team. Click
        below to start a new planning session.
      </Typography>

      {/* Navigation Button to Planning Poker */}
      <Link to="/create-game" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            padding: "10px 20px",
            borderRadius: 3,
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Start Planning Poker
        </Button>
      </Link>
    </Box>
  );
}
