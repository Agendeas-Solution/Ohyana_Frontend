import React, { useEffect, useState } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import {
  GetStaffAttendanceList,
  GetStaffLeaveList,
  GrantLeave,
} from '../../services/apiservices/staffDetail'
import NoResultFound from '../ErrorComponent/NoResultFound'

const StaffAttendancePresent = ({ staffAttendanceList }) => {
  return (
    <>
      <TableContainer
        className="expenses_table_height mt-2"
        component={Paper}
        sx={{
          boxShadow: 'none',
          border: '1px solid #e5e5e5',
          borderTop: 'none',
          overflowY: 'auto',
        }}
      >
        {staffAttendanceList?.attendancePerUser ? (
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 690, marginLeft: '-10px' }}
            className="table_heading"
          >
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="left">Check In</TableCell>
                <TableCell align="left">Check Out</TableCell>
                <TableCell align="left">Break In </TableCell>
                <TableCell align="left">Break Out</TableCell>
                <TableCell align="left">Working Hours</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffAttendanceList.attendancePerUser &&
                staffAttendanceList.attendancePerUser.map(staffList => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      sx={{
                        '&:last-child td,th': { border: 0 },
                      }}
                    >
                      <TableCell className="tablecell_height">
                        {staffList.date}
                      </TableCell>
                      <TableCell align="left">{staffList?.checkIn}</TableCell>
                      <TableCell align="left">{staffList?.checkOut}</TableCell>
                      <TableCell align="left">{staffList?.breakIn}</TableCell>
                      <TableCell align="left">{staffList?.breakOut}</TableCell>
                      <TableCell align="left">
                        {staffList?.totalHours}
                      </TableCell>
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

export default StaffAttendancePresent
