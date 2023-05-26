import React, { useState, useContext } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material'
import Logo from '../../assets/img/Ohyana Logo Blue.svg'
import { ResetPassword } from '../../services/apiservices/login'
import { useSearchParams } from 'react-router-dom'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { useNavigate } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@mui/icons-material'
const SuccessSnackbar = React.lazy(() =>
  import('../SuccessSnackbar/SuccessSnackbar'),
)
const ErrorSnackbar = React.lazy(() => import('../ErrorSnackbar/ErrorSnackbar'))
const ForgetPassword = () => {
  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: '',
  })
  const navigate = useNavigate()
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const [showPassword, setShowPassword] = useState(true)

  let [searchParams, setSearchParams] = useSearchParams()
  let user = searchParams.get('rstPwd')
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = event => {
    event.preventDefault()
  }
  const updatePassword = () => {
    let user = searchParams.get('rstPwd')
    if (password.newPassword === password.confirmPassword) {
      ResetPassword(
        user,
        { password: password.newPassword },
        res => {
          navigate('/login')
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
        <Box className="login_form_section">
          <Box className="login_form_body">
            <Box className="login_form_box">
              <Typography className="login_heading" variant="span">
                Reset Password
              </Typography>
              <Box sx={{ width: '100%', padding: '30px 20px 20px 20px' }}>
                <TextField
                  sx={{ width: '100%' }}
                  label="New Password"
                  type={showPassword ? 'password' : 'text'}
                  value={password.newPassword}
                  onChange={e => {
                    setPassword({ ...password, newPassword: e.target.value })
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          sx={{
                            margin: '0px',
                            color: '#2E3591',
                            boxShadow: 'none',
                          }}
                          variant="contained"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ width: '100%', padding: '20px 20px 20px 20px' }}>
                <TextField
                  sx={{ width: '100%' }}
                  label="Confirm Password"
                  type={showPassword ? 'password' : 'text'}
                  value={password.confirmPassword}
                  onChange={e => {
                    setPassword({
                      ...password,
                      confirmPassword: e.target.value,
                    })
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          sx={{
                            margin: '0px',
                            color: '#2E3591',
                            boxShadow: 'none',
                          }}
                          variant="contained"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  padding: '20px 20px 5px 20px',
                }}
              >
                <Button
                  className="dialogue_bottom_button"
                  variant="contained"
                  onClick={updatePassword}
                >
                  Update
                </Button>
              </Box>
            </Box>
          </Box>
          <Box className="login_footer">
            <Typography className="login_copyright_root" variant="span">
              {new Date().getFullYear()} © Ohyana.
            </Typography>
          </Box>
        </Box>
      </Box>
      <SuccessSnackbar />
      <ErrorSnackbar />
    </>
  )
}

export default ForgetPassword
