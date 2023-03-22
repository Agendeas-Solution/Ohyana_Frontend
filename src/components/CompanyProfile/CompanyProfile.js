import React, { useEffect, useState, useContext } from "react";
import ProfileImg from "../../assets/img/profile_logo.png";
import { Typography, Box, TextField, Tabs, Button, Tab, Table, TableCell, TableContainer, Paper, TableRow, TableHead } from "@mui/material";
import TabList from "@mui/lab/TabList";
import TableBody from '@mui/material/TableBody';
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useNavigate } from "react-router-dom";
import { GetCompanyProfile } from "../../services/apiservices/companyprofile";
import './index.css'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
const CompanyProfile = () => {
    const navigate = useNavigate();
    const [companyDetail, setCompanyDetail] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        GetCompanyProfile(
            {},
            (res) => {
                if (res.success) {
                    setCompanyDetail(res.data);
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }, []);
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
                                    {companyDetail?.name}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <EditRoundedIcon
                        onClick={() => {
                            console.log("Printing Edit icon");
                            navigate("/editcompanyprofile");
                        }}
                        className="edit_icon_profile cursor-pointer"
                    />
                </Box>
                <Box className="companyDetail">
                    <Box className="companyDetail_root">
                        <Typography className="companyDetail_field_heading" variant="span">
                            Email:
                        </Typography>
                        <Typography variant="span">
                            {companyDetail?.email}
                        </Typography>
                    </Box>
                    <Box className="companyDetail_root">
                        <Typography variant="span" className="companyDetail_field_heading">
                            City:
                        </Typography>
                        <Typography variant="span">
                            {companyDetail?.city}
                        </Typography>
                    </Box>
                    <Box className="companyDetail_root">
                        <Typography variant="span" className="companyDetail_field_heading">
                            State:
                        </Typography>
                        <Typography variant="span">
                            {companyDetail?.state}
                        </Typography>
                    </Box>
                    <Box className="companyDetail_root">
                        <Typography variant="span" className="companyDetail_field_heading">
                            Country:
                        </Typography>
                        <Typography variant="span">
                            {companyDetail?.country?.name}
                        </Typography>
                    </Box>
                    <Box className="companyDetail_root">
                        <Typography className="companyDetail_field_heading" variant="span">
                            GSTIN:
                        </Typography>
                        <Typography variant="span">
                            {companyDetail?.GSTIN}
                        </Typography>
                    </Box>
                    <Box className="companyDetail_root common_row">
                        <Typography className="companyDetail_field_heading" variant="span">
                            Business Type:
                        </Typography>
                        <Typography variant="span">
                            {companyDetail?.businessType}
                        </Typography>
                    </Box>
                    <Box className="companyDetail_root">
                        <Typography className="companyDetail_field_heading" variant="span">
                            IndiaMart CRM Key:
                        </Typography>
                        <Typography variant="span">
                            {companyDetail?.crmKey}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </div></>
    )
}

export default CompanyProfile