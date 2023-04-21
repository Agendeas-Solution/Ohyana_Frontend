import React, { useEffect, useState, useContext } from 'react'
import ProfileImg from '../../assets/img/profile_logo.png'
import {
  Box,
  Tab,
  Table,
  TableCell,
  TableContainer,
  Paper,
  TableRow,
  TableHead,
} from '@mui/material'
import TabList from '@mui/lab/TabList'
import TableBody from '@mui/material/TableBody'
import dayjs from 'dayjs'
import TabContext from '@mui/lab/TabContext'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import Grid from '@mui/material/Grid'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker'

const HolidayData = ({ holidayList }) => {
  const [date, setDate] = React.useState(dayjs())
  return (
    <>
      <Box className="common_row align-items-start leave_data_main">
        <TableContainer
          className="expenses_table_height"
          // sx={{ width: '700px', boxShadow: 'none', margin: '20px' }}
          sx={{ width: '70%', boxShadow: 'none', margin: '6px' }}
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
