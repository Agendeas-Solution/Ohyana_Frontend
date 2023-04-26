import React, { useState, useContext, lazy, useEffect } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import './index.css'
import { login } from '../../services/apiservices/login'
import { Context as AuthContext } from '../../context/authContext/authContext'
import { useNavigate } from 'react-router-dom'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { Context as ContextActivePage } from '../../context/pageContext'
import Logo from '../../assets/img/Ohyana Logo Blue.svg'
import { socket } from '../../App'
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
            socket.emit('join', { email: userDetail?.email })
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
            message: resError.response.data.error,
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

        <Box className="login_form">
          <Typography className="login_heading" variant="span">
            Welcome To Ohyana.
          </Typography>

          <form
            onSubmit={e => {
              e.preventDefault()
              userlogin()
            }}
          >
            <TextField
              sx={{ width: '100%', margin: '18px 0px' }}
              label="Email"
              type="email"
              value={userDetail.email}
              variant="outlined"
              onChange={e => {
                setUserDetail({ ...userDetail, email: e.target.value })
              }}
            />

            <Box sx={{ width: '100%', margin: '18px 0px' }}>
              <TextField
                sx={{ width: '100%' }}
                label="password"
                variant="outlined"
                type="password"
                value={userDetail.password}
                onChange={e => {
                  setUserDetail({ ...userDetail, password: e.target.value })
                }}
              />

              <Typography className="login_forget_password_root" variant="span">
                <Button
                  sx={{ padding: '5px 0px' }}
                  onClick={() => navigate('/forgotpassword')}
                >
                  {' '}
                  Forgotten password ?{' '}
                </Button>
              </Typography>
            </Box>

            <Button
              className="dialogue_bottom_button"
              onClick={userlogin}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Box>

        <Typography className="login_copyright_root" variant="span">
          {new Date().getFullYear()} © Ohyana.
        </Typography>
      </Box>
      <ErrorSnackbar />
    </>
  )
}

export default Login
