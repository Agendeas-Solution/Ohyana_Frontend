import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  DialogContent,
  DialogActions,
  Dialog,
  Autocomplete,
  CircularProgress,
  DialogTitle,
  TextareaAutosize,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import './index.css'
import moment from 'moment'
const CompletedPJPDialog = ({
  completedDialog,
  handleCloseCompletedDialog,
  setCompletedDialog,
  handleAddCompletePJPStatus,
}) => {
  return (
    <>
      <Dialog
        open={completedDialog.status}
        onClose={handleCloseCompletedDialog}
      >
        <Box>
          <DialogTitle
            sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}
          >
            Completed PJP
          </DialogTitle>
          <DialogContent>
            <Box>
              <Box className="row my-4">
                <Box className="col-md-6">
                  <Typography variant="span">Detail</Typography>
                </Box>
                <Box className="col-md-12">
                  <TextareaAutosize
                    style={{ width: 160, borderRadius: '5px' }}
                    placeholder="Detail Here..."
                    className="w-100"
                    value={completedDialog.description}
                    onChange={e => {
                      setCompletedDialog({
                        ...completedDialog,
                        description: e.target.value,
                      })
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions className="m-auto">
            <Button
              sx={{ alignContent: 'center', alignItems: 'center' }}
              variant="contained"
              onClick={handleAddCompletePJPStatus}
            >
              Save
            </Button>
            {/* <Button className="cancel-btn" onClick={handleClose} autoFocus>
            Cancel
          </Button> */}
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default CompletedPJPDialog
