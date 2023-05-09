import React, { useState, useEffect, useContext } from 'react'
import { Tabs, Tab, Box, Button, Grid, Typography } from '@mui/material'
import './index.css'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { GetNotification } from '../../services/apiservices/adminprofile'
import { Context as ContextSnackbar } from '../../context/pageContext'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
const ClientStatusCloseDialog = React.lazy(() =>
  import('../ClientStatusCloseDialog/ClientStatusCloseDialog'),
)
const Loader = React.lazy(() => import('../Loader/Loader'))

const Notification = () => {
  const navigate = useNavigate()
  const { successSnackbar, errorSnackbar, notificationSnackbar } =
    useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar, setNotificationSnackbar } =
    useContext(ContextSnackbar)
  const [notificationSentDetail, setNotificationSentDetail] = useState([])
  const [notificationDetail, setNotificationDetail] = useState([])

  const [AddNotificationDialog, setAddNotificationDialog] = useState(false)
  const [deleteRemainderDialog, setDeleteRemainderDialog] = useState(false)
  const [loader, setLoader] = useState(false)
  const handleClickOpen = () => {
    setAddNotificationDialog(true)
  }

  const handleClose = () => {
    setAddNotificationDialog(false)
  }
  const OpenDeleteRemainder = () => {
    setDeleteRemainderDialog(true)
  }
  const CloseDeleteRemainder = () => {
    setDeleteRemainderDialog(false)
  }

  // socket.on("notification", function (result) {
  //   console.log(result.data.heading)
  //   setNotificationSnackbar({ ...notificationSnackbar, status: true, heading: result?.data?.heading, description: result?.data?.description });
  //   ;
  // })

  useEffect(() => {
    setLoader(true)
    GetNotification(
      {},
      res => {
        if (res?.success) {
          setNotificationDetail(res?.data)
          setLoader(false)
        }
      },
      err => {
        console.log(err)
        setNotificationDetail([])
        setLoader(false)
      },
    )
  }, [])
  useEffect(() => {
    setLoader(true)
    GetNotification(
      {},
      res => {
        if (res?.success) {
          setNotificationSentDetail(res?.data)
          setLoader(false)
        }
      },
      err => {
        console.log(err)
        setNotificationSentDetail([])
        setLoader(false)
      },
    )
  }, [])

  //Route for button coming from api
  const handleView = route => {
    navigate(route)
  }
  return (
    <>
      <Box className="main_section">
        <Box className="bg-body">
          <Box className="appointment_notification">
            {notificationDetail.map((rowData, index) => {
              return (
                <>
                  {moment(rowData?.createdAt).format('DD-MM-YYYY') ===
                  moment(notificationDetail[index - 1]?.createdAt).format(
                    'DD-MM-YYYY',
                  ) ? null : (
                    <Typography>
                      {moment(rowData.createdAt).format('DD-MM-YYYY')}
                    </Typography>
                  )}

                  <Box className="notification_content">
                    <Box sx={{ width: '13%' }} className="d-flex flex-column">
                      {
                        <img
                          style={{ height: '30px', width: '30px' }}
                          src={`${
                            window.location.protocol +
                            '//' +
                            window.location.hostname +
                            ':' +
                            window.location.port
                          }/${rowData.type.toLowerCase()}.svg`}
                          alt="mySvgImage"
                        />
                      }
                    </Box>

                    <Box sx={{ width: '16%' }} className="d-flex flex-column">
                      <Typography variant="span">
                        {moment(
                          moment(rowData.createdAt).format(
                            'YYYY-MM-DD HH:mm:ss',
                          ),
                        ).format('LT')}
                      </Typography>
                    </Box>

                    <Box sx={{ width: '71%' }} className="d-flex flex-column">
                      <Typography className="h5" variant="div">
                        {rowData.heading}
                      </Typography>
                      <Typography variant="div">
                        {rowData.description}
                      </Typography>
                    </Box>

                    <Box>
                      {rowData?.button &&
                        rowData?.button.map(value => {
                          return (
                            <Button
                              className="notification_button"
                              variant="contained"
                              onClick={() => eval(value?.functionName)}
                            >
                              {value?.name}
                            </Button>
                          )
                        })}
                    </Box>
                  </Box>
                </>
              )
            })}
          </Box>
        </Box>
        {/* <ClientStatusCloseDialog
          deleteRemainderDialog={deleteRemainderDialog}
          CloseDeleteRemainder={CloseDeleteRemainder}
        /> */}
      </Box>
    </>
  )
}

export default Notification
