import React, { useState } from 'react';
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
const CreateTaskDialog = ({
  fullScreen,
  open,
  createTask,
  handleCreateTask,
  setCreateTask, handleClose
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <Box className="popup_section">

          <DialogTitle className="popup_heading">
            Create Task
          </DialogTitle>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="dd/MM/yyyy"
              value={createTask.due_date}
              onChange={e => {
                setCreateTask({ ...createTask, due_date: e })
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="popup_section_input_fields"
                />
              )}
              PopperProps={{
                placement: 'bottom-start', // Set placement to 'bottom-start'
              }}
            />
          </LocalizationProvider>

          <TextField
            className="popup_section_input_fields"
            label="Task Name"
            variant="outlined"
            value={createTask.title}
            onChange={e => {
              setCreateTask({ ...createTask, title: e.target.value })
            }}
          />

          <TextField
            className="popup_section_input_fields"
            multiline
            placeholder="Description"
            autoComplete="off"
            label="Description"
            minRows={3}
            value={createTask.description}
            onChange={e => {
              setCreateTask({
                ...createTask,
                description: e.target.value,
              })
            }}
          />

          <Button
            className='popup_section_bottom_button'
            variant="contained"
            onClick={handleCreateTask}
          >Create
          </Button>
        </Box>


      </Dialog >
    </>
  )
}

export default CreateTaskDialog
