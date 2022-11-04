import React, { useState, useContext } from "react";
import {
    Dialog,
    Box,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    TextField,TextareaAutosize
} from "@mui/material";
import { EditJobRole } from "../../services/apiservices/adminprofile";
import { Context as ContextSnackbar } from "../../context/pageContext";
const EditJobRoleDialog = (props) => {
    const [jobRoleDetail, setJobRoleDetail] = useState({
        name: props?.editJobRoleDialogControl?.name,
        description: props?.editJobRoleDialogControl.description,
        departmentId: props?.editJobRoleDialogControl?.departmentId,
        id: props?.editJobRoleDialogControl?.roleId,
    });
    const { successSnackbar } = useContext(ContextSnackbar)?.state;
    const { setSuccessSnackbar } = useContext(ContextSnackbar);
    const handleEditJobRole = () => {
        if (jobRoleDetail.description !== "" && jobRoleDetail.name !== "") {
            EditJobRole(
                jobRoleDetail.id, {
                description: jobRoleDetail.description,
                departmentId: jobRoleDetail.departmentId,
                name: jobRoleDetail.name
            },
                (res) => {
                    props.handleClose();
                    setSuccessSnackbar({ ...successSnackbar, status: true, message: res.data.message })
                },
                (err) => {
                    //debugger
                }
            );
        }

    };
    return (
        <>
            <Dialog open={props.editJobRoleDialogControl.status} onClose={props.handleClose}>
                <DialogTitle>Job Role</DialogTitle>
                <DialogContent>
                    <Box>
                        <div className="row">
                            <div className="col-md-12">
                                <Typography variant="span">Job Role</Typography>
                            </div>
                            <div className="col-md-12">
                                <TextField
                                    value={jobRoleDetail.name}
                                    onChange={(e) => {
                                        setJobRoleDetail({
                                            ...jobRoleDetail,
                                            name: e.target.value
                                        });
                                       
                                    }}
                                    className="w-100"
                                    type="text"
                                    variant="outlined"
                                    placeholder="Job Role"
                                />
                            </div>
                        </div>
                    </Box>
                    <Box>
                        <div className="row my-4">
                            <div className="col-md-6">
                                <Typography variant="span">Description</Typography>
                            </div>
                            <div className="col-md-12">
                                <TextareaAutosize
                                    style={{ width: 150 }}
                                    placeholder="Description Here..."
                                    className="w-100"
                                    value={jobRoleDetail.description}
                                    onChange={(e) => {
                                        setJobRoleDetail({
                                            ...jobRoleDetail,
                                            description: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions className="m-auto">
                    <Button
                        variant="contained"
                        onClick={
                            handleEditJobRole
                        }
                    >
                        Ok
                    </Button>
                    <Button className="cancel-btn" onClick={props.handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditJobRoleDialog