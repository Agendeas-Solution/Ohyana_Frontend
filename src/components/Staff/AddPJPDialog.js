import React, { useEffect, useState } from 'react'
import {
    Box, Typography, Button, TextField, DialogContent,
    DialogActions, Dialog
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import './index.css';
const AddPJPDialog = ({ addPJPDetail, handleCloseDialog, setAddPJPdetail, handleAddPJPDetail,getLocation }) => {

    return (
        <>
            <Dialog
                open={addPJPDetail.dialogStatus}
                onClose={handleCloseDialog}
            >
                <div className="px-3 pt-3 text-center">
                    <h2>Create PJP</h2>
                </div>
                <DialogContent>
                    <div className="row">
                        <div className="col-md-12">
                            <Typography variant="span">Customer Name</Typography>
                        </div>
                        <div className="col-md-12">
                            <TextField
                                className="w-100"
                                value={addPJPDetail.name}
                                onChange={(e) => {
                                    setAddPJPdetail({ ...addPJPDetail, name: e.target.value })
                                }}
                                type="text"
                                variant="outlined"
                                placeholder="Customer Name"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Typography variant="span">Business</Typography>
                        </div>
                        <div className="col-md-12">
                            <TextField
                                className="w-100"
                                value={addPJPDetail.business}
                                onChange={(e) => {
                                    setAddPJPdetail({ ...addPJPDetail, business: e.target.value })
                                }}
                                type="text"
                                variant="outlined"
                                placeholder="Business/Shop/Store Name"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Typography variant="span">Date</Typography>
                        </div>
                        <div className="col-md-12">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    className='w-100'
                                    value={addPJPDetail.date}
                                    onChange={(newValue) => {
                                        setAddPJPdetail({ ...addPJPDetail, date: newValue })
                                    }}
                                    renderInput={(params) => <TextField className='w-100' {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Typography variant="span">Contact Number</Typography>
                        </div>
                        <div className="col-md-12">
                            <TextField
                                className="w-100"
                                value={addPJPDetail.contact_number}
                                onChange={(e) => {
                                    setAddPJPdetail({ ...addPJPDetail, contact_number: e.target.value });
                                }}
                                type="text"
                                variant="outlined"
                                placeholder="Contact Number"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Typography variant="span">State</Typography>
                        </div>
                        <div className="col-md-12">
                            <TextField
                                className="w-100"
                                value={addPJPDetail.state}
                                onChange={(e) => {
                                    setAddPJPdetail({ ...addPJPDetail, state: e.target.value })
                                }}
                                type="text"
                                variant="outlined"
                                placeholder="State"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Typography variant="span">City</Typography>
                        </div>
                        <div className="col-md-12">
                            <TextField
                                className="w-100"
                                value={addPJPDetail.city}
                                onChange={(e) => {
                                    setAddPJPdetail({ ...addPJPDetail, city: e.target.value })
                                }}
                                type="text"
                                variant="outlined"
                                placeholder="City"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <Box className="col-md-4">
                            <div className="col-md-12">
                                <Typography variant="span">Latitude</Typography>
                            </div>
                            <div className="col-md-12">
                                <TextField
                                    className="w-100"
                                    value={addPJPDetail.latitude}
                                    onChange={(e) => {
                                        setAddPJPdetail({ ...addPJPDetail, latitude: e.target.value })
                                    }}
                                    type="text"
                                    variant="outlined"
                                    placeholder="Latitude"
                                />
                            </div>
                        </Box>
                        <Box className="col-md-4">
                            <div className="col-md-12">
                                <Typography variant="span">Longitude</Typography>
                            </div>
                            <div className="col-md-12">
                                <TextField
                                    className="w-100"
                                    value={addPJPDetail.longitude}
                                    onChange={(e) => {
                                        setAddPJPdetail({ ...addPJPDetail, longitude: e.target.value })
                                    }}
                                    type="text"
                                    variant="outlined"
                                    placeholder="Longitude"
                                />
                            </div>
                        </Box>
                        <Box className="col-md-4 align-items-center">
                            <Button className="common_button" onClick={getLocation}>Get Location</Button>
                        </Box>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Typography variant="span">Description</Typography>
                        </div>
                        <div className="col-md-12">
                            <TextField
                                className="w-100"
                                value={addPJPDetail.description}
                                onChange={(e) => {
                                    setAddPJPdetail({ ...addPJPDetail, description: e.target.value })
                                }}
                                type="text"
                                variant="outlined"
                                placeholder="Description"
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions sx={{ marginLeft: "13px", marginRight: "13px" }} className="mt-1 d-flex justify-content-between">
                    <Button
                        variant="contained"
                        className="ok-btn"
                        onClick={handleAddPJPDetail}
                    >
                        Ok
                    </Button>
                    <Button onClick={handleCloseDialog} className="cancel-btn" autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddPJPDialog