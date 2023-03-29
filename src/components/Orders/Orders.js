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
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Divider,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Drawer,
  Radio,
  TextField,
} from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import FilterIcon from '../../assets/img/Filter.svg'
import './index.css'
import { useNavigate } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import moment from 'moment'
import { GetAllClientOrderList } from '../../services/apiservices/orderDetail'
import { styled, useTheme } from '@mui/material/styles'
import {
  DatePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const drawerWidth = 400

const Orders = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const [orderList, setOrderList] = useState([])
  const [open, setOpen] = useState(false)
  const [createTask, setCreateTask] = useState({
    title: '',
    description: '',
    due_date: '2023-03-31',
  })
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }))

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

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Box className="d-flex flex-row justify-content-between align-items-center mx-2 px-2 mt-2">
        <Typography variant="span">Overview</Typography>
        <Box>
          <FormControl variant="outlined">
            <OutlinedInput
              sx={{ background: '#fff' }}
              className="order_search_field"
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

          <IconButton
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
            className="me-1"
            edge="end"
          >
            <img src={FilterIcon} alt="" />
          </IconButton>

          <Drawer
            sx={{
              width: 2,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
              },
            }}
            variant="persistent"
            anchor="right"
            open={open}
          >
            <DrawerHeader>
              <Box className="d-flex justify-content-between column w-100 align-items-center">
                <Box className="d-flex column justify-content-between w-50 align-items-center">
                  <IconButton
                    // sx={{ paddingRight: '10px' }}
                    // sx={{ paddingRight: '12rem' }}
                    // className="pe-5"
                    disableRipple={true}
                    onClick={handleDrawerClose}
                  >
                    {theme.direction === 'rtl' ? (
                      <ChevronLeftIcon sx={{ fontSize: '30px' }} />
                    ) : (
                      <ChevronRightIcon sx={{ fontSize: '30px' }} />
                    )}
                  </IconButton>

                  <Typography sx={{ fontSize: '22px', paddingRight: '60px' }}>
                    Filter By
                  </Typography>
                </Box>
                <Box className=" d-flex justify-content-end row w-50">
                  {/* <Typography sx={{ textAlign: 'end' }}>Clear All</Typography> */}
                  <Typography sx={{ paddingLeft: '80px' }}>
                    Clear All
                  </Typography>
                </Box>
              </Box>
            </DrawerHeader>

            <Divider />

            <Box className="py-3">
              <div className="row px-3">
                <FormControl className="px-3">
                  <FormLabel
                    sx={{ color: '#000000' }}
                    className="mb-2"
                    id="demo-row-radio-buttons-group-label"
                  >
                    Customer Type
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      // sx={{ backgroundColor: '#F1F2F6' }}
                      className="checkbox_background_color"
                      value="regular"
                      control={<Radio />}
                      label="Regular"
                    />
                    <FormControlLabel
                      className="checkbox_background_color"
                      value="dealer"
                      control={<Radio />}
                      label="Dealer"
                    />
                  </RadioGroup>
                </FormControl>

                <FormControl className="px-3 pt-3">
                  <FormLabel
                    sx={{ color: '#000000' }}
                    className="mb-2"
                    id="demo-row-radio-buttons-group-label"
                  >
                    Delivery
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      className="checkbox_background_color"
                      value="dispatch"
                      control={<Radio />}
                      label="Dispatch"
                    />
                    <FormControlLabel
                      className="checkbox_background_color"
                      value="shipping"
                      control={<Radio />}
                      label="Shipping"
                    />
                  </RadioGroup>
                </FormControl>

                <FormControl className="px-3 pt-3">
                  <FormLabel
                    sx={{ color: '#000000' }}
                    className="mb-2"
                    id="demo-row-radio-buttons-group-label"
                  >
                    Payment
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      className="checkbox_background_color"
                      value="pending"
                      control={<Radio />}
                      label="Pending"
                    />
                    <FormControlLabel
                      className="checkbox_background_color"
                      value="confirm"
                      control={<Radio />}
                      label="Confirm"
                    />
                  </RadioGroup>
                </FormControl>

                <div className="col-md-12 px-3 pt-3 mb-2">
                  <Typography variant="span">Task Starting Date</Typography>
                </div>
                <div className="mb-2">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    {/* <DatePicker */}
                    <DesktopDatePicker
                      disablePast
                      className="w-100"
                      value={createTask.due_date}
                      inputFormat="dd/MM/yyyy"
                      onChange={e => {
                        setCreateTask({
                          ...createTask,
                          due_date: moment(e).format('YYYY-MM-DD'),
                        })
                      }}
                      renderInput={params => (
                        <TextField className="w-100" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </Box>
          </Drawer>
        </Box>
      </Box>
      <Box className="order_section">
        <TableContainer sx={{ boxShadow: 'none' }} component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow
                sx={
                  {
                    // borderBottomStyle: 'solid',
                    // borderBottomWidth: 'thin',
                    // width: '100px',
                  }
                }
              >
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
