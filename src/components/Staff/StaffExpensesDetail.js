import { Button, Dialog, DialogTitle, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'

const StaffExpensesDetail = ({ openStaffExpenses, closeStaffExpenses }) => {
  console.log(openStaffExpenses)
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
              <Button className="common_button expenses_details_heading">
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
                  <Typography variant="span">Food</Typography>
                </Box>
              </Box>
              <Box className="expenses_data">
                <Typography className="expenses_detail_sub_heading">
                  Date
                </Typography>
                <Box className="expenses_parameter expenses_parameter_bottom_border">
                  <Typography variant="span">18 Aug 2023</Typography>
                </Box>
              </Box>
              <Box className="expenses_data">
                <Typography className="expenses_detail_sub_heading">
                  Apply
                </Typography>
                <Box className="expenses_parameter expenses_parameter_bottom_border">
                  <Typography variant="span">25000 Rs.</Typography>
                </Box>
              </Box>
              <Box className="expenses_data">
                <Typography className="expenses_detail_sub_heading">
                  Approved
                </Typography>
                <Box className="expenses_parameter expenses_parameter_bottom_border">
                  <Typography variant="span">23000 Rs.</Typography>
                </Box>
              </Box>

              <Box className="single_expenses_data">
                <Typography className="expenses_detail_sub_heading">
                  Approve By
                </Typography>
                <Box className="expenses_parameter ">
                  <Typography variant="span">Robert Downey Jr.</Typography>
                </Box>
              </Box>

              <Box className="expenses_data">
                <Typography className="expenses_detail_sub_heading">
                  Payment Status
                </Typography>
                <Box className="expenses_parameter ">
                  <Typography variant="span">Pending</Typography>
                </Box>
              </Box>
              <Box className="common_button">
                <Button sx={{ backgroundColor: 'white' }} variant="span">
                  Update
                </Button>
              </Box>
            </Box>

            {/* RIGHT SECTION STARTS */}
            <Box className="expenses_right_section">
              <Box className="document_section">
                <Typography sx={{ color: '#8E8E8E' }} variant="span">
                  Document
                </Typography>
                <PictureAsPdfIcon />
              </Box>

              <Box className="expenses_detailed_portion">
                <Typography className="expenses_detail_sub_heading">
                  Expenses Detail
                </Typography>
                <Box>
                  <Typography variant="span">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
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
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
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
