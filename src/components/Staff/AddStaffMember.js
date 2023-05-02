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
  Paper,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import {
  GetAdminDepartmentList,
  GetAdminRole,
} from '../../services/apiservices/adminprofile'
import {
  AddEmployee,
  EditEmployee,
  GetAdminStaffProfileDetail,
} from '../../services/apiservices/staffDetail'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useNavigate } from 'react-router-dom'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { TEAM } from '../../constants'
import image from '../../assets/img/profile_icon.svg'
import { PhotoCamera } from '@mui/icons-material'

const ErrorSnackbar = React.lazy(() => import('../ErrorSnackbar/ErrorSnackbar'))
const useStyles = makeStyles({})

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
  })
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const [employeeJobRole, setEmployeeJobRole] = useState([])
  let path = window.location.pathname
  path = path.split('/').pop()
  const navigate = useNavigate()
  const handleChange = prop => event => {
    setUserDetail({ ...userDetail, [prop]: event.target.value })
  }

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

  useEffect(() => {
    parseInt(path) &&
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
  const handleAddEmployee = () => {
    if (
      userDetail.employeeName !== '' &&
      userDetail.email !== '' &&
      userDetail.jobRole !== '' &&
      userDetail.contactNo &&
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
      }
      if (parseInt(path)) {
        employeeDetail['id'] = userDetail.id
      }
      {
        parseInt(path)
          ? EditEmployee(
              employeeDetail,
              res => {
                if (res.success) {
                  setSuccessSnackbar({
                    ...successSnackbar,
                    status: true,
                    message: res.message,
                  })
                  navigate('/staff')
                }
              },

              err => {
                setErrorSnackbar({
                  ...errorSnackbar,
                  status: true,
                  message: err.response.data.message,
                })
              },
            )
          : AddEmployee(
              employeeDetail,
              res => {
                navigate('/staff')
                setSuccessSnackbar({
                  ...successSnackbar,
                  status: true,
                  message: res.message,
                })
              },
              err => {
                setErrorSnackbar({
                  ...errorSnackbar,
                  status: true,
                  message: err.response.data.message,
                })
              },
            )
      }
    } else {
      console.log(userDetail)
    }
  }

  const [state, setState] = useState('')
  const classes = useStyles()
  const loadFile = event => {
    if (event.target.files) {
      setState(URL.createObjectURL(event.target.files[0]))
      console.log(URL.createObjectURL(event.target.files[0]))
    }
  }

  return (
    <>
      <Box className="main_section">
        <Box className="pofile_edit_section">
          {/* <Box className="edit_my_profile_image_section">
            <img src={ProfileImage} alt="profile" />
            <Button className="common_button">
              <Uploader />
            </Button>
          </Box> */}
          <Paper className="my_profile_upload_image">
            <Box className="edit_myy_profile_image_section">
              <input
                type="file"
                accept="image/*"
                name="image"
                id="file"
                onChange={loadFile}
                style={{ display: 'none' }}
              />
              <img
                className="image_style"
                src={state ? state : image}
                // className={classes.image}
                id="output"
                width="130"
                height="130"
                alt="test"
              />
              <Box className="inner_icon_style">
                <label htmlFor="file" style={{ cursor: 'pointer' }}>
                  <PhotoCamera />
                </label>
              </Box>
            </Box>
          </Paper>

          <Box className="edit_profile_detail_section">
            {/* Employee Name && Select job type */}
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
                  <InputLabel>Select Job Role</InputLabel>
                  <Select
                    label="Select Job Role"
                    value={userDetail?.jobRole}
                    onChange={e => {
                      setUserDetail({ ...userDetail, jobRole: e.target.value })
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
                  type="tel"
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

            {/* Password*/}
            {/* <Box className="input_field_row" sx={{ width: '50%' }}>
              <Box className="input_fields">
                <TextField
                  autoComplete="off"
                  label="Password"
                  onChange={e => {
                    setUserDetail({ ...userDetail, password: e.target.value })
                  }}
                  type="password"
                  value={userDetail.password}
                  variant="outlined"
                />
              </Box>
            </Box> */}

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
