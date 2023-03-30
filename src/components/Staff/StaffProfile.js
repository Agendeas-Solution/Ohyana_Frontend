import React, { useState, useEffect, useContext } from 'react'
import { Box, Typography, Button } from '@mui/material'
import './index.css'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import ProfileImg from '../../assets/img/profile_logo.png'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import StaffDetail from './staffDetail'
import { Context as AuthContext } from '../../context/authContext/authContext'
import ChangeRole from '../../assets/img/changerole.svg'
import StaffRatingTable from './StaffRatingTable'
import ChangeRoleDialog from './ChangeRoleDialog'
import PlaceIcon from '@mui/icons-material/Place'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import {
  GetAdminStaffProfileDetail,
  GetAdminStaffRatingDetail,
} from '../../services/apiservices/staffDetail'
import { useNavigate } from 'react-router-dom'
import Attendance from './StaffAttendance'
import StaffAttendance from './StaffAttendance'
import PJPDetail from './PJPDetail'
import StaffTarget from './StaffTarget'
import StaffPoint from './StaffPoint'
import StaffExpenses from './StaffExpenses'

const StaffProfile = () => {
  const [value, setValue] = useState('1')
  const { flagLoader, permissions } = useContext(AuthContext).state
  const [changeRoleDialogControl, setChangeRoleDialogControl] = useState(false)
  const [giveRating, setGiveRating] = useState(false)
  const [adminProfileDetail, setAdminProfileDetail] = useState({})
  const [adminRatingList, setAdminRatingList] = useState([])
  const navigate = useNavigate()
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleCloseRatingDialog = () => {
    setGiveRating(false)
  }
  useEffect(() => {
    let path = window.location.pathname
    console.log('Printing Path of ', path)
    console.log('Printing ', path.split('/').pop())
    path = path.split('/').pop()
    value === '1' &&
      GetAdminStaffProfileDetail(
        parseInt(path),
        res => {
          if (res.success) {
            setAdminProfileDetail(res?.data)
          }
        },
        err => {
          console.log('Printing ', err)
        },
      )
    value === '2' &&
      GetAdminStaffRatingDetail(
        parseInt(path),
        res => {
          if (res.success) {
            setAdminRatingList(res?.data?.teamFeedbacks)
          }
        },
        err => {
          console.log('Printing ', err)
        },
      )
  }, [value, giveRating])
  return (
    <>
      <Box className="main_section">
        <Box className="profile_img">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '50%',
              // padding: '15px 0 0 15px',
            }}
          >
            <Box className="userName_and_position">
              <AccountCircleRoundedIcon className="user_profile_icon" />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  marginLeft: 1,
                }}
              >
                <Typography
                  variant="span"
                  sx={{ fontWeight: 'bold', fontSize: '18px' }}
                >
                  {adminProfileDetail?.name}
                </Typography>
                <Typography sx={{ marginTop: '10px' }} variant="span">
                  {adminProfileDetail?.role?.name}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <Button className="common_button">
              <PlaceIcon />
              View On Map
            </Button>
            {permissions?.editStaff && (
              <Button className="common_button">
                <EditRoundedIcon
                  onClick={() => {
                    navigate(`/editstaff/${adminProfileDetail.id}`)
                  }}
                />
              </Button>
            )}
          </Box>
        </Box>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box className="tab_row">
              <TabList
                className="client_profile_tab mb-2"
                onChange={handleChange}
              >
                <Tab label="PJP" value="3" />
                <Tab label="Target" value="4" />
                <Tab label="Expenses" value="5" />
                <Tab label="Attendance" value="2" />
                <Tab label="Points" value="6" />
                <Tab label="Profile" value="1" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <StaffDetail adminProfileDetail={adminProfileDetail} />
            </TabPanel>
            <TabPanel value="2">
              <StaffAttendance />
            </TabPanel>
            <TabPanel value="3">
              <PJPDetail />
            </TabPanel>
            <TabPanel value="4">
              <StaffTarget />
            </TabPanel>
            <TabPanel value="5">
              <StaffExpenses />
            </TabPanel>
            <TabPanel value="6">
              <StaffPoint />
            </TabPanel>
          </TabContext>
          <ChangeRoleDialog changeRoleDialogControl={changeRoleDialogControl} />
        </Box>
      </Box>
    </>
  )
}

export default StaffProfile
