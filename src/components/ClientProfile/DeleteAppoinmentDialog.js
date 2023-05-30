import React from 'react'
import { Dialog, DialogActions, Button, Typography, Box } from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
const DeleteAppoinmentDialog = ({
  deleteAppoinmentDialogControl,
  handleCloseAppointmentDialog,
  handleDeleteAppointment,
}) => {
  return (
    <>
      <Dialog
        open={deleteAppoinmentDialogControl.status}
        onClose={handleCloseAppointmentDialog}
      >
        <Box className="dialogue_main_section">
          <DeleteOutlinedIcon className="dialogue_delete_Icon" />
          <Typography className="dialogue_heading">
            Delete Appoinment
          </Typography>
          <Typography className="dialogue_description">
            Are you sure to delete this Appoinment?
          </Typography>
          <DialogActions>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={handleDeleteAppointment}
              autoFocus
            >
              Delete
            </Button>
            <Button
              className="dialogue_button_nagative"
              onClick={handleCloseAppointmentDialog}
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

export default DeleteAppoinmentDialog
