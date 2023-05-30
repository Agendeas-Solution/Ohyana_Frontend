import React from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  TextField,
  Typography,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment from 'moment'

const EditReminderDialog = ({
  handleClose,
  handleEditReminder,
  remainderDialog,
  setRemainderDialog,
}) => {
  return (
    <>
      <Dialog open={remainderDialog.status} onClose={handleClose}>
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Reminder</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="dd/MM/yyyy"
              disablePast
              label="Date"
              value={remainderDialog.date}
              onChange={e => {
                setRemainderDialog({
                  ...remainderDialog,
                  date: moment(e).format('YYYY-MM-DD'),
                })
              }}
              renderInput={params => (
                <TextField {...params} className="dialogue_input_fields" />
              )}
            />
          </LocalizationProvider>
          <TextField
            className="dialogue_input_fields"
            label="Time"
            type="time"
            value={remainderDialog?.time}
            onChange={e => {
              setRemainderDialog({
                ...remainderDialog,
                time: e.target.value,
              })
            }}
          />
          <TextField
            className="dialogue_input_fields"
            multiline
            label="Description"
            autoComplete="off"
            placeholder="Description Here..."
            minRows={3}
            maxRows={3}
            onChange={e => {
              setRemainderDialog({
                ...remainderDialog,
                description: e.target.value,
              })
            }}
            value={remainderDialog.description}
          />
          <DialogActions>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={handleEditReminder}
            >
              Ok
            </Button>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default EditReminderDialog
