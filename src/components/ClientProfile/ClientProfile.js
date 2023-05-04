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
import NoResultFound from '../ErrorComponent/NoResultFound'
import CloseStatusDialog from './CloseStatusDialog'
import { Dashboard } from '@mui/icons-material'
import EditReminderDialog from './EditReminderDialog'
import StatusTable from './StatusTable'
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
  const { setActivePage } = useContext(ContextActivePage)
  const [value, setValue] = useState('1')
  const { flagLoader, permissions } = useContext(AuthContext).state
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const [remainderDialog, setRemainderDialog] = useState({
    description: '',
    date: '',
    time: '',
    status: false,
    id: null,
  })
  const [callDialog, setCallDialog] = useState(false)
  const [statusDialog, setStatusDialog] = useState(false)
  const [appointmentDialogControl, setAppointmentDialogControl] = useState({
    status: false,
    date: '',
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
  useEffect(() => {
    let path = window.location.pathname
    path = path.split('/').pop()
    GetAdminClientProfileDetail(
      parseInt(path),
      {},
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
      {},
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
  const handleReminderDetail = () => {
    GetAdminClientReminderDetail(
      parseInt(path),
      {},
      res => {
        if (res.success) {
          setClientReminderList(res.data)
        }
      },
      err => {
        console.log('Printing', err)
      },
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
      err => {
        console.log('Printing', err)
      },
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
              console.log('Error :', err)
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
              console.log('Error :', err)
            },
          )
    }
  }
  useEffect(() => {
    value === '1' && handleAdminClienStatusDetail()
    value === '2' && handleReminderDetail()
    value === '3' && handleAppointmentDetail()
  }, [value, statusDialog, callDialog])
  const handleChange = (event, newValue) => {
    setValue(newValue)
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
  const handleViewStatusDialogClose = () => {
    setViewClientStatus({ ...viewClientStatus, status: false })
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
                  navigate(`/addeditclient/${clientProfileDetail.id}`)
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
              <StatusTable
                clientStatusList={clientStatusList}
                clientProfileDetail={clientProfileDetail}
                handleViewClientStatus={handleViewClientStatus}
                handleEditClientStatus={handleEditClientStatus}
              />
            </TabPanel>
            <TabPanel sx={{ padding: '0px' }} value="2">
              <RemainderTable
                clientReminderList={clientReminderList}
                remainderDialog={remainderDialog}
                setRemainderDialog={setRemainderDialog}
              />
            </TabPanel>
            <TabPanel sx={{ padding: '0px' }} value="3">
              <AppointmentTable
                appointmentDialogControl={appointmentDialogControl}
                setAppointmentDialogControl={setAppointmentDialogControl}
                handleAppointmentOpen={handleAppointmentOpen}
                clientAppointmentList={clientAppointmentList}
              />
            </TabPanel>
            <TabPanel sx={{ padding: '0px' }} value="4">
              <ProfileTable clientProfileDetail={clientProfileDetail} />
            </TabPanel>
            <TabPanel sx={{ padding: '0px' }} value="5">
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
          <AppointmentDialog
            appointmentDialogControl={appointmentDialogControl}
            handleAppointmentClose={handleAppointmentClose}
            clientProfileDetail={clientProfileDetail}
            setAppointmentDialogControl={setAppointmentDialogControl}
            handleAddEditAppointment={handleAddEditAppointment}
          />
        </Box>
      </Box>
    </>
  )
}

export default ClientProfile
