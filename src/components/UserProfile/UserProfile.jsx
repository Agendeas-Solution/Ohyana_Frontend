import React, { useEffect, useState, useContext } from 'react'
import ProfileImg from '../../assets/img/profile_logo.png'
import {Typography,Box,TextField,Tabs,Button,Tab,Table,TableCell,TableContainer,Paper,TableRow,TableHead,} from '@mui/material'
import StaffExpenses from '../Staff/StaffExpenses'
import TabList from '@mui/lab/TabList'
import TableBody from '@mui/material/TableBody'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { useNavigate } from 'react-router-dom'
import { GetAdminProfile } from '../../services/apiservices/adminprofile'
import moment from 'moment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import SuccessSnackbar from '../SuccessSnackbar/SuccessSnackbar'
import { Context as AuthContext } from '../../context/authContext/authContext'
import ErrorSnackbar from '../ErrorSnackbar/ErrorSnackbar'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import AttendanceData from './AttendanceData'
import PresentData from './PresentData'
import LeaveData from './LeaveData'
import HolidayData from './HolidayData'
import {
  GetHolidayList,
  AttendanceStatus,
} from '../../services/apiservices/staffDetail'
import {
  GetAdminAttendanceList,
  GetAdminLeaveList,
} from '../../services/apiservices/adminprofile'
import ApplyLeaveDialog from './ApplyLeaveDialog'
import { GetAllHoliday } from '../../services/apiservices/holiday'

const UserProfile = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState('Profile')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  })
  const [attendanceTab, setAttendanceTab] = useState('1')
  const handleTabChange = (event, newValue) => {
    setAttendanceTab(newValue)
  }
  const [userDetail, setUserDetail] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const { flagLoader } = useContext(AuthContext).state
  const { setFlagLoader } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState('present')
  const [staffAttendanceList, setStaffAttendanceList] = useState([])
  const [leaveList, setLeaveList] = useState([])
  const [holidayList, setHolidayList] = useState([])
  const [leaveDialogControl, setLeaveDialogControl] = useState(false)
  useEffect(() => {
    GetAdminProfile(
      {},
      res => {
        if (res.success) {
          setUserDetail(res.data)
        }
      },
      err => {
        console.log(err)
      },
    )
  }, [])
  localStorage.setItem('userEmail', userDetail?.email)

  useEffect(() => {
    activeTab === 'present' &&
      GetAdminAttendanceList(
        userDetail?.id,
        res => {
          if (res.success) {
            setStaffAttendanceList(res?.data)
          }
        },
        err => {},
      )
    activeTab === 'leave' &&
      GetAdminLeaveList(
        userDetail?.id,
        res => {
          if (res.success) {
            setLeaveList(res?.data)
          }
        },
        err => {},
      )
    activeTab === 'holiday' &&
      GetAllHoliday(
        userDetail?.id,
        res => {
          console.log({ res })
          if (res.success) {
            setHolidayList(res?.data)
          }
        },
        err => {},
      )
  }, [value, activeTab])

  const handleCheckIn = type => {
    AttendanceStatus(
      type,
      res => {},
      err => {},
    )
  }
  const handleCloseDialog = () => {
    setLeaveDialogControl(false)
  }
  return (
    <>
      <div className="w-100 mt-3">
        <Box className="profile_section">
          <Box className="profile_img">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box className="userName_and_position">
                <AccountCircleRoundedIcon className="user_profile_icon" />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginLeft: 1,
                  }}
                >
                  <Typography
                    variant="span"
                    sx={{ fontWeight: 'bold', fontSize: '18px' }}
                  >
                    {userDetail?.name || '-'}
                  </Typography>
                  <Typography sx={{ marginTop: '10px' }} variant="span">
                    {userDetail?.role?.name || '-'}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box>
              {/* FOR ATTENDANCE TAB */}
              {value === 'Attendance' && (
                <>
                  <Button
                    onClick={() => handleCheckIn('checkIn')}
                    className="attendance_button check_InOut_Break_InOut_Btn m-1"
                    variant="contained"
                  >
                    + Apply Leave
                  </Button>
                  {/* <Button
                    onClick={() => handleCheckIn('checkIn')}
                    className="attendance_button check_InOut_Break_InOut_Btn m-1"
                    variant="contained"
                  >
                    Check in
                  </Button>
                  <Button
                    onClick={() => handleCheckIn('breakIn')}
                    className="attendance_button check_InOut_Break_InOut_Btn m-1"
                    vsariant="contained"
                  >
                    Break in
                  </Button>
                  <Button
                    onClick={() => handleCheckIn('breakOut')}
                    className="attendance_button check_InOut_Break_InOut_Btn m-1"
                    variant="contained"
                  >
                    Break out
                  </Button>
                  <Button
                    onClick={() => handleCheckIn('checkOut')}
                    className="attendance_button check_InOut_Break_InOut_Btn m-1"
                    variant="contained"
                  >
                    Check out
                  </Button> */}
                </>
              )}

              {/* FOR STAFF EXPENSES TAB */}
              {/* {value === 'Expenses' && <StaffExpenses />} */}
              <Button className="attendance_button check_InOut_Break_InOut_Btn">
                <EditRoundedIcon
                  onClick={() => {
                    console.log('Printing Edit icon')
                    navigate('/editprofile')
                  }}
                />
              </Button>
            </Box>
          </Box>

          {/* <Box
            sx={{
              // display: 'flex',
              // flexDirection: 'column',
              marginTop: '5px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              // padding: '16px',
            }}
          >
            <Box className="profile_data prof_data">
              <Typography className="profile_heading_name" variant="span">
                Contact No.
              </Typography>
              <Typography className="pt-2" variant="span">
                +91 98545985443
              </Typography>
            </Box>

            <Box className="profile_data prof_data">
              <Typography className="profile_heading_name" variant="span">
                Email
              </Typography>
              <Typography className="pt-2" variant="span">
                roberdowneyjr@gmail.com
              </Typography>
            </Box>

            <Box className="profile_data prof_data">
              <Typography className="profile_heading_name" variant="span">
                Birthdate
              </Typography>
              <Typography className="pt-2" variant="span">
                02 Feb 1990
              </Typography>
            </Box>

            <Box className="profile_data prof_data">
              <Typography className="profile_heading_name" variant="span">
                Gender
              </Typography>
              <Typography className="pt-2" variant="span">
                Male
              </Typography>
            </Box>

            <Box className="profile_data prof_data">
              <Typography className="profile_heading_name" variant="span">
                Password
              </Typography>
              <Typography className="pt-2" variant="span">
                rdowneyjr@123
              </Typography>
            </Box>
          </Box> */}

          {/* </Box> */}

          <TabContext value={value}>
            <Box
              className="notification_tabs_root"
              sx={{ borderBottom: '1px solid #F1F2F6' }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
              >
                <Tab value="Attendance" label="Attendance" />
                <Tab value="Expenses" label="Expenses" />
                <Tab value="Profile" label="Profile" />
              </Tabs>
            </Box>
            <TabPanel value="Attendance">
              {/* <Box className="attendance_data_row col-md-12 mb-1">
                <Box className="inner_profile_details first_box m-1 p-2 total_days_data days_data">
                  <Typography variant="span">Total Days</Typography>
                  <Typography className="pt-1" variant="span">
                    {staffAttendanceList?.totalDays}
                  </Typography>
                </Box>
                <Box
                  sx={{ marginRight: '20px' }}
                  className="inner_profile_details first_box m-1 p-2 Absent_days_data days_data"
                >
                  <Typography variant="span">Absent Days</Typography>
                  <Typography className="pt-1" variant="span">
                    {staffAttendanceList?.absentDays}
                  </Typography>
                </Box>
                <Box className="inner_profile_details first_box m-1 p-2 Late_days_data days_data">
                  <Typography variant="span">Late Days</Typography>
                  <Typography className="pt-1" variant="span">
                    {staffAttendanceList?.lateDays}
                  </Typography>
                </Box>

                <Box className="col-md-3">
                  <Box sx={{ background: '#F1F2F6', borderRadius: '5px' }}>
                    <Button
                      className={
                        activeTab === 'present'
                          ? 'active_button'
                          : 'common_button'
                      }
                      onClick={() => {
                        setActiveTab('present')
                      }}
                      variant="contained"
                    >
                      Present
                    </Button>
                    <Button
                      className={
                        activeTab === 'leave'
                          ? 'active_button'
                          : 'common_button'
                      }
                      onClick={() => {
                        setActiveTab('leave')
                      }}
                      variant="contained"
                    >
                      Leave
                    </Button>
                    <Button
                      className={
                        activeTab === 'holiday'
                          ? 'active_button'
                          : 'common_button'
                      }
                      onClick={() => {
                        setActiveTab('holiday')
                      }}
                      variant="contained"
                    >
                      Holiday
                    </Button>
                  </Box>
                </Box>
              </Box> */}

              <Box className="attendance_data_row col-md-12 mb-1">
                <Box
                  sx={{
                    // background: '#F1F2F6',
                    borderRadius: '5px',
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <Box className="inner_profile_details first_box me-3 p-2">
                    <Typography>Total Days</Typography>
                    <Typography>24</Typography>
                  </Box>

                  <Box className="inner_profile_details middle_box  me-3 p-2">
                    <Typography>Absent Days</Typography>
                    <Typography>10</Typography>
                  </Box>

                  <Box className="inner_profile_details last_box p-2">
                    <Typography>Late Days</Typography>
                    <Typography>5d</Typography>
                  </Box>
                </Box>

                <Box>
                  <Box
                    sx={{
                      background: '#F1F2F6',
                      borderRadius: '5px',
                    }}
                  >
                    <Button
                      className={
                        activeTab === 'present'
                          ? 'active_button'
                          : 'common_button'
                      }
                      onClick={() => {
                        setActiveTab('present')
                      }}
                      variant="contained"
                    >
                      Present
                    </Button>
                    <Button
                      className={
                        activeTab === 'leave'
                          ? 'active_button'
                          : 'common_button'
                      }
                      onClick={() => {
                        setActiveTab('leave')
                      }}
                      variant="contained"
                    >
                      Leave
                    </Button>
                    <Button
                      className={
                        activeTab === 'holiday'
                          ? 'active_button'
                          : 'common_button'
                      }
                      onClick={() => {
                        setActiveTab('holiday')
                      }}
                      variant="contained"
                    >
                      Holiday
                    </Button>
                  </Box>
                </Box>
              </Box>
              {/* <Box className="tab_row">
                {activeTab === 'leave' && (
                  <Box>
                    <Button
                      onClick={() => setLeaveDialogControl(true)}
                      className="attendance_button m-2"
                      variant="contained"
                    >
                      Apply For Leave
                    </Button>
                  </Box>
                )}
              </Box> */}

              {activeTab === 'present' && (
                <PresentData staffAttendanceList={staffAttendanceList} />
              )}
              {activeTab === 'leave' && <LeaveData leaveList={leaveList} />}
              {activeTab === 'holiday' && (
                <HolidayData holidayList={holidayList} />
              )}
            </TabPanel>

            <TabPanel value="Expenses">
              <StaffExpenses />
            </TabPanel>
            <TabPanel value="Profile">
              {/* <Box className="profile_detail">
                <Box className="userdetail_root">
                  <Typography
                    className="userdetail_field_heading"
                    variant="span"
                  >
                    Contact No:
                  </Typography>
                  <Typography variant="span">
                    {userDetail?.contact_number}
                  </Typography>
                </Box>
                <Box className="userdetail_root">
                  <Typography
                    variant="span"
                    className="userdetail_field_heading"
                  >
                    Email:
                  </Typography>
                  <Typography variant="span">{userDetail?.email}</Typography>
                </Box>
                <Box className="userdetail_root">
                  <Typography
                    className="userdetail_field_heading"
                    variant="span"
                  >
                    Password:
                  </Typography>
                  <Box>
                    <TextField
                      className="password_field"
                      type={showPassword ? 'text' : 'password'}
                      value={userDetail?.password}
                      variant="standard"
                    />
                    {showPassword ? (
                      <Visibility
                        onClick={() => {
                          setShowPassword(!showPassword)
                        }}
                      />
                    ) : (
                      <VisibilityOff
                        onClick={() => {
                          setShowPassword(!showPassword)
                        }}
                      />
                    )}
                  </Box>
                </Box> 
                <Box className="userdetail_root">
                  <Typography
                    className="userdetail_field_heading"
                    variant="span"
                  >
                    Gender:
                  </Typography>
                  <Typography variant="span">{userDetail?.gender}</Typography>
                </Box>
                <Box className="userdetail_root">
                  <Typography
                    className="userdetail_field_heading"
                    variant="span"
                  >
                    Birthday:
                  </Typography>
                  <Typography variant="span">
                    {moment(userDetail?.birthDay).format('DD-MM-YYYY')}
                  </Typography>
                </Box>
              </Box> */}

              <Box className="companyDetail">
                <Box className="companyDetail_root px-3 pb-3">
                  <Typography
                    className="companyDetail_field_heading user_profile_color"
                    variant="span"
                  >
                    Email:
                  </Typography>
                  <Typography variant="span">chrisowens@email.com</Typography>
                </Box>
                <Box className="companyDetail_root p-3">
                  <Typography
                    variant="span"
                    className="companyDetail_field_heading user_profile_color"
                  >
                    City:
                  </Typography>
                  <Typography variant="span">Rajkot</Typography>
                </Box>
                <Box className="companyDetail_root p-3">
                  <Typography
                    variant="span"
                    className="companyDetail_field_heading user_profile_color"
                  >
                    State:
                  </Typography>
                  <Typography variant="span">Gujarat</Typography>
                </Box>
                <Box className="companyDetail_root  p-3">
                  <Typography
                    variant="span"
                    className="companyDetail_field_heading user_profile_color"
                  >
                    Country:
                  </Typography>
                  <Typography variant="span">India</Typography>
                </Box>
                <Box className="companyDetail_root  p-3">
                  <Typography
                    className="companyDetail_field_heading user_profile_color"
                    variant="span"
                  >
                    Business Type
                  </Typography>
                  <Typography variant="span">ABC</Typography>
                </Box>
                <Box className="companyDetail_root  p-3">
                  <Typography
                    className="companyDetail_field_heading user_profile_color"
                    variant="span"
                  >
                    IndiaMart CRM Key:
                  </Typography>
                  <Typography variant="span">XYZ</Typography>
                </Box>
              </Box>
            </TabPanel>
          </TabContext>
          <ApplyLeaveDialog
            leaveDialogControl={leaveDialogControl}
            handleCloseDialog={handleCloseDialog}
          />
        </Box>
      </div>
    </>
  )
}

export default UserProfile
