import * as React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import EstimateCard from './Cards/EstimateCard';
import { Box } from '@mui/material';

function EstimateCards({ selectedValue }) {
  const estimates = ['0.5', '1', '2', '3', '5', '8'];

  return (
    <Box sx={{ display: 'flex', mx: 5, gap: 2 }}>
      {estimates.map((value) => (
        <EstimateCard
          key={value}
          value={value}
          onClick={console.log("Hello World")}
          selected={value === selectedValue}
        />
      ))}
    </Box>
  );
}

// Define PropTypes for the component
EstimateCards.propTypes = {
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired, // Allow string or number
};

export default EstimateCards;
