import React, { useState,useContext } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,TextareaAutosize
} from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AddAdminClientReminderDetail } from '../../services/apiservices/clientDetail';
import moment from "moment";
import { Context as  ContextSnackbar } from "../../context/pageContext";
const RemainderDialog = (props) => {
  const [clientReminderDetail, setClientReminderDetail] = useState({
    description: "",
    date: "",
    time: "",
    clientId: props?.clientProfileDetail?.id
  });
  const { successSnackbar } = useContext( ContextSnackbar)?.state;
  const { setSuccessSnackbar } = useContext( ContextSnackbar);
  const handleAddReminder = () => {
    console.log("Add Reminder", clientReminderDetail);
    debugger
    if (clientReminderDetail.description !== "" && clientReminderDetail.date !== "" && clientReminderDetail.time !== "") {

      AddAdminClientReminderDetail(clientReminderDetail, (res) => {
        props.handleClose();
        setSuccessSnackbar({ ...successSnackbar, status: true, message: res.data.message })
      }, (err) => {
        console.log("Error :", err);
        //debugger
      })
    }
  }
  return (
    <>
      <Dialog open={props.remainderDialog} onClose={props.handleClose}>
        <div className="px-3 pt-3">
          <h3>Reminder</h3>
        </div>
        <DialogContent>
          <Box>
            <div className="row">
              <div className="col-md-6">
                <Typography variant="span">Date</Typography>
              </div>
              <div className="col-md-12">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    disablePast
                     
                    inputFormat="dd/MM/yyyy"
                    value={clientReminderDetail.date}
                    onChange={(e) => {
                      setClientReminderDetail({ ...clientReminderDetail, date: moment(e).format('YYYY-MM-DD') });
                    }}
                    renderInput={(params) => <TextField  className="w-100" {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </Box>
          <Box className="my-3">
            <div className="row">
              <div className="col-md-6">
                <Typography variant="span">Time</Typography>
              </div>
              <div className="col-md-12">
                <TextField
                  onChange={(e) => {
                    setClientReminderDetail({ ...clientReminderDetail, time: e.target.value });
                  }}
                  value={clientReminderDetail.time} className="w-100" type="time" />
              </div>
            </div>
          </Box>
          <Box >
            <div className="row">
              <div className="col-md-12">
                <Typography variant="span">Description</Typography>
              </div>
              <div className="col-md-12">
                 <TextareaAutosize
                  style={{ width: 150 }}
                  placeholder="Description Here..."
                  className="w-100"
                  value={clientReminderDetail.description}
                  onChange={(e) => {
                    setClientReminderDetail({ ...clientReminderDetail, description: e.target.value, clientId: props?.clientProfileDetail?.id });
                  }}
                />
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions className="mt-2">
          <Button variant="contained" onClick={handleAddReminder}>
            Ok
          </Button>
          <Button variant="contained" onClick={props.handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RemainderDialog;
