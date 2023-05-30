import React, { useState, useContext } from 'react'
import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material'
import moment from 'moment'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'

const ViewAppointmentDialog = ({
  viewAppointment,
  handleViewAppointmentDialogClose,
}) => {
  return (
    <>
      <Dialog
        open={viewAppointment.status}
        onClose={handleViewAppointmentDialogClose}
      >
        <Box className="view_appointment_dia_header">
          <Typography />
          <Typography className="view_appointment_dia_heading">
            Detailed Appointment
          </Typography>
          <Box>
            <Button className="profile_header_button">
              <DeleteOutlineRoundedIcon />
            </Button>
          </Box>
        </Box>
        <DialogContent>
          <Box sx={{ padding: '0px 6px' }}>
            <Box className="client_view_appointment_dialog_data">
              <Box>
                <Typography
                  className="appointment_dia_field_name"
                  variant="span"
                >
                  Place
                </Typography>
              </Box>
              <Box className="col-md-8">
                <Typography variant="span">
                  {viewAppointment?.description?.appointment_unit}
                </Typography>
              </Box>
            </Box>
            <Box className="client_view_appointment_dialog_data">
              <Box>
                <Typography
                  className="appointment_dia_field_name"
                  variant="span"
                >
                  Presence Of
                </Typography>
              </Box>
              <Box className="col-md-8">
                <Typography variant="span">
                  {viewAppointment?.description?.appointedMembers
                    ?.map(data => data.name)
                    .join(', ')}
                </Typography>
              </Box>
            </Box>
            <Box className="client_view_appointment_dialog_data">
              <Box>
                <Typography
                  className="appointment_dia_field_name"
                  variant="span"
                >
                  Date & Time
                </Typography>
              </Box>
              <Box className="col-md-8 ">
                <Typography variant="span">
                  {moment(viewAppointment.description?.date).format('LL')},
                  {' ' +
                    moment(
                      viewAppointment.description?.time,
                      'hh:mm:ss',
                    ).format('LT')}
                </Typography>
              </Box>
            </Box>
            <Box className="client_view_appointment_dialog_data">
              <Box>
                <Typography
                  className="appointment_dia_field_name"
                  variant="span"
                >
                  Description
                </Typography>
              </Box>
              <Box className="col-md-8">
                <Typography variant="span">
                  {viewAppointment.description?.description}
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ViewAppointmentDialog
