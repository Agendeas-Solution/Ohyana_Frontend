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
  Select,
  InputLabel,
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
import { TEAM } from '../../constants'
const drawerWidth = 350
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
  const [attendanceTypeList, setAttendanceTypeList] = useState(TEAM.ATTENDANCETYPE);
  const [jobTypeList, setJobTypeList] = useState(TEAM.JOBTYPE);
  const [searchQuery, setSearchQuery] = useState('');
  const d = new Date()
  const [datePicker, setDatePicker] = useState({
    $M: d.getMonth() + 1,
    $y: d.getFullYear(),
  })
  const [staffDetailList, setStaffDetailList] = useState([])
  const [singleStaffDetails, setSingleStaffDetails] = useState({})
  const [jobRoleList, setJobRoleList] = useState([])
  const [queryParams, setQueryParams] = useState({
    searchQuery: '',
    jobRole: '',
    teamType: '',
    attendanceType: ''
  });
  const [usersAttendanceList, setUserAttendanceList] = useState([])

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
  const handleApplyFilter = () => {

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

  const handleGetAdminStaffDetail = () => {
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
  }
  useEffect(() => {
    value === '1' && setLoader(true)
    handleGetAdminStaffDetail();
  }, [value, queryParams.searchQuery])

  useEffect(() => {
    GetAdminRole(
      {},
      res => {
        setJobRoleList(res.data)
      },
      err => {
        console.log('Printing Error', err)
      },
    )
  }, [])

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

  return (
    <Box className="team_profile_section">
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
                  value={queryParams.searchQuery}
                  onChange={e => {
                    setQueryParams({ queryParams, searchQuery: e.target.value })
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
                sx={{
                  ...(open && { display: 'flex' }),
                  padding: '0',
                  margin: '0 0 0 10px',
                }}
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
              anchor="right"
              open={open}
            >
              <DrawerHeader className="drawer_header_section">
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <IconButton
                    sx={{ color: '#2e3591', padding: '0px' }}
                    disableRipple={true}
                    onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? (
                      <ChevronLeftIcon sx={{ fontSize: '30px' }} />
                    ) : (
                      <ChevronRightIcon sx={{ fontSize: '30px' }} />
                    )}
                  </IconButton>
                  <Typography sx={{ fontSize: '22px', paddingRight: '0px' }}>
                    Filter By
                  </Typography>
                </Box>
                <Box>
                  <Button onClick={() => {

                  }}>Reset</Button>
                  <Button onClick={handleApplyFilter} className="common_button" variant="contained">
                    Apply
                  </Button>
                </Box>
              </DrawerHeader>
              <Divider />
              <Box
                sx={{ display: 'flex', flexDirection: 'column' }}>
                <FormControl sx={{ margin: '5px 15px' }}>
                  <FormLabel sx={{ margin: '0px 5px' }}
                  >Team Type
                  </FormLabel>
                  <RadioGroup
                    onChange={(e) => {
                      setQueryParams({ ...queryParams, teamType: e.target.value });
                    }}>
                    <Box className="checkbox_section">
                      {jobTypeList.map((data) => {
                        return <FormControlLabel
                          className="checkbox_background_color"
                          value={data.id}
                          control={<Radio />}
                          label={data.type}
                        />
                      })}
                    </Box>
                  </RadioGroup>
                </FormControl>
                <FormControl sx={{ margin: '5px 15px' }}>
                  <FormLabel sx={{ margin: '0px 5px' }}>
                    Result for
                  </FormLabel>
                  <RadioGroup
                    onChange={(e) => {
                      console.log(e.target.value);
                      debugger;
                      setQueryParams({ ...queryParams, attendanceType: e.target.value });

                    }}
                  >
                    <Box className="checkbox_section">
                      {attendanceTypeList.map((data) => {
                        return <FormControlLabel
                          className="checkbox_background_color"
                          value={data.type}
                          control={<Radio />}
                          label={data.typeName}
                        />
                      })}
                    </Box>
                  </RadioGroup>
                </FormControl>
                <FormControl sx={{ margin: '10px 20px' }}>
                  <InputLabel>Job Role</InputLabel>
                  <Select
                    label="Job Role"
                    value={queryParams.jobRole}
                    onChange={(e) => {
                      setQueryParams({ ...queryParams, jobRole: e.target.value });
                    }}
                  >
                    {jobRoleList.map(data => {
                      return <MenuItem value={data.id}>{data.name}</MenuItem>
                    })}
                  </Select>
                </FormControl>

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
      </Box >

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

          <Typography className="statistics_box_heading">Inquiry Status</Typography>

          <Box className="staff_statistics_data">
            <Box className="statistics_box first_box">
              <Typography>Total Inquiry</Typography>
              <Typography>
                {singleStaffDetails?.currentMonthClients?.total}
              </Typography>
            </Box>
            <Box className="statistics_box middle_box">
              <Typography>Attend</Typography>
              <Typography>
                {singleStaffDetails?.currentMonthClients?.attend}
              </Typography>
            </Box>
            <Box className="statistics_box last_box">
              <Typography className="text_ellipsis">Avg. Response</Typography>
              <Typography>
                {singleStaffDetails?.currentMonthClients?.avgResponseTime}{' '}
              </Typography>
            </Box>
          </Box>

          <Typography className="statistics_box_heading">Attendance</Typography>

          <Box className="staff_statistics_data">
            <Box className="statistics_box first_box">
              <Typography className="text_ellipsis">Total Present</Typography>
              <Typography>
                {singleStaffDetails?.currentMonthAttendance?.totalPresent}
              </Typography>
            </Box>
            <Box className="statistics_box middle_box">
              <Typography>Absent</Typography>
              <Typography>
                {singleStaffDetails?.currentMonthAttendance?.totalAbsent}
              </Typography>
            </Box>
            <Box className="statistics_box  last_box">
              <Typography>Late</Typography>
              <Typography>
                {singleStaffDetails?.currentMonthAttendance?.totalLate}
              </Typography>
            </Box>
          </Box>

          <Typography className="statistics_box_heading">Target</Typography>

          <Box className="staff_statistics_data">
            <Box className="statistics_box first_box">
              <Typography className="text_ellipsis">Total Days</Typography>
              <Typography>
                {singleStaffDetails?.currentMonthTarget?.totalDays}
              </Typography>
            </Box>
            <Box className="statistics_box middle_box">
              <Typography className="text_ellipsis">Total Order</Typography>
              <Typography>
                {singleStaffDetails?.currentMonthTarget?.targetOrder}
              </Typography>
            </Box>
            <Box className="statistics_box last_box">
              <Typography>Achieved</Typography>
              <Typography>
                {singleStaffDetails?.currentMonthTarget?.achieved}
              </Typography>
            </Box>
          </Box>

          <Typography className="statistics_box_heading">Expense</Typography>
          <Box className="staff_statistics_data">
            <Box className="statistics_box first_box">
              <Typography>Approved</Typography>
              <Typography>
                {singleStaffDetails?.currentMonthExpense?.approvedExpense}
              </Typography>
            </Box>
            <Box className="statistics_box middle_box">
              <Typography>Pending</Typography>
              <Typography>
                {singleStaffDetails?.currentMonthExpense?.pendingExpense}
              </Typography>
            </Box>
            <Box className="statistics_box last_box">
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
