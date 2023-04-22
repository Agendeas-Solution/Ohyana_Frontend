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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AddAdminClientReminderDetail } from '../../services/apiservices/clientDetail'
import moment from 'moment'
import { Context as ContextSnackbar } from '../../context/pageContext'
const RemainderDialog = ({
  clientProfileDetail,
  handleClose,
  remainderDialog,
}) => {
  const [clientReminderDetail, setClientReminderDetail] = useState({
    description: '',
    date: '',
    time: '',
    clientId: clientProfileDetail?.id,
  })
  const { successSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar } = useContext(ContextSnackbar)
  const handleAddReminder = () => {
    if (
      clientReminderDetail.description !== '' &&
      clientReminderDetail.date !== '' &&
      clientReminderDetail.time !== ''
    ) {
      AddAdminClientReminderDetail(
        clientReminderDetail,
        res => {
          handleClose()
          setSuccessSnackbar({
            ...successSnackbar,
            status: true,
            message: res.data.message,
          })
        },
        err => {
          console.log('Error :', err)
        },
      )
    }
  }
  return (
    <>
      <Dialog open={remainderDialog} onClose={handleClose}>
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Add Reminder</Typography>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              disablePast
              inputFormat="dd/MM/yyyy"
              value={clientReminderDetail.date}
              onChange={e => {
                setClientReminderDetail({
                  ...clientReminderDetail,
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
            label="Select Time"
            type="time"
            value={clientReminderDetail.time}
            onChange={e => {
              setClientReminderDetail({
                ...clientReminderDetail,
                time: e.target.value,
              })
            }}
          />

          <TextField
            className="dialogue_input_fields"
            multiline
            label="Description"
            autoComplete="off"
            minRows={3}
            placeholder="Description Here..."
            value={clientReminderDetail.description}
            onChange={e => {
              setClientReminderDetail({
                ...clientReminderDetail,
                description: e.target.value,
                clientId: clientProfileDetail?.id,
              })
            }}
          />

          <DialogActions>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={handleAddReminder}
            >
              Save
            </Button>
            <Button
              className="dialogue_button_nagative"
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

export default RemainderDialog
