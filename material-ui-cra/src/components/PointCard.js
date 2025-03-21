import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  width: 200,
  textAlign: "center",
  borderRadius: theme.shape.borderRadius * 2, // Uses MUI theme
  overflow: "hidden",
  boxShadow: theme.shadows[3],
}));

const PointsSection = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 120,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText, // Ensures readable text
}));

const UsernameSection = styled(CardContent)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 60,
  backgroundColor: theme.palette.background.paper,
}));

const Divider = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 2,
  backgroundColor: theme.palette.divider,
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

        <Divider />

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
