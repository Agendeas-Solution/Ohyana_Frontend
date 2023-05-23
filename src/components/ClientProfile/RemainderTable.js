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
import DeleteReminderDialog from './DeleteReminderDialog'
import { DeleteReminder } from '../../services/apiservices/adminprofile'
import { Context as ContextSnackbar } from '../../context/pageContext'
const RemainderTable = ({
  clientReminderList,
  remainderDialog,
  setRemainderDialog,
  handleReminderDetail,
}) => {
  const [editReminderDetail, setEditReminderDetail] = useState({
    description: '',
    date: '',
    time: '',
    status: false,
    id: null,
  })
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const [deleteReminderDialogControl, setDeleteReminderDialogControl] =
    useState({
      status: false,
      id: '',
    })
  const handleDeleteReminderDialogClose = () => {
    setDeleteReminderDialogControl({
      ...deleteReminderDialogControl,
      status: false,
    })
  }
  const handleEditReminder = row => {
    setRemainderDialog({
      ...remainderDialog,
      description: row.description,
      date: row.date,
      time: row.time,
      id: row.id,
      status: true,
    })
  }
  const handleDeleteReminder = () => {
    DeleteReminder(
      deleteReminderDialogControl.id,
      res => {
        handleDeleteReminderDialogClose()
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.message,
        })
        handleReminderDetail()
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

  return (
    <>
      <TableContainer className="profile_data_table" component={Paper}>
        {clientReminderList.length > 0 ? (
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
                <TableCell>Reminder For</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientReminderList.map((row, index) => (
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
                  <TableCell className=" table_row_top_align text-wrap">
                    {row.description}
                  </TableCell>
                  <TableCell className=" table_row_top_align table_buttons">
                    <Button
                      sx={{ marginRight: '10px' }}
                      className="border_button"
                      onClick={() => {
                        handleEditReminder(row)
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      className="border_button"
                      onClick={() => {
                        setDeleteReminderDialogControl({
                          ...deleteReminderDialogControl,
                          status: true,
                          id: row.id,
                        })
                      }}
                    >
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
      <DeleteReminderDialog
        deleteReminderDialogControl={deleteReminderDialogControl}
        handleDeleteReminderDialogClose={handleDeleteReminderDialogClose}
        handleDeleteReminder={handleDeleteReminder}
      />
    </>
  )
}

export default RemainderTable
