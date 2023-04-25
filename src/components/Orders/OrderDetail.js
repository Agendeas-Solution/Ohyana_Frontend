import React, { useState, useEffect } from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Button,
  Paper,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded'
import './index.css'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import SampleProduct from '../../assets/img/sample_product.png'
import {
  GetOrderDetail,
  UpdatePaymentStatus,
} from '../../services/apiservices/orderDetail'
import moment from 'moment'
const steps = ['Shipping', 'Dispatch', 'Delivered']
const Loader = React.lazy(() => import('../Loader/Loader'))
const PaymentDetailDialog = React.lazy(() => import('./PaymentDetailDialog'))

const OrderDetail = () => {
  const [orderDetail, setOrderDetail] = useState([])
  const [orderItems, setOrderItems] = useState([])
  const [paymentMethodList, setPaymentMethodList] = useState([
    'UPI',
    'CASH',
    'CARD',
    'CHECK',
    'NETBANKING',
    'OTHER',
  ])
  const [openPaymentDetailDialog, setOpenPaymentDetailDialog] = useState(false)
  let path = window.location.pathname
  path = path.split('/').pop()
  useEffect(() => {
    GetOrderDetail(
      parseInt(path),
      {},
      res => {
        setOrderDetail(res.data.orderDetail)
        setOrderItems(res.data.orderDetail.order_items)
      },
      err => {
        console.log('Printing OrderList Error', err)
      },
    )
  }, [])
  const handleActiveStep = Status => {
    steps.map((stepName, index) => {
      if (stepName !== Status) {
        return index + 1
      }
    })
  }
  const handleOpenPaymentDialog = () => {
    setOpenPaymentDetailDialog(true)
  }
  const handleClosePaymentDialog = () => {
    setOpenPaymentDetailDialog(false)
  }
  const handleUpdatePaymentStatus = paymentDetail => {
    UpdatePaymentStatus(
      {
        paymentDetail,
        orderId: path,
      },
      res => {
        setOrderDetail({
          ...orderDetail,
          method: res.data.order.method,
          status: res.data.order.status,
        })
        handleClosePaymentDialog()
      },
      err => {},
    )
  }

  return (
    <>
      <Box className="main_section">
        <Box className="order_description">
          <Box className="order_description_left_section">
            <Box className="common_row mb-4">
              <Typography className="order_desc_subheading" variant="span">
                Order Id
              </Typography>
              <Typography variant="span">{orderDetail?.id}</Typography>
            </Box>
            <Box className="common_row mb-4">
              <Typography className="order_desc_subheading" variant="span ">
                Order For
              </Typography>
              <Typography variant="span">
                {orderDetail?.client?.name}
              </Typography>
            </Box>
            <Box className="common_row mb-4">
              <Typography className="order_desc_subheading" variant="span">
                Date
              </Typography>
              <Typography variant="span">
                {moment(orderDetail?.date).format('DD-MM-YYYY hh:mm A')}
              </Typography>
            </Box>
          </Box>

          <Box className="order_description_middle_section">
            <Box className="common_row mb-4">
              <Typography className="order_desc_subheading" variant="span">
                Total
              </Typography>
              <Typography variant="span">{orderDetail?.order_total}</Typography>
            </Box>
            <Box className="common_row mb-4">
              <Typography className="order_desc_subheading" variant="span">
                City & State
              </Typography>
              <Typography variant="span">
                {orderDetail?.client?.city + ',' + orderDetail?.client?.state}
              </Typography>
            </Box>
            <Box className="common_row align-items-start mb-4">
              <Typography className="order_desc_subheading" variant="span">
                Address
              </Typography>
              <Typography className="text-right" variant="span">
                {orderDetail?.client?.address}
              </Typography>
            </Box>
          </Box>

          <Box className="order_description_right_section mt-3">
            <Button className="invoice_button">
              <ReceiptRoundedIcon />
            </Button>
          </Box>
        </Box>

        <Box className="order_tracking_payment_detail mt-2">
          <Box className="order_tracking">
            <Box className="order_tracking_heading align-items-center mb-4">
              <Typography className="common_sub_heading" variant="span">
                Order Tracking
              </Typography>
              <Button
                variant="contained"
                sx={{
                  background: '#fff',
                  color: '#2E3591',
                  marginRight: '10px',
                }}
              >
                Dispatch
              </Button>
            </Box>
            <Box sx={{ width: '100%', marginBottom: '8px' }}>
              <Stepper
                activeStep={handleActiveStep(orderDetail?.orderTrackingStatus)}
                alternativeLabel
              >
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>

          <Box className="payment_detail">
            <Box className="payment_detail_heading align-items-center">
              <Typography className="common_sub_heading" variant="span">
                Payment Detail
              </Typography>
              <Button
                onClick={handleOpenPaymentDialog}
                variant="contained"
                sx={{
                  background: '#fff',
                  color: '#2E3591',
                  marginRight: '10px',
                }}
              >
                {' '}
                Update
              </Button>
            </Box>
            <Box className="common_row mb-3 mx-2">
              <Typography className="order_desc_subheading" variant="span">
                Status
              </Typography>
              <Typography className="pe-3" variant="span">
                {orderDetail?.paymentStatus?.charAt(0)?.toUpperCase() +
                  orderDetail?.paymentStatus?.toLowerCase()?.substr(1)}
              </Typography>
            </Box>
            <Box className="common_row mb-3 mx-2">
              <Typography className="order_desc_subheading" variant="span">
                Method
              </Typography>
              <Typography className="pe-3" variant="span">
                {orderDetail?.paymentMethod?.charAt(0)?.toUpperCase() +
                  orderDetail?.paymentMethod?.toLowerCase()?.substr(1)}
              </Typography>
            </Box>
          </Box>
        </Box>

        <TableContainer
          component={Paper}
          sx={{ boxShadow: 'none', marginTop: 2 }}
        >
          <Table sx={{ minWidth: 250 }}>
            <TableHead className="team_overview_table_heading">
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderItems.length > 0 &&
                orderItems.map(data => {
                  return (
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="right">
                        <img
                          style={{
                            border: '1px solid #E5E5E5',
                            borderRadius: '5px',
                            padding: '4px',
                          }}
                          src={SampleProduct}
                        />
                      </TableCell>
                      <TableCell align="right">{data?.product?.name}</TableCell>
                      <TableCell align="right">
                        {data?.product?.price}
                      </TableCell>
                      <TableCell align="right">{data?.quantity}</TableCell>
                      <TableCell align="right">
                        {data?.product?.price * data?.quantity}
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <PaymentDetailDialog
          handleClosePaymentDialog={handleClosePaymentDialog}
          openPaymentDetailDialog={openPaymentDetailDialog}
          paymentMethodList={paymentMethodList}
          handleUpdatePaymentStatus={handleUpdatePaymentStatus}
        />
      </Box>
    </>
  )
}

export default OrderDetail
