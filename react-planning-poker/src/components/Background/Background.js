import React from "react";
import { Box } from "@mui/material";

export default function Background({ children, sx = {}, ...props }) {
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
        ...sx, // Allow external styles to override defaults
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
