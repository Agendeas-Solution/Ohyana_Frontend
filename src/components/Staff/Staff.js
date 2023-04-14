import React, { useEffect, useState, useContext } from 'react'
import {
  Box,
  TextField,
  Button,
  Autocomplete,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormLabel,
  RadioGroup,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
  Divider,
  Drawer,
  FormLabelRadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material'
import './index.css'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import FilterIcon from '../../assets/img/Filter.svg'
import { useNavigate } from 'react-router-dom'
import { Context as AuthContext } from '../../context/authContext/authContext'
import {
  GetAdminStaffDetailList,
  GetUsersAttendanceList,
  GetSingleStaffDetailList,
} from '../../services/apiservices/staffDetail'
import {
  GetAdminDepartmentList,
  GetAdminRole,
} from '../../services/apiservices/adminprofile'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import moment from 'moment'
import { styled, useTheme } from '@mui/material/styles'
const drawerWidth = 400
const Loader = React.lazy(() => import('../Loader/Loader'))
const SuccessSnackbar = React.lazy(() =>
  import('../SuccessSnackbar/SuccessSnackbar'),
)
const Staff = () => {
  let navigate = useNavigate()
  const theme = useTheme()
  const { flagLoader, permissions } = useContext(AuthContext).state
  const { setFlagLoader } = useContext(AuthContext)
  const [value, setValue] = useState('1')
  const [open, setOpen] = useState(false)
  const [loader, setLoader] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [clientStage, setClientStage] = useState()
  const d = new Date()
  const [datePicker, setDatePicker] = useState({
    $M: d.getMonth() + 1,
    $y: d.getFullYear(),
  })
  const [staffDetailList, setStaffDetailList] = useState([])
  const [singleStaffDetails, setSingleStaffDetails] = useState({})
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [departmentList, setDepartmentList] = useState([])
  const [jobRoleList, setJobRoleList] = useState([])
  const [usersAttendanceList, setUserAttendanceList] = useState([])
  const [departmentAndJobRoles, setDepartmentAndJobRoles] = useState({
    departmentId: null,
    roleId: null,
  })
  const [clientType, setClientType] = useState([
    { stage: 'Jr. Sales Person', id: 0 },
    { stage: 'Sr. Sales Person', id: 1 },
    { stage: 'Ass. Sales Person', id: 2 },
  ])
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }))

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const teamLeaderDetails = id => {
    GetSingleStaffDetailList(
      id,
      res => {
        if (res?.success) {
          setSingleStaffDetails(res.data)
          setLoader(false)
        }
      },
      err => {
        setLoader(false)
      },
    )
  }
  useEffect(() => {
    singleStaffDetails && teamLeaderDetails(staffDetailList[0]?.id)
  }, [staffDetailList.length > 0])
  useEffect(() => {
    value === '1' && setLoader(true)
    GetAdminStaffDetailList(
      searchQuery,
      res => {
        if (res?.success) {
          setStaffDetailList(res?.data)
          setLoader(false)
        }
      },
      err => {
        console.log(err)
        setLoader(false)
      },
    )
  }, [value, departmentAndJobRoles, searchQuery])

  // useEffect(() => {
  //   GetAdminDepartmentList(
  //     {},
  //     res => {
  //       setDepartmentList(res?.data)
  //     },
  //     err => {
  //       console.log('Printing Error', err)
  //     },
  //   )
  // }, [])

  useEffect(() => {
    GetAdminRole(
      departmentAndJobRoles?.departmentId,
      res => {
        setJobRoleList(res.data)
      },
      err => {
        console.log('Printing Error', err)
      },
    )
  }, [departmentAndJobRoles?.departmentId])

  useEffect(() => {
    value === '2' &&
      GetUsersAttendanceList(
        { month: datePicker.$M, year: datePicker.$y },
        res => {
          setUserAttendanceList(res?.data)
        },
        err => {
          console.log('Printing Error', err)
        },
      )
  }, [value, datePicker])

  useEffect(() => {
    console.log(clientType)
    let value = clientType.filter(data => {
      if (data.id <= permissions?.clientStageAccess) {
        return data
      }
    })
    setClientType(value)
  }, [])

  return (
    <Box sx={{ backgroundColor: '#f1f2f6' }} className="team_profile_section">
      <Box className="left_panel">
        <Box sx={{ width: '100%' }}>
          <Box className="team_header">
            <Box>
              <Typography sx={{ color: '#8E8E8E' }} variant="span">
                Detail
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
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value)
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <IconButton>
                        <SearchRoundedIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <Button
                onClick={() => navigate('/addstaffmember')}
                className="main_tab_button"
                variant="span"
              >
                + Add Team
              </Button>

              {/* <Toolbar> */}
              <IconButton
                edge="end"
                onClick={handleDrawerOpen}
                sx={{ ...(open && { display: 'flex' }) }}
              >
                <img src={FilterIcon} alt="" />
              </IconButton>
              {/* </Toolbar> */}
            </Box>
            <Drawer
              sx={{
                width: 2,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                },
              }}
              // variant="persistent"
              anchor="right"
              open={open}
            >
              <DrawerHeader>
                <Box className="d-flex justify-content-between column w-100 align-items-center">
                  <Box className="d-flex column justify-content-between w-50 align-items-center">
                    <IconButton
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
                      Team Type
                    </FormLabel>
                    <RadioGroup row>
                      <FormControlLabel
                        className="checkbox_background_color"
                        value="office"
                        control={<Radio />}
                        label="Office"
                      />
                      <FormControlLabel
                        className="checkbox_background_color"
                        value="onfields"
                        control={<Radio />}
                        label="On Field"
                      />
                    </RadioGroup>
                  </FormControl>
                  <FormControl className="px-3 pt-3">
                    <FormLabel sx={{ color: '#000000' }} className="mb-2">
                      Result for
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        className="checkbox_background_color"
                        value="present"
                        control={<Radio />}
                        label="Present"
                      />
                      <FormControlLabel
                        className="checkbox_background_color"
                        value="absent"
                        control={<Radio />}
                        label="Absent"
                      />
                      <FormControlLabel
                        className="checkbox_background_color"
                        value="late"
                        control={<Radio />}
                        label="Late"
                      />
                      <FormControlLabel
                        className="checkbox_background_color"
                        value="onleave"
                        control={<Radio />}
                        label="On Leave"
                      />
                    </RadioGroup>
                  </FormControl>
                  <div className="col-md-12 pt-3 px-3">
                    <Typography variant="span">Job Role</Typography>
                  </div>
                  <Autocomplete
                    className="mt-1 mx-3 align-items-center d-flex client_type_select justify-content-center "
                    options={clientType}
                    value={
                      clientStage !== null ? clientType[clientStage] : null
                    }
                    sx={{ width: '21rem' }}
                    onChange={(e, value) => {
                      console.log(value)
                      setClientStage(value?.id)
                    }}
                    getOptionLabel={option => option.stage}
                    renderInput={params => (
                      <TextField
                        // className="m-3"
                        variant="outlined"
                        // sx={{ width: '24rem' }}
                        {...params}
                        placeholder="Job Role"
                      />
                    )}
                  />
                </div>
              </Box>
            </Drawer>
          </Box>
          <Box className="left_team_profile_section">
            <TableContainer>
              <Table className="team_member_table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f1f2f6' }}>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Attendance</TableCell>
                    <TableCell align="left">Points</TableCell>
                  </TableRow>
                </TableHead>

                <Divider
                  sx={{ borderColor: '#C4C4C4' }}
                  orientation="vertical"
                  variant="middle"
                  flexItem
                />
                <TableBody
                  style={{
                    borderCollapse: 'separate',
                    borderSpacing: '0 4px',
                  }}
                >
                  {staffDetailList.map((row, index) => (
                    <React.Fragment key={index}>
                      <TableRow
                        className="staff_tablecell"
                        key={row.id}
                        onClick={() => teamLeaderDetails(row?.id)}
                        sx={{
                          backgroundColor: '#FFFFFF',
                          borderBottom: '2px solid black',
                        }}
                      >
                        <TableCell
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            fontSize: '15px',
                            float: 'left',
                          }}
                        >
                          <Avatar
                            className="me-2"
                            sx={{ width: 40, height: 40 }}
                            src="/static/images/avatar/1.jpg"
                          />
                          <Typography>{row.name}</Typography>
                        </TableCell>
                        <TableCell align="left">
                          {row?.attendance ? row?.attendance[0] : '-'}
                        </TableCell>
                        <TableCell align="left">{row.points}</TableCell>
                      </TableRow>
                      <Divider
                        sx={{ height: '12px', borderColor: 'transparent' }}
                      />
                      {/* {index < staffDetailList.length - 1 && <Box my={2} />} */}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>

      <Box className="right_panel">
        <Box sx={{ width: '100%', padding: '0px 8px' }}>
          <Box className="user_profile_header_Section">
            <Box className="username_profile_Section">
              <AccountCircleRoundedIcon className="user_profile_icon" />
              <Box className="username_and_position">
                <Typography className="username_text" variant="span">
                  {singleStaffDetails?.memberDetail?.name}
                </Typography>
                <Typography variant="span" sx={{ marginTop: '5px' }}>
                  {singleStaffDetails?.memberDetail?.role?.name}
                </Typography>
              </Box>
            </Box>
            <Button
              className="common_button"
              onClick={() =>
                navigate(
                  `/staffprofile/${singleStaffDetails?.memberDetail?.id}`,
                )
              }
            >
              View
            </Button>
          </Box>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'start',
              padding: '0px 15px',
            }}
          >
            <Box className="profile_detail_row">
              <Typography className="profile_lable" variant="span">
                Contact
              </Typography>

              <Typography variant="span">
                {singleStaffDetails?.memberDetail?.contact_number}
              </Typography>
            </Box>

            <Box className="profile_detail_row">
              <Typography className="profile_lable" variant="span">
                Email
              </Typography>
              <Typography variant="span">
                {singleStaffDetails?.memberDetail?.email}
              </Typography>
            </Box>

            <Box className="profile_detail_row">
              <Typography className="profile_lable" variant="span">
                Location
              </Typography>
              <Typography variant="span">
                Office
                {/* {singleStaffDetails?.memberDetail?.location} */}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className="bottom_right_part">
          <Typography className="px-3">Inquiry Status</Typography>
          <Box className="staff_statistics_data">
            <Box className="inner_profile_details first_box p-2">
              <Typography>Total Inquiry</Typography>
              <Typography>
                {singleStaffDetails?.currentMonthClients?.total}
              </Typography>
            </Box>
            <Box className="inner_profile_details middle_box p-2">
              <Typography>Attend</Typography>
              <Typography>
                {singleStaffDetails?.currentMonthClients?.attend}
              </Typography>
            </Box>
            <Box className="inner_profile_details last_box  p-2">
              <Typography className="text_ellipsis">Avg. Response</Typography>
              <Typography>
                {singleStaffDetails?.currentMonthClients?.avgResponseTime}{' '}
              </Typography>
            </Box>
          </Box>
          <Typography className="px-3">Attendance</Typography>
          <Box className="staff_statistics_data">
            <Box className="inner_profile_details first_box m-1 p-2">
              <Typography className="text_ellipsis">Total Present</Typography>
              <Typography>
                {singleStaffDetails?.currentMonthAttendance?.totalPresent}
              </Typography>
            </Box>
            <Box className="inner_profile_details middle_box m-1 p-2">
              <Typography>Absent</Typography>
              <Typography>
                {singleStaffDetails?.currentMonthAttendance?.totalAbsent}
              </Typography>
            </Box>

            <Box className="inner_profile_details  last_box m-1 p-2">
              <Typography>Late</Typography>
              <Typography>
                {singleStaffDetails?.currentMonthAttendance?.totalLate}
              </Typography>
            </Box>
          </Box>
          <Typography className="px-3">Target</Typography>
          <Box className="staff_statistics_data">
            <Box className="inner_profile_details first_box m-1 p-2">
              <Typography className="text_ellipsis">Total Days</Typography>
              <Typography>
                {singleStaffDetails?.currentMonthTarget?.totalDays}
              </Typography>
            </Box>
            <Box className="inner_profile_details middle_box m-1 p-2">
              <Typography className="text_ellipsis">Total Order</Typography>
              <Typography>
                {singleStaffDetails?.currentMonthTarget?.targetOrder}
              </Typography>
            </Box>
            <Box className="inner_profile_details last_box m-1 p-2">
              <Typography>Achieved</Typography>
              <Typography>
                {singleStaffDetails?.currentMonthTarget?.achieved}
              </Typography>
            </Box>
          </Box>
          <Typography className="px-3">Expense</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              marginBottom: '14px',
              marginLeft: '6px',
            }}
          >
            <Box className="inner_profile_details first_box  m-1 p-2">
              <Typography>Approved</Typography>
              <Typography>
                {singleStaffDetails?.currentMonthExpense?.approvedExpense}
              </Typography>
            </Box>
            <Box className="inner_profile_details middle_box m-1 p-2">
              <Typography>Pending</Typography>
              <Typography>
                {singleStaffDetails?.currentMonthExpense?.pendingExpense}
              </Typography>
            </Box>
            <Box className="inner_profile_details last_box m-1 p-2">
              <Typography>Rejected</Typography>
              <Typography>
                {singleStaffDetails?.currentMonthExpense?.rejectedExpense}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Staff
