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
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
const ApproveLeaveDialog = ({
  approveLeave,
  handleGrantLeave,
  handleCloseDialog,
}) => {
  return (
    <>
      <Dialog open={approveLeave.status} onClose={handleCloseDialog}>
        <Box className="px-3 pt-3 text-center">
          <CheckCircleRoundedIcon
            sx={{
              color: '#2E3591',
              height: '50px',
              width: '50px',
            }}
          />
          <Typography sx={{ fontSize: '24px', fontWeight: '600' }}>
            Leave Approval
          </Typography>
        </Box>
        <DialogContent className="text-center">
          <Typography variant="span">
            Are You Sure to Give approval Of This Leave ?
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{ marginLeft: '13px', marginRight: '13px' }}
          className="mt-1 d-flex justify-content-between"
        >
          <Button
            variant="contained"
            className="leave_approval_button"
            onClick={handleGrantLeave}
          >
            Ok
          </Button>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            className="leave_approval_button"
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ApproveLeaveDialog
