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
  GetAllRegularHoliday,
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
const HolidayAndLeaveManagement = () => {
  const [date, setDate] = React.useState(dayjs())
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar).state
  const [holidayList, setHolidayList] = useState([])
  const [regularHolidayList, setRegularHolidayList] = useState([]);
  const [leaveList, setLeaveList] = useState([])
  const [deleteLeaveDialogControl, setDeleteLeaveDialogControl] = useState({
    status: false,
  });
  const [deleteHolidayDialogControl, setDeleteHolidayDialogControl] = useState({
    status: false,
  });
  const [daysList, setDaysList] = useState(LEAVEHOLIDAY.WEEKDAYS)

  const [addHolidayDetail, setAddHolidayDetail] = useState({
    date: '',
    duration: '',
    occasion: '',
    regular: false,
  })
  const [addEditRegularDetail, setAddEditRegularDetail] = useState({
    occasion: '',
    regular: true,
    status: false,
    id: ''
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
      {},
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
    GetAllRegularHoliday(
      {},
      res => {
        setRegularHolidayList(res?.data);
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
    handleGetAllHoliday();
    handleGetLeaveType();
    handleGetRegularAllHoliday();
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
    console.log("addHolidayDetail", addHolidayDetail);
    let data = addHolidayDetail;
    delete data.status;
    delete data?.id;
    CreateHoliday(
      data,
      res => {
        handleGetAllHoliday();
        setAddHolidayDetail({
          ...addHolidayDetail, status: false,
          date: '',
          occasion: '',
          duration: '',
          id: ''
        })
        setSuccessSnackbar({ ...successSnackbar, message: res?.message, status: true })
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
    setDeleteHolidayDialogControl({ ...deleteHolidayDialogControl, status: false })
  }
  const handleUpdateRegularHoliday = () => {
    console.log("addHolidayDetail", addEditRegularDetail);
    let data = {
      occasion: (addEditRegularDetail.occasion).toString(),
      regular: addEditRegularDetail.regular,
    }
    UpdateHoliday(
      addEditRegularDetail.id, data,
      (res) => {
        setAddEditRegularDetail({ ...addEditRegularDetail, status: false, id: '', occasion: '' });
        handleGetRegularAllHoliday();
        setSuccessSnackbar({ ...successSnackbar, message: res?.message, status: true })
      },
      (err) => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }
  const handleAddRegularHoliday = () => {
    console.log("addHolidayDetail", addEditRegularDetail);
    let data = {
      occasion: (addEditRegularDetail.occasion).toString(),
      regular: addEditRegularDetail.regular,
    }
    CreateHoliday(
      data,
      res => {
        handleAddEditRegularDialogClose();
        handleGetRegularAllHoliday();
        setSuccessSnackbar({ ...successSnackbar, message: res?.message, status: true })
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
        setSuccessSnackbar({ ...successSnackbar, message: res?.message, status: true })
        handleLeaveDeleteDialog();
        handleGetLeaveType();
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
    console.log("addHolidayDetail", addHolidayDetail);
    let data = {
      date: addHolidayDetail?.date,
      occasion: addHolidayDetail?.occasion,
      duration: addHolidayDetail?.duration,
      regular: addHolidayDetail?.regular
    }

    UpdateHoliday(
      addHolidayDetail.id,
      data,
      res => {
        setAddHolidayDetail({
          ...addHolidayDetail, status: false,
          date: '',
          occasion: '',
          duration: '',
          id: ''
        })
        handleGetAllHoliday();
        setSuccessSnackbar({ ...successSnackbar, message: res?.message, status: true })
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
      (res) => {
        handleGetAllHoliday();
        handleHolidayDeleteDialog();
        handleGetRegularAllHoliday();
        setSuccessSnackbar({ ...successSnackbar, message: res?.message, status: true });
      },
      (err) => {
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
        setSuccessSnackbar({ ...successSnackbar, message: res?.message, status: true })
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
        handleCloseDialog();
        setSuccessSnackbar({ ...successSnackbar, message: res?.message, status: true })
        handleGetLeaveType();
        setAddLeaveDialog({
          ...addLeaveDialog, status: false,
          type: '',
          duration: '',
          id: ''
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
      { type: addLeaveDialog?.type, duration: parseInt(addLeaveDialog?.duration) },
      (res) => {
        setAddLeaveDialog({
          status: false,
          type: '',
          duration: '',
          id: ''
        })
        setLeaveList(res?.data)
        setSuccessSnackbar({ ...successSnackbar, message: res?.message, status: true })
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
      <Box className="leave_holiday_section">
        <Box
          sx={{ marginBottom: '10px' }}
          className="occassional_holiday_section"
        >
          <Box className="holiday_inner_class">
            <Box>
              <Typography variant="span" pl={1}>
                Holidays
              </Typography>
              <Button
                sx={{ float: 'right', marginBottom: '5px' }}
                className="leave_holiday_buttons"
                onClick={() => {
                  setAddHolidayDetail({ ...addHolidayDetail, status: true })
                }}
                variant="span"
              >
                + Holiday
              </Button>
            </Box>
            <Box>
              <TableContainer className="mt-2" component={Paper}>
                <Table>
                  <TableHead className="leave_holidays_table_header">
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell align="left">Occasion Name</TableCell>
                      <TableCell align="left">Duration Day</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {holidayList.length > 0 &&
                      holidayList.map(data => {
                        return (
                          <TableRow>
                            <TableCell>{data?.date}</TableCell>
                            <TableCell align="left">
                              {data?.occasion}{' '}
                            </TableCell>
                            <TableCell align="left">{data?.duration}</TableCell>
                            <td className="common_row">
                              <Box>
                                <EditRoundedIcon
                                  onClick={() => {
                                    setAddHolidayDetail({
                                      ...addHolidayDetail, status: true,
                                      date: data.date,
                                      occasion: data.occasion,
                                      duration: data.duration,
                                      id: data.id
                                    })
                                  }}
                                  className="icon common_row"
                                />
                              </Box>
                              <Box>
                                <DeleteRoundedIcon
                                  onClick={() => setDeleteHolidayDialogControl({ ...deleteHolidayDialogControl, status: true, id: data.id })}
                                  className="icon delete_icon_style"
                                />
                              </Box>
                            </td>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>

          {/* <Box className="w-50" sx={{ maxHeight: "330px" }}>
            <Button
              onClick={() => {
                setAddHolidayDetail({ ...addHolidayDetail, regular: true })
                setAddHolidayDialog({ ...addHolidayDialog, status: true })
              }}
              sx={{ float: 'right', marginTop: '8px' }}
              className="leave_holiday_buttons"
              variant="contained"
            >
              + Holiday
            </Button>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid sx={{ padding: '33px' }} item xs={12} md={6}>
                <CalendarPicker
                  date={date}
                  onChange={newDate => setDate(newDate)}
                />
              </Grid>
            </LocalizationProvider>
          </Box> */}
        </Box>
        <Box
          variant="span"
          sx={{ marginLeft: '0px' }}
          className=" row ms-4 dummy"
        >
          <Box className="leave_management_section">
            <Box
              className="leave_management_header mb-2 mt-2"
            >
              <Typography
                className="sub_heading"
                variant="span"
              >
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
                className="leave_holiday_buttons"
              >
                + Leave
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead className="leave_holidays_table_header">
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell align="left">Total</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaveList.length > 0 &&
                    leaveList.map(row => {
                      return (
                        <TableRow
                          key={row.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell scope="row">{row.type}</TableCell>
                          <TableCell align="right">{row.duration}</TableCell>
                          <TableCell align="right">
                            <EditRoundedIcon
                              sx={{ marginLeft: '4rem' }}
                              onClick={() => {
                                setAddLeaveDialog({
                                  ...addLeaveDialog,
                                  status: true,
                                  type: row?.type,
                                  duration: row?.duration,
                                  id: row?.id,
                                })
                              }}
                              className="icon common_row"
                            />
                            <DeleteRoundedIcon
                              onClick={() =>
                                setDeleteLeaveDialogControl({ ...deleteLeaveDialogControl, status: true, id: row.id })
                              }
                              className="icon"
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box sx={{ marginRight: '10px' }} className="regular_holiday_section">
            <Box className="regular_holiday_heading mb-3">
              <Typography
                sx={{ marginTop: '5px', marginLeft: '5px' }}
                className="sub_heading"
                variant="span"
              >
                Regular Holiday On
              </Typography>
              <Button
                sx={{ marginTop: '5px', marginLeft: '5px', marginRight: '7px' }}
                className="leave_holiday_buttons"
                variant="contained"
                onClick={() => setAddEditRegularDetail({ ...addEditRegularDetail, status: true })}
              >
                + Add
              </Button>
            </Box>
            {regularHolidayList.length > 0 && regularHolidayList.map((data) => {
              return <>
                <Box className="regular_holiday_heading">
                  <Typography
                    sx={{
                      marginLeft: '25px',
                    }}
                    variant="span"
                  >
                    {daysList[data.occasion].days}
                  </Typography>
                  <Box>
                    <EditRoundedIcon
                      className="icon"
                      onClick={() => {
                        setAddEditRegularDetail({
                          ...addEditRegularDetail, status: true,
                          id: data.id, occasion: data.occasion
                        })
                      }
                      }
                    />
                    <DeleteRoundedIcon
                      onClick={() => setDeleteHolidayDialogControl({ ...deleteHolidayDialogControl, status: true, id: data.id })}
                      className="icon"
                    />
                  </Box>
                </Box>
              </>
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
    </>
  )
}
export default HolidayAndLeaveManagement
