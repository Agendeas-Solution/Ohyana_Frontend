import React, { useState, useContext } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
  TextareaAutosize,
} from '@mui/material'
import { EditClientStatus } from '../../services/apiservices/adminprofile'
import { Context as ContextSnackbar } from '../../context/pageContext'

const EditStatusDialog = ({ editStatusDialog, handleStatusClose }) => {
  const [editStatusDetail, setEditStatusDetail] = useState({
    description: editStatusDialog?.description,
    statusId: editStatusDialog?.statusId,
  })
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)

  const EditStatus = () => {
    EditClientStatus(
      editStatusDetail,
      res => {
        handleStatusClose()
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.data.message,
        })
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err.response.data.error,
        })
      },
    )
  }

  return (
    <>
      <Dialog open={editStatusDialog.status} onClose={handleStatusClose}>
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Update Status</Typography>
          <TextField
            className="dialogue_input_fields"
            multiline
            label="Description"
            autoComplete="off"
            minRows={3}
            placeholder="Description Here..."
            value={editStatusDetail?.description}
            onChange={e =>
              setEditStatusDetail({
                ...editStatusDetail,
                description: e.target.value,
              })
            }
          />

          <DialogActions>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={EditStatus}
            >
              Add
            </Button>
            <Button
              className="dialogue_button_nagative"
              variant="contained"
              onClick={handleStatusClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default EditStatusDialog
