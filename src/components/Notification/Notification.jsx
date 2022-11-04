import React, { useState, useEffect, useContext } from "react";
import { Tabs, Tab, Box, Button, Grid, Typography } from "@mui/material";
import "./index.css";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ClientStatusCloseDialog from "../ClientStatusCloseDialog/ClientStatusCloseDialog";
import {
  GetNotification, GetSentNotification
} from "../../services/apiservices/adminprofile";
import { Context as ContextSnackbar } from "../../context/pageContext";
// import NOTICE from '../../assets/img/Notice.svg';
// import { socket } from "../../App"
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const Notification = () => {
  const navigate = useNavigate();
  const { successSnackbar, errorSnackbar, notificationSnackbar } = useContext(ContextSnackbar)?.state;
  const { setSuccessSnackbar, setErrorSnackbar, setNotificationSnackbar } = useContext(ContextSnackbar);
  const [value, setValue] = useState("All");
  const [notificationSentDetail, setNotificationSentDetail] = useState([]);
  const [notificationDetail, setNotificationDetail] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [AddNotificationDialog, setAddNotificationDialog] = useState(false);
  const [deleteRemainderDialog, setDeleteRemainderDialog] = useState(false);
  const [loader, setLoader] = useState(false);
  const handleClickOpen = () => {
    setAddNotificationDialog(true);
  };

  const handleClose = () => {
    setAddNotificationDialog(false);
  };
  const OpenDeleteRemainder = () => {
    setDeleteRemainderDialog(true);
  };
  const CloseDeleteRemainder = () => {
    setDeleteRemainderDialog(false);
  };


  // socket.on("notification", function (result) {
  //   console.log(result.data.heading)
  //   setNotificationSnackbar({ ...notificationSnackbar, status: true, heading: result?.data?.heading, description: result?.data?.description });
  //   //debugger;
  // })

  useEffect(() => {
    setLoader(true)
    GetNotification({}, (res) => {
      setNotificationDetail(res?.data?.notifications)
      setLoader(false)

    }, (err) => {
      setLoader(false)

    })
  }, [deleteRemainderDialog])
  useEffect(() => {
    setLoader(true)
    GetSentNotification({}, (res) => {
      console.log(res);
      setNotificationSentDetail(res?.data?.notifications)
      setLoader(false)
    }, (err) => {
      setLoader(false)

    })
  }, [deleteRemainderDialog])

  //Route for button coming from api
  const handleView = (route) => {
    navigate(route);
  }
  return (
    <>
      {
        loader && <Loader />
      }
      <Box className="notification_section">
        <Box className="notification_tabs_root">
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab value="All" label="All" />
            <Tab value="Sent" label="Sent" />
          </Tabs>
          {value === "Sent" && <Button
            onClick={OpenDeleteRemainder}
            className="main_button"
            variant="standard"
          >
            <AddRoundedIcon />
            Compose
          </Button>}
        </Box>
        <Box>
          <div className="bg-body p-4">
            <Box className="appointment_notification">
              {value === "All" && notificationDetail.map((rowData, index) => {
                return (
                  <>
                    {moment(rowData?.createdAt).format('DD-MM-YYYY') === moment(notificationDetail[index - 1]?.createdAt).format('DD-MM-YYYY') ? null : <Typography>{moment(rowData.createdAt).format('DD-MM-YYYY')}</Typography>}
                    {/* {index===0 &&<Typography>{moment(rowData.createdAt).format('DD-MM-YYYY')}</Typography>} */}
                    {/* {index === 0 && moment(notificationDetail[index - 1]?.createdAt).format('DD-MM-YYYY')} */}
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Box sx={{ width: "13%" }} className="d-flex flex-column">
                          {<img style={{ height: "30px", width: "30px" }} src={`${window.location.protocol + '//' + window.location.hostname + ":" + window.location.port}/${rowData.type.toLowerCase()}.svg`} alt='mySvgImage' />}
                        </Box>
                        <Box sx={{ width: "16%" }} className="d-flex flex-column">
                          <Typography variant="span">{moment(moment(rowData.createdAt).format("YYYY-MM-DD HH:mm:ss")).format('LT')}</Typography>
                        </Box>
                        <Box sx={{ width: "71%" }} className="d-flex flex-column">
                          <Typography className="h5" variant="div">
                            {rowData.heading}
                          </Typography>
                          <Typography variant="div">{rowData.description}</Typography>
                        </Box>
                      </Grid>
                      <Grid className="product_buttons" item xs={4} spacing={2}>
                        {rowData?.button && rowData?.button.map((value) => {
                          return (<Button className="notification_button" variant="contained" onClick={() => eval(value?.functionName)} >{value?.name}</Button>)
                        })}
                      </Grid>
                    </Grid>
                  </>
                );
              })}
            </Box>
            <Box className="appointment_notification">
              {value === "Sent" && notificationSentDetail.map((rowData, index) => {
                return (
                  <>
                    {moment(rowData?.createdAt).format('DD-MM-YYYY') === moment(notificationSentDetail[index - 1]?.createdAt).format('DD-MM-YYYY') ? null : <Typography>{moment(rowData.createdAt).format('DD-MM-YYYY')}</Typography>}
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Box sx={{ width: "13%" }} className="d-flex flex-column">
                          {<img style={{ height: "30px", width: "30px" }} src={`${window.location.protocol + '//' + window.location.hostname + ":" + window.location.port}/${rowData.type.toLowerCase()}.svg`} alt='mySvgImage' />}
                        </Box>
                        <Box sx={{ width: "16%" }} className="d-flex flex-column">
                          <Typography variant="span">{moment(moment(rowData.createdAt).format("YYYY-MM-DD HH:mm:ss")).format('LT')}</Typography>
                        </Box>
                        <Box sx={{ width: "71%" }} className="d-flex flex-column">
                          <Typography className="h5" variant="div">
                            {rowData.heading}
                          </Typography>
                          <Typography variant="div">{rowData.description}</Typography>
                        </Box>
                      </Grid>
                      <Grid className="product_buttons" item xs={4} spacing={2}>
                        {rowData?.button && rowData?.button.map((value) => {
                          return (<Button className="notification_button" variant="contained" onClick={() => eval(value?.functionName)} >{value?.name}</Button>)
                        })}
                      </Grid>
                    </Grid>
                  </>
                );
              })}
            </Box>
          </div>
        </Box>
        <ClientStatusCloseDialog
          deleteRemainderDialog={deleteRemainderDialog}
          CloseDeleteRemainder={CloseDeleteRemainder}
        />
      </Box>
    </>
  );
};

export default Notification;
