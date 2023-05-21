import React, { useState, useContext, lazy, useEffect } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material'
import './index.css'
import { login } from '../../services/apiservices/login'
import { Context as AuthContext } from '../../context/authContext/authContext'
import { useNavigate } from 'react-router-dom'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { Context as ContextActivePage } from '../../context/pageContext'
import Logo from '../../assets/img/Ohyana Logo Blue.svg'
import { Visibility, VisibilityOff } from '@mui/icons-material'
const ErrorSnackbar = React.lazy(() => import('../ErrorSnackbar/ErrorSnackbar'))
const Login = () => {
  const { setAuthorize, setFlagLoader } = useContext(AuthContext)
  const [userDetail, setUserDetail] = useState({
    email: '',
    password: '',
  })
  const { setActivePage } = useContext(ContextActivePage)
  const { errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setErrorSnackbar } = useContext(ContextSnackbar)
  const [showPassword, setShowPassword] = useState(true)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = event => {
    event.preventDefault()
  }
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [path, setPath] = useState(null)
  useEffect(() => {
    let pathName = localStorage.getItem('path')
    setPath(pathName)
  }, [])
  const handleNavItemClick = (path, name) => {
    navigate(path)
    setActivePage(name)
    setPath(path)
    localStorage.setItem('path', path)
  }
  const userlogin = () => {
    if (userDetail.email !== '' && userDetail.password !== '') {
      setFlagLoader(true)
      login(
        { email: userDetail.email, password: userDetail.password },
        res => {
          if (res.success) {
            setAuthorize(true)
            setFlagLoader(false)
            handleNavItemClick('/dashboard', 'Dashboard')
          } else {
            if (res?.data?.error) {
              setErrorMessage(res?.data?.error?.message)
            }
          }
        },
        resError => {
          setErrorSnackbar({
            ...errorSnackbar,
            status: true,
            message: resError.response.data.message,
          })
          setFlagLoader(false)
        },
      )
    } else {
      setErrorSnackbar({
        ...errorSnackbar,
        status: true,
        message: 'Username and password are required',
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
                Welcome To Ohyana
              </Typography>
              <Box sx={{ width: '100%', padding: '30px 20px 20px 20px' }}>
                <TextField
                  id="my-text-field"
                  label="Email"
                  sx={{ width: '100%' }}
                  type="email"
                  value={userDetail.email}
                  variant="outlined"
                  onChange={e => {
                    setUserDetail({ ...userDetail, email: e.target.value })
                  }}
                />
              </Box>
              <Box sx={{ width: '100%', padding: '20px 20px 0px 20px' }}>
                <TextField
                  sx={{ width: '100%' }}
                  label="Password"
                  type={showPassword ? 'password' : 'text'}
                  value={userDetail.password}
                  onChange={e => {
                    setUserDetail({ ...userDetail, password: e.target.value })
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
              <Box sx={{ width: '100%', padding: '3px 20px 0px 20px' }}>
                <Typography
                  className="login_forget_password_root"
                  variant="span"
                >
                  <Button
                    sx={{ padding: '5px 0px' }}
                    onClick={() => navigate('/forgotpassword')}
                  >
                    Forgotten password ?
                  </Button>
                </Typography>
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
                  onClick={userlogin}
                  variant="contained"
                  type="submit"
                >
                  Submit
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
      <ErrorSnackbar />
    </>
  )
}

export default Login
