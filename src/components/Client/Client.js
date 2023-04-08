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
  InputAdornment, Select, MenuItem, InputLabel

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
const drawerWidth = 300

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
  const { setFlagLoader } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const [clientDetails, setClientDetails] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [pageNumber, setPageNumber] = useState(1)
  const [totalResult, setTotalresult] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isInternational, setIsInternational] = useState(null)
  const { successSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar } = useContext(ContextSnackbar)
  const [deleteClientDialogControl, setDeleteClientDialogControl] = useState({
    status: false,
    clientId: null,
  })
  const [numbersToDisplayOnPagination, setNumbersToDisplayOnPagination] =
    useState(0)
  const [clientLoader, setClientLoader] = useState(false)
  const [clientType, setClientType] = useState([
    { stage: 'intiate', id: 0 },
    { stage: 'no response', id: 1 },
    { stage: 'irrelevant', id: 2 },
    { stage: 'inter-mediate', id: 3 },
    { stage: 'confirm', id: 4 },
  ])
  const [searchQuery, setSearchQuery] = useState("");

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    overflowX: 'hidden',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    // justifyContent: 'flex-end',
  }))

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    console.log(clientType)
    let value = clientType.filter(data => {
      if (data.id <= permissions?.clientStageAccess) {
        return data
      }
    })
    setClientType(value)
  }, [])

  const [clientStage, setClientStage] = useState()
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
      err => { },
    )
  }
  const handleDialogClose = () => {
    setDeleteClientDialogControl({
      ...deleteClientDialogControl,
      status: false,
    })
  }
  const handleClearAll = () => {
    setClientStage(null);
    setLocation();
    debugger;

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
    data['stage'] = clientStage
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
    getClientDetails();
  }, [
    currentPage,
    isInternational,
    value,
    searchQuery,
    deleteClientDialogControl.status,
  ])
  return (
    <Box sx={{ backgroundColor: '#f1f2f6' }} className="main_tab_section">
      <Box sx={{ marginBottom: '10px' }}>
        {/* {clientLoader && <Loader />} */}
        {/* <Box> */}
        {/* <Box className="notification_tabs_root align-items-center d-flex"> */}
        <Box className="tab_header">
          <Box>
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
          </Box>

          <Box>
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
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                sx={{ ...(open && { display: 'none' }) }}
              >
                <img src={FilterIcon} alt="" />
              </IconButton>
            </Box>

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
              <DrawerHeader sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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

                  <Typography sx={{ fontSize: '20px', }}>
                    Filter By
                  </Typography>

                </Box>
                <Box >
                  <Typography>Clear All</Typography>

                </Box>
              </DrawerHeader>
              <Divider />

              <Box sx={{ display: 'flex', flexDirection: 'column', margin: '10px' }}>

                <FormControl sx={{ margin: '10px' }}>
                  <InputLabel>Client Type</InputLabel>
                  <Select
                    label="Client Stage"
                    value={
                      clientStage !== null ? clientType[clientStage] : null
                    }
                    onChange={(e, value) => {
                      console.log(value)
                      setClientStage(value?.id)
                    }}
                  >
                    {
                      clientType.map((data) => {
                        return <MenuItem value={data.id}>{data.stage}</MenuItem>
                      })
                    }

                  </Select>
                </FormControl>

                <FormControl sx={{ margin: '10px' }}>
                  <InputLabel>Select City</InputLabel>
                  <Select
                    label="Select City"
                    // value=
                    //   {userDetail.city}
                    onChange={(e, value) => {
                      // console.log(value)
                      // setClientCity(value?.id)
                    }}
                  >
                    <MenuItem value="INDIAMART">Ahmedabad</MenuItem>
                    <MenuItem value="WEBSITE">Baroda</MenuItem>
                    <MenuItem value="WEBSITE">Rajkot</MenuItem>
                    <MenuItem value="OFFICE">Surat</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ margin: '10px' }}>
                  <InputLabel>Select State</InputLabel>
                  <Select
                    label="Select State"
                    // value=
                    //   {userDetail.state}
                    onChange={(e, value) => {
                      // console.log(value)
                      // setClientState(value?.id)
                    }}
                  >
                    <MenuItem value="WEBSITE">Chhattisgarh</MenuItem>
                    <MenuItem value="INDIAMART">Gujarat</MenuItem>
                    <MenuItem value="OFFICE">Maharashtra</MenuItem>
                    <MenuItem value="WEBSITE">Uttar Pradesh</MenuItem>
                  </Select>
                </FormControl>

              </Box>
            </Drawer>
          </Box>
        </Box>
        <Box>
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
        {/* </Box> */}

        <Dialog
          open={deleteClientDialogControl.status}
          onClose={handleDialogClose}
        >
          <Box className="client_appointment_dialog">
            <Box className="client_appointment_content">
              <img
                style={{ width: '60px', height: '60px' }}
                src={DeleteIcon}
                alt=""
              />
              <Typography variant="h5" sx={{ fontWeight: '500' }}>
                Delete Client
              </Typography>
              <Typography
                sx={{ marginTop: '10px', marginBottom: '10px' }}
                variant="span"
              >
                Are You Sure you want to Delete this Client ?
              </Typography>
            </Box>
            <DialogActions>
              <Button
                variant="contained"
                onClick={handleClientDelete}
                autoFocus
              >
                Ok
              </Button>
              <Button
                className="cancel-btn"
                onClick={handleDialogClose}
                autoFocus
              >
                Cancel
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Box>
    </Box >
  )
}

export default Client
