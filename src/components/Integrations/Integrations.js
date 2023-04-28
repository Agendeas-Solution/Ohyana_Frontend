import React from 'react'
import { Box, Typography } from '@mui/material'
import './index.css'
import IntegrationIcon from '../../assets/img/IntegrationIcon.svg'

const Integrations = () => {
  return (
    <>
      <Box className="main_section">
        <Box className="inner_containers">
          <Box className="integrations_card">
            <Box className="image_part">
              <img src={IntegrationIcon} alt="twitter" />
            </Box>
            <Typography className="heading_part" variant="span">
              Twitter
            </Typography>
          </Box>

          <Box className="integrations_card">
            <Box className="image_part">
              <img src={IntegrationIcon} alt="twitter" />
            </Box>
            <Typography className="heading_part" variant="span">
              Twitter
            </Typography>
          </Box>

          <Box className="integrations_card">
            <Box className="image_part">
              <img src={IntegrationIcon} alt="twitter" />
            </Box>
            <Typography className="heading_part" variant="span">
              Twitter
            </Typography>
          </Box>

          <Box className="integrations_card">
            <Box className="image_part">
              <img src={IntegrationIcon} alt="twitter" />
            </Box>
            <Typography className="heading_part" variant="span">
              Twitter
            </Typography>
          </Box>

          <Box className="integrations_card">
            <Box className="image_part">
              <img src={IntegrationIcon} alt="twitter" />
            </Box>
            <Typography className="heading_part" variant="span">
              Twitter
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Integrations
