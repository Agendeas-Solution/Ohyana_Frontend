import React, { useContext } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'
import { DeleteAdminProduct } from '../../services/apiservices/adminprofile'
import { Context as ContextSnackbar } from '../../context/pageContext'
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
        <DialogTitle>Delete Holiday</DialogTitle>
        <DialogContent>
          <Typography variant="span">
            Are You Sure you want to Delete this Holiday ?
          </Typography>
        </DialogContent>
        <DialogActions className="m-auto">
          <Button variant="contained" onClick={handleDeleteHoliday}>
            Ok
          </Button>
          <Button
            className="cancel-btn"
            onClick={handleHolidayDeleteDialog}
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteHolidayDialog
