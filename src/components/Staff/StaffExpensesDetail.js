import { Button, Dialog, DialogTitle, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const StaffExpensesDetail = ({ openStaffExpenses, closeStaffExpenses }) => {
  return (
    <>
      <Dialog open={openStaffExpenses} onClose={closeStaffExpenses}>
        <Box className="expenses_detail_main_section">
          <Box className="expenses_detail_header">
            <Typography variant="span">Expenses Detail</Typography>
            <Box>
              <Button className="common_button">Approve</Button>
            </Box>
          </Box>
          <Divider sx={{ width: '100%', margin: '0 auto' }} />
          <Box className="expenses_detail_section">
            <Box className="expenses_detail_left_section">
              <Box className="inner_expenses_detail_left_section">
                <Typography>Type</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  )
}

export default StaffExpensesDetail

// display: flex;
// width: 100%;
// justify-content: space-between;
// align-content: center;
// align-items: center;
// padding: 8px 0px;
