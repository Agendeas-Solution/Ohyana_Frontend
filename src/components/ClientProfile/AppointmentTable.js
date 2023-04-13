import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material'
import './index.css'
import moment from 'moment'
import EditAppointmentDialog from './EditAppointmentDialog'
import NoResultFound from '../ErrorComponent/NoResultFound'

const AppointmentTable = ({ clientAppointmentList }) => {
  const [editClientAppointmentDetail, setEditClientAppointmentDetail] =
    useState({
      date: '',
      time: '',
      description: '',
      appointed_member: [],
      appointment_unit: 'plant',
      appointmentId: null,
      status: false,
    })
  const handleAppointmentReminder = row => {
    setEditClientAppointmentDetail({
      ...editClientAppointmentDetail,
      date: row.date,
      time: row.time,
      description: row.description,
      status: true,
      appointmentId: row.id,
      appointed_member: row.teams,
    })
  }
  const handleAppointmentClose = () => {
    setEditClientAppointmentDetail({
      ...editClientAppointmentDetail,
      status: false,
    })
  }
  return (
    <>
      <TableContainer
        className="client_table_height mt-1"
        component={Paper}
        sx={{
          boxShadow: 'none',
          border: '1px solid #e5e5e5',
          overflowY: 'auto',
        }}
      >
        {clientAppointmentList.length > 0 ? (
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 690, marginLeft: '-10px' }}
            className="table_heading"
          >
            <TableHead className="client_profile_table_header">
              <TableRow>
                <TableCell>Sr No.</TableCell>
                <TableCell align="left">Appointment Added By</TableCell>
                <TableCell align="left">Job Role</TableCell>
                <TableCell align="left">Appointment Date</TableCell>
                <TableCell align="left">Appointment Time</TableCell>
                <TableCell align="left">Appointment At</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientAppointmentList &&
                clientAppointmentList.map((row, index) => (
                  <TableRow
                    key={index}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    sx={{
                      '&:last-child td,th': { border: 0 },
                    }}
                  >
                    <TableCell scope="row">{index + 1}</TableCell>
                    <TableCell align="left">{row.memberName}</TableCell>
                    <TableCell align="left">{row.memberRole}</TableCell>
                    <TableCell align="left">
                      {moment(row?.date).format('DD-MM-YYYY')}
                    </TableCell>
                    <TableCell align="left">
                      {moment(row.time, 'hh:mm:ss').format('LT')}
                    </TableCell>
                    <TableCell align="left">{row.appointment_unit}</TableCell>
                    <TableCell align="left">
                      <Button
                        className="client_profile_edit_button"
                        onClick={() => {
                          handleAppointmentReminder(row)
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          <NoResultFound />
        )}
      </TableContainer>
      {editClientAppointmentDetail.status === true && (
        <EditAppointmentDialog
          handleAppointmentClose={handleAppointmentClose}
          editClientAppointmentDetail={editClientAppointmentDetail}
        />
      )}
    </>
  )
}

export default AppointmentTable
