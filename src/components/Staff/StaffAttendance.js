import React, { useEffect, useState } from 'react'
import './index.css'
import { Box, Typography, Button, TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
  GetStaffAttendanceList,
  GetStaffLeaveList,
  GrantLeave,
} from '../../services/apiservices/staffDetail'
import moment from 'moment'
import ApproveLeaveDialog from './ApproveLeaveDialog'
import StaffAttendancePresent from './StaffAttendancePresent'
import StaffAttendanceLeave from './StaffAttendanceLeave'

const StaffAttendance = () => {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  })
  const [value, setValue] = useState('1')
  const [activeTab, setActiveTab] = useState('present')
  const [staffAttendanceList, setStaffAttendanceList] = useState([])
  const [staffLeaveList, setStaffLeaveList] = useState([])
  const [approveLeave, setApproveLeave] = useState({
    status: false,
    id: null,
    leaveStatus: true,
  })
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleGrantLeave = () => {
    GrantLeave(
      { id: approveLeave.id, leaveStatus: approveLeave?.leaveStatus },
      res => {
        handleCloseDialog()
      },
      err => {
        console.log(err)
      },
    )
  }
  const handleCloseDialog = () => {
    setApproveLeave({ ...approveLeave, status: false })
  }

  useEffect(() => {
    let path = window.location.pathname
    console.log('Printing Path of ', path)
    console.log('Printing ', path.split('/').pop())
    path = path.split('/').pop()
    value === '1' &&
      GetStaffAttendanceList(
        path,
        res => {
          setStaffAttendanceList(res?.data)
        },
        err => {},
      )
    value === '2' &&
      GetStaffLeaveList(
        path,
        res => {
          setStaffLeaveList(res?.data)
        },
        err => {},
      )
  }, [value])

  return (
    <>
      <Box className="target_section">
        <Box className="attendance_data_row col-md-12">
          <Box className="col-md-7 inner_attendance_data_row">
            <Box className="week_data inner_profile_details days_data col-md-2 me-3 p-2">
              <Typography variant="span">Total Days</Typography>
              <Typography variant="span">24</Typography>
            </Box>
            <Box className="Absent_days_data inner_profile_details days_data col-md-2 me-3 p-2">
              <Typography variant="span">Absent Days</Typography>
              <Typography variant="span">24</Typography>
            </Box>
            <Box className="Late_days_data inner_profile_details days_data col-md-2">
              <Typography variant="span">Late Days</Typography>
              <Typography variant="span">24</Typography>
            </Box>
          </Box>

          <Box className="attendance_date_filter ">
            {/* <Typography variant="span">Select Date Range</Typography> */}
            {/* <Box> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disablePast
                inputFormat="dd/MM/yyyy"
                value={dateRange.startDate}
                onChange={e => {
                  setDateRange({ ...dateRange, startDate: e })
                }}
                renderInput={params => <TextField className="" {...params} />}
              />
            </LocalizationProvider>
          </Box>

          {/* <Box className="tab_row"> */}
          {/* <TabList className="client_profile_tab mb-3" onChange={handleChange}>
            <Tab label="Present" value="1" />
            <Tab label="Leave" value="2" />
          </TabList> */}

          <Box
            sx={{
              background: '#F1F2F6',
              borderRadius: '5px',
              height: '35px',
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
              className={activeTab === 'leave' ? 'active_button' : 'custom_tab'}
              onClick={() => {
                setActiveTab('leave')
              }}
              variant="contained"
            >
              Leave
            </Button>
          </Box>
        </Box>

        {/* <TabContext value={value}> */}
        {/* <Box className="tab_row">
            <TabList
              className="client_profile_tab mb-2"
              onChange={handleChange}
            >
              <Tab label="Present" value="1" />
              <Tab label="Leave" value="2" />
            </TabList>
          </Box> */}

        {/* <TabPanel value="1"> */}
        {/* <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="left">Check In</TableCell>
                <TableCell align="left">Check Out</TableCell>
                <TableCell align="left">Break In </TableCell>
                <TableCell align="left">Break Out</TableCell>
                <TableCell align="left">Working Hours</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffAttendanceList.attendancePerUser &&
                staffAttendanceList.attendancePerUser.map(staffList => {
                  return (
                    <TableRow>
                      <TableCell>{staffList.date}</TableCell>
                      <TableCell align="left">{staffList?.checkIn}</TableCell>
                      <TableCell align="left">{staffList?.checkOut}</TableCell>
                      <TableCell align="left">{staffList?.breakIn}</TableCell>
                      <TableCell align="left">{staffList?.breakOut}</TableCell>
                      <TableCell align="left">
                        {staffList?.totalHours}
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer> */}
        {/* </TabPanel> */}

        {/* <TabPanel value="2"> */}
        {/* <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Leave Type</TableCell>
                <TableCell align="left">Taken</TableCell>
                <TableCell align="left">Remain</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffLeaveList &&
                staffLeaveList.map(leaveList => {
                  return (
                    <TableRow>
                      <TableCell align="left">
                        {moment(leaveList?.date).format('DD/MM/YY')}
                      </TableCell>
                      <TableCell align="left">
                        {leaveList?.leave?.type}
                      </TableCell>
                      <TableCell align="left">{leaveList?.takenDays}</TableCell>
                      <TableCell align="left">
                        {leaveList?.remainDays}
                      </TableCell>
                      <TableCell align="left">{leaveList?.status}</TableCell>
                      <TableCell align="left">
                        <Button
                          className="common_button"
                          onClick={() => {
                            setApproveLeave({
                              ...approveLeave,
                              status: true,
                              id: leaveList?.id,
                            })
                          }}
                        >
                          Approve
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer> */}
        {/* </TabPanel> */}
        {/* </TabContext> */}
        {activeTab === 'present' && <StaffAttendancePresent />}
        {activeTab === 'leave' && <StaffAttendanceLeave />}
      </Box>
      <ApproveLeaveDialog
        approveLeave={approveLeave}
        handleGrantLeave={handleGrantLeave}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  )
}

export default StaffAttendance
