import React from 'react'
import {
  Box,
  Table,
  TableCell,
  TableContainer,
  Paper,
  TableRow,
  TableHead,
} from '@mui/material'
import TableBody from '@mui/material/TableBody'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import Grid from '@mui/material/Grid'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker'

const HolidayData = ({ holidayList }) => {
  const [date, setDate] = React.useState(dayjs())
  return (
    <>
      <Box className="detail_row align-items-start leave_data_main">
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
                <TableCell align="left">Occasion Name</TableCell>
                <TableCell align="left">Duration Day</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {holidayList.map(row => (
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
                    {row.date || '-'}
                  </TableCell>
                  <TableCell align="left">{row.occasion || '-'}</TableCell>
                  <TableCell align="left">{row.duration || '-'}</TableCell>
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

export default HolidayData
