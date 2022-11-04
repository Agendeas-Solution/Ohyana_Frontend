import React, { useState, useContext, useEffect } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    TextField,
    Typography, Autocomplete
} from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { EditAdminClientAppointmentDetail } from '../../services/apiservices/clientDetail';
import { GetAllStaffList } from '../../services/apiservices/staffDetail.js';

import moment from "moment";
import { Context as ContextSnackbar } from "../../context/pageContext";

const EditAppointmentDialog = (props) => {
    const [clientAppointmentDetail, setClientAppointmentDetail] = useState({
        date: props?.editClientAppointmentDetail?.date,
        time: props?.editClientAppointmentDetail?.time,
        description: props?.editClientAppointmentDetail?.description,
        appointed_member: props?.editClientAppointmentDetail?.appointed_member,
        appointment_unit: props?.editClientAppointmentDetail?.appointment_unit,
        appointmentId: props?.editClientAppointmentDetail?.appointmentId,
    });
    const { successSnackbar } = useContext(ContextSnackbar)?.state;
    const { setSuccessSnackbar } = useContext(ContextSnackbar);
    const [staffDetailList, setStaffDetailList] = useState([])
    const [appointmentPlaceList, setAppointmentPlaceList] = useState(["Factory", "Office"])
    useEffect(() => {
        GetAllStaffList({}, (res) => {
            setStaffDetailList(res.data.team);
        }, (err) => {
        })
    }, [])
    // useEffect(() => {

    //     if (staffDetailList.length > 0) {
    //         let data = staffDetailList.filter((member) => {
    //             clientAppointmentDetail.appointed_member.map((appointedMember) => {
    //                 if (appointedMember === member.id) {
    //                     return member;
    //                     debugger;
    //                 }
    //             }
    //             )
    //         })
    //         setClientAppointmentDetail({ ...clientAppointmentDetail, appointed_member: data[0] })
    //         debugger
    //     }
    // }, [staffDetailList])
    const handleAddAppointment = () => {
        console.log("Add Reminder", clientAppointmentDetail);
        if (clientAppointmentDetail.description !== "" && clientAppointmentDetail.date !== "" && clientAppointmentDetail.time !== "") {
            clientAppointmentDetail["appointed_member"] = [...new Set(clientAppointmentDetail?.appointed_member.map((item) => item?.id))]
            console.log(clientAppointmentDetail);
            EditAdminClientAppointmentDetail(clientAppointmentDetail, (res) => {
                props.handleAppointmentClose();
                setSuccessSnackbar({ ...successSnackbar, status: true, message: res.data.message })
            }, (err) => {
                console.log("Error :", err);
            })
        }
    }
    return (
        <>
            <Dialog
                open={props.editClientAppointmentDetail.status}
                onClose={props.handleAppointmentClose}
            // sx={{maxWidth:"500px"}}
            >
                <div className="px-3 my-3">
                    <h3>Appointment</h3>
                </div>
                <DialogContent sx={{ maxWidth: "500px" }}>
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
                                        value={clientAppointmentDetail.date}
                                        onChange={(e) => {
                                            setClientAppointmentDetail({ ...clientAppointmentDetail, date: moment(e).format('YYYY-MM-DD') });
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
                                <TextField onChange={(e) => {
                                    setClientAppointmentDetail({ ...clientAppointmentDetail, time: e.target.value });
                                }}
                                    value={clientAppointmentDetail.time} className="w-100" type="time" />
                            </div>
                        </div>
                    </Box>
                    <Box>
                        <div className="row">
                            <div className="col-md-12">
                                <Typography variant="span">Description</Typography>
                            </div>
                            <div className="col-md-12">
                                <TextField onChange={(e) => {
                                    setClientAppointmentDetail({ ...clientAppointmentDetail, description: e.target.value, clientId: props?.clientProfileDetail?.id });
                                }}
                                    value={clientAppointmentDetail.description} className="w-100" placeholder="Description..." />
                            </div>
                        </div>
                    </Box>
                    <Box className="my-3">
                        <div className="row">
                            <div className="col-md-12">
                                <Typography variant="span">Appointment At ?</Typography>
                            </div>
                            <div className="col-md-12">
                                <Autocomplete
                                    filterSelectedOptions
                                    options={appointmentPlaceList}
                                    value={clientAppointmentDetail?.appointment_unit}
                                    onChange={(e, value) => {
                                        console.log(value);
                                        setClientAppointmentDetail({ ...clientAppointmentDetail, appointment_unit: value });
                                    }}
                                    getOptionLabel={(option) => option}
                                    // freeSolo
                                    // multiple
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            // className="w-100"
                                            placeholder={
                                                clientAppointmentDetail?.appointed_member ? "" : "Add Member"
                                            }
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </Box>
                    <Box className="my-3">
                        <div className="row">
                            <div className="col-md-12">
                                <Typography variant="span">Who can join ?</Typography>
                            </div>
                            <div className="col-md-12">
                                <Autocomplete
                                    filterSelectedOptions
                                    options={staffDetailList}
                                    value={clientAppointmentDetail?.appointed_member}
                                    onChange={(e, value) => {
                                        console.log(value);
                                        setClientAppointmentDetail({ ...clientAppointmentDetail, appointed_member: value });
                                        debugger
                                    }}
                                    getOptionLabel={(option) => option?.name}
                                    // freeSolo
                                    multiple
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            // className="w-100"
                                            placeholder={
                                                clientAppointmentDetail?.appointed_member > 0 ? "" : "Add Member"
                                            }
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleAddAppointment}>
                        Ok
                    </Button>
                    <Button variant="contained" onClick={props.handleAppointmentClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditAppointmentDialog;
