import React, { useState, useEffect } from 'react'
import {
  Dialog,
  Box,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  TextareaAutosize,
  DialogTitle,
} from '@mui/material'
import { EditTaskName } from '../../services/apiservices/task'

const EditTitleDialog = ({
  editTaskNameDialog,
  setEditTaskNameDialog,
  handleDialogClose, handleEditTaskName
}) => {

  return (
    <>
      <Dialog
        open={editTaskNameDialog.status}
        onClose={handleDialogClose}>

        <Box className="dialogue_main_section">

          <Typography className='dialogue_heading'>Edit Task</Typography>

          <TextField
            className="dialogue_input_fields"
            label="Task Name"
            variant="outlined"
            value={editTaskNameDialog.taskName}
            onChange={e => {
              setEditTaskNameDialog({
                ...editTaskNameDialog,
                taskName: e.target.value,
              })
            }}
          />
          <TextField
            className="dialogue_input_fields"
            multiline
            placeholder="Description"
            autoComplete="off"
            label="Description"
            minRows={3}
            value={editTaskNameDialog.description}
            onChange={e => {
              setEditTaskNameDialog({
                ...editTaskNameDialog,
                description: e.target.value,
              })
            }}
          />

          <DialogActions>
            <Button
              className='dialogue_bottom_button'
              variant="contained"
              onClick={handleEditTaskName}
            >Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog >
    </>
  )
}

export default EditTitleDialog
