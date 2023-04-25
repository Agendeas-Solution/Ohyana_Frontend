import React, { useEffect, useState } from 'react'
import {
  Typography,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
import ProfileImage from '../../assets/img/Profile_Image.svg'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import {
  EditEmployee,
  GetAdminStaffProfileDetail,
} from '../../services/apiservices/staffDetail'
import { useNavigate } from 'react-router-dom'
import { TEAM } from '../../constants'
const EditStaff = () => {
  const [userDetail, setUserDetail] = useState({
    name: '',
    contact_number: '',
    roleId: '',
    email: '',
    birthDay: '',
    gender: '',
    state: '',
    jobType: '',
    id: '',
  })
  const [departmentList, setDepartmentList] = useState([])
  const [employeeJobRole, setEmployeeJobRole] = useState([])
  const [successDialog, setSuccessDialog] = useState(false)
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
    let path = window.location.pathname
    path = path.split('/').pop()
    GetAdminStaffProfileDetail(
      parseInt(path),
      res => {
        if (res.success) {
          setUserDetail({
            ...userDetail,
            name: res.data.name,
            contact_number: res.data.contact_number,
            roleId: res.data.role.id,
            email: res.data.email,
            birthDay: res.data.birthDay,
            gender: res.data.gender,
            state: res.data.state,
            jobType: res.data.jobType,
            id: res.data.id,
          })
        }
      },
      err => {
        console.log('Printing ', err)
      },
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

  const handleClickShowPassword = () => {
    setUserDetail({
      ...userDetail,
      showPassword: !userDetail.showPassword,
    })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleAddEmployee = () => {
    if (
      userDetail.employeeName !== '' &&
      userDetail.email !== '' &&
      userDetail.roleId !== '' &&
      userDetail.contact_number !== '' &&
      userDetail.gender !== '' &&
      userDetail.jobType !== '' &&
      userDetail.id !== ''
    ) {
      EditEmployee(
        userDetail,
        res => {
          if (res.success) {
            setSuccessDialog(true)
          }
        },
        err => {},
      )
    } else {
      console.log(userDetail)
    }
  }
  return (
    <>
      <Box className="main_section">
        <Box className="pofile_edit_section">
          <Box className="edit_profile_image_section">
            <img src={ProfileImage} alt="profile" />
          </Box>
          <Box className="edit_profile_detail_section">
            {/* Name &&  Job Type  */}
            <Box className="input_field_row">
              <Box className="input_fields">
                <TextField
                  label="Employee Name"
                  onChange={e => {
                    setUserDetail({
                      ...userDetail,
                      name: e.target.value,
                    })
                  }}
                  value={userDetail.name}
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
                    value={userDetail?.roleId}
                    onChange={e => {
                      setUserDetail({ ...userDetail, roleId: e.target.value })
                    }}
                  >
                    {employeeJobRole &&
                      employeeJobRole.map(data => {
                        return (
                          <MenuItem value={data?.id}>{data?.name}</MenuItem>
                        )
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
                    setUserDetail({
                      ...userDetail,
                      contact_number: e.target.value,
                    })
                  }}
                  value={userDetail.contact_number}
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
                    value={userDetail.birthDay}
                    onChange={e => {
                      setUserDetail({ ...userDetail, birthDay: e })
                    }}
                    renderInput={params => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
            </Box>

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

      <Dialog open={successDialog} onClose={() => setSuccessDialog(false)}>
        <Box className="successdialog">
          <Box className="drawdownsuccessellipse">
            <Box>
              <CheckCircleIcon />
            </Box>
          </Box>
          <DialogContent>
            <DialogContentText className="successful">
              Staff Edited Successful.
            </DialogContentText>
            <DialogContentText className="successfulmessage">
              <Button onClick={() => navigate('/staff')} variant="outlined">
                Ok
              </Button>
            </DialogContentText>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  )
}

export default EditStaff
