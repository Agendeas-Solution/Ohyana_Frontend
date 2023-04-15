import React, { useContext } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
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
        <DialogTitle>
          <DeleteRoundedIcon className="edit_icon_profile" />
        </DialogTitle>
        <DialogContent>
          <Typography variant="span">
            Are You Sure you want to delete this Job Role ?
          </Typography>
        </DialogContent>
        <DialogActions className="m-auto">
          <Button variant="contained" onClick={handleJobRoleDelete}>
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

export default DeleteJobRoleDialog
