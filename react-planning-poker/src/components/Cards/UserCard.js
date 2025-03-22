import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: 220,
  borderRadius: theme.shape.borderRadius * 3, // Uses MUI theme
  boxShadow: theme.shadows[12], // Adds a shadow from MUI theme
}));

const PointsSection = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: 200,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText, // Ensures readable text
}));

const UsernameSection = styled(CardContent)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 80,
  backgroundColor: theme.palette.background.paper,
}));

// Component
function UserCard({ userName, points }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <StyledCard>
        <PointsSection>
          <Typography variant="h4" fontWeight="bold">
            {points}
          </Typography>
        </PointsSection>

        <UsernameSection>
          <Typography variant="h6" fontWeight="500">
            {userName}
          </Typography>
        </UsernameSection>
      </StyledCard>
    </Box>
  );
}

export default UserCard;
