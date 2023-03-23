import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  DialogContent,
  DialogActions,
  Dialog,
  TextareaAutosize,
} from '@mui/material'
// import './index.css'
const ExpenseType = ({
  addExpenseType,
  //   setAddLeaveDialog,
  //   AddLeave,
  handleCloseDialog,
  //   UpdateLeave,
}) => {
  return (
    <>
      <Dialog
        // fullWidth

        // maxWidth="sm"

        open={addExpenseType.status}
        onClose={handleCloseDialog}
      >
        <div className="px-3 pt-3 text-center ms-5 me-5">
          <h3>Expense Type</h3>
        </div>
        <DialogContent>
          <Box className="py-3">
            <div className="row">
              <div className="col-md-12">
                <Typography variant="span">Name</Typography>
              </div>
              <div>
                <TextField
                  value={addExpenseType.type}
                  //   onChange={(e) => {
                  //     setAddLeaveDialog({
                  //       ...addExpenseType,
                  //       type: e.target.value,
                  //     });
                  //   }}
                  inputProps={{
                    style: {
                      height: '50px',
                    },
                  }}
                  className="w-100 h-500"
                  placeholder="Expense Type"
                  variant="outlined"
                />
              </div>
            </div>
          </Box>

          <Box className="py-3">
            <div className="row">
              <div className="col-md-6">
                <Typography variant="span">Details</Typography>
              </div>
              <div className="col-md-12">
                <TextareaAutosize
                  type="number"
                  value={addExpenseType.duration}
                  //   onChange={(e) => {
                  //     setAddLeaveDialog({
                  //       ...addExpenseType,
                  //       duration: e.target.value,
                  //     });
                  //   }}
                  // PaperProps={{ sx: { width: '30%', height: '100%' } }}
                  className="w-100"
                  placeholder="Description Here..."
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
            sx={{ marginLeft: '5rem', backgroundColor: '#2E3591' }}
            // onClick={addExpenseType?.id ? UpdateLeave : AddLeave}
          >
            Save
          </Button>
          {/* <Button onClick={handleCloseDialog} className="cancel-btn" autoFocus>
            Cancel
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ExpenseType
