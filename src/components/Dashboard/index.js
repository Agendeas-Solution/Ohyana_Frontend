import React, { useEffect, useState } from 'react'
import DonutChart from 'react-donut-chart'
import { Box, Typography, Button, Divider } from '@mui/material'
import './index.css'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
  AttendanceStatus,
  GetInquiryAnalytics,
} from '../../services/apiservices/staffDetail'
const Dashboard = () => {
  const [inquiryData, setInquiryData] = useState()

  useEffect(() => {
    GetInquiryAnalytics(
      {},
      res => {
        setInquiryData(res.data.data)
      },
      err => {},
    )
  }, [])

  const handleCheckIn = type => {
    AttendanceStatus(
      type,
      res => {},
      err => {},
    )
  }

  return (
    <>
      <Box className="main_section">
        <Box className="attendance_buttons">
          <Box>
            <Typography className="dashboard_heading" variant="span">
              Today’s Present
            </Typography>
          </Box>
          <Box>
            <Button
              onClick={() => handleCheckIn('checkIn')}
              className="check_InOut_Break_InOut_Btn"
            >
              Check In
            </Button>
            <Button
              onClick={() => handleCheckIn('breakIn')}
              className="check_InOut_Break_InOut_Btn"
            >
              Break In
            </Button>
            <Button
              onClick={() => handleCheckIn('breakOut')}
              className="check_InOut_Break_InOut_Btn"
            >
              Break Out
            </Button>
            <Button
              onClick={() => handleCheckIn('checkOut')}
              className="check_InOut_Break_InOut_Btn"
            >
              Check Out
            </Button>
          </Box>
        </Box>

        <Box className="inquiry_sales_statistics">
          <Box className="inquiry_overview">
            <Box className="dashboard_inner_heading">
              <Typography className="dashboard_sub_heading" variant="span">
                Inquiries Overview
              </Typography>
            </Box>

            <Box className="common_row">
              <Box className="platform_data_detail row">
                <Box
                  sx={{
                    marginLeft: '10px',
                  }}
                  className="inquiry_detail_box test_using_after"
                >
                  <Box className="inquiry_from_name">
                    <Box
                      sx={{
                        backgroundColor: '#FFAB00',
                        height: '10px',
                        width: '10px',
                        marginRight: '10px',
                      }}
                    ></Box>
                    <Typography variant="span">IndiaMart</Typography>
                  </Box>
                  <Box className="inquiry_row">
                    <Typography variant="span">
                      {inquiryData?.inquiry?.crtMonIndiaMart}
                    </Typography>
                    <Typography variant="span">
                      {inquiryData?.inquiry?.percentageIndiaMart}%
                    </Typography>
                  </Box>
                  <Typography
                    className="small_sub_heading test_using_dummy"
                    variant="span"
                  >
                    Last Month : {inquiryData?.inquiry?.lstMonIndiaMart}
                  </Typography>
                  <Divider className="underline" />
                </Box>

                <Box
                  sx={{ borderBottom: '1px solid #E5E5E5', marginLeft: '10px' }}
                  className="inquiry_detail_box"
                >
                  <Box className="inquiry_from_name">
                    <Box
                      sx={{
                        backgroundColor: '#FD4545',
                        height: '10px',
                        width: '10px',
                        marginRight: '10px',
                      }}
                    ></Box>
                    <Typography variant="span">Website</Typography>
                  </Box>
                  <Box className="inquiry_row">
                    <Typography variant="span">
                      {inquiryData?.inquiry?.crtMonWeb}
                    </Typography>
                    <Typography variant="span">100%</Typography>
                  </Box>
                  <Typography className="small_sub_heading" variant="span">
                    Last Month :{inquiryData?.inquiry?.lstMonWeb}{' '}
                  </Typography>
                  <Divider className="underline" />
                </Box>

                <Box className="inquiry_detail_box">
                  <Box className="inquiry_from_name">
                    <Box
                      sx={{
                        backgroundColor: '#B09FFF',
                        height: '10px',
                        width: '10px',
                        marginLeft: '10px',
                        marginRight: '10px',
                      }}
                    ></Box>
                    <Typography variant="span">From PJP</Typography>
                  </Box>
                  <Box className="inquiry_row">
                    <Typography variant="span">
                      {inquiryData?.inquiry?.lstMonWeb}
                    </Typography>
                    <Typography variant="span">
                      {inquiryData?.inquiry?.lstMonWeb}%
                    </Typography>
                  </Box>
                  <Typography className="small_sub_heading" variant="span">
                    Last Month : 85
                  </Typography>
                </Box>

                <Box className="inquiry_detail_box">
                  <Box className="inquiry_from_name">
                    <Box
                      sx={{
                        backgroundColor: '#F985CA',
                        height: '10px',
                        width: '10px',
                        marginRight: '10px',
                      }}
                    ></Box>
                    <Typography variant="span">Other</Typography>
                  </Box>
                  <Box className="inquiry_row">
                    <Typography variant="span">
                      {inquiryData?.inquiry?.crtMonOther}
                    </Typography>
                    <Typography variant="span">
                      {inquiryData?.inquiry?.lstMonWeb}%
                    </Typography>
                  </Box>
                  <Typography className="small_sub_heading" variant="span">
                    Last Month : {inquiryData?.inquiry?.lstMonOther}
                  </Typography>
                </Box>
              </Box>

              <Box className="doughnut_chart_inquiry">
                <DonutChart
                  height={200}
                  width={200}
                  legend={false}
                  emptyOffset={false}
                  strokeColor={false}
                  toggledOffset={false}
                  data={[
                    {
                      label: 'hello',
                      value: 20,
                    },
                    {
                      label: 'hello1',
                      value: 20,
                    },
                    {
                      label: 'hello',
                      value: 25,
                    },
                    {
                      label: 'hello',
                      value: 35,
                    },
                  ]}
                />
              </Box>
            </Box>
            <Box></Box>
          </Box>

          <Box className="sales_statistics">
            <Typography
              className="dashboard_sub_heading sales_statistics_heading"
              variant="span"
            >
              Sales Statistics
            </Typography>
            <Box className="sales_statistics_data">
              <Typography variant="span">Total</Typography>
              <Box className="sales_parameter sales_parameter_bottom_border">
                <Typography className="dashboard_sub_heading" variant="span">
                  {inquiryData?.sales?.crtLead}
                </Typography>
                <Typography variant="span">
                  <TrendingUpRoundedIcon className="common_icon" /> 5%
                </Typography>
              </Box>
            </Box>
            <Box className="sales_statistics_data">
              <Typography>Getting lead </Typography>
              <Box className="sales_parameter sales_parameter_bottom_border">
                <Typography className="dashboard_sub_heading" variant="span">
                  {inquiryData?.sales?.crtLead}
                </Typography>
                <Typography>
                  <TrendingDownRoundedIcon className="common_icon" /> 5%
                </Typography>
              </Box>
            </Box>
            <Box className="sales_statistics_data">
              <Typography>Get Order </Typography>
              <Box className="sales_parameter sales_parameter_bottom_border">
                <Typography className="dashboard_sub_heading" variant="span">
                  {inquiryData?.sales?.crtOrders}
                </Typography>
                <Typography>
                  <TrendingDownRoundedIcon className="common_icon" /> 5%
                </Typography>
              </Box>
            </Box>
            <Box className="sales_statistics_data">
              <Typography>Pending</Typography>
              <Box className="sales_parameter sales_parameter_bottom_border">
                <Typography className="dashboard_sub_heading" variant="span">
                  {inquiryData?.sales?.crtPending}
                </Typography>
                <Typography>
                  <TrendingDownRoundedIcon className="common_icon" /> 5%
                </Typography>
              </Box>
            </Box>
            <Box className="sales_statistics_data">
              <Typography>Irrelevant</Typography>
              <Box className="sales_parameter">
                <Typography className="dashboard_sub_heading" variant="span">
                  {inquiryData?.sales?.crtIrrelevant}
                </Typography>
                <Typography>
                  <TrendingDownRoundedIcon className="common_icon" /> 5%
                </Typography>
              </Box>
            </Box>{' '}
            <Box className="sales_statistics_data">
              <Typography>No Response</Typography>
              <Box className="sales_parameter">
                <Typography className="dashboard_sub_heading" variant="span">
                  {inquiryData?.sales?.crtNoResponse}
                </Typography>
                <Typography>
                  <TrendingDownRoundedIcon className="common_icon" /> 5%
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="team_overview">
          <Box className="team_overview_heading">
            <Typography className="team_overview_inner_heading" variant="span">
              Team Overview
            </Typography>
            <Button className="view_all_button"> View All > </Button>
          </Box>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead className="team_overview_table_heading">
                <TableRow>
                  <TableCell>Team Member</TableCell>
                  <TableCell align="right">Role</TableCell>
                  <TableCell align="right">Attendance</TableCell>
                  <TableCell align="right">Points</TableCell>
                  <TableCell align="right">Performance</TableCell>
                  <TableCell align="right">Location</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inquiryData?.teamWithPoints.map(data => {
                  console.log({ DATA: data })
                  return (
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="right">{data?.name || '-'}</TableCell>
                      <TableCell align="right">{data?.role || '-'}</TableCell>
                      <TableCell align="right">
                        {data.attendances || '-'}
                      </TableCell>
                      <TableCell align="right">{data.points || '-'}</TableCell>
                      <TableCell align="right">
                        {data.performance || '-'}
                      </TableCell>
                      <TableCell align="right">
                        {data?.location || '-'}
                      </TableCell>
                      <TableCell align="right">
                        <Button className="common_button">View</Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box className="team_overview">
          <Box className="team_overview_heading">
            <Typography className="team_overview_inner_heading" variant="span">
              Order Overview
            </Typography>
            <Button className="view_all_button"> View More > </Button>
          </Box>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead className="team_overview_table_heading">
                <TableRow>
                  <TableCell>Order Id</TableCell>
                  <TableCell align="right">Order Of</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Delivery</TableCell>
                  <TableCell align="right">Payment</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inquiryData?.orderData.map(row => (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.name || '-'}</TableCell>
                    <TableCell align="right">{row.name || '-'}</TableCell>
                    <TableCell align="right">{row.name || '-'}</TableCell>
                    <TableCell align="right">{row.name || '-'}</TableCell>
                    <TableCell align="right">{row.name || '-'}</TableCell>
                    <TableCell align="right">{row.name || '-'}</TableCell>
                    <TableCell align="right">{row.name || '-'}</TableCell>
                    <TableCell align="right">
                      <Button className="common_button">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  )
}

export default Dashboard
