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
  GetStaffAttendanceList,
  GetStaffLeaveList,
} from '../../services/apiservices/staffDetail'
import ApplyLeaveDialog from './ApplyLeaveDialog'
import { GetAllHoliday } from '../../services/apiservices/holiday'
import { Context as ContextSnackbar } from '../../context/pageContext'

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
  const { successSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar } = useContext(ContextSnackbar)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [attendanceTab, setAttendanceTab] = useState('1')
  const handleTabChange = (event, newValue) => {
    setAttendanceTab(newValue)
  }
  const [userDetail, setUserDetail] = useState({})
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
      value === 'Attendance' &&
      GetStaffAttendanceList(
        {},
        res => {
          if (res.success) {
            setStaffAttendanceList(res?.data)
          }
        },
        err => {},
      )
    activeTab === 'leave' &&
      value === 'Attendance' &&
      GetStaffLeaveList(
        {},
        res => {
          if (res.success) {
            setLeaveList(res?.data)
          }
        },
        err => {},
      )
    activeTab === 'holiday' &&
      value === 'Attendance' &&
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
  }, [activeTab, value])

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
      <Box className="profile_body_section">
        <Box className="user_profile_header_Section">
          <Box className="username_profile_Section">
            <AccountCircleRoundedIcon className="user_profile_icon" />
            <Box className="username_and_position">
              <Typography className="username_text" variant="span">
                {userDetail?.name || '-'}
              </Typography>
              <Typography variant="span" sx={{ marginTop: '5px' }}>
                {userDetail?.role?.name || '-'}
              </Typography>
            </Box>
          </Box>

          <Box>
            {value === 'Attendance' && (
              <>
                <Button
                  onClick={() => setLeaveDialogControl(true)}
                  className="profile_header_button"
                  variant="contained"
                >
                  + Apply Leave
                </Button>
              </>
            )}

            <Button className="profile_header_button">
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
            <Box className="statistics_data_section">
              <Box className="statistics_data">
                <Box className="statistics_box first_box">
                  <Typography>Total Days</Typography>
                  <Typography>{staffAttendanceList?.totalDays}</Typography>
                </Box>

                <Box className="statistics_box second_box">
                  <Typography>Absent Days</Typography>
                  <Typography>{staffAttendanceList?.absentDays}</Typography>
                </Box>

                <Box className="statistics_box third_box">
                  <Typography>Late Days</Typography>
                  <Typography>{staffAttendanceList?.lateDays}</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'start',
                }}
              >
                <Button
                  className={
                    activeTab === 'present'
                      ? 'active_button'
                      : 'custom_tab_background'
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
                    activeTab === 'leave'
                      ? 'active_button'
                      : 'custom_tab_background'
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
                      : 'custom_tab_background'
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
                <Typography className="profile_data_lable" variant="span">
                  Contact No.:
                </Typography>
                <Typography variant="span">
                  {userDetail?.contact_number || '-'}
                </Typography>
              </Box>
              {userDetail?.senior && (
                <Box className="staff_profile_page">
                  <Typography variant="span" className="profile_data_lable">
                    Senior Post:
                  </Typography>
                  <Typography variant="span">
                    {userDetail?.senior?.name}
                  </Typography>
                </Box>
              )}
              <Box className="staff_profile_page">
                <Typography variant="span" className=" profile_data_lable">
                  Email:
                </Typography>
                <Typography variant="span">{userDetail?.email}</Typography>
              </Box>
              {/* <Box className="staff_profile_page">
                <Typography variant="span" className=" profile_data_lable">
                  City:
                </Typography>
                <Typography variant="span">
                  {userDetail?.city || '-'}
                </Typography>
              </Box> */}
              <Box className="staff_profile_page">
                <Typography className=" profile_data_lable" variant="span">
                  Birthday
                </Typography>
                <Typography variant="span">{userDetail?.birthDay}</Typography>
              </Box>
              <Box className="staff_profile_page">
                <Typography className=" profile_data_lable" variant="span">
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
        {leaveDialogControl.status && (
          <ApplyLeaveDialog
            leaveDialogControl={leaveDialogControl}
            handleCloseDialog={handleCloseDialog}
          />
        )}
      </Box>
    </>
  )
}

export default UserProfile
