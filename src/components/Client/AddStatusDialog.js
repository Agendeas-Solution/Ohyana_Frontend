import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography, Box, TextareaAutosize, Autocomplete, TextField
} from "@mui/material";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { GetBusinessDetail } from '../../services/apiservices/clientDetail';
import moment from 'moment';
import { AddClientStatus } from '../../services/apiservices/adminprofile';
const AddStatusDialog = ({ setAddStatus, addStatus, handleDialogOpen, businessDetail }) => {
    const [addStatusDetail, setAddStatusDetail] = useState({
        followUpType: "",
        description: "",
        clientId: businessDetail?.clientId,
        callNotReceived: true
    })
    const AddStatus = (e) => {
        AddClientStatus(
            {
                description: addStatusDetail?.description,
                clientId: addStatusDetail?.clientId,
                callNotReceived: true,
                followUpType: addStatusDetail?.followUpType
            },
            (res) => {
                debugger;
                setAddStatus({ ...addStatus, status: false })
                // setSuccessSnackbar({ ...successSnackbar, status: true, message: res.data.message })
            },
            (err) => {
                debugger;

                // setErrorSnackbar({ ...errorSnackbar, status: true, message: err.response.data.error })
            }
        );
    };
    return (
        <>
            <Dialog
                open={addStatus.status}
                onClose={() =>
                    setAddStatus({ ...addStatus, status: false })
                }
            >
                <Box>
                    <Box className="col-md-12 text-align-center">
                        <Typography variant="span">Add Status</Typography>
                    </Box>
                    <div className="row">
                        <div className="col-md-12">
                            <Typography variant="span">Conversion Medium</Typography>
                        </div>
                        <div className="col-md-12">
                            <Autocomplete
                                disablePortal
                                value={addStatusDetail.followUpType}
                                onChange={(event, newValue) => {
                                    setAddStatusDetail({
                                        ...addStatusDetail, followUpType: newValue,
                                        clientId: businessDetail?.id,
                                    });
                                    debugger;
                                }}
                                options={['FIELD', 'CALL', "WHATSAPP"]}
                                renderInput={(params) => <TextField {...params} placeholder="Select Medium" />}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Typography variant="span">Description</Typography>
                        </div>
                        <div className="col-md-12">
                            <TextareaAutosize
                                value={addStatusDetail.description}
                                sx={{ borderRadius: "10px" }}
                                className="w-100"
                                onChange={(e) => {
                                    setAddStatusDetail({
                                        ...addStatusDetail,
                                        description: e.target.value,
                                    })
                                }}
                                placeholder="Description Here..."
                            />
                        </div>
                    </div>
                    <DialogActions>
                        <Button variant="contained" onClick={AddStatus}>
                            Add
                        </Button>
                        <Button variant="contained" onClick={() =>
                            setAddStatus({ ...addStatus, status: false })
                        } >
                            Cancel
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}

export default AddStatusDialog