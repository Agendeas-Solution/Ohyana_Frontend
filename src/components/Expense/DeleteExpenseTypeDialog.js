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
const DeleteExpenseTypeDialog = ({
  deletexpenseListDialog,
  handleCloseDialog,
  handleDelete,
}) => {
  return (
    <>
      <Dialog open={deletexpenseListDialog.status} onClose={handleCloseDialog}>
        <DialogTitle>Delete Expense Type</DialogTitle>
        <DialogContent>
          <Typography variant="span">
            Are You Sure you want to Delete this Expense Type ?
          </Typography>
        </DialogContent>
        <DialogActions className="m-auto">
          <Button
            className="ok-btn"
            variant="contained"
            onClick={handleDelete}
          >
            Ok
          </Button>
          <Button className="cancel-btn" onClick={handleCloseDialog} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteExpenseTypeDialog
