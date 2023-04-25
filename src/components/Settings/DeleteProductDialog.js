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
const DeleteProductDialog = ({
  handleGetAdminProduct,
  deleteProductDialogControl,
  handleClose,
}) => {
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const handleDelete = id => {
    DeleteAdminProduct(
      id,
      res => {
        if (res.success) {
          handleGetAdminProduct()
          handleClose()
          setSuccessSnackbar({

            
            ...successSnackbar,
            status: true,
            message: res.message,
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
      <Dialog open={deleteProductDialogControl.status} onClose={handleClose}>
      <Box className="dialogue_main_section">
          <DeleteOutlinedIcon className="dialogue_delete_Icon" />
          <Typography className="dialogue_heading">Delete Product</Typography>
          <Typography className="dialogue_description">
            Are you sure, you want to delete this product?
          </Typography>
          <DialogActions>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={() => handleDelete(deleteProductDialogControl.id)}
              autoFocus
            >
              Ok
            </Button>
            <Button
              className="dialogue_button_nagative"
              variant="contained"
              onClick={handleClose}
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

export default DeleteProductDialog
