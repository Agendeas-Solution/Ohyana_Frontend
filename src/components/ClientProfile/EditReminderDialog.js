import React, { useState, useContext } from "react";
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
import { EditAdminClientReminderDetail } from '../../services/apiservices/clientDetail';
import moment from "moment";
import { Context as ContextSnackbar } from "../../context/pageContext";
const EditReminderDialog = (props) => {
    const [clientReminderDetail, setClientReminderDetail] = useState({
        description: props?.editReminderDetail?.description,
        date: props?.editReminderDetail?.date,
        time: props?.editReminderDetail.time,
        reminderId: props?.editReminderDetail?.id
    });
    const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state;
    const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar);
    const handleEditReminder = () => {
        console.log("Add Reminder", clientReminderDetail);
        //debugger;
        if (clientReminderDetail.description !== "" && clientReminderDetail.date !== "" && clientReminderDetail.time !== "") {
            EditAdminClientReminderDetail(clientReminderDetail, (res) => {
                props.handleClose();
                //debugger
                setSuccessSnackbar({ ...successSnackbar, status: true, message: res.data.message })
            }, (err) => {
                setErrorSnackbar({ ...errorSnackbar, status: true, message: err.response.data.error })
            })
        }
    }
    return (
        <>
            <Dialog open={props.editReminderDetail.status} onClose={props.handleClose}>
                <div className="px-3 pt-3">
                    <h3>Reminder</h3>
                </div>
                <DialogContent>
                    <Box>
                        <div className="row">
                            <div className="col-md-12">
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
                                        renderInput={(params) => <TextField className="w-100" {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                    </Box>
                    <Box className="my-3">
                        <div className="row">
                            <div className="col-md-12">
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
                    <Box>
                        <div className="row">
                            <div className="col-md-12">
                                <Typography variant="span">Description</Typography>
                            </div>
                            <div className="col-md-12">
                                {/* <TextField onChange={(e) => {
                                    setClientReminderDetail({ ...clientReminderDetail, description: e.target.value });
                                }} value={clientReminderDetail.description} placeholder="Description..." className="w-100" /> */}
                                <TextareaAutosize

                                    className="w-100"
                                    sx={{ borderRadius: "10px" }}
                                    onChange={(e) => {
                                        setClientReminderDetail({ ...clientReminderDetail, description: e.target.value });
                                    }} value={clientReminderDetail.description}
                                    placeholder="Description Here..."
                                />
                            </div>
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleEditReminder}>
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

export default EditReminderDialog;
