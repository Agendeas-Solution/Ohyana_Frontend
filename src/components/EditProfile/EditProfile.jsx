import React, { useEffect, useState, useContext, lazy } from "react";
import { Typography, Box, TextField, InputLabel, FormControl, Button, Select, MenuItem, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import "./index.css";
import { EditAdminProfile, GetAdminProfile, } from "../../services/apiservices/adminprofile";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Context as ContextSnackbar } from "../../context/pageContext";

const ErrorSnackbar = React.lazy(() => import("../ErrorSnackbar/ErrorSnackbar"));
const SuccessSnackbar = React.lazy(() => import("../SuccessSnackbar/SuccessSnackbar"));
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
        if (res?.success) {
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
        if (res.success) {
          setSuccessSnackbar({ ...successSnackbar, status: true, message: "Profile Edited Successfully" });
          navigate("/profile");
        }
      },
      (err) => {
        console.log("Printing Err", err);
        setErrorSnackbar({ ...errorSnackbar, status: true, message: err.response.data.error })
      });

  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Box className="main_section">
        <Box className="input_field_row">
          <Box className="input_fields">
            <TextField
              label="Employee Name"
              autoComplete="off"
              onChange={(e) => {
                setUserDetail({ ...userDetail, employeeName: e.target.value });
              }}
              value={userDetail.employeeName}
              variant="outlined"
            />
          </Box>
          <Box className="input_fields">
            <TextField
              label="Job Role"
              autoComplete="off"
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
            <TextField
              label="Email"
              autoComplete="off"
              onChange={(e) => {
                setUserDetail({ ...userDetail, email: e.target.value });
              }}
              value={userDetail.email}
              variant="outlined"
            />
          </Box>
          <Box className="input_fields">
            <TextField
              label="Contact No"
              autoComplete="off"
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
            <FormControl>
              <InputLabel>Select Gender</InputLabel>
              <Select
                label="Select Gender"
                value={userDetail.gender}
                className="w-100"
                onChange={(e) => {
                  setUserDetail({ ...userDetail, gender: e.target.value });
                }}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Female</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box className="input_field_row">
          <Box className="input_fields">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Select Date"
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
        <Box
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
          className="input_field_row">
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
