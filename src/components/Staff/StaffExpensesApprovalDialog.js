import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  TextField,
  Typography,
  Box,
} from '@mui/material'

const StaffExpensesApprovalDialog = ({
  openApprovalDialog,
  closeApprovalDialog,
  setOpenApprovalDialog,
  handleExpenseApproval,
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
            type="number"
            value={openApprovalDialog.amount}
            onChange={e =>
              setOpenApprovalDialog({
                ...openApprovalDialog,
                amount: e.target.value,
              })
            }
            variant="outlined"
            placeholder="Amount"
          />
          <TextField
            className="dialogue_input_fields"
            label="Detail"
            value={openApprovalDialog.description}
            onChange={e =>
              setOpenApprovalDialog({
                ...openApprovalDialog,
                description: e.target.value,
              })
            }
            placeholder="Detail here..."
            autoComplete="off"
            multiline
            minRows={3}
            maxRows={3}
          />
          <DialogActions>
            <Button
              onClick={handleExpenseApproval}
              className="dialogue_bottom_button"
              variant="contained"
            >
              Approve
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default StaffExpensesApprovalDialog
