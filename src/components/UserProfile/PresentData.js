import React, { useEffect, useState, useContext } from 'react'
import ProfileImg from '../../assets/img/profile_logo.png'
import {
  Box,
  Tab,
  Table,
  TableCell,
  TableContainer,
  Paper,
  TableRow,
  TableHead,
  Button,
} from '@mui/material'
import TabList from '@mui/lab/TabList'
import TableBody from '@mui/material/TableBody'
import { useNavigate } from 'react-router-dom'
import { Context as AuthContext } from '../../context/authContext/authContext'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import moment from 'moment'
const PresentData = ({ staffAttendanceList }) => {
  return (
    <>
      <Box className="common_row align-items-start leave_data_main">
        <TableContainer
          // className="main_table_container"
          sx={{
            width: '700px',
            boxShadow: 'none',
            margin: '20px',
            // border: '1px solid #E5E5E5',
          }}
          component={Paper}
        >
          {/* <Table className="present_table"> */}
          <Table>
            <TableHead className="team_overview_table_heading">
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="left">Check In</TableCell>
                <TableCell align="left">Check Out</TableCell>
                <TableCell align="left">Break In</TableCell>
                <TableCell align="left">Break Out</TableCell>
                <TableCell align="left">Working Hours</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffAttendanceList?.attendancePerUser.length > 0 &&
                staffAttendanceList.attendancePerUser.map(attendanceList => {
                  return (
                    <TableRow
                      key={attendanceList.id}
                      sx={{ '&:last-child td,th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {moment(attendanceList.date).format('DD-MM-YYYY')}
                      </TableCell>
                      <TableCell align="left">
                        {attendanceList.checkIn}
                      </TableCell>
                      <TableCell align="left">
                        {attendanceList.checkOut}
                      </TableCell>
                      <TableCell align="left">
                        {attendanceList.breakIn}
                      </TableCell>
                      <TableCell align="left">
                        {attendanceList.breakOut}
                      </TableCell>
                      <TableCell align="left">
                        {attendanceList.totalHours}
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ margin: '16px' }}>
          <Button
            // onClick={() => setLeaveDialogControl(true)}
            className="check_InOut_Break_InOut_Btn attendance_button"
            variant="contained"
          >
            + Apply For Leave
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default PresentData
