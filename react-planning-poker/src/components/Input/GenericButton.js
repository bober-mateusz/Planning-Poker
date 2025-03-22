import React from "react";
import { Button } from "@mui/material";

// Make the button customizable with props
export default function GenericButton({
  children, // To allow dynamic text inside the button
  onClick, // To handle button click events
  variant = "contained", // Default variant (can be overridden)
  color = "primary", // Default color (can be overridden)
  sx = {}, // For custom styling
  ...props // To handle any other props
}) {
  return (
    <Button
      variant={variant} // You can pass "contained", "outlined", etc.
      color={color} // You can pass the button color like "primary", "secondary", etc.
      onClick={onClick} // The onClick event handler
      sx={sx} // For custom styles passed as a prop
      {...props} // Spread the remaining props like `disabled`, `size`, etc.
    >
      {children}
    </Button>
  );
}
