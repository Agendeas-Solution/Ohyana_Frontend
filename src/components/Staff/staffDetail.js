import React, { useState } from 'react'
import { Box, Typography, Rating } from '@mui/material'

const StaffDetail = props => {
  return (
    <>
      <Box className="companyDetail">
        <Box className="companyDetail_root p-3">
          <Typography className=" user_profile_font_weight" variant="span">
            Contact No.:
          </Typography>
          <Typography variant="span">
            {props?.adminProfileDetail?.contact_number || '-'}
          </Typography>
        </Box>
        <Box className="companyDetail_root p-3">
          <Typography variant="span" className=" user_profile_font_weight">
            Senior Post:
          </Typography>
          <Typography variant="span">
            {props?.adminProfileDetail?.role?.name || '-'}
          </Typography>
        </Box>
        <Box className="companyDetail_root p-3">
          <Typography variant="span" className=" user_profile_font_weight">
            Email:
          </Typography>
          <Typography variant="span">
            {props?.adminProfileDetail?.email || '-'}
          </Typography>
        </Box>
        <Box className="companyDetail_root  p-3">
          <Typography variant="span" className=" user_profile_font_weight">
            Password:
          </Typography>
          <Typography variant="span">
            {props?.adminProfileDetail?.password || '-'}
          </Typography>
        </Box>
        <Box className="companyDetail_root  p-3">
          <Typography className=" user_profile_font_weight" variant="span">
            Birthdate
          </Typography>
          <Typography variant="span">
            {props?.adminProfileDetail?.birthday || '-'}
          </Typography>
        </Box>
        <Box className="companyDetail_root  p-3">
          <Typography className=" user_profile_font_weight" variant="span">
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
