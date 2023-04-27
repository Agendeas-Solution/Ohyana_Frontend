import React, { useEffect, useState, useContext } from 'react'
import {
  Typography,
  Box,
  TextField,
  Autocomplete,
  Button,
  TextareaAutosize,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './index.css'
import {
  GetCompanyProfile,
  editCompanyProfile,
} from '../../services/apiservices/companyprofile'
import ProfileImage from '../../assets/img/Profile_Image.svg'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { GetCountryList } from '../../services/apiservices/clientDetail'
const EditCompanyProfile = () => {
  const [companyDetail, setCompanyDetail] = useState({
    companyName: '',
    email: '',
    state: '',
    crmKey: '',
    businessType: '',
    city: '',
    country: '',
  })
  const [countryList, setCountryList] = useState([])
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const navigate = useNavigate()
  useEffect(() => {
    GetCompanyProfile(
      {},
      res => {
        if (res?.success) {
          setCompanyDetail({
            ...companyDetail,
            companyName: res.data?.name,
            email: res.data?.email,
            state: res.data?.state,
            crmKey: res.data?.crmKey,
            businessType: res.data?.businessType,
            city: res.data?.city,
            country: res.data?.country,
          })
        }
      },
      err => {
        console.log(err)
      },
    )
    GetCountryList(
      {},
      res => {
        if (res.success) {
          setCountryList(res.data)
        }
      },
      err => {
        console.log('Printing ', err)
      },
    )
  }, [])

  const SaveProfile = () => {
    let data = {
      name: companyDetail.companyName,
      // email: companyDetail.email,
      // state: companyDetail.state,
      crmKey: companyDetail.crmKey,
      // businessType: companyDetail.businessType, city: companyDetail.city, country: companyDetail.country
    }
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
          <Box className="edit_profile_image_section">
            <img src={ProfileImage} alt="profile" />
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
                  label="City"
                  onChange={e => {
                    setCompanyDetail({ ...companyDetail, city: e.target.value })
                  }}
                  value={companyDetail.city}
                  variant="outlined"
                />
              </Box>
            </Box>
            {/* Email &&  State */}
            <Box className="input_field_row">
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
              <Box className="input_fields">
                <TextField
                  label="State"
                  autoComplete="false"
                  onChange={e => {
                    setCompanyDetail({
                      ...companyDetail,
                      state: e.target.value,
                    })
                  }}
                  value={companyDetail.state}
                  variant="outlined"
                />
              </Box>
            </Box>
            {/* Business Type &&  Country */}
            <Box className="input_field_row">
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
              <Box className="input_fields">
                <Autocomplete
                  disablePortal
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
