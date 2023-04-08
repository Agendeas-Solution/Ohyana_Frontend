import React, { useEffect, useState } from 'react'
import {
  Button,
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
import moment from 'moment'
import NoResultFound from '../ErrorComponent/NoResultFound'

const StaffAttendanceLeave = () => {
  const [staffAttendanceList, setStaffAttendanceList] = useState([])
  const [value, setValue] = useState('1')
  const [approveLeave, setApproveLeave] = useState({
    status: false,
    id: null,
    leaveStatus: true,
  })
  const [staffLeaveList, setStaffLeaveList] = useState([])

  useEffect(() => {
    let path = window.location.pathname
    console.log('Printing Path of ', path)
    console.log('Printing ', path.split('/').pop())
    path = path.split('/').pop()
    // value === '1' &&
    //   GetStaffAttendanceList(
    //     path,
    //     res => {
    //       setStaffAttendanceList(res?.data)
    //     },
    //     err => {},
    //   )
    value === '1' &&
      GetStaffLeaveList(
        path,
        res => {
          setStaffLeaveList(res?.data)
          //   setStaffAttendanceList(res?.data)
        },
        err => { },
      )
  }, [value])

  return (
    <>
      {/* <h1>Hellow</h1> */}
      {/* <TableContainer component={Paper}>
        <Table>
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
                  <TableRow>
                    <TableCell>{staffList.date}</TableCell>
                    <TableCell align="left">{staffList?.checkIn}</TableCell>
                    <TableCell align="left">{staffList?.checkOut}</TableCell>
                    <TableCell align="left">{staffList?.breakIn}</TableCell>
                    <TableCell align="left">{staffList?.breakOut}</TableCell>
                    <TableCell align="left">{staffList?.totalHours}</TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer> */}

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
        {staffLeaveList.length > 0 ?
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 690, marginLeft: '-10px' }}
            className="table_heading "
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Leave Type</TableCell>
                <TableCell align="left">Taken</TableCell>
                <TableCell align="left">Remain</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffLeaveList &&
                staffLeaveList.map(leaveList => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      sx={{
                        '&:last-child td,th': { border: 0 },
                      }}
                    >
                      <TableCell className="tablecell_height" align="left">
                        {moment(leaveList?.date).format('DD/MM/YY')}
                      </TableCell>
                      <TableCell align="left">{leaveList?.leave?.type}</TableCell>
                      <TableCell align="left">{leaveList?.takenDays}</TableCell>
                      <TableCell align="left">{leaveList?.remainDays}</TableCell>
                      <TableCell align="left">{leaveList?.status}</TableCell>
                      <TableCell align="left">
                        <Button
                          className="common_button"
                          onClick={() => {
                            setApproveLeave({
                              ...approveLeave,
                              status: true,
                              id: leaveList?.id,
                            })
                          }}
                        >
                          Approve
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table> :
          <NoResultFound />
        }
      </TableContainer>
    </>
  )
}

export default StaffAttendanceLeave
