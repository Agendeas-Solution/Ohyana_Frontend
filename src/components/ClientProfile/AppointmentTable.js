import React, { useContext, useState } from 'react'
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
import DeleteAppoinmentDialog from './DeleteAppoinmentDialog'
import { DeleteAppointment } from '../../services/apiservices/adminprofile'
import { Context as ContextSnackbar } from '../../context/pageContext'
const AppointmentTable = ({
  handleViewAppointment,
  clientAppointmentList,
  appointmentDialogControl,
  setAppointmentDialogControl,
  handleAppointmentDetail,
}) => {
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const [deleteAppoinmentDialogControl, setDeleteAppointmentDialogControl] =
    useState({
      status: false,
      id: '',
    })
  const handleAppointmentReminder = row => {
    setAppointmentDialogControl({
      ...appointmentDialogControl,
      date: row.date,
      time: row.time,
      description: row.description,
      status: true,
      appointmentId: row.id,
      appointed_member: row.appointedMembers,
      appointment_unit: row.appointment_unit,
    })
  }
  const handleDeleteAppointment = () => {
    DeleteAppointment(
      deleteAppoinmentDialogControl.id,
      res => {
        handleCloseAppointmentDialog()
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.message,
        })
        handleAppointmentDetail()
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }
  const handleCloseAppointmentDialog = () => {
    setDeleteAppointmentDialogControl({
      ...deleteAppoinmentDialogControl,
      status: false,
    })
  }
  return (
    <>
      <TableContainer className="profile_data_table" component={Paper}>
        {clientAppointmentList.length > 0 ? (
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 700, padding: '0px !important' }}
            className="table_heading"
          >
            <TableHead className="profile_data_table_header">
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
                    <TableCell scope="row" className="table_row_top_align">
                      {index + 1}
                    </TableCell>
                    <TableCell className="table_row_top_align">
                      {row.team.name}
                    </TableCell>
                    <TableCell className="table_row_top_align">
                      {row.team.role.name}
                    </TableCell>
                    <TableCell className="table_row_top_align">
                      {moment(row?.date).format('DD-MM-YYYY')}
                    </TableCell>
                    <TableCell className="table_row_top_align">
                      {moment(row.time, 'hh:mm:ss').format('LT')}
                    </TableCell>
                    <TableCell className="table_row_top_align">
                      {row.appointment_unit}
                    </TableCell>
                    <TableCell className="table_row_top_align table_buttons">
                      <Button
                        sx={{ marginRight: '10px' }}
                        className="border_button"
                        onClick={() => {
                          handleAppointmentReminder(row)
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        className="border_button"
                        onClick={() => {
                          handleViewAppointment(row, clientAppointmentList.id)
                        }}
                      >
                        View
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
      <DeleteAppoinmentDialog
        deleteAppoinmentDialogControl={deleteAppoinmentDialogControl}
        handleCloseAppointmentDialog={handleCloseAppointmentDialog}
        handleDeleteAppointment={handleDeleteAppointment}
      />
    </>
  )
}

export default AppointmentTable
