import React, { useState } from 'react'
import { Box, Typography, Rating } from '@mui/material'

const StaffDetail = props => {
  console.log({ MYprops: props })
  return (
    <>
      <Box className="companyDetail">
        <Box className="companyDetail_root p-3">
          <Typography
            className="companyDetail_field_heading user_profile_color"
            variant="span"
          >
            Contact No.:
          </Typography>
          <Typography variant="span">
            {props?.adminProfileDetail?.contact_number || '-'}
          </Typography>
        </Box>
        <Box className="companyDetail_root p-3">
          <Typography
            variant="span"
            className="companyDetail_field_heading user_profile_color"
          >
            Senior Post:
          </Typography>
          <Typography variant="span">
            {props?.adminProfileDetail?.role?.name || '-'}
          </Typography>
        </Box>
        <Box className="companyDetail_root p-3">
          <Typography
            variant="span"
            className="companyDetail_field_heading user_profile_color"
          >
            Email:
          </Typography>
          <Typography variant="span">
            {props?.adminProfileDetail?.email || '-'}
          </Typography>
        </Box>
        <Box className="companyDetail_root  p-3">
          <Typography
            variant="span"
            className="companyDetail_field_heading user_profile_color"
          >
            Password:
          </Typography>
          <Typography variant="span">
            {props?.adminProfileDetail?.password || '-'}
          </Typography>
        </Box>
        <Box className="companyDetail_root  p-3">
          <Typography
            className="companyDetail_field_heading user_profile_color"
            variant="span"
          >
            Birthdate
          </Typography>
          <Typography variant="span">
            {props?.adminProfileDetail?.birthday || '-'}
          </Typography>
        </Box>
        <Box className="companyDetail_root  p-3">
          <Typography
            className="companyDetail_field_heading user_profile_color"
            variant="span"
          >
            Gender
          </Typography>
          <Typography variant="span">
            {props?.adminProfileDetail?.gender || '-'}
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default StaffDetail
