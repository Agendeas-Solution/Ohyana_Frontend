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

const StaffAttendanceLeave = ({
  staffLeaveList,
  approveLeave,
  setApproveLeave,
}) => {
  const [value, setValue] = useState('1')
  // useEffect(() => {
  //   let path = window.location.pathname
  //   console.log('Printing Path of ', path)
  //   console.log('Printing ', path.split('/').pop())
  //   path = path.split('/').pop()
  //   // value === '1' &&
  //   //   GetStaffAttendanceList(
  //   //     path,
  //   //     res => {
  //   //       setStaffAttendanceList(res?.data)
  //   //     },
  //   //     err => {},
  //   //   )
  //   value === '1' &&
  //     GetStaffLeaveList(
  //       path,
  //       res => {
  //         setStaffLeaveList(res?.data)
  //         //   setStaffAttendanceList(res?.data)
  //       },
  //       err => { },
  //     )
  // }, [value])

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
        {staffLeaveList.length > 0 ? (
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 690, marginLeft: '-10px' }}
            className="table_heading "
          >
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Leave Type</TableCell>
                <TableCell>Taken</TableCell>
                <TableCell>Remain</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
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
                      <TableCell className="tablecell_height">
                        {moment(leaveList?.date).format('DD/MM/YY')}
                      </TableCell>
                      <TableCell>{leaveList?.leave?.type}</TableCell>
                      <TableCell>{leaveList?.takenDays}</TableCell>
                      <TableCell>{leaveList?.remainDays}</TableCell>
                      <TableCell>{leaveList?.status}</TableCell>
                      <TableCell>
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
          </Table>
        ) : (
          <NoResultFound />
        )}
      </TableContainer>
    </>
  )
}

export default StaffAttendanceLeave
