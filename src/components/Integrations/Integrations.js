import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { INTEGRATIONDETAIL } from '../../constants'
import './index.css'

const Integrations = () => {
  const [productPath, setProductPath] = useState(
    INTEGRATIONDETAIL.PRODUCTDETAIL,
  )

  const [productName, setProductName] = useState([
    'Twitter',
    'Shopify',
    'Trade India',
    'India Mart',
  ])

  return (
    <>
      <Box className="main_section">
        <Box className="inner_containers">
          {productPath.map(data => (
            <Box className="integrations_card">
              <Box className="image_part">
                {/* <img src={IntegrationIcon} alt="twitter" /> */}
                <img src={data.productImage} />
              </Box>
              <Typography className="heading_part" variant="span">
                {data.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  )
}

export default Integrations
