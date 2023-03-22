import React, { useEffect, useState, useContext } from 'react'
import {
  Typography,
  Box,
  TextField,
  Button,
  TextareaAutosize,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './index.css'
import {
  GetCompanyProfile,
  editCompanyProfile,
} from '../../services/apiservices/companyprofile'
import { Context as ContextSnackbar } from '../../context/pageContext'
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
  }, [])

  const SaveProfile = () => {
    let data = {
      name: companyDetail.companyName,
      // email: companyDetail.email,
      // state: companyDetail.state,
      crmKey: companyDetail.crmKey,
      // businessType: companyDetail.businessType, city: companyDetail.city, country: companyDetail.country
    }
    console.log('Printing Data', data)
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
        console.log('Printing Err', err)
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err.response.data.error,
        })
      },
    )
  }

  return (
    <>
      <Box className="main_section">
        <Box className="input_field_row">
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Company Name
            </Typography>
            <TextField
              onChange={e => {
                setCompanyDetail({
                  ...companyDetail,
                  companyName: e.target.value,
                })
              }}
              value={companyDetail.companyName}
              className="form-control"
              variant="outlined"
              label=""
            />
          </Box>
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              City
            </Typography>
            <TextField
              disabled
              onChange={e => {
                setCompanyDetail({ ...companyDetail, city: e.target.value })
              }}
              value={companyDetail.city}
              variant="outlined"
            />
          </Box>
        </Box>
        <Box className="input_field_row">
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Email
            </Typography>
            <TextField
              autoComplete={false}
              onChange={e => {
                setCompanyDetail({ ...companyDetail, email: e.target.value })
              }}
              value={companyDetail.email}
              variant="outlined"
            />
          </Box>
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              State
            </Typography>
            <TextField
              onChange={e => {
                setCompanyDetail({ ...companyDetail, state: e.target.value })
              }}
              value={companyDetail.state}
              variant="outlined"
            />
          </Box>
        </Box>
        <Box className="input_field_row">
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Business Type
            </Typography>
            <TextField
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
            <Typography className="input_field_label" variant="span">
              Country
            </Typography>
            <TextField
              onChange={e => {
                setCompanyDetail({ ...companyDetail, country: e.target.value })
              }}
              value={companyDetail.country}
              variant="outlined"
            />
          </Box>
        </Box>
        <Box className="input_field_row">
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              CRM Key
            </Typography>
            <TextareaAutosize
              placeholder="Description Here..."
              minRows={3}
              className="w-100"
              onChange={e => {
                setCompanyDetail({ ...companyDetail, crmKey: e.target.value })
              }}
              value={companyDetail.crmKey}
            />
          </Box>
        </Box>
        <Box sx={{ justifyContent: 'flex-start' }} className="input_field_row">
          <Button
            onClick={SaveProfile}
            variant="contained"
            className="edit_page_save_button"
          >
            Save
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default EditCompanyProfile
