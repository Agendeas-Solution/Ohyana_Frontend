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
            sx={{ minWidth: 690 }}
            className="table_heading custom_table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Check In</TableCell>
                <TableCell>Check Out</TableCell>
                <TableCell>Break In </TableCell>
                <TableCell>Break Out</TableCell>
                <TableCell>Working Hours</TableCell>
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
                      <TableCell>{staffList?.checkIn ?? '-'}</TableCell>
                      <TableCell>{staffList?.checkOut ?? '-'}</TableCell>
                      <TableCell>{staffList?.breakIn ?? '-'}</TableCell>
                      <TableCell>{staffList?.breakOut ?? '-'}</TableCell>
                      <TableCell>{staffList?.totalHours ?? '-'}</TableCell>
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
