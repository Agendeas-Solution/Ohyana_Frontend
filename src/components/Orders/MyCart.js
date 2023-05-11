import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import PrintIcon from '@mui/icons-material/Print'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import ProductPhotoWithOutline from '../../assets/img/Product_Photo_With_Outline.svg'
import { Context as ContextSnackbar } from '../../context/pageContext'
import {
  GetAllCartItems,
  PlaceOrders,
} from '../../services/apiservices/orderDetail'

const MyCart = () => {
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const [orderList, setOrderList] = useState([])
  const [orders, setOrders] = useState([])
  let path = window.location.pathname
  path = path.split('/').pop()
  useEffect(() => {
    GetAllCartItems(
      path,
      {},
      res => {
        let orders = res.data
        for (let i = 0; i < orders.length; i++) {
          // Add a new field to each object
          orders[i].product.quantity = 1
        }
        setOrderList(orders)
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }, [])
  const handlePlaceOrder = () => {
    let data = {
      clientId: parseInt(path),
    }
    data['orders'] = orderList
      .map(value => {
        if (value.product.quantity > 0) {
          debugger
          return {
            productId: value.product.id,
            quantity: value.product.quantity,
          }
        }
      })
      .filter(count => count !== undefined && count !== [])
    debugger
    PlaceOrders(
      data,
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
  const handleQuantityChange = (event, id) => {
    // Find the object with the specified id
    const index = orderList.findIndex(item => item.product.id === id)

    // Update the quantity field in the state
    const updatedData = [...orderList]
    updatedData[index] = {
      ...updatedData[index],
      product: {
        ...updatedData[index].product,
        quantity: parseInt(event.target.value),
      },
    }
    setOrderList(updatedData)
    debugger
  }

  return (
    <>
      <Box className="main_section">
        <Box className="inner_main_section">
          {/* <Box
            className="my_cart_header_section"
          >
            <Box className="date_section">
              <Typography>Date</Typography>
              <Typography>18 Aug 2023</Typography>
              <Typography></Typography>
            </Box>

            <Box className="price_section">
              <Typography>Price</Typography>
              <Typography>6032</Typography>
              <Box>
                <Button className="common_button">Place Order</Button>
                <DeleteIcon className="mx-4" />
                <PrintIcon />
              </Box>
            </Box>
          </Box> */}

          <Box className="cart_header_section">
            <Box className="my_cart_header_section">
              <Box className="detail_row">
                <Typography className="order_desc_subheading" variant="span">
                  Date
                </Typography>
                <Typography variant="span">22 Aug 2023</Typography>
                <Typography variant="span"> </Typography>
              </Box>
              <Box className="detail_row">
                <Typography className="order_desc_subheading" variant="span ">
                  Price
                </Typography>
                <Typography variant="span">300</Typography>
                <Box className="my_cart_right_side_header">
                  <Button
                    onClick={handlePlaceOrder}
                    variant="span"
                    className="common_button"
                  >
                    Place Order
                  </Button>
                  <DeleteIcon className="mx-4" />
                  <PrintIcon />
                </Box>
              </Box>
            </Box>

            {/* <Box className="my_cart_right_side_header">
              <Button variant="span" className="common_button">
                Place Order
              </Button>
              <DeleteIcon className="mx-4" />
              <PrintIcon />
            </Box> */}
          </Box>

          <Box className="my_cart_details_section">
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table>
                <TableHead className="team_overview_table_heading">
                  <TableRow sx={{ marginTop: '5px' }}>
                    <TableCell></TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {orderList.length > 0 &&
                    orderList.map(data => {
                      return (
                        <TableRow
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell
                            align="right"
                            className="d-flex flex-row align-items-center"
                          >
                            {/* <Stack direction="row" spacing={1}>
     <Avatar
       className="me-2"
       sx={{ width: 50, height: 50 }}
       src={SnacksPhoto}
     />
   </Stack> */}
                            <img
                              src={data.product.imageUrl}
                              className="my_cart_product_photo"
                            />
                            {/* <Typography>dfa</Typography> */}
                          </TableCell>

                          <TableCell align="right">
                            {data.product.name}
                          </TableCell>
                          <TableCell align="right">
                            {data.product.price}
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              size="small"
                              type="number"
                              label="Quantity"
                              variant="outlined"
                              value={data.product.quantity}
                              onChange={event =>
                                handleQuantityChange(event, data.product.id)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default MyCart
