import React, { useState, useContext, useEffect } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
  Autocomplete,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AddAdminClientAppointmentDetail } from '../../services/apiservices/clientDetail'
import moment from 'moment'
import { Context as ContextSnackbar } from '../../context/pageContext'
import './index.css'
import { GetAdminStaffDetailList } from '../../services/apiservices/staffDetail.js'
const AppointmentDialog = ({
  clientProfileDetail,
  handleAppointmentClose,
  appointmentDialogControl,
  setAppointmentDialogControl,
  handleAddEditAppointment,
}) => {
  const [staffDetailList, setStaffDetailList] = useState([])
  useEffect(() => {
    GetAdminStaffDetailList(
      { admin: true },
      res => {
        setStaffDetailList(res.data)
      },
      err => {},
    )
  }, [])
  return (
    <>
      <Dialog
        open={appointmentDialogControl.status}
        onClose={handleAppointmentClose}
      >
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Appointment</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              disablePast
              inputFormat="dd/MM/yyyy"
              value={appointmentDialogControl.date}
              onChange={e => {
                setAppointmentDialogControl({
                  ...appointmentDialogControl,
                  date: moment(e).format('YYYY-MM-DD'),
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
          <TextField
            className="dialogue_input_fields"
            value={appointmentDialogControl.time}
            type="time"
            onChange={e => {
              setAppointmentDialogControl({
                ...appointmentDialogControl,
                time: e.target.value,
              })
            }}
          />
          <FormControl className="dialogue_input_fields">
            <InputLabel>Appointment For</InputLabel>
            <Select
              label="Appointment For"
              value={appointmentDialogControl?.appointment_unit}
              onChange={e => {
                setAppointmentDialogControl({
                  ...appointmentDialogControl,
                  appointment_unit: e.target.value,
                })
              }}
            >
              <MenuItem value="Office">Office</MenuItem>
              <MenuItem value="Factory">Factory</MenuItem>
            </Select>
          </FormControl>
          <Autocomplete
            filterSelectedOptions
            options={staffDetailList}
            value={appointmentDialogControl?.appointed_member}
            onChange={(e, value) => {
              setAppointmentDialogControl({
                ...appointmentDialogControl,
                appointed_member: value,
              })
            }}
            getOptionLabel={option => option?.name}
            multiple
            renderInput={params => (
              <TextField
                {...params}
                label="Add Member"
                className="dialogue_input_fields"
              />
            )}
          />
          <TextField
            className="dialogue_input_fields"
            multiline
            label="Description"
            autoComplete="off"
            minRows={3}
            maxRows={3}
            placeholder="Description Here..."
            value={appointmentDialogControl.description}
            onChange={e => {
              setAppointmentDialogControl({
                ...appointmentDialogControl,
                description: e.target.value,
              })
            }}
          />
          <DialogActions>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={handleAddEditAppointment}
            >
              Save
            </Button>
            <Button
              className="dialogue_button_nagative"
              variant="contained"
              onClick={handleAppointmentClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default AppointmentDialog
