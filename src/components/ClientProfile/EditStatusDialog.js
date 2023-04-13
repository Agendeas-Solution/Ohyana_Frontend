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

const EditStatusDialog = props => {
  const [editStatusDetail, setEditStatusDetail] = useState({
    description: props?.editStatusDialog?.description,
    statusId: props?.editStatusDialog?.statusId,
  })
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)

  const EditStatus = () => {
    EditClientStatus(
      editStatusDetail,
      res => {
        props.handleStatusClose()
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
      <Dialog
        open={props.editStatusDialog.status}
        onClose={props.handleStatusClose}
      >
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
              onClick={EditStatus}>
              Add
            </Button>
            <Button
              className="dialogue_button_nagative"
              variant="contained"
              onClick={props.handleStatusClose}>
              Cancel
            </Button>

          </DialogActions>
        </Box>
      </Dialog >
    </>
  )
}

export default EditStatusDialog
