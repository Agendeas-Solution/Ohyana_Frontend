import React from 'react'
import { Box, Typography } from '@mui/material'

const StaffDetail = ({ adminProfileDetail }) => {
  return (
    <>
      <Box className="companyDetail">
        <Box className="companyDetail_root p-3">
          <Typography className=" profile_data_lable" variant="span">
            Contact No.:
          </Typography>
          <Typography variant="span">
            {adminProfileDetail?.contact_number || '-'}
          </Typography>
        </Box>
        <Box className="companyDetail_root p-3">
          <Typography variant="span" className=" profile_data_lable">
            Senior Post:
          </Typography>
          <Typography variant="span">
            {adminProfileDetail?.role?.name || '-'}
          </Typography>
        </Box>
        <Box className="companyDetail_root p-3">
          <Typography variant="span" className=" profile_data_lable">
            Email:
          </Typography>
          <Typography variant="span">
            {adminProfileDetail?.email || '-'}
          </Typography>
        </Box>
        <Box className="companyDetail_root  p-3">
          <Typography className=" profile_data_lable" variant="span">
            Birthdate
          </Typography>
          <Typography variant="span">
            {adminProfileDetail?.birthday || '-'}
          </Typography>
        </Box>
        <Box className="companyDetail_root  p-3">
          <Typography className=" profile_data_lable" variant="span">
            Gender
          </Typography>
          <Typography variant="span">
            {adminProfileDetail?.gender || '-'}
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default StaffDetail
