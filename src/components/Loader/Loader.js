import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import './index.css';
const Loader = () => {
  return (
    <div className="center_div">
      <CircularProgress size="45px" id="loader" />
    </div>

  )
}

export default Loader

