import React, { useEffect, useState, useContext,lazy } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import "./index.css";
import { login } from "../../services/apiservices/login";
import { Context as AuthContext } from "../../context/authContext/authContext";
import { useNavigate } from "react-router-dom";
import { Context as ContextSnackbar } from "../../context/pageContext";
import Logo from "../../assets/img/Ohyana Logo Blue.svg";
import { socket } from "../../App";
const ErrorSnackbar = React.lazy(() => import("../ErrorSnackbar/ErrorSnackbar"));
const Login = () => {
  const { setAuthorize, setFlagLoader } = useContext(AuthContext);
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  });
  const { errorSnackbar } = useContext(ContextSnackbar)?.state;
  const { setErrorSnackbar } = useContext(ContextSnackbar);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const userlogin = () => {
    if (userDetail.email !== "" && userDetail.password !== "") {
      setFlagLoader(true);
      login(
        { email: userDetail.email, password: userDetail.password },
        (res) => {
          ;
          if (res.success) {
            setAuthorize(true);
            setFlagLoader(false);
            navigate("/profile");
            socket.emit("join", { email: userDetail?.email });
          } else {
            if (res?.data?.error) {
              setErrorMessage(res?.data?.error?.message);
            }
          }
        },
        (resError) => {
          setErrorSnackbar({
            ...errorSnackbar,
            status: true,
            message: resError.response.data.error,
          });
          setFlagLoader(false);
        }
      );
    } else {
      setErrorSnackbar({
        ...errorSnackbar,
        status: true,
        message: "Username and password are required",
      });
    }
  };
  return (
    <>
      <Box className="login_page_root">
        <Box className="login_page_logo_root">
          <img src={Logo} alt="Company logo" />
        </Box>
        <Box className="login_form_root">
          <Typography className="login_heading_root" variant="span">
            Welcome To Ohyana.
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              userlogin();
            }}
            className="w-100"
          >
            <Box className="login_email_root">
              <Typography>Email</Typography>
              <TextField
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
            <Box className="login_password_root">
              <Typography>Password</Typography>
              <TextField
                variant="outlined"
                type="password"
                value={userDetail.password}
                onChange={(e) => {
                  setUserDetail({ ...userDetail, password: e.target.value });
                }}
                placeholder="Password"
              />
            </Box>
            <Typography className="login_forget_password_root" variant="span">
              <Button onClick={() => navigate("/forgotpassword")}>
                {" "}
                Forgotten password ?{" "}
              </Button>
            </Typography>
            <Box className="login_submit_button_root overflow-hidden">
              <Button type="submit" onClick={userlogin} variant="contained">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
        <Typography className="login_copyright_root" variant="span">
          {new Date().getFullYear()} © Ohyana.
        </Typography>
      </Box>
      <ErrorSnackbar />
    </>
  );
};

export default Login;
