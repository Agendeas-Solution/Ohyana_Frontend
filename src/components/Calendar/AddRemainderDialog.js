import React, { useState, useContext } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material'
import moment from 'moment'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AddCalendarAppointment } from '../../services/apiservices/adminprofile'
import { Context as ContextSnackbar } from '../../context/pageContext'
const AddRemainderDialog = props => {
  const [addReminder, setAddReminder] = useState({
    heading: '',
    description: '',
    date: '',
    time: '',
    type: 'REMINDER',
  })
  const { successSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar } = useContext(ContextSnackbar)
  const handleAddReminder = () => {
    console.log('Printing addReminder', addReminder)
    AddCalendarAppointment(
      addReminder,
      res => {
        if (res.success) {
          props.handleRemainderDialogClose()
          setSuccessSnackbar({
            ...successSnackbar,
            status: true,
            message: res.data.message,
          })
          setAddReminder({
            ...addReminder,
            heading: '',
            description: '',
            date: '',
            time: '',
          })
        }
      },
      err => {},
    )
  }
  return (
    <>
      <Dialog
        open={props.remainderDialogControl}
        onClose={props.handleRemainderDialogClose}
      >
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Add Reminder</Typography>
          <TextField
            type="text"
            className="dialogue_input_fields"
            label="Reminder Heading"
            variant="outlined"
            placeholder="Enter Heading"
            value={addReminder.heading}
            onChange={e => {
              setAddReminder({ ...addReminder, heading: e.target.value })
            }}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="dd/MM/yyyy"
              disablePast
              value={addReminder.date}
              onChange={e => {
                setAddReminder({
                  ...addReminder,
                  date: moment(e).format('YYYY-MM-DD'),
                })
              }}
              renderInput={params => (
                <TextField {...params} className="dialogue_input_fields" />
              )}
              PopperProps={{
                placement: 'bottom-start', // Set placement to 'bottom-start'
              }}
            />
          </LocalizationProvider>

          <TextField
            className="dialogue_input_fields"
            type="time"
            label="Select Time"
            value={addReminder.time}
            onChange={e => {
              setAddReminder({ ...addReminder, time: e.target.value })
            }}
          />

          <TextField
            className="dialogue_input_fields"
            multiline
            label="Description"
            autoComplete="off"
            minRows={3}
            placeholder="Description Here..."
            value={addReminder.description}
            onChange={e =>
              setAddReminder({
                ...addReminder,
                description: e.target.value,
              })
            }
          />

          <DialogActions>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={handleAddReminder}
            >
              Add
            </Button>
            <Button
              className="dialogue_button_nagative"
              variant="contained"
              onClick={props.handleRemainderDialogClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default AddRemainderDialog
