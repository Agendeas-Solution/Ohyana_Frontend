import React, { useEffect, useState, useContext } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import {
  GetAdminDepartmentList,
  GetAdminRole,
} from "../../services/apiservices/adminprofile";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AddEmployee } from "../../services/apiservices/staffDetail";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ErrorSnackbar from "../ErrorSnackbar/ErrorSnackbar";
import { useNavigate } from "react-router-dom";
import { Context as ContextSnackbar } from "../../context/pageContext";
const AddStaffMember = () => {
  const [userDetail, setUserDetail] = useState({
    employeeName: "",
    departmentId: null,
    email: "",
    jobRole: "",
    contactNo: "",
    password: "",
    gender: "",
    birthDate: "",
    showPassword: false,
  });
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state;
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar);
  const [departmentList, setDepartmentList] = useState([]);
  const [employeeJobRole, setEmployeeJobRole] = useState([]);
  const navigate = useNavigate();
  const handleChange = (prop) => (event) => {
    setUserDetail({ ...userDetail, [prop]: event.target.value });
  };
  useEffect(() => {
    GetAdminDepartmentList(
      {},
      (res) => {
        if (res?.status === 200) {
          setDepartmentList(res?.data?.department);
        }
      },
      (err) => {
        //
      }
    );
  }, []);
  useEffect(() => {
    {
      userDetail?.departmentId &&
        GetAdminRole(
          parseInt(userDetail?.departmentId),
          (res) => {
            if (res.status === 200) {
              setEmployeeJobRole(res.data?.roles);
              //
            }
          },
          (err) => {
            console.log("Printing Error of GetAdminRole", err);
          }
        );
    }
  }, [userDetail?.departmentId]);

  const handleClickShowPassword = () => {
    setUserDetail({
      ...userDetail,
      showPassword: !userDetail.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleAddEmployee = () => {
    if (
      userDetail.employeeName !== "" &&
      userDetail.departmentId !== null &&
      userDetail.email !== "" &&
      userDetail.jobRole !== "" &&
      userDetail.contactNo &&
      userDetail.password !== "" &&
      userDetail.birthDate !== "" &&
      userDetail.showPassword !== "" &&
      userDetail.gender !== ""
    ) {
      let employeeDetail = {
        name: userDetail.employeeName,
        email: userDetail.email,
        password: userDetail.password,
        roleId: userDetail.jobRole,
        departmentId: userDetail.departmentId,
        contact_number: userDetail.contactNo,
        gender: userDetail.gender,
        birthDay: userDetail.birthDate,
      };
      AddEmployee(
        employeeDetail,
        (res) => {
          navigate("/staff");
          setSuccessSnackbar({ ...successSnackbar, status: true, message: res.data.message })
        },
        (err) => {
          setErrorSnackbar({ ...errorSnackbar, status: true, message: err.response.data.error })
        }
      );
    } else {
      console.log(userDetail);
      //
    }
  };
  return (
    <>
      <Box className="add_staff_section mt-3 p-3">
        <Box className="input_field_row">
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Employee Name<span className="required_star">*</span>
            </Typography>
            <TextField
              autoComplete="off"
              placeholder="Employee Name"
              onChange={(e) => {
                setUserDetail({
                  ...userDetail,
                  employeeName: e.target.value,
                });
              }}
              value={userDetail.employeeName}
              variant="outlined"
            />
          </Box>
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Department<span className="required_star">*</span>
            </Typography>
            <Select
              value={userDetail?.departmentId}
              onChange={(e) => {
                setUserDetail({
                  ...userDetail,
                  departmentId: e.target.value,
                });
              }}
            >
              {departmentList &&
                departmentList.map((data) => {
                  return <MenuItem value={data?.id}>{data?.name}</MenuItem>;
                })}
            </Select>
          </Box>
        </Box>
        <Box className="input_field_row">
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Contact No:<span className="required_star">*</span>
            </Typography>
            <TextField
              type="number"
              placeholder="Contact No"
              onChange={(e) => {
                setUserDetail({ ...userDetail, contactNo: e.target.value });
              }}
              value={userDetail.contactNo}
              variant="outlined"
            />
          </Box>
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Job Role<span className="required_star">*</span>
            </Typography>
            <Select
              value={userDetail?.jobRole}
              onChange={(e) => {
                setUserDetail({ ...userDetail, jobRole: e.target.value });
              }}
            >
              {employeeJobRole &&
                employeeJobRole.map((data) => {
                  return <MenuItem value={data?.id}>{data?.name}</MenuItem>;
                })}
            </Select>
          </Box>
        </Box>
        <Box className="input_field_row">
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Email<span className="required_star">*</span>
            </Typography>
            <TextField
              placeholder="Enter Email"
              type="email"
              onChange={(e) => {
                setUserDetail({ ...userDetail, email: e.target.value });
              }}
              value={userDetail.email}
              variant="outlined"
            />
          </Box>
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              BirthDate<span className="required_star">*</span>
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                autoComplete="off"
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
        <Box className="input_field_row">
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Password<span className="required_star">*</span>
            </Typography>
            <OutlinedInput
              type={userDetail.showPassword ? "text" : "password"}
              value={userDetail.password}
              onChange={handleChange("password")}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {userDetail.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
          {/* <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Confirm Password<span className="required_star">*</span>
            </Typography>
            <OutlinedInput
              type={userDetail.showPassword ? "text" : "password"}
              value={userDetail.confirmpassword}
              onChange={handleChange("confirmpassword")}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {userDetail.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box> */}
          {/* <Box className="input_field_row"> */}
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Gender<span className="required_star">*</span>
            </Typography>
            <Select
              value={userDetail?.gender}
              onChange={(e) => {
                setUserDetail({ ...userDetail, gender: e.target.value });
              }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </Box>
        </Box>
        {/* </Box> */}

        <Box
          sx={{ justifyContent: "flex-start" }}
          className="input_field_row"
        >
          <Button
            onClick={handleAddEmployee}
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

export default AddStaffMember;
