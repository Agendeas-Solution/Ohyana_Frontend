import React from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  DialogActions,
  Dialog,
} from '@mui/material'
import './index.css'

const CompletedPJPDialog = ({
  completedDialog,
  handleCloseCompletedDialog,
  setCompletedDialog,
  handleAddCompletePJPStatus,
}) => {
  return (
    <>
      <Dialog
        open={completedDialog.status}
        onClose={handleCloseCompletedDialog}
      >
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Completed PJP</Typography>
          <TextField
            className="dialogue_input_fields"
            multiline
            autoComplete="off"
            label="Detail"
            minRows={3}
            maxRows={3}
            placeholder="Detail Here..."
            value={completedDialog.description}
            onChange={e => {
              setCompletedDialog({
                ...completedDialog,
                description: e.target.value,
              })
            }}
          />
          <DialogActions>
            <Button
              className="dialogue_bottom_button"
              variant="contained"
              onClick={handleAddCompletePJPStatus}
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default CompletedPJPDialog
