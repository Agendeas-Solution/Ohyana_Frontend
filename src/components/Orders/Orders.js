import React, { useState, useEffect, useContext } from 'react'
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
import { GetSingleClientOrderList } from '../../services/apiservices/orderDetail'
import { styled, useTheme } from '@mui/material/styles'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
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
  const [rowsPerPage, setRowsPerPage] = useState(10)
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
    date: null,
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
    if (queryParams.delivery !== '' && queryParams.delivery) {
      data['delivery'] = queryParams.delivery
    }
    if (queryParams.payment !== '' && queryParams.payment) {
      data['payment'] = queryParams.payment
    }
    if (queryParams.date !== '' && queryParams.date) {
      data['date'] = queryParams.date
    }
    if (queryParams.searchQuery !== '' && queryParams.searchQuery) {
      data['searchQuery'] = queryParams.searchQuery
    }
    GetSingleClientOrderList(
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
        setOrderList([])
      },
    )
  }
  useEffect(() => {
    handleOrderList()
  }, [queryParams, currentPage])
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
              width: 2,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
              },
            }}
            anchor="right"
            open={openDrawer}
          >
            <DrawerHeader className="drawer_header_section">
              <Box className="filter_main_heading">
                <IconButton
                  sx={{ color: '#2e3591', padding: '0px' }}
                  disableRipple={true}
                  onClick={handleDrawerClose}
                >
                  {theme.direction === 'rtl' ? (
                    <ChevronLeftIcon className="chevron_icon" />
                  ) : (
                    <ChevronRightIcon className="chevron_icon" />
                  )}
                </IconButton>
                <Typography sx={{ fontSize: '22px' }}>Filter By</Typography>
              </Box>
              <Box>
                <Button className="text_button" onClick={handleClearAllFilter}>
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
            <Box className="filter_body_section">
              <FormControl className="filter_body_inner_section">
                <FormLabel className="filter_body_inner_heading">
                  Delivery
                </FormLabel>
                <RadioGroup
                  value={queryParams.delivery}
                  onChange={e => {
                    setQueryParams({ ...queryParams, delivery: e.target.value })
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                    className="checkbox_section"
                  >
                    {deliveryStatusList.map(data => {
                      return (
                        <FormControlLabel
                          sx={{
                            margin: '4px 4px',
                          }}
                          className="delivery_checkbox_background_color"
                          value={data.type}
                          control={<Radio />}
                          label={data.type}
                        />
                      )
                    })}
                  </Box>
                </RadioGroup>
              </FormControl>
              <FormControl className="filter_body_inner_section">
                <FormLabel className="filter_body_inner_heading">
                  Payment
                </FormLabel>
                <RadioGroup
                  value={queryParams.payment}
                  onChange={e => {
                    setQueryParams({ ...queryParams, payment: e.target.value })
                  }}
                >
                  <Box className="checkbox_section">
                    {paymentStatusList.map(data => {
                      return (
                        <FormControlLabel
                          sx={{
                            width: '100%',
                            margin: '4px 0px',
                          }}
                          className="checkbox_background_color"
                          value={data.value}
                          control={<Radio />}
                          label={data.type}
                        />
                      )
                    })}
                  </Box>
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
                      className="orders_drawer_date"
                    />
                  )}
                  PopperProps={{
                    placement: 'bottom-start',
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
