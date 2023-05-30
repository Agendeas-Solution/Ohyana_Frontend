import React, { useContext, useEffect, useState } from 'react'
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
import moment from 'moment'
import { GetSingleClientOrderList } from '../../services/apiservices/orderDetail'
import { useNavigate } from 'react-router-dom'
import NoResultFound from '../ErrorComponent/NoResultFound'
import { Context as ContextSnackbar } from '../../context/pageContext'

const OrderList = () => {
  const [orderList, setOrderList] = useState([])
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const navigate = useNavigate()
  useEffect(() => {
    let path = window.location.pathname
    path = path.split('/').pop()
    GetSingleClientOrderList(
      { clientId: parseInt(path) },
      res => {
        setOrderList(res.data.orders)
      },
      err => {},
    )
  }, [])
  return (
    <>
      <TableContainer className="profile_data_table" component={Paper}>
        {orderList.length > 0 ? (
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 700, padding: '0px !important' }}
            className="table_heading"
          >
            <TableHead className="profile_data_table_header">
              <TableRow>
                <TableCell>Order Id.</TableCell>
                <TableCell>Order By</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total Item</TableCell>
                <TableCell>Order Total</TableCell>
                <TableCell>Delivery</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderList.map((orderData, index) => {
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
                      {orderData?.id}
                    </TableCell>
                    <TableCell className="table_row_top_align">
                      {orderData?.team?.name}
                    </TableCell>
                    <TableCell className="table_row_top_align">
                      {moment(orderData?.date).format('Do MMM YY')}
                    </TableCell>
                    <TableCell className="table_row_top_align">
                      {orderData?.total_items}
                    </TableCell>
                    <TableCell>{orderData?.order_total}</TableCell>
                    <TableCell className="status_description">
                      {orderData?.orderTrackingStatus}
                    </TableCell>
                    <TableCell className="table_row_top_align">
                      {orderData?.paymentStatus}
                    </TableCell>
                    <TableCell className="table_row_top_align table_buttons">
                      <Button
                        onClick={() => {
                          navigate(`/orderDetail/${orderData?.id}`)
                        }}
                        className="border_button"
                      >
                        View
                      </Button>
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
    </>
  )
}

export default OrderList
