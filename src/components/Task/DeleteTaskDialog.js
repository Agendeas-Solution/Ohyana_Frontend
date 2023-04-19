import React from 'react'
import {
  Dialog,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
} from '@mui/material'
import './index.css'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
const DeleteTaskDialog = ({
  DeleteTask,
  deleteTaskDialog,
  handleDeleteDialogClose,
}) => {
  return (
    <>
      <Dialog open={deleteTaskDialog.status} onClose={handleDeleteDialogClose}>
        <Box className="dialogue_main_section">
          <DeleteOutlinedIcon className="dialogue_delete_Icon" />
          <Typography className="dialogue_heading">Delete Task</Typography>
          <Typography className="dialogue_description">
            Are you sure, you want to delete this task?
          </Typography>
          <DialogActions>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={DeleteTask}
              autoFocus
            >
              Ok
            </Button>
            <Button
              className="dialogue_button_nagative"
              variant="contained"
              onClick={handleDeleteDialogClose}
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

export default DeleteTaskDialog
