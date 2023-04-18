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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { EditAdminClientAppointmentDetail } from '../../services/apiservices/clientDetail'
import { GetAllStaffList } from '../../services/apiservices/staffDetail.js'
import moment from 'moment'
import { Context as ContextSnackbar } from '../../context/pageContext'

const EditAppointmentDialog = ({
  handleAppointmentClose,
  editClientAppointmentDetail,
  clientProfileDetail,
}) => {
  const [clientAppointmentDetail, setClientAppointmentDetail] = useState({
    date: editClientAppointmentDetail?.date,
    time: editClientAppointmentDetail?.time,
    description: editClientAppointmentDetail?.description,
    appointed_member: editClientAppointmentDetail?.appointed_member,
    appointment_unit: editClientAppointmentDetail?.appointment_unit,
    appointmentId: editClientAppointmentDetail?.appointmentId,
  })
  const { successSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar } = useContext(ContextSnackbar)
  const [staffDetailList, setStaffDetailList] = useState([])
  const [appointmentPlaceList, setAppointmentPlaceList] = useState([
    'Factory',
    'Office',
  ])
  useEffect(() => {
    GetAllStaffList(
      {},
      res => {
        setStaffDetailList(res.data)
      },
      err => {},
    )
  }, [])
  const handleAddAppointment = () => {
    console.log('Add Reminder', clientAppointmentDetail)
    if (
      clientAppointmentDetail.description !== '' &&
      clientAppointmentDetail.date !== '' &&
      clientAppointmentDetail.time !== ''
    ) {
      clientAppointmentDetail['appointed_member'] = [
        ...new Set(
          clientAppointmentDetail?.appointed_member.map(item => item?.id),
        ),
      ]
      console.log(clientAppointmentDetail)
      EditAdminClientAppointmentDetail(
        clientAppointmentDetail,
        res => {
          handleAppointmentClose()
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
      <Dialog
        open={editClientAppointmentDetail.status}
        onClose={handleAppointmentClose}
      >
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">
            Update Appointment
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              disablePast
              inputFormat="dd/MM/yyyy"
              value={clientAppointmentDetail.date}
              onChange={e => {
                setClientAppointmentDetail({
                  ...clientAppointmentDetail,
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
            value={clientAppointmentDetail.time}
            onChange={e => {
              setClientAppointmentDetail({
                ...clientAppointmentDetail,
                time: e.target.value,
              })
            }}
          />

          <FormControl className="dialogue_input_fields">
            <InputLabel>Appoinment For</InputLabel>
            <Select
              filterSelectedOptions
              label="Appoinment For"
              value={clientAppointmentDetail?.appointment_unit}
              onChange={(e, value) => {
                setClientAppointmentDetail({
                  ...clientAppointmentDetail,
                  appointment_unit: value,
                })
              }}
            >
              <MenuItem value="Ofiice">Ofiice</MenuItem>
              <MenuItem value="Factory">Factory</MenuItem>
            </Select>
          </FormControl>

          <Autocomplete
            filterSelectedOptions
            options={staffDetailList}
            value={clientAppointmentDetail?.appointed_member}
            onChange={(e, value) => {
              console.log(value)
              setClientAppointmentDetail({
                ...clientAppointmentDetail,
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
                placeholder={
                  clientAppointmentDetail?.appointed_member > 0
                    ? ''
                    : 'Add Member'
                }
              />
            )}
          />

          <TextField
            className="dialogue_input_fields"
            multiline
            label="Description"
            autoComplete="off"
            minRows={3}
            value={clientAppointmentDetail.description}
            placeholder="Description Here..."
            onChange={e => {
              setClientAppointmentDetail({
                ...clientAppointmentDetail,
                description: e.target.value,
                clientId: clientProfileDetail?.id,
              })
            }}
          />

          <DialogActions>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={handleAddAppointment}
            >
              Ok
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

export default EditAppointmentDialog
