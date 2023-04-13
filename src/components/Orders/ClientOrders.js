import React from 'react'
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { Navigate, useNavigate } from 'react-router-dom'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import SnacksPhoto from '../../assets/img/SnacksPhoto.png'
import InfoIcon from '@mui/icons-material/Info'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import DoneIcon from '@mui/icons-material/Done'

const ClientOrders = () => {
  const navigate = useNavigate()
  const handleClickOpen = () => {
    navigate('/mycart')
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
              onClick={handleClickOpen}
              className="main_tab_button"
              variant="span"
            >
              My Cart
            </Button>
          </Box>
        </Box>

        <Box className="below_main_tab_section">
          <Box className="inner_container">
            <Box className="client_product_card">
              <Box
                className="task_card_hover"
                // onClick={() => {
                //   navigate(`/taskdetail/${taskData?.id}`)
                // }}
              >
                <Typography className="order_card_heading" variant="span">
                  Spicy Masala Noodles
                </Typography>
              </Box>

              <Box className="product_card_main_section">
                <Box>
                  <img
                    className="client_order_photo"
                    src={SnacksPhoto}
                    variant="span"
                  />
                </Box>

                <Box className="order_detail">
                  <Box className="order_price">
                    <Typography className="order_price_tag" variant="span">
                      Price
                    </Typography>
                    <Typography variant="span">10</Typography>
                  </Box>
                  <Box className="info_and_cart">
                    <InfoIcon />
                    <ShoppingCartIcon />
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box className="client_product_card">
              <Box
                className="task_card_hover"
                // onClick={() => {
                //   navigate(`/taskdetail/${taskData?.id}`)
                // }}
              >
                <Typography className="order_card_heading" variant="span">
                  {/* {taskData.title} */}
                  Spicy Masala Noodles
                </Typography>
              </Box>

              <Box className="product_card_main_section">
                <Box>
                  <img
                    className="client_order_photo"
                    src={SnacksPhoto}
                    variant="span"
                  />
                </Box>

                <Box className="order_detail">
                  <Box className="order_price">
                    <Typography className="order_price_tag" variant="span">
                      Price
                    </Typography>
                    <Typography variant="span">10</Typography>
                  </Box>
                  <Box className="info_and_cart">
                    <InfoIcon />
                    <ShoppingCartIcon />
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box className="client_product_card">
              <Box
                className="task_card_hover"
                // onClick={() => {
                //   navigate(`/taskdetail/${taskData?.id}`)
                // }}
              >
                <Typography className="order_card_heading" variant="span">
                  {/* {taskData.title} */}
                  Spicy Masala Noodles
                </Typography>
              </Box>

              <Box className="product_card_main_section">
                <Box>
                  <img
                    className="client_order_photo"
                    src={SnacksPhoto}
                    variant="span"
                  />
                </Box>

                <Box className="order_detail">
                  <Box className="order_price">
                    <Typography className="order_price_tag" variant="span">
                      Price
                    </Typography>
                    <Typography variant="span">10</Typography>
                  </Box>
                  <Box className="info_and_cart">
                    <InfoIcon />
                    <DoneIcon />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ClientOrders
