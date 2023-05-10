import React from 'react'
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

const MyCart = () => {
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
                  <Button variant="span" className="common_button">
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
                        src={ProductPhotoWithOutline}
                        className="my_cart_product_photo"
                      />
                      {/* <Typography>dfa</Typography> */}
                    </TableCell>

                    <TableCell align="right">Sandy</TableCell>
                    <TableCell align="right">20</TableCell>
                    <TableCell align="right">
                      <TextField
                        size="small"
                        id="outlined-basic"
                        label="Quantity"
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
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
