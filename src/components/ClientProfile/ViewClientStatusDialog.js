import React, { useState, useContext } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
  TextareaAutosize,
} from '@mui/material'
import { EditClientStatus } from '../../services/apiservices/adminprofile'
import { Context as ContextSnackbar } from '../../context/pageContext'
import moment from 'moment'
const ViewClientStatusDialog = ({
  editStatusDialog,
  handleViewStatusDialogClose,
  viewClientStatus,
}) => {
  const [editStatusDetail, setEditStatusDetail] = useState({
    description: editStatusDialog?.description,
    statusId: editStatusDialog?.statusId,
  })
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const EditStatus = () => {
    console.log('EditClient Status', editStatusDetail)
    EditClientStatus(
      editStatusDetail,
      res => {
        handleViewStatusDialogClose()
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.data.message,
        })
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err.response.data.error,
        })
      },
    )
  }
  return (
    <>
      <Dialog
        open={viewClientStatus.status}
        onClose={handleViewStatusDialogClose}
      >
        <div style={{ textAlign: 'center' }} className="px-3 pt-3">
          <h4 style={{ fontWeight: '600' }}>Detailed Status</h4>
        </div>
        <DialogContent sx={{ minWidth: 400 }}>
          <Box>
            <div className="row mb-2">
              <div className="col-md-4 ">
                <Typography className="fw-bold" variant="span">
                  Add By
                </Typography>
              </div>
              <div className="col-md-8">
                <Typography variant="span">
                  {viewClientStatus.statusDetail?.team?.name}
                </Typography>
              </div>
            </div>
            <div className="row  mb-2">
              <div className="col-md-4">
                <Typography className="fw-bold" variant="span">
                  Job Role
                </Typography>
              </div>
              <div className="col-md-8">
                <Typography variant="span">
                  {viewClientStatus.statusDetail?.team?.role?.name}
                </Typography>
              </div>
            </div>
            <div className="row  mb-2">
              <div className="col-md-4">
                <Typography className="fw-bold" variant="span">
                  Date & Time
                </Typography>
              </div>
              <div className="col-md-8 ">
                <Typography variant="span">
                  {moment(viewClientStatus.statusDetail?.date).format('LL')},
                  {moment(
                    viewClientStatus.statusDetail?.time,
                    'hh:mm:ss',
                  ).format('LT')}
                </Typography>
              </div>
            </div>
            <div className="row  mb-2">
              <div className="col-md-4">
                <Typography className="fw-bold" variant="span">
                  Description
                </Typography>
              </div>
              <div className="col-md-8">
                <Typography variant="span">
                  {viewClientStatus.statusDetail?.description}
                </Typography>
              </div>
            </div>
            {viewClientStatus.statusDetail?.audioUrl && (
              <div className="row  mb-2">
                <div className="col-md-4">
                  <Typography className="fw-bold" variant="span">
                    Audio
                  </Typography>
                </div>
                <div className="col-md-8">
                  <audio
                    style={{ maxWidth: '230px' }}
                    controls
                    controlsList="nodownload"
                  >
                    <source
                      src={`${process.env.REACT_APP_API_CALL_URL}/status/audio/${viewClientStatus.statusDetail?.audioUrl}`}
                      type="audio/mpeg"
                    ></source>
                    <source
                      src={`${process.env.REACT_APP_API_CALL_URL}/status/audio/${viewClientStatus.statusDetail?.audioUrl}`}
                      type="audio/ogg"
                    ></source>
                  </audio>
                </div>
              </div>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ViewClientStatusDialog
