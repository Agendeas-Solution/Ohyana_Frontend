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
import NoResultFound from '../ErrorComponent/NoResultFound'
const AppointmentTable = ({
  clientAppointmentList,
  appointmentDialogControl,
  setAppointmentDialogControl,
}) => {
  const handleAppointmentReminder = row => {
    setAppointmentDialogControl({
      ...appointmentDialogControl,
      date: row.date,
      time: row.time,
      description: row.description,
      status: true,
      appointmentId: row.id,
      appointed_member: row.teams,
      appointment_unit: row.appointment_unit,
    })
  }
  return (
    <>
      <TableContainer
        className="client_table_height client_detail_table set_box_shadow"
        component={Paper}
      >
        {clientAppointmentList.length > 0 ? (
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 700, padding: '0px !important' }}
            className="table_heading"
          >
            <TableHead className="client_profile_table_header">
              <TableRow>
                <TableCell>Sr No.</TableCell>
                <TableCell>Added By</TableCell>
                <TableCell>Job Role</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Appointment At</TableCell>
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
                    <TableCell>{row.memberName}</TableCell>
                    <TableCell>{row.memberRole}</TableCell>
                    <TableCell>
                      {moment(row?.date).format('DD-MM-YYYY')}
                    </TableCell>
                    <TableCell>
                      {moment(row.time, 'hh:mm:ss').format('LT')}
                    </TableCell>
                    <TableCell>{row.appointment_unit}</TableCell>
                    <TableCell className="table_buttons">
                      <Button
                        sx={{ marginRight: '10px' }}
                        className="border_button"
                        onClick={() => {
                          handleAppointmentReminder(row)
                        }}
                      >
                        Edit
                      </Button>
                      <Button className="border_button" onClick={() => {}}>
                        Delete
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
    </>
  )
}

export default AppointmentTable
