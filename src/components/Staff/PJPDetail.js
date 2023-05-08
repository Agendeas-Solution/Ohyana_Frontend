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
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  GetCityList,
  GetStateList,
  UpdatePJPDetail,
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
import PJPDetailDialog from './PJPDetailDialog'
import NoResultFound from '../ErrorComponent/NoResultFound'
const drawerWidth = 350

const PJPDetail = ({
  addPJPDetail,
  setAddPJPDetail,
  handleDrawerOpen,
  handleDrawerClose,
  open,
  setOpen,
}) => {
  const theme = useTheme()
  let path = window.location.pathname
  path = path.split('/').pop()
  const [value, setValue] = useState('ALL')
  const [pjpList, setPjpList] = useState([])
  const [cityList, setCityList] = useState([])
  const [stateList, setStateList] = useState([])
  // const [open, setOpen] = useState(false)
  // const [addPJPDetail, setAddPJPDetail] = useState({
  //   dialogStatus: false,
  //   date: moment().format('LL'),
  //   clientId: '',
  //   description: '',
  // })
  const [pjpDetailDialog, setPJPDetailDialog] = useState({
    status: false,
    id: '',
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
    date: moment().format('LL'),
  })
  const [numbersToDisplayOnPagination, setNumbersToDisplayOnPagination] =
    useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  // const [pageNumber, setPageNumber] = useState(1)
  const [totalResult, setTotalresult] = useState(null)
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleCloseDialog = () => {
    setAddPJPDetail({
      ...addPJPDetail,
      dialogStatus: false,
      pjpId: '',
      date: '',
      clientId: '',
      description: '',
    })
    setPJPDetailDialog({ ...pjpDetailDialog, status: false })
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
    open && handleCityList()
    open && handleStateList()
  }, [open])

  const handleAddPJPDetail = () => {
    let data = {
      date: addPJPDetail.date,
      description: addPJPDetail.description,
    }
    if (addPJPDetail.pjpId) {
      data['pjpId'] = addPJPDetail.pjpId
    } else {
      data['clientId'] = addPJPDetail.clientId.id
      data['teamId'] = parseInt(path)
    }
    debugger
    addPJPDetail.pjpId
      ? UpdatePJPDetail(
          data,
          res => {
            if (res?.success) {
              debugger
              handleCloseDialog()
              handleGetPJPList()
              setSuccessSnackbar({
                ...successSnackbar,
                message: res?.message,
                status: true,
              })
            }
          },
          err => {
            console.log(err)
            setErrorSnackbar({
              ...errorSnackbar,
              status: true,
              message: err?.response?.data?.message,
            })
          },
        )
      : CreatePJP(
          data,
          res => {
            handleCloseDialog()
            handleGetPJPList()
            setSuccessSnackbar({
              ...successSnackbar,
              message: res?.message,
              status: true,
            })
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

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    overflowX: 'hidden',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }))

  // const handleDrawerOpen = () => {
  //   setOpen(true)
  // }

  // const handleDrawerClose = () => {
  //   setOpen(false)
  // }

  return (
    <>
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
        open={open}
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
            <Typography sx={{ fontSize: '22px', paddingRight: '0px' }}>
              Filter By
            </Typography>
          </Box>
          <Box>
            <Button onClick={handleClearAllFilter}>Reset</Button>
            <Button
              className="common_button"
              onClick={handleApplyFilter}
              variant="contained"
            >
              Apply
            </Button>
          </Box>
        </DrawerHeader>
        <Divider />
        <Box className="filter_body_section">
          <FormControl className="filter_body_inner_section">
            <FormLabel className="filter_body_inner_heading">PJP Is</FormLabel>
            <RadioGroup
              value={filterPJP.pjpStatus}
              onChange={e => {
                setFilterPJP({ ...filterPJP, pjpStatus: e.target.value })
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                {statusTypeList.map(data => {
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
                  sx={{ margin: '10px 10px' }}
                />
              )}
              PopperProps={{
                placement: 'bottom-start', // Set placement to 'bottom-start'
              }}
            />
          </LocalizationProvider>

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
        </Box>
      </Drawer>
      <TableContainer className="profile_data_table" component={Paper}>
        {pjpList?.pjps && pjpList?.pjps.length > 0 ? (
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 700, padding: '0px !important' }}
            className="table_heading"
          >
            <TableHead className="profile_data_table_header">
              <TableRow>
                <TableCell>Sr No.</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Business Name</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>City</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pjpList?.pjps.map((pjpData, index) => {
                return (
                  <TableRow
                    key={index}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    sx={{
                      '&:last-child td,th': { border: 0 },
                    }}
                  >
                    <TableCell scope="row" className=" table_row_top_align">
                      {index + 1}
                    </TableCell>
                    <TableCell className="table_row_top_align">
                      {pjpData?.date || '-'}
                    </TableCell>
                    <TableCell className="table_row_top_align">
                      {pjpData?.client?.name || '-'}
                    </TableCell>
                    <TableCell className="table_row_top_align">
                      {pjpData?.client?.business || '-'}
                    </TableCell>
                    <TableCell className="table_row_top_align">
                      {pjpData?.client?.contact_number || '-'}
                    </TableCell>
                    <TableCell className="table_row_top_align">
                      {pjpData?.client?.city || '-'}
                    </TableCell>
                    <TableCell className="table_row_top_align table_buttons">
                      <Box
                        sx={{
                          marginRight: '10px',
                          minWidth: '50px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {!pjpData?.is_completed ? (
                          <Button
                            className="border_button"
                            onClick={() =>
                              setCompletedDialog({
                                ...completedDialog,
                                status: true,
                                pjpId: pjpData?.id,
                              })
                            }
                          >
                            Complete
                          </Button>
                        ) : (
                          '-'
                        )}
                      </Box>

                      <Button
                        className="border_button"
                        onClick={() =>
                          setPJPDetailDialog({
                            status: true,
                            id: pjpData.id,
                          })
                        }
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        ) : (
          <NoResultFound />
        )}
      </TableContainer>

      {addPJPDetail.dialogStatus && (
        <AddPJPDialog
          addPJPDetail={addPJPDetail}
          setAddPJPDetail={setAddPJPDetail}
          handleCloseDialog={handleCloseDialog}
          handleAddPJPDetail={handleAddPJPDetail}
        />
      )}
      {completedDialog.status && (
        <CompletedPJPDialog
          completedDialog={completedDialog}
          setCompletedDialog={setCompletedDialog}
          handleCloseCompletedDialog={handleCloseCompletedDialog}
          handleAddCompletePJPStatus={handleAddCompletePJPStatus}
        />
      )}
      {pjpDetailDialog.status && (
        <PJPDetailDialog
          addPJPDetail={addPJPDetail}
          setAddPJPDetail={setAddPJPDetail}
          pjpDetailDialog={pjpDetailDialog}
          handleCloseDialog={handleCloseDialog}
          setPJPDetailDialog={setPJPDetailDialog}
        />
      )}
    </>
  )
}

export default PJPDetail
