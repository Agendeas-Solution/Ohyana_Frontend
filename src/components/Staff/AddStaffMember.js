import React, { useEffect, useState, useContext } from 'react'
import {
  Typography,
  Box,
  TextField,
  InputLabel,
  FormControl,
  Button,
  Select,
  MenuItem,
} from '@mui/material'
import {
  GetAdminDepartmentList,
  GetAdminRole,
} from '../../services/apiservices/adminprofile'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { AddEmployee } from '../../services/apiservices/staffDetail'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useNavigate } from 'react-router-dom'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { TEAM } from '../../constants'
const ErrorSnackbar = React.lazy(() => import('../ErrorSnackbar/ErrorSnackbar'))
const AddStaffMember = () => {
  const [userDetail, setUserDetail] = useState({
    employeeName: '',
    email: '',
    jobRole: '',
    contactNo: '',
    gender: '',
    birthDate: '',
    state: '',
    jobType: '',
    password: '',
  })
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const [departmentList, setDepartmentList] = useState([])
  const [employeeJobRole, setEmployeeJobRole] = useState([])
  const navigate = useNavigate()
  const handleChange = prop => event => {
    setUserDetail({ ...userDetail, [prop]: event.target.value })
  }
  useEffect(() => {
    GetAdminDepartmentList(
      {},
      res => {
        if (res?.success) {
          setDepartmentList(res?.data?.department)
        }
      },
      err => {},
    )
  }, [])
  useEffect(() => {
    {
      GetAdminRole(
        {},
        res => {
          if (res.success) {
            setEmployeeJobRole(res.data)
          }
        },
        err => {
          console.log('Printing Error of GetAdminRole', err)
        },
      )
    }
  }, [])
  const handleAddEmployee = () => {
    if (
      userDetail.employeeName !== '' &&
      userDetail.email !== '' &&
      userDetail.jobRole !== '' &&
      userDetail.contactNo &&
      userDetail.password !== '' &&
      userDetail.birthDate !== '' &&
      userDetail.gender !== '' &&
      userDetail.jobType !== ''
    ) {
      let employeeDetail = {
        name: userDetail.employeeName,
        email: userDetail.email,
        roleId: userDetail.jobRole,
        contact_number: userDetail.contactNo,
        gender: userDetail.gender,
        birthDay: userDetail.birthDate,
        state: userDetail.state,
        jobType: userDetail.jobType,
        password: userDetail.password,
      }

      AddEmployee(
        employeeDetail,
        res => {
          navigate('/staff')
          setSuccessSnackbar({
            ...successSnackbar,
            status: true,
            message: res.data.message,
          })
        },
        err => {
          setErrorSnackbar({
            ...errorSnackbar,
            status: true,
            message: err.response.data.error,
          })
        },
      )
    } else {
      console.log(userDetail)
    }
  }
  return (
    <>
      <Box className="main_section" sx={{ overflow: 'hidden', padding: '0px' }}>
        <Box sx={{ height: '83vh', overflowY: 'auto' }}>
          <Box className="input_field_row">
            <Box className="input_fields">
              <TextField
                label="Employee Name"
                onChange={e => {
                  setUserDetail({
                    ...userDetail,
                    employeeName: e.target.value,
                  })
                }}
                value={userDetail.employeeName}
                variant="outlined"
              />
            </Box>
            <Box className="input_fields">
              <FormControl>
                <InputLabel>Select Job Type</InputLabel>
                <Select
                  label="Select Job Type"
                  value={userDetail?.jobType}
                  onChange={e => {
                    setUserDetail({ ...userDetail, jobType: e.target.value })
                  }}
                >
                  {TEAM.JOBTYPE.map(data => {
                    return <MenuItem value={data?.id}>{data?.type}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Email &&  Job Role  */}
          <Box className="input_field_row">
            <Box className="input_fields">
              <TextField
                autoComplete="off"
                label="Email"
                type="email"
                onChange={e => {
                  setUserDetail({ ...userDetail, email: e.target.value })
                }}
                value={userDetail.email}
                variant="outlined"
              />
            </Box>
            <Box className="input_fields">
              <FormControl>
                <InputLabel>Select jobRole</InputLabel>
                <Select
                  label="Select Job Role"
                  value={userDetail?.jobRole}
                  onChange={e => {
                    setUserDetail({ ...userDetail, jobRole: e.target.value })
                  }}
                >
                  {employeeJobRole &&
                    employeeJobRole.map(data => {
                      return <MenuItem value={data?.id}>{data?.name}</MenuItem>
                    })}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box className="input_field_row">
            <Box className="input_fields">
              <TextField
                autoComplete="off"
                type="number"
                label="Contact No"
                onChange={e => {
                  setUserDetail({ ...userDetail, contactNo: e.target.value })
                }}
                value={userDetail.contactNo}
                variant="outlined"
              />
            </Box>
            <Box className="input_fields">
              <TextField
                autoComplete="off"
                label="State"
                onChange={e => {
                  setUserDetail({ ...userDetail, state: e.target.value })
                }}
                value={userDetail.state}
                variant="outlined"
              />
            </Box>
          </Box>

          {/* Gender*/}
          <Box className="input_field_row">
            <Box className="input_fields">
              <FormControl>
                <InputLabel>Select Gender</InputLabel>
                <Select
                  label="Select Gender"
                  value={userDetail?.gender}
                  onChange={e => {
                    setUserDetail({ ...userDetail, gender: e.target.value })
                  }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box className="input_fields">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  inputFormat="dd/MM/yyyy"
                  value={userDetail.birthDate}
                  onChange={e => {
                    setUserDetail({ ...userDetail, birthDate: e })
                  }}
                  renderInput={params => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </Box>
          <Box className="input_field_row">
            <Box className="input_fields">
              <TextField
                autoComplete="off"
                label="Password"
                onChange={e => {
                  setUserDetail({ ...userDetail, password: e.target.value })
                }}
                value={userDetail.password}
                variant="outlined"
              />
            </Box>
          </Box>
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
            className="input_field_row"
          >
            <Button
              onClick={handleAddEmployee}
              variant="contained"
              className="edit_page_save_button"
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
      <ErrorSnackbar />
    </>
  )
}

export default AddStaffMember
