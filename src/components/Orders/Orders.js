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
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
  Divider,
  TextField,
} from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import Drawer from '@mui/material/Drawer'
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

const drawerWidth = 350

const Orders = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const [orderList, setOrderList] = useState([])
  const [openDrawer, setOpen] = useState(false)
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

  const handleApplyFilter = () => { }
  const handleClearAllFilter = () => { }

  return (
    <Box className="main_tab_section">
      <Box className="tab_header">
        <Box>
          <Typography sx={{ color: '#8E8E8E' }} variant="span">
            Overview
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FormControl variant="outlined">
            <OutlinedInput
              className="search_field"
              placeholder="Search Here..."
              startAdornment={
                <InputAdornment position="start" sx={{ margin: '0px' }}>
                  <IconButton sx={{ margin: '0px' }}>
                    <SearchRoundedIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <IconButton
            edge="end"
            onClick={handleDrawerOpen}
            sx={{
              ...(openDrawer && { display: 'flex' }),
              padding: '0',
              margin: '0 0 0 0px',
            }}
          >
            <img src={FilterIcon} alt="" />
          </IconButton>

          <Drawer
            onClose={handleDrawerClose}
            sx={{
              '& .MuiDrawer-paper': {
                width: drawerWidth,
              },
            }}
            anchor="right"
            open={openDrawer}
          >
            <DrawerHeader
              className="drawer_header_section">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  sx={{ color: '#2e3591' }}
                  disableRipple={true}
                  onClick={handleDrawerClose}
                >
                  {theme.direction === 'rtl' ? (
                    <ChevronLeftIcon sx={{ fontSize: '30px' }} />
                  ) : (
                    <ChevronRightIcon sx={{ fontSize: '30px' }} />
                  )}
                </IconButton>

                <Typography sx={{ fontSize: '20px' }}>Filter By</Typography>
              </Box>
              <Box>
                <Button onClick={handleClearAllFilter} className="text_button">
                  Reset
                </Button>
                <Button
                  onClick={handleApplyFilter}
                  className="common_button"
                  variant="contained"
                >
                  Apply
                </Button>
              </Box>
            </DrawerHeader>

            <Divider />

            <Box
              sx={{ display: 'flex', flexDirection: 'column', margin: '10px' }}
            >
              <FormControl>
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

              <FormControl>
                <FormLabel
                  sx={{ color: '#000000' }}
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

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  inputFormat="dd/MM/yyyy"
                  value={createTask.due_date}
                  onChange={e => {
                    setCreateTask({
                      ...createTask,
                      due_date: moment(e).format('YYYY-MM-DD'),
                    })
                  }}
                  renderInput={params => (
                    <TextField
                      variant="outlined"
                      {...params}
                      label="Date"
                      sx={{ margin: '10px' }}
                    />
                  )}
                  PopperProps={{
                    placement: 'bottom-start', // Set placement to 'bottom-start'
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Drawer>
        </Box>
      </Box>
      <Box className="body_section_paddingless_pagination">
        <TableContainer
          className="orders_table_height"
          component={Paper}
          sx={{
            boxShadow: 'none',
            border: '1px solid #e5e5e5',
            overflowY: 'auto',
          }}
        >
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 690, marginLeft: '-10px' }}
          // className="table_heading "
          >
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
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      sx={{
                        '&:last-child td,th': { border: 0 },
                      }}
                    >
                      <TableCell className="tablecell_height" scope="row">
                        {orderData?.id}
                      </TableCell>
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
    </Box>
  )
}

export default Orders
