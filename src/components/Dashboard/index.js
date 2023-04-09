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
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {
  AttendanceStatus,
  GetInquiryAnalytics,
} from '../../services/apiservices/staffDetail'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
  const navigate = useNavigate()
  const [inquiryData, setInquiryData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    GetInquiryAnalytics(
      {},
      res => {
        setInquiryData(res.data.data)
      },
      (err) => {
      },
    )
  }, [])

  const handleCheckIn = type => {
    AttendanceStatus(
      type,
      res => { },
      err => { },
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
              className="custom_text_button"
            >
              Check In
            </Button>
            <Button
              onClick={() => handleCheckIn('breakIn')}
              className="custom_text_button"
            >
              Break In
            </Button>
            <Button
              onClick={() => handleCheckIn('breakOut')}
              className="custom_text_button"
            >
              Break Out
            </Button>
            <Button
              onClick={() => handleCheckIn('checkOut')}
              className="custom_text_button"
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
              <Box
                className="platform_data_detail"
                sx={{
                  justifyContent: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  marginRight: '8px',
                  marginLeft: '8px',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Box
                    className="inquiry_detail_box"
                    sx={{
                      display: 'flex',
                      alignItems: 'start',
                      marginRight: '40px',
                    }}
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
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: '3px',
                        width: '100%',
                      }}
                    >
                      <Typography>IndiaMart</Typography>
                      <Box className="inquiry_row">
                        <Typography variant="span">
                          {inquiryData?.inquiry?.crtMonIndiaMart}
                        </Typography>
                        <Typography variant="span">
                          {inquiryData?.inquiry?.percentageIndiaMart}%
                        </Typography>
                      </Box>
                      <Typography className="small_sub_heading" variant="span">
                        Last Month : {inquiryData?.inquiry?.lstMonIndiaMart}
                      </Typography>
                      <Divider className="underline" />
                    </Box>
                  </Box>

                  <Box
                    className="inquiry_detail_box"
                    sx={{
                      display: 'flex',
                      alignItems: 'start',
                    }}
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
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: '3px',
                        width: '100%',
                      }}
                    >
                      <Typography>Website</Typography>
                      <Box className="inquiry_row">
                        <Typography variant="span">
                          {inquiryData?.inquiry?.crtMonIndiaMart}
                        </Typography>
                        <Typography variant="span">
                          {inquiryData?.inquiry?.percentageIndiaMart}%
                        </Typography>
                      </Box>
                      <Typography className="small_sub_heading" variant="span">
                        Last Month : {inquiryData?.inquiry?.lstMonIndiaMart}
                      </Typography>
                      <Divider className="underline" />
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '12px',
                  }}
                >
                  <Box
                    className="inquiry_detail_box"
                    sx={{
                      display: 'flex',
                      alignItems: 'start',
                      marginRight: '40px',
                    }}
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
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: '3px',
                        width: '100%',
                      }}
                    >
                      <Typography>From PJP</Typography>
                      <Box className="inquiry_row">
                        <Typography variant="span">
                          {inquiryData?.inquiry?.crtMonIndiaMart}
                        </Typography>
                        <Typography variant="span">
                          {inquiryData?.inquiry?.percentageIndiaMart}%
                        </Typography>
                      </Box>
                      <Typography className="small_sub_heading" variant="span">
                        Last Month : {inquiryData?.inquiry?.lstMonIndiaMart}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    className="inquiry_detail_box"
                    sx={{
                      display: 'flex',
                      alignItems: 'start',
                    }}
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
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: '3px',
                        width: '100%',
                      }}
                    >
                      <Typography>Others</Typography>
                      <Box className="inquiry_row">
                        <Typography variant="span">
                          {inquiryData?.inquiry?.crtMonIndiaMart}
                        </Typography>
                        <Typography variant="span">
                          {inquiryData?.inquiry?.percentageIndiaMart}%
                        </Typography>
                      </Box>
                      <Typography className="small_sub_heading" variant="span">
                        Last Month : {inquiryData?.inquiry?.lstMonIndiaMart}
                      </Typography>
                    </Box>
                  </Box>
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
                  <TrendingUpRoundedIcon className="common_icon" /> {inquiryData?.sales?.totalPercentage || 0}%
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
                  <TrendingDownRoundedIcon className="common_icon" /> {inquiryData?.sales?.leadPercentage || 0}%
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
                  <TrendingDownRoundedIcon className="common_icon" /> {inquiryData?.sales?.orderPercentage || 0}%
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
                  <TrendingDownRoundedIcon className="common_icon" /> {inquiryData?.sales?.pendingInquiryPercentage || 0}%
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
                  <TrendingDownRoundedIcon className="common_icon" /> {inquiryData?.sales?.irrelevantInquiryPercentage || 0}%
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
                  <TrendingDownRoundedIcon className="common_icon" /> {inquiryData?.sales?.noRepsoneInquiryPercentage || 0}%
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
            <Button
              className="view_all_button"
              onClick={() => navigate('/staff')}
            >
              View All >
            </Button>
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
                {inquiryData?.teamWithPoints && inquiryData?.teamWithPoints.map(data => {
                  console.log({ DATA: data })
                  return (
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align='right'>
                        <Stack direction="row" spacing={2}>
                          <Avatar
                            className="me-2"
                            sx={{ width: 40, height: 40 }}
                            src={data?.imageUrl ? data?.imageUrl : "/static/images/avatar/1.jpg"}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell align="right">{data?.name || '-'}</TableCell>
                      <TableCell align="right">{data?.role || '-'}</TableCell>
                      <TableCell align="right">
                        {data.attendances || '-'}
                      </TableCell>
                      <TableCell align="right">{data.points || '-'}</TableCell>
                      <TableCell align="right">
                        {data.pointPercentage}%
                      </TableCell>
                      <TableCell align="right">
                        {data?.location || '-'}
                      </TableCell>
                      <TableCell align="right">
                        <Button className="common_button" onClick={() =>
                          navigate(
                            `/staffprofile/${data?.id}`,
                          )
                        }>View</Button>
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
            <Button className="view_all_button" onClick={() => navigate('/orders')}>  View All > </Button>
          </Box>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead className="team_overview_table_heading">
                <TableRow>
                  <TableCell>Order Id</TableCell>
                  <TableCell align="right">Order Of</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Delivery</TableCell>
                  <TableCell align="right">Payment Method</TableCell>
                  <TableCell align="right">Payment Status</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inquiryData?.orderData && inquiryData?.orderData.map(row => (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row?.id || '-'}</TableCell>
                    <TableCell align="right">{row?.client?.name || '-'}</TableCell>
                    <TableCell align="right">{moment(row?.date).format('L') || '-'}</TableCell>
                    <TableCell align="right">{row?.order_total || '-'}</TableCell>
                    <TableCell align="right">{row?.orderTrackingStatus || '-'}</TableCell>
                    <TableCell align="right">{row?.paymentMethod || '-'}</TableCell>
                    <TableCell align="right">{row?.paymentStatus || '-'}</TableCell>
                    <TableCell align="right">
                      <Button className="common_button" onClick={() => navigate(`/orderDetail/${row?.id}`)}>View</Button>
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
