import * as React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: 120,
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: theme.shadows[12],
}));

const PointsSection = styled(CardContent)(({ theme, hasVoted }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: 200,
  backgroundColor: hasVoted
    ? theme.palette.primary.main
    : theme.palette.background.paper,
  color: theme.palette.primary.contrastText,
}));

const UsernameSection = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 80,
  backgroundColor: theme.palette.background.transparent,
  color: theme.palette.primary.contrastText,
}));

// Component
function UserCard({ username, points, hasVoted }) {
  // const hasVoted = points !== '' && points !== undefined; // Check if the user has voted
  return (
    <Box
      sx={{
        transform: hasVoted ? 'translateY(-12px)' : 'none',
        transition: 'transform 0.3s ease',
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign={'center'}
      >
        <StyledCard>
          <PointsSection hasVoted={hasVoted}>
            <Typography variant="h4" fontWeight="bold">
              {points}
            </Typography>
          </PointsSection>
        </StyledCard>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign={'center'}
      >
        <UsernameSection>
          <Typography variant="h6" fontWeight="500">
            {username}
          </Typography>
        </UsernameSection>
      </Box>
    </Box>
  );
}

// PropTypes validation
UserCard.propTypes = {
  username: PropTypes.string.isRequired, // username must be a string and required
  points: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // points can be a string or number and required
  hasVoted: PropTypes.bool, // hasVoted must be a boolean
};

export default UserCard;
