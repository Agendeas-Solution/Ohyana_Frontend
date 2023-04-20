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
import { Context as ContextSnackbar } from '../../context/pageContext'
const DeleteLeaveDialog = ({
  setDeleteLeaveDialogControl,
  deleteLeaveDialogControl,
  handleDeleteLeave,
  handleLeaveDeleteDialog,
}) => {
  return (
    <>
      <Dialog
        open={deleteLeaveDialogControl.status}
        onClose={handleLeaveDeleteDialog}
      >
        <Box className="dialogue_main_section">
          <DeleteOutlinedIcon className="dialogue_delete_Icon" />
          <Typography className="dialogue_heading">
            Delete Leave Type
          </Typography>
          <Typography className="dialogue_description">
            Are you sure, you want to delete this Leave Type?
          </Typography>
          <DialogActions className="m-auto">
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={handleDeleteLeave}
              autoFocus
            >
              Delete
            </Button>
            <Button
              className="dialogue_button_nagative"
              onClick={handleLeaveDeleteDialog}
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

export default DeleteLeaveDialog
