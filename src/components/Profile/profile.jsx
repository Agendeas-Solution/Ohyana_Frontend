import React, { useEffect, useState, useContext } from "react";
import SideBar from "../SideBar/SideBar";
import "./index.css";
import ProfileImg from "../../assets/img/profile_logo.png";
import { Typography, Box } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import UserProfile from "../UserProfile/UserProfile";
import EditProfile from "../EditProfile/EditProfile";
import { Context as ContextActivePage } from "../../context/pageContext";
import Dashboard from "../Dashboard/index";
import Notification from "../Notification/Notification";
import Client from "../Client/Client";
import ClientProfile from "../ClientProfile/ClientProfile";
import AddClient from "../AddClient/AddClient";
import Staff from "../Staff/Staff";
import StaffProfile from "../Staff/StaffProfile";
import AddStaffMember from "../Staff/AddStaffMember";
import Calendar from "../Calendar/Calendar";
import Settings from "../Settings/Settings";
import DepartmentList from "../Settings/DepartmentList";
import Sales from "../Settings/Department";
import ProductList from "../Settings/ProductList";
const Profile = () => {
  const [pathName, setPathName] = useState("");
  //   const { ActivePage } = useContext(ContextActivePage)?.state;
  //   const { setActivePage } = useContext(ContextActivePage);
  useEffect(() => {
    let path = window.location.pathname;
    setPathName(path);
    console.log("Printing Path of ", path);
  });
  //console.log(";;", ActivePage);
  return (
    <>
      <Header />
      {/* <Box className="home_page_section">
                <Box sx={{ width: "15%" }}>
                    <SideBar />
                </Box>
                {pathName === "/profile" && <UserProfile />}
                {
                    pathName === "/editprofile" && <EditProfile />
                }
                {pathName === "/dashboard" && <Dashboard />}
                {
                    pathName === "/notification" && <Notification />
                }
                {
                    pathName === "/client" && <Client />
                }
                {
                    pathName === "/clientprofile" && <ClientProfile />
                }
                {pathName === "/addclient" && <AddClient />}
                {pathName === "/staff" && <Staff />}

                {pathName === "/staffprofile" && <StaffProfile />}
                {pathName === "/addstaffmember" && <AddStaffMember />}
                {pathName === "/calendar" && <Calendar />}
                {pathName === "/settings" && <Settings />}
                {pathName === "/departmentlist" && <DepartmentList />}
                {pathName === "/sales" && <Sales />}
                {pathName === "/productlist" && <ProductList />}
            </Box> */}
    </>
  );
};

export default Profile;
