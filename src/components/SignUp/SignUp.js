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
import Logo from '../../assets/img/Ohyana Logo.svg';
import './index.css';
const SignUp = () => {
    const [values, setValues] = useState({
        email: ""
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
            <Box className="signup_section">
                <Box className="signup_left_section">
                    <img className="Logo_img" src={Logo} alt="" />
                </Box>
                <Box className="signup_right_section">
                    <Typography sx={{ height: "25%" }} variant="span">Sign Up</Typography>
                    <Typography variant="span">Welcome to Ohyana.</Typography>
                    <Typography sx={{ color: "#8E8E8E", fontSize: "12px", marginBottom: "30px" }} variant="span">Thanks you for choosing Ohyana. Let’s go  for the
                        next step of business.</Typography>
                    <Box className="textfield">
                        <Typography variant="span">Email</Typography>
                        <FormControl variant="outlined">
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
                        </FormControl>
                    </Box>
                    <Box className="textfield">
                        <Typography variant="span">Verification Code</Typography>
                        <TextField placeholder="Verification Code" variant="outlined" />
                    </Box>
                    <Button variant="contained">Next</Button>
                    <Box className="copyright_footer">
                        <Typography variant="span">Already have an account? <Button>Log in.</Button></Typography>
                        <Typography variant="span">2022 © Ohyana.</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default SignUp