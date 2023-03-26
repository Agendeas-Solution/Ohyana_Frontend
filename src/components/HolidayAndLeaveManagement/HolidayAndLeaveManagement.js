import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, TextField, Tab, Tabs } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import dayjs from 'dayjs'
import Grid from '@mui/material/Grid'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker'
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
const minDate = dayjs('2020-01-01T00:00:00.000')
const maxDate = dayjs('2034-01-01T00:00:00.000')
const HolidayAndLeaveManagement = () => {
  const [date, setDate] = React.useState(dayjs())
  const [holidayList, setHolidayList] = useState([])
  const [leaveList, setLeaveList] = useState([])
  const [addHolidayDialog, setAddHolidayDialog] = useState({
    status: false,
  })
  const [addHolidayDetail, setAddHolidayDetail] = useState({
    date: '',
    duration: '',
    occasion: '',
    regular: false,
  })
  const [addLeaveDialog, setAddLeaveDialog] = useState({
    status: false,
    type: '',
    duration: '',
  })
  useEffect(() => {
    GetAllHoliday(
      {},
      res => {
        setHolidayList(res?.data)
        
      },
      err => {
        console.log('Printing Error', err)
      },
    )
    GetAllLeaveType(
      {},
      res => {
        setLeaveList(res?.data)
        
      },
      err => {},
    )
  }, [])
  const handleCloseDialog = () => {
    setAddHolidayDialog({ ...addHolidayDialog, status: false })
    setAddHolidayDetail({
      ...addHolidayDetail,
      date: '',
      duration: '',
      occasion: '',
      regular: false,
    })
    setAddLeaveDialog({ ...addLeaveDialog, status: false })
  }
  const SetHoliday = () => {
    CreateHoliday(
      addHolidayDetail,
      res => {
        handleCloseDialog()
        
      },
      err => {},
    )
  }
  const UpdateHolidayFunc = (id, holidayDetail) => {
    UpdateHoliday(
      id,
      holidayDetail,
      res => {
        handleCloseDialog()
        
      },
      err => {},
    )
  }
  const DeleteHolidayFunc = id => {
    DeleteHoliday(
      id,
      res => {
        
      },
      err => {
        
      },
    )
  }
  const DeleteLeaveFunc = id => {
    
    DeleteLeaveType(
      id,
      res => {
        
      },
      err => {
        
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
      },
      err => {},
    )
  }
  const UpdateLeave = () => {
    UpdateLeaveType(
      addLeaveDialog?.id,
      { type: addLeaveDialog?.type, duration: addLeaveDialog?.duration },
      res => {
        setAddLeaveDialog({
          status: false,
          type: '',
          duration: '',
        })
      },
      err => {
        
      },
    )
  }
  return (
    <>
      <Box className="leave_holiday_section">
        {/* <Box className="dummy"> */}
        <Box
          sx={{ marginBottom: '10px' }}
          // className="w-100"
          className="occassional_holiday_section"
        >
          {/* <Box className="dummy_class"> */}
          <Box className="holiday_inner_class">
            <Box>
              <Typography variant="span" pl={1}>
                Holidays
              </Typography>
              <Button
                // onClick={() => {
                //   setAddHolidayDetail({ ...addHolidayDetail, regular: true });
                //   setAddHolidayDialog({ ...addHolidayDialog, status: true });
                // }}
                sx={{ float: 'right', marginBottom: '5px' }}
                className="leave_holiday_buttons"
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
                                    setAddHolidayDialog({
                                      ...addHolidayDialog,
                                      status: true,
                                    })
                                    let value = data
                                    value.regular = false
                                    setAddHolidayDetail(value)
                                  }}
                                  className="icon common_row"
                                />
                              </Box>
                              <Box>
                                <DeleteRoundedIcon
                                  onClick={() => DeleteLeaveFunc(data?.id)}
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

        {/* </Box> */}

        {/* starting of SECOND section */}
        {/* <Box> */}
        <Box
          // display="flex"
          variant="span"
          sx={{ marginLeft: '0px' }}
          // className="row mt-2 leave_holiday_row"
          className=" row ms-4 dummy"
        >
          <Box className="leave_management_section">
            <Box
              // sx={{ marginTop: "7px", marginLeft: "5px" }}
              className="leave_management_header mb-2 mt-2"
            >
              <Typography
                // sx={{ marginTop: "19px", marginLeft: "5px" }}
                // sx={{ marginTop: "5px", marginLeft: "5px" }}
                className="sub_heading"
                variant="span"
              >
                Leave Management
              </Typography>
              <Button
                // sx={{
                //   marginTop: "16px",
                //   marginBottom: "14px",
                //   // marginRight: "3px",
                // }}
                // sx={{ marginTop: "5px", marginLeft: "5px" }}
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
              {/* <Table sx={{ marginLeft: "25px", marginRight: "25px" }}> */}
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
                              onClick={() => DeleteLeaveFunc(row?.id)}
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

          {/* </Box> */}
          <Box sx={{ marginRight: '10px' }} className="regular_holiday_section">
            {/* <Box className="regular_holiday_section"> */}
            <Box className="regular_holiday_heading mb-3">
              <Typography
                // sx={{ marginTop: "24px", marginLeft: "25px" }}
                sx={{ marginTop: '5px', marginLeft: '5px' }}
                className="sub_heading"
                variant="span"
              >
                Regular Holiday On
              </Typography>
              <Button
                // sx={{
                //   marginTop: "16px",
                //   marginBottom: "14px",
                //   marginRight: "5px",
                // }}
                sx={{ marginTop: '5px', marginLeft: '5px', marginRight: '7px' }}
                className="leave_holiday_buttons"
                variant="contained"
              >
                + Add
              </Button>
            </Box>
            <Box className="regular_holiday_heading">
              <Typography
                sx={{
                  //   marginTop: "23px",
                  marginLeft: '25px',
                }}
                variant="span"
              >
                Sunday
              </Typography>
              <EditRoundedIcon
                sx={{ marginRight: '25px', marginBottom: '15px' }}
                className="icon"
              />
            </Box>
          </Box>
        </Box>
        <HolidayDialog
          addHolidayDetail={addHolidayDetail}
          setAddHolidayDetail={setAddHolidayDetail}
          addHolidayDialog={addHolidayDialog}
          UpdateHolidayFunc={UpdateHolidayFunc}
          SetHoliday={SetHoliday}
          handleCloseDialog={handleCloseDialog}
        />
        <AddLeaveDialog
          addLeaveDialog={addLeaveDialog}
          handleCloseDialog={handleCloseDialog}
          AddLeave={AddLeave}
          setAddLeaveDialog={setAddLeaveDialog}
          UpdateLeave={UpdateLeave}
        />
      </Box>
    </>
  )
}
export default HolidayAndLeaveManagement
