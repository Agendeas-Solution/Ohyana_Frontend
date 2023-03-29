import React, { useState, useEffect } from 'react'
import {Box,Table,TableBody,TableCell,TableContainer,Button,Paper,TableHead,TableRow,Typography,FormControl,OutlinedInput,InputAdornment,IconButton} from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import FilterIcon from '../../assets/img/Filter.svg'
import './index.css'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { GetAllClientOrderList } from '../../services/apiservices/orderDetail'
const Orders = () => {
  const navigate = useNavigate()
  const [orderList, setOrderList] = useState([])
  useEffect(() => {
    let path = window.location.pathname
    console.log('Printing Path of ', path)
    console.log('Printing ', path.split('/').pop())
    path = path.split('/').pop()
    GetAllClientOrderList(
      parseInt(path),
      res => {
        setOrderList(res?.data?.orders)
      },
      err => {
        console.log('Printing OrderList Error', err)
      },
    )
  }, [])
  return (
    <>
      <Box className="d-flex flex-row justify-content-between align-items-center mx-2 px-2">
        <Typography variant="span">Overview</Typography>
        <Box>
          <FormControl variant="outlined">
            <OutlinedInput
              sx={{ background: '#fff' }}
              className="mx-2"
              placeholder="Search Here..."
              startAdornment={
                <InputAdornment position="start" sx={{ background: '#fff' }}>
                  <IconButton>
                    <SearchRoundedIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <IconButton edge="end">
            <img src={FilterIcon} alt="" />
          </IconButton>
        </Box>
      </Box>
      <Box className="order_section">
        <TableContainer sx={{ boxShadow: 'none' }} component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Order Id.</TableCell>
                <TableCell align="left">Order By</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Total Item</TableCell>
                <TableCell align="left">Order Total</TableCell>
                <TableCell>Delivery</TableCell>
                <TableCell align="left">Payment</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderList.length > 0 &&
                orderList.map((orderData, index) => {
                  return (
                    <TableRow
                      key={index + 1}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell scope="row">{orderData?.id}</TableCell>
                      <TableCell align="left">
                        {orderData?.team?.name}
                      </TableCell>
                      <TableCell align="left">
                        {moment(orderData?.date).format('Do MMM YY')}
                      </TableCell>
                      <TableCell align="left">
                        {orderData?.total_items}
                      </TableCell>
                      <TableCell align="left">
                        {orderData?.order_total}
                      </TableCell>
                      <TableCell className="status_description" align="left">
                        {orderData?.orderTrackingStatus}
                      </TableCell>
                      <TableCell align="left">
                        {orderData?.paymentStatus}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={() => {
                            navigate(`/orderDetail/${orderData?.id}`)
                          }}
                          className="common_button"
                        >
                          View
                        </Button>
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

export default Orders
