import React, { useEffect, useState, useContext, lazy, useRef } from 'react'
import { makeStyles } from '@mui/styles'
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
import ProfileImage from '../../assets/img/Profile_Image.svg'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
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
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded'
import { PhotoCamera } from '@mui/icons-material'
import image from '../../assets/img/profile_icon.svg'
import moment from 'moment'

const ErrorSnackbar = React.lazy(() => import('../ErrorSnackbar/ErrorSnackbar'))
const SuccessSnackbar = React.lazy(() =>
  import('../SuccessSnackbar/SuccessSnackbar'),
)

const useStyles = makeStyles({})
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
        }
      },
      err => {
        console.log(err)
      },
    )
  }, [])
  const handleChange = prop => event => {
    setUserDetail({ ...userDetail, [prop]: event.target.value })
  }
  const SaveProfile = () => {
    let data = {
      name: userDetail.employeeName,
      email: userDetail.email,
      contact_number: userDetail.contactNo,
      gender: userDetail.gender,
      birthDay: userDetail.birthDate,
    }
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

  const onButtonClick = () => {
    inputFile.current.click()
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(selectedFile)
    reader.onload = () => {
      setFile(reader.result)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData()
    formData.append('profileImage', file)
    const response = await fetch('/api/profile', {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    console.log(data)
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
          {/* ORIGINAL UPLOAD IMG */}
          {/* <Box ref={inputFile} className="my_profile_image_section">
            <img className="image_style" src={ProfileImage} alt="profile" />
            <form className="inner_icon_style" onSubmit={handleSubmit}>
              <CameraAltRoundedIcon fontSize="large" color="white" />
            </form>
          </Box> */}

          {/* PRE-FINAL SOLUTION */}
          {/* <Paper className="my_profile_upload_image">
            <Box className="my_profile_image_section">
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
          </Paper> */}

          <Uploader />

          {/* <AccountCircleRoundedIcon className="user_profile_icon" /> */}
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
                      placement: 'bottom-start', // Set placement to 'bottom-start'
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
