import React, { useContext, useEffect, useState } from 'react'
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import InformationIcon from '../../assets/img/information.svg'
import CartIcon from '../../assets/img/orders_cart.svg'
import { Context as ContextActivePage } from '../../context/pageContext'
import {
  AddToCart,
  GetAdminProductList,
} from '../../services/apiservices/adminprofile'
import { Context as ContextSnackbar } from '../../context/pageContext'
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined'
import { DeleteMyCartProduct } from '../../services/apiservices/orderDetail'

const ClientOrders = () => {
  const navigate = useNavigate()
  const { setActivePage } = useContext(ContextActivePage)
  const [path, setPath] = useState(null)
  const [clientProductList, setClientProductList] = useState([])
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  let clientId = window.location.pathname
  clientId = clientId.split('/').pop()

  const handleClientOrdersClick = (path, name) => {
    navigate(path)
    setActivePage(name)
    setPath(path)
    localStorage.setItem('path', path)
  }

  const handleClientProductList = () => {
    let data = { cart: true, clientId }
    GetAdminProductList(
      data,
      res => {
        if (res?.success) {
          setClientProductList(res?.data?.products)
        }
      },
      err => {
        setClientProductList([])
      },
    )
  }

  useEffect(() => {
    handleClientProductList()
  }, [])

  const handleProductList = productId => {
    const updatedProductArray = clientProductList.map(obj => {
      if (obj.id === productId) {
        return { ...obj, inCart: !obj.inCart }
      }
      return obj
    })
    setClientProductList(updatedProductArray)
  }

  const handleAddToCart = row => {
    let data = {
      productId: row.id,
      clientId: parseInt(clientId),
    }
    AddToCart(
      data,
      res => {
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.message,
        })
        handleProductList(res.data.productId)
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

  const handleDeleteProduct = row => {
    DeleteMyCartProduct(
      row.cartId,
      res => {
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.message,
        })
        handleProductList(row.id)
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
      <Box className="main_tab_section">
        <Box className="tab_header">
          <Box>
            <Typography className="order_heading" variant="span">
              Products
            </Typography>
          </Box>
          <Box>
            <FormControl variant="outlined">
              <OutlinedInput
                className="search_field"
                placeholder="Search Here..."
                startAdornment={
                  <InputAdornment position="start" sx={{ margin: '0px' }}>
                    <IconButton>
                      <SearchRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Button
              onClick={() =>
                handleClientOrdersClick(`/mycart/${clientId}`, 'Order Detail')
              }
              className="main_tab_button"
              variant="span"
            >
              My Cart
            </Button>
          </Box>
        </Box>

        <Box className="below_main_tab_section">
          <Box className="inner_container">
            {clientProductList.map(data => {
              return (
                <Box className="client_product_card">
                  <Box className="task_card_hover">
                    <Typography className="order_card_heading" variant="span">
                      {data?.name}
                    </Typography>
                  </Box>
                  <Box className="product_card_main_section">
                    <img
                      className="client_order_photo"
                      src={data?.imageUrl}
                      variant="span"
                    />
                    <Box className="product_order_detail">
                      <Box className="order_price">
                        <Typography className="order_price_tag" variant="span">
                          Price
                        </Typography>
                        <Typography variant="span">{data?.price}</Typography>
                      </Box>
                      <Box className="info_and_cart">
                        <img src={InformationIcon} />
                        {data.inCart ? (
                          <Button
                            variant="contained"
                            className="product_cart_button"
                          >
                            <IndeterminateCheckBoxOutlinedIcon
                              sx={{
                                color: '#2E3591',
                                fontSize: '26px',
                              }}
                              onClick={() => handleDeleteProduct(data)}
                            />
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            className="product_cart_button"
                          >
                            <img
                              src={CartIcon}
                              onClick={() => handleAddToCart(data)}
                            />
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ClientOrders
