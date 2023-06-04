import React, { useEffect, useState, useContext } from 'react'
import './index.css'
import { Box, Pagination, Typography } from '@mui/material'
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
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [totalResult, setTotalresult] = useState()
  const [numbersToDisplayOnPagination, setNumbersToDisplayOnPagination] =
    useState(0)
  const [approveLeave, setApproveLeave] = useState({
    status: false,
    id: null,
    leaveStatus: true,
  })
  const handleGrantLeave = () => {
    GrantLeave(
      { id: approveLeave.id, leaveStatus: approveLeave?.leaveStatus },
      res => {
        const newArray = staffLeaveList.map(obj => {
          if (obj.id === res.data.id) {
            return {
              ...obj,
              status: res.data.status,
            }
          }
          return obj
        })
        setStaffLeaveList(newArray)
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
      page: currentPage,
      size: rowsPerPage,
    }
    activeTab === 'present' &&
      GetStaffAttendanceList(
        data,
        res => {
          setStaffAttendanceList(res?.data)
          setTotalresult(res?.data?.totalPage)
          let pages =
            res?.data?.totalPage > 0
              ? Math.ceil(res?.data?.totalPage / rowsPerPage)
              : null
          setNumbersToDisplayOnPagination(pages)
        },
        err => {},
      )
    activeTab === 'leave' &&
      GetStaffLeaveList(
        data,
        res => {
          setStaffLeaveList(res?.data)
          setTotalresult(res?.data?.totalPage)
          let pages =
            res?.data?.totalPage > 0
              ? Math.ceil(res?.data?.totalPage / rowsPerPage)
              : null
          setNumbersToDisplayOnPagination(pages)
        },
        err => {},
      )
  }, [activeTab, selectMonth, currentPage])
  return (
    <>
      <Box className="statistics_data_section">
        <Box className="statistics_data">
          <Box className="statistics_box first_box">
            <Typography variant="span">Total Days</Typography>
            <Typography variant="span">
              {staffAttendanceList?.totalDays || 0}
            </Typography>
          </Box>
          <Box className="statistics_box second_box">
            <Typography variant="span">Absent Days</Typography>
            <Typography variant="span">
              {staffAttendanceList?.absentDays || 0}
            </Typography>
          </Box>
          <Box className="statistics_box third_box">
            <Typography variant="span">Late Days</Typography>
            <Typography variant="span">
              {staffAttendanceList?.lateDays || 0}
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
      <Pagination
        className="pagination_style"
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
      <ApproveLeaveDialog
        approveLeave={approveLeave}
        handleGrantLeave={handleGrantLeave}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  )
}

export default StaffAttendance
