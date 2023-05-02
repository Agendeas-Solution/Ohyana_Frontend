import React, { useEffect, useState, useContext } from 'react'
import { Typography, Box, Button } from '@mui/material'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { useNavigate } from 'react-router-dom'
import { GetCompanyProfile } from '../../services/apiservices/companyprofile'
import './index.css'
import ProfileImage from '../../assets/img/Profile_Image.svg'

const CompanyProfile = () => {
  const navigate = useNavigate()
  const [companyDetail, setCompanyDetail] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  useEffect(() => {
    GetCompanyProfile(
      {},
      res => {
        if (res.success) {
          setCompanyDetail(res.data)
        }
      },
      err => {
        console.log(err)
      },
    )
  }, [])
  return (
    <>
      <Box className="main_section">
        <Box className="user_profile_header_Section">
          <Box className="username_profile_Section">
            <img
              src={ProfileImage}
              className="user_profile_icon"
              alt="profile"
            />
            {/* <AccountCircleRoundedIcon className="user_profile_icon" /> */}
            <Box className="username_and_position">
              <Typography className="username_text" variant="span">
                {companyDetail?.name}
              </Typography>
            </Box>
          </Box>

          <Button variant="contained" className="profile_header_button">
            <EditRoundedIcon
              onClick={() => {
                navigate('/editcompanyprofile')
              }}
            />
          </Button>
        </Box>

        <Box className="companyDetail">
          <Box className="companyDetail_root p-3">
            <Typography className="" variant="span">
              Email:
            </Typography>
            <Typography variant="span">
              {companyDetail?.email || '-'}
            </Typography>
          </Box>
          <Box className="companyDetail_root p-3">
            <Typography variant="span" className="">
              City:
            </Typography>
            <Typography variant="span">{companyDetail?.city || '-'}</Typography>
          </Box>
          <Box className="companyDetail_root p-3">
            <Typography variant="span" className="">
              State:
            </Typography>
            <Typography variant="span">
              {companyDetail?.state || '-'}
            </Typography>
          </Box>
          <Box className="companyDetail_root  p-3">
            <Typography variant="span" className="">
              Country:
            </Typography>
            <Typography variant="span">
              {companyDetail?.country?.name || '-'}
            </Typography>
          </Box>
          <Box className="companyDetail_root  p-3">
            <Typography className="" variant="span">
              GSTIN:
            </Typography>
            <Typography variant="span">
              {companyDetail?.GSTIN || '-'}
            </Typography>
          </Box>
          <Box className="companyDetail_root detail_row p-3">
            <Typography className="" variant="span">
              Business Type:
            </Typography>
            <Typography variant="span">
              {companyDetail?.businessType || '-'}
            </Typography>
          </Box>
          <Box className="companyDetail_root  p-3">
            <Typography className="" variant="span">
              IndiaMart CRM Key:
            </Typography>
            <Typography variant="span">
              {companyDetail?.crmKey || '-'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default CompanyProfile
