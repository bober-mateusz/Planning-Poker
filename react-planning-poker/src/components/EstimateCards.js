import * as React from 'react';
import EstimateCard from './Cards/EstimateCard';
import { Box } from '@mui/material';

function EstimateCards({handleOnClick}) {
  // TBD Different configs
  const estimates = ['?', '0.5', '1', '2', '3', '5', '8'];

  return (
    <Box sx={{ display: 'flex', mx: 5, gap: 2 }}>
      {estimates.map((value) => (
        <EstimateCard key={value} value={value} handleOnClick={handleOnClick} />
      ))}
    </Box>
  );
}

export default EstimateCards;
