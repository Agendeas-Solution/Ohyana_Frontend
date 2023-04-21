import { Box, Button, Dialog, DialogActions, Typography } from '@mui/material'
import React from 'react'
import DoneRoundedIcon from '@mui/icons-material/DoneRounded'
const StaffPaymentVerificationDialog = ({
  paymentVerification,
  closePaymentVerification,
}) => {
  return (
    <>
      <Dialog
        open={paymentVerification.status}
        onClose={closePaymentVerification}
      >
        <Box className="dialogue_main_section">
          <DoneRoundedIcon className="dialogue_done_Icon" />
          <Typography className="dialogue_heading">Payment Done</Typography>

          <Typography className="dialogue_description">
            Are you sure to complete this Payment?
          </Typography>

          <DialogActions>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              //   onClick={handleJobRoleDelete}
              autoFocus
            >
              Done
            </Button>
            <Button
              className="dialogue_button_nagative"
              //   onClick={handleClose}
              autoFocus
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default StaffPaymentVerificationDialog
