import React, { useContext, useEffect, useState,lazy } from 'react'
import { Alert, Box, Typography } from '@mui/material'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { socket } from '../../App'
import { Context as AuthContext } from '../../context/authContext/authContext'
import { Context as ContextActivePage } from '../../context/pageContext'
import Dashboard from '../../assets/img/Dashicon.svg'
import DashBoardWhite from '../../assets/img/Dashboard_White.svg'
import Notification from '../../assets/img/notificationIcon.svg'
import CustomerBlue from '../../assets/img/customers_blue.svg'
import CustomerWhite from '../../assets/img/customers_white.svg'
import Team from '../../assets/img/team.svg'
import TeamBlue from '../../assets/img/team_blue.svg'
import Statistics from '../../assets/img/statistics.svg'
import Settings from '../../assets/img/settings.svg'
import Loader from '../Loader/Loader'
import Task from '../../assets/img/task.svg'
import TaskBlue from '../../assets/img/task_blue.svg'
import OrdersBlue from '../../assets/img/Orders_Blue.svg'
import ReportBlue from '../../assets/img/statistics_blue.svg'
import NotificationSnackbar from '../NotificationSnackbar/NotificationSnackbar'
import { Context as ContextSnackbar } from '../../context/pageContext'
import Logo from '../../assets/img/Ohyana Logo Blue.svg'
import Orders from '../../assets/img/Orders.svg'
import SettingsBlue from '../../assets/img/settings_blue.svg'
const ErrorSnackbar = React.lazy(() => import("../ErrorSnackbar/ErrorSnackbar"));
const SuccessSnackbar = React.lazy(() => import("../SuccessSnackbar/SuccessSnackbar"));

const SideBar = () => {
  let navigate = useNavigate()
  const { authorize, flagLoader, permissions } = useContext(AuthContext).state
  const { setPermissions } = useContext(AuthContext)
  const { setActivePage } = useContext(ContextActivePage)
  const [path, setPath] = useState(null)
  const { successSnackbar, errorSnackbar, notificationSnackbar } =
    useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar, setNotificationSnackbar } =
    useContext(ContextSnackbar)
  useEffect(() => {
    // socket.on("client_list", (data) => {
    //   console.log("Printing Connections", data);
    //   ;
    //   GetAdminClientDetail(
    //     data,
    //     (res) => {
    //       if (res?.success) {
    //         setClientDetails(res?.data.client);
    //       }
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // });
    // socket.on('connect', () => {
    //   socket.on('rejoin', () => { socket.emit('join', { email: localStorage.getItem("userEmail") }); })
    //   console.log('Successfully connected to server')
    //   socket.emit('join', { email: localStorage.getItem("userEmail") });
    // })
    // socket.on("notification", function (result) {
    //   console.log(result?.data?.heading)
    //   setNotificationSnackbar({ ...notificationSnackbar, status: true, heading: result?.data?.heading, description: result?.data?.description });
    //   ;
    // })
  }, [])

  useEffect(() => {
    var retrievedObject = JSON.parse(localStorage.getItem('permissions'))
    setPermissions(retrievedObject)
  }, [])
  const handleNavItemClick = (path, name) => {
    console.log('Printing Edit icon')
    navigate(path)
    setActivePage(name)
    setPath(path)
    localStorage.setItem('path', path)
  }

  useEffect(() => {
    let pathName = localStorage.getItem('path')
    setPath(pathName)

    socket.on('notification', function (result) {
      console.log(result?.data?.heading)
      setNotificationSnackbar({
        ...notificationSnackbar,
        status: true,
        heading: result?.data?.heading,
        description: result?.data?.description,
      })
    })
  }, [])

  return (
    <>
      <div style={{ width: '20%', background: 'white' }}>
        {flagLoader ? <Loader></Loader> : null}
        <div className="main-logo">
          <img src={Logo} alt="Company logo" />
        </div>
        <Box className="sidebar_group_icon">
          <Box
            className={`sidebar_icons ${
              path === '/dashboard' && 'selected-link'
            }`}
            onClick={() => {
              handleNavItemClick('/dashboard', 'Dashboard')
            }}
          >
            <Box className="sidebar_icon_root">
              <img
                src={path === '/dashboard' ? DashBoardWhite : Dashboard}
                className="sidebar_img"
              />
            </Box>
            <Typography className="page_name_root" variant="div">
              Dashboard
            </Typography>
          </Box>

          {/* <Box
            to={"/notification"}
            className={`sidebar_icons ${path === "/notification" && "selected-link"
              }`}
            activeClassName="selected-link"
            onClick={() => {
              handleNavItemClick("/notification", "Notification");
              // navigate("");
              // setActivePage("Notification");
            }}
          >
            <Box className="sidebar_icon_root">
              <img src={Notification} className="sidebar_img" />
            </Box>

            <Typography className="page_name_root" variant="div">
              Notifications
            </Typography>
          </Box> */}

          {permissions?.clientMenu && (
            <Box
              className={`sidebar_icons ${
                path === '/client' && 'selected-link'
              }`}
              onClick={() => {
                handleNavItemClick('/client', 'Clients')
              }}
            >
              <Box className="sidebar_icon_root">
                <img
                  src={path === '/client' ? CustomerWhite : CustomerBlue}
                  className="sidebar_img"
                />
              </Box>
              <Typography className="page_name_root" variant="div">
                Customer
              </Typography>
            </Box>
          )}

          {permissions?.staffMenu && (
            <Box
              className={`sidebar_icons ${
                path === '/staff' && 'selected-link'
              }`}
              onClick={() => {
                handleNavItemClick('/staff', 'Staff')
                // navigate("/staff");
                // setActivePage("Staff");
              }}
            >
              <Box className="sidebar_icon_root">
                <img
                  src={path === '/staff' ? Team : TeamBlue}
                  className="sidebar_img"
                />
              </Box>
              <Typography className="page_name_root" variant="div">
                Team
              </Typography>
            </Box>
          )}

          <Box
            className={`sidebar_icons ${path === '/task' && 'selected-link'}`}
            onClick={() => {
              handleNavItemClick('/task', 'Task')
            }}
          >
            <Box className="sidebar_icon_root">
              <img
                src={path === '/task' ? TaskBlue : Task}
                className="sidebar_img"
              />
            </Box>
            <Typography className="page_name_root" variant="div">
              Task
            </Typography>
          </Box>

          {/* {permissions?.staffMenu && <Box
            className={`sidebar_icons ${path === "/dealer" && "selected-link"
              }`}
            onClick={() => {
              handleNavItemClick("/dealer", "Dealer");
              // navigate("/staff");
              // setActivePage("Staff");
            }}
          >
            <Box className="sidebar_icon_root">
              <img src={Dealer} className="sidebar_img" />
            </Box>
            <Typography className="page_name_root" variant="div">
              Dealer
            </Typography>
          </Box>} */}

          <Box
            className={`sidebar_icons ${path === '/orders' && 'selected-link'}`}
            onClick={() => {
              handleNavItemClick('/orders', 'Order')
            }}
          >
            <Box className="sidebar_icon_root">
              <img src={path==="/orders"?OrdersBlue:Orders} className="sidebar_img" />
            </Box>
            <Typography className="page_name_root" variant="div">
              Orders
            </Typography>
          </Box>

          <Box
            className={`sidebar_icons ${path === '/report' && 'selected-link'}`}
            onClick={() => {
              handleNavItemClick('/report', 'Report')
            }}
          >
            <Box className="sidebar_icon_root">
              <img src={path==='/report'?ReportBlue:Statistics} className="sidebar_img" />
            </Box>
            <Typography className="page_name_root" variant="div">
              Report
            </Typography>
          </Box>
          {/* <Box
            className={`sidebar_icons ${path === "/support" && "selected-link"
              }`}
            onClick={() => {
              handleNavItemClick("/support", "Support");
            }}
          >
            <Box className="sidebar_icon_root">
              <img src={Support} className="sidebar_img" />
            </Box>
            <Typography className="page_name_root" variant="div">
              Support
            </Typography>
          </Box> */}
          {permissions?.settingMenu && (
            <Box
              className={`sidebar_icons ${
                path === '/settings' && 'selected-link'
              }`}
              onClick={() => {
                handleNavItemClick('/settings', 'Settings')
              }}
            >
              <Box className="sidebar_icon_root">
                <img src={ path === '/settings' ?SettingsBlue:Settings} className="sidebar_img" />
              </Box>
              <Typography className="page_name_root" variant="div">
                Settings
              </Typography>
            </Box>
          )}
          {/* {permissions?.settingMenu && (
            <Box
              className={`sidebar_icons ${
                path === '/profile' && 'selected-link'
              }`}
              onClick={() => {
                handleNavItemClick('/profile', 'Profile')
              }}
            >
              <Box className="sidebar_icon_root">
                <img src={MyProfile} className="sidebar_img" />
              </Box>
              <Typography className="page_name_root" variant="div">
                My Profile
              </Typography>
            </Box>
          )} */}

          {/* <Box className="sidebar_icons" onClick={clearLoginToken}>
            <Box className="sidebar_icon_root">
              <img src={SignOut} className="sidebar_img" />
            </Box>
            <Typography className="page_name_root" variant="div">
              Sign Out
            </Typography>
          </Box> */}
        </Box>
        <SuccessSnackbar />
        <ErrorSnackbar />
        <NotificationSnackbar />
      </div>
    </>
  )
}

export default SideBar
