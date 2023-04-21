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
  Pagination,
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
import { ORDER } from '../../constants/orderConstant'
const drawerWidth = 350
const Orders = () => {
  let path = window.location.pathname
  path = path.split('/').pop()
  const navigate = useNavigate()
  const theme = useTheme()
  const [orderList, setOrderList] = useState([])
  const [openDrawer, setOpen] = useState(false)
  const [totalResult, setTotalresult] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(2)
  const [deliveryStatusList, setDeliveryStatusList] = useState(
    ORDER.DELIVERYSTATUS,
  )
  const [paymentStatusList, setPaymentStatusList] = useState(
    ORDER.PAYMENTSTATUS,
  )
  const [numbersToDisplayOnPagination, setNumbersToDisplayOnPagination] =
    useState(0)
  const [queryParams, setQueryParams] = useState({
    delivery: '',
    payment: '',
    date: '',
    searchQuery: '',
  })
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }))
  const handleOrderList = () => {
    let data = { page: currentPage, size: rowsPerPage }
    if (queryParams.delivery !== '' && queryParams.delivery !== null) {
      data['delivery'] = queryParams.delivery
    }
    if (queryParams.payment !== '' && queryParams.payment !== null) {
      data['payment'] = queryParams.payment
    }
    if (queryParams.date !== '' && queryParams.date !== null) {
      data['date'] = queryParams.date
    }
    if (queryParams.searchQuery !== '' && queryParams.searchQuery !== null) {
      data['searchQuery'] = queryParams.searchQuery
    }
    GetAllClientOrderList(
      data,
      res => {
        setOrderList(res?.data?.orders)
        setTotalresult(res?.data?.totalPage)
        let pages =
          res?.data?.totalPage > 0
            ? Math.ceil(res?.data?.totalPage / rowsPerPage)
            : null
        setNumbersToDisplayOnPagination(pages)
      },
      err => {
        console.log('Printing OrderList Error', err)
        setOrderList([])
      },
    )
  }
  useEffect(() => {
    handleOrderList()
  }, [queryParams.searchQuery, currentPage])
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }
  const handleApplyFilter = () => {
    handleOrderList()
  }
  const handleClearAllFilter = () => {
    setQueryParams({
      ...queryParams,
      delivery: null,
      payment: null,
      date: null,
      searchQuery: '',
    })
  }
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
              value={queryParams.searchQuery}
              onChange={e => {
                setQueryParams({ ...queryParams, searchQuery: e.target.value })
              }}
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
              display: 'flex',
              padding: '0',
              margin: '0px',
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
            <DrawerHeader className="drawer_header_section">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  sx={{
                    ...(openDrawer && { display: 'flex' }),
                    padding: '0',
                    margin: '0 0 0 0px',
                  }}
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
                  value={queryParams.delivery}
                  onChange={e => {
                    setQueryParams({ ...queryParams, delivery: e.target.value })
                  }}
                >
                  {deliveryStatusList.map(data => {
                    return (
                      <FormControlLabel
                        className="checkbox_background_color"
                        value={data.value}
                        control={<Radio />}
                        label={data.type}
                      />
                    )
                  })}
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
                  value={queryParams.payment}
                  onChange={e => {
                    setQueryParams({ ...queryParams, payment: e.target.value })
                  }}
                >
                  {paymentStatusList.map(data => {
                    return (
                      <FormControlLabel
                        className="checkbox_background_color"
                        value={data.value}
                        control={<Radio />}
                        label={data.type}
                      />
                    )
                  })}
                </RadioGroup>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  inputFormat="dd/MM/yyyy"
                  value={queryParams.date}
                  onChange={e => {
                    setQueryParams({
                      ...queryParams,
                      date: moment(e).format('YYYY-MM-DD'),
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
            sx={{ minWidth: 690, padding: '0px !important' }}
            // className="table_heading "
          >
            <TableHead>
              <TableRow>
                <TableCell>Order Id.</TableCell>
                <TableCell>Order By</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total Item</TableCell>
                <TableCell align="left">Order Total</TableCell>
                <TableCell>Delivery</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell></TableCell>
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
                      <TableCell>{orderData?.client?.name || '-'}</TableCell>
                      <TableCell>
                        {moment(orderData?.date).format('Do MMM YY')}
                      </TableCell>
                      <TableCell>{orderData?.total_items || '-'}</TableCell>
                      <TableCell>{orderData?.order_total || '-'}</TableCell>
                      <TableCell className="status_description">
                        {orderData?.orderTrackingStatus || '-'}
                      </TableCell>
                      <TableCell>{orderData?.paymentStatus || '-'}</TableCell>
                      <TableCell>
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
        <Pagination
          className="pagination_style"
          boundaryCount={0}
          siblingCount={0}
          size="small"
          shape="rounded"
          count={numbersToDisplayOnPagination}
          page={currentPage}
          onChange={(e, value) => {
            setCurrentPage(value)
          }}
        />
      </Box>
    </Box>
  )
}

export default Orders
