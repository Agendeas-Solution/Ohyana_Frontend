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
import Paper from '@mui/material/Paper'
import { Context as ContextSnackbar } from '../../context/pageContext'
import {
  DeleteMyCartProduct,
  GetAllCartItems,
  PlaceOrders,
} from '../../services/apiservices/orderDetail'
import DeleteProductMyCart from '../ClientProfile/DeleteProductMyCart'
import NoResultFound from '../ErrorComponent/NoResultFound'
const MyCart = () => {
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const [deleteProductMyCardDialog, setDeleteProductCardDialog] = useState({
    status: false,
    id: '',
  })
  const [orderList, setOrderList] = useState([])
  let path = window.location.pathname
  path = path.split('/').pop()
  const handleGetAllCartItems = () => {
    GetAllCartItems(
      path,
      {},
      res => {
        setOrderList(res.data)
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
  useEffect(() => {
    handleGetAllCartItems()
  }, [])
  const handlePlaceOrder = () => {
    let data = {
      clientId: parseInt(path),
    }
    data['orders'] = orderList
      .map(value => {
        if (value.quantity > 0) {
          return {
            productId: value.product.id,
            quantity: value.quantity,
          }
        }
      })
      .filter(count => count !== undefined && count !== [])
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
    const index = orderList.findIndex(item => item.product.id === id)
    const updatedData = [...orderList]
    updatedData[index] = {
      ...updatedData[index],
      quantity: parseInt(event.target.value),
    }
    setOrderList(updatedData)
    debugger
  }
  const handleDeleteProductDialogClose = () => {
    setDeleteProductCardDialog({ ...deleteProductMyCardDialog, status: false })
  }
  const handleDeleteProduct = () => {
    DeleteMyCartProduct(
      deleteProductMyCardDialog.id,
      res => {
        handleDeleteProductDialogClose()
        handleGetAllCartItems()
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
      <Box className="main_section">
        <Box className="inner_main_section">
          <Box className="cart_header_section">
            <Box className="my_cart_header_section">
              <Box
                sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}
              >
                <Box
                  sx={{
                    width: '50%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginRight: '30px',
                  }}
                >
                  <Typography className="order_desc_subheading" variant="span">
                    Name
                  </Typography>
                  <Typography variant="span">Name</Typography>
                </Box>

                <Box
                  sx={{
                    width: '50%',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography className="order_desc_subheading" variant="span ">
                    Address
                  </Typography>
                  <Typography variant="span">Address</Typography>
                </Box>
              </Box>
              <Box
                sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}
              >
                <Box
                  sx={{
                    width: '50%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginRight: '30px',
                  }}
                >
                  <Typography className="order_desc_subheading" variant="span">
                    Date
                  </Typography>
                  <Typography variant="span">22 Aug 2023</Typography>
                </Box>
                <Box
                  sx={{
                    width: '50%',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography className="order_desc_subheading" variant="span ">
                    Total
                  </Typography>
                  <Typography variant="span">300</Typography>
                </Box>
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
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    {orderList.length > 0 ? (
                      <TableBody>
                        {orderList.map(data => {
                          console.log({ Data: data })
                          return (
                            <TableRow
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="right" sx={{ width: '0%' }}>
                                <img
                                  src={data.product.imageUrl}
                                  className="my_cart_product_photo"
                                />
                              </TableCell>
                              <TableCell align="right">
                                {data.product.name}
                              </TableCell>
                              <TableCell align="right">
                                {data.product.price}
                              </TableCell>
                              <TableCell align="right">
                                <TextField
                                  type="number"
                                  size="small"
                                  label="Quantity"
                                  variant="outlined"
                                  value={data.quantity}
                                  onChange={event =>
                                    handleQuantityChange(event, data.product.id)
                                  }
                                  InputProps={{
                                    inputProps: { min: 1, max: 100 },
                                  }}
                                />
                              </TableCell>
                              <TableCell align="right">
                                <Button
                                  onClick={() =>
                                    setDeleteProductCardDialog({
                                      ...deleteProductMyCardDialog,
                                      status: true,
                                      id: data.id,
                                    })
                                  }
                                  className="common_button"
                                >
                                  Remove
                                </Button>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    ) : (
                      <NoResultFound />
                    )}
                  </Table>
                </TableContainer>
              </Box>
              <Box
                sx={{ marginRight: '30px' }}
                className="my_cart_right_side_header"
              >
                <Button
                  onClick={handlePlaceOrder}
                  variant="span"
                  className="common_button"
                >
                  Place Order
                </Button>
              </Box>
            </Box>
          </Box>
          <DeleteProductMyCart
            deleteProductMyCardDialog={deleteProductMyCardDialog}
            handleDeleteProductDialogClose={handleDeleteProductDialogClose}
            handleDeleteProduct={handleDeleteProduct}
          />
        </Box>
      </Box>
    </>
  )
}

export default MyCart
