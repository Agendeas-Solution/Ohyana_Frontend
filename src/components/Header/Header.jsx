import { React, useContext, useEffect, useState } from 'react'
import { Avatar, Box } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, MenuItem, Button } from '@mui/material'
import CompanyLogo from '../../assets/img/Ohyana_logo.png'
import { Context as ContextActivePage } from '../../context/pageContext'
import backButton from '../../assets/img/back.svg'
import NotificationIcon from '../../assets/img/Notification.svg'
import SignOutIcon from '../../assets/img/sign_out.svg'
import DownIcon from '../../assets/img/Down.svg'
import ProfileMainIcon from '../../assets/img/ProfileMainIcon.svg'
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
            <Box className="align-items-center d-flex">
              <Box onClick={() => handleGoback()}>
                <img className="ms-2" src={backButton} alt="image" />
              </Box>
              <h3 className="mb-0">{ActivePage}</h3>
              <Box>
                <img
                  className="notification_class"
                  src={NotificationIcon}
                  alt=""
                />
              </Box>
              <Box>
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
                  <img
                    style={{ width: '21px' }}
                    className="notification_class m-1"
                    src={DownIcon}
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
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box></Box>
    </>
  )
}

export default Header
