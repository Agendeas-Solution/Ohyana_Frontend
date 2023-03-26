import React, { useEffect, useState } from 'react'
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
const DashboardEmployee = () => {
  const [salesInquiry, setSalesInquiry] = useState()
  useEffect(() => {
    GetSalesInquiry(
      {},
      res => {
        setSalesInquiry(res?.data?.data)
      },
      err => {},
    )
  }, [])
  return (
    <>
      {' '}
      <Box className="main_section">
        <Box className="attendance_buttons">
          <Box>
            <Typography variant="span">Today’s Present</Typography>
          </Box>
          <Box>
            <Button className="common_button">Check In</Button>
            <Button className="common_button">Break In</Button>
            <Button className="common_button">Break Out</Button>
            <Button className="common_button">Check Out</Button>
          </Box>
        </Box>
        <Box className="performance_attendance_row">
          <Box className="performance_section">
            <Typography variant="span">Performance</Typography>
            <Box className="performance_terms">
              <Box className="performance_statistics_data">
                <Typography variant="span">Total Inquiries</Typography>
                <Box className="performance_parameter">
                  <Typography variant="span">
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
                  <Typography variant="span">
                    {salesInquiry?.performance?.total}
                  </Typography>
                  <Typography variant="span" className="common_icon">
                    <TrendingUpRoundedIcon className="common_icon" />
                    5%
                  </Typography>
                </Box>
              </Box>
              <Box className="performance_statistics_data">
                <Typography variant="span">Total Points</Typography>
                <Box className="performance_parameter">
                  <Typography variant="span">400</Typography>
                  <Typography variant="span" className="common_icon">
                    <TrendingUpRoundedIcon className="common_icon" />
                    5%
                  </Typography>
                </Box>
              </Box>
              <Box className="performance_statistics_data">
                <Typography variant="span">Target Order</Typography>
                <Box className="performance_parameter">
                  <Typography variant="span">400</Typography>
                  <Typography variant="span" className="common_icon">
                    <TrendingUpRoundedIcon className="common_icon" />
                    5%
                  </Typography>
                </Box>
              </Box>
              <Box className="performance_statistics_data">
                <Typography variant="span">Achieved</Typography>
                <Box className="performance_parameter">
                  <Typography variant="span">400</Typography>
                  <Typography variant="span" className="common_icon">
                    <TrendingUpRoundedIcon className="common_icon" />
                    5%
                  </Typography>
                </Box>
              </Box>
              <Box className="performance_statistics_data">
                <Typography variant="span">Days Remain</Typography>
                <Box className="performance_parameter">
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
              <Typography variant="span">Attendance</Typography>
              <Typography sx={{ color: '#8e8e8e' }} variant="span">
                22 Oct 2022
              </Typography>
            </Box>
            <Box>
              <Typography variant="span">Check In </Typography>
              <Typography variant="span">:</Typography>
              <Typography variant="span">
                {salesInquiry?.attendance?.checkIn}
              </Typography>
            </Box>
            <Box>
              <Typography variant="span">Check Out </Typography>
              <Typography variant="span">:</Typography>
              <Typography variant="span">
                {salesInquiry?.attendance?.checkOut}
              </Typography>
            </Box>
            <Box>
              <Typography variant="span">Break In </Typography>
              <Typography variant="span">:</Typography>
              <Typography variant="span">
                {salesInquiry?.attendance?.breakIn}
              </Typography>
            </Box>
            <Box>
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
              <Typography variant="span">My Task</Typography>
              <Button>View All ></Button>
            </Box>
            <Box className="my_task_subheading">
              <Typography variant="span">Lorem ipsum</Typography>
              <Typography sx={{ color: '#8E8E8E' }} variant="span">
                Due Date : 22 Oct 2022
              </Typography>
            </Box>
            {/* {salesInquiry?.task.map((data) => {
            return <Box>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Lorem ipsum is a placeholder text commonly used to demonstrate." />
              </FormGroup>
            </Box>
          })} */}
          </Box>
          <Box className="point_table_section">
            <Box className="point_table_heading">
              <Typography variant="span">My Points</Typography>
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
      </Box>
    </>
  )
}

export default DashboardEmployee
