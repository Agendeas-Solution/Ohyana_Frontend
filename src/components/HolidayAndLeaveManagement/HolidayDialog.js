import React from 'react'
import {
  Dialog,
  Box,
  DialogActions,
  Button,
  Typography,
  TextField,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment from 'moment'

const HolidayDialog = ({
  handleCloseHolidayDialog,
  addHolidayDetail,
  setAddHolidayDetail,
  SetHoliday,
  UpdateHolidayFunc,
}) => {
  return (
    <>
      <Dialog open={addHolidayDetail.status} onClose={handleCloseHolidayDialog}>
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Add Holiday</Typography>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              disablePast
              inputFormat="dd/MM/yyyy"
              value={addHolidayDetail.date}
              onChange={e => {
                setAddHolidayDetail({
                  ...addHolidayDetail,
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
            label="Occasion Name"
            placeholder="Enter Occasion Name"
            variant="outlined"
            value={addHolidayDetail.occasion}
            onChange={e => {
              setAddHolidayDetail({
                ...addHolidayDetail,
                occasion: e.target.value,
              })
            }}
          />

          <TextField
            className="dialogue_input_fields"
            label="Holiday Duration"
            placeholder="Enter Holiday Duration"
            variant="outlined"
            type="number"
            value={addHolidayDetail.duration}
            onChange={e => {
              setAddHolidayDetail({
                ...addHolidayDetail,
                duration: e.target.value,
              })
            }}
          />

          <DialogActions>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={addHolidayDetail?.id ? UpdateHolidayFunc : SetHoliday}
            >
              Add
            </Button>
            <Button
              className="dialogue_button_nagative"
              variant="contained"
              onClick={handleCloseHolidayDialog}
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default HolidayDialog
