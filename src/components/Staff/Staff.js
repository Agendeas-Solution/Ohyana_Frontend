import { React, useEffect, useState, useContext } from 'react'
import {
  Box, TextField, Button, Autocomplete, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Tabs, FormControl, OutlinedInput, InputAdornment, IconButton, Toolbar, Typography, Avatar, Divider, Drawer, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import './index.css'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'

import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import FilterIcon from '../../assets/img/Filter.svg'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useNavigate } from 'react-router-dom'
import CallIcon from '../../assets/img/call.svg'
import MailIcon from '../../assets/img/mail.svg'
import { Context as AuthContext } from '../../context/authContext/authContext'
import { GetAdminStaffDetailList, GetUsersAttendanceList } from '../../services/apiservices/staffDetail'
import { GetAdminDepartmentList, GetAdminRole } from '../../services/apiservices/adminprofile'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import SuccessSnackbar from '../SuccessSnackbar/SuccessSnackbar'
import Loader from '../Loader/Loader'
import moment from 'moment'
import { styled, useTheme } from '@mui/material/styles'
const drawerWidth = 400

const Staff = () => {
  let navigate = useNavigate()
  const theme = useTheme()
  const { flagLoader, permissions } = useContext(AuthContext).state
  const { setFlagLoader } = useContext(AuthContext)
  const [value, setValue] = useState('1')
  const [open, setOpen] = useState(false)
  const [loader, setLoader] = useState(false)
  const [clientStage, setClientStage] = useState()
  const d = new Date()
  const [datePicker, setDatePicker] = useState({
    $M: d.getMonth() + 1,
    $y: d.getFullYear(),
  })
  const [staffDetailList, setStaffDetailList] = useState([])
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

  useEffect(() => {
    value === '1' && setLoader(true)
    GetAdminStaffDetailList(
      departmentAndJobRoles,
      res => {
        if (res.success) {
          setStaffDetailList(res?.data)
          setLoader(false)
        }
      },
      err => {
        console.log(err)
        setLoader(false)
      },
    )
  }, [value, departmentAndJobRoles])

  useEffect(() => {
    GetAdminDepartmentList(
      {},
      res => {
        setDepartmentList(res?.data)
      },
      err => {
        console.log('Printing Error', err)
      },
    )
  }, [])

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
    // <>
    //   {loader && <Loader />}
    //   <Box className="client_section ">
    //     <Box sx={{ width: '100%', typography: 'body1' }}>
    //       <TabContext value={value}>
    //         <Box className="align-items-center d-flex notification_tabs_root">
    //           <TabList
    //             className="client_profile_tab"
    //             onChange={handleChange}
    //             textColor="secondary"
    //             indicatorColor="secondary"
    //           >
    //             <Tab label="Detail" value="1" />
    //             {/* <Tab label="Attendance" value="2" /> */}
    //           </TabList>
    //           <div className="d-flex justify-content-end w-50">
    //             {value === '2' && (
    //               <LocalizationProvider dateAdapter={AdapterDayjs}>
    //                 <DatePicker
    //                   views={['year', 'month']}
    //                   disableFuture
    //                   value={datePicker}
    //                   onChange={newValue => {
    //                     setDatePicker(newValue)
    //                   }}
    //                   renderInput={params => (
    //                     <TextField
    //                       placeholder="Year and Month"
    //                       {...params}
    //                       helperText={null}
    //                     />
    //                   )}
    //                 />
    //               </LocalizationProvider>
    //             )}
    //             {value === '1' ? (
    //               <>
    //                 {/* <Autocomplete
    //                   className="align-items-center d-flex justify-content-center"
    //                   options={jobRoleList}
    //                   onChange={(e, value) => {
    //                     console.log(value)
    //                     setDepartmentAndJobRoles({
    //                       ...departmentAndJobRoles,
    //                       roleId: value?.id,
    //                     })
    //                   }}
    //                   getOptionLabel={option => option.name}
    //                   sx={{ width: 300 }}
    //                   renderInput={params => (
    //                     <TextField {...params} placeholder="Team Type" />
    //                   )}
    //                 />
    //                 <Autocomplete
    //                   className="align-items-center d-flex justify-content-center mx-2"
    //                   options={departmentList}
    //                   onChange={(e, value) => {
    //                     console.log(value)
    //                     setDepartmentAndJobRoles({
    //                       ...departmentAndJobRoles,
    //                       departmentId: value?.id,
    //                     })
    //                   }}
    //                   sx={{ width: 300 }}
    //                   getOptionLabel={option => option.name}
    //                   renderInput={params => (
    //                     <TextField {...params} placeholder="Result for" />
    //                   )}
    //                 /> */}
    //                 <FormControl variant="outlined">
    //                   <OutlinedInput
    //                     className="search_field"
    //                     placeholder="Search Here..."
    //                     startAdornment={
    //                       <InputAdornment position="start">
    //                         <IconButton>
    //                           <SearchRoundedIcon />
    //                         </IconButton>
    //                       </InputAdornment>
    //                     }
    //                   />
    //                 </FormControl>
    //               </>
    //             ) : null}
    //             <Box>
    //               {value === '1' ? (
    //                 <>
    //                   {permissions?.editStaff && (
    //                     <Button
    //                       onClick={() => {
    //                         navigate('/addstaffmember')
    //                       }}
    //                       className="main_button"
    //                     >
    //                       <AddRoundedIcon />
    //                       Add Team
    //                     </Button>
    //                   )}
    //                 </>
    //               ) : null}
    //             </Box>
    //             <Toolbar>
    //               <IconButton
    //                 edge="end"
    //                 // onClick={handleDrawerOpen}
    //                 // sx={{ ...(open && { display: 'none' }) }}
    //               >
    //                 <img src={FilterIcon} alt="" />
    //               </IconButton>
    //             </Toolbar>
    //           </div>
    //         </Box>
    //         <TabPanel value="1">
    //           <TableContainer sx={{ height: '70vh' }} component={Paper}>
    //             {staffDetailList.length > 0 ? (
    //               <Table stickyHeader sx={{ minWidth: 650 }}>
    //                 <TableHead>
    //                   <TableRow>
    //                     {/* <TableCell>Sr No.</TableCell> */}
    //                     <TableCell align="right">Name</TableCell>
    //                     <TableCell align="right">Attendance</TableCell>
    //                     <TableCell align="right">Points</TableCell>

    //                     {/* <TableCell></TableCell> */}
    //                   </TableRow>
    //                 </TableHead>
    //                 <TableBody>
    //                   {staffDetailList.map((row, index) => (
    //                     <TableRow
    //                       key={row.id}
    //                       sx={{
    //                         '&:last-child td, &:last-child th': { border: 0 },
    //                       }}
    //                     >
    //                       {/* <TableCell scope="row">{row.id}</TableCell> */}
    //                       <TableCell align="right">{row.name}</TableCell>
    //                       <TableCell align="right">{row.role.name}</TableCell>
    //                       <TableCell align="right">{row.id}</TableCell>
    //                     </TableRow>
    //                   ))}
    //                 </TableBody>
    //               </Table>
    //             ) : (
    //               <p
    //                 style={{
    //                   display: 'flex',
    //                   alignItems: 'center',
    //                   justifyContent: 'center',
    //                   textAlign: 'center',
    //                   width: '100%',
    //                   height: '100%',
    //                 }}
    //               >
    //                 No Data Found
    //               </p>
    //             )}
    //           </TableContainer>
    //         </TabPanel>
    //         <TabPanel value="2">
    //           <TableContainer sx={{ height: '70vh' }} component={Paper}>
    //             {usersAttendanceList.length > 0 ? (
    //               <Table stickyHeader sx={{ minWidth: 650 }}>
    //                 <TableHead>
    //                   <TableRow>
    //                     <TableCell align="right">Name</TableCell>
    //                     {usersAttendanceList[0].attendances.map(days => {
    //                       return (
    //                         <TableCell align="right">
    //                           {moment(days?.date).format('D')}
    //                         </TableCell>
    //                       )
    //                     })}
    //                   </TableRow>
    //                 </TableHead>
    //                 <TableBody>
    //                   {usersAttendanceList.map(nameData => {
    //                     return (
    //                       <TableRow
    //                         sx={{
    //                           '&:last-child td, &:last-child th': { border: 0 },
    //                         }}
    //                       >
    //                         <TableCell align="right">
    //                           {nameData?.name}
    //                         </TableCell>
    //                         {nameData?.attendances.map(status => {
    //                           return (
    //                             <TableCell
    //                               className={
    //                                 status?.attendanceType === 'LT'
    //                                   ? 'late_status_color'
    //                                   : status?.attendanceType === 'A'
    //                                   ? 'absent_status_color'
    //                                   : status?.attendanceType === 'L'
    //                                   ? 'leave_status_color'
    //                                   : 'present_status_color'
    //                               }
    //                               align="right"
    //                             >
    //                               {' '}
    //                               {status?.attendanceType}
    //                             </TableCell>
    //                           )
    //                         })}
    //                       </TableRow>
    //                     )
    //                   })}
    //                 </TableBody>
    //               </Table>
    //             ) : (
    //               <p
    //                 style={{
    //                   display: 'flex',
    //                   alignItems: 'center',
    //                   justifyContent: 'center',
    //                   textAlign: 'center',
    //                   width: '100%',
    //                   height: '100%',
    //                 }}
    //               >
    //                 No Data Found
    //               </p>
    //             )}
    //           </TableContainer>
    //         </TabPanel>
    //       </TabContext>
    //     </Box>
    //     <Box></Box>
    //     {/* <Pagination className="mt-1" /> */}
    //   </Box>
    // </>

    //start
    <Box sx={{ backgroundColor: '#f1f2f6' }} className="team_profile_section">
      <Box
        sx={{ marginBottom: '10px' }}
        // className="occassional_holiday_section"
        className="left_panel"
      >
        <Box className="holiday_inner_class">
          <Box sx={{ justifyContent: 'space-between' }} className="team_header">
            <Typography
              sx={{ marginRight: '58px', color: '#8E8E8E' }}
              variant="span"
              pl={1}
            >
              Detail
            </Typography>
            <FormControl variant="outlined">
              <OutlinedInput
                sx={{ marginLeft: '6px' }}
                className="search_field"
                placeholder="Search Here..."
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
              // onClick={() => {
              //   setAddHolidayDetail({ ...addHolidayDetail, regular: true });
              //   setAddHolidayDialog({ ...addHolidayDialog, status: true });
              // }}
              // color="secondary"
              sx={{
                float: 'right',
                // font: '#2E3591',
                // marginRight: '2px',
                // backgroundColor: '#FFFFFF',
              }}
              className="add_team_buttn search_field"
              variant="span"
            >
              + Add Team
            </Button>
            {/* <Toolbar> */}
            <IconButton
              // sx={{ marginLeft: '9px' }}
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ ...(open && { display: 'none' }) }}
            >
              <img src={FilterIcon} alt="" />
            </IconButton>
            {/* </Toolbar> */}

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
              <DrawerHeader>
                <Box className="d-flex justify-content-between column w-100 align-items-center">
                  <Box className="d-flex column justify-content-between w-50 align-items-center">
                    <IconButton
                      // sx={{ paddingRight: '10px' }}
                      // sx={{ paddingRight: '12rem' }}
                      // className="pe-5"
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
                    {/* <Typography sx={{ textAlign: 'end' }}>Clear All</Typography> */}
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
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        // sx={{ backgroundColor: '#F1F2F6' }}
                        className="checkbox_background_color"
                        value="office"
                        control={
                          <Radio
                          // sx={{ color: '#2E3591', backgroundColor: '2E3591' }}
                          />
                        }
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
                    <FormLabel
                      sx={{ color: '#000000' }}
                      className="mb-2"
                      id="demo-row-radio-buttons-group-label"
                    >
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
            {/* <TableContainer className="mt-2"> */}
            <TableContainer>
              <Table
                style={{
                  borderCollapse: 'separate',
                  borderSpacing: '0 4px',
                  // borderRadius: '5px',
                }}
                className="team_member_table"
              >
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
                <TableBody>
                  {staffDetailList.map((row, index) => (
                    <TableRow
                      // borderCollapse="separate"
                      // borderSpacing="0px 4px"
                      key={row.id}
                      // style={{ borderRadius: 5 }}
                      sx={{
                        // borderCollapse: 'separate',
                        // borderSpacing: '8px 8px',
                        backgroundColor: '#FFFFFF',
                        // borderCollapse: 'separate',
                        // marginBottom: '10px',
                        // border: '2px solid black',
                        // '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell
                        sx={{
                          // marginTop: '10px',
                          // padding: '3',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          fontSize: '15px',
                          float: 'left',
                        }}
                        // className="m-4"
                        align="left"
                      >
                        {/* <AddRoundedIcon /> */}
                        <Avatar
                          className="me-2"
                          sx={{ width: 40, height: 40 }}
                          src="/static/images/avatar/1.jpg"
                        />
                        <Typography>{row.name}</Typography>
                      </TableCell>
                      {/* <TableCell>{row.name}</TableCell> */}
                      <TableCell align="left">{row.role.name}</TableCell>
                      <TableCell align="left">{row.id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>

      {/* starting of SECOND section */}
      <Box className="right_panel">
        <Box
          //  sx={{ backgroundColor: '#FFFFFF' }}
          sx={{
            // border: '1px solid black',
            borderRadius: '5px',
            height: '800px',
            backgroundColor: '#FFFFFF',
          }}
        >
          <Box className="userName_and_position profile_details_right_panel">
            {/* <img src={ProfileImg} alt="profile" /> */}
            <AccountCircleRoundedIcon
              // src={BenedictPhoto}
              className="userprofile_dummy_icon"
              sx={{
                paddingTop: 2,
              }}
            />
            {/* <img
        src={BenedictPhoto}
        className="userprofile_dummy_icon"
        sx={{
          padding: 5,
        }}
      /> */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                // marginLeft: 2,
              }}
            >
              <Typography
                // variant="span"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '26px',
                  paddingRight: '190px',
                }}
              >
                Benedict
                <img className="ml-1 p-1" alt="" />
              </Typography>
              <Typography sx={{ marginTop: '10px' }}>
                {/* {clientProfileDetail?.business} */}
                Sr. Sales Person
              </Typography>
            </Box>
          </Box>

          <Box className="profile_details_right_panel mt-3 mb-4 mx-2">
            <Box
              className="m-3 me-5"
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Typography variant="span" sx={{ fontWeight: 'bold' }}>
                Contact
              </Typography>
              <Typography className="mx-5" variant="span">
                +91 8549054308
              </Typography>
              <Button
                sx={{
                  backgroundColor: '#F1F2F6',
                  float: 'right',
                }}
                // onClick={() => navigate(`/staffprofile/${}`)}
              >
                View Profile
              </Button>
            </Box>
            <Box className="m-3 me-5">
              <Typography variant="span" sx={{ fontWeight: 'bold' }}>
                Email
              </Typography>
              <Typography
                sx={{ paddingLeft: '25px' }}
                className="mx-5"
                variant="span"
              >
                benedictdfkl@gmail.com
              </Typography>
            </Box>
            <Box className="m-3  me-5">
              <Typography variant="span" sx={{ fontWeight: 'bold' }}>
                Location
              </Typography>
              <Typography className="mx-5" variant="span">
                Office
              </Typography>
            </Box>
          </Box>

          <Box
            // sx={{ display: 'flex', flexDirection: 'row' }}
            className="mt-3 profile_details_right_panel"
          >
            <Typography className="px-3">Inquiry Status</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '14px',
                marginLeft: '16px',
              }}
            >
              <Box className="inner_profile_details first_box m-1 p-2">
                <Typography>Total Inquiry</Typography>
                <Typography>24</Typography>
              </Box>

              <Box className="inner_profile_details middle_box m-1 p-2">
                <Typography>Attend</Typography>
                <Typography>10</Typography>
              </Box>

              <Box className="inner_profile_details last_box m-1 p-2">
                <Typography>Avg. Response</Typography>
                <Typography>5 Min</Typography>
              </Box>
            </Box>

            <Typography className="px-3">Attendance</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '14px',
                marginLeft: '16px',
              }}
            >
              <Box className="inner_profile_details first_box m-1 p-2">
                <Typography>Total Days</Typography>
                <Typography>24</Typography>
              </Box>

              <Box className="inner_profile_details middle_box m-1 p-2">
                <Typography>Absent</Typography>
                <Typography>10</Typography>
              </Box>

              <Box className="inner_profile_details  last_box m-1 p-2">
                <Typography>Late</Typography>
                <Typography>5d</Typography>
              </Box>
            </Box>

            <Typography className="px-3">Target</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '14px',
                marginLeft: '16px',
                marginRight: '16px',
              }}
            >
              <Box className="inner_profile_details first_box m-1 p-2">
                <Typography>Total Days</Typography>
                <Typography>24</Typography>
              </Box>

              <Box className="inner_profile_details middle_box m-1 p-2">
                <Typography>Total Order</Typography>
                <Typography>10</Typography>
              </Box>

              <Box className="inner_profile_details last_box m-1 p-2">
                <Typography>Achieved</Typography>
                <Typography>5d</Typography>
              </Box>
            </Box>

            <Typography className="px-3">Expense</Typography>
            <Box
              sx={{ display: 'flex', flexDirection: 'row', marginLeft: '16px' }}
            >
              <Box className="inner_profile_details first_box  m-1 p-2">
                <Typography>Approved</Typography>
                <Typography>24</Typography>
              </Box>

              <Box className="inner_profile_details middle_box m-1 p-2">
                <Typography>Pending</Typography>
                <Typography>10</Typography>
              </Box>

              <Box className="inner_profile_details last_box m-1 p-2">
                <Typography>Rejected</Typography>
                <Typography>5d</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Staff
