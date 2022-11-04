import React, { useState, useContext } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    TextField,
    Typography, TextareaAutosize
} from "@mui/material";
import { EditClientStatus } from "../../services/apiservices/adminprofile";
import { Context as ContextSnackbar } from "../../context/pageContext";

const EditStatusDialog = (props) => {
    const [editStatusDetail, setEditStatusDetail] = useState({
        description: props?.editStatusDialog?.description,
        statusId: props?.editStatusDialog?.statusId
    });
    const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state;
    const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar);
    const EditStatus = () => {
        console.log("EditClient Status", editStatusDetail);
        EditClientStatus(
            editStatusDetail,
            (res) => {
                props.handleStatusClose();
                setSuccessSnackbar({ ...successSnackbar, status: true, message: res.data.message })
            },
            (err) => {
                setErrorSnackbar({ ...errorSnackbar, status: true, message: err.response.data.error })
            }
        );
    };
    return (
        <>
            <Dialog open={props.editStatusDialog.status} onClose={props.handleStatusClose}>
                <div style={{ textAlign: 'center' }} className="px-3 pt-3">
                    <h4 style={{ fontWeight: '600' }}>Add Status</h4>
                </div>
                <DialogContent>
                    <Box>
                        <div className="row">
                            <div className="col-md-6">
                                <Typography variant="span">Description</Typography>
                            </div>
                            <div className="col-md-12">
                                <TextareaAutosize
                                    value={editStatusDetail?.description}
                                    className="w-100"
                                    sx={{ borderRadius: "10px" }}
                                    onChange={(e) =>
                                        setEditStatusDetail({
                                            ...editStatusDetail,
                                            description: e.target.value,
                                        })
                                    }
                                    placeholder="Description Here..."
                                />
                            </div>
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={EditStatus}>
                        Add
                    </Button>
                    <Button variant="contained" onClick={props.handleStatusClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditStatusDialog;
