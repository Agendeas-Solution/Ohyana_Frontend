import React, { useEffect, useState, useContext } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material';
import CompanyLogo from '../../assets/img/Ohyana_logo.png';
import { ResetPassword } from "../../services/apiservices/login";
import { useSearchParams } from 'react-router-dom';
import { Context as ContextSnackbar } from "../../context/pageContext";
import SuccessSnackbar from '../SuccessSnackbar/SuccessSnackbar';
import ErrorSnackbar from '../ErrorSnackbar/ErrorSnackbar';
const ForgetPassword = () => {
    const [password, setPassword] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state;
    const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar);

    let [searchParams, setSearchParams] = useSearchParams();
    let user = searchParams.get("rstPwd");
    const upddatePassword = () => {
        let user = searchParams.get("rstPwd");
        if (password.newPassword === password.confirmPassword) {
            ResetPassword(user, { password: password.newPassword }, (res) => {
                setSuccessSnackbar({ ...successSnackbar, status: true, message: res.data.message })
            }, (err) => {
                setErrorSnackbar({ ...errorSnackbar, status: true, message: err.response.data.error })
            })
        }
        else {
            setErrorSnackbar({ ...errorSnackbar, status: true, message: "Please Enter Same Password." })
        }
    }
    return (
        <>
            {/* <Header/> */}
            <Box className="login_page_root">
                <Box className="login_page_logo_root">
                    <img src={CompanyLogo} alt="Company logo" />
                </Box>
                <Box className="login_form_root">
                    <Typography className="login_heading_root" variant='span'>Welcome To Ohyana.</Typography>
                    <Box className="login_email_root">
                        <label for="newpassword">New Password</label>
                        <TextField type="password" value={password.newPassword} variant="outlined" placeholder="New Password"
                            onChange={(e) => {
                                setPassword({ ...password, newPassword: e.target.value });
                            }} />
                    </Box>
                    <Box className="login_password_root">
                        <label for="confirmpassword">Confirm Password</label>
                        <TextField variant="outlined" value={password.confirmPassword} type="password" onChange={(e) => {
                            setPassword({ ...password, confirmPassword: e.target.value });
                        }} placeholder="Confirm Password" />
                    </Box>
                    <Box className="login_submit_button_root">
                        <Button variant="contained" onClick={upddatePassword}>Update</Button>
                    </Box>
                </Box>
                <Typography className="login_copyright_root" variant="span">{(new Date().getFullYear())} © Biguar Tech(India) Pvt. Ltd.</Typography>
            </Box>
            <SuccessSnackbar />
            <ErrorSnackbar />
        </>
    )
}

export default ForgetPassword