import React, { useContext, useEffect, useState } from 'react'
import { Box, Menu, MenuItem, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { Context as ContextActivePage } from '../../context/pageContext'
import backButton from '../../assets/img/back.svg'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Stack from '@mui/material/Stack'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { clearLoginToken } from '../../services/storage'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import './index.css'

const Header = () => {
  const { ActivePage } = useContext(ContextActivePage)?.state
  const navigate = useNavigate()
  const [pathName, setPathName] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const userImg = localStorage.getItem('userImageUrl')

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
                handleClose()
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
              <img
                style={{ width: 32, height: 32, borderRadius: '50%' }}
                src={userImg}
              />
              <KeyboardArrowDownIcon />
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Header
