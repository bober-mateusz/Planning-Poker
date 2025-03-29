import * as React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import EstimateCard from './Cards/EstimateCard';
import { Box } from '@mui/material';

function EstimateCards({ handleOnClick }) {
  const estimates = ['?', '0.5', '1', '2', '3', '5', '8'];

  return (
    <Box sx={{ display: 'flex', mx: 5, gap: 2 }}>
      {estimates.map((value) => (
        <EstimateCard key={value} value={value} handleOnClick={handleOnClick} />
      ))}
    </Box>
  );
}

// Define PropTypes for the component
EstimateCards.propTypes = {
  handleOnClick: PropTypes.func.isRequired, // Ensure handleOnClick is a function and required
};

export default EstimateCards;
