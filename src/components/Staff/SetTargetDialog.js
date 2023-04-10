import React, { useState, useContext } from 'react'
import {
  Dialog,
  DialogTitle,
  TextField,
  DialogActions,
  Typography,
  Button,
  Autocomplete,
} from '@mui/material'
import { SetTarget } from '../../services/apiservices/staffDetail'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { TEAM } from '../../constants'
const SetTargetDialog = ({ targetDetail, handleCloseTargetDetailDialog }) => {
  const [feedbackDetail, setFeedBackDetail] = useState({
    type: '',
    period: 0,
    target: '',
  })
  const [typeOptions, setTypeOptions] = useState(TEAM.TARGETTYPE)
  const [periodOptions, setPeriodOptions] = useState(TEAM.PERIOD)
  const { successSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar } = useContext(ContextSnackbar)
  const handleSetTarget = () => {
    SetTarget(
      targetDetail.id, feedbackDetail,
      res => {
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.message,
        })
        handleCloseTargetDetailDialog();
      },
      err => {
        console.log('Printing Feedback Error', err)
      },
    )
  }
  return (
    <>
      <Dialog open={targetDetail.status} onClose={handleCloseTargetDetailDialog}>
        <DialogTitle>Set Target</DialogTitle>
        <div className="row">
          <div className="col-md-12">
            <Typography variant="span">To Achieve</Typography>
          </div>
          <div className="col-md-12">
            <Autocomplete
              disablePortal
              variant="outlined"
              options={typeOptions}
              getOptionLabel={option => option.type}
              onChange={(e, value) => {
                setFeedBackDetail({ ...feedbackDetail, type: value.id })
              }}
              renderInput={params => (
                <TextField {...params} placeholder="Take Order" />
              )}
            />
          </div>
          <div className="row ">
            <div className="col-md-12">
              <Typography variant="span">Period</Typography>
            </div>
            <div className="col-md-12">
              <Autocomplete
                variant="outlined"
                disablePortal
                options={periodOptions}
                getOptionLabel={option => option.period}
                onChange={(e, value) => {
                  setFeedBackDetail({ ...feedbackDetail, period: value.days })
                }}
                renderInput={params => (
                  <TextField {...params} placeholder="Select Period" />
                )}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <Typography variant="span">Value</Typography>
            </div>
            <div className="col-md-12">
              <TextField
                onChange={(e) => {
                  setFeedBackDetail({ ...feedbackDetail, target: e.target.value })
                }}
                placeholder="Target Value" variant="outlined" />
            </div>
          </div>
        </div>
        <DialogActions>
          <Button variant="contained" onClick={handleSetTarget}>
            Ok
          </Button>
          {/* <Button onClick={handleCloseRatingDialog} autoFocus>
            Cancel
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SetTargetDialog
