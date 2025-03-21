import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card, ButtonBase } from "@mui/material";

function EstimateCards() {
  const estimates = ["?", "0.5", "1", "2", "3", "5", "8"];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
      flexWrap="wrap"
    >
      {estimates.map((value) => (
        <ButtonBase key={value} sx={{ borderRadius: 2 }}>
          <Card
            sx={{
              width: 80,
              height: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              cursor: "pointer",
              transition: "0.2s",
              "&:hover": { bgcolor: "primary.light" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Typography variant="h4">{value}</Typography>
            </Box>
          </Card>
        </ButtonBase>
      ))}
    </Box>
  );
}

export default EstimateCards;
