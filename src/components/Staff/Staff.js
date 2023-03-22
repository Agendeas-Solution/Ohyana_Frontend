import { React, useEffect, useState, useContext } from 'react'
import {
  Box,
  TextField,
  Button,
  Autocomplete,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from '@mui/material'
import './index.css'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useNavigate } from 'react-router-dom'
import CallIcon from '../../assets/img/call.svg'
import MailIcon from '../../assets/img/mail.svg'
import { Context as AuthContext } from '../../context/authContext/authContext'
import {
  GetAdminStaffDetailList,
  GetUsersAttendanceList,
} from '../../services/apiservices/staffDetail'
import {
  GetAdminDepartmentList,
  GetAdminRole,
} from '../../services/apiservices/adminprofile'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import SuccessSnackbar from '../SuccessSnackbar/SuccessSnackbar'
import Loader from '../Loader/Loader'
import moment from 'moment'
const Staff = () => {
  let navigate = useNavigate()
  const { flagLoader, permissions } = useContext(AuthContext).state
  const { setFlagLoader } = useContext(AuthContext)
  const [value, setValue] = useState('1')
  const [loader, setLoader] = useState(false)
  const d = new Date()
  const [datePicker, setDatePicker] = useState({
    $M: d.getMonth() + 1,
    $y: d.getFullYear(),
  })
  const [staffDetailList, setStaffDetailList] = useState([])
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [departmentList, setDepartmentList] = useState([])
  const [jobRoleList, setJobRoleList] = useState([])
  const [usersAttendanceList, setUserAttendanceList] = useState([])
  const [departmentAndJobRoles, setDepartmentAndJobRoles] = useState({
    departmentId: null,
    roleId: null,
  })
  useEffect(() => {
    value === '1' && setLoader(true)
    GetAdminStaffDetailList(
      departmentAndJobRoles,
      res => {
        if (res.success) {
          setStaffDetailList(res?.data?.team)
          setLoader(false)
        }
      },
      err => {
        console.log('Printing ', err)
        setLoader(false)
      },
    )
  }, [value, departmentAndJobRoles])
  useEffect(() => {
    GetAdminDepartmentList(
      {},
      res => {
        setDepartmentList(res?.data?.department)
      },
      err => {
        console.log('Printing Error', err)
      },
    )
  }, [])
  useEffect(() => {
    GetAdminRole(
      departmentAndJobRoles?.departmentId,
      res => {
        setJobRoleList(res.data.roles)
      },
      err => {
        console.log('Printing Error', err)
      },
    )
  }, [departmentAndJobRoles?.departmentId])
  useEffect(() => {
    console.log('datePicker', datePicker.$M)
    value === '2' &&
      GetUsersAttendanceList(
        { month: datePicker.$M, year: datePicker.$y },
        res => {
          setUserAttendanceList(res?.data)
        },
        err => {},
      )
  }, [value, datePicker])
  return (
    <>
      {loader && <Loader />}
      <Box className="client_section">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box className="align-items-center d-flex notification_tabs_root">
              <TabList
                className="client_profile_tab"
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
              >
                <Tab label="Detail" value="1" />
                <Tab label="Attendance" value="2" />
              </TabList>
              <div className="d-flex justify-content-end w-50">
                {value === '2' && (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      views={['year', 'month']}
                      disableFuture
                      value={datePicker}
                      onChange={newValue => {
                        setDatePicker(newValue)
                      }}
                      renderInput={params => (
                        <TextField
                          placeholder="Year and Month"
                          {...params}
                          helperText={null}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
                {value === '1' ? (
                  <>
                    <Autocomplete
                      className="align-items-center d-flex justify-content-center"
                      options={jobRoleList}
                      onChange={(e, value) => {
                        console.log(value)
                        setDepartmentAndJobRoles({
                          ...departmentAndJobRoles,
                          roleId: value?.id,
                        })
                      }}
                      getOptionLabel={option => option.name}
                      sx={{ width: 300 }}
                      renderInput={params => (
                        <TextField {...params} placeholder="Select Job Role" />
                      )}
                    />
                    <Autocomplete
                      className="align-items-center d-flex justify-content-center mx-2"
                      options={departmentList}
                      onChange={(e, value) => {
                        console.log(value)
                        setDepartmentAndJobRoles({
                          ...departmentAndJobRoles,
                          departmentId: value?.id,
                        })
                      }}
                      sx={{ width: 300 }}
                      getOptionLabel={option => option.name}
                      renderInput={params => (
                        <TextField
                          {...params}
                          placeholder="Select Department"
                        />
                      )}
                    />
                  </>
                ) : null}
                <Box>
                  {value === '1' ? (
                    <>
                      {permissions?.editStaff && (
                        <Button
                          onClick={() => {
                            navigate('/addstaffmember')
                          }}
                          className="main_button"
                        >
                          <AddRoundedIcon />
                          Add Staff
                        </Button>
                      )}
                    </>
                  ) : null}
                </Box>
              </div>
            </Box>
            <TabPanel value="1">
              <TableContainer sx={{ height: '70vh' }} component={Paper}>
                {staffDetailList.length > 0 ? (
                  <Table stickyHeader sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Sr No.</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Job Role</TableCell>
                        <TableCell align="right">Location</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {staffDetailList.map((row, index) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell scope="row">{row.id}</TableCell>
                          <TableCell align="right">{row.name}</TableCell>
                          <TableCell align="right">{row.role.name}</TableCell>
                          <TableCell align="right">{row?.location}</TableCell>
                          <TableCell align="right">
                            <Button
                              onClick={() => {
                                navigate(`/staffprofile/${row.id}`)
                              }}
                              className="common_button"
                            >
                              View
                            </Button>
                            <a href={`tel:${row.contact_number}`}>
                              {' '}
                              <Button className="common_button">
                                <img src={CallIcon} />
                              </Button>
                            </a>
                            <a href={`mailto:${row.email}`}>
                              {' '}
                              <Button className="common_button">
                                <img src={MailIcon} />
                              </Button>
                            </a>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    No Data Found
                  </p>
                )}
              </TableContainer>
            </TabPanel>
            <TabPanel value="2">
              <TableContainer sx={{ height: '70vh' }} component={Paper}>
                {usersAttendanceList.length > 0 ? (
                  <Table stickyHeader sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">Name</TableCell>
                        {usersAttendanceList[0].attendances.map(days => {
                          return (
                            <TableCell align="right">
                              {moment(days?.date).format('D')}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {usersAttendanceList.map(nameData => {
                        return (
                          <TableRow
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell align="right">
                              {nameData?.name}
                            </TableCell>
                            {nameData?.attendances.map(status => {
                              return (
                                <TableCell
                                  className={
                                    status?.attendanceType === 'LT'
                                      ? 'late_status_color'
                                      : status?.attendanceType === 'A'
                                      ? 'absent_status_color'
                                      : status?.attendanceType === 'L'
                                      ? 'leave_status_color'
                                      : 'present_status_color'
                                  }
                                  align="right"
                                >
                                  {' '}
                                  {status?.attendanceType}
                                </TableCell>
                              )
                            })}
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                ) : (
                  <p
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    No Data Found
                  </p>
                )}
              </TableContainer>
            </TabPanel>
          </TabContext>
        </Box>
        <Pagination className="mt-1" />
      </Box>
    </>
  )
}

export default Staff
