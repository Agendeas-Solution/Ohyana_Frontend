import React, { useContext } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material'
const AddAppreciationDialog = ({
  handleAppreciation,
  addAppreciationDialogControl,
  handleAddAppreciationDialogClose,
}) => {
  return (
    <>
      <Dialog
        open={addAppreciationDialogControl}
        onClose={handleAddAppreciationDialogClose}
      >
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">
            Give Appreciation
          </Typography>
          <Typography className="dialogue_description">
            Are you sure to Give Appreciation ?
          </Typography>
          <DialogActions className="m-auto">
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={handleAppreciation}
              autoFocus
            >
              Ok
            </Button>
            <Button
              className="dialogue_button_nagative"
              variant="contained"
              onClick={handleAddAppreciationDialogClose}
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

export default AddAppreciationDialog
