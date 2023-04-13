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
const DeleteProductDialog = ({ handleGetAdminProduct, deleteProductDialogControl, handleClose }) => {
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const handleDelete = id => {
    DeleteAdminProduct(
      id,
      res => {
        if (res.success) {
          debugger;
          handleGetAdminProduct();
          handleClose()
          setSuccessSnackbar({
            ...successSnackbar,
            status: true,
            message: res.message
          })
        }
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }
  return (
    <>
      <Dialog
        open={deleteProductDialogControl.status}
        onClose={handleClose}
      >
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <Typography variant="span">
            Are You Sure you want to Delete this Product ?
          </Typography>
        </DialogContent>
        <DialogActions className="m-auto">
          <Button
            variant="contained"
            onClick={() => handleDelete(deleteProductDialogControl.id)}
          >
            Ok
          </Button>
          <Button className="cancel-btn" onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteProductDialog
