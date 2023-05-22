import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Logo from '../../assets/img/Ohyana Logo.svg'
import {
  VerifyOTP,
  SentOtp,
  RegisterUser,
} from '../../services/apiservices/register'
import './index.css'
const Register = () => {
  const [values, setValues] = useState({
    email: '',
    showPassword: false,
  })
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    companyName: '',
    password: '',
    contact_number: '',
  })
  const [otpValue, setOtpValue] = useState({
    value: null,
    emailVerifyStatus: false,
    otpVerifyStatus: false,
  })

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }
  const handleMouseDownPassword = event => {
    event.preventDefault()
  }
  const handleSentOtp = () => {
    SentOtp(
      { email: registerData?.email },
      res => {
        if (res.success) {
          setOtpValue({
            ...otpValue,
            emailVerifyStatus: true,
          })
        }
      },
      err => {},
    )
  }
  const handleOtp = () => {
    VerifyOTP(
      { email: registerData?.email, otp: otpValue.value },
      res => {
        setOtpValue({
          ...otpValue,
          otpVerifyStatus: true,
        })
      },
      err => {},
    )
  }
  const handleRegister = () => {
    RegisterUser(
      registerData,
      res => {},
      err => {},
    )
  }
  return (
    <>
      <Box className="register_section">
        <Box className="register_left_section">
          <img className="Logo_img" src={Logo} alt="" />
        </Box>

        <Box className="register_right_section">
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '50px',
              }}
            >
              <Typography
                sx={{
                  color: 'black',
                  fontWeight: '600',
                  fontSize: '20px',
                  marginBottom: '10px',
                }}
                variant="span"
              >
                Welcome To Ohyana.
              </Typography>
              <Typography
                sx={{ color: '#8E8E8E', fontSize: '15px' }}
                variant="span"
              >
                Let's register with Ohyana and get a 14-day free trial to manage
                a business.
              </Typography>
            </Box>

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <TextField
                  className="register_input_fields"
                  label="Name"
                  placeholder="Name"
                  value={registerData?.name}
                  onChange={e => {
                    setRegisterData({ ...registerData, name: e.target.value })
                  }}
                  variant="outlined"
                />
                <TextField
                  className="register_input_fields"
                  label="Company Name"
                  placeholder="Company Name"
                  variant="outlined"
                  value={registerData?.companyName}
                  onChange={e => {
                    setRegisterData({
                      ...registerData,
                      companyName: e.target.value,
                    })
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <TextField
                  className="register_input_fields"
                  label="Email"
                  type={'email'}
                  value={registerData?.email}
                  onChange={e => {
                    setRegisterData({ ...registerData, email: e.target.value })
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          sx={{
                            margin: '0px',
                            backgroundColor: '#2E3591',
                            boxShadow: 'none',
                          }}
                          variant="contained"
                          onClick={handleSentOtp}
                        >
                          Send Otp
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  className="register_input_fields"
                  label="Contact No"
                  placeholder="ContactNo"
                  type="number"
                  value={registerData?.contact_number}
                  onChange={e => {
                    setRegisterData({
                      ...registerData,
                      contact_number: e.target.value,
                    })
                  }}
                  variant="outlined"
                />
              </Box>
              <Box className="input_field_row">
                <TextField
                  className="register_input_fields"
                  label="Password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={registerData?.password}
                  onChange={e => {
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
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
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {otpValue.emailVerifyStatus && (
                  <TextField
                    className="register_input_fields"
                    label="Otp"
                    type={'number'}
                    value={otpValue?.value}
                    onChange={e => {
                      setOtpValue({
                        ...otpValue,
                        value: parseInt(e.target.value),
                      })
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            sx={{
                              margin: '0px',
                              backgroundColor: '#2E3591',
                              boxShadow: 'none',
                            }}
                            variant="contained"
                            onClick={handleOtp}
                          >
                            Verify
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Box>
              <FormGroup sx={{ marginTop: '10px' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{ color: '#2E3591' }}
                      className="check_box_color"
                      defaultChecked
                    />
                  }
                  label="I Agree to all The Terms and Privacy Policy."
                />
              </FormGroup>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                disabled={otpValue.otpVerifyStatus ? false : true}
                sx={{ width: '30%' }}
                onClick={handleRegister}
                variant="contained"
                className={otpValue.otpVerifyStatus ? 'register_button' : ''}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Register
