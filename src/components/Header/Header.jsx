import { React, useContext, useEffect, useState } from 'react'
import { Box, Button, Avatar, Menu, MenuItem } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import CompanyLogo from '../../assets/img/Ohyana_logo.png'
import { Context as ContextActivePage } from '../../context/pageContext'
import backButton from '../../assets/img/back.svg'
import NotificationIcon from '../../assets/img/Notification.svg'
import DownIcon from '../../assets/img/Down.svg'
import ProfileMainIcon from '../../assets/img/ProfileMainIcon.svg'
import SignOutIcon from '../../assets/img/sign_out.svg'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Stack from '@mui/material/Stack'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { clearLoginToken } from '../../services/storage'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import './index.css'

const Header = () => {
  const { ActivePage } = useContext(ContextActivePage)?.state
  const navigate = useNavigate()
  const [pathName, setPathName] = useState('')

  useEffect(() => {
    let path = window.location.pathname
    setPathName(path)
  }, [])

  const prevRoute = useLocation()
  const handleGoback = () => {
    navigate(-1)
  }
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Box
        className={pathName === '/login' ? 'login_page_section' : 'header_root'}
      >
        <Box className="header-info mx-4">
          <Box className="user_profile_photo_root">
            <Box className="d-flex">
              <img
                onClick={() => handleGoback()}
                className="ms-2"
                src={backButton}
                alt="image"
              />
              <h3 className="mb-0">{ActivePage}</h3>
              {/* <img
                style={{ width: '21px' }}
                className="notification_class m-1"
                src={DownIcon}
                alt=""
              /> */}
            </Box>

            {/* <Box>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <Avatar
                    className="me-2"
                    // sx={{ width: 40, height: 40 }}
                    // src="/static/images/avatar/1.jpg"
                  />
                  My Profile
                </MenuItem>
                <MenuItem onClick={clearLoginToken}>
                  <img
                    style={{ width: '21px' }}
                    className="notification_class m-1"
                    src={SignOutIcon}
                    alt=""
                  />
                </Button>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem
                    onClick={() => console.log('profile clickedddd...')}
                  >
                    <img
                      style={{ width: '21px' }}
                      className="notification_class m-1"
                      src={ProfileMainIcon}
                      alt=""
                    />
                    My Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => console.log('sign out clicked.....')}
                  >
                    <img
                      style={{ width: '21px' }}
                      className="notification_class m-1"
                      src={SignOutIcon}
                      alt=""
                    />
                    Sign Out
                  </MenuItem>
                </Menu>
              </Box> */}
          </Box>
          {/* <NotificationsRoundedIcon /> */}

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {/* <MenuItem onClick={handleClose}> */}
            <MenuItem
              onClick={() => {
                navigate('/profile')
              }}
            >
              <PersonOutlineRoundedIcon />
              My Profile
            </MenuItem>
            <MenuItem onClick={clearLoginToken}>
              <LogoutRoundedIcon />
              Logout
            </MenuItem>
          </Menu>
          <NotificationsNoneIcon sx={{ marginRight: '10px' }} />

          {/* <Box className="mx-3"> */}
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
            onClick={handleClick}
            direction="row"
            // spacing={2}
          >
            <Avatar
              sx={{ width: 32, height: 32 }}
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
            {/* <img
                style={{ width: '21px' }}
                className="notification_class m-1"
                src={DownIcon}
                alt=""
              /> */}
            <KeyboardArrowDownIcon />
          </Stack>
        </Box>
        {/* </Box> */}
      </Box>
    </>
  )
}

export default Header
