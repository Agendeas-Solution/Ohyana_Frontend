import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import moment from 'moment'
import './index.css'
import {
  GetExpenseList,
  PaymentStatusUpdate,
  StatusUpdate,
} from '../../services/apiservices/staffDetail'
import NoResultFound from '../ErrorComponent/NoResultFound'

const StaffExpenses = () => {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  })

  const [value, setValue] = useState('1')
  const [expenseList, setExpenseList] = useState([])
  const [expensesData, setExpensesData] = useState([])
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    let path = window.location.pathname
    console.log('Printing Path of ', path)
    console.log('Printing ', path.split('/').pop())
    path = path.split('/').pop()
    GetExpenseList(
      {},
      res => {
        setExpenseList(res.data.expenses)
        setExpensesData(res.data)
      },
      err => { },
    )
  }, [])
  const handlePaymentStatusUpdate = id => {
    PaymentStatusUpdate(
      id,
      res => { },
      err => {
        console.log('Printing Error Payment Status Update', err)
      },
    )
  }
  const handleStatusUpdate = (id, status) => {
    StatusUpdate(
      id,
      status,
      res => { },
      err => { },
    )
  }

  return (
    <>
      <Box
        // sx={{ padding: '10px' }}
        className="expenses_data_row col-md-12 mb-1"
      >
        <Box
          sx={{
            // background: '#F1F2F6',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Box className="inner_profile_details first_box me-3 p-2">
            <Typography>Approved</Typography>
            <Typography>24000</Typography>
          </Box>
          <Box className="inner_profile_details middle_box  me-3 p-2">
            <Typography>Rejected</Typography>
            <Typography>1000</Typography>
          </Box>
          <Box className="inner_profile_details last_box me-3 p-2">
            <Typography>Pending</Typography>
            <Typography>5000</Typography>
          </Box>
          <Box className="inner_profile_details last_box p-2">
            <Typography>Payment Done</Typography>
            <Typography>5000</Typography>
          </Box>
        </Box>

        <Box className="days_data">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              disablePast
              inputFormat="dd/MM/yyyy"
              value={dateRange?.startDate}
              onChange={e => {
                setDateRange({ ...dateRange, startDate: e })
              }}
              renderInput={params => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </Box>

      <TableContainer
        className="expenses_table_height mt-2"
        component={Paper}
        sx={{
          boxShadow: 'none',
          border: '1px solid #e5e5e5',
          borderTop: 'none',
          overflowY: 'auto',
        }}
      >
        {expenseList.length > 0 ?
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 690, marginLeft: '-10px' }}
            className="table_heading "
          >
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">Apply</TableCell>
                <TableCell align="left">Approval</TableCell>
                <TableCell align="left">Payment</TableCell>
                <TableCell align="left">Document</TableCell>
                <TableCell align="left">Approval</TableCell>
                <TableCell align="left">Payment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenseList &&
                expenseList.map(row => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      // key={attendanceList.id}
                      sx={{
                        '&:last-child td,th': { border: 0 },
                      }}
                    >
                      <TableCell className="tablecell_height">
                        {moment(row?.date).format('D/MM/YY')}
                      </TableCell>
                      <TableCell align="left">{row?.name}</TableCell>
                      <TableCell align="left">{row?.amount}</TableCell>
                      <TableCell align="left">
                        {row?.status === 'APPROVED'
                          ? row?.aprrovalAmount
                          : row?.status}
                      </TableCell>
                      <TableCell align="left">{row?.payment_status}</TableCell>
                      <TableCell align="left">{row?.file}</TableCell>
                      <TableCell align="left" className="d-flex flex-row">
                        {row?.status === 'APPROVED' || 'REJECTED' ? (
                          row?.status
                        ) : (
                          <>
                            <Button
                              onClick={() =>
                                handleStatusUpdate(row?.id, 'APPROVED')
                              }
                              className="common_button"
                            >
                              Approve
                            </Button>
                            <Button
                              onClick={() =>
                                handleStatusUpdate(row?.id, 'REJECTED')
                              }
                              className="common_button"
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {row?.payment_status === 'DONE' ? (
                          <Typography>-</Typography>
                        ) : (
                          <Button
                            onClick={() => handlePaymentStatusUpdate(row?.id)}
                            className="common_button"
                          >
                            Update
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
          : <NoResultFound />}
      </TableContainer>
    </>
  )
}

export default StaffExpenses
