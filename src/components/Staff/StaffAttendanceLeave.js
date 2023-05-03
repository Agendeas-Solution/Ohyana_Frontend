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
        className="eclient_table_height client_detail_table set_box_shadow mt-2"
        component={Paper}
      >
        {staffLeaveList.length > 0 ? (
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 700, padding: '0px !important' }}
            className="table_heading"
          >
            <TableHead className="client_profile_table_header">
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
                staffLeaveList.map((leaveList, index) => {
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
                        {moment(leaveList?.date).format('DD/MM/YY')}
                      </TableCell>
                      <TableCell className="table_row_top_align">
                        {leaveList?.leave?.type}
                      </TableCell>
                      <TableCell className="table_row_top_align">
                        {leaveList?.takenDays}
                      </TableCell>
                      <TableCell className="table_row_top_align">
                        {leaveList?.remainDays}
                      </TableCell>
                      <TableCell className="table_row_top_align">
                        {leaveList?.status}
                      </TableCell>
                      {leaveList?.status === 'PENDING' && (
                        <TableCell className="table_row_top_align">
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
                      )}
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
