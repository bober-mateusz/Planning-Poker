import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '@mui/material';

function GenericSnackbar({
  open,
  message,
  handleClose,
  autoHideDuration = 4000,
  anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
  action = null,
  sx = {},
  ...props
}) {
  return (
    <Snackbar
      open={open}
      message={message}
      onClose={handleClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={anchorOrigin}
      action={action}
      sx={sx}
      {...props}
    />
  );
}

GenericSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  handleClose: PropTypes.func.isRequired,
  autoHideDuration: PropTypes.number,
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.oneOf(['top', 'bottom']),
    horizontal: PropTypes.oneOf(['left', 'center', 'right']),
  }),
  action: PropTypes.node,
  sx: PropTypes.object,
};

export default GenericSnackbar;
