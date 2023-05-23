import React, { useEffect, useState, useContext } from 'react'
import { Box, Typography, Button } from '@mui/material'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import './index.css'
import { GetSalesInquiry } from '../../services/apiservices/staffDetail'
import moment from 'moment'
import { AttendanceStatus } from '../../services/apiservices/staffDetail'
import { useNavigate } from 'react-router-dom'
import { Context as ContextSnackbar } from '../../context/pageContext'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'

const DashboardEmployee = () => {
  const [salesInquiry, setSalesInquiry] = useState()
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const navigate = useNavigate()
  let path = window.location.pathname
  path = path.split('/').pop()
  const handleGetSalesInquiry = () => {
    GetSalesInquiry(
      {},
      res => {
        setSalesInquiry(res?.data)
      },
      err => {},
    )
  }
  useEffect(() => {
    handleGetSalesInquiry()
  }, [])
  const handleCheckIn = type => {
    AttendanceStatus(
      type,
      res => {
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.message,
        })
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err.response.data.message,
        })
      },
    )
  }
  return (
    <>
      <Box className="main_section">
        <Box className="dashboard_emp_attendance_buttons">
          <Box>
            <Typography sx={{ fontWeight: '600' }} variant="span">
              Today’s Present
            </Typography>
          </Box>
          <Box>
            <Button
              disabled={salesInquiry?.userAttendance?.checkIn ? true : null}
              className="custom_text_button"
              onClick={() => handleCheckIn('checkIn')}
            >
              Check In
            </Button>
            <Button
              disabled={salesInquiry?.userAttendance?.breakIn ? true : null}
              onClick={() => handleCheckIn('breakIn')}
              className="custom_text_button"
            >
              Break In
            </Button>
            <Button
              disabled={salesInquiry?.userAttendance?.breakOut ? true : null}
              onClick={() => handleCheckIn('breakOut')}
              className="custom_text_button"
            >
              Break Out
            </Button>
            <Button
              disabled={salesInquiry?.userAttendance?.checkOut ? true : null}
              onClick={() => handleCheckIn('checkOut')}
              className="custom_text_button"
            >
              Check Out
            </Button>
          </Box>
        </Box>

        <Box className="performance_attendance_row">
          <Box className="performance_section">
            <Typography className="left_panel_heading" variant="span">
              Performance
            </Typography>
            <Box className="performance_terms">
              <Box className="performance_staff_statistics_data">
                <Typography sx={{ padding: '8px' }} variant="span">
                  Total Inquiries
                </Typography>
                <Box className="performance_parameter">
                  <Typography
                    sx={{
                      marginBottom: '15px',
                      paddingBottom: '5px',
                      paddingLeft: '8px',
                    }}
                    variant="span"
                  >
                    {salesInquiry?.performance?.total || '0'}
                  </Typography>
                  <Typography variant="span" className="common_icon">
                    <TrendingUpRoundedIcon className="common_icon" />
                    {salesInquiry?.performance.totalInquiryPercentage}%
                  </Typography>
                </Box>
              </Box>
              <Box className="performance_staff_statistics_data">
                <Typography variant="span">My lead</Typography>
                <Box className="performance_parameter">
                  <Typography
                    sx={{ marginBottom: '15px', paddingBottom: '5px' }}
                    variant="span"
                  >
                    {salesInquiry?.performance?.lead || '0'}
                  </Typography>
                  <Typography variant="span" className="common_icon">
                    <TrendingUpRoundedIcon className="common_icon" />
                    {salesInquiry?.performance.leadPercentage}%
                  </Typography>
                </Box>
              </Box>
              <Box className="performance_staff_statistics_data me-2">
                <Typography variant="span">Total Points</Typography>
                <Box className="performance_parameter">
                  <Typography
                    sx={{ marginBottom: '15px', paddingBottom: '5px' }}
                    variant="span"
                  >
                    {salesInquiry?.performance.points}
                  </Typography>
                  <Typography variant="span" className="common_icon">
                    <TrendingUpRoundedIcon className="common_icon" />
                    {salesInquiry?.performance.pointsPercentage}%
                  </Typography>
                </Box>
              </Box>
              <Box className="performance_staff_statistics_data">
                <Typography sx={{ padding: '8px' }} variant="span">
                  Target Order
                </Typography>
                <Box
                  sx={{ padding: '10px' }}
                  className="below_performance_parameter"
                >
                  <Typography variant="span">
                    {salesInquiry?.performance?.targets?.target || '0'}
                  </Typography>
                  <Typography variant="span" className="common_icon">
                    <TrendingUpRoundedIcon className="common_icon" />
                    5%
                  </Typography>
                </Box>
              </Box>
              <Box className="performance_staff_statistics_data">
                <Typography variant="span">Achieved</Typography>
                <Box className="below_performance_parameter">
                  <Typography variant="span">
                    {salesInquiry?.performance?.targets?.achieved || '0'}
                  </Typography>
                  <Typography variant="span" className="common_icon">
                    <TrendingUpRoundedIcon className="common_icon" />
                    {salesInquiry?.performance?.targets?.percentageAchieved ||
                      '0'}
                    %
                  </Typography>
                </Box>
              </Box>
              <Box className="performance_staff_statistics_data me-2">
                <Typography variant="span">Days Remain</Typography>
                <Box className="below_performance_parameter">
                  <Typography variant="span">
                    {salesInquiry?.performance?.targets?.remainDays || '0'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className="attendance_section">
            <Box className="attendance_subheading">
              <Typography className="right_panel_heading" variant="span">
                Attendance
              </Typography>
              <Typography
                sx={{ color: '#8e8e8e', padding: '10px' }}
                variant="span"
              >
                {salesInquiry?.attendance?.date || '-'}
              </Typography>
            </Box>
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table sx={{ minWidth: 250 }}>
                <TableBody>
                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell align="right">Check In</TableCell>
                    <TableCell align="left">:</TableCell>
                    <TableCell align="left">
                      {salesInquiry?.userAttendance?.checkIn || '-'}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell align="right">Check Out</TableCell>
                    <TableCell align="left">:</TableCell>
                    <TableCell align="left">
                      {salesInquiry?.userAttendance?.checkOut || '-'}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell align="right">Break Time</TableCell>
                    <TableCell align="left">:</TableCell>
                    <TableCell align="left">
                      {salesInquiry?.userAttendance?.breakIn || '-'}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell align="right">Total Hours</TableCell>
                    <TableCell align="left">:</TableCell>
                    <TableCell align="left">
                      {salesInquiry?.userAttendance?.breakOut || '-'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
        <Box className="detail_row">
          <Box className="my_task_section">
            <Box className="my_main_section_header">
              <Typography className="bottom_left_panel_heading" variant="span">
                My Task
              </Typography>
              <Button
                className="view_all_button"
                onClick={() => navigate('/task')}
              >
                View All {'>'}
              </Button>
            </Box>

            <Box className="inner_my_task">
              <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                <Table sx={{ minWidth: 250 }}>
                  <TableHead className="team_overview_table_heading">
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell
                        sx={{ display: 'flex', justifyContent: 'center' }}
                      >
                        Completed
                      </TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {salesInquiry?.tasks &&
                      salesInquiry?.tasks?.map(data => {
                        return (
                          <TableRow
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell align="right">{data?.title}</TableCell>
                            <TableCell align="right">
                              {moment(data?.due_date).format('DD-MM-YYYY')}
                            </TableCell>
                            <TableCell
                              sx={{ display: 'flex', justifyContent: 'center' }}
                            >
                              {data?.completed}
                            </TableCell>
                            <TableCell>{data?.total}</TableCell>
                            <TableCell
                              sx={{ display: 'flex', justifyContent: 'end' }}
                            >
                              <Button
                                onClick={() =>
                                  navigate(`/taskdetail/${data?.id}`)
                                }
                                className="client_view_button common_button"
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
          </Box>

          <Box className="point_table_section">
            <Box className="point_table_heading">
              <Typography className="bottom_right_panel_heading" variant="span">
                My Points
              </Typography>
              <Button className="view_all_button">View All {'>'}</Button>
            </Box>

            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table sx={{ minWidth: 250 }}>
                <TableHead className="team_overview_table_heading">
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Point</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody className="tablebody_class">
                  {salesInquiry?.teamPoints.map(value => {
                    return (
                      <TableRow
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell align="right">
                          {moment(value?.createdAt).format('D/MM/YY')}
                        </TableCell>
                        <TableCell align="right">
                          {value?.point?.name || '-'}
                        </TableCell>
                        <TableCell align="right">
                          {value?.point?.points || '-'}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>

        <Box className="detail_row">
          <Box className="star_performers_section">
            <Box className="my_main_section_header">
              <Typography className="bottom_left_panel_heading" variant="span">
                Star Performers
              </Typography>
            </Box>
            {salesInquiry?.starPerformerList.length > 0 &&
              salesInquiry.starPerformerList.map(data => {
                return (
                  <Box className="a-box">
                    <Box className="img-container">
                      <Box className="img-inner">
                        <Box className="inner-skew">
                          {data?.imgUrl ? (
                            <img
                              src={data?.imgUrl}
                              className="user_profile_icon"
                            />
                          ) : (
                            <AccountCircleRoundedIcon className="user_profile_icon" />
                          )}
                        </Box>
                      </Box>
                    </Box>
                    <Box className="text-container">
                      <h3>{data?.name || '-'}</h3>
                      <h6>{data?.role?.name || '-'}</h6>
                      <h5>Star Performer of the Month.</h5>
                    </Box>
                  </Box>
                )
              })}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default DashboardEmployee
