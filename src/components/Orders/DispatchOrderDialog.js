import { Button, Dialog, DialogActions, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const DispatchOrderDialog = ({
  openDispatchOrder,
  handleCloseDispatchDialog,
}) => {
  return (
    <>
      <Dialog open={openDispatchOrder} onClose={handleCloseDispatchDialog}>
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Dispatch Order</Typography>

          <Typography className="dialogue_description">
            Are you sure to Dispatch your order ?
          </Typography>

          <DialogActions>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={() => console.log('Yes button clickeddd!!!')}
              autoFocus
            >
              Yes
            </Button>
            <Button
              className="dialogue_button_nagative"
              onClick={handleCloseDispatchDialog}
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

export default DispatchOrderDialog
