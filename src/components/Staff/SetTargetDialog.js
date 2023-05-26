import React, { useState, useContext } from 'react'
import {
  Box,
  Dialog,
  TextField,
  DialogActions,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { SetTarget } from '../../services/apiservices/staffDetail'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { TEAM } from '../../constants'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import moment from 'moment'
const SetTargetDialog = ({
  targetDetail,
  handleCloseTargetDetailDialog,
  handleGetTargetList,
}) => {
  const [feedbackDetail, setFeedBackDetail] = useState({
    type: '',
    startDate: null,
    endDate: null,
    target: '',
  })
  const [typeOptions, setTypeOptions] = useState(TEAM.TARGETTYPE)
  const [periodOptions, setPeriodOptions] = useState(TEAM.PERIOD)
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const handleSetTarget = () => {
    SetTarget(
      targetDetail.id,
      feedbackDetail,
      res => {
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.message,
        })
        handleCloseTargetDetailDialog()
        handleGetTargetList()
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }
  return (
    <>
      <Dialog
        open={targetDetail.status}
        onClose={handleCloseTargetDetailDialog}
      >
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Set Target</Typography>

          <FormControl className="dialogue_input_fields">
            <InputLabel>Client Type</InputLabel>
            <Select
              label="Target Type"
              value={feedbackDetail.clientType}
              onChange={e => {
                setFeedBackDetail({ ...feedbackDetail, type: e.target.value })
              }}
            >
              {typeOptions.map(data => {
                return <MenuItem value={data.id}>{data.type}</MenuItem>
              })}
            </Select>
          </FormControl>
          <Box sx={{ marginRight: '10px' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                className="dialogue_input_fields"
                inputFormat="dd/MM/yyyy"
                label="Start Date"
                value={feedbackDetail.startDate}
                onChange={e => {
                  setFeedBackDetail({
                    ...feedbackDetail,
                    startDate: moment(e).format('YYYY-MM-DD'),
                  })
                }}
                renderInput={params => (
                  <TextField
                    sx={{
                      width: '175px',
                      background: 'white',
                    }}
                    placeholder="Start Date"
                    {...params}
                  />
                )}
                PopperProps={{
                  placement: 'bottom-start',
                }}
              />
            </LocalizationProvider>
          </Box>

          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="End Date"
                className="dialogue_input_fields"
                inputFormat="dd/MM/yyyy"
                minDate={feedbackDetail.startDate}
                value={feedbackDetail.endDate}
                onChange={e => {
                  setFeedBackDetail({
                    ...feedbackDetail,
                    endDate: moment(e).format('YYYY-MM-DD'),
                  })
                }}
                renderInput={params => (
                  <TextField
                    sx={{
                      width: '175px',
                      background: 'white',
                    }}
                    placeholder="End Date"
                    {...params}
                  />
                )}
                PopperProps={{
                  placement: 'bottom-start',
                }}
              />
            </LocalizationProvider>
          </Box>
          <TextField
            className="dialogue_input_fields"
            label="Target Value"
            placeholder="Target Value"
            value={feedbackDetail.target}
            onChange={e => {
              setFeedBackDetail({ ...feedbackDetail, target: e.target.value })
            }}
          />
          <DialogActions>
            <Button
              className="dialogue_bottom_button"
              variant="contained"
              onClick={handleSetTarget}
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default SetTargetDialog
