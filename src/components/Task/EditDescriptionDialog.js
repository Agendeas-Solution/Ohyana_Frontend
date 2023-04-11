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
import { EditTaskDescription } from '../../services/apiservices/task'
const EditDescriptionDialog = ({
  editDescriptionDialog,
  setEditDescriptionDialog,
  handleDialogClose,
}) => {
  const handleEditDescription = () => {
    EditTaskDescription(
      {
        description: editDescriptionDialog?.description,
        id: editDescriptionDialog?.id,
      },
      res => {
        handleDialogClose()
      },
      err => {},
    )
  }
  return (
    <>
      <Dialog open={editDescriptionDialog.status} onClose={handleDialogClose}>
        <div className="px-3 pt-3">
          <h3>Task Description</h3>
        </div>
        <DialogContent>
          <Box className="py-3">
            <div className="row">
              <div className="col-md-6">
                <Typography variant="span">Duration</Typography>
              </div>
              <div className="col-md-12">
                <TextareaAutosize
                  style={{ width: 150 }}
                  placeholder="Description Here..."
                  className="w-100"
                  value={editDescriptionDialog.description}
                  onChange={e => {
                    setEditDescriptionDialog({
                      ...editDescriptionDialog,
                      description: e.target.value,
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
          <Button
            className="ok-btn"
            variant="contained"
            onClick={handleEditDescription}
          >
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

export default EditDescriptionDialog
