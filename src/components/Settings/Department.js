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
import {
  EditJobRole,
  GetSingleRole,
  UpdateClockInOut,
} from '../../services/apiservices/adminprofile'
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
import { CLIENT } from '../../constants/clientConstant'

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
    name: '',
    description: '',
    parentId: '',
  })
  const [addEditDepartmentDialogControl, setAddEditDepartmentDialogControl] =
    useState({
      status: false,
      id: null,
      departmentName: '',
    })
  const [jobRoleList, setJobRoleList] = useState({})
  const [clientType, setClientType] = useState(CLIENT.STAGE)

  const [accessControl, setAccessControl] = useState({
    clientControl: false,
    client: {
      viewClient: false,
      editClient: false,
      deleteClient: false,
      accessClient: false,
      clientStage: null,
    },
    staffControl: false,
    staff: {
      viewStaff: false,
      editStaff: false,
      deleteStaff: false,
      accessStaff: false,
    },
    settingControl: false,
    setting: {
      viewRole: false,
      editRole: false,
      deleteRole: false,
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
  const [expensePolicy, setExpensePolicy] = useState()
  const [expensePermissions, setExpensePermissions] = useState()
  useEffect(() => {
    jobRoleList.id &&
      getUserPermissions(
        parseInt(jobRoleList.id),
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
              viewClient: staffPermission?.viewClient,
              deleteClient: staffPermission?.deleteClient,
              accessClient: staffPermission?.accessClient,
              clientStage: staffPermission?.clientStageAccess,
            },
            staff: {
              ...accessControl.staff,
              viewStaff: staffPermission.viewStaff,
              editStaff: staffPermission?.editStaff,
              deleteStaff: staffPermission?.deleteStaff,
              accessStaff: staffPermission?.accessStaff,
            },
            setting: {
              ...accessControl.setting,
              viewRole: staffPermission?.viewRole,
              editRole: staffPermission?.editRole,
              deleteRole: staffPermission?.deleteRole,
              viewProduct: staffPermission?.viewProduct,
              editProduct: staffPermission?.editProduct,
              deleteProduct: staffPermission?.deleteProduct,
              accessSetting: staffPermission?.accessSetting,
            },
          })
          setExpensePolicy(res?.data?.expensePolicies)
          setExpensePermissions(res?.data?.expensePermissions)
        },
        err => {},
      )
  }, [jobRoleList.id])
  const handleUserPermissions = () => {
    let userPermission = {
      roleId: jobRoleList?.id,
      clientMenu: accessControl?.clientControl,
      editClient: accessControl?.client?.editClient,
      viewClient: accessControl?.client?.viewClient,
      deleteClient: accessControl?.client?.deleteClient,
      staffMenu: accessControl?.staffControl,
      viewStaff: accessControl?.staff?.viewStaff,
      editStaff: accessControl?.staff?.editStaff,
      viewStaff: accessControl?.staff?.viewStaff,
      deleteStaff: accessControl?.staff?.deleteStaff,
      settingMenu: accessControl?.settingControl,
      viewRole: accessControl?.setting?.viewRole,
      editRole: accessControl?.setting?.editRole,
      deleteRole: accessControl?.setting?.deleteRole,
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
  const handleUpdateClockInOut = () => {
    let data = {
      roleId: jobRoleList?.id,
      clockOut: jobRoleList?.clockOut,
      clockIn: jobRoleList?.clockIn,
    }
    UpdateClockInOut(
      data,
      res => {
        setSuccessSnackbar({
          ...successSnackbar,
          message: res.message,
          status: true,
        })
      },
      err => {},
    )
  }
  const handleEditJobRole = () => {
    if (
      editJobRoleDialogControl.name !== '' &&
      editJobRoleDialogControl.description !== '' &&
      editJobRoleDialogControl.parentId !== ''
    ) {
      let data = editJobRoleDialogControl
      delete data.status
      EditJobRole(
        jobRoleList.id,
        data,
        res => {
          handleClose()
          setSuccessSnackbar({
            ...successSnackbar,
            message: res.message,
            status: true,
          })
        },
        err => {},
      )
    }
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
          setJobRoleList(res.data)
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
      <Box className="main_section">
        <Box className="sales_header_section">
          <Typography variant="h5">{jobRoleList.name}</Typography>
          <Box>
            {permissions?.editRole && (
              <EditRoundedIcon
                sx={{ margin: 2 }}
                onClick={() => {
                  setEditJobRoleDialogControl({
                    ...editJobRoleDialogControl,
                    status: true,
                    name: jobRoleList.name,
                    description: jobRoleList.description,
                    parentId: jobRoleList.senior.id,
                  })
                }}
                className="edit_icon_profile "
              />
            )}
            {permissions?.deleteRole && (
              <DeleteRoundedIcon
                onClick={() => {
                  setDeleteJobRoleDialogControl({
                    ...deleteJobRoleDialogControl,
                    status: true,
                    id: jobRoleList.id,
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
                    value={jobRoleList?.clockIn}
                    onChange={e => {
                      setJobRoleList({
                        ...jobRoleList,
                        clockIn: e.target.value,
                      })
                    }}
                  />
                </Box>
                <Box sx={{ padding: 1 }}>
                  <MenuItem sx={{ display: 'inline' }}>Clock Out</MenuItem>
                  <TextField
                    sx={{ display: 'inline', marginLeft: '17rem' }}
                    className="set_date_time_bg"
                    type="time"
                    value={jobRoleList?.clockOut}
                    onChange={e => {
                      setJobRoleList({
                        ...jobRoleList,
                        clockOut: e.target.value,
                      })
                    }}
                  />
                </Box>
                <Button
                  onClick={handleUpdateClockInOut}
                  className="p-2 m-1"
                  variant="contained"
                >
                  Save
                </Button>
              </Select>
            </FormControl>
            <FormControl sx={{ width: '31rem' }} className="mb-3 ">
              <InputLabel id="demo-simple-select-label">
                Expense Management
              </InputLabel>
              <Select id="demo-multiple-checkbox-label">
                <FormGroup className="p-2">
                  {
                    // expensePermissions.map(()=>)
                    expensePolicy &&
                      expensePolicy.map(data => (
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
                                    travelChecked: e.target.checked,
                                  })
                                }}
                              />
                            }
                            label={data?.name}
                          />
                          <TextField
                            sx={{ display: 'inline', marginLeft: '17rem' }}
                            placeholder="Max Amount"
                            type="number"
                            value={expenseManagement?.travelAmount}
                            onChange={e =>
                              setExpenseManagement({
                                ...expenseManagement,
                                travelAmount: e.target.value,
                              })
                            }
                          />
                        </Box>
                      ))
                  }

                  <Button
                    disabled={!expenseManagement?.hotelChecked}
                    className="p-2 m-1"
                    variant={
                      expenseManagement?.hotelChecked ? 'contained' : 'outlined'
                    }
                  >
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
                                viewClient: false,
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
                                viewStaff: false,
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
                                viewRole: false,
                                editRole: false,
                                deleteRole: false,
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
                                viewRole: false,
                                editRole: false,
                                deleteRole: false,
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
                <Box className="row  ">
                  <Box className="d-flex col-md-8 align-items-center">
                    <Typography variant="span">
                      Can View a Client Detail ?{' '}
                    </Typography>
                  </Box>
                  <Checkbox
                    disableRipple
                    className="col-md-4 check_box_color"
                    checked={accessControl?.client?.viewClient}
                    onChange={e => {
                      setAccessControl({
                        ...accessControl,
                        client: {
                          ...accessControl.client,
                          viewClient: e.target.checked,
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
                      Can View a Staff Detail ?{' '}
                    </Typography>
                  </Box>
                  <Checkbox
                    disableRipple
                    className="col-md-4 check_box_color"
                    checked={accessControl?.staff?.viewStaff}
                    onChange={e => {
                      setAccessControl({
                        ...accessControl,
                        staff: {
                          ...accessControl.staff,
                          viewStaff: e.target.checked,
                        },
                      })
                    }}
                  />
                </Box>
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
                    checked={accessControl?.setting?.viewRole}
                    onChange={e => {
                      setAccessControl({
                        ...accessControl,
                        setting: {
                          ...accessControl.setting,
                          viewRole: e.target.checked,
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
                    checked={accessControl?.setting?.editRole}
                    onChange={e => {
                      setAccessControl({
                        ...accessControl,
                        setting: {
                          ...accessControl.setting,
                          editRole: e.target.checked,
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
                    checked={accessControl?.setting?.deleteRole}
                    onChange={e => {
                      setAccessControl({
                        ...accessControl,
                        setting: {
                          ...accessControl.setting,
                          deleteRole: e.target.checked,
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
        {/* <JobRoleDialog
          jobRoleList={jobRoleList}
          jobRoleDialogControl={jobRoleDialogControl}
          handleClose={handleClose}
        /> */}

        <EditJobRoleDialog
          editJobRoleDialogControl={editJobRoleDialogControl}
          handleClose={handleClose}
          setEditJobRoleDialogControl={setEditJobRoleDialogControl}
          handleEditJobRole={handleEditJobRole}
        />
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
