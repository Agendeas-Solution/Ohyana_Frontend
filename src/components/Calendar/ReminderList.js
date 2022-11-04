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
import {
  GetAdminAppointmentOrReminder,
  DeleteReminder,
} from "../../services/apiservices/adminprofile";
import { Context as ContextEditRemainderDialog } from "../../context/pageContext";
import EditRemainderDialog from "./EditRemainderDialog";
import "./index.css";
import { Context as ContextSnackbar } from "../../context/pageContext";
import SuccessSnackbar from "../SuccessSnackbar/SuccessSnackbar";
import ErrorSnackbar from '../ErrorSnackbar/ErrorSnackbar'
import moment from "moment";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Loader from "../Loader/Loader";

const ReminderList = (props) => {
  const [ReminderListDetail, setReminderListDetail] = useState([]);
  const { editRemainderDialogFlag } = useContext(ContextEditRemainderDialog)?.state;
  const { setEditRemainderDialogFlag } = useContext(ContextEditRemainderDialog);
  const [remainderDetails, setRemainderDetails] = useState({});
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state;
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar);
  const [deleteReminderDialogControl, setDeleteReminderDialogControl] = useState({
    status: false,
    id: null
  })
  const [loader, setLoader] = useState(false);

  const handleEditRemainder = (rowData) => {
    setEditRemainderDialogFlag(true)
    setRemainderDetails(rowData)
  }
  const handleRemainderDialogClose = () => {
    setEditRemainderDialogFlag(false)
  }
  useEffect(() => {
    setLoader(false)
    GetAdminAppointmentOrReminder(
      { type: "REMINDER" },
      (res) => {
        if (res.status === 200) {
          setReminderListDetail(res?.data);
          setLoader(false)
        }
      },
      (err) => {
        console.log(err);
        setLoader(false)

      }
    );
  }, [props.remainderDialogControl, editRemainderDialogFlag]);
  const handleDialogClose = () => {
    setDeleteReminderDialogControl({ ...deleteReminderDialogControl, status: false })
  }
  const handleDeleteReminder = () => {
    DeleteReminder(
      deleteReminderDialogControl.id,
      (res) => {
        if (res.status === 200) {
          setSuccessSnackbar({ ...successSnackbar, status: true, message: res.data.message })
          handleDialogClose();
          GetAdminAppointmentOrReminder(
            { type: "REMINDER" },
            (res) => {
              if (res.status === 200) {
                setReminderListDetail(res?.data);
              }
            },
            (err) => {
              setErrorSnackbar({ ...errorSnackbar, status: true, message: err.response.error })
            }
          );
        }
      },
      (err) => {
        setErrorSnackbar({ ...errorSnackbar, status: true, message: err.response.error })
      }
    );
  };
  return (
    <>
      {loader && <Loader />}
      <div className="bg-body p-4">
        <Box sx={{ height: "83vh" }} className="appointment_notification">
          {ReminderListDetail.map((rowData) => {
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
                    <Typography sx={{ fontWeight: '500' }} className="h5" variant="div">
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
                      <EditRoundedIcon onClick={() => handleEditRemainder(rowData)} className="edit_icon" />}
                    <DeleteRoundedIcon
                      onClick={() => setDeleteReminderDialogControl({ ...deleteReminderDialogControl, status: true, id: rowData.id })}
                      className="delete_icon"
                    />
                  </Grid>
                </Grid>
              </>
            );
          })}
        </Box>
      </div>
      {editRemainderDialogFlag === true && <EditRemainderDialog handleRemainderDialogClose={handleRemainderDialogClose} remainderDetails={remainderDetails} />}
      <Dialog
        open={deleteReminderDialogControl.status}
        onClose={handleDialogClose}
      >
        <DialogTitle>Delete Reminder</DialogTitle>
        <DialogContent>
          <Typography variant="span">
            Are You Sure you want to Delete this Reminder ?
          </Typography>
        </DialogContent>
        <DialogActions className="m-auto">
          <Button
            variant="contained"
            onClick={handleDeleteReminder}
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

export default ReminderList;
