import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Divider, Button, FormControlLabel, Grid, Autocomplete, TextField, Checkbox } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import "./index.css";
import JobRoleDialog from "./JobRoleDialog";
import DeleteJobRoleDialog from "./DeleteJobRoleDialog";
import DeleteDepartmentDialog from "./DeleteDepartmentDialog";
import AddEditDepartmentDialog from "./AddEditDepartmentDialog";
import { GetAdminRole } from "../../services/apiservices/adminprofile";
import EditJobRoleDialog from "./EditJobRoleDialog";
import { UpdatePermission, getUserPermissions } from '../../services/apiservices/adminprofile';
import { Context as ContextSnackbar } from "../../context/pageContext";
import StaffIcon from '../../assets/img/staff.svg'
import ClientIcon from '../../assets/img/Clients.svg';
import SettingIcon from '../../assets/img/setting.svg';
import { Context as AuthContext } from "../../context/authContext/authContext";
import { useNavigate } from "react-router-dom";
const JobRolesList = () => {
  let navigate = useNavigate();
    const { flagLoader, permissions } = useContext(AuthContext).state;
    const [jobRoleDialogControl, setJobRoleDialogControl] = useState(false);
    const [deleteJobRoleDialogControl, setDeleteJobRoleDialogControl] =
        useState({ status: false, id: null });
    const [deleteDepartmentDialogControl, setDeleteDepartmentControl] =
        useState({
            status: false,
            id: null,
        });
    const [editJobRoleDialogControl, setEditJobRoleDialogControl] = useState({
        status: false,
        departmentId: null,
        name: "",
        description: "", roleId: null
    })
    const [addEditDepartmentDialogControl, setAddEditDepartmentDialogControl] =
        useState({
            status: false,
            id: null,
            departmentName: "",
        });
    const [jobRoleList, setJobRoleList] = useState({
        name: "",
        roles: [],
        departmentId: null,
    });
    useEffect(() => {
        let path = window.location.pathname;
        console.log("Printing Path of ", path);
        console.log("Printing ", path.split("/").pop());
        path = path.split("/").pop();
        GetAdminRole(
            parseInt(path),
            (res) => {
                if (res.status === 200) {
                    setJobRoleList({
                        ...jobRoleList,
                        departmentId: res.data.department.id,
                        name: res.data.department.name,
                        roles: res.data.roles,
                    });
                }
            },
            (err) => {
                console.log(err);
                //
            }
        );
    }, [deleteJobRoleDialogControl.status, jobRoleDialogControl, editJobRoleDialogControl.status]);

    return (
        <>
            <div className="main_section p-4">
                <Box className="job_role_title mb-3">
                    <Typography variant="span" className="ms-2">
                        Job Roles
                    </Typography>
                    {permissions?.editDepartment && <Button
                        onClick={() => {
                            setJobRoleDialogControl(true);
                        }}
                        variant="contained"
                    >
                        + Add Job Role
                    </Button>}
                </Box>
                {jobRoleList.roles.length > 0 &&
                    jobRoleList?.roles.map((data, index) => {
                        return (
                            <Box className="appointment_notification">
                                <Grid
                                    container
                                    spacing={2}
                                    className="align-items-center d-flex justify-content-center"
                                >
                                    <Grid item xs={2}>
                                        <Typography variant="span">{index + 1}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="span">{data.name}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="span">{data.description}</Typography>
                                    </Grid>
                                    <Grid item spacing={2}>
                                        <Button variant="contained"   onClick={() => navigate(`/jobroleaccess/${data.id}`)} className="attendance_button">View</Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        );
                    })}
            </div>
        </>
    )
}

export default JobRolesList