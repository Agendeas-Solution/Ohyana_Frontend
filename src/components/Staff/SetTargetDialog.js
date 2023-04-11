import React, { useState, useContext } from 'react'
import {
  Box,
  Dialog,
  DialogTitle,
  TextField,
  DialogActions,
  Typography,
  Button,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { SetTarget } from '../../services/apiservices/staffDetail'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { TEAM } from '../../constants'
const SetTargetDialog = ({ targetDetail, handleCloseTargetDetailDialog }) => {
  const [feedbackDetail, setFeedBackDetail] = useState({
    type: '',
    period: '',
    target: '',
  })
  const [typeOptions, setTypeOptions] = useState(TEAM.TARGETTYPE)
  const [periodOptions, setPeriodOptions] = useState(TEAM.PERIOD)
  const { successSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar } = useContext(ContextSnackbar)
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
      },
      err => {
        console.log('Printing Feedback Error', err)
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

          <FormControl className="dialogue_input_fields">
            <InputLabel>Select Period</InputLabel>
            <Select
              label="Select Period"
              value={feedbackDetail.period}
              onChange={e => {
                setFeedBackDetail({ ...feedbackDetail, period: e.target.value })
              }}
            >
              {periodOptions.map(data => {
                return <MenuItem value={data.days}>{data.period}</MenuItem>
              })}
            </Select>
          </FormControl>

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
