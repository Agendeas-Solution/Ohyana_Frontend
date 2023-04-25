import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import './index.css'
import IntegrationIcon from '../../assets/img/IntegrationIcon.svg'

const Integrations = () => {
  return (
    <>
      <Box className="integrations_main_section">
        <Box className="integrations_card">
          <Box className="integrations_body_section">
            <Box className="image_part">
              <img
                // style={{ height: '100%' }}
                src={IntegrationIcon}
                alt="Twitter"
              />
            </Box>
            <Typography sx={{ fontSize: '20px', marginTop: '15px' }}>
              Twitter
            </Typography>
          </Box>
        </Box>

        <Box className="integrations_card">
          <Box className="integrations_body_section">
            <Box className="image_part">
              <img
                // style={{ height: '100%' }}
                src={IntegrationIcon}
                alt="Twitter"
              />
            </Box>
            <Typography sx={{ fontSize: '20px', marginTop: '15px' }}>
              Twitter
            </Typography>
          </Box>
        </Box>

        <Box className="integrations_card">
          <Box className="integrations_body_section">
            <Box className="image_part">
              <img src={IntegrationIcon} alt="Twitter" />
            </Box>
            <Typography sx={{ fontSize: '20px', marginTop: '15px' }}>
              Twitter
            </Typography>
          </Box>
        </Box>

        <Box className="integrations_card">
          <Box className="integrations_body_section">
            <Box className="image_part">
              <img src={IntegrationIcon} alt="Twitter" />
            </Box>
            <Typography sx={{ fontSize: '20px', marginTop: '15px' }}>
              Twitter
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* <Box className="below_main_tab_section">
        <Box className="inner_container">
          <Box className="task_card">
            <Box className="task_card_hover">
              <Typography className="task_card_heading" variant="span">
                dsjlfa
              </Typography>

              <Typography className="task_description" variant="span">
                dfadsfs
              </Typography>
            </Box>
            <Box className="task_bottom_section">
              <Typography className="task_date" variant="span">
                fdsfds
              </Typography>
              <Typography className="name_chip " variant="span">
                dsafds
              </Typography>
              <Button className="task_button">+ Member</Button>
            </Box>
          </Box>
        </Box>
      </Box> */}
    </>
  )
}

export default Integrations
