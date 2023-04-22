import React, { useEffect, useState } from 'react'
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

const OrderList = () => {
  const [orderList, setOrderList] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    let path = window.location.pathname
    path = path.split('/').pop()
    GetSingleClientOrderList(
      parseInt(path),
      res => {
        setOrderList(res.data.orders)
      },
      err => {
        console.log('Printing OrderList Error', err)
      },
    )
  }, [])
  return (
    <>
      {/* {orderList.length > 0 ? ( */}
      <TableContainer
        className="client_table_height mt-1"
        component={Paper}
        sx={{
          boxShadow: 'none',
          border: '1px solid #e5e5e5',
          overflowY: 'auto',
        }}
      >
        {orderList.length > 0 ? (
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 690, padding: '0px !important' }}
            className="table_heading"
          >
            <TableHead className="client_profile_table_header">
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
                    <TableCell scope="row">{orderData?.id}</TableCell>
                    <TableCell>{orderData?.team?.name}</TableCell>
                    <TableCell>
                      {moment(orderData?.date).format('Do MMM YY')}
                    </TableCell>
                    <TableCell>{orderData?.total_items}</TableCell>
                    <TableCell>{orderData?.order_total}</TableCell>
                    <TableCell className="status_description">
                      {orderData?.orderTrackingStatus}
                    </TableCell>
                    <TableCell>{orderData?.paymentStatus}</TableCell>
                    <TableCell>
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
