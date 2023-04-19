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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { EditCalendarReminder } from '../../services/apiservices/adminprofile'
import { Context as ContextEditRemainderDialog } from '../../context/pageContext'
const EditRemainderDialog = props => {
  const [editReminderDetail, setEditReminderDetail] = useState({
    heading: props?.remainderDetails?.heading,
    description: props?.remainderDetails?.description,
    date: props?.remainderDetails?.date,
    time: props?.remainderDetails?.time,
    type: 'REMINDER',
    id: props?.remainderDetails?.id,
  })
  const { editRemainderDialogFlag } = useContext(
    ContextEditRemainderDialog,
  )?.state
  const handleEditReminder = () => {
    if (
      editReminderDetail.heading !== '' &&
      editReminderDetail.description !== '' &&
      editReminderDetail.date !== '' &&
      editReminderDetail.time !== ''
    ) {
      EditCalendarReminder(
        editReminderDetail.id,
        {
          heading: editReminderDetail?.heading,
          description: editReminderDetail?.description,
          date: editReminderDetail?.date,
          time: editReminderDetail?.time,
          type: 'REMINDER',
        },
        res => {
          if (res.success) {
            props.handleRemainderDialogClose()
            setEditReminderDetail({
              ...editReminderDetail,
              heading: '',
              description: '',
              date: '',
              time: '',
            })
          }
        },
        err => {},
      )
    }
  }
  return (
    <>
      <Dialog
        open={editRemainderDialogFlag}
        onClose={props.handleRemainderDialogClose}
      >
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Add Reminder</Typography>

          <TextField
            className="w-100"
            value={editReminderDetail.heading}
            placeholder="Enter Heading"
            onChange={e => {
              setEditReminderDetail({
                ...editReminderDetail,
                heading: e.target.value,
              })
            }}
            type="text"
          />

          <Typography variant="span">
            Date<span className="required_star">*</span>
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="dd/MM/yyyy"
              value={editReminderDetail.date}
              onChange={e => {
                setEditReminderDetail({ ...editReminderDetail, date: e })
              }}
              renderInput={params => <TextField {...params} />}
            />
          </LocalizationProvider>

          <Typography variant="span">
            Time<span className="required_star">*</span>
          </Typography>

          <TextField
            value={editReminderDetail.time}
            className="w-100"
            onChange={e => {
              setEditReminderDetail({
                ...editReminderDetail,
                time: e.target.value,
              })
            }}
            type="time"
          />

          <TextField
            value={editReminderDetail.description}
            className="w-100"
            onChange={e => {
              setEditReminderDetail({
                ...editReminderDetail,
                description: e.target.value,
              })
            }}
            placeholder="Description Here..."
          />

          {/* <DialogActions>
            <Button variant="contained" onClick={handleEditReminder}>
              Save
            </Button>
            <Button
              variant="contained"
              onClick={props.handleRemainderDialogClose}
            >
              Cancel
            </Button>
          </DialogActions> */}
        </Box>
      </Dialog>

      <Dialog
        open={editRemainderDialogFlag}
        onClose={props.handleRemainderDialogClose}
      >
        <div className="px-3 py-3">
          <h3>Reminder</h3>
        </div>
        <DialogContent>
          <Box className="my-3">
            <div className="row">
              <div className="col-md-6">
                <Typography variant="span">Heading</Typography>
              </div>
              <div className="col-md-12">
                <TextField
                  className="w-100"
                  value={editReminderDetail.heading}
                  placeholder="Enter Heading"
                  onChange={e => {
                    setEditReminderDetail({
                      ...editReminderDetail,
                      heading: e.target.value,
                    })
                  }}
                  type="text"
                />
              </div>
            </div>
          </Box>
          <Box className="my-3">
            <div className="row">
              <div className="col-md-6">
                <Typography variant="span">Date</Typography>
              </div>
              <div className="col-md-12">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    disablePast
                    inputFormat="dd/MM/yyyy"
                    value={editReminderDetail.date}
                    onChange={e => {
                      setEditReminderDetail({ ...editReminderDetail, date: e })
                    }}
                    renderInput={params => (
                      <TextField className="w-100" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </Box>
          <Box className="my-3">
            <div className="row">
              <div className="col-md-6">
                <Typography variant="span">Time</Typography>
              </div>
              <div className="col-md-12">
                <TextField
                  value={editReminderDetail.time}
                  className="w-100"
                  onChange={e => {
                    setEditReminderDetail({
                      ...editReminderDetail,
                      time: e.target.value,
                    })
                  }}
                  type="time"
                />
              </div>
            </div>
          </Box>
          <Box className="my-3">
            <div className="row">
              <div className="col-md-6">
                <Typography variant="span">Description</Typography>
              </div>
              <div className="col-md-12">
                <TextareaAutosize
                  value={editReminderDetail.description}
                  className="w-100"
                  onChange={e => {
                    setEditReminderDetail({
                      ...editReminderDetail,
                      description: e.target.value,
                    })
                  }}
                  placeholder="Description Here..."
                />
              </div>
            </div>
          </Box>
        </DialogContent>
        {/* <DialogActions className="m-auto">
          <Button variant="contained" onClick={handleEditReminder}>
            Add
          </Button>
          <Button
            // variant="contained"
            className="cancel-btn"
            onClick={props.handleRemainderDialogClose}
          >
            Cancel
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  )
}

export default EditRemainderDialog
