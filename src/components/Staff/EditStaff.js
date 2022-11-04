import React, { useEffect, useState } from "react";
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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  EditEmployee,
  GetAdminStaffProfileDetail,
} from "../../services/apiservices/staffDetail";
import { useNavigate } from "react-router-dom";
const EditStaff = () => {
  const [userDetail, setUserDetail] = useState({
    employeeName: "",
    departmentId: null,
    email: "",
    jobRole: "",
    contactNo: "",
    password: "",
    gender: "",
    confirmpassword: "",
    birthDate: "",
    showPassword: false,
  });
  const [departmentList, setDepartmentList] = useState([]);
  const [employeeJobRole, setEmployeeJobRole] = useState([]);
  const [successDialog, setSuccessDialog] = useState(false);
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
    let path = window.location.pathname;

    console.log("Printing Path of ", path);
    console.log("Printing ", path.split("/").pop());
    path = path.split("/").pop();

    GetAdminStaffProfileDetail(
      parseInt(path),
      (res) => {
        if (res.status === 200) {
          setUserDetail({
            ...userDetail,
            employeeName: res.data.member.name,
            departmentId: res.data.member.department.id,
            contactNo: res.data.member.contact_number,
            jobRole: res.data.member.role.id,
            email: res.data.member.email,
            birthDate: res.data.member.birthDay,
            password: res.data.member.password,
            confirmpassword: res.data.member.password,
            gender: res.data.member.gender,
          });
        }
      },
      (err) => {
        console.log("Printing ", err);
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
      userDetail.contactNo !== "" &&
      userDetail.password === userDetail.confirmpassword &&
      userDetail.confirmpassword !== "" &&
      userDetail.password !== "" &&
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
      let path = window.location.pathname;

      console.log("Printing Path of ", path);
      console.log("Printing ", path.split("/").pop());
      path = path.split("/").pop();

      EditEmployee(
        parseInt(path),
        employeeDetail,
        (res) => {
          if (res.status === 200) {
            setSuccessDialog(true);
          }
        },
        (err) => {
          //
        }
      );
    } else {
      console.log(userDetail);
      //
    }
  };
  return (
    <>
      <Box className="edit_profile_section">
        <Box className="input_field_row">
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Employee Name<span className="required_star">*</span>
            </Typography>
            <TextField
              autoComplete="off"
              placeholder="Employee Name"
              onChange={(e) => {
                setUserDetail({ ...userDetail, employeeName: e.target.value });
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
                setUserDetail({ ...userDetail, departmentId: e.target.value });
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
              autoComplete="off"
              placeholder="Enter Email"
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
          <Box className="input_fields">
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
          </Box>
        </Box>
        <Box className="input_field_row">
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
        <Box sx={{ justifyContent: "flex-start" }} className="input_field_row">
          <Button
            onClick={handleAddEmployee}
            variant="contained"
            className="edit_page_save_button"
          >
            Save
          </Button>
        </Box>
        <Dialog open={successDialog} onClose={() => setSuccessDialog(false)}>
          <Box className="successdialog">
            <Box className="drawdownsuccessellipse">
              {/* <Box className="canceliconbackground"><CancelIcon /></Box> */}
              <Box>
                <CheckCircleIcon />
              </Box>
            </Box>
            <DialogContent>
              <DialogContentText className="successful">
                Staff Edited Successful.
              </DialogContentText>
              <DialogContentText className="successfulmessage">
                <Button onClick={() => navigate("/staff")} variant="outlined">
                  Ok
                </Button>
              </DialogContentText>
            </DialogContent>
          </Box>
        </Dialog>
      </Box>
    </>
  );
};

export default EditStaff;
