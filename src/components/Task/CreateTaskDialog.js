import React from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  Paper,
  TextareaAutosize,
} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment from 'moment'
const CreateTaskDialog = ({
  handleClose,
  fullScreen,
  open,
  createTask,
  handleCreateTask,
  setCreateTask,
}) => {
  return (
    <>
      <Dialog
        className="w-100"
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className="row justify-content-center font-weight-bold">
          Create Task
        </DialogTitle>
        <Box className="my-3 mx-5">
          <div className="row">
            <div className="col-md-12">
              <Typography className="input_field_label" variant="span">
                Task Name<span className="required_star">*</span>
              </Typography>
            </div>
            <div className="col-md-12">
              <TextField
                className="w-100"
                placeholder="Task Name"
                variant="outlined"
                value={createTask.title}
                onChange={e => {
                  setCreateTask({ ...createTask, title: e.target.value })
                }}
              />
            </div>
          </div>
        </Box>
        <Box className="my-3 mx-5">
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
                value={createTask.description}
                onChange={e => {
                  setCreateTask({
                    ...createTask,
                    description: e.target.value,
                  })
                }}
              />
            </div>
          </div>
        </Box>
        {/* <Box>
          <div className="row">
            <div className="col-md-6">
              <Typography variant="span">Date</Typography>
            </div>
            <div className="col-md-12">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  disablePast
                  className="w-100"
                  value={createTask.due_date}
                  inputFormat="dd/MM/yyyy"
                  onChange={e => {
                    setCreateTask({
                      ...createTask,
                      due_date: moment(e).format('YYYY-MM-DD'),
                    })
                  }}
                  renderInput={params => (
                    <TextField className="w-100" {...params} />
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>
        </Box> */}
        <DialogActions className="m-auto">
          <Button
            sx={{ fontSize: '20px', backgroundColor: '#2E3591' }}
            className="px-5 pe-5"
            variant="contained"
            onClick={handleCreateTask}
          >
            Create
          </Button>
          {/* <Button className="cancel-btn" autoFocus onClick={handleClose}>
            Cancel
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CreateTaskDialog
