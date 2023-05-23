import React, { useState, useEffect, useContext } from 'react'
import { Box, Typography, Button } from '@mui/material'
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
  ApproveExpense,
  PaymentStatus,
  GetExpenseDetail,
} from '../../services/apiservices/staffDetail'
import NoResultFound from '../ErrorComponent/NoResultFound'
import StaffExpensesDetail from './StaffExpensesDetail'
import { Context as AuthContext } from '../../context/authContext/authContext'
import { Context as ContextSnackbar } from '../../context/pageContext'
import StaffExpensesApprovalDialog from './StaffExpensesApprovalDialog'
import StaffPaymentVerificationDialog from './StaffPaymentVerificationDialog'

const StaffExpenses = ({ selectMonth, setSelectMonth }) => {
  const { flagLoader, permissions } = useContext(AuthContext).state
  // const [selectMonth, setSelectMonth] = useState(moment().format('LL'))
  const [value, setValue] = useState('1')
  const [expenseList, setExpenseList] = useState([])
  const [expensesData, setExpensesData] = useState([])
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [openStaffExpenses, setOpenStaffExpenses] = useState({
    status: false,
    id: '',
  })
  const [openApprovalDialog, setOpenApprovalDialog] = useState({
    status: false,
    amount: '',
    description: '',
    teamExpenseId: '',
  })
  const [paymentVerification, setPaymentVerification] = useState({
    status: false,
  })
  const [expenseDetail, setExpenseDetail] = useState(null)

  const handleClose = () => {
    setOpenStaffExpenses({ ...openStaffExpenses, status: false })
  }
  const handleStaffExpenseDetail = () => {
    openStaffExpenses?.data?.id &&
      GetExpenseDetail(
        openStaffExpenses?.data?.id,
        res => {
          setExpenseDetail(res?.data)
        },
        err => {},
      )
  }
  const handleCloseApprovalDialog = () => {
    setOpenApprovalDialog({ ...openApprovalDialog, status: false })
  }
  const handleClosePaymentVerificationDialog = () => {
    setPaymentVerification({ ...paymentVerification, status: false })
  }
  const handleExpensesList = () => {
    let path = window.location.pathname
    path = path.split('/').pop()
    let data = {
      month: moment(selectMonth.$d).month() + 1,
      year: moment(selectMonth.$d).format('YYYY'),
    }
    if (parseInt(path)) {
      data['teamId'] = parseInt(path)
    }
    GetExpenseList(
      data,
      res => {
        setExpenseList(res.data.expenses)
        setExpensesData(res.data)
      },
      err => {},
    )
  }
  useEffect(() => {
    handleExpensesList()
  }, [selectMonth])
  const handlePaymentStatusUpdate = id => {
    PaymentStatusUpdate(
      id,
      res => {},
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }
  const handleStatusUpdate = (id, status) => {
    StatusUpdate(
      id,
      status,
      res => {},
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }
  const handleExpenseApproval = () => {
    let data = {
      amount: openApprovalDialog.amount,
      description: openApprovalDialog.description,
      teamExpenseid: openApprovalDialog.teamExpenseId,
    }
    ApproveExpense(
      data,
      res => {
        handleCloseApprovalDialog()
        setOpenApprovalDialog({
          amount: '',
          description: '',
          teamExpenseid: '',
        })
        handleStaffExpenseDetail()
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.message,
        })
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err.response.data.message,
        })
      },
    )
  }
  const handlePaymentStatus = () => {
    let data = {
      teamExpenseid: paymentVerification.teamExpenseId,
      status: 'DONE',
    }
    PaymentStatus(
      data,
      res => {
        handleClosePaymentVerificationDialog()
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.message,
        })
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err.response.data.message,
        })
      },
    )
  }
  return (
    <>
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
            <Typography>Payment Done</Typography>
            <Typography>{expensesData?.paymentDone || '-'}</Typography>
          </Box>
        </Box>
      </Box>
      <TableContainer className="profile_data_table mt-2" component={Paper}>
        {expenseList.length > 0 ? (
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 700, padding: '0px !important' }}
            className="table_heading"
          >
            <TableHead className="profile_data_table_header">
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Apply</TableCell>
                <TableCell>Approval</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Document</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenseList &&
                expenseList.map((row, index) => {
                  return (
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
                        {moment(row?.date).format('D/MM/YY')}
                      </TableCell>
                      <TableCell className="table_row_top_align">
                        {row?.name || '-'}
                      </TableCell>
                      <TableCell className="table_row_top_align">
                        {row?.amount || '-'}
                      </TableCell>
                      <TableCell className="table_row_top_align">
                        {row?.status === 'APPROVED'
                          ? row?.approvalAmount
                          : row?.status}
                      </TableCell>
                      <TableCell className="table_row_top_align">
                        {row?.payment_status || '-'}
                      </TableCell>
                      <TableCell className="table_row_top_align">
                        {row?.file || '-'}
                      </TableCell>
                      <TableCell className="table_row_top_align">
                        <Box>
                          <Button
                            onClick={() => {
                              setOpenStaffExpenses({
                                status: true,
                                data: row,
                              })
                            }}
                            className="border_button"
                          >
                            View
                          </Button>
                        </Box>
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
        openApprovalDialog={openApprovalDialog}
        setOpenApprovalDialog={setOpenApprovalDialog}
        paymentVerification={paymentVerification}
        setPaymentVerification={setPaymentVerification}
        handleStaffExpenseDetail={handleStaffExpenseDetail}
        expenseDetail={expenseDetail}
      />
      <StaffExpensesApprovalDialog
        openApprovalDialog={openApprovalDialog}
        closeApprovalDialog={handleCloseApprovalDialog}
        setOpenApprovalDialog={setOpenApprovalDialog}
        handleExpenseApproval={handleExpenseApproval}
      />
      <StaffPaymentVerificationDialog
        paymentVerification={paymentVerification}
        closePaymentVerification={handleClosePaymentVerificationDialog}
        setPaymentVerification={setPaymentVerification}
        handlePaymentStatus={handlePaymentStatus}
      />
    </>
  )
}

export default StaffExpenses
