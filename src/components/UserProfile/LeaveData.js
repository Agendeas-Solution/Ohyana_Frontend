import React from 'react'
import {
  Box,
  Table,
  TableCell,
  TableContainer,
  Paper,
  TableRow,
  TableHead,
  Button,
} from '@mui/material'
import './index.css'
import TableBody from '@mui/material/TableBody'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import Grid from '@mui/material/Grid'
import moment from 'moment'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker'

const LeaveData = ({ leaveList }) => {
  const [date, setDate] = React.useState(dayjs())
  return (
    <>
      <Box className="common_row align-items-start leave_data_main">
        <TableContainer
          className="expenses_table_height leave_and_holiday_main_table"
          component={Paper}
        >
          <Table
            stickyHeader
            aria-label="sticky table"
            className="table_heading custom_table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Leave Type</TableCell>
                <TableCell align="left">Taken</TableCell>
                <TableCell align="left">Remain</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody className="leave_table_body_data">
              {leaveList.map(row => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  sx={{
                    '&:last-child td,th': {
                      border: 0,
                    },
                  }}
                  key={row.date}
                >
                  <TableCell className="tablecell_height">
                    {moment(row.date).format('D/MM/YY')}
                  </TableCell>
                  <TableCell align="left">{row?.leave?.type ?? '-'}</TableCell>
                  <TableCell align="left">{row?.takenDays ?? '-'}</TableCell>
                  <TableCell align="left">{row?.remainDays ?? '-'}</TableCell>
                  <TableCell align="left">{row?.status ?? '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item xs={12} md={6}>
            <CalendarPicker
              date={date}
              onChange={newDate => setDate(newDate)}
            />
          </Grid>
        </LocalizationProvider>
      </Box>
    </>
  )
}

export default LeaveData
