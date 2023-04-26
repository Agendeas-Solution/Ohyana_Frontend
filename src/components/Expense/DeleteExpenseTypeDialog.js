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
const DeleteExpenseTypeDialog = ({
  deletexpenseListDialog,
  handleCloseDialog,
  handleDelete,
}) => {
  return (
    <>
      <Dialog open={deletexpenseListDialog.status} onClose={handleCloseDialog}>
        <Box className="dialogue_main_section">
          <DeleteOutlinedIcon className="dialogue_delete_Icon" />
          <Typography className="dialogue_heading">
            Delete Expense Type
          </Typography>
          <Typography className="dialogue_description">
            Are you sure to Delete this Expense Type ?
          </Typography>
          <DialogActions className="m-auto">
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={handleDelete}
              autoFocus
            >
              Ok
            </Button>
            <Button
              className="dialogue_button_nagative"
              variant="contained"
              onClick={handleCloseDialog}
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

export default DeleteExpenseTypeDialog
