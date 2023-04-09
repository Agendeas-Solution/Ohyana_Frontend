import React from 'react'
import { Box, Typography } from '@mui/material'
import moment from 'moment'
import { CLIENT } from '../../constants'

const ProfileTable = ({ clientProfileDetail }) => {
  return (
    <>
      <Box className="client_profile_table_section">
        <Box className="client_profile_detail">
          <Box className="userdetail_root">
            <Typography variant="span">Inquiry Date</Typography>
            <Typography variant="span">
              {moment(clientProfileDetail?.arrivalDate).format()}
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
            <Box sx={{ maxWidth: '50%' }}>      {CLIENT.STAGE.find(e => e.id == clientProfileDetail?.stage).stage}</Box>
          </Box>
          <Box className="userdetail_root">
            <Typography variant="span">Investment Capacity</Typography>
            <Box sx={{ maxWidth: '50%' }}>{clientProfileDetail?.max_invesment_amount}</Box>
          </Box>
          <Box className="userdetail_root">
            <Typography variant="span">Reference</Typography>
            <Typography variant="span">
              {clientProfileDetail?.reference}
            </Typography>
          </Box>
          <Box className="userdetail_root">
            <Typography variant="span">Contact</Typography>
            <Typography variant="span">
              {clientProfileDetail?.contact_number}
            </Typography>
          </Box>
          <Box className="userdetail_root">
            <Typography variant="span">Email</Typography>
            <Typography variant="span">
              {clientProfileDetail?.email}
            </Typography>
          </Box>
          <Box className="userdetail_root">
            <Typography variant="span">Address</Typography>
            <Typography
              sx={{ maxWidth: '250px', textAlign: 'right' }}
              variant="span"
            >
              {clientProfileDetail?.address}
            </Typography>
          </Box>
          <Box className="userdetail_root">
            <Typography variant="span">City</Typography>
            <Typography variant="span">
              {clientProfileDetail?.country?.name}
            </Typography>
          </Box>
          <Box className="userdetail_root">
            <Typography variant="span">State:</Typography>
            <Typography variant="span">
              {clientProfileDetail?.state}
            </Typography>
          </Box>
          <Box className="userdetail_root">
            <Typography variant="span">Country</Typography>
            <Typography variant="span">
              {clientProfileDetail?.country?.name}
            </Typography>
          </Box>

          {clientProfileDetail?.indiaMartProductName && (
            <Box className="userdetail_root">
              <Typography variant="span">Indiamart Product Name</Typography>
              <Typography
                sx={{ maxWidth: '250px', textAlign: 'right' }}
                variant="span"
              >
                {clientProfileDetail?.indiaMartProductName}
              </Typography>
            </Box>
          )}
          {clientProfileDetail?.indiaMartMessage && (
            <Box className="userdetail_root">
              <Typography variant="span">Indiamart Message</Typography>
              <Typography
                sx={{ maxWidth: '250px', textAlign: 'right' }}
                variant="span"
              >
                {clientProfileDetail?.indiaMartMessage}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  )
}

export default ProfileTable
