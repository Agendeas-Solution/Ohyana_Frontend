import React, { useEffect, useState, useContext, lazy } from 'react'
import {
  Tabs,
  Tab,
  Box,
  Autocomplete,
  TextField,
  Pagination,
  Button,
  Dialog,
  DialogActions,
  Typography,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material'
import './index.css'
import { socket } from '../../App'
import DeleteIcon from '../../assets/img/delete.png'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useNavigate } from 'react-router-dom'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  GetAdminClientDetail,
  DeleteClientDetail,
  GetCityList,
  GetStateList,
} from '../../services/apiservices/clientDetail'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { Context as AuthContext } from '../../context/authContext/authContext'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FilterIcon from '../../assets/img/Filter.svg'
import { styled, useTheme } from '@mui/material/styles'
import { CLIENT } from '../../constants'
const drawerWidth = 350
const Loader = React.lazy(() => import('../Loader/Loader'))
const NoResultFound = React.lazy(() =>
  import('../ErrorComponent/NoResultFound'),
)
const CustomerList = React.lazy(() => import('./CustomerList'))
const BusinessCard = React.lazy(() => import('./BusinessCard'))

const Client = () => {
  const theme = useTheme()
  // const socket = io("http://159.89.165.83", { transports: ["websocket"] });
  const [value, setValue] = useState('digital')
  const navigate = useNavigate()
  const { flagLoader, permissions } = useContext(AuthContext).state
  // const { setFlagLoader } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const [clientDetails, setClientDetails] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(20)
  // const [pageNumber, setPageNumber] = useState(1)
  const [totalResult, setTotalresult] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isInternational, setIsInternational] = useState(null)
  const { successSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar } = useContext(ContextSnackbar)
  const [cityList, setCityList] = useState([])
  const [clientStage, setClientStage] = useState('')
  const [stateList, setStateList] = useState([])
  const [selectedCityState, setSelectedCityState] = useState({
    city: '',
    state: '',
  })
  const [deleteClientDialogControl, setDeleteClientDialogControl] = useState({
    status: false,
    clientId: null,
  })
  const [numbersToDisplayOnPagination, setNumbersToDisplayOnPagination] =
    useState(0)
  const [clientLoader, setClientLoader] = useState(false)
  const [clientType, setClientType] = useState(CLIENT.STAGE)
  const [searchQuery, setSearchQuery] = useState('')

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
  const handleClearAllFilter = () => {
    setClientStage(null)
    setSelectedCityState({ city: '', state: '' })
    getClientDetails()
  }
  const handleApplyFilter = () => {
    getClientDetails()
  }
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
  useEffect(() => {
    console.log(clientType)
    let value = clientType.filter(data => {
      if (data.id <= permissions?.clientStageAccess) {
        return data
      }
    })
    setClientType(value)
  }, [])

  const [location, setLocation] = useState()
  const handleClientDelete = () => {
    DeleteClientDetail(
      deleteClientDialogControl.clientId,
      res => {
        setDeleteClientDialogControl({
          ...deleteClientDialogControl,
          status: false,
        })
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.data.message,
        })
      },
      err => {},
    )
  }
  const handleDialogClose = () => {
    setDeleteClientDialogControl({
      ...deleteClientDialogControl,
      status: false,
    })
  }
  const handleChange = (event, newValue) => {
    setValue(newValue)
    setCurrentPage(1)
  }
  const ViewClientDetail = id => {
    navigate(`/clientprofile/${id}`)
  }
  useEffect(() => {
    // socket.on('connect', (connection) => {
    // socket.on("client_list", (data) => {
    //     console.log("Printing Connections", data);
    //     GetAdminClientDetail(
    //       data,
    //       (res) => {
    //         if (res?.success) {
    //           setClientDetails(res?.data.client);
    //         }
    //       },
    //       (err) => {
    //         console.log(err);
    //       }
    //     );
    //   });
    // });
    // return () => socket.disconnect();
    // const socket = io("http://159.89.165.83");
    socket.on('client_list', data => {
      console.log('Printing Connections', data)
      GetAdminClientDetail(
        data,
        res => {
          if (res?.success) {
            setClientDetails(res?.data.client)
          }
        },
        err => {
          console.log(err)
          setClientDetails([])
        },
      )
    })
    return () => {
      socket.disconnect()
    }
  }, [])
  const getClientDetails = () => {
    let data = { page: currentPage, size: rowsPerPage }
    data['tabType'] = value
    if (isInternational !== null) {
      data['isInternational'] = isInternational
    }
    if (value === 'PJP') {
      data['pjp'] = true
    }
    if (searchQuery) {
      data['searchQuery'] = searchQuery
    }
    if (selectedCityState.city !== '' && selectedCityState.city !== null) {
      data['city'] = selectedCityState.city
    }
    if (selectedCityState.state !== '' && selectedCityState.state !== null) {
      data['state'] = selectedCityState.state
    }
    if (clientStage !== '' && clientStage !== null) {
      data['stage'] = clientStage
    }
    setClientLoader(true)
    GetAdminClientDetail(
      data,
      res => {
        if (res?.success) {
          setTotalresult(res?.data?.totalPage)
          setClientDetails(res?.data.client)
          let pages =
            res?.data?.totalPage > 0
              ? Math.ceil(res?.data?.totalPage / rowsPerPage)
              : null
          setNumbersToDisplayOnPagination(pages)
          setClientLoader(false)
        }
      },
      err => {
        console.log(err)
        setClientDetails([])
        setClientLoader(false)
      },
    )
  }
  useEffect(() => {
    getClientDetails()
  }, [
    currentPage,
    isInternational,
    value,
    clientStage,
    searchQuery,
    selectedCityState,
    deleteClientDialogControl.status,
  ])
  return (
    <Box className="main_tab_section">
      <Box className="tab_header">
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab value="digital" label="Digital" />
          <Tab value="business_card" label="Business Card" />
          <Tab value="prospective" label="Prospective" />
          <Tab value="existing" label="Existing" />
          <Tab value="other" label="Other" />
        </Tabs>
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
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              startAdornment={
                <InputAdornment position="start" sx={{ margin: '0' }}>
                  <IconButton>
                    <SearchRoundedIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {permissions?.editClient && (
            <Button
              className="main_tab_button"
              onClick={() => {
                navigate('/addclient')
              }}
            >
              + New Clients
            </Button>
          )}

          <IconButton
            edge="end"
            onClick={handleDrawerOpen}
            sx={{
              display: 'flex',
              padding: '0',
              margin: '0 0 0 10px',
            }}
          >
            <img src={FilterIcon} alt="" />
          </IconButton>
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <IconButton
                sx={{ color: '#2e3591', padding: '0px' }}
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
          <Box
            sx={{ display: 'flex', flexDirection: 'column', margin: '10px' }}
          >
            <FormControl sx={{ margin: '10px' }}>
              <InputLabel>Client Type</InputLabel>
              <Select
                label="Client Stage"
                value={clientStage}
                onChange={e => {
                  setClientStage(e.target.value)
                }}
              >
                {clientType.map(data => {
                  return <MenuItem value={data.id}>{data.stage}</MenuItem>
                })}
              </Select>
            </FormControl>
            <FormControl sx={{ margin: '10px' }}>
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
                    console.log('Printing Data', data)
                    return <MenuItem value={data}>{data}</MenuItem>
                  })}
              </Select>
            </FormControl>
            <FormControl sx={{ margin: '10px' }}>
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
                    console.log('Printing Data', data)
                    return <MenuItem value={data}>{data}</MenuItem>
                  })}
              </Select>
            </FormControl>
          </Box>
        </Drawer>
      </Box>

      <Box className="body_section_paddingless_pagination">
        {value === 'business_card' ? (
          <BusinessCard clientDetails={clientDetails} />
        ) : (
          <CustomerList
            clientDetails={clientDetails}
            ViewClientDetail={ViewClientDetail}
          />
        )}
        <Pagination
          className="mt-3"
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

export default Client
