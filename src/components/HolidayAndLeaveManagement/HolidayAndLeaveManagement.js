import React, { useEffect, useState, useContext } from 'react'
import { Box, Typography, Button, TextField, Tab, Tabs } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import dayjs from 'dayjs'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import {
  GetAllHoliday,
  GetAllLeaveType,
} from '../../services/apiservices/holiday'
import './index.css'
import {
  CreateHoliday,
  UpdateHoliday,
  DeleteHoliday,
  CreateLeaveType,
  DeleteLeaveType,
  UpdateLeaveType,
} from '../../services/apiservices/holiday'
import HolidayDialog from './HolidayDialog'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import AddLeaveDialog from './AddLeaveDialog'
import { TabPanel } from '@mui/lab'
import { Context as ContextSnackbar } from '../../context/pageContext'
import DeleteLeaveDialog from './DeleteLeaveDialog'
import DeleteHolidayDialog from './DeleteHolidayDialog'
import { LEAVEHOLIDAY } from '../../constants/leaveHolidayConstant'
import AddEditRegularHolidayDialog from './AddEditRegularHolidayDialog'
import moment from 'moment'
const HolidayAndLeaveManagement = () => {
  const [date, setDate] = React.useState(dayjs())
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar).state
  const [holidayList, setHolidayList] = useState([])
  const [regularHolidayList, setRegularHolidayList] = useState([])
  const [leaveList, setLeaveList] = useState([])
  const [deleteLeaveDialogControl, setDeleteLeaveDialogControl] = useState({
    status: false,
  })
  const [deleteHolidayDialogControl, setDeleteHolidayDialogControl] = useState({
    status: false,
  })
  const [daysList, setDaysList] = useState(LEAVEHOLIDAY.WEEKDAYS)

  const [addHolidayDetail, setAddHolidayDetail] = useState({
    date: moment().format('LL'),
    duration: '',
    occasion: '',
    regular: false,
  })
  const [addEditRegularDetail, setAddEditRegularDetail] = useState({
    occasion: '',
    regular: true,
    status: false,
    id: '',
  })
  const [addLeaveDialog, setAddLeaveDialog] = useState({
    status: false,
    type: '',
    duration: '',
  })

  const handleGetLeaveType = () => {
    GetAllLeaveType(
      {},
      res => {
        setLeaveList(res?.data)
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }
  const handleGetAllHoliday = () => {
    GetAllHoliday(
      { type: 'occasional' },
      res => {
        setHolidayList(res?.data)
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }
  const handleGetRegularAllHoliday = () => {
    GetAllHoliday(
      { type: 'regular' },
      res => {
        setRegularHolidayList(res?.data)
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }
  useEffect(() => {
    handleGetAllHoliday()
    handleGetLeaveType()
    handleGetRegularAllHoliday()
  }, [])
  const handleCloseDialog = () => {
    setAddHolidayDetail({
      ...addHolidayDetail,
      date: '',
      duration: '',
      occasion: '',
      regular: false,
    })
    setAddLeaveDialog({ ...addLeaveDialog, status: false })
  }

  const handleCloseHolidayDialog = () => {
    setAddHolidayDetail({ ...addHolidayDetail, status: false })
  }
  const SetHoliday = () => {
    let data = addHolidayDetail
    delete data.status
    delete data?.id
    CreateHoliday(
      data,
      res => {
        handleGetAllHoliday()
        setAddHolidayDetail({
          ...addHolidayDetail,
          status: false,
          date: '',
          occasion: '',
          duration: '',
          id: '',
        })
        setSuccessSnackbar({
          ...successSnackbar,
          message: res?.message,
          status: true,
        })
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }
  const handleLeaveDeleteDialog = () => {
    setDeleteLeaveDialogControl({ ...deleteLeaveDialogControl, status: false })
  }
  const handleAddEditRegularDialogClose = () => {
    setAddEditRegularDetail({ ...addEditRegularDetail, status: false })
  }
  const handleHolidayDeleteDialog = () => {
    setDeleteHolidayDialogControl({
      ...deleteHolidayDialogControl,
      status: false,
    })
  }
  const handleUpdateRegularHoliday = () => {
    let data = {
      occasion: addEditRegularDetail.occasion.toString(),
      regular: addEditRegularDetail.regular,
    }
    UpdateHoliday(
      addEditRegularDetail.id,
      data,
      res => {
        setAddEditRegularDetail({
          ...addEditRegularDetail,
          status: false,
          id: '',
          occasion: '',
        })
        handleGetRegularAllHoliday()
        setSuccessSnackbar({
          ...successSnackbar,
          message: res?.message,
          status: true,
        })
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }
  const handleAddRegularHoliday = () => {
    let data = {
      occasion: addEditRegularDetail.occasion.toString(),
      regular: addEditRegularDetail.regular,
    }
    CreateHoliday(
      data,
      res => {
        handleAddEditRegularDialogClose()
        handleGetRegularAllHoliday()
        setSuccessSnackbar({
          ...successSnackbar,
          message: res?.message,
          status: true,
        })
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }
  const handleDeleteLeave = () => {
    DeleteLeaveType(
      deleteLeaveDialogControl.id,
      res => {
        setSuccessSnackbar({
          ...successSnackbar,
          message: res?.message,
          status: true,
        })
        handleLeaveDeleteDialog()
        handleGetLeaveType()
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }
  const UpdateHolidayFunc = () => {
    let data = {
      date: addHolidayDetail?.date,
      occasion: addHolidayDetail?.occasion,
      duration: addHolidayDetail?.duration,
      regular: addHolidayDetail?.regular,
    }

    UpdateHoliday(
      addHolidayDetail.id,
      data,
      res => {
        setAddHolidayDetail({
          ...addHolidayDetail,
          status: false,
          date: '',
          occasion: '',
          duration: '',
          id: '',
        })
        handleGetAllHoliday()
        setSuccessSnackbar({
          ...successSnackbar,
          message: res?.message,
          status: true,
        })
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }
  const handleDeleteHoliday = () => {
    DeleteHoliday(
      deleteHolidayDialogControl.id,
      res => {
        handleGetAllHoliday()
        handleHolidayDeleteDialog()
        handleGetRegularAllHoliday()
        setSuccessSnackbar({
          ...successSnackbar,
          message: res?.message,
          status: true,
        })
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }
  const DeleteLeaveFunc = id => {
    DeleteLeaveType(
      id,
      res => {
        setSuccessSnackbar({
          ...successSnackbar,
          message: res?.message,
          status: true,
        })
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }
  const AddLeave = () => {
    CreateLeaveType(
      {
        duration: addLeaveDialog.duration,
        type: addLeaveDialog.type,
      },
      res => {
        handleCloseDialog()
        setSuccessSnackbar({
          ...successSnackbar,
          message: res?.message,
          status: true,
        })
        handleGetLeaveType()
        setAddLeaveDialog({
          ...addLeaveDialog,
          status: false,
          type: '',
          duration: '',
          id: '',
        })
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }
  const UpdateLeave = () => {
    UpdateLeaveType(
      addLeaveDialog?.id,
      {
        type: addLeaveDialog?.type,
        duration: parseInt(addLeaveDialog?.duration),
      },
      res => {
        setAddLeaveDialog({
          status: false,
          type: '',
          duration: '',
          id: '',
        })
        setLeaveList(res?.data)
        setSuccessSnackbar({
          ...successSnackbar,
          message: res?.message,
          status: true,
        })
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }
  return (
    <>
      <Box
        className="main_section"
        sx={{ overflowY: 'hidden', overflowx: 'hidden' }}
      >
        <Box className="leave_holiday_section">
          <Box className="occassional_holiday_section">
            <Box className="header_section">
              <Typography variant="span" className="sub_heading">
                Occassional Holidays
              </Typography>
              <Button
                className="common_button"
                onClick={() => {
                  setAddHolidayDetail({ ...addHolidayDetail, status: true })
                }}
                variant="span"
              >
                + Holiday
              </Button>
            </Box>

            <TableContainer
              sx={{ padding: '0px 10px' }}
              className="set_box_shadow"
              component={Paper}
            >
              <Table
                stickyHeader
                aria-label="sticky table"
                sx={{ minWidth: 500, padding: '0px !important' }}
                className="table_heading"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Occasion Name</TableCell>
                    <TableCell>Duration Day</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {holidayList.length > 0 &&
                    holidayList.map(data => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          sx={{
                            '&:last-child td,th': { border: 0 },
                          }}
                        >
                          <TableCell>{data?.date || '-'}</TableCell>
                          <TableCell>{data?.occasion || '-'} </TableCell>
                          <TableCell>{data?.duration || '-'}</TableCell>

                          <TableCell>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                              }}
                            >
                              <Button
                                sx={{ marginRight: '10px' }}
                                className="border_button_small"
                                onClick={() => {
                                  setAddHolidayDetail({
                                    ...addHolidayDetail,
                                    status: true,
                                    date: data.date,
                                    occasion: data.occasion,
                                    duration: data.duration,
                                    id: data.id,
                                  })
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                className="border_button_small"
                                onClick={() =>
                                  setDeleteHolidayDialogControl({
                                    ...deleteHolidayDialogControl,
                                    status: true,
                                    id: data.id,
                                  })
                                }
                              >
                                Delete
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box className="leave_regular_holiday_section">
            <Box className="leave_management_section">
              <Box className="header_section">
                <Typography className="sub_heading" variant="span">
                  Leave Management
                </Typography>
                <Button
                  onClick={() =>
                    setAddLeaveDialog({
                      ...addLeaveDialog,
                      status: true,
                      type: '',
                      duration: '',
                    })
                  }
                  className="common_button"
                >
                  + Leave
                </Button>
              </Box>

              <TableContainer sx={{ padding: ' 0px 10px' }}>
                <Table
                  className="table_heading"
                  stickyHeader
                  aria-label="sticky table"
                  sx={{ minWidth: 300, padding: '0px !important' }}
                >
                  <TableHead className="leave_holidays_table_header">
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leaveList.length > 0 &&
                      leaveList.map(row => {
                        return (
                          <TableRow
                            key={row.id}
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            sx={{
                              '&:last-child td,th': { border: 0 },
                            }}
                          >
                            <TableCell scope="row">{row.type}</TableCell>
                            <TableCell>{row.duration}</TableCell>
                            <TableCell>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                }}
                              >
                                <Button
                                  sx={{ marginRight: '10px' }}
                                  className="border_button_small"
                                  onClick={() => {
                                    setAddLeaveDialog({
                                      ...addLeaveDialog,
                                      status: true,
                                      type: row?.type,
                                      duration: row?.duration,
                                      id: row?.id,
                                    })
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  className="border_button_small"
                                  onClick={() =>
                                    setDeleteLeaveDialogControl({
                                      ...deleteLeaveDialogControl,
                                      status: true,
                                      id: row.id,
                                    })
                                  }
                                >
                                  Delete
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box className="regular_holiday_section" sx={{ marginTop: '10px' }}>
              <Box className="header_section">
                <Typography className="sub_heading" variant="span">
                  Regular Holiday On
                </Typography>
                <Button
                  className="common_button"
                  onClick={() =>
                    setAddEditRegularDetail({
                      ...addEditRegularDetail,
                      status: true,
                    })
                  }
                >
                  + Add
                </Button>
              </Box>
              {regularHolidayList.length > 0 &&
                regularHolidayList.map(data => {
                  return (
                    <>
                      <Box className="regular_holiday_data">
                        <Typography variant="span">
                          {daysList[data.occasion].days}
                        </Typography>

                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                          }}
                        >
                          <Button
                            sx={{ marginRight: '10px' }}
                            className="border_button_small"
                            onClick={() => {
                              setAddEditRegularDetail({
                                ...addEditRegularDetail,
                                status: true,
                                id: data.id,
                                occasion: data.occasion,
                              })
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            className="border_button_small"
                            onClick={() =>
                              setDeleteHolidayDialogControl({
                                ...deleteHolidayDialogControl,
                                status: true,
                                id: data.id,
                              })
                            }
                          >
                            Delete
                          </Button>
                        </Box>
                      </Box>
                    </>
                  )
                })}
            </Box>
          </Box>

          {/* Add Edit Occasional Holiday Dialog */}
          <HolidayDialog
            addHolidayDetail={addHolidayDetail}
            setAddHolidayDetail={setAddHolidayDetail}
            UpdateHolidayFunc={UpdateHolidayFunc}
            SetHoliday={SetHoliday}
            handleCloseHolidayDialog={handleCloseHolidayDialog}
          />
          <AddEditRegularHolidayDialog
            addEditRegularDetail={addEditRegularDetail}
            daysList={daysList}
            setAddEditRegularDetail={setAddEditRegularDetail}
            handleAddEditRegularDialogClose={handleAddEditRegularDialogClose}
            handleAddRegularHoliday={handleAddRegularHoliday}
            handleUpdateRegularHoliday={handleUpdateRegularHoliday}
          />
          {/* Add  Leave Dialog */}
          <AddLeaveDialog
            addLeaveDialog={addLeaveDialog}
            handleCloseDialog={handleCloseDialog}
            AddLeave={AddLeave}
            setAddLeaveDialog={setAddLeaveDialog}
            UpdateLeave={UpdateLeave}
          />

          {/* Delete Leave Dialog */}
          <DeleteLeaveDialog
            deleteLeaveDialogControl={deleteLeaveDialogControl}
            handleDeleteLeave={handleDeleteLeave}
            setDeleteLeaveDialogControl={setDeleteLeaveDialogControl}
            handleLeaveDeleteDialog={handleLeaveDeleteDialog}
          />

          {/* Delete Occasional Holiday Dialog */}
          <DeleteHolidayDialog
            handleDeleteHoliday={handleDeleteHoliday}
            deleteHolidayDialogControl={deleteHolidayDialogControl}
            setDeleteHolidayDialogControl={setDeleteHolidayDialogControl}
            handleHolidayDeleteDialog={handleHolidayDeleteDialog}
          />
        </Box>
      </Box>
    </>
  )
}
export default HolidayAndLeaveManagement
