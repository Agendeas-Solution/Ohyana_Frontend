import React, { useState, useContext, lazy } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import Logo from '../../assets/img/Ohyana Logo Blue.svg'
import { ResetPassword } from '../../services/apiservices/login'
import { useSearchParams } from 'react-router-dom'
import { Context as ContextSnackbar } from '../../context/pageContext'
const SuccessSnackbar = React.lazy(() =>
  import('../SuccessSnackbar/SuccessSnackbar'),
)
const ErrorSnackbar = React.lazy(() => import('../ErrorSnackbar/ErrorSnackbar'))
const ForgetPassword = () => {
  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: '',
  })
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)

  let [searchParams, setSearchParams] = useSearchParams()
  let user = searchParams.get('rstPwd')
  const upddatePassword = () => {
    let user = searchParams.get('rstPwd')
    if (password.newPassword === password.confirmPassword) {
      ResetPassword(
        user,
        { password: password.newPassword },
        res => {
          setSuccessSnackbar({
            ...successSnackbar,
            status: true,
            message: res.data.message,
          })
        },
        err => {
          setErrorSnackbar({
            ...errorSnackbar,
            status: true,
            message: err.response.data.error,
          })
        },
      )
    } else {
      setErrorSnackbar({
        ...errorSnackbar,
        status: true,
        message: 'Please Enter Same Password.',
      })
    }
  }
  return (
    <>
      <Box className="login_page">
        <Box className="company_logo">
          <img src={Logo} alt="Company logo" />
        </Box>
        <Box className="login_form">
          <Typography className="login_heading" variant="span">
            Reset Password
          </Typography>

          <TextField
            sx={{ width: '100%', margin: '18px 0px' }}
            label="New Password"
            type="password"
            value={password.newPassword}
            variant="outlined"
            onChange={e => {
              setPassword({ ...password, newPassword: e.target.value })
            }}
          />

          <TextField
            sx={{ width: '100%', margin: '18px 0px' }}
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={password.confirmPassword}
            onChange={e => {
              setPassword({ ...password, confirmPassword: e.target.value })
            }}
          />

          <Button
            className="dialogue_bottom_button"
            variant="contained"
            onClick={upddatePassword}
          >
            Update
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

export default ForgetPassword
