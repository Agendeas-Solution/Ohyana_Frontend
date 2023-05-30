import React from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  DialogContent,
  DialogActions,
  Dialog,
} from '@mui/material'
import './index.css'
const AddLeaveDialog = ({
  addLeaveDialog,
  setAddLeaveDialog,
  AddLeave,
  handleCloseDialog,
  UpdateLeave,
}) => {
  return (
    <>
      <Dialog open={addLeaveDialog.status} onClose={handleCloseDialog}>
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Add Leave</Typography>
          <TextField
            className="dialogue_input_fields"
            label="Leave Name"
            placeholder="Enter Leave Name"
            variant="outlined"
            value={addLeaveDialog.type}
            onChange={e => {
              setAddLeaveDialog({
                ...addLeaveDialog,
                type: e.target.value,
              })
            }}
          />
          <TextField
            className="dialogue_input_fields"
            label="Total Days"
            type="number"
            variant="outlined"
            value={addLeaveDialog.duration}
            onChange={e => {
              setAddLeaveDialog({
                ...addLeaveDialog,
                duration: e.target.value,
              })
            }}
          />
          <DialogActions>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={addLeaveDialog?.id ? UpdateLeave : AddLeave}
            >
              Add
            </Button>
            <Button
              className="dialogue_button_nagative"
              variant="contained"
              onClick={handleCloseDialog}
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default AddLeaveDialog
