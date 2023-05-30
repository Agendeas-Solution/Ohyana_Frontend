import React, { useState, useEffect, useContext } from 'react'
import {
  Tabs,
  Tab,
  Box,
  Button,
  Grid,
  Typography,
  Pagination,
} from '@mui/material'
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
  const [numbersToDisplayOnPagination, setNumbersToDisplayOnPagination] =
    useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)

  const [totalResult, setTotalresult] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
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
      { page: currentPage, size: rowsPerPage },
      res => {
        if (res?.success) {
          setTotalresult(res?.data?.totalPage)
          let pages =
            res?.data?.totalPage > 0
              ? Math.ceil(res?.data?.totalPage / rowsPerPage)
              : null
          setNumbersToDisplayOnPagination(pages)
          setNotificationDetail(res?.data.notifications)
          setLoader(false)
        }
      },
      err => {
        setNotificationDetail([])
        setLoader(false)
      },
    )
  }, [currentPage])
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
        setNotificationSentDetail([])
        setLoader(false)
      },
    )
  }, [])

  const handleView = route => {
    navigate(route)
  }

  return (
    <>
      <Box className="notification_section">
        <Box sx={{ padding: '10px', overflowY: 'auto' }}>
          {notificationDetail.length > 0 &&
            notificationDetail.map((rowData, index) => {
              return (
                <>
                  <Box sx={{ marginBottom: '20px' }}>
                    {moment(rowData?.createdAt).format('DD-MM-YYYY') ===
                    moment(notificationDetail[index - 1]?.createdAt).format(
                      'DD-MM-YYYY',
                    ) ? null : (
                      <Typography>
                        {moment(rowData.createdAt).format('DD-MM-YYYY')}
                      </Typography>
                    )}

                    <Box className="notification_content">
                      <Box
                        sx={{
                          width: '6%',
                        }}
                      >
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
                      <Box
                        sx={{
                          width: '10%',
                        }}
                      >
                        <Typography variant="span">
                          {moment(
                            moment(rowData.createdAt).format(
                              'YYYY-MM-DD HH:mm:ss',
                            ),
                          ).format('LT')}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: '84%',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Typography
                          className="notification_description_heading"
                          variant="span"
                        >
                          {rowData.heading}
                        </Typography>
                        <Typography variant="span">
                          {rowData.description}
                        </Typography>
                      </Box>
                      {/* <Box>
                                                {rowData?.button &&
                                                    JSON.parse(rowData?.button).map(value => {
                                                        return (
                                                            <Button
                                                                sx={{ backgroundColor: '#2E3591' }}
                                                                className="notification_button"
                                                                variant="contained"
                                                                onClick={() => handleView(value?.path)}
                                                            >
                                                                {value?.name}
                                                            </Button>
                                                        )
                                                    })}
                                            </Box> */}
                    </Box>
                  </Box>
                </>
              )
            })}
        </Box>
        <Box>
          <Pagination
            className="pagination_style"
            boundaryCount={0}
            siblingCount={0}
            size="small"
            shape="rounded"
            count={numbersToDisplayOnPagination}
            page={currentPage}
            onChange={(e, value) => {
              setCurrentPage(value)
            }}
          />
        </Box>
      </Box>
    </>
  )
}

export default Notification
