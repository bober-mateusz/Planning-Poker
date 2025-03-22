import * as React from 'react';
import { Box, Typography } from '@mui/material';
import UserCard from '../components/Cards/UserCard';
import EstimateCards from '../components/EstimateCards';
import FlexBox from '../components/FlexBox/FlexBox';

// Sample user data
const userNames = ['Hello', 'Hello2'];

export default function PlanningPokerPage() {
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
