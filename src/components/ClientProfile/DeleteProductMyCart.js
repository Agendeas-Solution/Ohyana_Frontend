import React from 'react'
import { Dialog, DialogActions, Button, Typography, Box } from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
const DeleteProductMyCart = ({
  deleteProductMyCardDialog,
  handleDeleteProductDialogClose,
  handleDeleteProduct,
}) => {
  return (
    <>
      <Dialog
        open={deleteProductMyCardDialog.status}
        onClose={handleDeleteProductDialogClose}
      >
        <Box className="dialogue_main_section">
          <DeleteOutlinedIcon className="dialogue_delete_Icon" />
          <Typography className="dialogue_heading">
            Delete Product From Cart
          </Typography>
          <Typography className="dialogue_description">
            Are you sure to Remove this Product from Cart?
          </Typography>
          <DialogActions>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={handleDeleteProduct}
              autoFocus
            >
              Delete
            </Button>
            <Button
              className="dialogue_button_nagative"
              onClick={handleDeleteProductDialogClose}
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

export default DeleteProductMyCart
