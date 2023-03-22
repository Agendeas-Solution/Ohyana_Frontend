import React, { useState, useContext } from 'react'
import {
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  Rating,
  Typography,
  Button,
  Autocomplete,
} from '@mui/material'
import { GiveFeedBack } from '../../services/apiservices/staffDetail'
import { Context as ContextSnackbar } from '../../context/pageContext'

const SetTargetDialog = ({ targetDetail }) => {
  const [feedbackDetail, setFeedBackDetail] = useState({
    feedback: '',
    rating: 0,
    memberId: '',
  })
  const { successSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar } = useContext(ContextSnackbar)
  const addFeedback = () => {
    GiveFeedBack(
      feedbackDetail,
      res => {
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.data.message,
        })
      },
      err => {
        console.log('Printing Feedback Error', err)
      },
    )
  }
  return (
    <>
      <Dialog open={targetDetail.status}>
        <DialogTitle>Set Target</DialogTitle>
        <div className="row">
          <div className="col-md-12">
            <Typography variant="span">To Achieve</Typography>
          </div>
          <div className="col-md-12 ">
            <Autocomplete
              disablePortal
              variant="outlined"
              options={['Take Order', 'Generate leads']}
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
                options={['7 Days', '15 days', '1 Month']}
                renderInput={params => (
                  <TextField {...params} placeholder="Take Order" />
                )}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <Typography variant="span">Value</Typography>
            </div>
            <div className="col-md-12">
              <TextField placeholder="Target Value" variant="outlined" />
            </div>
          </div>
        </div>
        <DialogActions>
          <Button variant="contained" onClick={addFeedback}>
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
