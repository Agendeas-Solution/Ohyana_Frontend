import React, { useEffect, useState, useContext, lazy, useRef } from 'react'
import {
  Box,
  TextField,
  InputLabel,
  FormControl,
  Button,
  Select,
  MenuItem,
  Input,
  Paper,
  Typography,
} from '@mui/material'
import { Form, useNavigate } from 'react-router-dom'
import './index.css'
import {
  EditAdminProfile,
  GetAdminProfile,
} from '../../services/apiservices/adminprofile'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Context as ContextSnackbar } from '../../context/pageContext'
import Uploader from '../Uploader/Uploader'
import moment from 'moment'

const ErrorSnackbar = React.lazy(() => import('../ErrorSnackbar/ErrorSnackbar'))

const EditProfile = () => {
  const inputFile = useRef(null)
  const [userDetail, setUserDetail] = useState({
    employeeName: '',
    email: '',
    contactNo: '',
    gender: '',
    birthDate: moment().format('LL'),
  })
  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const navigate = useNavigate()
  useEffect(() => {
    GetAdminProfile(
      {},
      res => {
        if (res?.success) {
          setUserDetail({
            ...userDetail,
            employeeName: res?.data.name,
            email: res?.data.email,
            contactNo: res?.data?.contact_number,
            gender: res?.data.gender,
            birthDate: res?.data.birthDay,
          })
          setImageUrl(res?.data?.imgUrl)
        }
      },
      err => {
        console.log(err)
      },
    )
  }, [])
  const SaveProfile = () => {
    const data = new FormData()
    console.log(typeof imageUrl)
    if (typeof imageUrl !== 'string') {
      data.append('profile_image', imageUrl)
    }
    data.append('name', userDetail.employeeName)
    data.append('email', userDetail.email)
    data.append('contact_number', userDetail.contactNo)
    data.append('gender', userDetail.gender)
    data.append('birthDay', userDetail.birthDate)
    EditAdminProfile(
      data,
      res => {
        if (res.success) {
          setSuccessSnackbar({
            ...successSnackbar,
            status: true,
            message: 'Profile Edited Successfully',
          })
          navigate('/profile')
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
  const [state, setState] = useState('')
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
                  autoComplete="off"
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
            <Box className="input_field_row">
              <Box className="input_fields">
                <TextField
                  label="Email"
                  autoComplete="off"
                  onChange={e => {
                    setUserDetail({ ...userDetail, email: e.target.value })
                  }}
                  value={userDetail.email}
                  variant="outlined"
                />
              </Box>
              <Box className="input_fields">
                <TextField
                  label="Contact No"
                  type="number"
                  autoComplete="off"
                  onChange={e => {
                    setUserDetail({
                      ...userDetail,
                      contactNo: e.target.value,
                    })
                  }}
                  value={userDetail.contactNo}
                  variant="outlined"
                />
              </Box>
            </Box>
            <Box className="input_fields" sx={{ width: '50%' }}>
              <FormControl>
                <InputLabel>Select Gender</InputLabel>
                <Select
                  label="Select Gender"
                  value={userDetail.gender}
                  onChange={e => {
                    setUserDetail({ ...userDetail, gender: e.target.value })
                  }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Female</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              className="edit_page_save_button"
              onClick={SaveProfile}
              variant="contained"
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

export default EditProfile
