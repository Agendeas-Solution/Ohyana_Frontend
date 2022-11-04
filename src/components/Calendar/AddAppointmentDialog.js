import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
  TextareaAutosize,
} from "@mui/material";
import { Context as  ContextSnackbar } from "../../context/pageContext";
import { AddCalendarAppointment } from "../../services/apiservices/adminprofile";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
const AddAppointmentDialog = (props) => {
  const [addAppointment, setAddAppointment] = useState({
    heading: "",
    description: "",
    date: "",
    time: "",
    type: "APPOINTMENT",
  });
  const { successSnackbar } = useContext( ContextSnackbar)?.state;
  const { setSuccessSnackbar } = useContext( ContextSnackbar);
  const handleAddAppointment = () => {
    console.log("Printing addAppointment", addAppointment);
    //debugger
    AddCalendarAppointment(
      addAppointment,
      (res) => {
        if (res.status === 200) {
          props.handleAppointmentDialogClose();
          setSuccessSnackbar({ ...successSnackbar, status: true, message: res.data.message });
          setAddAppointment({
            ...addAppointment,
            heading: "",
            description: "",
            date: "",
            time: "",
          });
        }
      },
      (err) => {
        //debugger
      }
    );
  };
  return (
    <>
      <Dialog
        open={props.appointmentDialogControl}
        onClose={props.handleAppointmentDialogClose}
      >
        <div className="px-3 py-3">
          <h3>Appointment</h3>
        </div>
        <DialogContent>
          <Box>
            <div className="row">
              <div className="col-md-6">
                <Typography variant="span">Heading<span className="required_star">*</span></Typography>
              </div>
              <div className="col-md-12">
                <TextField
                  className={`w-100`}
                  value={addAppointment.heading}
                  placeholder="Enter Heading"
                  onChange={(e) => {
                    setAddAppointment({
                      ...addAppointment,
                      heading: e.target.value,
                    });
                  }}
                  type="text"
                />
              </div>
            </div>
          </Box>
          <Box className="my-3">
            <div className="row">
              <div className="col-md-6">
                <Typography variant="span">Date<span className="required_star">*</span></Typography>
              </div>
              <div className="col-md-12  ">
                <LocalizationProvider  dateAdapter={AdapterDateFns}>
                  <DatePicker
                    disablePast
                      
                    inputFormat="dd/MM/yyyy"
                    value={addAppointment.date}
                    onChange={(e) => {
                      setAddAppointment({ ...addAppointment, date: moment(e).format('YYYY-MM-DD') });
                    }}
                    renderInput={(params) => <TextField  className={`w-100`} {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </Box>
          <Box className="my-3">
            <div className="row">
              <div className="col-md-6">
                <Typography variant="span">Time<span className="required_star">*</span></Typography>
              </div>
              <div className="col-md-12">
                <TextField
                  className="w-100"
                  value={addAppointment.time}
                  onChange={(e) => {
                    setAddAppointment({
                      ...addAppointment,
                      time: e.target.value,
                    });
                  }}
                  type="time"
                />
              </div>
            </div>
          </Box>
          <Box className="my-3">
            <div className="row">
              <div className="col-md-6">
                <Typography variant="span">Description<span className="required_star">*</span></Typography>
              </div>
              <div className="col-md-12">
                <TextareaAutosize
                  style={{ width: 150 }}
                  placeholder="Description Here..."
                  className="w-100"
                  value={addAppointment.description}
                  onChange={(e) => {
                    setAddAppointment({
                      ...addAppointment,
                      description: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions className="m-auto">
          <Button onClick={handleAddAppointment} variant="contained">
            Add
          </Button>
          <Button
            // variant="contained"
            className="cancel-btn"
            onClick={props.handleAppointmentDialogClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddAppointmentDialog;
