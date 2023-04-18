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
  TablePagination,
} from '@mui/material'
import TabList from '@mui/lab/TabList'
import TableBody from '@mui/material/TableBody'
import { useNavigate } from 'react-router-dom'
import { Context as AuthContext } from '../../context/authContext/authContext'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import moment from 'moment'
import styled from '@emotion/styled'
import './index.css'

const PresentData = ({ staffAttendanceList }) => {
  const [page, setPage] = React.useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <>
      {/* <Box className="common_row w-100 align-items-start present_data_main "> */}
      {/* <Paper sx={{ width: '100%', boxShadow: 'none' }}> */}
      <TableContainer
        // sx={{
        //   maxHeight: '48vh',
        //   overflowX: 'hidden',
        // }}
        className="expenses_table_height"
        component={Paper}
        sx={{
          boxShadow: 'none',
          border: '1px solid #e5e5e5',
          borderTop: 'none',
        }}
      >
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{ minWidth: 690, marginLeft: '-10px' }}
          className="table_heading"
        >
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Check In</TableCell>
              <TableCell>Check Out</TableCell>
              <TableCell>Break In</TableCell>
              <TableCell>Break Out</TableCell>
              <TableCell>Working Hours</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {staffAttendanceList?.attendancePerUser &&
              staffAttendanceList.attendancePerUser.map(attendanceList => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    // key={attendanceList.id}
                    sx={{
                      '&:last-child td,th': {
                        border: 0,
                      },
                      // lineHeight: '3',
                    }}
                  >
                    <TableCell className="tablecell_height">
                      {moment(attendanceList.date).format('DD-MM-YYYY')}
                    </TableCell>
                    <TableCell>{attendanceList.checkIn || '-'}</TableCell>
                    <TableCell>{attendanceList.checkOut || '-'}</TableCell>
                    <TableCell>{attendanceList.breakIn || '-'}</TableCell>
                    <TableCell>{attendanceList.breakOut || '-'}</TableCell>
                    <TableCell>{attendanceList.totalHours || '-'}</TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* </Paper> */}
      {/* </Box> */}
    </>
  )
}

export default PresentData
