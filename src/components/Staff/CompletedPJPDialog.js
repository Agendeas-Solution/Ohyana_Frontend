import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  DialogActions,
  Dialog,
} from '@mui/material'
import './index.css'

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
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Completed PJP</Typography>

          {/* <DialogContent>
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
          </DialogContent> */}

          <TextField
            className="dialogue_input_fields"
            multiline
            autoComplete="off"
            label="Detail"
            minRows={3}
            placeholder="Detail Here..."
            value={completedDialog.description}
            onChange={e => {
              setCompletedDialog({
                ...completedDialog,
                description: e.target.value,
              })
            }}
          />

          <DialogActions>
            <Button
              // sx={{ alignContent: 'center', alignItems: 'center' }}
              className="dialogue_bottom_button"
              variant="contained"
              onClick={handleAddCompletePJPStatus}
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default CompletedPJPDialog
