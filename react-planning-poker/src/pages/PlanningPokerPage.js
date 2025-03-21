import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import UserCard from "../components/PointCard";
import EstimateCards from "../components/EstimateCards";

// Sample user data
const userNames = ["Hello", "Hello2"];

export default function PlanningPokerPage() {
  const [user, setUser] = React.useState(userNames[0])
  const [isRevealed, setIsRevealed] = React.useState(false)
  const [pointSelection, setPointSelection] = React.useState("?")
  const handlePointSelection = React.useCallback((newPoint) => {
    setPointSelection(newPoint)
  })
  const handleRevealPoints = React.useCallback(() => {
    setIsRevealed(!isRevealed)
  })
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
      {/* Title */}
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ marginBottom: 3, color: "white" }}
      >
        Planning Poker
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        gap={2}
        flexWrap="wrap"
        // sx={{ flexGrow: 1 }}
      >
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
          onClick={handleRevealPoints}
        >
          Reveal
        </Button>
      </Box>
      {/* User Cards */}
      <Box
        display="flex"
        justifyContent="center"
        gap={2}
        flexWrap="wrap"
        sx={{ flexGrow: 1 }}
      >
        {userNames.map((userName) => (
          <UserCard 
            key={userName} 
            userName={userName} 
            points={(isRevealed && userName === user) ? pointSelection : "?"} 
          />
        ))}
      </Box>

      {/* Estimate Cards */}
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        sx={{ marginTop: 3 }} // Adds margin to the top of the EstimateCards
      >
        <EstimateCards handleOnClick={handlePointSelection}/>
      </Box>
    </Box>
  );
}
