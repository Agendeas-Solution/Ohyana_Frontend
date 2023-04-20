import React, { useState, useEffect, useContext } from 'react'
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import moment from 'moment'
import './index.css'
import {
  GetExpenseList,
  PaymentStatusUpdate,
  StatusUpdate,
} from '../../services/apiservices/staffDetail'
import NoResultFound from '../ErrorComponent/NoResultFound'
import StaffExpensesDetail from './StaffExpensesDetail'
import { Context as AuthContext } from '../../context/authContext/authContext'

const StaffExpenses = () => {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
    // defaultDate: moment().format('dd/mm/yyyy'),
  })
  const { flagLoader, permissions } = useContext(AuthContext).state

  const [selectMonth, setSelectMonth] = useState(moment().format('LL'))
  const [value, setValue] = useState('1')
  const [expenseList, setExpenseList] = useState([])
  const [expensesData, setExpensesData] = useState([])
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [openStaffExpenses, setOpenStaffExpenses] = useState({
    status: false,
    id: '',
  })

  const handleClose = () => {
    setOpenStaffExpenses({ ...openStaffExpenses, status: false })
  }

  useEffect(() => {
    let path = window.location.pathname
    path = path.split('/').pop()
    let data = {
      month: moment(selectMonth.$d).month() + 1,
      year: moment(selectMonth.$d).format('YYYY'),
      teamId: permissions?.roleId,
    }
    GetExpenseList(
      data,
      res => {
        setExpenseList(res.data.expenses)
        setExpensesData(res.data)
      },
      err => {},
    )
  }, [selectMonth])
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
        <Box className="statistics_data_section">
          <Box className="statistics_data">
            <Box className="statistics_box first_box">
              <Typography>Approved</Typography>
              <Typography>{expensesData?.approved || '-'}</Typography>
            </Box>
            <Box className="statistics_box second_box">
              <Typography>Rejected</Typography>
              <Typography>{expensesData?.rejected || '-'}</Typography>
            </Box>
            <Box className="statistics_box third_box">
              <Typography>Pending</Typography>
              <Typography>{expensesData?.pending || '-'}</Typography>
            </Box>
            <Box className="statistics_box fourth_box">
              <Typography className="" sx={{ whiteSpace: 'nowrap' }}>
                Payment Done
              </Typography>
              <Typography>{expensesData?.paymentDone || '-'}</Typography>
            </Box>
          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={['month', 'year']}
              value={selectMonth}
              onChange={selectMonth => {
                console.log(`inside Onchange: ${selectMonth.format('MMM')}`)
                setSelectMonth(selectMonth)
              }}
              renderInput={params => (
                <TextField
                  sx={{ width: '175px', marginRight: '10px' }}
                  placeholder="Year and Month"
                  {...params}
                  helperText={null}
                />
              )}
            />
          </LocalizationProvider>
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
          {expenseList.length > 0 ? (
            <Table
              stickyHeader
              aria-label="sticky table"
              sx={{ minWidth: 690, marginLeft: '-10px' }}
              className="table_heading "
            >
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Apply</TableCell>
                  <TableCell>Approval</TableCell>
                  <TableCell>Payment</TableCell>
                  <TableCell>Document</TableCell>
                  {/* <TableCell>Approval</TableCell> */}
                  <TableCell>Payment</TableCell>
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
                        <TableCell>{row?.name || '-'}</TableCell>
                        <TableCell>{row?.amount || '-'}</TableCell>
                        <TableCell>
                          {row?.status === 'APPROVED'
                            ? row?.approvalAmount
                            : row?.status}
                        </TableCell>
                        <TableCell>{row?.payment_status || '-'}</TableCell>
                        <TableCell>{row?.file || '-'}</TableCell>
                        {/* <TableCell>
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
                      </TableCell> */}
                        <TableCell>
                          {row?.payment_status === 'DONE' ? (
                            <Typography>-</Typography>
                          ) : (
                            <Box>
                              <Button
                                onClick={() =>
                                  handlePaymentStatusUpdate(row?.id)
                                }
                                className="common_button"
                              >
                                Update
                              </Button>
                              <Button
                                onClick={() =>
                                  setOpenStaffExpenses({
                                    status: true,
                                    id: row.id,
                                  })
                                }
                                className="common_button"
                              >
                                View
                              </Button>
                            </Box>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          ) : (
            <NoResultFound />
          )}
        </TableContainer>
        <StaffExpensesDetail
          openStaffExpenses={openStaffExpenses}
          closeStaffExpenses={handleClose}
          setOpenStaffExpenses={setOpenStaffExpenses}
        />
      </Box>
    </>
  )
}

export default StaffExpenses
