import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Grid,
  Typography, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions, Button
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import "./index.css";
import EditAppointmentDialog from "./EditAppointmentDialog";
import SuccessSnackbar from "../SuccessSnackbar/SuccessSnackbar";
import { Context as ContextEditAppointmentDialog } from "../../context/pageContext";
import {
  GetAdminAppointmentOrReminder,
  DeleteAppointment,
} from "../../services/apiservices/adminprofile";
import moment from "moment";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Context as ContextSnackbar } from "../../context/pageContext";
const AppointmentList = (props) => {
  const { editAppointmentDialogFlag } = useContext(ContextEditAppointmentDialog)?.state;
  const { setEditAppointmentDialogFlag } = useContext(ContextEditAppointmentDialog);
  const [AppointmentDetails, setAppointmentDetails] = useState({});

  const { successSnackbar } = useContext(ContextSnackbar)?.state;
  const { setSuccessSnackbar } = useContext(ContextSnackbar);
  const [deleteAppointmentDialogControl, setDeleteAppointmentDialogControl] = useState({
    status: false,
    id: null
  })
  const handleEditAppointment = (rowData) => {
    setEditAppointmentDialogFlag(true)
    setAppointmentDetails(rowData)
  }
  const handleAppointmentDialogClose = () => {
    setEditAppointmentDialogFlag(false)
  }
  const handleDeleteAppointment = () => {
    DeleteAppointment(
      deleteAppointmentDialogControl.id,
      (res) => {
        if (res.status === 200) {
          setDeleteAppointmentDialogControl({ ...deleteAppointmentDialogControl, status: false })
          console.log(successSnackbar);
          setSuccessSnackbar({ ...successSnackbar, status: true, message: res.data.message });

          GetAdminAppointmentOrReminder(
            { type: "APPOINTMENT" },
            (res) => {
              if (res.status === 200) {
                props.setAppointmentListDetail(res.data);
              }
            },
            (err) => {
              console.log(err);
            }
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleDialogClose = () => {
    setDeleteAppointmentDialogControl({ ...deleteAppointmentDialogControl, status: false })
  }
  return (
    <>
      <div className="bg-body p-4">
        <Box sx={{ height: "83vh" }} className="appointment_notification">
          {props.AppointmentListDetail.map((rowData) => {
            return (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <Typography variant="span">{moment(rowData.date).format('DD-MM-YYYY')}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="span">{moment(rowData.time, 'hh:mm:ss').format('LT')}</Typography>
                  </Grid>
                  <Grid item xs={6} className="d-flex flex-column">
                    <Typography className="h5" variant="div">
                      {rowData.heading}
                    </Typography>
                    <Typography variant="div">{rowData.description}</Typography>
                  </Grid>
                  <Grid className="product_buttons" item xs={2} spacing={2}>
                    {rowData.isScheduled ? <Box>
                      <CheckCircleRoundedIcon sx={{
                        color: "#2E3591", height: "35px",
                        width: "35px"
                      }} />
                    </Box> :
                      <EditRoundedIcon onClick={() =>
                        handleEditAppointment(rowData)} className="edit_icon" />}
                    <DeleteRoundedIcon
                      onClick={() => {
                        setDeleteAppointmentDialogControl({ ...deleteAppointmentDialogControl, status: true, id: rowData.id })
                      }}
                      className="delete_icon"
                    />
                  </Grid>
                </Grid>
              </>
            );
          })}
        </Box>
      </div>
      {editAppointmentDialogFlag === true && <EditAppointmentDialog handleAppointmentDialogClose={handleAppointmentDialogClose} AppointmentDetails={AppointmentDetails} />}
      <Dialog
        open={deleteAppointmentDialogControl.status}
        onClose={handleDialogClose}
      >
        <DialogTitle>Delete Appointment</DialogTitle>
        <DialogContent>
          <Typography variant="span">
            Are You Sure you want to Delete this Appointment ?
          </Typography>
        </DialogContent>
        <DialogActions className="m-auto">
          <Button
            variant="contained"
            onClick={handleDeleteAppointment}
          >
            Ok
          </Button>
          <Button
            className="cancel-btn"
            onClick={handleDialogClose}
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AppointmentList;
