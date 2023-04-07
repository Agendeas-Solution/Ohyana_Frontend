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
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import EditReminderDialog from './EditReminderDialog'
import NoResultFound from '../ErrorComponent/NoResultFound'

const RemainderTable = props => {
  const [editReminderDetail, setEditReminderDetail] = useState({
    description: '',
    date: '',
    time: '',
    status: false,
    id: null,
  })
  const handleEditReminder = row => {
    setEditReminderDetail({
      ...editReminderDetail,
      description: row.description,
      date: row.date,
      time: row.time,
      id: row.id,
      status: true,
    })
  }
  const handleClose = () => {
    setEditReminderDetail({ ...editReminderDetail, status: false })
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
        {props.clientReminderList.length > 0 ? (
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 690, marginLeft: '-10px' }}
            className="table_heading"
          >
            <TableHead className="client_profile_table_header">
              <TableRow>
                <TableCell>Sr No.</TableCell>
                <TableCell align="left">Reminder Added By</TableCell>
                <TableCell align="left">Job Role</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Time</TableCell>
                <TableCell align="left">Reminder For</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.clientReminderList.map((row, index) => (
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
                  <TableCell align="left">{row.team.name}</TableCell>
                  <TableCell align="left">{row.team.role.name}</TableCell>
                  <TableCell align="left">
                    {moment(row?.date).format('DD-MM-YYYY')}
                  </TableCell>
                  <TableCell align="left">
                    {moment(row.time, 'hh:mm:ss').format('LT')}
                  </TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="left">
                    <Button
                      className="client_profile_edit_button"
                      onClick={() => {
                        handleEditReminder(row)
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
      {editReminderDetail.status === true && (
        <EditReminderDialog
          handleClose={handleClose}
          editReminderDetail={editReminderDetail}
        />
      )}
    </>
  )
}

export default RemainderTable
