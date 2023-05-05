import React, { useEffect, useState, useContext, lazy } from 'react'
import {
  Typography,
  Box,
  TextField,
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Autocomplete,
  createTheme,
  ThemeProvider,
  Paper,
  createFilterOptions,
} from '@mui/material'
import './index.css'
import { makeStyles } from '@mui/styles'

import {
  GetAdminProductList,
  AddClientDetail,
  EditClientDetail,
} from '../../services/apiservices/adminprofile'
import { useNavigate } from 'react-router-dom'
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded'
import image from '../../assets/img/profile_icon.svg'

import { GetAdminClientProfileDetail } from '../../services/apiservices/clientDetail'
import { Context as ContextSnackbar } from '../../context/pageContext'
import ProfileImage from '../../assets/img/Profile_Image.svg'
import Uploader from '../Uploader/Uploader'
import { PhotoCamera } from '@mui/icons-material'
import {
  GetCityByStates,
  GetCountryList,
  GetStateByCountry,
} from '../../services/apiservices/country-state-city'
import { GetCity } from '../../services/apiservices/country-state-city'
// const ErrorSnackbar = lazy(() => import('../ErrorSnackbar/ErrorSnackbar'))
const useStyles = makeStyles({})

const AddClient = () => {
  const [userDetail, setUserDetail] = useState({
    clientName: '',
    reference: '',
    email: '',
    contactNo: '',
    inquiryfor: '',
    max_invesment_amount: '',
    address: '',
    state: null,
    city: null,
    country: null,
    business: '',
    referenceName: '',
  })
  const [countryList, setCountryList] = useState([])
  const [stateList, setStateList] = useState([])
  const [cityList, setCityList] = useState([])
  const navigate = useNavigate()
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const handleChange = prop => event => {
    setUserDetail({ ...userDetail, [prop]: event.target.value })
  }
  let path = window.location.pathname
  path = path.split('/').pop()
  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: option => option?.name,
  })
  useEffect(() => {
    let data = userDetail?.country?.iso2
    userDetail?.country &&
      GetStateByCountry(
        data,
        res => {
          setStateList(res)
        },
        err => {
          setErrorSnackbar({
            ...errorSnackbar,
            status: true,
            message: err?.response?.data?.message,
          })
        },
      )
  }, [userDetail?.country])
  useEffect(() => {
    let data = userDetail?.state?.iso2
      ? `${userDetail?.country?.iso2}/states/${userDetail?.state?.iso2}/cities`
      : ''
    userDetail?.state &&
      GetCityByStates(
        data,
        res => {
          const uniqueCity = res.reduce((acc, current) => {
            const x = acc.find(item => item.name === current.name)
            if (!x) {
              return acc.concat([current])
            } else {
              return acc
            }
          }, [])
          setCityList(uniqueCity)
        },
        err => {
          setErrorSnackbar({
            ...errorSnackbar,
            status: true,
            message: err?.response?.data?.message,
          })
        },
      )
  }, [userDetail?.state])
  useEffect(() => {
    parseInt(path) &&
      GetAdminClientProfileDetail(
        parseInt(path),
        {},
        res => {
          if (res.success) {
            setUserDetail({
              ...userDetail,
              clientName: res.data.name,
              reference: res.data.reference,
              email: res.data?.email,
              max_invesment_amount: res.data?.max_invesment_amount,
              contactNo: res.data?.contact_number,
              state: {
                id: res.data.state_id,
                name: res.data.state,
                iso2: res.data.state_iso2,
              },
              city: { id: res.data.city_id, name: res.data.city },
              country: {
                id: res.data.country_id,
                name: res.data.country,
                iso2: res.data.country_iso2,
              },
              address: res.data?.address,
              business: res.data?.business,
              referenceName: res.data?.reference_name,
            })
          }
        },
        err => {
          setErrorSnackbar({
            ...errorSnackbar,
            status: true,
            message: err?.response?.data?.message,
          })
        },
      )
    GetCountryList(
      {},
      res => {
        if (res) {
          setCountryList(res)
        }
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }, [])

  const handleAddClient = () => {
    console.log('Printing UserDetail', userDetail)
    debugger
    if (
      userDetail.clientName !== '' &&
      (userDetail.email || userDetail.contactNo) &&
      userDetail.reference &&
      userDetail.referenceName &&
      userDetail.state &&
      userDetail.city &&
      userDetail?.country
    ) {
      let clientDetail = {
        name: userDetail.clientName,
        email: userDetail?.email,
        reference: userDetail.reference,
        business: userDetail.business,
        contact_number: userDetail.contactNo,
        state: userDetail.state.name,
        city: userDetail.city.name,
        city_id: userDetail.city.id,
        state_id: userDetail.state.id,
        state_iso2: userDetail.state.iso2,
        country: userDetail.country.name,
        country_id: userDetail.country.id,
        country_iso2: userDetail.country.iso2,
        address: userDetail.address,
        max_invesment_amount: userDetail.max_invesment_amount,
        reference_name: userDetail?.referenceName,
      }
      debugger
      let path = window.location.pathname
      path = path.split('/').pop()
      {
        parseInt(path)
          ? EditClientDetail(
              path,
              clientDetail,
              res => {
                if (res.success) {
                  navigate(`/clientprofile/${path}`)
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
                  message: err?.response?.data?.message,
                })
              },
            )
          : AddClientDetail(
              clientDetail,
              res => {
                navigate('/client')
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
      setErrorSnackbar({
        ...errorSnackbar,
        status: true,
        message: 'Please Fill Require Fields',
      })
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
      <Box className="main_section" sx={{ overflow: 'hidden', padding: '0px' }}>
        <Box className="pofile_edit_section">
          {/* <Box className="edit_my_profile_image_section">
            <img src={ProfileImage} alt="profile" />
            <Box className="inner_icon_style">
              <CameraAltRoundedIcon fontSize="large" />
            </Box>
          </Box> */}

          {/* FINAL */}
          {/* <Paper className="my_profile_upload_image">
            <Box className="edit_myy_profile_image_section">
              <input
                type="file"
                accept="image/*"
                name="image"
                id="file"
                onChange={loadFile}
                style={{ display: 'none', background: 'red' }}
              />
              <img
                className="image_style"
                src={state ? state : image}
                // className={classes.image}
                id="output"
                // width="70"
                // height="70"
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

          <Box className="edit_profile_detail_section">
            {/* Client Name &&  Business Name*/}
            <Box className="input_field_row">
              <Box className="input_fields">
                <TextField
                  label="Client Name"
                  onChange={e => {
                    setUserDetail({ ...userDetail, clientName: e.target.value })
                  }}
                  value={userDetail.clientName}
                  variant="outlined"
                />
              </Box>

              <Box className="input_fields">
                <TextField
                  label="Business Name"
                  onChange={e => {
                    setUserDetail({ ...userDetail, business: e.target.value })
                  }}
                  value={userDetail.business}
                  variant="outlined"
                />
              </Box>
            </Box>

            {/* Contact No. &&  Investment Scale*/}
            <Box className="input_field_row">
              <Box className="input_fields">
                <TextField
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
                  label="Investment Scale"
                  onChange={e => {
                    setUserDetail({
                      ...userDetail,
                      max_invesment_amount: e.target.value,
                    })
                  }}
                  value={userDetail.max_invesment_amount}
                  variant="outlined"
                />
              </Box>
            </Box>

            {/* Email && Address*/}
            <Box className="input_field_row">
              <Box className="input_fields">
                <TextField
                  label="Email"
                  onChange={e => {
                    setUserDetail({ ...userDetail, email: e.target.value })
                  }}
                  value={userDetail.email}
                  variant="outlined"
                />
              </Box>
              <Box className="input_fields">
                <TextField
                  autocomplete="off"
                  label="Address"
                  onChange={e => {
                    setUserDetail({ ...userDetail, address: e.target.value })
                  }}
                  value={userDetail.address}
                  variant="outlined"
                />
              </Box>
            </Box>
            <Box className="input_field_row">
              {/* <Box className="input_fields">
                <FormControl>
                  <InputLabel>Client Type</InputLabel>
                  <Select
                    label="Client Type"
                    value={userDetail.clientType}
                    onChange={e => {
                      setUserDetail({
                        ...userDetail,
                        clientType: e.target.value,
                      })
                    }}
                  >
                    <MenuItem value="true">Domestic</MenuItem>
                    <MenuItem value="false">International</MenuItem>
                  </Select>
                </FormControl>
              </Box> */}
              <Autocomplete
                className="input_fields"
                disablePortal
                disableClearable
                options={countryList}
                value={userDetail?.country}
                onChange={(e, value) => {
                  setUserDetail({ ...userDetail, country: value })
                  debugger
                }}
                getOptionLabel={option => option?.name}
                renderInput={params => (
                  <TextField {...params} label="Select Country" />
                )}
              />
              <Autocomplete
                className="input_fields"
                options={stateList}
                disableClearable
                disabled={!userDetail?.country}
                filterOptions={filterOptions}
                value={userDetail.state}
                getOptionLabel={option => option.name}
                onChange={(e, value) => {
                  setUserDetail({ ...userDetail, state: value })
                }}
                renderInput={params => <TextField {...params} label="State" />}
              />
            </Box>
            <Box className="input_field_row">
              <Autocomplete
                className="input_fields"
                options={cityList}
                disableClearable
                disabled={!userDetail?.state}
                filterOptions={filterOptions}
                value={userDetail.city}
                getOptionLabel={option => option.name}
                onChange={(e, value) => {
                  setUserDetail({ ...userDetail, city: value })
                }}
                renderInput={params => <TextField {...params} label="City" />}
              />
              <Box className="input_fields">
                <FormControl>
                  <InputLabel>Reference</InputLabel>
                  <Select
                    label="Reference"
                    value={userDetail.reference}
                    onChange={e => {
                      setUserDetail({
                        ...userDetail,
                        reference: e.target.value,
                        referenceName: '',
                      })
                    }}
                  >
                    <MenuItem value="DIGITAL">Digital</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {userDetail.reference === 'OTHER' && (
                <Box className="input_fields">
                  <TextField
                    label="Reference Name"
                    onChange={e => {
                      setUserDetail({
                        ...userDetail,
                        referenceName: e.target.value,
                      })
                    }}
                    value={userDetail.referenceName}
                    variant="outlined"
                  />
                </Box>
              )}
              {userDetail.reference === 'DIGITAL' && (
                <Box className="input_fields">
                  <FormControl>
                    <InputLabel>Reference Name</InputLabel>
                    <Select
                      label="Reference"
                      value={userDetail.referenceName}
                      onChange={e => {
                        setUserDetail({
                          ...userDetail,
                          referenceName: e.target.value,
                        })
                      }}
                    >
                      <MenuItem value="INDIAMART">IndiaMart</MenuItem>
                      <MenuItem value="WEBSITE">Website</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              )}
            </Box>

            <Button
              onClick={handleAddClient}
              variant="contained"
              className="edit_page_save_button"
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
      {/* <ErrorSnackbar /> */}
    </>
  )
}

export default AddClient
