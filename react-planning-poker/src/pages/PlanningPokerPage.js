import * as React from 'react';
import { Box, Typography, Button } from '@mui/material';
import UserCard from '../components/Cards/UserCard';
import EstimateCards from '../components/EstimateCards';
import FlexBox from '../components/FlexBox/FlexBox';

// Sample user data
const userNames = ['Hello', 'Hello2'];

export default function PlanningPokerPage() {
  const [user] = React.useState(userNames[0])
  const [isRevealed, setIsRevealed] = React.useState(false)
  const [pointSelection, setPointSelection] = React.useState("?")
  const handlePointSelection = React.useCallback((newPoint) => {
    setPointSelection(newPoint)
  })
  const handleRevealPoints = React.useCallback(() => {
    setIsRevealed(!isRevealed)
  })
  return (
    <FlexBox>
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ marginBottom: 3, color: 'white' }}
        >
          Planning Poker
        </Typography>
        <Box>
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
          onClick={handleRevealPoints}>
            Reveal
        </Button>
        </Box>
        {/* User Cards */}
        <Box
          display="flex"
          justifyContent="center"
          gap={2}
          flexWrap="no-wrap"
          flexDirection="row"
        >
          {userNames.map((userName) => (
            <UserCard key={userName} userName={userName} 
            points={(isRevealed && userName === user) ? pointSelection : "?"} />
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
          <EstimateCards handleOnClick={handlePointSelection}/>
        </Box>
      </Box>
    </FlexBox>
  );
}
