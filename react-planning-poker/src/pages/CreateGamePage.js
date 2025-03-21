import * as React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { Form } from "react-router-dom";

export default function CreateGamePage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      padding={3}
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
        sx={{ marginBottom: 4, color: "white" }}
      >
        Create a game!
      </Typography>
      <TextField
        required
        id="outlined-required"
        placeholder="Game Name here"
        sx={{
          backgroundColor:
            "linear-gradient(135deg, rgba(0, 0, 255, 0.7), rgba(0, 0, 128, 0.7))",
          color: "red",
        }}
      />
    </Box>
  );
}
