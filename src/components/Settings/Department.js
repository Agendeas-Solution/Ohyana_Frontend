import React, { useEffect, useState, useContext } from 'react'
import {
  Box,
  Typography,
  Divider,
  Button,
  FormControlLabel,
  Autocomplete,
  TextField,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  Modal,
} from '@mui/material'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import './index.css'
import { GetSingleRole } from '../../services/apiservices/adminprofile'
import {
  UpdatePermission,
  getUserPermissions,
} from '../../services/apiservices/adminprofile'
import { Context as ContextSnackbar } from '../../context/pageContext'
import StaffIcon from '../../assets/img/staff.svg'
import StatisticsIcon from '../../assets/img/statistics.svg'
import ClientIcon from '../../assets/img/Clients.svg'
import SettingIcon from '../../assets/img/setting.svg'
import { Context as AuthContext } from '../../context/authContext/authContext'
const DeleteJobRoleDialog = React.lazy(() => import('./DeleteJobRoleDialog'))
const DeleteDepartmentDialog = React.lazy(() =>
  import('./DeleteDepartmentDialog'),
)
const JobRoleDialog = React.lazy(() => import('./JobRoleDialog'))
const AddEditDepartmentDialog = React.lazy(() =>
  import('./AddEditDepartmentDialog'),
)
const EditJobRoleDialog = React.lazy(() => import('./EditJobRoleDialog'))

const Department = () => {
  const { permissions } = useContext(AuthContext).state
  const [jobRoleDialogControl, setJobRoleDialogControl] = useState(false)
  const [openTime, setOpenTime] = useState(true)
  const [openOutTime, setOpenOutTime] = useState(true)
  const [open, setOpen] = useState(false)
  const [deleteJobRoleDialogControl, setDeleteJobRoleDialogControl] = useState({
    status: false,
    id: null,
  })
  const [deleteDepartmentDialogControl, setDeleteDepartmentControl] = useState({
    status: false,
    id: null,
  })
  const [editJobRoleDialogControl, setEditJobRoleDialogControl] = useState({
    status: false,
    departmentId: null,
    name: '',
    description: '',
    roleId: null,
  })
  const [addEditDepartmentDialogControl, setAddEditDepartmentDialogControl] =
    useState({
      status: false,
      id: null,
      departmentName: '',
    })
  const [jobRoleList, setJobRoleList] = useState({
    name: '',
    senior: [],
    departmentId: null,
  })
  const [clientType, setClientType] = useState([
    { stage: 'intiate', id: 0 },
    { stage: 'no response', id: 1 },
    { stage: 'irrelevant', id: 2 },
    { stage: 'inter-mediate', id: 3 },
    { stage: 'confirm', id: 4 },
  ])

  const [accessControl, setAccessControl] = useState({
    clientControl: false,
    client: {
      editClient: false,
      deleteClient: false,
      accessClient: false,
      clientStage: null,
    },
    staffControl: false,
    staff: {
      editStaff: false,
      deleteStaff: false,
      accessStaff: false,
    },
    settingControl: false,
    setting: {
      viewDepartment: false,
      editDepartment: false,
      deleteDepartment: false,
      viewProduct: false,
      editProduct: false,
      accessSetting: false,
      deleteProduct: false,
    },
  })
  const [expenseManagement, setExpenseManagement] = useState({
    travelChecked: false,
    travelAmount: 0,
    foodChecked: false,
    foodAmount: 0,
    hotelChecked: false,
    hotelAmount: 0,
  })
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar).state
  const [expensePolicy, setExpensePolicy] = useState();
  useEffect(() => {
    getUserPermissions(
      parseInt(window.location.pathname.split('/').pop()),
      res => {
        let staffPermission = res?.data?.permissions
        setAccessControl({
          ...accessControl,
          clientControl: staffPermission?.clientMenu,
          staffControl: staffPermission?.staffMenu,
          settingControl: staffPermission?.settingMenu,
          client: {
            ...accessControl.client,
            editClient: staffPermission?.editClient,
            deleteClient: staffPermission?.deleteClient,
            accessClient: staffPermission?.accessClient,
            clientStage: staffPermission?.clientStageAccess,
          },
          staff: {
            ...accessControl.staff,
            editStaff: staffPermission?.editStaff,
            deleteStaff: staffPermission?.deleteStaff,
            accessStaff: staffPermission?.accessStaff,
          },
          setting: {
            ...accessControl.setting,
            viewDepartment: staffPermission?.viewDepartment,
            editDepartment: staffPermission?.editDepartment,
            deleteDepartment: staffPermission?.deleteDepartment,
            viewProduct: staffPermission?.viewProduct,
            editProduct: staffPermission?.editProduct,
            deleteProduct: staffPermission?.deleteProduct,
            accessSetting: staffPermission?.accessSetting,
          },
        })
        setExpensePolicy(res?.data?.expensePolicies);
      },
      err => { },
    )
  }, [])
  const handleUserPermissions = () => {
    let userPermission = {
      teamId: parseInt(window.location.pathname.split('/').pop()),
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

    UpdatePermission(
      userPermission,
      res => {
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.data.message,
        })
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err.response.data.error,
        })
      },
    )
  }
  const handleClose = () => {
    setJobRoleDialogControl(false)
    setDeleteJobRoleDialogControl({
      ...deleteJobRoleDialogControl,
      status: false,
    })
    setDeleteDepartmentControl({
      ...deleteDepartmentDialogControl,
      status: false,
    })
    setAddEditDepartmentDialogControl(false)
    setEditJobRoleDialogControl({ ...editJobRoleDialogControl, status: false })
  }
  useEffect(() => {
    let path = window.location.pathname
    console.log('Printing Path of ', path)
    console.log('Printing ', path.split('/').pop())
    path = path.split('/').pop()
    GetSingleRole(
      parseInt(path),
      res => {
        if (res.success) {
          setJobRoleList({
            ...jobRoleList,
            departmentId: res.data.departmentId,
            name: res.data.name,
            senior: res.data.senior,
          })
        }
      },
      err => {
        console.log(err)
      },
    )
  }, [
    deleteJobRoleDialogControl.status,
    jobRoleDialogControl,
    editJobRoleDialogControl.status,
  ])

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  }

  return (
    <>
      <Box className="main_section mt-3">
        <Box className="sales_header_section">
          <Typography variant="h5">{jobRoleList.name}</Typography>
          <Box>
            {permissions?.editDepartment && (
              <EditRoundedIcon
                sx={{ margin: 2 }}
                onClick={() => {
                  setAddEditDepartmentDialogControl({
                    ...addEditDepartmentDialogControl,
                    id: jobRoleList.departmentId,
                    status: true,
                    departmentName: jobRoleList.name,
                  })
                }}
                className="edit_icon_profile "
              />
            )}
            {permissions?.deleteDepartment && (
              <DeleteRoundedIcon
                onClick={() => {
                  setDeleteDepartmentControl({
                    ...deleteDepartmentDialogControl,
                    status: true,
                    id: jobRoleList.departmentId,
                  })
                }}
                className="edit_icon_profile"
              />
            )}
          </Box>
        </Box>
        <Divider sx={{ width: '95%', margin: '0 auto' }} />
        <Box className="bg-body p-4">
          <Box className="mb-3 row post_detail">
            <Box className="post_name">
              <Typography
                sx={{ color: '#8E8E8E' }}
                className="p-1"
                variant="span"
              >
                Senior Post
              </Typography>
              <Typography className="p-1" variant="span">
                {jobRoleList?.senior?.name}
              </Typography>
            </Box>
            <Box className="post_description">
              <Typography
                sx={{ color: '#8E8E8E' }}
                className="p-1"
                variant="span"
              >
                Post Description
              </Typography>
              <Typography className="p-1" variant="span">
              {jobRoleList?.senior?.description}

              </Typography>
            </Box>
          </Box>

          <Box className="mb-1 row">
            <FormControl
              sx={{ width: '32rem', marginRight: 5 }}
              className="mb-3"
            >
              <InputLabel id="demo-simple-select-label">
                Office Time Management
              </InputLabel>

              <Select
                label="Office Time Management"
                onChange={() => console.log('Clicking on Drop down options')}
              >
                <Box sx={{ padding: 1 }}>
                  <MenuItem sx={{ paddingTop: '19px', display: 'inline' }}>
                    Clock In
                  </MenuItem>
                  <TextField
                    sx={{ display: 'inline', marginLeft: '18rem' }}
                    className="set_date_time_bg"
                    type="time"
                  />
                  <Button className="p-2 m-1" variant="contained">
                    Save
                  </Button>
                  {/* <Button sx={{ marginLeft: "16rem" }} onClick={handleOpen}>
                      Set In Time
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleCloseTime}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <StaticTimePicker orientation="landscape" />
                        </LocalizationProvider>
                      </Box>
                    </Modal> */}
                </Box>
                <Box sx={{ padding: 1 }}>
                  {/* <MenuItem sx={{ display: "inline" }}>Clock Out</MenuItem> */}
                  <MenuItem sx={{ display: 'inline' }}>Clock Out</MenuItem>
                  <TextField
                    sx={{ display: 'inline', marginLeft: '17rem' }}
                    className="set_date_time_bg"
                    type="time"
                  />
                  <Button className="p-2 m-1" variant="contained">
                    Save
                  </Button>
                </Box>
              </Select>
            </FormControl>
            <FormControl sx={{ width: '31rem' }} className="mb-3 ">
              <InputLabel id="demo-simple-select-label">
                Expense Management
              </InputLabel>
              <Select id="demo-multiple-checkbox-label">
                <FormGroup className="p-2">

                  {expensePolicy && expensePolicy.map((data) =>
                    <Box sx={{ margin: '5px' }}>
                      <FormControlLabel
                        sx={{ display: 'inline' }}
                        control={
                          <Checkbox
                            checked={expenseManagement?.travelChecked}
                            className="check_box_color"
                            onChange={e => {
                              setExpenseManagement({
                                ...expenseManagement,
                                travelChecked: e.target.checked
                              })
                            }}
                          />
                        }
                        label={data?.name}
                      />
                      <TextField
                        sx={{ display: 'inline', marginLeft: '17rem' }}
                        placeholder="Max Amount"
                        type='number'
                        value={expenseManagement?.travelAmount}
                        onChange={(e) => setExpenseManagement({ ...expenseManagement, travelAmount: e.target.value })}
                      />
                    </Box>
                  )

                  }
                 
                  <Button disabled={!expenseManagement?.hotelChecked} className="p-2 m-1" variant={expenseManagement?.hotelChecked ? "contained" : "outlined"}>
                    Save
                  </Button>
                </FormGroup>
              </Select>
            </FormControl>
          </Box>

          <Box className="mb-3 row accessMenus_checkbox">
            <Typography variant="span">
              Select the menu you want to give access to.
            </Typography>
            {permissions.accessClient && (
              <Box
                sx={{ marginRight: '30px' }}
                className="d-flex m-2 align-items-center justify-content-between row access_checkbox"
              >
                <Box className="col-md-10">
                  <img style={{ marginRight: '1px' }} src={ClientIcon} alt="" />
                  <Typography sx={{ paddingLeft: '8px' }} variant="span">
                    Clients
                  </Typography>
                </Box>
                <Box className="col-md-2">
                  <FormControlLabel
                    control={
                      <Checkbox
                        className="check_box_color"
                        checked={accessControl.clientControl}
                        onChange={e => {
                          if (e.target.checked === false) {
                            setAccessControl({
                              ...accessControl,
                              client: {
                                ...accessControl.client,
                                editClient: false,
                                deleteClient: false,
                                accessClient: false,
                              },
                              clientControl: e.target.checked,
                            })
                          } else {
                            setAccessControl({
                              ...accessControl,
                              clientControl: e.target.checked,
                            })
                          }
                        }}
                      />
                    }
                  />
                </Box>
              </Box>
            )}
            {/* <Box className="col-md-1"></Box> */}
            {permissions.accessStaff && (
              <Box className="d-flex m-2 align-items-center justify-content-between row access_checkbox">
                <Box className="col-md-10 ">
                  <img style={{ marginRight: '1px' }} src={StaffIcon} alt="" />
                  <Typography sx={{ paddingLeft: '8px' }} variant="span">
                    Staff
                  </Typography>
                </Box>
                <Box className="col-md-2 ">
                  <FormControlLabel
                    control={
                      <Checkbox
                        className="check_box_color"
                        checked={accessControl.staffControl}
                        onChange={e => {
                          if (e.target.checked === false) {
                            setAccessControl({
                              ...accessControl,
                              staff: {
                                ...accessControl.staff,
                                editStaff: false,
                                deleteStaff: false,
                                accessStaff: false,
                              },
                              staffControl: e.target.checked,
                            })
                          } else {
                            setAccessControl({
                              ...accessControl,
                              staffControl: e.target.checked,
                            })
                          }
                        }}
                      />
                    }
                  />
                </Box>
              </Box>
            )}
            {/* <Box className="col-md-1"></Box> */}
            {permissions.accessSetting && (
              <Box className="d-flex m-2 align-items-center justify-content-between row access_checkbox">
                <Box className="col-md-10 ">
                  <img
                    style={{ marginRight: '1px' }}
                    src={SettingIcon}
                    alt=""
                  />
                  <Typography sx={{ paddingLeft: '8px' }} variant="span">
                    Setting
                  </Typography>
                </Box>
                <Box className="col-md-2 ">
                  <FormControlLabel
                    control={
                      <Checkbox
                        className="check_box_color"
                        checked={accessControl.settingControl}
                        onChange={e => {
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
                                accessSetting: false,
                              },
                              settingControl: e.target.checked,
                            })
                          } else {
                            setAccessControl({
                              ...accessControl,
                              settingControl: e.target.checked,
                            })
                          }
                        }}
                      />
                    }
                  />
                </Box>
              </Box>
            )}
            {/* <Box className="col-md-1"></Box> */}
            {permissions.accessSetting && (
              <Box className="d-flex m-2 align-items-center justify-content-between row access_checkbox">
                <Box className="col-md-10">
                  <img
                    style={{ marginRight: '1px' }}
                    src={StatisticsIcon}
                    alt=""
                  />
                  <Typography sx={{ paddingLeft: '3px' }} variant="span">
                    Statistics
                  </Typography>
                </Box>
                <Box className="col-md-2">
                  <FormControlLabel
                    control={
                      <Checkbox
                        className="check_box_color"
                        checked={accessControl.settingControl}
                        onChange={e => {
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
                                accessSetting: false,
                              },
                              settingControl: e.target.checked,
                            })
                          } else {
                            setAccessControl({
                              ...accessControl,
                              settingControl: e.target.checked,
                            })
                          }
                        }}
                      />
                    }
                  />
                </Box>
              </Box>
            )}
            {/* <Box className="col-md-1"></Box> */}
          </Box>
          <Box className="row access_control">
            {accessControl.clientControl && permissions.accessClient && (
              <Box className="access_control_box p-2  col-md-5 mb-2">
                <Typography className="heading_access_box" variant="span">
                  Clients Control
                </Typography>
                <Box className="row  ">
                  <Box className="d-flex col-md-8 align-items-center">
                    <Typography variant="span">
                      Can Edit a Client Detail ?{' '}
                    </Typography>
                  </Box>
                  <Checkbox
                    disableRipple
                    className="col-md-4 check_box_color"
                    checked={accessControl?.client?.editClient}
                    onChange={e => {
                      setAccessControl({
                        ...accessControl,
                        client: {
                          ...accessControl.client,
                          editClient: e.target.checked,
                        },
                      })
                    }}
                  />
                </Box>
                <Box className="row">
                  <Box className="d-flex col-md-8 align-items-center">
                    <Typography variant="span">
                      Can Delete a Client Detail ?{' '}
                    </Typography>
                  </Box>
                  <Checkbox
                    disableRipple
                    className="col-md-4 check_box_color"
                    checked={accessControl?.client?.deleteClient}
                    onChange={e => {
                      setAccessControl({
                        ...accessControl,
                        client: {
                          ...accessControl.client,
                          deleteClient: e.target.checked,
                        },
                      })
                    }}
                  />
                </Box>
                <Box className="row">
                  <Box className="d-flex col-md-8 align-items-center">
                    <Typography variant="span">
                      Give Access to Client ?{' '}
                    </Typography>
                  </Box>
                  <Checkbox
                    disableRipple
                    className="col-md-4 check_box_color"
                    checked={accessControl?.client?.accessClient}
                    onChange={e => {
                      setAccessControl({
                        ...accessControl,
                        client: {
                          ...accessControl.client,
                          accessClient: e.target.checked,
                        },
                      })
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
                        console.log(value)
                        setAccessControl({
                          ...accessControl,
                          client: {
                            ...accessControl.client,
                            clientStage: value?.id,
                          },
                        })
                      }}
                      getOptionLabel={option => option.stage}
                      renderInput={params => (
                        <TextField
                          className="client_type_select"
                          {...params}
                          placeholder="Select Client Type"
                        />
                      )}
                    />
                  </Box>
                </Box>
              </Box>
            )}
            {/* <Box className="col-md-2"></Box> */}
            {accessControl?.staffControl && permissions.accessStaff && (
              <Box className="access_control_box p-2 col-md-5 mb-2">
                <Typography className="heading_access_box" variant="span">
                  Staff Control
                </Typography>
                <Box className="row">
                  <Box className="d-flex col-md-8 align-items-center">
                    <Typography variant="span">
                      Can Edit a Staff Detail ?{' '}
                    </Typography>
                  </Box>
                  <Checkbox
                    disableRipple
                    className="col-md-4 check_box_color"
                    checked={accessControl?.staff?.editStaff}
                    onChange={e => {
                      setAccessControl({
                        ...accessControl,
                        staff: {
                          ...accessControl.staff,
                          editStaff: e.target.checked,
                        },
                      })
                    }}
                  />
                </Box>
                <Box className="row">
                  <Box className="d-flex col-md-8 align-items-center">
                    <Typography variant="span">
                      Can Delete a Staff Detail ?{' '}
                    </Typography>
                  </Box>
                  <Checkbox
                    disableRipple
                    className="col-md-4 check_box_color"
                    checked={accessControl?.staff?.deleteStaff}
                    onChange={e => {
                      setAccessControl({
                        ...accessControl,
                        staff: {
                          ...accessControl.staff,
                          deleteStaff: e.target.checked,
                        },
                      })
                    }}
                  />
                </Box>
                {permissions.accessStaff && (
                  <Box className="row">
                    <Box className="d-flex col-md-8 align-items-center">
                      <Typography variant="span">
                        Give Access to Staff ?{' '}
                      </Typography>
                    </Box>
                    <Checkbox
                      disableRipple
                      className="col-md-4 check_box_color"
                      checked={accessControl?.staff?.accessStaff}
                      onChange={e => {
                        setAccessControl({
                          ...accessControl,
                          staff: {
                            ...accessControl.staff,
                            accessStaff: e.target.checked,
                          },
                        })
                      }}
                    />
                  </Box>
                )}
              </Box>
            )}
            {accessControl.settingControl && permissions.accessSetting && (
              <Box className="access_control_box p-2 mb-2 col-md-5">
                <Typography className="heading_access_box" variant="span">
                  Setting Control
                </Typography>
                <Box className="row">
                  <Box className="d-flex col-md-8 align-items-center">
                    <Typography variant="span">
                      Can View Department ?{' '}
                    </Typography>
                  </Box>
                  <Checkbox
                    disableRipple
                    className="col-md-4 check_box_color"
                    checked={accessControl?.setting?.viewDepartment}
                    onChange={e => {
                      setAccessControl({
                        ...accessControl,
                        setting: {
                          ...accessControl.setting,
                          viewDepartment: e.target.checked,
                        },
                      })
                    }}
                  />
                </Box>
                <Box className="row">
                  <Box className="d-flex col-md-8 align-items-center">
                    <Typography variant="span">
                      Can Edit Department ?{' '}
                    </Typography>
                  </Box>
                  <Checkbox
                    disableRipple
                    className="col-md-4 check_box_color"
                    checked={accessControl?.setting?.editDepartment}
                    onChange={e => {
                      setAccessControl({
                        ...accessControl,
                        setting: {
                          ...accessControl.setting,
                          editDepartment: e.target.checked,
                        },
                      })
                    }}
                  />
                </Box>

                <Box className="row">
                  <Box className="d-flex col-md-8 align-items-center">
                    <Typography variant="span">
                      Can Delete Department ?{' '}
                    </Typography>
                  </Box>
                  <Checkbox
                    disableRipple
                    className="col-md-4 check_box_color"
                    checked={accessControl?.setting?.deleteDepartment}
                    onChange={e => {
                      setAccessControl({
                        ...accessControl,
                        setting: {
                          ...accessControl.setting,
                          deleteDepartment: e.target.checked,
                        },
                      })
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
                    onChange={e => {
                      setAccessControl({
                        ...accessControl,
                        setting: {
                          ...accessControl.setting,
                          viewProduct: e.target.checked,
                        },
                      })
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
                    onChange={e => {
                      setAccessControl({
                        ...accessControl,
                        setting: {
                          ...accessControl.setting,
                          editProduct: e.target.checked,
                        },
                      })
                    }}
                  />
                </Box>
                <Box className="row">
                  <Box className="d-flex col-md-8 align-items-center">
                    <Typography variant="span">
                      Can Delete Product ?{' '}
                    </Typography>
                  </Box>
                  <Checkbox
                    disableRipple
                    className="col-md-4 check_box_color"
                    checked={accessControl?.setting?.deleteProduct}
                    onChange={e => {
                      setAccessControl({
                        ...accessControl,
                        setting: {
                          ...accessControl.setting,
                          deleteProduct: e.target.checked,
                        },
                      })
                    }}
                  />
                </Box>
                {permissions.accessSetting && (
                  <Box className="row">
                    <Box className="d-flex col-md-8 align-items-center">
                      <Typography variant="span">
                        Give Access to Setting ?{' '}
                      </Typography>
                    </Box>
                    <Checkbox
                      disableRipple
                      className="col-md-4 check_box_color"
                      checked={accessControl?.setting?.accessSetting}
                      onChange={e => {
                        setAccessControl({
                          ...accessControl,
                          setting: {
                            ...accessControl.setting,
                            accessSetting: e.target.checked,
                          },
                        })
                      }}
                    />
                  </Box>
                )}
              </Box>
            )}
          </Box>
          <Box className="mb-1 row">
            <Button
              sx={{ width: '15px' }}
              className="mt-2"
              variant="contained"
              onClick={handleUserPermissions}
            >
              Save
            </Button>
          </Box>
          {/* </div> */}
        </Box>
        <JobRoleDialog
          jobRoleList={jobRoleList}
          jobRoleDialogControl={jobRoleDialogControl}
          handleClose={handleClose}
        />
        {editJobRoleDialogControl.status === true && (
          <EditJobRoleDialog
            editJobRoleDialogControl={editJobRoleDialogControl}
            handleClose={handleClose}
          />
        )}
        <DeleteJobRoleDialog
          deleteJobRoleDialogControl={deleteJobRoleDialogControl}
          handleClose={handleClose}
        />
        <DeleteDepartmentDialog
          deleteDepartmentDialogControl={deleteDepartmentDialogControl}
          handleClose={handleClose}
        />
        {addEditDepartmentDialogControl.status === true && (
          <AddEditDepartmentDialog
            addEditDepartmentDialogControl={addEditDepartmentDialogControl}
            handleClose={handleClose}
          />
        )}
      </Box>
    </>
  )
}

export default Department
