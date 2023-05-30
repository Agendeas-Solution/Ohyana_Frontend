import React, { useEffect, useState, useContext } from 'react'
import { Box, Typography, Button } from '@mui/material'
import './index.css'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { useNavigate } from 'react-router-dom'
import { Context as AuthContext } from '../../context/authContext/authContext'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { Context as ContextActivePage } from '../../context/pageContext'
import {
  GetAdminClientProfileDetail,
  GetAdminClientStatusDetail,
  GetAdminClientReminderDetail,
  GetAdminClientAppointmentDetail,
  AddPoorContact,
  EditAdminClientReminderDetail,
  AddAdminClientReminderDetail,
  AddAdminClientAppointmentDetail,
  EditAdminClientAppointmentDetail,
} from '../../services/apiservices/clientDetail'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import moment from 'moment'
import Stage0 from '../../assets/img/stage_0.svg'
import Stage1 from '../../assets/img/stage_1.svg'
import Stage2 from '../../assets/img/stage_2.svg'
import CallNotReceived from '../../assets/img/callnotreceived.svg'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import CloseStatusDialog from './CloseStatusDialog'
import EditReminderDialog from './EditReminderDialog'
import StatusTable from './StatusTable'
import ViewAppointmentDialog from './ViewAppointmentDialog'
import PermissionsGate from '../Settings/PermissionGate'
import { PERMISSION } from '../../constants'
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
const StatusDialog = React.lazy(() => import('./StatusDialog'))
const ClientProfile = () => {
  const navigate = useNavigate()
  const [paths, setPaths] = useState(null)
  const { setActivePage, setActivePageClient } = useContext(ContextActivePage)
  const { activePageClient } = useContext(ContextActivePage).state
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const [remainderDialog, setRemainderDialog] = useState({
    description: '',
    date: moment(),
    time: moment().format(),
    status: false,
    id: null,
  })
  const [callDialog, setCallDialog] = useState(false)
  const [statusDialog, setStatusDialog] = useState(false)
  const [appointmentDialogControl, setAppointmentDialogControl] = useState({
    status: false,
    date: moment(),
    time: '',
    description: '',
    appointed_member: [],
    appointment_unit: '',
    appointmentId: null,
  })
  const [clientProfileDetail, setClientProfileDetail] = useState({})
  const [clientStatusList, setClientStatusList] = useState([])
  const [clientReminderList, setClientReminderList] = useState([])
  const [clientAppointmentList, setClientAppointmentList] = useState([])
  const [stageDialog, setStageDialog] = useState(false)
  const [editStatusDialog, setEditStatusDialog] = useState({
    clientId: null,
    description: {},
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
    status: false,
    clientId: null,
    statusDetail: {},
  })
  const [viewAppointment, setViewAppointment] = useState({
    status: false,
    appointmentId: null,
    appointmentDetail: {},
  })
  const [closeStatusDialogControl, setCloseStatusDialogControl] = useState({
    clientId: null,
    description: '',
    status: false,
  })
  let path = window.location.pathname
  path = path.split('/').pop()
  useEffect(() => {
    GetAdminClientProfileDetail(
      parseInt(path),
      {},
      res => {
        if (res.success) {
          setClientProfileDetail(res?.data)
        }
      },
      err => {},
    )
  }, [stageDialog])
  const handleAdminClienStatusDetail = () => {
    GetAdminClientStatusDetail(
      parseInt(path),
      {},
      res => {
        if (res.success) {
          setClientStatusList(res?.data)
        }
      },
      err => {},
    )
  }
  const handleReminderDetail = () => {
    GetAdminClientReminderDetail(
      parseInt(path),
      {},
      res => {
        if (res.success) {
          setClientReminderList(res.data)
        }
      },
      err => {},
    )
  }
  const handleAppointmentDetail = () => {
    GetAdminClientAppointmentDetail(
      parseInt(path),
      {},
      res => {
        if (res.success) {
          setClientAppointmentList(res.data)
        }
      },
      err => {},
    )
  }
  const handleAddEditAppointment = () => {
    if (
      appointmentDialogControl.description !== '' &&
      appointmentDialogControl.date !== '' &&
      appointmentDialogControl.time !== ''
    ) {
      appointmentDialogControl['appointed_member'] = [
        ...new Set(
          appointmentDialogControl?.appointed_member.map(item => item?.id),
        ),
      ]
      let data = {
        date: appointmentDialogControl.date,
        time: appointmentDialogControl.time,
        description: appointmentDialogControl.description,
        appointed_member: appointmentDialogControl.appointed_member,
        appointment_unit: appointmentDialogControl.appointment_unit,
      }
      if (parseInt(appointmentDialogControl.appointmentId)) {
        data['appointmentId'] = appointmentDialogControl?.appointmentId
      } else {
        data['clientId'] = clientProfileDetail.id
      }
      parseInt(appointmentDialogControl.appointmentId)
        ? EditAdminClientAppointmentDetail(
            data,
            res => {
              handleAppointmentClose()
              handleAppointmentDetail()
              setSuccessSnackbar({
                ...successSnackbar,
                status: true,
                message: res.message,
              })
            },
            err => {
              setErrorSnackbar({
                ...errorSnackbar,
                status: true,
                message: err.response.data.message,
              })
            },
          )
        : AddAdminClientAppointmentDetail(
            data,
            res => {
              handleAppointmentClose()
              handleAppointmentDetail()
              setSuccessSnackbar({
                ...successSnackbar,
                status: true,
                message: res.message,
              })
            },
            err => {
              setErrorSnackbar({
                ...errorSnackbar,
                status: true,
                message: err.response.data.message,
              })
            },
          )
    }
  }
  useEffect(() => {
    activePageClient === 'Status' && handleAdminClienStatusDetail()
    activePageClient === 'Reminder' && handleReminderDetail()
    activePageClient === 'Appointment' && handleAppointmentDetail()
  }, [activePageClient, statusDialog, callDialog])
  const handleChange = (event, newValue) => {
    setActivePageClient(newValue)
  }
  const handleEditReminder = () => {
    if (
      remainderDialog.description !== '' &&
      remainderDialog.date !== '' &&
      remainderDialog.time !== ''
    ) {
      let data = {
        description: remainderDialog.description,
        date: remainderDialog.date,
        time: remainderDialog.time,
      }
      if (remainderDialog.id) {
        data['reminderId'] = remainderDialog.id
      } else if (clientProfileDetail.id) {
        data['clientId'] = clientProfileDetail.id
      }
      parseInt(remainderDialog?.id) &&
        EditAdminClientReminderDetail(
          data,
          res => {
            handleClose()
            handleReminderDetail()
            setSuccessSnackbar({
              ...successSnackbar,
              status: true,
              message: res.message,
            })
          },
          err => {
            setErrorSnackbar({
              ...errorSnackbar,
              status: true,
              message: err.response.data.message,
            })
          },
        )
      AddAdminClientReminderDetail(
        data,
        res => {
          handleClose()
          handleReminderDetail()
          setSuccessSnackbar({
            ...successSnackbar,
            status: true,
            message: res.message,
          })
        },
        err => {
          setErrorSnackbar({
            ...errorSnackbar,
            status: true,
            message: err.response.data.message,
          })
        },
      )
    }
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
  const handleClose = () => {
    setRemainderDialog({
      ...remainderDialog,
      status: false,
      description: '',
      date: '',
      time: '',
      id: null,
    })
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
    setAppointmentDialogControl({ ...appointmentDialogControl, status: true })
  }
  const handleAppointmentClose = () => {
    setAppointmentDialogControl({
      ...appointmentDialogControl,
      status: false,
      date: '',
      time: '',
      description: '',
      appointed_member: [],
      appointment_unit: '',
      appointmentId: null,
    })
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
  const handleViewAppointment = (row, appointmentid) => {
    setViewAppointment({
      ...viewAppointment,
      status: true,
      appointmentId: appointmentid,
      description: row,
    })
  }
  const handleViewStatusDialogClose = () => {
    setViewClientStatus({ ...viewClientStatus, status: false })
  }
  const handleViewAppointmentDialogClose = () => {
    setViewAppointment({ ...viewAppointment, status: false })
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
            <Box>
              {clientProfileDetail?.imageUrl ? (
                <img
                  src={clientProfileDetail?.imageUrl}
                  className="user_profile_icon"
                  alt={clientProfileDetail.name}
                />
              ) : (
                <AccountCircleRoundedIcon className="user_profile_icon" />
              )}
            </Box>
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
            <PermissionsGate scopes={[PERMISSION.PERMISSIONS.EDIT_CLIENT]}>
              <EditRoundedIcon
                onClick={() => {
                  navigate(`/addeditclient/${clientProfileDetail.id}`)
                }}
              />
            </PermissionsGate>
          </Button>
        </Box>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={activePageClient}>
            <Box className="tab_row">
              <TabList
                sx={{ borderBottom: '1px solid #F1F2F6' }}
                className="client_profile_tab mb-2"
                onChange={handleChange}
              >
                <Tab label="Status" value="Status" />
                <Tab label="Reminder" value="Reminder" />
                <Tab label="Appointment" value="Appointment" />
                <Tab label="Orders" value="Orders" />
                <Tab label="Profile" value="Profile" />
              </TabList>
              {activePageClient === 'Status' ? (
                <>
                  <Box className="tab_right_button_section">
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
                  </Box>
                </>
              ) : null}
              {activePageClient === 'Reminder' ? (
                <>
                  <Button
                    onClick={() =>
                      setRemainderDialog({ ...remainderDialog, status: true })
                    }
                    className="common_button"
                    variant="contained"
                  >
                    + Reminder
                  </Button>
                </>
              ) : null}
              {activePageClient === 'Appointment' ? (
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
              {activePageClient === 'Orders' ? (
                <>
                  <PermissionsGate
                    scopes={[PERMISSION.PERMISSIONS.VIEW_ORDERS]}
                  >
                    <Button
                      className="common_button"
                      onClick={() =>
                        handleClientOrdersClick(
                          `/clientorders/${path}`,
                          'Add to Cart',
                        )
                      }
                      variant="contained"
                    >
                      + Order
                    </Button>
                  </PermissionsGate>
                </>
              ) : null}
            </Box>
            <TabPanel sx={{ padding: '0px' }} value="Status">
              <StatusTable
                clientStatusList={clientStatusList}
                clientProfileDetail={clientProfileDetail}
                handleViewClientStatus={handleViewClientStatus}
                handleEditClientStatus={handleEditClientStatus}
              />
            </TabPanel>
            <TabPanel sx={{ padding: '0px' }} value="Reminder">
              <RemainderTable
                clientReminderList={clientReminderList}
                remainderDialog={remainderDialog}
                setRemainderDialog={setRemainderDialog}
                handleReminderDetail={handleReminderDetail}
              />
            </TabPanel>
            <TabPanel sx={{ padding: '0px' }} value="Appointment">
              <AppointmentTable
                handleViewAppointment={handleViewAppointment}
                appointmentDialogControl={appointmentDialogControl}
                setAppointmentDialogControl={setAppointmentDialogControl}
                handleAppointmentOpen={handleAppointmentOpen}
                clientAppointmentList={clientAppointmentList}
                handleAppointmentDetail={handleAppointmentDetail}
              />
            </TabPanel>
            <TabPanel sx={{ padding: '0px' }} value="Profile">
              <ProfileTable clientProfileDetail={clientProfileDetail} />
            </TabPanel>
            <TabPanel sx={{ padding: '0px' }} value="Orders">
              <OrderList />
            </TabPanel>
          </TabContext>
          <EditReminderDialog
            remainderDialog={remainderDialog}
            setRemainderDialog={setRemainderDialog}
            handleClose={handleClose}
            clientProfileDetail={clientProfileDetail}
            handleEditReminder={handleEditReminder}
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
          {viewClientStatus.status === true ? (
            <ViewClientStatusDialog
              handleViewStatusDialogClose={handleViewStatusDialogClose}
              viewClientStatus={viewClientStatus}
            />
          ) : null}
          {appointmentDialogControl.status === true ? (
            <AppointmentDialog
              appointmentDialogControl={appointmentDialogControl}
              handleAppointmentClose={handleAppointmentClose}
              clientProfileDetail={clientProfileDetail}
              setAppointmentDialogControl={setAppointmentDialogControl}
              handleAddEditAppointment={handleAddEditAppointment}
            />
          ) : null}
          {viewAppointment.status === true && (
            <ViewAppointmentDialog
              viewAppointment={viewAppointment}
              handleViewAppointmentDialogClose={
                handleViewAppointmentDialogClose
              }
            />
          )}
        </Box>
      </Box>
    </>
  )
}

export default ClientProfile
