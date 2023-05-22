import React, { useState, useEffect, useContext } from 'react'
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
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material'
import './index.css'
import {
  GetOrderDetail,
  UpdateDeliveryStatus,
  UpdatePaymentStatus,
} from '../../services/apiservices/orderDetail'
import NoResultFound from '../ErrorComponent/NoResultFound'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { ORDER } from '../../constants/orderConstant'
import PermissionsGate, { CheckPermission } from '../Settings/PermissionGate'
import { PERMISSION } from '../../constants'
import moment from 'moment'
const PaymentDetailDialog = React.lazy(() => import('./PaymentDetailDialog'))

const steps = [
  {
    label: 'DISPATCH',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'DELIVERED',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
]

const OrderDetail = () => {
  const [orderDetail, setOrderDetail] = useState([])
  const [orderItems, setOrderItems] = useState([])
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const [paymentMethodList, setPaymentMethodList] = useState([
    'UPI',
    'CASH',
    'CARD',
    'CHECK',
    'NETBANKING',
    'OTHER',
  ])
  const [activeStep, setActiveStep] = useState(0)
  const [openPaymentDetailDialog, setOpenPaymentDetailDialog] = useState(false)
  const [openDispatchOrder, setOpenDispatchOrder] = useState(false)
  let path = window.location.pathname
  path = path.split('/').pop()
  useEffect(() => {
    GetOrderDetail(
      parseInt(path),
      {},
      res => {
        setOrderDetail(res.data.orderDetail)
        setOrderItems(res.data.orderDetail.order_items)
        let data = ORDER.DELIVERYSTATUS.map(data => {
          if (data.type === res.data.orderDetail.orderTrackingStatus) {
            return data.id
          }
        }).filter(count => count !== undefined && count !== [])
        setActiveStep(data[0])
      },
      err => {
        console.log('Printing OrderList Error', err)
      },
    )
  }, [])
  console.log({ or: orderDetail })
  const handleNext = statusValue => {
    UpdateDeliveryStatus(
      parseInt(path),
      { status: statusValue },
      res => {
        if (activeStep < 3) {
          setActiveStep(prevActiveStep => prevActiveStep + 1)
        }
      },
      err => {
        console.log('Printing Error', err)
      },
    )
  }
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
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
        setSuccessSnackbar({
          ...successSnackbar,
          message: res?.message,
          status: true,
        })
        setOrderDetail({
          ...orderDetail,
          method: res.data.order.method,
          status: res.data.order.status,
        })
        handleClosePaymentDialog()
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }

  return (
    <>
      <Box className="main_section" sx={{ overflow: 'hidden' }}>
        <Box
          className="payment_detail"
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: '5px',
            border: 'none',
            background: ' #f1f2f6',
            padding: '10px',
            marginBottom: '15px',
          }}
        >
          <Box
            sx={{
              width: '48%',
            }}
          >
            <Box className="payment_detail_heading">
              <Typography className="common_sub_heading" variant="span">
                Order Summary
              </Typography>
            </Box>
            <Box className="order_detail_row">
              <Typography className="order_desc_subheading" variant="span">
                Order Id
              </Typography>
              <Typography variant="span">{orderDetail?.id}</Typography>
            </Box>

            <Box className="order_detail_row">
              <Typography className="order_desc_subheading" variant="span ">
                Order For
              </Typography>
              <Typography variant="span">
                {orderDetail?.client?.name}
              </Typography>
            </Box>

            <Box className="order_detail_row">
              <Typography className="order_desc_subheading" variant="span ">
                Order Date
              </Typography>
              <Typography variant="span">
                {moment(orderDetail?.date).format('DD-MM-YYYY')}
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{ borderColor: '#8E8E8E' }}
            orientation="vertical"
            variant="middle"
            flexItem
          />
          <Box
            sx={{
              width: '48%',
            }}
          >
            <Box className="payment_detail_heading">
              <Typography className="common_sub_heading" variant="span">
                Payment Detail
              </Typography>

              <PermissionsGate
                scopes={[PERMISSION.PERMISSIONS.UPDATE_ORDER_PAYMENT_STATUS]}
              >
                <Button
                  className="white_buttons"
                  onClick={handleOpenPaymentDialog}
                  variant="contained"
                >
                  Update
                </Button>
              </PermissionsGate>
            </Box>

            <Box className="order_detail_row">
              <Typography className="order_desc_subheading" variant="span">
                Total
              </Typography>
              <Typography variant="span">{orderDetail?.order_total}</Typography>
            </Box>

            <Box className="order_detail_row">
              <Typography className="order_desc_subheading" variant="span">
                Status
              </Typography>
              <Typography variant="span">
                {orderDetail?.paymentStatus?.charAt(0)?.toUpperCase() +
                  orderDetail?.paymentStatus?.toLowerCase()?.substr(1)}
              </Typography>
            </Box>

            <Box className="order_detail_row">
              <Typography className="order_desc_subheading" variant="span">
                Method
              </Typography>
              <Typography variant="span">
                {orderDetail?.paymentMethod?.charAt(0)?.toUpperCase() +
                  orderDetail?.paymentMethod?.toLowerCase()?.substr(1) || '-'}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <PermissionsGate
            scopes={[PERMISSION.PERMISSIONS.UPDATE_ORDER_DELIVERY_STATUS]}
          >
            {/* Left section  */}
            <Box
              className="payment_detail"
              sx={{
                width: '100%',
                marginRight: '10px',
              }}
            >
              <Box className="payment_detail_heading">
                <Typography className="common_sub_heading" variant="span">
                  Order Tracking
                </Typography>
                {/* <Button
                className="common_button"
                onClick={handleOpenDispatchDialog}
                variant="contained"
              >
                Dispatch
              </Button> */}
              </Box>

              <Box sx={{ marginTop: '15px' }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <StepLabel
                        // optional={
                        //   index === 2 ? (
                        //     <Typography variant="caption">Last step</Typography>
                        //   ) : null
                        // }
                        >
                          {step.label}
                        </StepLabel>
                        {step.label == 'DISPATCH' ? (
                          <Typography>
                            {orderDetail?.dispatch_date
                              ? moment(orderDetail?.dispatch_date).format(
                                  'DD-MM-YYYY',
                                )
                              : ''}
                          </Typography>
                        ) : (
                          <Typography>
                            {orderDetail?.delivered_date
                              ? moment(orderDetail?.delivered_date).format(
                                  'DD-MM-YYYY',
                                )
                              : ''}
                          </Typography>
                        )}
                      </Box>
                      <StepContent>
                        <Typography>{step.description}</Typography>
                        <Box sx={{ mb: 2 }}>
                          <Box>
                            <Button
                              variant="contained"
                              onClick={() => handleNext(step.label)}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              {index === steps.length - 1
                                ? 'Finish'
                                : 'Continue'}
                            </Button>
                            <Button
                              disabled={true}
                              onClick={handleBack}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              Back
                            </Button>
                          </Box>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === steps.length && (
                  <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>
                      All steps completed - you&apos;re finished
                    </Typography>
                  </Paper>
                )}
              </Box>
            </Box>
          </PermissionsGate>
          {/* right section  */}
          <Box
            sx={{
              width: '100%',
            }}
          >
            <TableContainer
              className="profile_data_table client_detail_table set_box_shadow"
              component={Paper}
            >
              <Table
                stickyHeader
                aria-label="sticky table"
                sx={{ minWidth: 690, padding: '0px !important' }}
                className="table_heading"
              >
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetail?.order_items ? (
                    orderDetail?.order_items.map(data => {
                      console.log({ DATA: data })
                      return (
                        <TableRow
                          sx={{
                            '&:last-child td,th': { border: 0 },
                          }}
                        >
                          <TableCell align="right">
                            <img
                              style={{
                                border: '1px solid #E5E5E5',
                                borderRadius: '5px',
                                padding: '4px',
                                height: '90px',
                                width: '90px',
                              }}
                              src={data?.product?.productImage}
                            />
                          </TableCell>
                          <TableCell>{data?.product?.name || '-'}</TableCell>
                          <TableCell>{data?.product?.price || '-'}</TableCell>
                          <TableCell>{data?.quantity || '-'}</TableCell>
                          <TableCell>
                            {data?.product?.price * data?.quantity || 0}
                          </TableCell>
                        </TableRow>
                      )
                    })
                  ) : (
                    <NoResultFound />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* <PermissionsGate
              scopes={[!PERMISSION.PERMISSIONS.UPDATE_ORDER_DELIVERY_STATUS]}
            >
              <Box
                sx={{
                  width: '100%',
                }}
              >
                <TableContainer
                  className="profile_data_table client_detail_table set_box_shadow"
                  component={Paper}
                >
                  <Table
                    stickyHeader
                    aria-label="sticky table"
                    sx={{ minWidth: 690, padding: '0px !important' }}
                    className="table_heading"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Total Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orderDetail?.order_items ? (
                        orderDetail?.order_items.map(data => {
                          console.log({ DATA: data })
                          return (
                            <TableRow
                              sx={{
                                '&:last-child td,th': { border: 0 },
                              }}
                            >
                              <TableCell align="right">
                                <img
                                  style={{
                                    border: '1px solid #E5E5E5',
                                    borderRadius: '5px',
                                    padding: '4px',
                                    height: '90px',
                                    width: '90px',
                                  }}
                                  src={data?.product?.productImage}
                                />
                              </TableCell>
                              <TableCell>
                                {data?.product?.name || '-'}
                              </TableCell>
                              <TableCell>
                                {data?.product?.price || '-'}
                              </TableCell>
                              <TableCell>{data?.quantity || '-'}</TableCell>
                              <TableCell>
                                {data?.product?.price * data?.quantity || 0}
                              </TableCell>
                            </TableRow>
                          )
                        })
                      ) : (
                        <NoResultFound />
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </PermissionsGate> */}
        </Box>
      </Box>

      <PaymentDetailDialog
        handleClosePaymentDialog={handleClosePaymentDialog}
        openPaymentDetailDialog={openPaymentDetailDialog}
        paymentMethodList={paymentMethodList}
        handleUpdatePaymentStatus={handleUpdatePaymentStatus}
      />
    </>
  )
}

export default OrderDetail
