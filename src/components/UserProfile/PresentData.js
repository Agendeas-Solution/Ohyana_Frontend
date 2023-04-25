import React, { useState, useContext } from 'react'
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
import TableBody from '@mui/material/TableBody'
import moment from 'moment'
import './index.css'
import NoResultFound from '../ErrorComponent/NoResultFound'

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
      <TableContainer
        className="expenses_table_height attendance_present_table"
        component={Paper}
      >
        {staffAttendanceList.length > 0 ? (
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 690, paddingLeft: '0', marginLeft: '-10px' }}
            className="table_heading custom_table"
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
        ) : (
          <NoResultFound />
        )}
      </TableContainer>
    </>
  )
}

export default PresentData
