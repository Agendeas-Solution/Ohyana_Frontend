import React, { useContext, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    TextField,
    Typography,
    TextareaAutosize
} from "@mui/material";
import { EditCalendarAppointment } from "../../services/apiservices/adminprofile";
import { Context as ContextEditAppointmentDialog } from "../../context/pageContext";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const EditAppointmentDialog = (props) => {
    const { editAppointmentDialogFlag } = useContext(ContextEditAppointmentDialog)?.state;
    const [editAppointment, setEditAppointment] = useState({
        heading: props?.AppointmentDetails?.heading,
        description: props?.AppointmentDetails?.description,
        date: props?.AppointmentDetails?.date,
        time: props?.AppointmentDetails?.time,
        type: "APPOINTMENT",
        id: props?.AppointmentDetails?.id,
    });
    const handleEditAppointment = () => {
        console.log("Printing addAppointment", editAppointment);
        if (editAppointment.heading !== "" && editAppointment.description !== "" && editAppointment.date !== "") {
            EditCalendarAppointment(
                editAppointment.id, {
                heading: editAppointment?.heading,
                description: editAppointment?.description,
                date: editAppointment?.date,
                time: editAppointment?.time,
                type: "APPOINTMENT",
            },
                (res) => {
                    if (res.status === 200) {
                        props.handleAppointmentDialogClose();
                        setEditAppointment({
                            ...editAppointment, heading: "",
                            description: "",
                            date: "",
                            time: ""
                        })
                    }
                },
                (err) => {
                    ////debugger
                }
            );
        }
    }
    return (
        <>

            <Dialog
                open={editAppointmentDialogFlag}
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
                                    value={editAppointment?.heading}
                                    placeholder="Enter Heading"
                                    onChange={(e) => {
                                        setEditAppointment({
                                            ...editAppointment,
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
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        disablePast
                                          
                                        inputFormat="dd/MM/yyyy"
                                        value={editAppointment.date}
                                        onChange={(e) => {
                                            setEditAppointment({ ...editAppointment, date: e });
                                        }}
                                        renderInput={(params) => <TextField className={`w-100`} {...params} />}
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
                                    value={editAppointment?.time}
                                    onChange={(e) => {
                                        setEditAppointment({
                                            ...editAppointment,
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
                                    value={editAppointment?.description}
                                    onChange={(e) => {
                                        setEditAppointment({
                                            ...editAppointment,
                                            description: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions className="m-auto">
                    <Button onClick={handleEditAppointment} variant="contained">
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

export default EditAppointmentDialog;
