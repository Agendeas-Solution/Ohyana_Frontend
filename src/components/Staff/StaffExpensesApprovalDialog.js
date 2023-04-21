import {
  Button,
  Dialog,
  DialogActions,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const StaffExpensesApprovalDialog = ({
  openApprovalDialog,
  closeApprovalDialog,
  //   setOpenApprovalDialog,
}) => {
  return (
    <>
      <Dialog open={openApprovalDialog.status} onClose={closeApprovalDialog}>
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">
            Expenses Approval
          </Typography>

          <TextField
            className="dialogue_input_fields"
            label="Approve Amount"
            type="text"
            variant="outlined"
            placeholder="Amount"
          />

          <TextField
            className="dialogue_input_fields"
            label="Detail"
            placeholder="Detail here..."
            autoComplete="off"
            multiline
            minRows={3}
          />

          <DialogActions>
            <Button className="dialogue_bottom_button" variant="contained">
              Approve
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default StaffExpensesApprovalDialog
