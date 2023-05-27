import React, { useState, useContext } from 'react'
import { Box, Dialog, DialogContent, Typography } from '@mui/material'
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
    EditClientStatus(
      editStatusDetail,
      res => {
        handleViewStatusDialogClose()
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.message,
        })
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err.response.data.message,
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
        <Box
          sx={{ textAlign: 'center', margin: '15px' }}
          // className="view_appointment_dia_header"
        >
          <Typography className="view_appointment_dia_heading">
            Detailed Status
          </Typography>
        </Box>

        <DialogContent sx={{ minWidth: 450 }}>
          <Box sx={{ padding: '0px 6px' }}>
            <Box className="client_view_appointment_dialog_data">
              <Box>
                <Typography
                  className="appointment_dia_field_name"
                  variant="span"
                >
                  Add By
                </Typography>
              </Box>
              <Box className="col-md-8">
                <Typography variant="span">
                  {viewClientStatus.statusDetail?.team?.name}
                </Typography>
              </Box>
            </Box>

            <Box className="client_view_appointment_dialog_data">
              <Box className="col-md-4">
                <Typography
                  className="appointment_dia_field_name"
                  variant="span"
                >
                  Job Role
                </Typography>
              </Box>
              <Box className="col-md-8">
                <Typography variant="span">
                  {viewClientStatus.statusDetail?.team?.role?.name}
                </Typography>
              </Box>
            </Box>

            <Box className="client_view_appointment_dialog_data">
              <Box className="col-md-4">
                <Typography
                  className="appointment_dia_field_name"
                  variant="span"
                >
                  Date & Time
                </Typography>
              </Box>
              <Box className="col-md-8">
                <Typography variant="span">
                  {moment(viewClientStatus.statusDetail?.date).format('LL')},
                  {moment(
                    viewClientStatus.statusDetail?.time,
                    'hh:mm:ss',
                  ).format('LT')}
                </Typography>
              </Box>
            </Box>

            <Box className="client_view_appointment_dialog_data">
              <Box className="col-md-4">
                <Typography
                  className="appointment_dia_field_name"
                  variant="span"
                >
                  Description
                </Typography>
              </Box>
              <Box className="col-md-8">
                <Typography variant="span">
                  {viewClientStatus.statusDetail?.description}
                </Typography>
              </Box>
            </Box>

            {viewClientStatus.statusDetail?.audioUrl && (
              <Box className="client_view_appointment_dialog_data">
                <Box className="col-md-4">
                  <Typography
                    className="appointment_dia_field_name"
                    variant="span"
                  >
                    Audio
                  </Typography>
                </Box>
                <Box className="col-md-8">
                  <audio
                    style={{ maxWidth: '230px' }}
                    controls
                    controlsList="nodownload"
                  >
                    <source
                      src={viewClientStatus.statusDetail?.audioUrl}
                      type="audio/mpeg"
                    ></source>
                    <source
                      src={viewClientStatus.statusDetail?.audioUrl}
                      type="audio/ogg"
                    ></source>
                  </audio>
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ViewClientStatusDialog
