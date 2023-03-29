import { React, useContext, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import CompanyLogo from '../../assets/img/Ohyana_logo.png'
import { Context as ContextActivePage } from '../../context/pageContext'
import backButton from '../../assets/img/back.svg'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { clearLoginToken } from "../../services/storage";

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
  return (
    <>
      <Box
        className={pathName === '/login' ? 'login_page_section' : 'header_root'}
      >
        <Box className="header-info mx-4">
          <Box className="user_profile_photo_root">
            <Box className="align-items-center d-flex">
              <Box onClick={() => handleGoback()}>
                <img className="ms-2" src={backButton} />
              </Box>
              <h3 className="mb-0">{ActivePage}</h3>
            </Box>
            <NotificationsRoundedIcon />
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>
                <PersonOutlineRoundedIcon />
                My Profile
              </MenuItem>
              <MenuItem onClick={clearLoginToken}>
                <LogoutRoundedIcon />
                Logout
              </MenuItem>
            </Menu>
          </Box>
          <Box>
            <Stack direction="row" spacing={2}>
              <Avatar
                onClick={handleClick}
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
              />
            </Stack>
          </Box>
        </Box>
      </Box>
      <Box></Box>
    </>
  )
}

export default Header
