import { React, useContext, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import "./App.scss";
import Login from "./components/Login/Login";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import Profile from "./components/Profile/profile";
import AddClient from "./components/AddClient/AddClient";
import { Context as AuthContext } from "./context/authContext/authContext";
import { Box } from "@mui/material";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import UserProfile from "./components/UserProfile/UserProfile";
import EditProfile from "./components/EditProfile/EditProfile";
import Dashboard from "./components/Dashboard";
import Notification from "./components/Notification/Notification";
import Client from "./components/Client/Client";
import ClientProfile from "./components/ClientProfile/ClientProfile";
import Department from "./components/Settings/Department";
import Staff from "./components/Staff/Staff";
import StaffProfile from "./components/Staff/StaffProfile";
import AddStaffMember from "./components/Staff/AddStaffMember";
import Calendar from "./components/Calendar/Calendar";
import Settings from "./components/Settings/Settings";
import DepartmentList from "./components/Settings/DepartmentList";
import ProductList from "./components/Settings/ProductList";
import Loader from "./components/Loader/Loader";
import EditClient from "./components/EditClient/EditClient";
import EditStaff from "./components/Staff/EditStaff";
import Cookie from "js-cookie";
import ForgotPasswordEmail from "./components/ForgotPasswordEmail/ForgotPasswordEmail";
import SignUp from "./components/SignUp/SignUp";
import Register from "./components/Register/Register";
import { clearLoginToken } from "./services/storage";
import { io } from "socket.io-client";
import { Context as ContextSnackbar } from "./context/pageContext";
import CompanyProfile from "./components/CompanyProfile/CompanyProfile";
import Premium from "./components/Premium/Premium";
import HolidayAndLeaveManagement from "./components/HolidayAndLeaveManagement/HolidayAndLeaveManagement";
import Statistics from "./components/Statistics/Statistics";
import BusinessCard from "./components/Client/BusinessCard";
import Support from "./components/Support/Support";
import Complaint from "./components/Complaint/Complaint";
import Orders from "./components/Orders/Orders";
import DashboardEmployee from "./components/DashboardEmployee/DashboardEmployee";
import Task from "./components/Task/Task";
import TaskDetail from "./components/Task/TaskDetail";
import OrderDetail from "./components/Orders/OrderDetail";
import Poll from "./components/Settings/Poll";
import Dealer from "./components/Dealer/Dealer";
import EditCompanyProfile from "./components/CompanyProfile/EditCompanyProfile";
import AddProduct from "./components/Settings/AddProduct";
import JobRolesList from "./components/Settings/JobRolesList";
const socket = io("http://192.168.1.65:8008");
const App = () => {
  const { successSnackbar, errorSnackbar, notificationSnackbar } =
    useContext(ContextSnackbar)?.state;
  const { setSuccessSnackbar, setErrorSnackbar, setNotificationSnackbar } =
    useContext(ContextSnackbar);
  const { setPermissions } = useContext(AuthContext);
  const { authorize, flagLoader, permissions } = useContext(AuthContext).state;
  const [pathName, setPathName] = useState("");
  // const socket = io("http://159.89.165.83");
  const ProtectedRoutes = () => {
    return Cookie.get("userToken") ? <Outlet /> : <Navigate to="/login" />;
  };
  useEffect(() => {
    let path = window.location.pathname;
    setPathName(path);
  });
  useEffect(() => {
    var retrievedObject = JSON.parse(localStorage.getItem("permissions"));
    setPermissions(retrievedObject);
    socket.on("reJoin", () => {
      socket.emit("join", { email: localStorage.getItem("userEmail") });
    });
    socket.on("connect", () => {
      console.log("Successfully connected to server");
      socket.emit("join", { email: localStorage.getItem("userEmail") });
    });
    socket.on("permissionChanged", () => {
      clearLoginToken();
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Box
          className={Cookie.get("userToken") ? "login_page_section" : ""}
          sx={{ width: "15%" }}
        ></Box>
        <div className="d-flex">
          {Cookie.get("userToken") && pathName !== "/login" ? (
            <SideBar />
          ) : null}
          <div
            className={
              Cookie.get("userToken") && pathName !== "/login"
                ? "width-main"
                : "w-100"
            }
          >
            {Cookie.get("userToken") && pathName !== "/login" ? (
              <Header />
            ) : null}
            <Box className="home_page_section">
              <Routes>
                <Route path="/" element={<ProtectedRoutes />}>
                  {/* <Route path=" /resetpassword" element={<ForgetPassword />}></Route> */}
                  <Route path="/" element={<UserProfile />}></Route>
                  <Route path="/profile" element={<UserProfile />}></Route>
                  <Route path="/editprofile" element={<EditProfile />}></Route>
                  <Route path="/dashboard" element={<Dashboard />}></Route>
                  <Route
                    path="/dashboardemployee"
                    element={<DashboardEmployee />}
                  ></Route>
                  <Route
                    path="/notification"
                    element={<Notification />}
                  ></Route>
                  {permissions?.clientMenu && (
                    <Route path="/client" element={<Client />}></Route>
                  )}
                  {permissions?.clientMenu && (
                    <Route
                      path="/clientprofile/:id"
                      element={<ClientProfile />}
                    ></Route>
                  )}
                  {permissions?.editClient && (
                    <Route
                      path="/editclient/:id"
                      element={<EditClient />}
                    ></Route>
                  )}
                  {permissions?.editStaff && (
                    <Route
                      path="/editstaff/:id"
                      element={<EditStaff />}
                    ></Route>
                  )}
                  {permissions?.editClient && (
                    <Route path="/addclient" element={<AddClient />}></Route>
                  )}
                  {permissions?.staffMenu && (
                    <Route path="/staff" element={<Staff />}></Route>
                  )}
                  {permissions?.staffMenu && (
                    <Route
                      path="/staffprofile/:id"
                      element={<StaffProfile />}
                    ></Route>
                  )}
                  <Route path="*" element={<Login />}></Route>
                  {permissions?.editStaff && (
                    <Route
                      path="/addstaffmember"
                      element={<AddStaffMember />}
                    ></Route>
                  )}
                  <Route path="/task" element={<Task />}></Route>
                  <Route path="/dealer" element={<Dealer />}></Route>
                  <Route
                    path="/taskdetail/:id"
                    element={<TaskDetail />}
                  ></Route>
                  <Route path="/calendar" element={<Calendar />}></Route>
                  <Route path="/report" element={<Statistics />}></Route>
                  <Route path="/support" element={<Support />}></Route>
                  <Route path="/complaint/:id" element={<Complaint />}></Route>
                  <Route path="/premium" element={<Premium />}></Route>
                  <Route path="/orders" element={<Orders />}></Route>
                  <Route path="/poll" element={<Poll />}></Route>
                  <Route
                    path="/orderdetail/:id"
                    element={<OrderDetail />}
                  ></Route>
                  <Route
                    path="/leaveholidaymanagement"
                    element={<HolidayAndLeaveManagement />}
                  ></Route>
                  <Route
                    path="/companyprofile"
                    element={<CompanyProfile />}
                  ></Route>
                  <Route
                    path="/editcompanyprofile"
                    element={<EditCompanyProfile />}
                  ></Route>
                  {permissions?.settingMenu && (
                    <Route path="/settings" element={<Settings />}></Route>
                  )}
                  {permissions?.viewDepartment && (
                    <Route
                      path="/departmentlist"
                      element={<DepartmentList />}
                    ></Route>
                  )}
                  {permissions?.viewDepartment && (
                    <Route
                      path="/jobrolelist/:id"
                      element={<JobRolesList />}
                    ></Route>
                  )}
                  {permissions?.viewDepartment && (
                    <Route
                      path="/jobroleaccess/:id"
                      element={<Department />}
                    ></Route>
                  )}
                  {permissions?.viewProduct && (
                    <Route
                      path="/productlist"
                      element={<ProductList />}
                    ></Route>
                  )}
                </Route>
                <Route path="/addproduct" element={<AddProduct />}></Route>
                <Route path="/editproduct/:id" element={<AddProduct />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route
                  path="/resetpassword"
                  element={<ForgetPassword />}
                ></Route>
                <Route
                  path="/forgotpassword"
                  element={<ForgotPasswordEmail />}
                ></Route>
              </Routes>
            </Box>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
export { socket };
