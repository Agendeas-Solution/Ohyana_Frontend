import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Button, FormControlLabel, Autocomplete, TextField, Checkbox } from "@mui/material";
import { UpdatePermission, getUserPermissions } from '../../services/apiservices/adminprofile';
import { Context as ContextSnackbar } from "../../context/pageContext";
import { Context as AuthContext } from "../../context/authContext/authContext";
import StaffIcon from '../../assets/img/staff.svg'
import ClientIcon from '../../assets/img/Clients.svg';
import SettingIcon from '../../assets/img/setting.svg';
const AccessPanel = () => {
    const { permissions } = useContext(AuthContext).state
    const [clientType, setClientType] = useState([
        { stage: "intiate", id: 0 },
        { stage: "no response", id: 1 },
        {stage:"irrelevant", id: 2 },  
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
    return (
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
    )
}

export default AccessPanel