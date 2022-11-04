import React, { useEffect, useState, useContext } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import ProfileImg from "../../assets/img/profile_logo.png";
import { useNavigate } from "react-router-dom";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import "./index.css";
import {
  EditAdminProfile,
  GetAdminProfile,
} from "../../services/apiservices/adminprofile";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Context as ContextSnackbar } from "../../context/pageContext";
import ErrorSnackbar from "../ErrorSnackbar/ErrorSnackbar";
const EditProfile = () => {
  const [userDetail, setUserDetail] = useState({
    employeeName: "",
    jobRole: "",
    email: "",
    contactNo: "",
    password: "",
    gender: "",
    confirmpassword: "",
    birthDate: "",
    showPassword: false,
  });
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state;
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar);
  const navigate = useNavigate();
  useEffect(() => {
    GetAdminProfile(
      {},
      (res) => {
        if (res?.status === 200) {
          let { member: adminDetail } = res?.data;
          console.log(adminDetail);
          setUserDetail({
            ...userDetail,
            employeeName: adminDetail.name,
            jobRole: adminDetail.role.name,
            email: adminDetail.email,
            contactNo: adminDetail?.contact_number,
            password: adminDetail.password,
            gender: adminDetail.gender,
            birthDate: adminDetail.birthDay,
          });
        }
      },
      (err) => {
        console.log(err);
        //
      }
    );
  }, []);
  const handleChange = (prop) => (event) => {
    setUserDetail({ ...userDetail, [prop]: event.target.value });
  };
  useEffect(() => {
    console.log("Printing userDetail", userDetail.birthDate);
    // //
  }, [userDetail]);

  const handleClickShowPassword = () => {
    setUserDetail({
      ...userDetail,
      showPassword: !userDetail.showPassword,
    });
  };
  const SaveProfile = () => {
    let data = {
      name: userDetail.employeeName,
      email: userDetail.email,
      password: userDetail.password,
      contact_number: userDetail.contactNo,
      gender: userDetail.gender,
      birthDay: userDetail.birthDate,
    };
    console.log("Printing Data", data);
    EditAdminProfile(
      data,
      (res) => {
        if (res.status === 200) {
          setSuccessSnackbar({ ...successSnackbar, status: true, message: "Profile Edited Successfully" });
          navigate("/profile");
        }
      },
      (err) => {
        console.log("Printing Err", err);
        //debugger;
        setErrorSnackbar({ ...errorSnackbar, status: true, message: err.response.data.error })
      });

  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Box className="edit_profile_section">
        <Box className="input_field_row">
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Employee Name
            </Typography>
            <TextField
              onChange={(e) => {
                setUserDetail({ ...userDetail, employeeName: e.target.value });
              }}
              value={userDetail.employeeName}
              className="form-control"
              variant="outlined"
              label=""
            />
          </Box>
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Job Role
            </Typography>
            <TextField
              disabled
              onChange={(e) => {
                setUserDetail({ ...userDetail, jobRole: e.target.value });
              }}
              value={userDetail.jobRole}
              variant="outlined"
            />
          </Box>
        </Box>
        <Box className="input_field_row">
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Email
            </Typography>
            <TextField
              autoComplete={false}
              onChange={(e) => {
                setUserDetail({ ...userDetail, email: e.target.value });
              }}
              value={userDetail.email}
              variant="outlined"
            />
          </Box>
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Contact No:
            </Typography>
            <TextField
              onChange={(e) => {
                setUserDetail({ ...userDetail, contactNo: e.target.value });
              }}
              value={userDetail.contactNo}
              variant="outlined"
            />
          </Box>
        </Box>
        <Box className="input_field_row">
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Password
            </Typography>
            <OutlinedInput
              autoFocus
              autoComplete={false}
              type={userDetail.showPassword ? "text" : "password"}
              value={userDetail.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {userDetail.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Gender
            </Typography>

            <Select
              value={userDetail.gender}
              className="w-100"
              onChange={(e) => {
                setUserDetail({ ...userDetail, gender: e.target.value });
              }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </Box>
        </Box>
        <Box className="input_field_row">
          {/* <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Confirm Password
            </Typography>
            <OutlinedInput
              type={userDetail.showPassword ? "text" : "password"}
              value={userDetail.confirmpassword}
              onChange={(e) => {
                setUserDetail({
                  ...userDetail,
                  confirmpassword: e.target.value,
                });
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {userDetail.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box> */}
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Birth Date:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                inputFormat="dd/MM/yyyy"
                value={userDetail.birthDate}
                onChange={(e) => {
                  setUserDetail({ ...userDetail, birthDate: e });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        <Box sx={{ justifyContent: "flex-start" }} className="input_field_row">
          <Button
            onClick={SaveProfile}
            variant="contained"
            className="edit_page_save_button"
          >
            Save
          </Button>
        </Box>
      </Box>
      <ErrorSnackbar />
    </>
  );
};

export default EditProfile;
