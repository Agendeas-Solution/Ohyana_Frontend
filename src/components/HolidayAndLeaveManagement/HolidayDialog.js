import React, { useState, useEffect } from 'react'
import {
  Dialog,
  Box,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { GetAllLeaveType, ApplyLeave } from '../../services/apiservices/holiday'
import moment from 'moment'
const HolidayDialog = ({
  addHolidayDialog,
  handleCloseDialog,
  addHolidayDetail,
  setAddHolidayDetail,
  SetHoliday,
  UpdateHolidayFunc,
}) => {
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
  return (
    <>
      <Dialog open={addHolidayDialog.status} onClose={handleCloseDialog}>
        <div className="px-3 pt-3">
          <h3>Set Holiday</h3>
        </div>
        <DialogContent>
          <Box className="py-3">
            <div className="row">
              <div className="col-md-6">
                <Typography variant="span">Date</Typography>
              </div>
              <div className="col-md-12">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    disablePast
                    inputFormat="dd/MM/yyyy"
                    className="w-100"
                    value={addHolidayDetail.date}
                    onChange={e => {
                      setAddHolidayDetail({
                        ...addHolidayDetail,
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
          </Box>
          <Box className="py-3">
            <div className="row">
              <div className="col-md-12">
                <Typography variant="span">How Many Days</Typography>
              </div>
              <div className="col-md-12">
                <TextField
                  type="number"
                  value={addHolidayDetail.duration}
                  onChange={e => {
                    setAddHolidayDetail({
                      ...addHolidayDetail,
                      duration: e.target.value,
                    })
                  }}
                  className="w-100"
                  placeholder="Enter Holiday Duration "
                  variant="outlined"
                />
              </div>
            </div>
          </Box>
          <Box className="py-3">
            <div className="row">
              <div className="col-md-6">
                <Typography variant="span">On Occasion of</Typography>
              </div>
              <div className="col-md-12">
                <TextField
                  value={addHolidayDetail.occasion}
                  onChange={e => {
                    setAddHolidayDetail({
                      ...addHolidayDetail,
                      occasion: e.target.value,
                    })
                  }}
                  className="w-100"
                  placeholder="Enter Holiday Duraion "
                  variant="outlined"
                />
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ marginLeft: '13px', marginRight: '13px' }}
          className="mt-1 d-flex justify-content-between"
        >
          <Button
            variant="contained"
            className="ok-btn"
            onClick={
              addHolidayDetail?.id
                ? () =>
                    UpdateHolidayFunc(addHolidayDetail?.id, {
                      date: addHolidayDetail?.date,
                      occasion: addHolidayDetail?.occasion,
                      duration: addHolidayDetail?.duration,
                      regular: false,
                    })
                : SetHoliday
            }
          >
            Ok
          </Button>
          <Button onClick={handleCloseDialog} className="cancel-btn" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default HolidayDialog
