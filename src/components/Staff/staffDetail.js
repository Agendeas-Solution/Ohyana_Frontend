import React, { useState } from 'react'
import { Box, Typography, Rating } from '@mui/material'
const StaffDetail = props => {
  console.log({ props })
  return (
    <>
      {/* <Box className="client_profile_detail">
        <Box className="userdetail_root">
          <Typography className="userdetail_field_heading" variant="span">
            Department
          </Typography>
          <Typography variant="span">
            {props?.adminProfileDetail?.department?.name}
          </Typography>
        </Box>
        <Box className="userdetail_root">
          <Typography variant="span" className="userdetail_field_heading">
            Contact No.
          </Typography>
          <Typography variant="span">
            {props?.adminProfileDetail?.contact_number}
          </Typography>
        </Box>
        <Box className="userdetail_root">
          <Typography className="userdetail_field_heading" variant="span">
            Email
          </Typography>
          <Typography variant="span">
            {props?.adminProfileDetail?.email}
          </Typography>
        </Box>
        <Box className="userdetail_root">
          <Typography className="userdetail_field_heading" variant="span">
            Password
          </Typography>
          <Typography variant="span">
            {props?.adminProfileDetail?.password}
          </Typography>
        </Box>
        <Box className="userdetail_root">
          <Typography className="userdetail_field_heading" variant="span">
            Gender
          </Typography>
          <Typography sx={{ maxWidth: '250px' }} variant="span">
            {props?.adminProfileDetail?.gender}
          </Typography>
        </Box>
        <Box className="userdetail_root">
          <Typography className="userdetail_field_heading" variant="span">
            Birthday:
          </Typography>
          <Typography variant="span">
            {props?.adminProfileDetail?.birthDay}
          </Typography>
        </Box>
      </Box> */}
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
            {props?.adminProfileDetail?.role.name || '-'}
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
