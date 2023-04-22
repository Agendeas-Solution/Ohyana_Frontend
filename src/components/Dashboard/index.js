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
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import {
  AttendanceStatus,
  GetInquiryAnalytics,
} from '../../services/apiservices/staffDetail'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { TEAM } from '../../constants'

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
              <Box className="platform_data_detail">
                <Box className="inquiry_sub_heading">
                  <Box className="inquiry_detail_box inquiry_detail_left_part">
                    <Box className="inquiry_from_name">
                      <Box className="inquiries_bullet_point" />
                    </Box>

                    <Box className="inquiries_inner_section">
                      <Typography>IndiaMart</Typography>
                      <Box className="inquiry_row">
                        <Typography variant="span">
                          {inquiryData?.inquiry?.crtMonIndiaMart || 0}
                        </Typography>
                        <Typography variant="span">
                          {inquiryData?.inquiry?.percentageIndiaMart || 0}%
                        </Typography>
                      </Box>
                      <Typography className="small_sub_heading" variant="span">
                        Last Month :{' '}
                        {inquiryData?.inquiry?.lstMonIndiaMart || 0}
                      </Typography>
                      <Divider className="underline" />
                    </Box>
                  </Box>

                  <Box className="inquiry_detail_box inquiry_detail_right_part">
                    <Box className="inquiry_from_name">
                      <Box className="inquiries_bullet_point"></Box>
                    </Box>

                    <Box className="inquiries_inner_section">
                      <Typography>Website</Typography>
                      <Box className="inquiry_row">
                        <Typography variant="span">
                          {inquiryData?.inquiry?.crtMonIndiaMart || 0}
                        </Typography>
                        <Typography variant="span">
                          {inquiryData?.inquiry?.percentageIndiaMart || 0}%
                        </Typography>
                      </Box>
                      <Typography className="small_sub_heading" variant="span">
                        Last Month :{' '}
                        {inquiryData?.inquiry?.lstMonIndiaMart || 0}
                      </Typography>
                      <Divider className="underline" />
                    </Box>
                  </Box>
                </Box>

                <Box
                  className="inquiry_sub_heading"
                  sx={{
                    marginTop: '12px',
                  }}
                >
                  <Box className="inquiry_detail_box inquiry_detail_left_part">
                    <Box className="inquiry_from_name">
                      <Box className="inquiries_bullet_point"></Box>
                    </Box>

                    <Box className="inquiries_inner_section">
                      <Typography>From PJP</Typography>
                      <Box className="inquiry_row">
                        <Typography variant="span">
                          {inquiryData?.inquiry?.crtMonIndiaMart || 0}
                        </Typography>
                        <Typography variant="span">
                          {inquiryData?.inquiry?.percentageIndiaMart || 0}%
                        </Typography>
                      </Box>
                      <Typography className="small_sub_heading" variant="span">
                        Last Month :{' '}
                        {inquiryData?.inquiry?.lstMonIndiaMart || 0}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="inquiry_detail_box inquiry_detail_right_part">
                    <Box className="inquiry_from_name">
                      <Box className="inquiries_bullet_point"></Box>
                    </Box>

                    <Box className="inquiries_inner_section">
                      <Typography>Others</Typography>
                      <Box className="inquiry_row">
                        <Typography variant="span">
                          {inquiryData?.inquiry?.crtMonIndiaMart || 0}
                        </Typography>
                        <Typography variant="span">
                          {inquiryData?.inquiry?.percentageIndiaMart || 0}%
                        </Typography>
                      </Box>
                      <Typography className="small_sub_heading" variant="span">
                        Last Month :{' '}
                        {inquiryData?.inquiry?.lstMonIndiaMart || 0}
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
            <Box className="sales_staff_statistics_data">
              <Typography variant="span">Total</Typography>
              <Box className="sales_parameter sales_parameter_bottom_border">
                <Typography className="dashboard_sub_heading" variant="span">
                  {inquiryData?.sales?.crtLead || 0}
                </Typography>
                <Typography variant="span">
                  <TrendingUpRoundedIcon className="common_icon" />{' '}
                  {inquiryData?.sales?.totalPercentage || 0}%
                </Typography>
              </Box>
            </Box>
            <Box className="sales_staff_statistics_data">
              <Typography>Getting lead </Typography>
              <Box className="sales_parameter sales_parameter_bottom_border">
                <Typography className="dashboard_sub_heading" variant="span">
                  {inquiryData?.sales?.crtLead || 0}
                </Typography>
                <Typography>
                  <TrendingDownRoundedIcon className="common_icon" />{' '}
                  {inquiryData?.sales?.leadPercentage || 0}%
                </Typography>
              </Box>
            </Box>
            <Box className="sales_staff_statistics_data">
              <Typography>Get Order </Typography>
              <Box className="sales_parameter sales_parameter_bottom_border">
                <Typography className="dashboard_sub_heading" variant="span">
                  {inquiryData?.sales?.crtOrders || 0}
                </Typography>
                <Typography>
                  <TrendingDownRoundedIcon className="common_icon" />{' '}
                  {inquiryData?.sales?.orderPercentage || 0}%
                </Typography>
              </Box>
            </Box>
            <Box className="sales_staff_statistics_data">
              <Typography>Pending</Typography>
              <Box className="sales_parameter sales_parameter_bottom_border">
                <Typography className="dashboard_sub_heading" variant="span">
                  {inquiryData?.sales?.crtPending || 0}
                </Typography>
                <Typography>
                  <TrendingDownRoundedIcon className="common_icon" />{' '}
                  {inquiryData?.sales?.pendingInquiryPercentage || 0}%
                </Typography>
              </Box>
            </Box>
            <Box className="sales_staff_statistics_data">
              <Typography>Irrelevant</Typography>
              <Box className="sales_parameter">
                <Typography className="dashboard_sub_heading" variant="span">
                  {inquiryData?.sales?.crtIrrelevant || 0}
                </Typography>
                <Typography>
                  <TrendingDownRoundedIcon className="common_icon" />{' '}
                  {inquiryData?.sales?.irrelevantInquiryPercentage || 0}%
                </Typography>
              </Box>
            </Box>{' '}
            <Box className="sales_staff_statistics_data">
              <Typography>No Response</Typography>
              <Box className="sales_parameter">
                <Typography className="dashboard_sub_heading" variant="span">
                  {inquiryData?.sales?.crtNoResponse || 0}
                </Typography>
                <Typography>
                  <TrendingDownRoundedIcon className="common_icon" />{' '}
                  {inquiryData?.sales?.noRepsoneInquiryPercentage || 0}%
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
              View All {'>'}
            </Button>
          </Box>

          <TableContainer component={Paper} className="set_box_shadow">
            <Table sx={{ minWidth: 650 }}>
              <TableHead className="team_overview_table_heading">
                <TableRow>
                  <TableCell>Team Member</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Attendance</TableCell>
                  <TableCell>Points</TableCell>
                  <TableCell>Performance</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inquiryData?.teamWithPoints &&
                  inquiryData?.teamWithPoints.map(data => {
                    return (
                      <TableRow
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell className="d-flex flex-row align-items-center">
                          <Stack direction="row" spacing={2}>
                            <Avatar
                              sx={{ marginRight: '10px' }}
                              src={
                                data?.imgUrl
                                  ? data?.imgUrl
                                  : '/static/images/avatar/1.jpg'
                              }
                            />
                          </Stack>
                          <Typography>{data?.name || '-'}</Typography>
                        </TableCell>

                        <TableCell>{data?.role || '-'}</TableCell>
                        <TableCell>{data.attendances || '-'}</TableCell>
                        <TableCell>{data.points || '-'}</TableCell>
                        <TableCell>{data.pointPercentage}%</TableCell>
                        <TableCell>
                          {TEAM.JOBTYPE.find(e => e.id == data?.jobType)
                            ?.type || '-'}
                        </TableCell>
                        <TableCell>
                          <Button
                            className="common_button"
                            onClick={() =>
                              navigate(`/staffprofile/${data?.id}`)
                            }
                          >
                            View
                          </Button>
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
            <Button
              className="view_all_button"
              onClick={() => navigate('/orders')}
            >
              {' '}
              View All {'>'}{' '}
            </Button>
          </Box>
          <TableContainer component={Paper} className="set_box_shadow">
            <Table sx={{ minWidth: 650 }}>
              <TableHead className="team_overview_table_heading">
                <TableRow>
                  <TableCell>Order Id</TableCell>
                  <TableCell>Order Of</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Delivery</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Payment Status</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inquiryData?.orderData &&
                  inquiryData?.orderData.map(row => (
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{row?.id || '-'}</TableCell>
                      <TableCell>{row?.client?.name || '-'}</TableCell>
                      <TableCell>
                        {moment(row?.date).format('L') || '-'}
                      </TableCell>
                      <TableCell>{row?.order_total || '-'}</TableCell>
                      <TableCell>{row?.orderTrackingStatus || '-'}</TableCell>
                      <TableCell>{row?.paymentMethod || '-'}</TableCell>
                      <TableCell>{row?.paymentStatus || '-'}</TableCell>
                      <TableCell>
                        <Button
                          className="common_button"
                          onClick={() => navigate(`/orderDetail/${row?.id}`)}
                        >
                          View
                        </Button>
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
