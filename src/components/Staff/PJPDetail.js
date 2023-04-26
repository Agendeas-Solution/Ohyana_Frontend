import React, { useState, useEffect, useContext } from 'react'
import {
  Box,
  Button,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Filter from '../../assets/img/Filter.svg'
import PJPScheduleTable from './PJPScheduleTable'
import {
  GetPJPList,
  CreatePJP,
  CompletePJPStatus,
} from '../../services/apiservices/teamcall'
import {
  GetAdminClientDetail,
  DeleteClientDetail,
  GetCityList,
  GetStateList,
} from '../../services/apiservices/clientDetail'
import moment from 'moment'
import AddPJPDialog from './AddPJPDialog'
import { Context as ContextSnackbar } from '../../context/pageContext'
import CompletedPJPDialog from './CompletedPJPDialog'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { styled, useTheme } from '@mui/material/styles'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { TEAM } from '../../constants/teamConstant'
const drawerWidth = 350

const PJPDetail = () => {
  const theme = useTheme()
  let path = window.location.pathname
  path = path.split('/').pop()
  const [value, setValue] = useState('TODAY')
  const [pjpList, setPjpList] = useState([])
  const [cityList, setCityList] = useState([])
  const [stateList, setStateList] = useState([])
  const [open, setOpen] = useState(false)
  const [addPJPDetail, setAddPJPDetail] = useState({
    dialogStatus: false,
    date: '',
    clientId: '',
    description: '',
  })
  const [selectedCityState, setSelectedCityState] = useState({
    city: '',
    state: '',
  })
  const [completedDialog, setCompletedDialog] = useState({
    status: false,
    description: '',
    pjpId: '',
  })
  const [statusTypeList, setStatusTypeList] = useState(TEAM.STATUSTYPE)
  const [filterPJP, setFilterPJP] = useState({
    pjpStatus: '',
    date: '',
  })
  const [numbersToDisplayOnPagination, setNumbersToDisplayOnPagination] =
    useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(2)
  // const [pageNumber, setPageNumber] = useState(1)
  const [totalResult, setTotalresult] = useState(null)
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleCloseDialog = () => {
    setAddPJPDetail({ ...addPJPDetail, dialogStatus: false })
  }
  const handleCloseCompletedDialog = () => {
    setCompletedDialog({ ...completedDialog, status: false })
  }
  const handleAddCompletePJPStatus = () => {
    let data = completedDialog
    delete data.status
    CompletePJPStatus(
      data,
      res => {
        if (res.success) {
          setSuccessSnackbar({
            ...successSnackbar,
            message: res?.message,
            status: true,
          })
        }
      },
      err => {
        console.log('Printing ', err)
      },
    )
  }
  const handleApplyFilter = () => {
    handleGetPJPList()
  }
  const handleClearAllFilter = () => {
    setFilterPJP({
      pjpStatus: null,
      date: '',
    })
    setSelectedCityState({ city: '', state: '' })
    handleGetPJPList()
  }
  // const getLocation = () => {
  //   if (!window.navigator.geolocation) {
  //   } else {
  //     window.navigator.geolocation.getCurrentPosition(
  //       position => {
  //         setAddPJPDetail({
  //           ...addPJPDetail,
  //           latitude: position.coords.latitude.toString(),
  //           longitude: position.coords.longitude.toString(),
  //         })
  //       },
  //       () => {},
  //     )
  //   }
  // }
  const handleGetPJPList = () => {
    let data = {
      teamId: path,
      day: value,
      page: currentPage,
      size: rowsPerPage,
    }
    if (filterPJP.pjpStatus !== '' && filterPJP.pjpStatus) {
      data['statusType'] = filterPJP.pjpStatus
    }
    if (selectedCityState.city !== '' && selectedCityState.city) {
      data['city'] = selectedCityState.city
    }
    if (selectedCityState.state !== '' && selectedCityState.state) {
      data['state'] = selectedCityState.state
    }
    GetPJPList(
      data,
      res => {
        if (res.success) {
          setPjpList(res?.data)
          setTotalresult(res?.data?.totalPage)
          let pages =
            res?.data?.totalPage > 0
              ? Math.ceil(res?.data?.totalPage / rowsPerPage)
              : null
          setNumbersToDisplayOnPagination(pages)
        }
      },
      err => {
        console.log('Printing ', err)
        setPjpList([])
      },
    )
  }

  useEffect(() => {
    handleGetPJPList()
  }, [value, selectedCityState, currentPage])
  const handleCityList = () => {
    GetCityList(
      {},
      res => {
        if (res?.success) {
          setCityList(res.data)
        }
      },
      err => {
        console.log(err)
      },
    )
  }
  const handleStateList = () => {
    GetStateList(
      {},
      res => {
        if (res?.success) {
          setStateList(res.data)
        }
      },
      err => {
        console.log(err)
      },
    )
  }

  useEffect(() => {
    handleCityList()
    handleStateList()
  }, [])

  const handleAddPJPDetail = () => {
    let pjpDetail = addPJPDetail
    delete pjpDetail.dialogStatus
    CreatePJP(
      pjpDetail,
      res => {
        handleCloseDialog()
        setSuccessSnackbar({ ...successSnackbar, message: res?.message })
      },
      err => {},
    )
  }

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    overflowX: 'hidden',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }))

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Box className="pjp_detail_main_box">
        <TabContext value={value}>
          <Box className="tab_row client_pjp_tab">
            <TabList onChange={handleChange}>
              <Tab label="Today" value="TODAY" />
              <Tab label="All" value="ALL" />
            </TabList>

            <Box className="button_and_filter">
              <Button
                onClick={() =>
                  setAddPJPDetail({ ...addPJPDetail, dialogStatus: true })
                }
                className="tab_btn p-2"
              >
                + Create
              </Button>
              {/* <img
                onClick={handleDrawerOpen}
                className="filter_btn"
                style={{ marginLeft: '12px' }}
                src={Filter}
                alt="Filter"
              /> */}
              <IconButton edge="end" onClick={handleDrawerOpen}>
                <img src={Filter} alt="" />
              </IconButton>
            </Box>
          </Box>

          <Drawer
            onClose={handleDrawerClose}
            sx={{
              '& .MuiDrawer-paper': {
                width: drawerWidth,
              },
            }}
            open={open}
            anchor="right"
          >
            <DrawerHeader className="drawer_header_section">
              <Box className="filter_main_heading">
                <IconButton
                  sx={{ color: '#2e3591' }}
                  disableRipple={true}
                  onClick={handleDrawerClose}
                >
                  {theme.direction === 'rtl' ? (
                    <ChevronLeftIcon className="chevron_icon" />
                  ) : (
                    <ChevronRightIcon className="chevron_icon" />
                  )}
                </IconButton>

                <Typography sx={{ fontSize: '20px' }}>Filter By</Typography>
              </Box>
              <Box>
                <Button onClick={handleApplyFilter} variant="contained">
                  Apply
                </Button>
                <Button>Clear All</Button>
              </Box>
            </DrawerHeader>
            <Divider />

            <Box className="filter_body_section">
              <FormControl className="filter_body_inner_section">
                <FormLabel
                  className="filter_body_inner_heading"
                  // id="demo-row-radio-buttons-group-label"
                >
                  PJP Is
                </FormLabel>
                <RadioGroup
                  // row
                  value={filterPJP.pjpStatus}
                  onChange={e => {
                    setFilterPJP({ ...filterPJP, pjpStatus: e.target.value })
                  }}
                >
                  <Box className="checkbox_section">
                    {statusTypeList.map(data => {
                      return (
                        <FormControlLabel
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

              <FormControl className="filter_body_inner_section">
                <InputLabel>Select City</InputLabel>
                <Select
                  label="Select City"
                  value={selectedCityState.city}
                  onChange={e => {
                    setSelectedCityState({
                      ...selectedCityState,
                      city: e.target.value,
                    })
                  }}
                >
                  {cityList &&
                    cityList.map(data => {
                      return <MenuItem value={data}>{data}</MenuItem>
                    })}
                </Select>
              </FormControl>

              <FormControl className="filter_body_inner_section">
                <InputLabel>Select State</InputLabel>
                <Select
                  label="Select State"
                  value={selectedCityState.state}
                  onChange={e => {
                    setSelectedCityState({
                      ...selectedCityState,
                      state: e.target.value,
                    })
                  }}
                >
                  {stateList &&
                    stateList.map(data => {
                      return <MenuItem value={data}>{data}</MenuItem>
                    })}
                </Select>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  inputFormat="dd/MM/yyyy"
                  value={filterPJP.date}
                  onChange={e => {
                    setFilterPJP({
                      ...filterPJP,
                      date: moment(e).format('YYYY-MM-DD'),
                    })
                  }}
                  renderInput={params => (
                    <TextField
                      variant="outlined"
                      {...params}
                      label="Date"
                      sx={{ margin: '10px 16px' }}
                    />
                  )}
                  PopperProps={{
                    placement: 'bottom-start', // Set placement to 'bottom-start'
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Drawer>

          <TabPanel sx={{ padding: '0px' }} value="TODAY">
            <PJPScheduleTable
              pjpList={pjpList}
              numbersToDisplayOnPagination={numbersToDisplayOnPagination}
              currentPage={currentPage}
              rowsPerPage={rowsPerPage}
              setCurrentPage={setCurrentPage}
            />
          </TabPanel>
          {/* <TabPanel value="TOMORROW">
            <PJPScheduleTable pjpList={pjpList} />
          </TabPanel> */}
          <TabPanel
            sx={{ padding: '0px' }}
            className="staff_profile_pjp"
            value="ALL"
          >
            <PJPScheduleTable
              pjpList={pjpList}
              numbersToDisplayOnPagination={numbersToDisplayOnPagination}
              currentPage={currentPage}
              rowsPerPage={rowsPerPage}
              setCurrentPage={setCurrentPage}
              completedDialog={completedDialog}
              setCompletedDialog={setCompletedDialog}
            />
          </TabPanel>
        </TabContext>
      </Box>
      <AddPJPDialog
        addPJPDetail={addPJPDetail}
        setAddPJPDetail={setAddPJPDetail}
        handleCloseDialog={handleCloseDialog}
        handleAddPJPDetail={handleAddPJPDetail}
      />
      <CompletedPJPDialog
        completedDialog={completedDialog}
        setCompletedDialog={setCompletedDialog}
        handleCloseCompletedDialog={handleCloseCompletedDialog}
        handleAddCompletePJPStatus={handleAddCompletePJPStatus}
      />
    </>
  )
}

export default PJPDetail
