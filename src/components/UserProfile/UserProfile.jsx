import React, { useEffect, useState, useContext, lazy } from 'react'
import {
  Typography,
  Box,
  TextField,
  Tabs,
  Button,
  Tab,
  Table,
  TableCell,
  TableContainer,
  Paper,
  TableRow,
  TableHead,
} from '@mui/material'
import StaffExpenses from '../Staff/StaffExpenses'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { useNavigate } from 'react-router-dom'
import { GetAdminProfile } from '../../services/apiservices/adminprofile'
import { Context as AuthContext } from '../../context/authContext/authContext'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import './index.css'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
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

const ErrorSnackbar = React.lazy(() => import('../ErrorSnackbar/ErrorSnackbar'))
const SuccessSnackbar = React.lazy(() =>
  import('../SuccessSnackbar/SuccessSnackbar'),
)

const PresentData = React.lazy(() => import('./PresentData'))
const LeaveData = React.lazy(() => import('./LeaveData'))
const HolidayData = React.lazy(() => import('./HolidayData'))
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
                </>
              )}

              {/* FOR STAFF EXPENSES TAB */}
              {/* {value === 'Expenses' && <StaffExpenses />} */}
              <Button
                // sx={{ width: '10px', height: '5px' }}
                className="my_profile_edit_btn"
              >
                <EditRoundedIcon
                  onClick={() => {
                    console.log('Printing Edit icon')
                    navigate('/editprofile')
                  }}
                />
              </Button>
            </Box>
          </Box>

          <TabContext value={value}>
            <Box
              className="my_profile_tabs_root"
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

            <TabPanel sx={{ padding: '10px' }} value="Attendance">
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
                        activeTab === 'present' ? 'active_button' : 'custom_tab'
                      }
                      onClick={() => {
                        setActiveTab('present')
                      }}
                      variant="contained"
                    >
                      Present
                    </Button>
                    <Button
                      // sx={{ marginLeft: '0px', marginRight: '0' }}
                      className={
                        activeTab === 'leave' ? 'active_button' : 'custom_tab'
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
                        activeTab === 'holiday' ? 'active_button' : 'custom_tab'
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

            <TabPanel sx={{ padding: '10px' }} value="Expenses">
              <StaffExpenses />
            </TabPanel>
            <TabPanel value="Profile">
              <Box className="staff_profile">
                <Box className="staff_profile_page">
                  <Typography
                    className="user_profile_font_weight"
                    variant="span"
                  >
                    Contact No.:
                  </Typography>
                  <Typography variant="span">
                    {userDetail?.contact_number || '-'}
                  </Typography>
                </Box>
                {userDetail?.senior && (
                  <Box className="companyDetail_root p-3">
                    <Typography
                      variant="span"
                      className="companyDetail_field_heading user_profile_color"
                    >
                      Senior Post:
                    </Typography>
                    <Typography variant="span">
                      {userDetail?.senior?.name}
                    </Typography>
                  </Box>
                )}
                <Box className="companyDetail_root p-3">
                  <Typography
                    variant="span"
                    className=" user_profile_font_weight"
                  >
                    Email:
                  </Typography>
                  <Typography variant="span">{userDetail?.email}</Typography>
                </Box>
                <Box className="staff_profile_page">
                  <Typography
                    variant="span"
                    className=" user_profile_font_weight"
                  >
                    Password:
                  </Typography>
                  <Typography variant="span">{userDetail?.password}</Typography>
                </Box>
                <Box className="staff_profile_page">
                  <Typography
                    className=" user_profile_font_weight"
                    variant="span"
                  >
                    Birthday
                  </Typography>
                  <Typography variant="span">{userDetail?.birthDay}</Typography>
                </Box>
                <Box className="staff_profile_page">
                  <Typography
                    className=" user_profile_font_weight"
                    variant="span"
                  >
                    Gender
                  </Typography>
                  <Typography variant="span">{userDetail?.gender}</Typography>
                </Box>
                {userDetail?.city && (
                  <Box className="companyDetail_root p-3">
                    <Typography
                      variant="span"
                      className="companyDetail_field_heading user_profile_color"
                    >
                      City:
                    </Typography>
                    <Typography variant="span">{userDetail?.city}</Typography>
                  </Box>
                )}
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
