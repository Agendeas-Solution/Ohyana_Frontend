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

const RemainderTable = ({ clientReminderList }) => {
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
        className="client_table_height client_detail_table set_box_shadow"
        component={Paper}
      >
        {clientReminderList.length > 0 ? (
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 690, padding: '0px !important' }}
            className="table_heading"
          >
            <TableHead className="client_profile_table_header">
              <TableRow>
                <TableCell>Sr No.</TableCell>
                <TableCell>Reminder Added By</TableCell>
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
                  <TableCell className="description_text">
                    {row.description}
                  </TableCell>
                  <TableCell>
                    <Button
                      className="border_button"
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
