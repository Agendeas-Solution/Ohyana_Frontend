import React, { useEffect, useState, useContext } from 'react'
import {
  Box,
  TextField,
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Autocomplete,
  createFilterOptions,
} from '@mui/material'
import './index.css'
import {
  AddClientDetail,
  EditClientDetail,
} from '../../services/apiservices/adminprofile'
import { useNavigate } from 'react-router-dom'
import { GetAdminClientProfileDetail } from '../../services/apiservices/clientDetail'
import { Context as ContextSnackbar } from '../../context/pageContext'
import Uploader from '../Uploader/Uploader'
import {
  GetCityByStates,
  GetCountryList,
  GetStateByCountry,
} from '../../services/apiservices/country-state-city'
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
  const [imageUrl, setImageUrl] = useState(null)
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
        err => {},
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
            setImageUrl(res?.data?.imageUrl)
          }
        },
        err => {},
      )
    GetCountryList(
      {},
      res => {
        if (res) {
          setCountryList(res)
        }
      },
      err => {},
    )
  }, [])

  const handleAddClient = () => {
    if (
      userDetail.clientName !== '' &&
      (userDetail.email || userDetail.contactNo) &&
      userDetail.reference &&
      userDetail.referenceName &&
      userDetail.state &&
      userDetail.city &&
      userDetail?.country
    ) {
      const data = new FormData()
      data.append('name', userDetail.clientName)
      data.append('email', userDetail.email)
      data.append('reference', userDetail.reference)
      data.append('business', userDetail.business)
      data.append('contact_number', userDetail.contactNo)
      data.append('state', userDetail.state.name)
      data.append('city', userDetail.city.name)
      data.append('city_id', userDetail.city.id)
      data.append('state_id', userDetail.state.id)
      data.append('state_iso2', userDetail.state.iso2)
      data.append('country', userDetail.country.name)
      data.append('country_id', userDetail.country.id)
      data.append('country_iso2', userDetail.country.iso2)
      data.append('address', userDetail.address)
      data.append('max_invesment_amount', userDetail.max_invesment_amount)
      data.append('reference_name', userDetail.referenceName)
      if (typeof imageUrl !== 'string') {
        data.append('customer_image', imageUrl)
      }
      let path = window.location.pathname
      path = path.split('/').pop()
      {
        parseInt(path)
          ? EditClientDetail(
              path,
              data,
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
              data,
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

  return (
    <>
      <Box className="main_section" sx={{ overflow: 'hidden', padding: '0px' }}>
        <Box className="pofile_edit_section">
          <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
          <Box className="edit_profile_detail_section">
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
            {/* Email && Country*/}
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
              <Autocomplete
                className="input_fields"
                disablePortal
                disableClearable
                options={countryList}
                value={userDetail?.country}
                onChange={(e, value) => {
                  setUserDetail({ ...userDetail, country: value })
                }}
                getOptionLabel={option => option?.name}
                renderInput={params => (
                  <TextField {...params} label="Select Country" />
                )}
              />
            </Box>
            {/* Address && State*/}
            <Box className="input_field_row">
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
                renderInput={params => (
                  <TextField {...params} label=" Select State" />
                )}
              />
            </Box>
            {/* Reference && City */}
            <Box className="input_field_row">
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
                renderInput={params => (
                  <TextField {...params} label="Select City" />
                )}
              />
            </Box>
            {/* Reference Name */}
            <Box className="input_field_row">
              {userDetail.reference === 'OTHER' && (
                <Box className="input_fields">
                  <TextField
                    className="reference_field"
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
                      className="reference_field"
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
    </>
  )
}

export default AddClient
