import React, { useEffect, useState, useContext } from 'react'
import './index.css'
import { Box, Typography, Button, TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import {
  GetStaffAttendanceList,
  GetStaffLeaveList,
  GrantLeave,
} from '../../services/apiservices/staffDetail'
import moment from 'moment'
import ApproveLeaveDialog from './ApproveLeaveDialog'
import StaffAttendancePresent from './StaffAttendancePresent'
import StaffAttendanceLeave from './StaffAttendanceLeave'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Context as ContextSnackbar } from '../../context/pageContext'
const StaffAttendance = () => {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  })
  const [selectMonth, setSelectMonth] = useState(moment().format('LL'))
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
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
        setSuccessSnackbar({
          ...successSnackbar,
          message: res.message,
          status: true,
        })
      },
      err => {
        console.log(err)
        setErrorSnackbar({
          ...errorSnackbar,
          message: err.message,
          status: true,
        })
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
    activeTab === 'present' &&
      GetStaffAttendanceList(
        {
          month: selectMonth?.$M + 1,
          year: selectMonth?.$y,
          teamId: parseInt(path),
        },
        res => {
          setStaffAttendanceList(res?.data)
        },
        err => {},
      )
    activeTab === 'leave' &&
      GetStaffLeaveList(
        {
          month: selectMonth?.$M + 1,
          year: selectMonth?.$y,
          teamId: parseInt(path),
        },
        res => {
          setStaffLeaveList(res?.data)
        },
        err => {},
      )
  }, [activeTab, selectMonth])
  return (
    <>
      <Box className="target_section">
        <Box className="statistics_data_section">
          <Box className="statistics_data">
            <Box className="statistics_box first_box">
              <Typography variant="span">Total Days</Typography>
              <Typography variant="span">
                {staffAttendanceList?.totalDays || '-'}
              </Typography>
            </Box>
            <Box className="statistics_box second_box">
              <Typography variant="span">Absent Days</Typography>
              <Typography variant="span">
                {staffAttendanceList?.absentDays || '-'}
              </Typography>
            </Box>
            <Box className="statistics_box third_box">
              <Typography variant="span">Late Days</Typography>
              <Typography variant="span">
                {staffAttendanceList?.lateDays || '-'}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'start',
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={['month', 'year']}
                value={selectMonth}
                onChange={selectMonth => {
                  console.log(`inside Onchange: ${selectMonth.format('MMM')}`)
                  setSelectMonth(selectMonth)
                }}
                renderInput={params => (
                  <TextField
                    sx={{ width: '175px', marginRight: '10px' }}
                    placeholder="Year and Month"
                    {...params}
                    helperText={null}
                  />
                )}
                PopperProps={{
                  placement: 'bottom-start', // Set placement to 'bottom-start'
                }}
              />
            </LocalizationProvider>
            <Box
              sx={{
                background: '#F1F2F6',
                borderRadius: '5px',
                height: '35px',
                display: 'flex',
                flexDirection: 'row',
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
            </Box>
          </Box>
        </Box>
        {activeTab === 'present' && (
          <StaffAttendancePresent staffAttendanceList={staffAttendanceList} />
        )}
        {activeTab === 'leave' && (
          <StaffAttendanceLeave
            approveLeave={approveLeave}
            setApproveLeave={setApproveLeave}
            staffLeaveList={staffLeaveList}
          />
        )}
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
