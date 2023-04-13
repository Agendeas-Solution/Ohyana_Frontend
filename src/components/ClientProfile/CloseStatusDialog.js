import React, { useState, useContext, useEffect } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  TextareaAutosize,
  TextField,
} from '@mui/material'
import { AddCloseStatusApiCall } from '../../services/apiservices/adminprofile'
import { Context as ContextSnackbar } from '../../context/pageContext'
const CloseStatusDialog = ({
  handleCloseStatusDialogClose,
  closeStatusDialogControl,
  setCloseStatusDialogControl,
}) => {
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const addCloseStatus = () => {
    let data = closeStatusDialogControl
    delete data.status
    AddCloseStatusApiCall(
      data,
      res => {
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.message,
        })
        setCloseStatusDialogControl({
          ...closeStatusDialogControl,
          description: '',
        })
        handleCloseStatusDialogClose()
      },
      err => {
        console.log(err)
      },
    )
  }

  return (
    <>
      <Dialog
        open={closeStatusDialogControl.status}
        onClose={handleCloseStatusDialogClose}
      >
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Close Status</Typography>

          <TextField
            className="dialogue_input_fields"
            multiline
            label="Description"
            autoComplete="off"
            placeholder="Reason Here..."
            minRows={3}
            value={closeStatusDialogControl.description}
            onChange={e =>
              setCloseStatusDialogControl({
                ...closeStatusDialogControl,
                description: e.target.value,
              })
            }
          />

          <DialogActions>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={addCloseStatus}
            >
              Ok
            </Button>
            <Button
              className="dialogue_button_nagative"
              variant="contained"
              onClick={handleCloseStatusDialogClose}>
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default CloseStatusDialog
