import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Divider, Button, FormControlLabel, Autocomplete, TextField, Checkbox } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import "./index.css";
import JobRoleDialog from "./JobRoleDialog";
import DeleteJobRoleDialog from "./DeleteJobRoleDialog";
import DeleteDepartmentDialog from "./DeleteDepartmentDialog";
import AddEditDepartmentDialog from "./AddEditDepartmentDialog";
import { GetAdminRole } from "../../services/apiservices/adminprofile";
import SuccessSnackbar from "../SuccessSnackbar/SuccessSnackbar";
import EditJobRoleDialog from "./EditJobRoleDialog";
import { UpdatePermission, getUserPermissions } from '../../services/apiservices/adminprofile';
import { Context as ContextSnackbar } from "../../context/pageContext";
import StaffIcon from '../../assets/img/staff.svg'
import ClientIcon from '../../assets/img/Clients.svg';
import SettingIcon from '../../assets/img/setting.svg';
import { Context as AuthContext } from "../../context/authContext/authContext";
const Department = () => {
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
  const [clientType, setClientType] = useState([
    { stage: "intiate", id: 0 },
    { stage: "no response", id: 1 },
    { stage: "irrelevant", id: 2 },
    { stage: "inter-mediate", id: 3 },
    { stage: "confirm", id: 4 },
  ]);

  const [accessControl, setAccessControl] = useState({
    clientControl: false,
    client: {
      // viewClient:false,
      editClient: false,
      deleteClient: false,
      accessClient: false,
      clientStage: null
    },
    staffControl: false,
    staff: {
      editStaff: false,
      deleteStaff: false,
      accessStaff: false

    },
    settingControl: false,
    setting: {
      viewDepartment: false,
      editDepartment: false,
      deleteDepartment: false,
      viewProduct: false,
      editProduct: false,
      accessSetting: false,
      deleteProduct: false
    }
  })
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar);
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar).state;

  useEffect(() => {
    getUserPermissions(
      parseInt(window.location.pathname.split("/").pop()), (res) => {
        let staffPermission = res?.data?.permissions
        setAccessControl(
          {
            ...accessControl,
            clientControl: staffPermission?.clientMenu,
            staffControl: staffPermission?.staffMenu,
            settingControl: staffPermission?.settingMenu,
            client: { ...accessControl.client, editClient: staffPermission?.editClient, deleteClient: staffPermission?.deleteClient, accessClient: staffPermission?.accessClient, clientStage: staffPermission?.clientStageAccess },
            staff: { ...accessControl.staff, editStaff: staffPermission?.editStaff, deleteStaff: staffPermission?.deleteStaff, accessStaff: staffPermission?.accessStaff },
            setting: { ...accessControl.setting, viewDepartment: staffPermission?.viewDepartment, editDepartment: staffPermission?.editDepartment, deleteDepartment: staffPermission?.deleteDepartment, viewProduct: staffPermission?.viewProduct, editProduct: staffPermission?.editProduct, deleteProduct: staffPermission?.deleteProduct, accessSetting: staffPermission?.accessSetting },

          })
      }, (err) => {
        //debugger;
      })
  }, [])
  const handleUserPermissions = () => {
    let userPermission = {
      teamId: parseInt(window.location.pathname.split("/").pop()),
      clientMenu: accessControl?.clientControl,
      editClient: accessControl?.client?.editClient,
      deleteClient: accessControl?.client?.deleteClient,
      staffMenu: accessControl?.staffControl,
      editStaff: accessControl?.staff?.editStaff,
      deleteStaff: accessControl?.staff?.deleteStaff,
      settingMenu: accessControl?.settingControl,
      viewDepartment: accessControl?.setting?.viewDepartment,
      editDepartment: accessControl?.setting?.editDepartment,
      deleteDepartment: accessControl?.setting?.deleteDepartment,
      viewProduct: accessControl?.setting?.viewProduct,
      editProduct: accessControl?.setting?.editProduct,
      deleteProduct: accessControl?.setting?.deleteProduct,
      accessClient: accessControl?.client.accessClient,
      accessStaff: accessControl?.staff.accessStaff,
      accessSetting: accessControl?.setting.accessSetting,
      clientStageAccess: accessControl?.client?.clientStage,
    }
    //debugger
    UpdatePermission(userPermission, (res) => {
      setSuccessSnackbar({ ...successSnackbar, status: true, message: res.data.message })
      //debugger
    }, (err) => {
      setErrorSnackbar({ ...errorSnackbar, status: true, message: err.response.data.error })
    })
  }
  const handleClose = () => {
    setJobRoleDialogControl(false);
    setDeleteJobRoleDialogControl({ ...deleteJobRoleDialogControl, status: false });
    setDeleteDepartmentControl({ ...deleteDepartmentDialogControl, status: false });
    setAddEditDepartmentDialogControl(false);
    setEditJobRoleDialogControl({ ...editJobRoleDialogControl, status: false });
  };
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
      <Box className="Sales_section mt-3">
        <Box className="sales_header_section">
          <Typography variant="h5">{jobRoleList.name}</Typography>
          <Box>
            {permissions?.editDepartment && <EditRoundedIcon
              onClick={() => {
                setAddEditDepartmentDialogControl({ ...addEditDepartmentDialogControl, id: jobRoleList.departmentId, status: true, departmentName: jobRoleList.name });
              }}
              className="edit_icon_profile"
            />}
            {permissions?.deleteDepartment && < DeleteRoundedIcon
              onClick={() => {
                setDeleteDepartmentControl({ ...deleteDepartmentDialogControl, status: true, id: jobRoleList.departmentId });
              }}
              className="edit_icon_profile"
            />}
          </Box>
        </Box>
        <Divider sx={{ width: "95%", margin: "0 auto" }} />
        {/* <div className="bg-body p-4">
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
                      <Button variant="contained" className="attendance_button">View</Button>
                      {permissions?.editDepartment && <EditRoundedIcon
                        onClick={() => {
                          setEditJobRoleDialogControl({
                            ...editJobRoleDialogControl, status: true,
                            departmentId: jobRoleList.departmentId,
                            name: data.name,
                            description: data.description, roleId: data.id
                          })
                        }}
                        className="edit_icon_profile" />}
                      <Button className="btn-outlined">Edit</Button>
                      <Button
                        className="btn-outlined"
                        onClick={() => {
                          setDeleteJobRoleDialogControl(true);
                        }}
                      >
                        Delete
                      </Button>
                      {permissions?.editDepartment && <DeleteRoundedIcon
                        onClick={() => {
                          setDeleteJobRoleDialogControl({ ...deleteJobRoleDialogControl, status: true, id: data.id });
                        }}
                        className="edit_icon_profile"
                      />}
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
        </div> */}
        <Box className="bg-body p-4">
          <Box className="post_detail">
            <Box className="post_name">
              <Typography variant="span">Senior Post</Typography>
              <Typography variant="span">Sr. Sales Person</Typography>
            </Box>
            <Box className="post_description">
              <Typography variant="span">Post Description</Typography>
              <Typography variant="span">Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document
                or a typefacewithout relying on meaningful content.</Typography>
            </Box>
          </Box>
          <Box className="check_in_time">
            <Typography variant="span">Check in Time: 8:30Am</Typography>
            <EditRoundedIcon sx={{ color: "#2E3591" }} />
          </Box>
          <div>
            <Box className="row accessMenus_checkbox">
              <Box className="col-md-12">
                <Typography variant="span">Select the menu you want to give access to.</Typography>
              </Box>
              {permissions.accessClient &&
                <Box className="d-flex col-md-3 align-items-center justify-content-between row access_checkbox">
                  <Box className="col-md-10 ">
                    <img style={{ marginRight: "5px" }} src={ClientIcon} alt="" />
                    <Typography variant="span">Clients</Typography>
                  </Box>
                  <Box className="col-md-2 ">
                    <FormControlLabel control={<Checkbox className="check_box_color" checked={accessControl.clientControl}
                      onChange={(e) => {
                        if (e.target.checked === false) {
                          setAccessControl({
                            ...accessControl, client: {
                              ...accessControl.client, editClient: false,
                              deleteClient: false, accessClient: false
                            }, clientControl: e.target.checked
                          })
                        }
                        else {
                          setAccessControl({ ...accessControl, clientControl: e.target.checked });
                        }
                      }} />} />
                  </Box>
                </Box>}
              <Box className="col-md-1"></Box>
              {permissions.accessStaff &&
                <Box className="d-flex col-md-3 align-items-center justify-content-between row access_checkbox">
                  <Box className="col-md-10 ">
                    <img style={{ marginRight: "5px" }} src={StaffIcon} alt="" />
                    <Typography variant="span">Staff</Typography>
                  </Box>
                  <Box className="col-md-2 ">
                    <FormControlLabel control={<Checkbox className="check_box_color" checked={accessControl.staffControl}
                      onChange={(e) => {
                        if (e.target.checked === false) {
                          setAccessControl({
                            ...accessControl, staff: {
                              ...accessControl.staff, editStaff: false,
                              deleteStaff: false, accessStaff: false
                            }, staffControl: e.target.checked
                          });
                        }
                        else {
                          setAccessControl({ ...accessControl, staffControl: e.target.checked });
                        }
                      }} />} />
                  </Box>
                </Box>}
              <Box className="col-md-1"></Box>
              {permissions.accessSetting &&
                <Box className="d-flex col-md-3 align-items-center justify-content-between row access_checkbox">
                  <Box className="col-md-10 ">
                    <img style={{ marginRight: "5px" }} src={SettingIcon} alt="" />
                    <Typography variant="span">Setting</Typography>
                  </Box>
                  <Box className="col-md-2 ">
                    <FormControlLabel control={<Checkbox className="check_box_color" checked={accessControl.settingControl}
                      onChange={(e) => {
                        if (e.target.checked === false) {
                          setAccessControl({
                            ...accessControl,
                            setting: {
                              ...accessControl.setting,
                              viewDepartment: false,
                              editDepartment: false,
                              deleteDepartment: false,
                              viewProduct: false,
                              editProduct: false,
                              deleteProduct: false,
                              accessSetting: false
                            }, settingControl: e.target.checked
                          });
                        }
                        else {
                          setAccessControl({ ...accessControl, settingControl: e.target.checked });
                        }
                      }} />} />
                  </Box>
                </Box>}
              <Box className="col-md-1"></Box>
            </Box>
            <Box className="row access_control">
              {(accessControl.clientControl && permissions.accessClient) && <Box className="access_control_box p-2  col-md-5 mb-2">
                <Typography className="heading_access_box" variant="span">Clients Control</Typography>
                <Box className="row  ">
                  <Box className="d-flex col-md-8 align-items-center">
                    <Typography variant="span">Can Edit a Client Detail ? </Typography>
                  </Box>
                  <Checkbox
                    disableRipple
                    className="col-md-4 check_box_color"
                    checked={accessControl?.client?.editClient}
                    onChange={(e) => {
                      setAccessControl({ ...accessControl, client: { ...accessControl.client, editClient: e.target.checked } });
                    }}
                  />
                </Box>
                <Box className="row">
                  <Box className="d-flex col-md-8 align-items-center">
                    <Typography variant="span">Can Delete a Client Detail ? </Typography>
                  </Box>
                  <Checkbox
                    disableRipple
                    className="col-md-4 check_box_color"
                    checked={accessControl?.client?.deleteClient}
                    onChange={(e) => {
                      setAccessControl({ ...accessControl, client: { ...accessControl.client, deleteClient: e.target.checked } });
                    }}
                  />
                </Box>
                <Box className="row">
                  <Box className="d-flex col-md-8 align-items-center">
                    <Typography variant="span">Give Access to Client  ? </Typography>
                  </Box>
                  <Checkbox
                    disableRipple
                    className="col-md-4 check_box_color"
                    checked={accessControl?.client?.accessClient}
                    onChange={(e) => {
                      setAccessControl({ ...accessControl, client: { ...accessControl.client, accessClient: e.target.checked } });
                    }}
                  />
                </Box>
                <Box>
                  <Box className="row col-md-12">
                    <Autocomplete
                      className="align-items-center d-flex justify-content-center me-2 w-100"
                      options={clientType}
                      value={clientType[accessControl?.client?.clientStage]}
                      onChange={(e, value) => {
                        console.log(value);
                        setAccessControl({ ...accessControl, client: { ...accessControl.client, clientStage: value?.id } });
                      }}
                      getOptionLabel={(option) => option.stage}
                      // getOptionDisabled={(option) =>
                      //   option.stage === clientType[1].stage
                      // }
                      renderInput={(params) => (
                        <TextField className="client_type_select" {...params} placeholder="Select Client Type" />
                      )}
                    />
                  </Box>
                </Box>
              </Box>}
              {/* <Box className="col-md-2"></Box> */}
              {(accessControl?.staffControl && permissions.accessStaff) && <Box className="access_control_box p-2 col-md-5 mb-2">
                <Typography className="heading_access_box" variant="span">Staff Control</Typography>
                <Box className="row">
                  <Box className="d-flex col-md-8 align-items-center">
                    <Typography variant="span">Can Edit a Staff Detail ? </Typography>
                  </Box>
                  <Checkbox
                    disableRipple
                    className="col-md-4 check_box_color"
                    checked={accessControl?.staff?.editStaff}
                    onChange={(e) => {
                      setAccessControl({ ...accessControl, staff: { ...accessControl.staff, editStaff: e.target.checked } });
                    }}
                  />
                </Box>
                <Box className="row">
                  <Box className="d-flex col-md-8 align-items-center">
                    <Typography variant="span">Can Delete a Staff Detail ? </Typography>
                  </Box>
                  <Checkbox
                    disableRipple
                    className="col-md-4 check_box_color"
                    checked={accessControl?.staff?.deleteStaff}
                    onChange={(e) => {
                      setAccessControl({ ...accessControl, staff: { ...accessControl.staff, deleteStaff: e.target.checked } });
                    }}
                  />
                </Box>
                {permissions.accessStaff && <Box className="row">
                  <Box className="d-flex col-md-8 align-items-center">
                    <Typography variant="span">Give Access to Staff  ? </Typography>
                  </Box>
                  <Checkbox
                    disableRipple
                    className="col-md-4 check_box_color"
                    checked={accessControl?.staff?.accessStaff}
                    onChange={(e) => {
                      setAccessControl({ ...accessControl, staff: { ...accessControl.staff, accessStaff: e.target.checked } });
                    }}
                  />
                </Box>}
              </Box>}
              {
                (accessControl.settingControl && permissions.accessSetting) && <Box className="access_control_box p-2 mb-2 col-md-5">
                  <Typography className="heading_access_box" variant="span">Setting Control</Typography>
                  <Box className="row">
                    <Box className="d-flex col-md-8 align-items-center">
                      <Typography variant="span">Can View Department ? </Typography>
                    </Box>
                    <Checkbox
                      disableRipple
                      className="col-md-4 check_box_color"
                      checked={accessControl?.setting?.viewDepartment}
                      onChange={(e) => {
                        setAccessControl({ ...accessControl, setting: { ...accessControl.setting, viewDepartment: e.target.checked } });
                      }}
                    />
                  </Box>
                  <Box className="row">
                    <Box className="d-flex col-md-8 align-items-center">
                      <Typography variant="span">Can Edit Department ? </Typography>
                    </Box>
                    <Checkbox
                      disableRipple
                      className="col-md-4 check_box_color"
                      checked={accessControl?.setting?.editDepartment}
                      onChange={(e) => {
                        setAccessControl({ ...accessControl, setting: { ...accessControl.setting, editDepartment: e.target.checked } });
                      }}
                    />
                  </Box>

                  <Box className="row">
                    <Box className="d-flex col-md-8 align-items-center">
                      <Typography variant="span">Can Delete Department ? </Typography>
                    </Box>
                    <Checkbox
                      disableRipple
                      className="col-md-4 check_box_color"
                      checked={accessControl?.setting?.deleteDepartment}
                      onChange={(e) => {
                        setAccessControl({ ...accessControl, setting: { ...accessControl.setting, deleteDepartment: e.target.checked } });
                      }}
                    />
                  </Box>
                  <Box className="row">
                    <Box className="d-flex col-md-8 align-items-center">
                      <Typography variant="span">Can View Product ? </Typography>
                    </Box>
                    <Checkbox
                      disableRipple
                      className="col-md-4 check_box_color"
                      checked={accessControl?.setting?.viewProduct}
                      onChange={(e) => {
                        setAccessControl({ ...accessControl, setting: { ...accessControl.setting, viewProduct: e.target.checked } });
                      }}
                    />
                  </Box>
                  <Box className="row">
                    <Box className="d-flex col-md-8 align-items-center">
                      <Typography variant="span">Can Edit Product ? </Typography>
                    </Box>
                    <Checkbox
                      disableRipple
                      className="col-md-4 check_box_color"
                      checked={accessControl?.setting?.editProduct}
                      onChange={(e) => {
                        setAccessControl({ ...accessControl, setting: { ...accessControl.setting, editProduct: e.target.checked } });
                      }}
                    />
                  </Box>
                  <Box className="row">
                    <Box className="d-flex col-md-8 align-items-center">
                      <Typography variant="span">Can Delete Product ? </Typography>
                    </Box>
                    <Checkbox
                      disableRipple
                      className="col-md-4 check_box_color"
                      checked={accessControl?.setting?.deleteProduct}
                      onChange={(e) => {
                        setAccessControl({ ...accessControl, setting: { ...accessControl.setting, deleteProduct: e.target.checked } });
                      }}
                    />
                  </Box>
                  {permissions.accessSetting && <Box className="row">
                    <Box className="d-flex col-md-8 align-items-center">
                      <Typography variant="span">Give Access to Setting  ? </Typography>
                    </Box>
                    <Checkbox
                      disableRipple
                      className="col-md-4 check_box_color"
                      checked={accessControl?.setting?.accessSetting}
                      onChange={(e) => {
                        setAccessControl({ ...accessControl, setting: { ...accessControl.setting, accessSetting: e.target.checked } });
                      }}
                    />
                  </Box>}
                </Box>
              }

            </Box>
            <Button variant="contained" onClick={handleUserPermissions}>Save</Button>
          </div>
        </Box>
        <JobRoleDialog
          jobRoleList={jobRoleList}
          jobRoleDialogControl={jobRoleDialogControl}
          handleClose={handleClose}
        />
        {editJobRoleDialogControl.status === true && <EditJobRoleDialog
          editJobRoleDialogControl={editJobRoleDialogControl}
          handleClose={handleClose}
        />}
        <DeleteJobRoleDialog
          deleteJobRoleDialogControl={deleteJobRoleDialogControl}
          handleClose={handleClose}
        />
        <DeleteDepartmentDialog
          deleteDepartmentDialogControl={deleteDepartmentDialogControl}
          handleClose={handleClose}
        />
        {addEditDepartmentDialogControl.status === true && < AddEditDepartmentDialog
          addEditDepartmentDialogControl={addEditDepartmentDialogControl}
          handleClose={handleClose}
        />
        }
      </Box>
    </>
  );
};

export default Department;
