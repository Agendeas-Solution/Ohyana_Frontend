import React from 'react'
import { Typography, Box, Button } from '@mui/material'
import './index.css'
const NoDataFound = () => {
  return (
    <Box className="no_data_found_root">
      <Box className="back_to_search_button">
        <Typography className="oops_root" variant="span">
          OOPS!
        </Typography>
        <Typography className="no_data_available_tagline" variant="span">
          isNotNull(props.title) == true ? props.title : str_no_data_found
        </Typography>
      </Box>
    </Box>
  )
}

export default NoDataFound
