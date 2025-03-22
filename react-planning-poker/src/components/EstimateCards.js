import * as React from "react";
import EstimateCard from "./Cards/EstimateCard";
import { Box } from "@mui/material";

function EstimateCards() {
  // TBD Different configs
  const estimates = ["?", "0.5", "1", "2", "3", "5", "8"];

  //Place holder, tf is Ethans code?
  const handleOnClick = (value) => {
    console.log(value);
  };
  return (
    <Box sx={{ display: "flex", mx: 5, gap: 2 }}>
      {estimates.map((value) => (
        <EstimateCard key={value} value={value} handleOnClick={handleOnClick} />
      ))}
    </Box>
  );
}

export default EstimateCards;
