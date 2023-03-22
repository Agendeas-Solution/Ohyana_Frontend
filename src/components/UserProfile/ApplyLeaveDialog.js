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
      },
      err => {},
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
      err => {},
    )
  }
  return (
    <>
      <Dialog open={leaveDialogControl} onClose={handleCloseDialog}>
        <div className="px-3 pt-3">
          <h3>Apply For Leave</h3>
        </div>
        <DialogContent>
          <Box className="py-3">
            <div className="row">
              <div className="col-md-6">
                <Typography variant="span">Duration</Typography>
              </div>
              <div className="col-md-12">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    disablePast
                    className="w-100"
                    inputFormat="dd/MM/yyyy"
                    value={leaveDetail.duration}
                    onChange={e => {
                      setLeaveDetail({
                        ...leaveDetail,
                        duration: moment(e).format('YYYY-MM-DD'),
                      })
                    }}
                    renderInput={params => (
                      <TextField className="w-100" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </Box>
          <Box className="py-3">
            <div className="row">
              <div className="col-md-6">
                <Typography variant="span">Leave Type</Typography>
              </div>
              <div className="col-md-12">
                <Autocomplete
                  className="w-100"
                  disablePortal
                  options={leaveType}
                  value={leaveDetail?.leaveType}
                  onChange={(e, value) => {
                    console.log(value)
                    setLeaveDetail({ ...leaveDetail, leaveType: value })
                  }}
                  getOptionLabel={option => option.type}
                  renderInput={params => (
                    <TextField {...params} placeholder="Leave Type" />
                  )}
                />
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ marginLeft: '13px', marginRight: '13px' }}
          className="mt-1 d-flex justify-content-between"
        >
          <Button variant="contained" onClick={handleApplyLeave}>
            Ok
          </Button>
          <Button className="cancel-btn" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ApplyLeaveDialog
