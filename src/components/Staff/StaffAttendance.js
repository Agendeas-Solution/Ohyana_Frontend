import React, { useEffect, useState, useContext } from 'react'
import './index.css'
import { Box, Typography } from '@mui/material'
import {
  GetStaffAttendanceList,
  GetStaffLeaveList,
  GrantLeave,
} from '../../services/apiservices/staffDetail'
import moment from 'moment'
import ApproveLeaveDialog from './ApproveLeaveDialog'
import StaffAttendancePresent from './StaffAttendancePresent'
import StaffAttendanceLeave from './StaffAttendanceLeave'
import { Context as ContextSnackbar } from '../../context/pageContext'

const StaffAttendance = ({ selectMonth, activeTab }) => {
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const [value, setValue] = useState('1')
  const [staffAttendanceList, setStaffAttendanceList] = useState([])
  const [staffLeaveList, setStaffLeaveList] = useState([])
  const [approveLeave, setApproveLeave] = useState({
    status: false,
    id: null,
    leaveStatus: true,
  })
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
    path = path.split('/').pop()
    let data = {
      month: moment(selectMonth.$d).month() + 1,
      year: moment(selectMonth.$d).format('YYYY'),
      teamId: parseInt(path),
    }
    activeTab === 'present' &&
      GetStaffAttendanceList(
        data,
        res => {
          setStaffAttendanceList(res?.data)
        },
        err => {},
      )
    activeTab === 'leave' &&
      GetStaffLeaveList(
        data,
        res => {
          setStaffLeaveList(res?.data)
        },
        err => {},
      )
  }, [activeTab, selectMonth])
  return (
    <>
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
      <ApproveLeaveDialog
        approveLeave={approveLeave}
        handleGrantLeave={handleGrantLeave}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  )
}

export default StaffAttendance
