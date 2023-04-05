import React from 'react'
import { Box, Typography } from '@mui/material'
import moment from 'moment'

const ProfileTable = props => {
  return (
    <>
      <Box className="client_profile_table_section">
        <Box className="client_profile_detail">
          <Box className="userdetail_root">
            <Typography variant="span">Inquiry Date</Typography>
            <Typography variant="span">
              {moment(props?.clientProfileDetail?.arrivalDate).format(
                'DD-MM-YYYY',
              )}
            </Typography>
          </Box>
          {/* <Box className="userdetail_root">
            <Typography variant="span" >
              Time
            </Typography>
            <Typography variant="span">
              {moment(
                props?.clientProfileDetail?.arrivalTime,
                'hh:mm:ss',
              ).format('LT')}
            </Typography>
          </Box> */}
          <Box className="userdetail_root">
            <Typography variant="span">Client stage</Typography>
            <Box sx={{ maxWidth: '50%' }}></Box>
          </Box>
          <Box className="userdetail_root">
            <Typography variant="span">Investment Capacity</Typography>
            <Box sx={{ maxWidth: '50%' }}></Box>
          </Box>
          <Box className="userdetail_root">
            <Typography variant="span">Reference</Typography>
            <Typography variant="span">
              {props?.clientProfileDetail?.reference}
            </Typography>
          </Box>
          <Box className="userdetail_root">
            <Typography variant="span">Contact</Typography>
            <Typography variant="span">
              {props?.clientProfileDetail?.contact_number}
            </Typography>
          </Box>
          <Box className="userdetail_root">
            <Typography variant="span">Email</Typography>
            <Typography variant="span">
              {props?.clientProfileDetail?.email}
            </Typography>
          </Box>
          <Box className="userdetail_root">
            <Typography variant="span">Address</Typography>
            <Typography
              sx={{ maxWidth: '250px', textAlign: 'right' }}
              variant="span"
            >
              {props?.clientProfileDetail?.address}
            </Typography>
          </Box>
          <Box className="userdetail_root">
            <Typography variant="span">City</Typography>
            <Typography variant="span">
              {props?.clientProfileDetail?.country?.name}
            </Typography>
          </Box>
          <Box className="userdetail_root">
            <Typography variant="span">State:</Typography>
            <Typography variant="span">
              {props?.clientProfileDetail?.state}
            </Typography>
          </Box>
          <Box className="userdetail_root">
            <Typography variant="span">Country</Typography>
            <Typography variant="span">
              {props?.clientProfileDetail?.country?.name}
            </Typography>
          </Box>

          {props?.clientProfileDetail?.indiaMartProductName && (
            <Box className="userdetail_root">
              <Typography variant="span">Indiamart Product Name</Typography>
              <Typography
                sx={{ maxWidth: '250px', textAlign: 'right' }}
                variant="span"
              >
                {props?.clientProfileDetail?.indiaMartProductName}
              </Typography>
            </Box>
          )}
          {props?.clientProfileDetail?.indiaMartMessage && (
            <Box className="userdetail_root">
              <Typography variant="span">Indiamart Message</Typography>
              <Typography
                sx={{ maxWidth: '250px', textAlign: 'right' }}
                variant="span"
              >
                {props?.clientProfileDetail?.indiaMartMessage}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  )
}

export default ProfileTable
