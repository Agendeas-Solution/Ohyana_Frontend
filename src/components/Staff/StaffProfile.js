import React, { useState, useEffect, useContext } from 'react'
import { Box, Typography, Button } from '@mui/material'
import './index.css'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { Context as AuthContext } from '../../context/authContext/authContext'
import PlaceIcon from '@mui/icons-material/Place'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import { GetAdminStaffProfileDetail } from '../../services/apiservices/staffDetail'
import { useNavigate } from 'react-router-dom'
const PJPDetail = React.lazy(() => import('./PJPDetail'))
const StaffTarget = React.lazy(() => import('./StaffTarget'))
const StaffAttendance = React.lazy(() => import('./StaffAttendance'))
const StaffPoint = React.lazy(() => import('./StaffPoint'))
const StaffExpenses = React.lazy(() => import('./StaffExpenses'))
const StaffDetail = React.lazy(() => import('./staffDetail'))
const ChangeRoleDialog = React.lazy(() => import('./ChangeRoleDialog'))

const StaffProfile = () => {
  const [value, setValue] = useState('1')
  const { flagLoader, permissions } = useContext(AuthContext).state
  const [changeRoleDialogControl, setChangeRoleDialogControl] = useState(false)
  const [adminProfileDetail, setAdminProfileDetail] = useState({})
  const navigate = useNavigate()
  const handleChange = (event, newValue) => {
    setValue(newValue)
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
  }, [value])

  return (
    <>
      <Box className="main_section_of_team_profile">
        <Box className="user_profile_header_Section">
          <Box className="username_profile_Section">
            <AccountCircleRoundedIcon className="user_profile_icon" />
            <Box className="username_and_position">
              <Typography className="username_text" variant="span">
                {adminProfileDetail?.name}
              </Typography>
              <Typography variant="span" sx={{ marginTop: '5px' }}>
                {adminProfileDetail?.role?.name}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Button className="custom_text_button">
              <PlaceIcon />
              View On Map
            </Button>
            {permissions?.editStaff && (
              <Button variant="contained" className="profile_header_button">
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
                sx={{
                  borderBottom: '1px solid #F1F2F6',
                  width: '100%',
                }}
                className="client_profile_tab mb-2"
                onChange={handleChange}
              >
                <Tab label="Target" value="1" />
                <Tab label="PJP" value="3" />
                <Tab label="Expenses" value="5" />
                <Tab label="Attendance" value="2" />
                <Tab label="Points" value="6" />
                <Tab label="Profile" value="4" />
              </TabList>
            </Box>
            <TabPanel sx={{ padding: '0' }} value="4">
              <StaffDetail adminProfileDetail={adminProfileDetail} />
            </TabPanel>
            <TabPanel sx={{ padding: '0' }} value="2">
              <StaffAttendance />
            </TabPanel>
            <TabPanel sx={{ padding: '0' }} value="3">
              <PJPDetail />
            </TabPanel>
            <TabPanel sx={{ padding: '0' }} value="1">
              <StaffTarget />
            </TabPanel>
            <TabPanel sx={{ padding: '0' }} value="5">
              <StaffExpenses />
            </TabPanel>
            <TabPanel sx={{ padding: '0' }} value="6">
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
