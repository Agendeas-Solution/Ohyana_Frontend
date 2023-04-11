import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
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
import StarPerformer from '../../assets/img/star_performer.png'
import SecondStarPerformer from '../../assets/img/second_star_performer.png'

const DashboardEmployee = () => {
  const [salesInquiry, setSalesInquiry] = useState()
  useEffect(() => {
    GetSalesInquiry(
      {},
      res => {
        setSalesInquiry(res?.data)
      },
      err => {},
    )
  }, [])
  return (
    <>
      <Box className="dashboard_emp_main_section">
        <Box className="dashboard_emp_attendance_buttons">
          <Box>
            <Typography sx={{ fontWeight: '600' }} variant="span">
              Today’s Present
            </Typography>
          </Box>
          <Box>
            <Button className="custom_text_button">Check In</Button>
            <Button className="custom_text_button">Break In</Button>
            <Button className="custom_text_button">Break Out</Button>
            <Button className="custom_text_button">Check Out</Button>
          </Box>
        </Box>

        <Box className="performance_attendance_row">
          <Box className="performance_section">
            <Typography className="left_panel_heading" variant="span">
              Performance
            </Typography>

            <Box className="performance_terms">
              <Box className="performance_statistics_data">
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
                    {salesInquiry?.performance?.total}
                  </Typography>
                  <Typography variant="span" className="common_icon">
                    <TrendingUpRoundedIcon className="common_icon" />
                    5%
                  </Typography>
                </Box>
              </Box>
              <Box className="performance_statistics_data">
                <Typography variant="span">My lead</Typography>
                <Box className="performance_parameter">
                  <Typography
                    sx={{ marginBottom: '15px', paddingBottom: '5px' }}
                    variant="span"
                  >
                    {salesInquiry?.performance?.total}
                  </Typography>
                  <Typography variant="span" className="common_icon">
                    <TrendingUpRoundedIcon className="common_icon" />
                    5%
                  </Typography>
                </Box>
              </Box>
              <Box className="performance_statistics_data me-2">
                <Typography variant="span">Total Points</Typography>
                <Box className="performance_parameter">
                  <Typography
                    sx={{ marginBottom: '15px', paddingBottom: '5px' }}
                    variant="span"
                  >
                    400
                  </Typography>
                  <Typography variant="span" className="common_icon">
                    <TrendingUpRoundedIcon className="common_icon" />
                    5%
                  </Typography>
                </Box>
              </Box>

              <Box className="performance_statistics_data">
                <Typography sx={{ padding: '8px' }} variant="span">
                  Target Order
                </Typography>
                <Box
                  sx={{ padding: '10px' }}
                  className="below_performance_parameter"
                >
                  <Typography variant="span">400</Typography>
                  <Typography variant="span" className="common_icon">
                    <TrendingUpRoundedIcon className="common_icon" />
                    5%
                  </Typography>
                </Box>
              </Box>
              <Box className="performance_statistics_data">
                <Typography variant="span">Achieved</Typography>
                <Box className="below_performance_parameter">
                  <Typography variant="span">400</Typography>
                  <Typography variant="span" className="common_icon">
                    <TrendingUpRoundedIcon className="common_icon" />
                    5%
                  </Typography>
                </Box>
              </Box>
              <Box className="performance_statistics_data me-2">
                <Typography variant="span">Days Remain</Typography>
                <Box className="below_performance_parameter">
                  <Typography variant="span">400</Typography>
                  <Typography variant="span" className="common_icon">
                    <TrendingUpRoundedIcon className="common_icon" />
                    5%
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
                22 Oct 2022
              </Typography>
            </Box>
            <Box className="right_panel_sub_heading">
              <Typography variant="span">Check In </Typography>
              <Typography variant="span">:</Typography>
              <Typography variant="span">
                {moment(
                  `${salesInquiry?.attendance?.date} ${salesInquiry?.attendance?.checkIn}`,
                ).format('hh:MM A')}
              </Typography>
            </Box>
            <Box className="right_panel_sub_heading">
              <Typography variant="span">Check Out </Typography>
              <Typography variant="span">:</Typography>
              <Typography variant="span">
                {salesInquiry?.attendance?.checkOut}
              </Typography>
            </Box>
            <Box className="right_panel_sub_heading">
              <Typography variant="span">Break In </Typography>
              <Typography variant="span">:</Typography>
              <Typography variant="span">
                {salesInquiry?.attendance?.breakIn}
              </Typography>
            </Box>
            <Box className="right_panel_sub_heading">
              <Typography variant="span">Break Out </Typography>
              <Typography variant="span">:</Typography>
              <Typography variant="span">
                {salesInquiry?.attendance?.breakOut}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className="common_row">
          <Box className="my_task_section">
            <Box className="my_task_heading">
              <Typography className="bottom_left_panel_heading" variant="span">
                My Task
              </Typography>
              <Button>View All ></Button>
            </Box>
            <Box className="my_task_subheading">
              <Typography sx={{ padding: '8px' }} variant="span">
                Lorem ipsum
              </Typography>
              <Typography
                sx={{ color: '#8E8E8E', padding: '8px' }}
                variant="span"
              >
                Due Date : 22 Oct 2022
              </Typography>
            </Box>
            {/* {salesInquiry?.task.map(data => {
              return (
                <Box>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Lorem ipsum is a placeholder text commonly used to demonstrate."
                    />
                  </FormGroup>
                </Box>
              )
            })} */}
          </Box>

          <Box className="point_table_section">
            <Box className="point_table_heading">
              <Typography className="bottom_right_panel_heading" variant="span">
                My Points
              </Typography>
              <Button>View All ></Button>
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
                <TableBody>
                  {salesInquiry?.teamPoints.map(value => {
                    return (
                      <TableRow
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell align="right">
                          {' '}
                          {moment(value?.createdAt).format('D/MM/YY')}
                        </TableCell>
                        <TableCell align="right">
                          {value?.point?.name}
                        </TableCell>
                        <TableCell align="right">
                          {' '}
                          {value?.point?.points}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>

        <Box className="common_row">
          <Box className="star_performers_section">
            <Box className="my_task_heading">
              <Typography className="bottom_left_panel_heading" variant="span">
                Star Performers
              </Typography>
            </Box>

            <div class="a-box">
              <div class="img-container">
                <div class="img-inner">
                  <div class="inner-skew">
                    <img src={StarPerformer} />
                  </div>
                </div>
              </div>
              <div class="text-container">
                <h3>Benedict Cumber</h3>
                <h6>BDE</h6>
                <h5>Star Performer of the Month.</h5>
              </div>
            </div>

            <div style={{ marginLeft: '18px' }} class="a-box">
              <div class="img-container">
                <div class="img-inner">
                  <div class="inner-skew">
                    <img src={SecondStarPerformer} />
                  </div>
                </div>
              </div>
              <div class="text-container">
                <h3>Dwayne Johnson</h3>
                <h6>BDM</h6>
                <h5>Star Performer of the Month.</h5>
              </div>
            </div>

            <div style={{ marginLeft: '18px' }} class="a-box">
              <div class="img-container">
                <div class="img-inner">
                  <div class="inner-skew">
                    <img src={StarPerformer} />
                  </div>
                </div>
              </div>
              <div class="text-container">
                <h3>Benedict Cumber</h3>
                <h6>BDE</h6>
                <h5>Star Performer of the Month.</h5>
              </div>
            </div>

            <div style={{ marginLeft: '18px' }} class="a-box">
              <div class="img-container">
                <div class="img-inner">
                  <div class="inner-skew">
                    <img src={SecondStarPerformer} />
                  </div>
                </div>
              </div>
              <div class="text-container">
                <h3>Dwayne Johnson</h3>
                <h6>BDM</h6>
                <h5>Star Performer of the Month.</h5>
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default DashboardEmployee
