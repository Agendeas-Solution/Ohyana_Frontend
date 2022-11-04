import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AddCalendarReminder } from "../../services/apiservices/adminprofile";
import { Context as ContextSnackbar } from "../../context/pageContext";
const AddRemainderDialog = (props) => {
  const [addReminder, setAddReminder] = useState({
    heading: "",
    description: "",
    date: "",
    time: "",
    type: "REMINDER",
  });
  const { successSnackbar } = useContext(ContextSnackbar)?.state;
  const { setSuccessSnackbar } = useContext(ContextSnackbar);
  const handleAddReminder = () => {
    console.log("Printing addReminder", addReminder);
    AddCalendarReminder(
      addReminder,
      (res) => {
        if (res.status === 200) {
          props.handleRemainderDialogClose();
          setSuccessSnackbar({ ...successSnackbar, status: true, message: res.data.message });
          setAddReminder({
            ...addReminder,
            heading: "",
            description: "",
            date: "",
            time: "",
          });
        }
      },
      (err) => { }
    );
  };
  return (
    <>
      <Dialog
        open={props.remainderDialogControl}
        onClose={props.handleRemainderDialogClose}
      >
        <div className="px-3 py-3">
          <h3>Reminder</h3>
        </div>
        <DialogContent>
          <Box className="my-3">
            <div className="row">
              <div className="col-md-6">
                <Typography variant="span">Heading<span className="required_star">*</span></Typography>
              </div>
              <div className="col-md-12">
                <TextField
                  className="w-100"
                  value={addReminder.heading}
                  placeholder="Enter Heading"
                  onChange={(e) => {
                    setAddReminder({ ...addReminder, heading: e.target.value });
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                     
                    disablePast
                    inputFormat="dd/MM/yyyy"
                    value={addReminder.date}
                    onChange={(e) => {
                      setAddReminder({ ...addReminder, date: moment(e).format('YYYY-MM-DD') });
                    }}
                    renderInput={(params) => <TextField className="w-100" {...params} />}
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
                  value={addReminder.time}
                  className="w-100"
                  onChange={(e) => {
                    setAddReminder({ ...addReminder, time: e.target.value });
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
                  value={addReminder.description}
                  className="w-100"
                  onChange={(e) => {
                    setAddReminder({
                      ...addReminder,
                      description: e.target.value,
                    });
                  }}
                  placeholder="Description Here..."
                />
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions className="m-auto">
          <Button variant="contained" onClick={handleAddReminder}>
            Add
          </Button>
          <Button
            // variant="contained"
            className="cancel-btn"
            onClick={props.handleRemainderDialogClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddRemainderDialog;
