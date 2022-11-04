import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Logo from '../../assets/img/Ohyana Logo.svg';
import './index.css';
const Register = () => {
    const [values, setValues] = useState({
        email: "",
        showPassword: false
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
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
                            <TextField placeholder="Name" variant="outlined" />
                        </Box>
                        <Box className="textfield">
                            <Typography variant="span">Email</Typography>
                            <TextField placeholder="Email" variant="outlined" />
                        </Box>
                        {/* <FormControl variant="outlined">
                            <InputLabel sx={{ color: "#8e8e8e" }}>Email</InputLabel>
                            <OutlinedInput
                                type={'email'}
                                value={values.email}
                                onChange={(e) => setValues({ ...values, email: e.target.value })}
                                endAdornment={
                                    <InputAdornment position="end">
                                        {<Button className="verify_button" variant="contained">Verify</Button>}
                                    </InputAdornment>
                                }
                            />
                        </FormControl> */}
                    </Box>
                    <Box className="register_textfield">
                        <Box className="textfield" >
                            <Typography variant="span">Company Name</Typography>
                            <TextField placeholder="Company Name" variant="outlined" />
                        </Box>
                        <Box className="textfield" >
                            <Typography variant="span">Password</Typography>
                            <OutlinedInput
                                placeholder='Password'
                                autoFocus
                                autoComplete={false}
                                type={values.showPassword ? "text" : "password"}
                                value={values.password}
                                onChange={handleChange("password")}
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
                            <Typography variant="span">Contact Number</Typography>
                            <FormControl variant="outlined">
                                <OutlinedInput
                                    placeholder="Contact Number"
                                    type={'email'}
                                    value={values.email}
                                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            {<Button className="verify_button" variant="contained">Verify</Button>}
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Box>
                        <Box className="textfield">
                            <Typography variant="span">OTP</Typography>
                            <TextField placeholder="Enter OTP" variant="outlined" />
                        </Box>
                    </Box>

                    <Box className="term_and_condition">
                        <FormGroup>
                            <FormControlLabel  control={<Checkbox className="check_box_color" defaultChecked />} label="I Agree to all The Terms and Privacy Policy." />
                        </FormGroup>
                    </Box>
                    <Button className="next_button" variant="contained">Next</Button>
                </Box>
            </Box>
        </>
    )
}

export default Register