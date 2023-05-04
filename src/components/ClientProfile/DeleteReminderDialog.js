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
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { DeleteAdminProduct } from '../../services/apiservices/adminprofile'
import { Context as ContextSnackbar } from '../../context/pageContext'
const DeleteReminderDialog = ({
  deleteReminderDialogControl,
  handleDeleteReminderDialogClose,
  handleDeleteReminder,
}) => {
  return (
    <>
      <Dialog
        open={deleteReminderDialogControl.status}
        onClose={handleDeleteReminderDialogClose}
      >
        <Box className="dialogue_main_section">
          <DeleteOutlinedIcon className="dialogue_delete_Icon" />
          <Typography className="dialogue_heading">Delete Reminder</Typography>
          <Typography className="dialogue_description">
            Are you sure to delete this Reminder?
          </Typography>
          <DialogActions>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={handleDeleteReminder}
              autoFocus
            >
              Delete
            </Button>
            <Button
              className="dialogue_button_nagative"
              onClick={handleDeleteReminderDialogClose}
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

export default DeleteReminderDialog
