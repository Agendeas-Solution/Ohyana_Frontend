import React, { useEffect, useState, useContext } from 'react'
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  TextareaAutosize,
} from '@mui/material'
import Like from '../../assets/img/like.svg'
import moment from 'moment'
import { useTheme } from '@mui/material/styles'
import './index.css'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { GetComplaintDetail } from '../../services/apiservices/support'
import {
  AddStatusInComplaint,
  CloseTicket,
} from '../../services/apiservices/support'
const Complaint = () => {
  const [complaintDetail, setComplaintDetail] = useState([])
  const [open, setOpen] = React.useState(false)
  const [complaintProcesses, setComplaintProcesses] = useState([])
  const [ticketAnswer, setTicketAnswer] = useState({ id: '', description: '' })
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const theme = useTheme()
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  useEffect(() => {
    let path = window.location.pathname
    path = path.split('/').pop()
    GetComplaintDetail(
      parseInt(path),
      res => {
        if (res.success) {
          setComplaintDetail(res?.data)
          setComplaintProcesses(res?.data?.complaint_processes)
        }
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }, [])
  const handleAddStatus = () => {
    let path = window.location.pathname
    path = path.split('/').pop()
    setTicketAnswer({ ...ticketAnswer, id: path })
    AddStatusInComplaint(
      ticketAnswer,
      res => {
        if (res?.success) {
          setSuccessSnackbar({
            ...successSnackbar,
            status: true,
            message: res.message,
          })
        }
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
  const handleCloseTicket = () => {
    let path = window.location.pathname
    path = path.split('/').pop()
    CloseTicket(
      path,
      res => {},
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
      <Box className="main_section">
        <Box className="complaint_section">
          <Box className="complaint_left_section">
            <Box className="ticket_detail">
              <Box className="ticket_number_row">
                <Box className="row">
                  <Typography className="ticket_sub_heading" variant="span">
                    Ticket Number
                  </Typography>
                  <Typography variant="span">{complaintDetail?.id}</Typography>
                </Box>
                <Button
                  onClick={handleCloseTicket}
                  className="close_ticket_button"
                >
                  Close Ticket
                </Button>
              </Box>
              <Box className="row">
                <Typography className="ticket_sub_heading" variant="span">
                  Date
                </Typography>
                <Typography variant="span">
                  {moment(complaintDetail?.date).format('ll')}
                </Typography>
              </Box>
              <Box className="row">
                <Typography className="ticket_sub_heading" variant="span">
                  Status
                </Typography>
                <Typography variant="span">
                  {complaintDetail?.status}
                </Typography>
              </Box>
              <Box className="row">
                <Typography className="ticket_sub_heading" variant="span">
                  About
                </Typography>
                <Typography variant="span">
                  {complaintDetail?.complaintType}
                </Typography>
              </Box>
              <Box className="row">
                <Typography className="ticket_sub_heading" variant="span">
                  Description
                </Typography>
                <Typography variant="span">
                  {complaintDetail?.description}
                </Typography>
              </Box>
            </Box>
            <Box className="customer_feedback_section">
              <Box className="customer_feedback_heading">
                <Typography
                  sx={{ margin: 'auto 0', fontWeight: 600 }}
                  variant="span"
                >
                  Customer Feedback
                </Typography>
                <Button className="common_button">
                  <img src={Like} alt="" />
                </Button>
              </Box>
              <Typography variant="span">
                {complaintDetail?.complaint_feedback?.description}
              </Typography>
            </Box>
          </Box>
          <Box className="complaint_right_section">
            <Box className="customer_feedback_section">
              <Box className="customer_feedback_heading">
                <Typography
                  sx={{ margin: 'auto 0', fontWeight: 600 }}
                  variant="span"
                >
                  Resolve Ticket{' '}
                </Typography>
                <Button onClick={handleClickOpen} className="common_button">
                  Add Status
                </Button>
              </Box>
            </Box>
            <Typography variant="span">Updates</Typography>
            {complaintProcesses.length > 0 &&
              complaintProcesses.map(complainUpdates => {
                return (
                  <Box Box className="complaint_updates">
                    <Box className="date_cell">
                      <Typography variant="span">
                        {moment(complainUpdates?.createdAt).format('Do')}
                      </Typography>
                      <Typography variant="span">
                        {moment(complainUpdates?.createdAt).format('MMM')}
                      </Typography>
                    </Box>
                    <Box className="complain_updates_description">
                      <Typography variant="span">
                        {complainUpdates?.description}
                      </Typography>
                    </Box>
                  </Box>
                )
              })}
          </Box>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle className="row justify-content-center font-weight-bold">
              Ticket Answer
            </DialogTitle>
            <Box className="my-3">
              <div className="row">
                <div className="col-md-12">
                  <Typography className="input_field_label" variant="span">
                    Description<span className="required_star">*</span>
                  </Typography>
                </div>
                <div className="col-md-12">
                  <TextareaAutosize
                    className="w-100"
                    placeholder="Description"
                    variant="outlined"
                    value={ticketAnswer.description}
                    onChange={e => {
                      setTicketAnswer({
                        ...ticketAnswer,
                        description: e.target.value,
                      })
                    }}
                  />
                </div>
              </div>
            </Box>
            <DialogActions className="m-auto">
              <Button variant="contained" onClick={handleAddStatus}>
                Ok
              </Button>
              <Button className="cancel-btn" autoFocus onClick={handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </>
  )
}

export default Complaint
