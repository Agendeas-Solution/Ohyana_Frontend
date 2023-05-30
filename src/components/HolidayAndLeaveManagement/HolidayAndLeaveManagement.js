import React, { useEffect, useState, useContext } from 'react'
import { Box, Typography, Button } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
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
import AddLeaveDialog from './AddLeaveDialog'
import { Context as ContextSnackbar } from '../../context/pageContext'
import DeleteLeaveDialog from './DeleteLeaveDialog'
import DeleteHolidayDialog from './DeleteHolidayDialog'
import { LEAVEHOLIDAY } from '../../constants/leaveHolidayConstant'
import AddEditRegularHolidayDialog from './AddEditRegularHolidayDialog'
import moment from 'moment'
import PermissionsGate from '../Settings/PermissionGate'
import { PERMISSION } from '../../constants'
const HolidayAndLeaveManagement = () => {
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
      err => {},
    )
  }
  const handleGetAllHoliday = () => {
    GetAllHoliday(
      { type: 'occasional' },
      res => {
        setHolidayList(res?.data)
      },
      err => {},
    )
  }
  const handleGetRegularAllHoliday = () => {
    GetAllHoliday(
      { type: 'regular' },
      res => {
        setRegularHolidayList(res?.data)
      },
      err => {},
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

        const newArray = leaveList.map(obj => {
          if (obj.id === res.data.id) {
            return {
              ...obj,
              type: res.data.type,
              duration: res.data.duration,
            }
          }
          return obj
        })
        setLeaveList(newArray)
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

              <PermissionsGate scopes={[PERMISSION.PERMISSIONS.EDIT_HOLIDAY]}>
                <Button
                  className="common_button"
                  onClick={() => {
                    setAddHolidayDetail({ ...addHolidayDetail, status: true })
                  }}
                  variant="span"
                >
                  + Holiday
                </Button>
              </PermissionsGate>
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
                    <TableCell className="table_text">Duration Day</TableCell>
                    <TableCell></TableCell>
                    {/* <TableCell></TableCell> */}
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
                          <TableCell>
                            {moment(data?.date).format('DD-MM-YYYY') || '-'}
                          </TableCell>
                          <TableCell>{data?.occasion || '-'} </TableCell>
                          <TableCell className="table_text">
                            {data?.duration || '-'}
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'end',
                              }}
                            >
                              <PermissionsGate
                                scopes={[PERMISSION.PERMISSIONS.EDIT_HOLIDAY]}
                              >
                                <Button
                                  sx={{ marginRight: '10px' }}
                                  // className="border_button_small"

                                  className="button_color"
                                  variant="outlined"
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
                              </PermissionsGate>

                              <PermissionsGate
                                scopes={[PERMISSION.PERMISSIONS.DELETE_HOLIDAY]}
                              >
                                <Button
                                  // className="border_button_small"
                                  className="button_color"
                                  variant="outlined"
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
                              </PermissionsGate>
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

                <PermissionsGate scopes={[PERMISSION.PERMISSIONS.EDIT_LEAVE]}>
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
                </PermissionsGate>
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
                      <TableCell className="table_text">Total</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {leaveList &&
                      leaveList.length > 0 &&
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
                            <TableCell className="table_text">
                              {row.duration}
                            </TableCell>
                            <TableCell>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                }}
                              >
                                <PermissionsGate
                                  scopes={[PERMISSION.PERMISSIONS.EDIT_LEAVE]}
                                >
                                  <Button
                                    sx={{ marginRight: '10px' }}
                                    // className="border_button_small"
                                    className="button_color"
                                    variant="outlined"
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
                                </PermissionsGate>

                                <PermissionsGate
                                  scopes={[PERMISSION.PERMISSIONS.DELETE_LEAVE]}
                                >
                                  <Button
                                    className="button_color"
                                    variant="outlined"
                                    // className="border_button_small"
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
                                </PermissionsGate>
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
                <PermissionsGate scopes={[PERMISSION.PERMISSIONS.EDIT_HOLIDAY]}>
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
                </PermissionsGate>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  overflow: 'auto',
                }}
              >
                {regularHolidayList.length > 0 &&
                  regularHolidayList.map(data => {
                    return (
                      <Box>
                        <Box
                          // sx={{ height: '60%' }}
                          className="regular_holiday_data"
                        >
                          <Typography variant="span">
                            {daysList[data.occasion].days}
                          </Typography>

                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                            }}
                          >
                            <PermissionsGate
                              scopes={[PERMISSION.PERMISSIONS.EDIT_HOLIDAY]}
                            >
                              <Button
                                sx={{ marginRight: '10px' }}
                                className="button_color"
                                variant="outlined"
                                // className="border_button_small"
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
                            </PermissionsGate>
                            <PermissionsGate
                              scopes={[PERMISSION.PERMISSIONS.DELETE_HOLIDAY]}
                            >
                              <Button
                                sx={{ marginRight: '10px' }}
                                className="button_color"
                                variant="outlined"
                                // className="border_button_small"
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
                            </PermissionsGate>
                          </Box>
                        </Box>
                      </Box>
                    )
                  })}
              </Box>
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
