import React, { useState, useEffect } from 'react'
import {
  Dialog,
  Box,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextareaAutosize,
} from '@mui/material'
import { EditTaskName } from '../../services/apiservices/task'

const EditTitleDialog = ({
  editTaskNameDialog,
  setEditTaskNameDialog,
  handleDialogClose,
}) => {
  const handleEditTaskName = () => {
    EditTaskName(
      { title: editTaskNameDialog?.taskName, id: editTaskNameDialog?.id },
      res => {
        handleDialogClose()
      },
      err => {},
    )
  }
  return (
    <>
      <Dialog open={editTaskNameDialog.status} onClose={handleDialogClose}>
        <div className="px-3 pt-3">
          <h3>Task</h3>
        </div>
        <DialogContent>
          <Box className="py-3">
            <div className="row">
              <div className="col-md-6">
                <Typography variant="span">Task Name</Typography>
              </div>
              <div className="col-md-12">
                <TextareaAutosize
                  style={{ width: 150 }}
                  placeholder="Description Here..."
                  className="w-100"
                  value={editTaskNameDialog.taskName}
                  onChange={e => {
                    setEditTaskNameDialog({
                      ...editTaskNameDialog,
                      taskName: e.target.value,
                    })
                  }}
                />
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ marginLeft: '13px', marginRight: '13px' }}
          className="mt-1 d-flex justify-content-between"
        >
          <Button variant="contained" onClick={handleEditTaskName}>
            Ok
          </Button>
          <Button onClick={handleDialogClose} className="cancel-btn" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditTitleDialog
