import React, { useEffect, useState, useContext } from 'react'
import {
  Box,
  TextField,
  Autocomplete,
  Button,
  createFilterOptions,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './index.css'
import {
  GetCompanyProfile,
  editCompanyProfile,
} from '../../services/apiservices/companyprofile'
import { Context as ContextSnackbar } from '../../context/pageContext'
import Uploader from '../Uploader/Uploader'
import {
  GetCityByStates,
  GetCountryList,
  GetStateByCountry,
} from '../../services/apiservices/country-state-city'
const EditCompanyProfile = () => {
  const [companyDetail, setCompanyDetail] = useState({
    companyName: '',
    email: '',
    state: null,
    crmKey: '',
    businessType: '',
    city: null,
    country: null,
  })
  const [countryList, setCountryList] = useState([])
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const [imageUrl, setImageUrl] = useState(null)
  const [cityList, setCityList] = useState([])
  const [stateList, setStateList] = useState([])
  const navigate = useNavigate()
  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: option => option?.name,
  })
  useEffect(() => {
    let data = companyDetail?.country?.iso2
    companyDetail?.country &&
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
  }, [companyDetail?.country])
  useEffect(() => {
    let data = companyDetail?.state?.iso2
      ? `${companyDetail?.country?.iso2}/states/${companyDetail?.state?.iso2}/cities`
      : ''
    companyDetail?.state &&
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
          setCityList([])
          setErrorSnackbar({
            ...errorSnackbar,
            status: true,
            message: err?.response?.data?.message,
          })
        },
      )
  }, [companyDetail?.state])
  useEffect(() => {
    GetCompanyProfile(
      {},
      res => {
        if (res?.success) {
          setCompanyDetail({
            ...companyDetail,
            companyName: res.data?.name,
            email: res.data?.email,
            crmKey: res.data?.crmKey,
            businessType: res.data?.businessType,
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
          })
          setImageUrl(res.data.logoUrl)
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

  const SaveProfile = () => {
    const data = new FormData()
    data.append('name', companyDetail.companyName)
    data.append('email', companyDetail.email)
    data.append('crmKey', companyDetail.crmKey)
    if (typeof imageUrl !== 'string') {
      data.append('logo_image', imageUrl)
    }
    data.append('state', companyDetail.state.name)
    data.append('city', companyDetail.city.name)
    data.append('city_id', companyDetail.city.id)
    data.append('state_id', companyDetail.state.id)
    data.append('state_iso2', companyDetail.state.iso2)
    data.append('country', companyDetail.country.name)
    data.append('country_id', companyDetail.country.id)
    data.append('country_iso2', companyDetail.country.iso2)
    editCompanyProfile(
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

  return (
    <>
      <Box className="main_section">
        <Box className="pofile_edit_section">
          <Box className="edit_my_profile_image_section">
            <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </Box>
          <Box className="edit_profile_detail_section">
            {/* Company Name &&  City */}
            <Box className="input_field_row">
              <Box className="input_fields">
                <TextField
                  label="Company Name"
                  onChange={e => {
                    setCompanyDetail({
                      ...companyDetail,
                      companyName: e.target.value,
                    })
                  }}
                  value={companyDetail.companyName}
                  variant="outlined"
                />
              </Box>
              <Box className="input_fields">
                <TextField
                  label="Email"
                  autoComplete="false"
                  onChange={e => {
                    setCompanyDetail({
                      ...companyDetail,
                      email: e.target.value,
                    })
                  }}
                  value={companyDetail.email}
                  variant="outlined"
                />
              </Box>
            </Box>
            {/* Email &&  State */}
            <Box className="input_field_row">
              <Autocomplete
                className="input_fields"
                disablePortal
                disableClearable
                options={countryList}
                value={companyDetail?.country}
                onChange={(e, value) => {
                  setCompanyDetail({ ...companyDetail, country: value })
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
                disabled={!companyDetail?.country}
                filterOptions={filterOptions}
                value={companyDetail.state}
                getOptionLabel={option => option.name}
                onChange={(e, value) => {
                  setCompanyDetail({ ...companyDetail, state: value })
                }}
                renderInput={params => (
                  <TextField {...params} label=" Select State" />
                )}
              />
            </Box>
            {/* Business Type &&  Country */}
            <Box className="input_field_row">
              <Autocomplete
                className="input_fields"
                options={cityList}
                disableClearable
                disabled={!companyDetail?.state}
                filterOptions={filterOptions}
                value={companyDetail?.city}
                getOptionLabel={option => option.name}
                onChange={(e, value) => {
                  setCompanyDetail({ ...companyDetail, city: value })
                }}
                renderInput={params => (
                  <TextField {...params} label="Select City" />
                )}
              />
              <Box className="input_fields">
                <TextField
                  label="Business Type"
                  autoComplete={false}
                  onChange={e => {
                    setCompanyDetail({
                      ...companyDetail,
                      businessType: e.target.value,
                    })
                  }}
                  value={companyDetail.businessType}
                  variant="outlined"
                />
              </Box>
            </Box>
            {/* CRM Key*/}
            <Box className="input_field_row" sx={{ width: '50%' }}>
              <Box className="input_fields">
                <TextField
                  id="outlined-textarea"
                  multiline
                  placeholder="CRM Key"
                  autoComplete="off"
                  label="CRM Key"
                  minRows={3}
                  maxRows={3}
                  onChange={e => {
                    setCompanyDetail({
                      ...companyDetail,
                      crmKey: e.target.value,
                    })
                  }}
                  value={companyDetail.crmKey}
                />
              </Box>
            </Box>

            <Button
              onClick={SaveProfile}
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

export default EditCompanyProfile
