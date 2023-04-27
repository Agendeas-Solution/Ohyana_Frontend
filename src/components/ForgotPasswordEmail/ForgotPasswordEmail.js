import React, { useEffect, useState, useContext } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import Logo from '../../assets/img/Ohyana Logo Blue.svg'
import { useNavigate } from 'react-router-dom'
import { ForgotPassword } from '../../services/apiservices/login'
import { Context as ContextSnackbar } from '../../context/pageContext'
import SuccessSnackbar from '../SuccessSnackbar/SuccessSnackbar'
import ErrorSnackbar from '../ErrorSnackbar/ErrorSnackbar'
const ForgotPasswordEmail = () => {
  const [userDetail, setUserDetail] = useState({
    email: '',
  })
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const handleForgotPassword = () => {
    ForgotPassword(
      { email: userDetail.email },
      res => {
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.message,
        })
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err.response.data.message,
        })
      },
    )
  }
  return (
    <>
      <Box className="login_page">
        <Box className="company_logo">
          <img src={Logo} alt="Company logo" />
        </Box>
        <Box className="login_form">
          <Typography className="login_heading" variant="span">
            Forgot Password
          </Typography>

          <TextField
            sx={{ width: '100%', margin: '18px 0px' }}
            label="Email"
            type="email"
            autoComplete={true}
            value={userDetail.email}
            variant="outlined"
            onChange={e => {
              setUserDetail({ ...userDetail, email: e.target.value })
            }}
          />

          <Button
            className="dialogue_bottom_button"
            onClick={handleForgotPassword}
            variant="contained"
          >
            Get Link
          </Button>
        </Box>

        <Typography className="login_copyright_root" variant="span">
          {new Date().getFullYear()} © Ohyana.
        </Typography>
      </Box>
      <SuccessSnackbar />
      <ErrorSnackbar />
    </>
  )
}

export default ForgotPasswordEmail
