import React, { useEffect, useState } from 'react'
import {
  Tabs,
  Tab,
  Box,
  Pagination,
  Button,
  Typography,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
  Autocomplete,
  TextField,
  createFilterOptions,
} from '@mui/material'
import './index.css'
import { useNavigate } from 'react-router-dom'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { GetAllClients } from '../../services/apiservices/clientDetail'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FilterIcon from '../../assets/img/Filter.svg'
import { styled, useTheme } from '@mui/material/styles'
import { CLIENT, PERMISSION } from '../../constants'
import 'leaflet/dist/leaflet.css'
import {
  GetCityByStates,
  GetCountryList,
  GetStateByCountry,
} from '../../services/apiservices/country-state-city'
import PermissionsGate from '../Settings/PermissionGate'
const drawerWidth = 350
const CustomerList = React.lazy(() => import('./CustomerList'))
const BusinessCard = React.lazy(() => import('./BusinessCard'))
const Client = () => {
  const theme = useTheme()
  // const socket = io("http://159.89.165.83", { transports: ["websocket"] });
  const [value, setValue] = useState('digital')
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [clientDetails, setClientDetails] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [totalResult, setTotalresult] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isInternational, setIsInternational] = useState(null)
  const [cityList, setCityList] = useState([])
  const [clientStage, setClientStage] = useState('')
  const [stateList, setStateList] = useState([])
  const [selectedCityStateCountry, setSelectedCityStateCountry] = useState({
    city: null,
    state: null,
    country: null,
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
  const [countryList, setCountryList] = useState([])
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
    setSelectedCityStateCountry({ city: null, state: null, country: null })
    getClientDetails()
  }
  const handleApplyFilter = () => {
    getClientDetails()
  }
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setCurrentPage(0)
  }
  useEffect(() => {
    let data = selectedCityStateCountry?.state?.iso2
      ? `${selectedCityStateCountry?.country?.iso2}/states/${selectedCityStateCountry?.state?.iso2}/cities`
      : ''
    selectedCityStateCountry?.state &&
      GetCityByStates(
        data,
        res => {
          const uniqueCity = res.reduce((acc, current) => {
            const x = acc.find(item => item.name === current.name)
            if (!x) {
              return acc.concat([current])
            } else {
              return acc
            }
          }, [])
          setCityList(uniqueCity)
        },
        () => {},
      )
  }, [selectedCityStateCountry?.state])
  const handleGetCountry = () => {
    GetCountryList(
      {},
      res => {
        if (res) {
          setCountryList(res)
        }
      },
      () => {},
    )
  }
  useEffect(() => {
    open && handleGetCountry()
  }, [open])
  useEffect(() => {
    let value = clientType.filter(data => {
      if (data.id <= localStorage.getItem('clientStageAccess')) {
        return data
      }
    })

    setClientType(value)
  }, [])
  const handleChange = (event, newValue) => {
    setValue(newValue)
    setCurrentPage(1)
  }
  const ViewClientDetail = id => {
    navigate(`/clientprofile/${id}`)
  }
  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: option => option?.name,
  })
  useEffect(() => {
    let data = selectedCityStateCountry?.country?.iso2
    selectedCityStateCountry?.country &&
      GetStateByCountry(
        data,
        res => {
          setStateList(res)
        },
        () => {},
      )
  }, [selectedCityStateCountry?.country])
  useEffect(() => {
    // socket.on('client_list', data => {
    //   console.log('Printing Connections', data)
    //   GetAllClients(
    //     data,
    //     res => {
    //       if (res?.success) {
    //         setClientDetails(res?.data.client)
    //       }
    //     },
    //     err => {
    //       console.log(err)
    //       setClientDetails([])
    //     },
    //   )
    // })
    // return () => {
    //   socket.disconnect()
    // }
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
    if (selectedCityStateCountry.city !== '' && selectedCityStateCountry.city) {
      data['city_id'] = selectedCityStateCountry?.city?.id
    }
    if (
      selectedCityStateCountry.country !== '' &&
      selectedCityStateCountry.country
    ) {
      data['country_id'] = selectedCityStateCountry?.country?.id
    }
    if (
      selectedCityStateCountry.state !== '' &&
      selectedCityStateCountry.state
    ) {
      data['state_id'] = selectedCityStateCountry?.state?.id
    }
    if (clientStage !== '' && clientStage !== null) {
      data['stage'] = clientStage
    }
    setClientLoader(true)
    GetAllClients(
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
      () => {
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
    selectedCityStateCountry,
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
          {/* permission_control */}
          <PermissionsGate scopes={[PERMISSION.PERMISSIONS.EDIT_CLIENT]}>
            <Button
              className="main_tab_button"
              onClick={() => {
                navigate('/addeditclient')
              }}
            >
              + New Clients
            </Button>
          </PermissionsGate>
          <IconButton
            edge="end"
            onClick={handleDrawerOpen}
            className="filter_icon"
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
              <Typography sx={{ fontSize: '20px' }}>Filter By</Typography>
            </Box>
            <Box>
              <Button className="text_button" onClick={handleClearAllFilter}>
                Reset
              </Button>
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
            <Autocomplete
              className="filter_body_inner_section"
              disablePortal
              disableClearable
              options={countryList}
              value={selectedCityStateCountry?.country}
              onChange={(e, value) => {
                setSelectedCityStateCountry({
                  ...selectedCityStateCountry,
                  country: value,
                })
              }}
              getOptionLabel={option => option?.name}
              renderInput={params => (
                <TextField {...params} label="Select Country" />
              )}
            />
            <Autocomplete
              className="filter_body_inner_section"
              options={stateList}
              disableClearable
              disabled={!selectedCityStateCountry?.country}
              filterOptions={filterOptions}
              value={selectedCityStateCountry.state}
              getOptionLabel={option => option.name}
              onChange={(e, value) => {
                setSelectedCityStateCountry({
                  ...selectedCityStateCountry,
                  state: value,
                })
              }}
              renderInput={params => <TextField {...params} label="State" />}
            />
            <Autocomplete
              className="filter_body_inner_section"
              options={cityList}
              disableClearable
              disabled={!selectedCityStateCountry?.state}
              filterOptions={filterOptions}
              value={selectedCityStateCountry.city}
              getOptionLabel={option => option.name}
              onChange={(e, value) => {
                setSelectedCityStateCountry({
                  ...selectedCityStateCountry,
                  city: value,
                })
              }}
              renderInput={params => <TextField {...params} label="City" />}
            />
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
            getClientDetails={getClientDetails}
          />
        )}
        <Box>
          <Pagination
            className="pagination_style"
            rowsPerPageOptions={[5, 10, 25]}
            boundaryCount={0}
            siblingCount={0}
            size="small"
            shape="rounded"
            count={numbersToDisplayOnPagination}
            onRowsPerPageChange={handleChangeRowsPerPage}
            page={currentPage}
            onChange={(e, value) => {
              setCurrentPage(value)
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Client
