import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Avatar, Menu, MenuItem, Typography } from '@mui/material'
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
import ProfileSmallIcon from '../../assets/img/profileSmalIcon.png'
import './index.css'

const Header = () => {
  const { ActivePage } = useContext(ContextActivePage)?.state
  const navigate = useNavigate()
  const [pathName, setPathName] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  useEffect(() => {
    let path = window.location.pathname
    setPathName(path)
  })
  const prevRoute = useLocation()
  const handleGoback = () => {
    navigate(-1)
  }
  // const [anchorEl, setAnchorEl] = useState(null)
  // const open = Boolean(anchorEl)
  // const handleClick = event => {
  //   setAnchorEl(event.currentTarget)
  // }
  // const handleClose = () => {
  //   setAnchorEl(null)
  // }
  return (
    <>
      <Box
        className={pathName === '/login' ? 'login_page_section' : 'header_root'}
      >
        <Box className="header-info">
          {/* <Box className="user_profile_photo_root"> */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box onClick={() => handleGoback()}>
              <img src={backButton} alt="image" />
            </Box>
            <Typography sx={{ fontSize: '26px', marginLeft: '8px' }}>
              {ActivePage}
            </Typography>
          </Box>

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                navigate('/profile')
              }}
            >
              <PersonOutlineRoundedIcon className="header_profile_drop_down" />
              My Profile
            </MenuItem>
            <MenuItem onClick={clearLoginToken}>
              <LogoutRoundedIcon className="header_profile_drop_down" />
              Logout
            </MenuItem>
          </Menu>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <NotificationsNoneIcon
              onClick={() => {
                navigate('/notification')
              }}
              variant="span"
              sx={{ marginRight: '10px', color: '#2E3591' }}
            />

            <Stack
              sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
              }}
              onClick={handleClick}
              direction="row"
            >
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt="Remy Sharp"
                src={ProfileSmallIcon}
              />
              {/* <img src={}/> */}
              <KeyboardArrowDownIcon />
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Header
