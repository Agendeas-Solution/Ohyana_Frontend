import React, { useState } from 'react'
import { Button, Dialog, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'

const StaffExpensesDetail = ({
  openStaffExpenses,
  closeStaffExpenses,
  openApprovalDialog,
  setOpenApprovalDialog,
  paymentVerification,
  setPaymentVerification,
}) => {
  return (
    <>
      <Dialog
        open={openStaffExpenses.status}
        onClose={closeStaffExpenses}
        fullWidth
        maxWidth="md"
      >
        <Box className="expenses_detail_main_section">
          <Box className="expenses_detail_header">
            <Typography className="expenses_details_heading" variant="span">
              Expenses Detail
            </Typography>
            <Box>
              <Button
                // onClick={() => {
                //   setApprovalDialog(true)
                // }}
                // onClick={openApprovalDialog}
                onClick={() => {
                  setOpenApprovalDialog({
                    ...openApprovalDialog,
                    status: true,
                    teamExpenseId: openStaffExpenses.data.id,
                  })
                  debugger
                }}
                className="common_button expenses_details_heading"
              >
                Approve
              </Button>
            </Box>
          </Box>
          <Divider
            sx={{
              width: '97%',
              margin: '4px auto',
              backgroundColor: '#C4C4C4',
            }}
          />

          {/* <Box className="expenses_detail_section">
            <Box className="expenses_detail_left_section">
              <Box className="inner_expenses_detail_left_section">
                <Typography>Type</Typography>
              </Box>
            </Box>
          </Box> */}
          <Box className="expenses_detail_body_section">
            <Box className="expenses_left_section">
              <Box className="expenses_data">
                <Typography className="expenses_detail_sub_heading">
                  Type
                </Typography>
                <Box className="expenses_parameter expenses_parameter_bottom_border">
                  <Typography variant="span">
                    {openStaffExpenses?.data?.name || '-'}
                  </Typography>
                </Box>
              </Box>
              <Box className="expenses_data">
                <Typography className="expenses_detail_sub_heading">
                  Date
                </Typography>
                <Box className="expenses_parameter expenses_parameter_bottom_border">
                  <Typography variant="span">
                    {openStaffExpenses?.data?.date ?? '-'}
                  </Typography>
                </Box>
              </Box>
              <Box className="expenses_data">
                <Typography className="expenses_detail_sub_heading">
                  Apply
                </Typography>
                <Box className="expenses_parameter expenses_parameter_bottom_border">
                  <Typography variant="span">
                    {openStaffExpenses?.data?.amount ?? '-'}
                  </Typography>
                </Box>
              </Box>
              <Box className="expenses_data">
                <Typography className="expenses_detail_sub_heading">
                  Approved
                </Typography>
                <Box className="expenses_parameter expenses_parameter_bottom_border">
                  <Typography variant="span">
                    {openStaffExpenses?.data?.approvalAmount ?? '-'}
                  </Typography>
                </Box>
              </Box>
              <Box className="single_expenses_data">
                <Typography className="expenses_detail_sub_heading">
                  Approve By
                </Typography>
                <Box className="expenses_parameter ">
                  <Typography variant="span">
                    {openStaffExpenses?.data?.aprrovalBy || '-'}
                  </Typography>
                </Box>
              </Box>
              <Box className="expenses_data">
                <Typography className="expenses_detail_sub_heading">
                  Payment Status
                </Typography>
                <Box className="expenses_parameter ">
                  <Typography variant="span">
                    {openStaffExpenses?.data?.payment_status || '-'}
                  </Typography>
                </Box>
              </Box>
              <Box className="common_button">
                <Button
                  disabled={openStaffExpenses?.data?.status !== 'APPROVED'}
                  onClick={() =>
                    setPaymentVerification({
                      ...paymentVerification,
                      status: true,
                      teamExpenseId: openStaffExpenses.data.id,
                    })
                  }
                  sx={{ backgroundColor: 'white' }}
                  variant="span"
                >
                  Update
                </Button>
              </Box>
            </Box>
            {/* RIGHT SECTION STARTS */}
            <Box className="expenses_right_section">
              <Box className="document_section">
                <Typography sx={{ color: '#8E8E8E' }} variant="span">
                  {openStaffExpenses?.data?.file || '-'}
                </Typography>
                <PictureAsPdfIcon />
              </Box>
              <Box className="expenses_detailed_portion">
                <Typography className="expenses_detail_sub_heading">
                  Expenses Detail
                </Typography>
                <Box>
                  <Typography variant="span">
                    {openStaffExpenses?.data?.expense_description || '-'}
                  </Typography>
                </Box>
              </Box>
              <Divider width="100%" />
              <Box className="expenses_approval_rejection_portion">
                <Typography className="expenses_detail_sub_heading">
                  Approval / Rejection Detail
                </Typography>
                <Box>
                  <Typography variant="span">
                    {openStaffExpenses?.data?.description || '-'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  )
}

export default StaffExpensesDetail
