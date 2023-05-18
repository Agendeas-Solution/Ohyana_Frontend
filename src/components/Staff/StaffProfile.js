import React, { useState, useEffect, useContext } from 'react'
import { Box, Typography, Button, TextField, IconButton } from '@mui/material'
import './index.css'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { Context as AuthContext } from '../../context/authContext/authContext'
import { Context as ContextSnackbar } from '../../context/pageContext'
import PlaceIcon from '@mui/icons-material/Place'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import { GetAdminStaffProfileDetail } from '../../services/apiservices/staffDetail'
import { useNavigate } from 'react-router-dom'
import AddAppreciationDialog from './AddAppreciationDialog'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import moment from 'moment'
import Filter from '../../assets/img/Filter.svg'
import MarkersMap from '../Client/MarkersMap'
import PermissionsGate from '../Settings/PermissionGate'
import { PERMISSION } from '../../constants'

const PJPDetail = React.lazy(() => import('./PJPDetail'))
const StaffTarget = React.lazy(() => import('./StaffTarget'))
const StaffAttendance = React.lazy(() => import('./StaffAttendance'))
const StaffPoint = React.lazy(() => import('./StaffPoint'))
const StaffExpenses = React.lazy(() => import('./StaffExpenses'))
const StaffDetail = React.lazy(() => import('./staffDetail'))
const ChangeRoleDialog = React.lazy(() => import('./ChangeRoleDialog'))

const StaffProfile = () => {
  const [value, setValue] = useState('1')
  const [selectMonth, setSelectMonth] = useState(moment().format('LL'))

  let path = window.location.pathname
  path = path.split('/').pop()
  const [targetDetail, setTargetDetail] = useState({
    status: false,
    id: path,
  })

  const [openMap, setOpenMap] = useState(false)

  // PJP
  const [open, setOpen] = useState(false)
  const [addPJPDetail, setAddPJPDetail] = useState({
    dialogStatus: false,
    date: moment().format('LL'),
    clientId: '',
    description: '',
  })
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  // Attendance
  const [activeTab, setActiveTab] = useState('present')

  //Staff Points
  const [addAppreciationDialogControl, setAddAppreciationDialogControl] =
    useState(false)

  const { flagLoader, permissions } = useContext(AuthContext).state
  const [changeRoleDialogControl, setChangeRoleDialogControl] = useState(false)
  const [adminProfileDetail, setAdminProfileDetail] = useState({})

  const navigate = useNavigate()
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    let path = window.location.pathname
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

  const handleOpenMap = () => {
    setOpenMap(true)
  }

  const handleCloseMap = () => {
    setOpenMap(false)
  }

  return (
    <>
      <Box className="profile_body_section">
        <Box className="user_profile_header_Section">
          <Box className="username_profile_Section">
            {/* <AccountCircleRoundedIcon className="user_profile_icon" /> */}
            {adminProfileDetail?.imgUrl ? (
              <Box className="user_profile_icon">
                <img
                  className="profile_img staff_profile_img"
                  // style={{
                  //   width: '100%',
                  //   height: '100%',
                  //   borderRadius: '50%',
                  //   textAlign: 'center',
                  // }}
                  src={adminProfileDetail.imgUrl}
                />
              </Box>
            ) : (
              <AccountCircleRoundedIcon className="user_profile_icon" />
            )}
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
            <Button onClick={handleOpenMap} className="custom_text_button">
              <PlaceIcon />
              View On Map
            </Button>

            {/* permission_control */}
            <PermissionsGate scopes={[PERMISSION.PERMISSIONS.VIEW_STAFF]}>
              <Button variant="contained" className="profile_header_button">
                <EditRoundedIcon
                  onClick={() => {
                    navigate(`/addeditstaff/${adminProfileDetail.id}`)
                  }}
                />
              </Button>
            </PermissionsGate>
          </Box>
        </Box>

        <Box
          sx={{
            width: '100%',
            typography: 'body1',
          }}
        >
          <TabContext value={value}>
            <Box className="tab_row">
              <TabList
                sx={{ borderBottom: '1px solid #F1F2F6' }}
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

              {value == '1' && (
                <Box className="tab_right_button_section">
                  <Button
                    className="common_button"
                    onClick={() =>
                      setTargetDetail({ ...targetDetail, status: true })
                    }
                  >
                    + Set Target
                  </Button>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      className="staff_date"
                      views={['month', 'year']}
                      value={selectMonth}
                      onChange={selectMonth => {
                        setSelectMonth(selectMonth)
                      }}
                      renderInput={params => (
                        <TextField
                          sx={{
                            width: '150px',
                            marginLeft: '6px',
                          }}
                          {...params}
                          helperText={null}
                        />
                      )}
                      PopperProps={{
                        placement: 'bottom-start', // Set placement to 'bottom-start'
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              )}

              {value == '3' && (
                <Box className="tab_right_button_section">
                  <Button
                    onClick={() =>
                      setAddPJPDetail({ ...addPJPDetail, dialogStatus: true })
                    }
                    className="common_button"
                  >
                    + Create
                  </Button>
                  <Box sx={{ marginLeft: '6px' }}>
                    <IconButton
                      sx={{ margin: '0px', padding: '0px' }}
                      edge="end"
                      onClick={handleDrawerOpen}
                    >
                      <img src={Filter} alt="" />
                    </IconButton>
                  </Box>
                </Box>
              )}

              {value == '5' && (
                <Box>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      className="staff_date"
                      views={['month', 'year']}
                      value={selectMonth}
                      onChange={selectMonth => {
                        setSelectMonth(selectMonth)
                      }}
                      renderInput={params => (
                        <TextField
                          sx={{ width: '150px' }}
                          placeholder="Year and Month"
                          {...params}
                          helperText={null}
                        />
                      )}
                      PopperProps={{
                        placement: 'bottom-start', // Set placement to 'bottom-start'
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              )}

              {value == '2' && (
                <Box className="tab_right_button_section">
                  <Box
                    className="custom_tab_background"
                    sx={{
                      marginRight: '10px',
                    }}
                  >
                    <Button
                      className={
                        activeTab === 'present'
                          ? 'active_button'
                          : 'custom_tab_background'
                      }
                      onClick={() => {
                        setActiveTab('present')
                      }}
                      variant="contained"
                    >
                      Present
                    </Button>
                    <Button
                      className={
                        activeTab === 'leave'
                          ? 'active_button'
                          : 'custom_tab_background'
                      }
                      onClick={() => {
                        setActiveTab('leave')
                      }}
                      variant="contained"
                    >
                      Leave
                    </Button>
                  </Box>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      className="staff_date"
                      views={['month', 'year']}
                      value={selectMonth}
                      onChange={selectMonth => {
                        setSelectMonth(selectMonth)
                      }}
                      renderInput={params => (
                        <TextField
                          sx={{ width: '150px' }}
                          placeholder="Year and Month"
                          {...params}
                          helperText={null}
                        />
                      )}
                      PopperProps={{
                        placement: 'bottom-start',
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              )}

              {value == '6' && (
                <Box className="tab_right_button_section">
                  <Button
                    onClick={() => setAddAppreciationDialogControl(true)}
                    className="common_button"
                  >
                    + Appreciation
                  </Button>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      className="staff_date"
                      views={['month', 'year']}
                      value={selectMonth}
                      onChange={newValue => {
                        setSelectMonth(newValue)
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          sx={{
                            width: '150px',
                            marginLeft: '6px',
                            border: 'none',
                          }}
                          placeholder="Year and Month"
                          helperText={null}
                        />
                      )}
                      PopperProps={{
                        placement: 'bottom-start', // Set placement to 'bottom-start'
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              )}
            </Box>

            <TabPanel sx={{ padding: '0' }} value="4">
              <StaffDetail adminProfileDetail={adminProfileDetail} />
            </TabPanel>
            <TabPanel sx={{ padding: '0' }} value="2">
              <StaffAttendance
                selectMonth={selectMonth}
                setSelectMonth={setSelectMonth}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </TabPanel>
            <TabPanel sx={{ padding: '0' }} value="3">
              <PJPDetail
                addPJPDetail={addPJPDetail}
                setAddPJPDetail={setAddPJPDetail}
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}
                open={open}
                setOpen={setOpen}
              />
            </TabPanel>
            <TabPanel sx={{ padding: '0' }} value="1">
              <StaffTarget
                selectMonth={selectMonth}
                setSelectMonth={setSelectMonth}
                targetDetail={targetDetail}
                setTargetDetail={setTargetDetail}
              />
            </TabPanel>
            <TabPanel sx={{ padding: '0' }} value="5">
              <StaffExpenses
                adminProfileDetail={adminProfileDetail}
                selectMonth={selectMonth}
                setSelectMonth={setSelectMonth}
              />
            </TabPanel>
            <TabPanel sx={{ padding: '0' }} value="6">
              <StaffPoint
                selectMonth={selectMonth}
                setSelectMonth={setSelectMonth}
                addAppreciationDialogControl={addAppreciationDialogControl}
                setAddAppreciationDialogControl={
                  setAddAppreciationDialogControl
                }
              />
            </TabPanel>
          </TabContext>
          <ChangeRoleDialog changeRoleDialogControl={changeRoleDialogControl} />
          {openMap && (
            <MarkersMap handleCloseMap={handleCloseMap} openMap={openMap} />
          )}
        </Box>
      </Box>
    </>
  )
}

export default StaffProfile
