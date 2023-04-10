import React, { useEffect, useState } from 'react'
import {
  Typography,
  Box,
  TextField,
  Button,
  Select,
  MenuItem, FormControl, InputLabel
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
const EditStaff = () => {
  const [userDetail, setUserDetail] = useState({
    name: "",
    contact_number: "",
    roleId: "",
    email: '',
    birthDay: '',
    gender: "",
    state: '',
    jobType: '',
    id: ''
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
      err => { },
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
            id: res.data.id
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
        err => { },
      )
    } else {
      console.log(userDetail)
    }
  }
  return (
    <>
      {/* <Box className="edit_profile_section">
        <Box className="input_field_row">
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Employee Name<span className="required_star">*</span>
            </Typography>
            <TextField
              autoComplete="off"
              placeholder="Employee Name"
              onChange={e => {
                setUserDetail({ ...userDetail, employeeName: e.target.value })
              }}
              value={userDetail.employeeName}
              variant="outlined"
            />
          </Box>
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Department<span className="required_star">*</span>
            </Typography>
            <Select
              value={userDetail?.departmentId}
              onChange={e => {
                setUserDetail({ ...userDetail, departmentId: e.target.value })
              }}
            >
              {departmentList &&
                departmentList.map(data => {
                  return <MenuItem value={data?.id}>{data?.name}</MenuItem>
                })}
            </Select>
          </Box>
        </Box>
        <Box className="input_field_row">
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Contact No:<span className="required_star">*</span>
            </Typography>
            <TextField
              placeholder="Contact No"
              onChange={e => {
                setUserDetail({ ...userDetail, contact_number: e.target.value })
              }}
              value={userDetail.contact_number}
              variant="outlined"
            />
          </Box>
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Job Role<span className="required_star">*</span>
            </Typography>
            <Select
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
          </Box>
        </Box>
        <Box className="input_field_row">
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Email<span className="required_star">*</span>
            </Typography>
            <TextField
              autoComplete="off"
              placeholder="Enter Email"
              onChange={e => {
                setUserDetail({ ...userDetail, email: e.target.value })
              }}
              value={userDetail.email}
              variant="outlined"
            />
          </Box>
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              birthDay<span className="required_star">*</span>
            </Typography>
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
        <Box className="input_field_row">
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Password<span className="required_star">*</span>
            </Typography>
            <OutlinedInput
              type={userDetail.showPassword ? 'text' : 'password'}
              value={userDetail.password}
              onChange={handleChange('password')}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {userDetail.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Confirm Password<span className="required_star">*</span>
            </Typography>
            <OutlinedInput
              type={userDetail.showPassword ? 'text' : 'password'}
              value={userDetail.confirmpassword}
              onChange={handleChange('confirmpassword')}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {userDetail.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
        </Box>
        <Box className="input_field_row">
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Gender<span className="required_star">*</span>
            </Typography>
            <Select
              value={userDetail?.gender}
              onChange={e => {
                setUserDetail({ ...userDetail, gender: e.target.value })
              }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </Box>
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              City<span className="required_star">*</span>
            </Typography>
            <TextField
              autoComplete="off"
              placeholder="Enter City"
              onChange={e => {
                setUserDetail({ ...userDetail, city: e.target.value })
              }}
              value={userDetail?.city}
              variant="outlined"
            />
          </Box>
        </Box>
        <Box className="input_field_row">
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              State<span className="required_star">*</span>
            </Typography>
            <TextField
              autoComplete="off"
              placeholder="Enter State"
              onChange={e => {
                setUserDetail({ ...userDetail, state: e.target.value })
              }}
              value={userDetail?.state}
              variant="outlined"
            />
          </Box>
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              PinCode<span className="required_star">*</span>
            </Typography>
            <TextField
              autoComplete="off"
              placeholder="Enter PinCode"
              onChange={e => {
                setUserDetail({ ...userDetail, pincode: e.target.value })
              }}
              value={userDetail.pincode}
              variant="outlined"
            />
          </Box>
        </Box>
        <Box sx={{ justifyContent: 'flex-start' }} className="input_field_row">
          <Button
            onClick={handleAddEmployee}
            variant="contained"
            className="edit_page_save_button"
          >
            Save
          </Button>
        </Box>
      </Box> */}

      <Box className="main_section">
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
                <MenuItem value="0">Office</MenuItem>
                <MenuItem value="1">On Field</MenuItem>
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
                label='Select Job Role'
                value={userDetail?.roleId}
                onChange={e => {
                  setUserDetail({ ...userDetail, roleId: e.target.value })
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
                setUserDetail({ ...userDetail, contact_number: e.target.value })
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

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}
          className="input_field_row">
          <Button
            onClick={handleAddEmployee}
            variant="contained"
            className="edit_page_save_button"
          >
            Save
          </Button>
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
