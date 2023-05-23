import React from 'react'
import { Dialog, DialogActions, Button, Typography, Box } from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
const DeleteHolidayDialog = ({
  deleteHolidayDialogControl,
  handleDeleteHoliday,
  handleHolidayDeleteDialog,
}) => {
  return (
    <>
      <Dialog
        open={deleteHolidayDialogControl.status}
        onClose={handleHolidayDeleteDialog}
      >
        <Box className="dialogue_main_section">
          <DeleteOutlinedIcon className="dialogue_delete_Icon" />
          <Typography className="dialogue_heading">Delete Holiday</Typography>
          <Typography className="dialogue_description">
            Are you sure to delete this Holiday?
          </Typography>
          <DialogActions>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={handleDeleteHoliday}
              autoFocus
            >
              Delete
            </Button>
            <Button
              className="dialogue_button_nagative"
              onClick={handleHolidayDeleteDialog}
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

export default DeleteHolidayDialog
