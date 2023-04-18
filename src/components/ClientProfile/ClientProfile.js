import React, { useEffect, useState, useContext } from 'react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Divider,
} from '@mui/material'
import './index.css'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { Navigate, useNavigate } from 'react-router-dom'
import { Context as AuthContext } from '../../context/authContext/authContext'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { Context as ContextActivePage } from '../../context/pageContext'

import {
  GetAdminClientProfileDetail,
  GetAdminClientStatusDetail,
  GetAdminClientReminderDetail,
  GetAdminClientAppointmentDetail,
  AddPoorContact,
} from '../../services/apiservices/clientDetail'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import moment from 'moment'
import Stage0 from '../../assets/img/stage_0.svg'
import Stage1 from '../../assets/img/stage_1.svg'
import Stage2 from '../../assets/img/stage_2.svg'
import CallNotReceived from '../../assets/img/callnotreceived.svg'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import NoResultFound from '../ErrorComponent/NoResultFound'
import CloseStatusDialog from './CloseStatusDialog'
import { Dashboard } from '@mui/icons-material'
const EditStatusDialog = React.lazy(() => import('./EditStatusDialog'))
const StageDialog = React.lazy(() => import('./StageDialog'))
const OrderList = React.lazy(() => import('./OrderList'))
const PoorContact = React.lazy(() => import('./PoorContact'))
const ViewClientStatusDialog = React.lazy(() =>
  import('./ViewClientStatusDialog'),
)
const AppointmentDialog = React.lazy(() => import('./AppointmentDialog'))
const RemainderTable = React.lazy(() => import('./RemainderTable'))
const AppointmentTable = React.lazy(() => import('./AppointmentTable'))
const ProfileTable = React.lazy(() => import('./ProfileTable'))
const RemainderDialog = React.lazy(() => import('./RemainderDialog'))
const StatusDialog = React.lazy(() => import('./StatusDialog'))

const ClientProfile = () => {
  const navigate = useNavigate()
  const [paths, setPaths] = useState(null)
  const { setActivePage } = useContext(ContextActivePage)

  const [value, setValue] = useState('1')
  const { flagLoader, permissions } = useContext(AuthContext).state
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const [remainderDialog, setRemainderDialog] = useState(false)
  const [callDialog, setCallDialog] = useState(false)
  const [statusDialog, setStatusDialog] = useState(false)
  const [appointmentDialog, setAppointmentDialog] = useState(false)
  const [clientProfileDetail, setClientProfileDetail] = useState({})
  const [clientStatusList, setClientStatusList] = useState([])
  const [clientReminderList, setClientReminderList] = useState([])
  const [clientAppointmentList, setClientAppointmentList] = useState([])
  const [stageDialog, setStageDialog] = useState(false)

  const [editStatusDialog, setEditStatusDialog] = useState({
    clientId: null,
    description: '',
    statusId: null,
    status: false,
  })
  const [addPoorContact, setAddPoorContact] = useState({
    clientId: null,
    description: '',
    status: false,
    callNotReceived: true,
    flag: 'true',
    followUpType: 'OTHER',
  })
  const [viewClientStatus, setViewClientStatus] = useState({
    clientId: null,
    statusDetail: {},
    status: false,
  })
  const [closeStatusDialogControl, setCloseStatusDialogControl] = useState({
    status: false,
    clientId: null,
    description: '',
  })
  // let navigate = useNavigate()
  useEffect(() => {
    let path = window.location.pathname
    console.log('Printing Path of ', path)
    console.log('Printing ', path.split('/').pop())
    path = path.split('/').pop()
    GetAdminClientProfileDetail(
      parseInt(path),
      res => {
        if (res.success) {
          setClientProfileDetail(res?.data)
        }
      },
      err => {
        console.log('Printing ', err)
      },
    )
  }, [stageDialog])
  let path = window.location.pathname
  path = path.split('/').pop()
  const handleAdminClienStatusDetail = () => {
    GetAdminClientStatusDetail(
      parseInt(path),
      res => {
        if (res.success) {
          setClientStatusList(res?.data)
        }
      },
      err => {
        console.log('Printing Error', err)
      },
    )
  }
  useEffect(() => {
    value === '1' && handleAdminClienStatusDetail()

    value === '2' &&
      GetAdminClientReminderDetail(
        parseInt(path),
        res => {
          if (res.success) {
            setClientReminderList(res.data)
          }
        },
        err => {
          console.log('Printing', err)
        },
      )
    value === '3' &&
      GetAdminClientAppointmentDetail(
        parseInt(path),
        res => {
          if (res.success) {
            setClientAppointmentList(res.data)
          }
        },
        err => {
          console.log('Printing', err)
        },
      )
  }, [value, statusDialog, appointmentDialog, remainderDialog, callDialog])
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleAddPoorContact = () => {
    let data = {}
    if (addPoorContact.flag === 'true') {
      data = {
        clientId: addPoorContact.clientId,
        callNotReceived: addPoorContact.callNotReceived,
        followUpType: addPoorContact.followUpType,
        description: 'Call Not Received',
      }
    } else {
      data = {
        clientId: addPoorContact.clientId,
        callNotReceived: addPoorContact.callNotReceived,
        followUpType: addPoorContact.followUpType,
        description: addPoorContact.description,
      }
    }

    AddPoorContact(
      data,
      res => {
        setSuccessSnackbar({
          ...successSnackbar,
          message: res?.message,
          status: true,
        })
        handleCallClose()
        handleAdminClienStatusDetail()
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }
  const handleClickOpen = () => {
    setRemainderDialog(true)
  }

  const handleClose = () => {
    setRemainderDialog(false)
    setStageDialog(false)
  }

  const handleCallOpen = () => {
    setAddPoorContact({
      ...addPoorContact,
      status: true,
      clientId: clientProfileDetail.id,
    })
  }
  const handleCallClose = () => {
    setAddPoorContact({
      ...addPoorContact,
      status: false,
    })
  }

  const handleStatusOpen = () => {
    setStatusDialog(true)
  }
  const handleCloseStatusDialogOpen = id => {
    setCloseStatusDialogControl({
      ...closeStatusDialogControl,
      status: true,
      clientId: id,
    })
  }
  const handleCloseStatusDialogClose = () => {
    setCloseStatusDialogControl({ ...closeStatusDialogControl, status: false })
  }
  const handleStatusClose = () => {
    setStatusDialog(false)
    setEditStatusDialog({
      ...editStatusDialog,
      status: false,
    })
  }
  const handleAppointmentOpen = () => {
    setAppointmentDialog(true)
    // navigate('/clientorders')
  }
  const handleAppointmentClose = () => {
    setAppointmentDialog(false)
  }

  const handleEditClientStatus = (row, clientid) => {
    setEditStatusDialog({
      ...editStatusDialog,
      status: true,
      clientId: clientid,
      description: row.description,
      statusId: row.id,
      statusDetail: row,
    })
  }
  const handleViewClientStatus = (row, clientid) => {
    setViewClientStatus({
      ...viewClientStatus,
      status: true,
      clientId: clientid,
      statusDetail: row,
    })
  }
  const handleViewStatusDialogClose = () => {
    setViewClientStatus({ ...viewClientStatus, status: false })
  }

  const handleOrderOpen = () => {
    navigate('/clientorders')
  }

  const handleClientOrdersClick = (path, name) => {
    navigate(path)
    setActivePage(name)
    setPaths(path)
    localStorage.setItem('path', path)
  }

  return (
    <>
      <Box className="profile_body_section">
        <Box className="user_profile_header_Section">
          <Box className="username_profile_Section">
            <AccountCircleRoundedIcon className="user_profile_icon" />
            <Box className="username_and_position">
              <Typography className="username_text" variant="span">
                {clientProfileDetail?.name || '-'}
                <img
                  className="ml-1 p-1"
                  onClick={() => {
                    setStageDialog(true)
                  }}
                  src={
                    (clientProfileDetail?.stage === 0 && Stage0) ||
                    (clientProfileDetail?.stage === 1 && Stage1) ||
                    (clientProfileDetail?.stage === 2 && Stage2)
                  }
                />
                {clientProfileDetail?.stage === 3 && (
                  <WarningRoundedIcon
                    onClick={() => {
                      setStageDialog(true)
                    }}
                  />
                )}
              </Typography>
              <Typography variant="span" sx={{ marginTop: '5px' }}>
                {clientProfileDetail?.business || '-'}
              </Typography>
            </Box>
          </Box>

          <Button className="profile_header_button">
            {permissions?.editClient && (
              <EditRoundedIcon
                onClick={() => {
                  navigate(`/editclient/${clientProfileDetail.id}`)
                }}
              />
            )}
          </Button>
        </Box>

        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box className="tab_row">
              <TabList
                sx={{ borderBottom: '1px solid #F1F2F6' }}
                className="client_profile_tab mb-2"
                onChange={handleChange}
              >
                <Tab label="Status" value="1" />
                <Tab label="Reminder" value="2" />
                <Tab label="Appointment" value="3" />
                <Tab label="Orders" value="5" />
                <Tab label="Profile" value="4" />
              </TabList>

              <Box>
                {value === '1' ? (
                  <>
                    <Button onClick={handleCallOpen} className="common_button">
                      <img src={CallNotReceived} />
                    </Button>
                    <Button
                      onClick={handleStatusOpen}
                      className="common_button"
                    >
                      + Status
                    </Button>
                    <Button
                      onClick={() =>
                        handleCloseStatusDialogOpen(clientProfileDetail.id)
                      }
                      className="common_button"
                    >
                      Close
                    </Button>
                  </>
                ) : null}
                {value === '2' ? (
                  <>
                    <Button
                      onClick={handleClickOpen}
                      className="common_button"
                      variant="contained"
                    >
                      + Reminder
                    </Button>
                  </>
                ) : null}
                {value === '3' ? (
                  <>
                    <Button
                      className="common_button"
                      onClick={handleAppointmentOpen}
                      variant="contained"
                    >
                      + Appointment
                    </Button>
                  </>
                ) : null}
                {value === '5' ? (
                  <>
                    <Button
                      className="common_button"
                      // onClick={handleOrderOpen}
                      onClick={() =>
                        handleClientOrdersClick('/clientorders', 'Add to Cart')
                      }
                      variant="contained"
                    >
                      + Order
                    </Button>
                  </>
                ) : null}
              </Box>
            </Box>
            <TabPanel sx={{ padding: '0px' }} value="1">
              <TableContainer
                className="client_table_height mt-1"
                component={Paper}
                sx={{
                  boxShadow: 'none',
                  border: '1px solid #e5e5e5',
                  overflowY: 'auto',
                }}
              >
                {clientStatusList.length > 0 ? (
                  <Table
                    stickyHeader
                    aria-label="sticky table"
                    sx={{ minWidth: 690, marginLeft: '-10px' }}
                    className="table_heading "
                  >
                    {/* <TableHead className="client_profile_table_header"> */}
                    <TableHead>
                      <TableRow>
                        <TableCell>Sr No.</TableCell>
                        <TableCell>Status Added By</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {clientStatusList.map((row, index) => (
                        <TableRow
                          key={index}
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          sx={{
                            '&:last-child td,th': { border: 0 },
                          }}
                        >
                          <TableCell scope="row">{index + 1}</TableCell>
                          <TableCell>{row?.team?.name}</TableCell>
                          <TableCell>
                            {moment(row?.date).format('LL')}
                          </TableCell>
                          <TableCell>
                            {moment(row.time, 'hh:mm:ss').format('LT')}
                          </TableCell>
                          <TableCell className="status_description">
                            {row?.description}
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => {
                                handleViewClientStatus(
                                  row,
                                  clientProfileDetail.id,
                                )
                              }}
                              className="client_profile_edit_button m-1"
                            >
                              View
                            </Button>
                            <Button
                              className="client_profile_edit_button"
                              onClick={() => {
                                handleEditClientStatus(
                                  row,
                                  clientProfileDetail.id,
                                )
                              }}
                            >
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <NoResultFound />
                )}
              </TableContainer>
            </TabPanel>
            <TabPanel sx={{ padding: '0px' }} value="2">
              <RemainderTable clientReminderList={clientReminderList} />
            </TabPanel>
            <TabPanel sx={{ padding: '0px' }} value="3">
              <AppointmentTable clientAppointmentList={clientAppointmentList} />
            </TabPanel>
            <TabPanel sx={{ paddingTop: '15px' }} value="4">
              <ProfileTable clientProfileDetail={clientProfileDetail} />
            </TabPanel>
            <TabPanel sx={{ padding: '0px' }} value="5">
              <OrderList />
            </TabPanel>
          </TabContext>
          <RemainderDialog
            remainderDialog={remainderDialog}
            handleClose={handleClose}
            clientProfileDetail={clientProfileDetail}
          />
          <StatusDialog
            clientProfileDetail={clientProfileDetail}
            statusDialog={statusDialog}
            handleStatusClose={handleStatusClose}
          />
          <PoorContact
            addPoorContact={addPoorContact}
            setAddPoorContact={setAddPoorContact}
            handleCallClose={handleCallClose}
            handleAddPoorContact={handleAddPoorContact}
          />
          <CloseStatusDialog
            handleCloseStatusDialogClose={handleCloseStatusDialogClose}
            closeStatusDialogControl={closeStatusDialogControl}
            setCloseStatusDialogControl={setCloseStatusDialogControl}
          />
          <StageDialog
            clientProfileDetail={clientProfileDetail}
            stageDialog={stageDialog}
            handleClose={handleClose}
          />
          {editStatusDialog.status === true ? (
            <EditStatusDialog
              handleStatusClose={handleStatusClose}
              editStatusDialog={editStatusDialog}
            />
          ) : null}
          {/* {addPoorContact.status === true ? (
            <PoorContact
              handleCallClose={handleCallClose}
              addPoorContact={addPoorContact}
            />
          ) : null} */}
          {viewClientStatus.status === true ? (
            <ViewClientStatusDialog
              handleViewStatusDialogClose={handleViewStatusDialogClose}
              viewClientStatus={viewClientStatus}
            />
          ) : null}
          <AppointmentDialog
            appointmentDialog={appointmentDialog}
            handleAppointmentClose={handleAppointmentClose}
            clientProfileDetail={clientProfileDetail}
          />
        </Box>
      </Box>
    </>
  )
}

export default ClientProfile
