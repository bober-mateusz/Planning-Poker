import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '@mui/material';

function CreateRoomInviteSnackbar({ open, handleClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      message="Room invite copied to clipboard"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    />
  );
}

CreateRoomInviteSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default CreateRoomInviteSnackbar;
