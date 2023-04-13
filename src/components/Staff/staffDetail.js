import React, { useState } from 'react'
import { Box, Typography, Rating } from '@mui/material'

const StaffDetail = props => {
  return (
    <>
      <Box className="companyDetail">
        <Box className="companyDetail_root p-3">
          <Typography className=" profile_data_lable" variant="span">
            Contact No.:
          </Typography>
          <Typography variant="span">
            {props?.adminProfileDetail?.contact_number || '-'}
          </Typography>
        </Box>
        <Box className="companyDetail_root p-3">
          <Typography variant="span" className=" profile_data_lable">
            Senior Post:
          </Typography>
          <Typography variant="span">
            {props?.adminProfileDetail?.role?.name || '-'}
          </Typography>
        </Box>
        <Box className="companyDetail_root p-3">
          <Typography variant="span" className=" profile_data_lable">
            Email:
          </Typography>
          <Typography variant="span">
            {props?.adminProfileDetail?.email || '-'}
          </Typography>
        </Box>
        <Box className="companyDetail_root  p-3">
          <Typography variant="span" className=" profile_data_lable">
            Password:
          </Typography>
          <Typography variant="span">
            {props?.adminProfileDetail?.password || '-'}
          </Typography>
        </Box>
        <Box className="companyDetail_root  p-3">
          <Typography className=" profile_data_lable" variant="span">
            Birthdate
          </Typography>
          <Typography variant="span">
            {props?.adminProfileDetail?.birthday || '-'}
          </Typography>
        </Box>
        <Box className="companyDetail_root  p-3">
          <Typography className=" profile_data_lable" variant="span">
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
