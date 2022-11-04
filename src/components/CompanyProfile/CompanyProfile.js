import React, { useEffect, useState, useContext } from "react";
import ProfileImg from "../../assets/img/profile_logo.png";
import { Typography, Box, TextField, Tabs, Button, Tab, Table, TableCell, TableContainer, Paper, TableRow, TableHead } from "@mui/material";
import TabList from "@mui/lab/TabList";
import TableBody from '@mui/material/TableBody';
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useNavigate } from "react-router-dom";
import { GetAdminProfile } from "../../services/apiservices/adminprofile";
import moment from "moment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SuccessSnackbar from "../SuccessSnackbar/SuccessSnackbar";
import { Context as AuthContext } from "../../context/authContext/authContext";
import ErrorSnackbar from "../ErrorSnackbar/ErrorSnackbar";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import AttendanceData from "./AttendanceData";
const CompanyProfile = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState("Profile");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: '',
    });
    const [attendanceTab, setAttendanceTab] = useState("1");

    const handleTabChange = (event, newValue) => {
        setAttendanceTab(newValue);
    };
    const [userDetail, setUserDetail] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const { flagLoader } = useContext(AuthContext).state;
    const { setFlagLoader } = useContext(AuthContext);

    useEffect(() => {
        GetAdminProfile(
            {},
            (res) => {
                if (res.status === 200) {
                    setUserDetail(res.data);
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }, []);
    localStorage.setItem("userEmail", userDetail?.member?.email)

    return (
        <>  <div className="w-100 mt-4">
            <Box className="profile_section">
                <Box className="profile_img">
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Box className="userName_and_position">
                            <AccountCircleRoundedIcon className="userprofile_dummy_icon" />
                            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: 2 }}>
                                <Typography
                                    variant="span"
                                    sx={{ fontWeight: "bold", fontSize: "18px" }}
                                >
                                    {userDetail?.member?.name}
                                </Typography>
                                <Typography sx={{ marginTop: "10px" }} variant="span">
                                    {userDetail?.member?.role?.name}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <EditRoundedIcon
                        onClick={() => {
                            console.log("Printing Edit icon");
                            navigate("/editprofile");
                        }}
                        className="edit_icon_profile cursor-pointer"
                    />
                </Box>

                <Box className="profile_detail">
                    {/* <Typography variant="span" className="profile_detail_heading">
                        Profile Detail
                    </Typography> */}
                    <Box className="userdetail_root">
                        <Typography className="userdetail_field_heading" variant="span">
                            Contact No:
                        </Typography>
                        <Typography variant="span">
                            {userDetail?.member?.contact_number}
                        </Typography>
                    </Box>
                    <Box className="userdetail_root">
                        <Typography variant="span" className="userdetail_field_heading">
                            Email:
                        </Typography>
                        <Typography variant="span">
                            {userDetail?.member?.email}
                        </Typography>
                    </Box>
                    <Box className="userdetail_root">
                        <Typography className="userdetail_field_heading" variant="span">
                            Password:
                        </Typography>
                        <Box>
                            <TextField
                                className="password_field"
                                type={showPassword ? "text" : "password"}
                                value={userDetail?.member?.password}
                                variant="standard"
                            />
                            {showPassword ? (
                                <Visibility
                                    onClick={() => {
                                        setShowPassword(!showPassword);
                                    }}
                                />
                            ) : (
                                <VisibilityOff
                                    onClick={() => {
                                        setShowPassword(!showPassword);
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                    <Box className="userdetail_root">
                        <Typography className="userdetail_field_heading" variant="span">
                            Gender:
                        </Typography>
                        <Typography variant="span">
                            {userDetail?.member?.gender}
                        </Typography>
                    </Box>
                    <Box className="userdetail_root">
                        <Typography className="userdetail_field_heading" variant="span">
                            Birthday:
                        </Typography>
                        <Typography variant="span">
                            {userDetail?.member?.birthDay}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </div></>
    )
}

export default CompanyProfile