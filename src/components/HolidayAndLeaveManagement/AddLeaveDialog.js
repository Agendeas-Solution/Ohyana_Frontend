import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  DialogContent,
  DialogActions,
  Dialog,
} from '@mui/material'
import dayjs from 'dayjs'
import './index.css'
const AddLeaveDialog = ({
  addLeaveDialog,
  setAddLeaveDialog,
  AddLeave,
  handleCloseDialog,
  UpdateLeave,
}) => {
  return (
    <>
      <Dialog open={addLeaveDialog.status} onClose={handleCloseDialog}>
        <div className="px-3 pt-3 text-center">
          <h3>Leave Management</h3>
        </div>
        <DialogContent>
          <Box className="py-3">
            <div className="row">
              <div className="col-md-12">
                <Typography variant="span">Leave Type</Typography>
              </div>
              <div className="col-md-12">
                <TextField
                  value={addLeaveDialog.type}
                  onChange={e => {
                    setAddLeaveDialog({
                      ...addLeaveDialog,
                      type: e.target.value,
                    })
                  }}
                  className="w-100"
                  placeholder="Enter Leave Name"
                  variant="outlined"
                />
              </div>
            </div>
          </Box>
          <Box className="py-3">
            <div className="row">
              <div className="col-md-6">
                <Typography variant="span">Total Days for Apply</Typography>
              </div>
              <div className="col-md-12">
                <TextField
                  type="number"
                  value={addLeaveDialog.duration}
                  onChange={e => {
                    setAddLeaveDialog({
                      ...addLeaveDialog,
                      duration: e.target.value,
                    })
                  }}
                  className="w-100"
                  placeholder="Enter Days Leave Name"
                  variant="outlined"
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
            variant="contained"
            className="ok-btn"
            onClick={addLeaveDialog?.id ? UpdateLeave : AddLeave}
          >
            Ok
          </Button>
          <Button onClick={handleCloseDialog} className="cancel-btn" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddLeaveDialog
