import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom'
import './App.scss'
import { Context as AuthContext } from './context/authContext/authContext'
import { Box } from '@mui/material'
import Cookie from 'js-cookie'
import { clearLoginToken } from './services/storage'
// const SideBar = React.lazy(() => import('./components/SideBar/SideBar'))
import SideBar from './components/SideBar/SideBar';
import Header from  './components/Header/Header';
import { io } from 'socket.io-client'
import { Context as ContextSnackbar } from './context/pageContext'
const socket = io('http://192.168.1.65:9009')
const Login = React.lazy(() => import('./components/Login/Login'))
const ForgetPassword = React.lazy(() =>
  import('./components/ForgetPassword/ForgetPassword'),
)
const Profile = React.lazy(() => import('./components/Profile/profile'))
const AddClient = React.lazy(() => import('./components/AddClient/AddClient'))
const UserProfile = React.lazy(() =>
  import('./components/UserProfile/UserProfile'),
)
const EditProfile = React.lazy(() =>
  import('./components/EditProfile/EditProfile'),
)
const Dashboard = React.lazy(() => import('./components/Dashboard'))
const Notification = React.lazy(() =>
  import('./components/Notification/Notification'),
)
const Client = React.lazy(() => import('./components/Client/Client'))
const ClientProfile = React.lazy(() =>
  import('./components/ClientProfile/ClientProfile'),
)
const Department = React.lazy(() => import('./components/Settings/Department'))
const Staff = React.lazy(() => import('./components/Staff/Staff'))
const StaffProfile = React.lazy(() => import('./components/Staff/StaffProfile'))
const AddStaffMember = React.lazy(() =>
  import('./components/Staff/AddStaffMember'),
)
const Calendar = React.lazy(() => import('./components/Calendar/Calendar'))
const Settings = React.lazy(() => import('./components/Settings/Settings'))
const DepartmentList = React.lazy(() =>
  import('./components/Settings/DepartmentList'),
)
const ProductList = React.lazy(() =>
  import('./components/Settings/ProductList'),
)
const EditClient = React.lazy(() =>
  import('./components/EditClient/EditClient'),
)
const EditStaff = React.lazy(() => import('./components/Staff/EditStaff'))
const ForgotPasswordEmail = React.lazy(() =>
  import('./components/AddClient/AddClient'),
)
const SignUp = React.lazy(() => import('./components/SignUp/SignUp'))
const Register = React.lazy(() => import('./components/Register/Register'))
const CompanyProfile = React.lazy(() =>
  import('./components/CompanyProfile/CompanyProfile'),
)
const Premium = React.lazy(() => import('./components/Premium/Premium'))
const HolidayAndLeaveManagement = React.lazy(() =>
  import('./components/HolidayAndLeaveManagement/HolidayAndLeaveManagement'),
)
const Statistics = React.lazy(() =>
  import('./components/Statistics/Statistics'),
)
const Support = React.lazy(() => import('./components/Support/Support'))
const Complaint = React.lazy(() => import('./components/Complaint/Complaint'))
const Orders = React.lazy(() => import('./components/Orders/Orders'))
const DashboardEmployee = React.lazy(() =>
  import('./components/DashboardEmployee/DashboardEmployee'),
)
const Task = React.lazy(() => import('./components/Task/Task'))
const TaskDetail = React.lazy(() => import('./components/Task/TaskDetail'))
const OrderDetail = React.lazy(() => import('./components/Orders/OrderDetail'))
const Poll = React.lazy(() => import('./components/Settings/Poll'))
const Dealer = React.lazy(() => import('./components/Dealer/Dealer'))
const EditCompanyProfile = React.lazy(() =>
  import('./components/CompanyProfile/EditCompanyProfile'),
)
const AddProduct = React.lazy(() => import('./components/Settings/AddProduct'))
const JobRolesList = React.lazy(() =>
  import('./components/Settings/JobRolesList'),
)
const ExpenseList = React.lazy(() => import('./components/Expense/ExpenseList'))

const App = () => {
  const { successSnackbar, errorSnackbar, notificationSnackbar } =
    useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar, setNotificationSnackbar } =
    useContext(ContextSnackbar)
  const { setPermissions } = useContext(AuthContext)
  const { authorize, flagLoader, permissions } = useContext(AuthContext).state
  const [pathName, setPathName] = useState('')
  // const socket = io("http://159.89.165.83");
  const ProtectedRoutes = () => {
    return Cookie.get('userToken') ? <Outlet /> : <Navigate to="/login" />
  }
  useEffect(() => {
    let path = window.location.pathname
    setPathName(path)
  })
  useEffect(() => {
    var retrievedObject = JSON.parse(localStorage.getItem('permissions'))
    setPermissions(retrievedObject)
    socket.on('reJoin', () => {
      socket.emit('join', { email: localStorage.getItem('userEmail') })
    })
    socket.on('connect', () => {
      console.log('Successfully connected to server')
      socket.emit('join', { email: localStorage.getItem('userEmail') })
    })
    socket.on('permissionChanged', () => {
      clearLoginToken()
    })
  }, [])

  return (
    <>
      <BrowserRouter>
        <Suspense>
          <Box
            className={Cookie.get('userToken') ? 'login_page_section' : ''}
            sx={{ width: '15%' }}
          ></Box>
          <div className="d-flex">
            {Cookie.get('userToken') && pathName !== '/login' ? (
              <SideBar />
            ) : null}
            <div
              className={
                Cookie.get('userToken') && pathName !== '/login'
                  ? 'width-main'
                  : 'w-100'
              }
            >
              {Cookie.get('userToken') && pathName !== '/login' ? (
                <Header />
              ) : null}
              <Box className="home_page_section">
                <Routes>
                  <Route path="/" element={<ProtectedRoutes />}>
                    {/* <Route path=" /resetpassword" element={<ForgetPassword />}></Route> */}
                    <Route path="/" element={<UserProfile />}></Route>
                    <Route path="/profile" element={<UserProfile />}></Route>
                    <Route
                      path="/editprofile"
                      element={<EditProfile />}
                    ></Route>
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
                    <Route
                      path="/complaint/:id"
                      element={<Complaint />}
                    ></Route>
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
                      <Route path="/expenselist" element={<ExpenseList />} />
                    )}
                    {permissions?.viewDepartment && (
                      <Route
                        path="/jobrolelist"
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
                  <Route
                    path="/editproduct/:id"
                    element={<AddProduct />}
                  ></Route>
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
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
export { socket }
