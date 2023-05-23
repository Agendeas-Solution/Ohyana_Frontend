import React from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import NoResultFound from '../ErrorComponent/NoResultFound'

const StaffAttendancePresent = ({ staffAttendanceList }) => {
  return (
    <>
      <TableContainer className="profile_data_table mt-2" component={Paper}>
        {staffAttendanceList?.attendancePerUser ? (
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 700, padding: '0px !important' }}
            className="table_heading"
          >
            <TableHead className="profile_data_table_header">
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
                staffAttendanceList.attendancePerUser.map(
                  (staffList, index) => {
                    return (
                      <TableRow
                        key={index}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        sx={{
                          '&:last-child td,th': { border: 0 },
                        }}
                      >
                        <TableCell
                          scope="row"
                          className="tablecell_height table_row_top_align"
                        >
                          {staffList.date}
                        </TableCell>
                        <TableCell className="table_row_top_align">
                          {staffList?.checkIn ?? '-'}
                        </TableCell>
                        <TableCell className="table_row_top_align">
                          {staffList?.checkOut ?? '-'}
                        </TableCell>
                        <TableCell className="table_row_top_align">
                          {staffList?.breakIn ?? '-'}
                        </TableCell>
                        <TableCell className="table_row_top_align">
                          {staffList?.breakOut ?? '-'}
                        </TableCell>
                        <TableCell className="table_row_top_align">
                          {staffList?.totalHours ?? '-'}
                        </TableCell>
                      </TableRow>
                    )
                  },
                )}
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
