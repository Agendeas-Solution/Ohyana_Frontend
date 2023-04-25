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
  DialogTitle,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { EditAdminClientReminderDetail } from '../../services/apiservices/clientDetail'
import moment from 'moment'
import { Context as ContextSnackbar } from '../../context/pageContext'
const EditReminderDialog = ({ editReminderDetail, handleClose }) => {
  const [clientReminderDetail, setClientReminderDetail] = useState({
    description: editReminderDetail?.description,
    date: editReminderDetail?.date,
    time: editReminderDetail.time,
    reminderId: editReminderDetail?.id,
  })
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const handleEditReminder = () => {
    if (
      clientReminderDetail.description !== '' &&
      clientReminderDetail.date !== '' &&
      clientReminderDetail.time !== ''
    ) {
      EditAdminClientReminderDetail(
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
          setErrorSnackbar({
            ...errorSnackbar,
            status: true,
            message: err.response.data.error,
          })
        },
      )
    }
  }
  return (
    <>
      <Dialog open={editReminderDetail.status} onClose={handleClose}>
        <Box className="dialogue_main_section">
          <DialogTitle className="dialogue_heading">Reminder</DialogTitle>

          {/* <DialogContent> */}
          {/* <Box>
              <div className="row">
                <div className="col-md-12">
                  <Typography variant="span">Date</Typography>
                </div>
                <div className="col-md-12">
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
                        <TextField className="w-100" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </Box> */}

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="dd/MM/yyyy"
              disablePast
              label="Date"
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
            />
          </LocalizationProvider>

          <TextField
            label="Time"
            onChange={e => {
              setClientReminderDetail({
                ...clientReminderDetail,
                time: e.target.value,
              })
            }}
            value={clientReminderDetail.time}
            className="dialogue_input_fields"
            type="time"
          />

          <TextField
            className="dialogue_input_fields"
            multiline
            label="Description"
            autoComplete="off"
            placeholder="Description Here..."
            minRows={3}
            onChange={e => {
              setClientReminderDetail({
                ...clientReminderDetail,
                description: e.target.value,
              })
            }}
            value={clientReminderDetail.description}
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
