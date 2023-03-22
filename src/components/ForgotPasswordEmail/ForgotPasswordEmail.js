import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import CompanyLogo from "../../assets/img/Ohyana_logo.png";
import { useNavigate } from "react-router-dom";
import { ForgotPassword } from "../../services/apiservices/login";
import { Context as ContextSnackbar } from "../../context/pageContext";
import SuccessSnackbar from "../SuccessSnackbar/SuccessSnackbar";
import ErrorSnackbar from '../ErrorSnackbar/ErrorSnackbar';
const ForgotPasswordEmail = () => {
    const [userDetail, setUserDetail] = useState({
        email: "",
    });
    const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state;
    const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar);
    const handleForgotPassword = () => {
        console.log(userDetail.email);
        ForgotPassword({email:userDetail.email}, (res) => {
            setSuccessSnackbar({ ...successSnackbar, status: true, message: res.data.message })
        }, (err) => {
            setErrorSnackbar({ ...errorSnackbar, status: true, message: err.response.data.error })
        })
    }
    return (
        <>
            <Box className="login_page_root">
                <Box className="login_page_logo_root">
                    <img src={CompanyLogo} alt="Company logo" />
                </Box>
                <Box className="login_form_root">
                    <Typography className="login_heading_root" variant="span">
                        Welcome To Ohyana.
                    </Typography>
                    <Box className="login_email_root">
                        <label for="email">Email</label>
                        <TextField
                            autoComplete={true}
                            type="email"
                            value={userDetail.email}
                            variant="outlined"
                            placeholder="Email"
                            className="form-control"
                            onChange={(e) => {
                                setUserDetail({ ...userDetail, email: e.target.value });
                            }}
                        />
                    </Box>
                    <Box className="login_submit_button_root overflow-hidden">
                        <Button onClick={handleForgotPassword} variant="contained">
                            Get Link
                        </Button>
                    </Box>
                </Box>
                <Typography className="login_copyright_root" variant="span">
                    {new Date().getFullYear()} © Biguar Tech(India) Pvt. Ltd.
                </Typography>
            </Box>
            <SuccessSnackbar />
            <ErrorSnackbar />
        </>
    );
};

export default ForgotPasswordEmail;
