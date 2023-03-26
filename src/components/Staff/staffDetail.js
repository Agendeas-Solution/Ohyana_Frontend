import React, { useState } from 'react'
import { Box, Typography, Rating } from '@mui/material'
const StaffDetail = props => {
  return (
    <>
      <Box className="client_profile_detail">
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
        {/* <Box className="userdetail_root">
                    <Typography className="userdetail_field_heading" variant="span">Clients Ratings</Typography>
                    {props?.adminProfileDetail?.rating?<Rating readOnly precision={0.5} value={props?.adminProfileDetail?.rating}  />:null}
                </Box> */}
      </Box>
    </>
  )
}

export default StaffDetail
