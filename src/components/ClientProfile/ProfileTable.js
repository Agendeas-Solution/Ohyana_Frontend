import React from 'react'
import { Box, Typography } from '@mui/material'
import moment from 'moment'
const ProfileTable = props => {
  return (
    <>
      <Box className="client_profile_table_section">
        <Box className="client_profile_detail">
          <Box className="userdetail_root">
            <Typography className="userdetail_field_heading" variant="span">
              Date
            </Typography>
            <Typography variant="span">
              {moment(props?.clientProfileDetail?.arrivalDate).format(
                'DD-MM-YYYY',
              )}
            </Typography>
          </Box>
          <Box className="userdetail_root">
            <Typography variant="span" className="userdetail_field_heading">
              Time
            </Typography>
            <Typography variant="span">
              {moment(
                props?.clientProfileDetail?.arrivalTime,
                'hh:mm:ss',
              ).format('LT')}
            </Typography>
          </Box>
          <Box className="userdetail_root">
            <Typography className="userdetail_field_heading" variant="span">
              Contact
            </Typography>
            <Typography variant="span">
              {props?.clientProfileDetail?.contact_number}
            </Typography>
          </Box>
          <Box className="userdetail_root">
            <Typography className="userdetail_field_heading" variant="span">
              Country
            </Typography>
            <Typography variant="span">
              {props?.clientProfileDetail?.country?.name}
            </Typography>
          </Box>
          <Box className="userdetail_root">
            <Typography className="userdetail_field_heading" variant="span">
              Email
            </Typography>
            <Typography variant="span">
              {props?.clientProfileDetail?.email}
            </Typography>
          </Box>
          <Box className="userdetail_root">
            <Typography className="userdetail_field_heading" variant="span">
              Address
            </Typography>
            <Typography
              sx={{ maxWidth: '250px', textAlign: 'right' }}
              variant="span"
            >
              {props?.clientProfileDetail?.address}
            </Typography>
          </Box>
          <Box className="userdetail_root">
            <Typography className="userdetail_field_heading" variant="span">
              State:
            </Typography>
            <Typography variant="span">
              {props?.clientProfileDetail?.state}
            </Typography>
          </Box>
          <Box className="userdetail_root">
            <Typography className="userdetail_field_heading" variant="span">
              Reference
            </Typography>
            <Typography variant="span">
              {props?.clientProfileDetail?.reference}
            </Typography>
          </Box>
          {props?.clientProfileDetail?.indiaMartProductName && (
            <Box className="userdetail_root">
              <Typography className="userdetail_field_heading" variant="span">
                Indiamart Product Name
              </Typography>
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
              <Typography className="userdetail_field_heading" variant="span">
                Indiamart Message
              </Typography>
              <Typography
                sx={{ maxWidth: '250px', textAlign: 'right' }}
                variant="span"
              >
                {props?.clientProfileDetail?.indiaMartMessage}
              </Typography>
            </Box>
          )}
          <Box className="userdetail_root">
            <Typography className="userdetail_field_heading" variant="span">
              Product Name
            </Typography>
            <Box sx={{ maxWidth: '50%' }}>
              {props?.clientProfileDetail?.products
                .map(data => {
                  return ' ' + data.name
                })
                .toString()}
            </Box>
          </Box>
          <Box className="userdetail_root">
            <Typography className="userdetail_field_heading" variant="span">
              Client stage
            </Typography>
            <Box sx={{ maxWidth: '50%' }}></Box>
          </Box>
          <Box className="userdetail_root">
            <Typography className="userdetail_field_heading" variant="span">
              Current Business
            </Typography>
            <Box sx={{ maxWidth: '50%' }}></Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ProfileTable
