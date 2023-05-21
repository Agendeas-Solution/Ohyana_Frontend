import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { INTEGRATIONDETAIL } from '../../constants'
import './index.css'
import IntegrationsDialog from './IntegrationsDialog'
const Integrations = () => {
  const [productPath, setProductPath] = useState(
    INTEGRATIONDETAIL.PRODUCTDETAIL,
  )
  const [integrationDialog, setIntegrationDialog] = useState(false)
  const handleCloseDialog = () => {
    setIntegrationDialog(false)
  }
  return (
    <>
      <Box className="main_section">
        <Box className="inner_containers">
          {productPath.map(data => (
            <Box
              onClick={() => {
                setIntegrationDialog(true)
              }}
              className="integrations_card"
            >
              <Box className="image_part">
                <img src={data.productImage} />
              </Box>
              <Typography className="heading_part" variant="span">
                {data.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <IntegrationsDialog
        integrationDialog={integrationDialog}
        handleCloseDialog={handleCloseDialog}
        setIntegrationDialog={setIntegrationDialog}
      />
    </>
  )
}

export default Integrations
