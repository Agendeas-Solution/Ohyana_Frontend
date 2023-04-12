import React, { useState, useEffect } from 'react'
import {
  Dialog,
  Box,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { GetAllLeaveType, ApplyLeave } from '../../services/apiservices/holiday'
import moment from 'moment'
const ApplyLeaveDialog = ({ leaveDialogControl, handleCloseDialog }) => {
  const [leaveType, setLeaveType] = useState([])
  const [leaveDetail, setLeaveDetail] = useState({
    duration: '',
    leaveType: null,
  })
  useEffect(() => {
    GetAllLeaveType(
      {},
      res => {
        setLeaveType(res.data)
        debugger
      },
      err => { },
    )
  }, [])
  const handleApplyLeave = () => {
    ApplyLeave(
      {
        leavetypeId: leaveDetail.leaveType.id,
        duration: leaveDetail.leaveType.duration,
      },
      res => {
        handleCloseDialog()
      },
      err => { },
    )
  }
  return (
    <>
      <Dialog open={leaveDialogControl}
        onClose={handleCloseDialog}>
        <Box className="dialogue_main_section">

          <Typography className="dialogue_heading">Apply For Leave</Typography>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              disablePast
              inputFormat="dd/MM/yyyy"
              value={leaveDetail.duration}
              onChange={e => {
                setLeaveDetail({
                  ...leaveDetail,
                  duration: moment(e).format('YYYY-MM-DD'),
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

          <FormControl className="dialogue_input_fields">
            <InputLabel>Leave Type</InputLabel>
            <Select
              label="Leave Type"
              value={leaveDetail?.leaveType}
              onChange={(e, value) => {
                console.log(value)
                setLeaveDetail({ ...leaveDetail, leaveType: e.target.value })
              }}
            >
              {leaveType.map(data => {
                return <MenuItem value={data.id}>{data.type}</MenuItem>
              })}
            </Select>
          </FormControl>

          <DialogActions>
            <Button
              className="dialogue_bottom_button"
              variant="contained"
              onClick={handleApplyLeave}>
              Apply
            </Button>

          </DialogActions>

        </Box>
      </Dialog>
    </>
  )
}

export default ApplyLeaveDialog
