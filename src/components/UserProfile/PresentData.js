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

  const StyledTableRow = styled(TableHead)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      backgroundColor: 'red',
    },
  }))

  return (
    <>
      <Box className="common_row align-items-start present_data_main ">
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 360, overflowX: 'hidden' }}>
            <Table
              stickyHeader
              aria-label="sticky table"
              className="present_table_heading"
            >
              <TableHead className="dummy_class">
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
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={attendanceList.id}
                        sx={{
                          '&:last-child td,th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {moment(attendanceList.date).format('DD-MM-YYYY')}
                        </TableCell>
                        <TableCell align="left">
                          {attendanceList.checkIn || '-'}
                        </TableCell>
                        <TableCell align="left">
                          {attendanceList.checkOut || '-'}
                        </TableCell>
                        <TableCell align="left">
                          {attendanceList.breakIn || '-'}
                        </TableCell>
                        <TableCell align="left">
                          {attendanceList.breakOut || '-'}
                        </TableCell>
                        <TableCell align="left">
                          {attendanceList.totalHours || '-'}
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={staffAttendanceList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Paper>
      </Box>
    </>
  )
}

export default PresentData
