import React, { useState, useEffect } from 'react'
import {
  Dialog,
  Box,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  TextareaAutosize,
  DialogTitle,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
const DueDateDialog = ({
  dueDateDialogControl,
  handleDueDateDialogClose,
  setDueDateDialogControl,
  handleEditDueDate,
}) => {
  return (
    <>
      <Dialog
        open={dueDateDialogControl.status}
        onClose={handleDueDateDialogClose}
      >
        <Box className="dialogue_main_section">
          <DialogTitle className="dialogue_heading">Edit Due Date</DialogTitle>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="dd/MM/yyyy"
              label="Due date picker"
              value={dueDateDialogControl.due_date}
              onChange={e => {
                setDueDateDialogControl({
                  ...dueDateDialogControl,
                  due_date: e,
                })
              }}
              renderInput={params => (
                <TextField {...params} className="dialogue_input_fields" />
              )}
              PopperProps={{
                placement: 'bottom-start',
              }}
            />
          </LocalizationProvider>

          <DialogActions>
            <Button
              className="dialogue_bottom_button"
              variant="contained"
              onClick={handleEditDueDate}
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default DueDateDialog
