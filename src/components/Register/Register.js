import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Logo from '../../assets/img/Ohyana Logo.svg';
import { VerifyOTP, SentOtp, RegisterUser } from '../../services/apiservices/register';
import './index.css';
const Register = () => {
    const [values, setValues] = useState({
        email: "",
        showPassword: false
    });
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        companyName: "",
        password: "",
        contact_number: ""
    })
    const [otpValue, setOtpValue] = useState({
        value: null,
        status: false
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSentOtp = () => {
        SentOtp({ email: registerData?.email }, (res) => {
            if (res.success) {
                setOtpValue({
                    ...otpValue,
                    status: true
                })
            }
        }, (err) => {

        })
    }
    const handleOtp = () => {
        VerifyOTP({ email: registerData?.email, otp: otpValue.value }, (res) => {
        }, (err) => {
        })
    }
    const handleRegister = () => {
        RegisterUser(registerData, (res) => {
        }, (err) => {
        })
    }
    return (
        <>
            <Box className="register_section">
                <Box className="register_left_section">
                    <img className="Logo_img" src={Logo} alt="" />
                </Box>
                <Box className="register_right_section">
                    <Typography variant="span">Welcome To Ohyana.</Typography>
                    <Typography sx={{ color: "#8E8E8E", fontSize: "12px", marginBottom: "30px" }} variant="span">Let’s get Registered in Ohyana and get 14-days Free Triae to manage a business.</Typography>
                    <Box className="register_textfield">
                        <Box className="textfield">
                            <Typography variant="span">Name</Typography>
                            <TextField value={registerData?.name} onChange={(e) => {
                                setRegisterData({ ...registerData, name: e.target.value })
                            }} placeholder="Name" variant="outlined" />
                        </Box>
                        <Box className="textfield">
                            <Typography variant="span">Email</Typography>
                            <FormControl variant="outlined">
                                <OutlinedInput
                                    placeholder="Email"
                                    type={'email'}
                                    value={registerData?.email}
                                    onChange={(e) => {
                                        setRegisterData({ ...registerData, email: e.target.value })
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            {<Button onClick={handleSentOtp} className="verify_button" variant="contained">Verify</Button>}
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Box>
                    </Box>
                    <Box className="register_textfield">
                        <Box className="textfield" >
                            <Typography variant="span">Company Name</Typography>
                            <TextField value={registerData?.companyName} onChange={(e) => {
                                setRegisterData({ ...registerData, companyName: e.target.value })
                            }} placeholder="Company Name" variant="outlined" />
                        </Box>
                        <Box className="textfield" >
                            <Typography variant="span">Password</Typography>
                            <OutlinedInput
                                placeholder='Password'
                                autoFocus
                                autoComplete={false}
                                type={values.showPassword ? "text" : "password"}
                                value={registerData?.password}
                                onChange={(e) => {
                                    setRegisterData({ ...registerData, password: e.target.value })
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
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
                                }
                            />
                        </Box>
                    </Box>
                    <Box className="register_textfield">
                        <Box className="textfield">
                            <Typography variant="span">Contact No</Typography>
                            <TextField type="number" value={registerData?.contact_number} onChange={(e) => {
                                setRegisterData({ ...registerData, contact_number: e.target.value })
                            }} placeholder="ContactNo" variant="outlined" />
                        </Box>

                        <Box className="textfield">
                            <Typography variant="span">OTP</Typography>
                            <FormControl variant="outlined">
                                <OutlinedInput
                                    type={'number'}
                                    value={otpValue.value} onChange={(e) => {
                                        setOtpValue({ ...otpValue, value: e.target.value })
                                    }} placeholder="Enter OTP"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            {<Button onClick={handleOtp} className="verify_button" variant="contained">Verify</Button>}
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Box>
                    </Box>

                    <Box className="term_and_condition">
                        <FormGroup>
                            <FormControlLabel control={<Checkbox className="check_box_color" defaultChecked />} label="I Agree to all The Terms and Privacy Policy." />
                        </FormGroup>
                    </Box>
                    <Button onClick={handleRegister} className="next_button" variant="contained">Next</Button>
                </Box>
            </Box>
        </>
    )
}

export default Register