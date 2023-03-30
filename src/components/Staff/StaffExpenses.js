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
import {
  GetExpenseList,
  PaymentStatusUpdate,
  StatusUpdate,
} from '../../services/apiservices/staffDetail'

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
      err => {},
    )
  }, [])
  const handlePaymentStatusUpdate = id => {
    PaymentStatusUpdate(
      id,
      res => {},
      err => {
        console.log('Printing Error Payment Status Update', err)
      },
    )
  }
  const handleStatusUpdate = (id, status) => {
    StatusUpdate(
      id,
      status,
      res => {},
      err => {},
    )
  }

  return (
    <>
      <Box className="target_section">
        <Box className="attendance_data_row col-md-12">
          <Box className="total_expenses_data days_data  col-md-2">
            <Typography sx={{ fontSize: '15px' }} variant="span">
              Approved
            </Typography>
            <Typography variant="span">{expensesData?.approved}</Typography>
          </Box>
          <Box className="payment_done_data days_data col-md-2">
            <Typography variant="span">Rejected</Typography>
            <Typography variant="span">{expensesData?.rejected}</Typography>
          </Box>
          <Box className="food_data days_data col-md-2">
            <Typography variant="span">Pending</Typography>
            <Typography variant="span">{expensesData?.pending}</Typography>
          </Box>
          <Box className="travel_data days_data col-md-2">
            <Typography variant="span">Payment Done</Typography>
            <Typography variant="span">{expensesData?.paymentDone}</Typography>
          </Box>
          <Box className="_days_data days_data">
            <Box>
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
        </Box>
        <TableContainer
          className="mt-2"
          component={Paper}
          sx={{ boxShadow: 'none' }}
        >
          <Table sx={{ minWidth: 650 }} className="table_heading">
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
                    <TableRow>
                      <TableCell>
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
        </TableContainer>
      </Box>
    </>
  )
}

export default StaffExpenses
