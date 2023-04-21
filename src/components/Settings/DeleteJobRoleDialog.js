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
import DeleteOutlinedIcon from '@mui/icons-material/DeleteRounded'
import { DeleteJobRole } from '../../services/apiservices/staffDetail'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { useNavigate } from 'react-router-dom'

const DeleteJobRoleDialog = ({ deleteJobRoleDialogControl, handleClose }) => {
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const navigate = useNavigate()
  const handleJobRoleDelete = () => {
    DeleteJobRole(
      deleteJobRoleDialogControl.id,
      res => {
        handleClose()

        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.message,
        })
        navigate('/jobrolelist')
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err.response.data.message,
        })
      },
    )
  }
  return (
    <>
      <Dialog open={deleteJobRoleDialogControl.status} onClose={handleClose}>
        <Box className="dialogue_main_section">
          <DeleteOutlinedIcon className="dialogue_delete_Icon" />
          <Typography className="dialogue_heading">Delete Job Role</Typography>

          <Typography className="dialogue_description">
            Are You Sure, you want to delete this Job Role ?
          </Typography>

          <DialogActions>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={handleJobRoleDelete}
              autoFocus
            >
              Delete
            </Button>
            <Button
              className="dialogue_button_nagative"
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

export default DeleteJobRoleDialog
