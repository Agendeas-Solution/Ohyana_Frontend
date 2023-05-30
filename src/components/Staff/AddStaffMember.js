import React, { useEffect, useState, useContext } from 'react'
import {
  Box,
  TextField,
  InputLabel,
  FormControl,
  Button,
  Select,
  MenuItem,
  Autocomplete,
  createFilterOptions,
  InputAdornment,
} from '@mui/material'
import { GetAdminRole } from '../../services/apiservices/adminprofile'
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
import Uploader from '../Uploader/Uploader'
import { GetState } from '../../services/apiservices/country-state-city'
import { SentOtp, VerifyOTP } from '../../services/apiservices/register'
const ErrorSnackbar = React.lazy(() => import('../ErrorSnackbar/ErrorSnackbar'))

const AddStaffMember = () => {
  const [userDetail, setUserDetail] = useState({
    employeeName: '',
    email: '',
    jobRole: '',
    contactNo: '',
    gender: '',
    birthDate: null,
    state: null,
    jobType: '',
  })
  const [stateList, setStateList] = useState([])
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const [employeeJobRole, setEmployeeJobRole] = useState([])
  const [imageUrl, setImageUrl] = useState(null)
  let path = window.location.pathname
  path = path.split('/').pop()
  const navigate = useNavigate()
  const handleChange = prop => event => {
    setUserDetail({ ...userDetail, [prop]: event.target.value })
  }
  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: option => option?.name,
  })
  const [otpValue, setOtpValue] = useState({
    value: null,
    emailVerifyStatus: false,
    otpVerifyStatus: false,
  })
  useEffect(() => {
    GetState(
      {},
      res => {
        setStateList(res)
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
        err => {},
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
              employeeName: res?.data?.name,
              contactNo: res.data.contact_number,
              jobRole: res.data.role.id,
              email: res.data.email,
              birthDate: res.data.birthDay,
              gender: res.data.gender,
              state: {
                name: res?.data?.state,
                id: res?.data?.state_id,
                iso2: res?.data?.state_iso2,
              },
              jobType: res.data.jobType,
              id: res.data.id,
            })
            setImageUrl(res?.data?.imgUrl)
          }
        },
        err => {},
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
      userDetail.state &&
      userDetail.jobType !== ''
    ) {
      const employeeDetail = new FormData()
      employeeDetail.append('name', userDetail.employeeName)
      employeeDetail.append('email', userDetail.email)
      employeeDetail.append('roleId', userDetail.jobRole)
      if (typeof imageUrl !== 'string' && imageUrl) {
        employeeDetail.append('profile_image', imageUrl)
      }
      employeeDetail.append('contact_number', userDetail.contactNo)
      employeeDetail.append('gender', userDetail.gender)
      employeeDetail.append('birthDay', userDetail.birthDate)
      employeeDetail.append('state', userDetail.state.name)
      employeeDetail.append('state_id', userDetail.state.id)
      employeeDetail.append('state_iso2', userDetail.state.iso2)
      employeeDetail.append('jobType', userDetail.jobType)
      if (parseInt(path)) {
        employeeDetail.append('id', userDetail.id)
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
    }
  }
  const handleSentOtp = () => {
    SentOtp(
      { email: userDetail?.email },
      res => {
        if (res.success) {
          setOtpValue({
            ...otpValue,
            emailVerifyStatus: true,
          })
          setSuccessSnackbar({
            ...successSnackbar,
            status: true,
            message: res.message,
          })
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
  }
  const handleOtp = () => {
    VerifyOTP(
      { email: userDetail?.email, otp: otpValue.value },
      res => {
        setOtpValue({
          ...otpValue,
          otpVerifyStatus: true,
        })
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
  return (
    <>
      <Box className="main_section">
        <Box className="pofile_edit_section">
          <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
          <Box className="edit_profile_detail_section">
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
            <Box className="input_field_row">
              <Box className="input_fields">
                <TextField
                  label="Email"
                  type={'email'}
                  value={userDetail?.email}
                  onChange={e => {
                    setUserDetail({ ...userDetail, email: e.target.value })
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {!parseInt(path) && (
                          <Button
                            sx={{
                              margin: '0px',
                              backgroundColor: '#2E3591',
                              boxShadow: 'none',
                            }}
                            variant="contained"
                            onClick={handleSentOtp}
                          >
                            Send Otp
                          </Button>
                        )}
                      </InputAdornment>
                    ),
                  }}
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
              {otpValue.emailVerifyStatus && (
                <Box className="otp_input_field">
                  <TextField
                    label="Otp"
                    type={'number'}
                    value={otpValue?.value}
                    onChange={e => {
                      setOtpValue({
                        ...otpValue,
                        value: parseInt(e.target.value),
                      })
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            sx={{
                              margin: '0px',
                              backgroundColor: '#2E3591',
                              boxShadow: 'none',
                            }}
                            variant="contained"
                            onClick={handleOtp}
                          >
                            Verify
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              )}
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
              <Autocomplete
                className="input_fields"
                options={stateList}
                disableClearable
                filterOptions={filterOptions}
                value={userDetail.state}
                getOptionLabel={option => option.name}
                onChange={(e, value) => {
                  setUserDetail({ ...userDetail, state: value })
                }}
                renderInput={params => <TextField {...params} label="State" />}
              />
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
                    label="Select Birth Date"
                    inputFormat="dd/MM/yyyy"
                    value={userDetail.birthDate}
                    onChange={e => {
                      setUserDetail({ ...userDetail, birthDate: e })
                    }}
                    renderInput={params => <TextField {...params} />}
                    PopperProps={{
                      placement: 'bottom-start',
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Box>

            <Button
              disabled={
                !otpValue.otpVerifyStatus && !parseInt(path) ? true : false
              }
              onClick={handleAddEmployee}
              variant="contained"
              sx={{ width: '30%', color: 'white !important' }}
              className={
                otpValue.otpVerifyStatus && !parseInt(path)
                  ? 'edit_page_save_button'
                  : 'disable_page_save_button'
              }
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
