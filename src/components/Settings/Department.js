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
  Modal,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import FormGroup from '@mui/material/FormGroup'

import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteRounded'
import './index.css'
import {
  EditJobRole,
  GetSingleRole,
  UpdateClockInOut,
  UpdateRoleExpensePermissions,
} from '../../services/apiservices/adminprofile'
import {
  UpdatePermission,
  getUserPermissions,
} from '../../services/apiservices/adminprofile'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Context as ContextSnackbar } from '../../context/pageContext'
import StaffIcon from '../../assets/img/staff.svg'
import StatisticsIcon from '../../assets/img/statistics.svg'
import ClientIcon from '../../assets/img/Clients.svg'
import SettingIcon from '../../assets/img/setting.svg'
import { Context as AuthContext } from '../../context/authContext/authContext'
import { CLIENT } from '../../constants/clientConstant'
import { PERMISSION } from '../../constants'
import PermissionsGate from './PermissionGate'
import { SCOPES } from './permission-maps'
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
    EditClient: false,
    DeleteClient: false,
    ViewClient: false,
    ViewStaff: false,
    EditStaff: false,
    DeleteStaff: false,
    ViewRole: false,
    EditRole: false,
    DeleteRole: false,
    ViewProduct: false,
    EditProduct: false,
    DeleteProduct: false,
    AccessClientSettings: false,
    AccessStaffSettings: false,
    AccessSetting: false,
    EditCompanyProfile: false,
    EditLeaveDetail: false,
    DeleteLeave: false,
    EditHolidayDetail: false,
    DeleteHoliday: false,
    ViewExpense: false,
    EditExpense: false,
    DeleteExpense: false,
    AccessIntegration: false,
    ViewReport: false,
    ViewOrders: false,
    UpdateOrderDeliveryStatus: false,
    UpdateOrderPaymentStatus: false,
    UpdateExpenseApprovalStatus: false,
    UpdateExpensePaymentStatus: false,
    ViewBusinessCard: false,
    DeleteBusinessCard: false,
    ViewPJP: false,
    DeletePJP: false,
    EditPJP: false,
    PlaceOrder: false,
    AddBusinessCard: false,
  })
  const [expenseManagement, setExpenseManagement] = useState({
    travelChecked: false,
    travelAmount: 0,
    foodChecked: false,
    foodAmount: 0,
    hotelChecked: false,
    hotelAmount: 0,
  })
  const [expanded, setExpanded] = useState({
    expenseManagement: false,
    officeTimeManagement: false,
  })
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar).state
  const [expensePolicy, setExpensePolicy] = useState()
  const [expensePermissions, setExpensePermissions] = useState()
  const [permission, setPermission] = useState(PERMISSION.PERMISSIONTYPE)
  useEffect(() => {}, [])
  let path = window.location.pathname
  path = path.split('/').pop()
  useEffect(() => {
    jobRoleList.id &&
      getUserPermissions(
        parseInt(jobRoleList.id),
        res => {
          let staffPermission = res?.data?.permissions
          let userPermissions = PERMISSION.PERMISSIONTYPE.map(data => {
            let x = staffPermission.find(item => data.value === item)
            if (x) {
              return { [data.value]: true }
            } else {
              return { [data.value]: false }
            }
          })
          const obj = {}
          userPermissions.forEach(item => {
            const key = Object.keys(item)[0]
            const value = item[key]
            obj[key] = value
          })
          setAccessControl(obj)
          // setAccessControl({
          //   ...accessControl,
          //   clientControl: staffPermission?.clientMenu,
          //   staffControl: staffPermission?.staffMenu,
          //   settingControl: staffPermission?.settingMenu,
          //   client: {
          //     ...accessControl.client,
          //     editClient: staffPermission?.editClient,
          //     viewClient: staffPermission?.viewClient,
          //     deleteClient: staffPermission?.deleteClient,
          //     accessClient: staffPermission?.accessClient,
          //     clientStage: staffPermission?.clientStageAccess,
          //   },
          //   staff: {
          //     ...accessControl.staff,
          //     viewStaff: staffPermission.viewStaff,
          //     editStaff: staffPermission?.editStaff,
          //     deleteStaff: staffPermission?.deleteStaff,
          //     accessStaff: staffPermission?.accessStaff,
          //   },
          //   setting: {
          //     ...accessControl.setting,
          //     viewRole: staffPermission?.viewRole,
          //     editRole: staffPermission?.editRole,
          //     deleteRole: staffPermission?.deleteRole,
          //     viewProduct: staffPermission?.viewProduct,
          //     editProduct: staffPermission?.editProduct,
          //     deleteProduct: staffPermission?.deleteProduct,
          //     accessSetting: staffPermission?.accessSetting,
          //   },
          // })

          // expensePermissions.foreach(e=>{
          //   const isIdExist = expensePolicies.find(el=> el.expenseId == e.id)
          //   return {
          //         expenseId: expense.expenseId,
          //         id: category.id,
          //         name: category.name,
          //         amount: expense.amount
          //         isChecked : isIdExist ? true : false
          //       };

          // })
          let mergedArray = res?.data?.expensePolicies.map(expense => {
            let category = res?.data?.expensePermissions.find(
              cat => cat.expenseId === expense.id,
            )
            return {
              expenseId: expense?.id,
              name: expense?.name,
              amount: category?.amount || 0,
              isChecked: category ? true : false,
            }
          })
          setExpensePolicy(mergedArray)
        },
        err => {},
      )
  }, [jobRoleList.id])
  const handleUserPermissions = () => {
    let givenPermissions = Object.keys(accessControl).filter(
      key => accessControl[key] === true,
    )

    UpdatePermission(
      { roleId: jobRoleList?.id, permissions: givenPermissions },
      res => {
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.message,
        })
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err.response.data.message,
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
          handleSingleRole()
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
  const handleSingleRole = () => {
    GetSingleRole(
      { roleId: parseInt(path) },
      res => {
        if (res.success) {
          setJobRoleList(res.data)
        }
      },
      err => {
        console.log(err)
      },
    )
  }
  useEffect(() => {
    handleSingleRole()
  }, [])

  const handleCheckboxChange = index => {
    const updatedPolicy = [...expensePolicy]
    updatedPolicy[index].isChecked = !updatedPolicy[index].isChecked
    setExpensePolicy(updatedPolicy)
  }
  const handleAmountChange = (index, value) => {
    const updatedPolicy = [...expensePolicy]
    updatedPolicy[index].amount = value
    setExpensePolicy(updatedPolicy)
  }
  const handleExpenseManagement = () => {
    let data = {
      roleId: path,
    }
    let policy = expensePolicy.filter(data => {
      if (data.isChecked) {
        return data
      }
    })
    data['expensePolicies'] = policy.map(data => {
      return { id: data.expenseId, amount: data.amount }
    })
    UpdateRoleExpensePermissions(
      data,
      res => {
        if (res.success) {
          setSuccessSnackbar({
            ...successSnackbar,
            message: res.message,
            status: true,
          })
        }
      },
      err => {
        console.log(err)
      },
    )
  }

  return (
    <>
      <Box
        className="main_section"
        sx={{ overflowY: 'hidden', padding: '0px' }}
      >
        <Box className="header_section">
          <Typography className="task_card_heading" variant="span">
            {jobRoleList.name || '-'}
          </Typography>
          <Box>
            <Button className="profile_header_button">
              <EditRoundedIcon
                onClick={() => {
                  setEditJobRoleDialogControl({
                    ...editJobRoleDialogControl,
                    status: true,
                    name: jobRoleList.name,
                    description: jobRoleList.description,
                    parentId: jobRoleList.senior.id,
                  })
                }}
              />
            </Button>
            <Button className="profile_header_button">
              <DeleteOutlineRoundedIcon
                onClick={() => {
                  setDeleteJobRoleDialogControl({
                    ...deleteJobRoleDialogControl,
                    status: true,
                    id: jobRoleList.id,
                  })
                }}
              />
            </Button>
          </Box>
        </Box>
        <Divider sx={{ margin: '0px 10px' }} />
        <Box sx={{ height: '84%', overflowY: 'auto' }}>
          <Box className="post_detail">
            <Box className="post_name">
              <Typography sx={{ color: '#8E8E8E' }} variant="span">
                Senior Post
              </Typography>
              <Typography variant="span">
                {jobRoleList?.senior?.name || '-'}
              </Typography>
            </Box>

            <Box className="post_description">
              <Typography sx={{ color: '#8E8E8E' }} variant="span">
                Post Description
              </Typography>
              <Typography variant="span">
                {jobRoleList?.description || '-'}
              </Typography>
            </Box>
          </Box>

          <Box className="accessMenu_section">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ color: '#8E8E8E' }} variant="span">
                Office Time Management
              </Typography>
              <Button
                className="primary_color_button"
                variant="contained"
                onClick={handleUpdateClockInOut}
              >
                Save
              </Button>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '15px',
                marginBottom: '5px',
              }}
            >
              <Box
                sx={{
                  width: '48%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography>Clock In</Typography>
                <TextField
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
              <Box
                sx={{
                  width: '48%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography>Clock Out</Typography>
                <TextField
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
            </Box>
          </Box>

          <Box
            sx={{
              margin: '10px',
            }}
          >
            <Accordion
              sx={{
                boxShadow: 'none',
                border: '1px solid #E5E6EB',
              }}
              expanded={expanded.expenseManagement}
              onChange={() => {
                setExpanded({
                  ...expanded,
                  expenseManagement: !expanded.expenseManagement,
                  officeTimeManagement: expanded.officeTimeManagement,
                })
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Expense Management</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  padding: ' 10px 20px',
                }}
              >
                <FormGroup
                  sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  {expensePolicy &&
                    expensePolicy.map((data, index) => {
                      return (
                        <Box
                          sx={{
                            display: 'flex',
                            width: '48%',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '10px',
                          }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                className="expanse_checkbox"
                                checked={data?.isChecked}
                                onChange={() => handleCheckboxChange(index)}
                              />
                            }
                            label={data?.name}
                          />
                          <TextField
                            sx={{ width: '150px' }}
                            label="Max Amount"
                            placeholder="Max Amount"
                            type="number"
                            value={data?.amount}
                            onChange={e =>
                              handleAmountChange(index, e.target.value)
                            }
                          />
                        </Box>
                      )
                    })}
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button
                      sx={{
                        marginTop: '5px',
                      }}
                      className="primary_color_button"
                      onClick={handleExpenseManagement}
                      variant="contained"
                    >
                      Save
                    </Button>
                  </Box>
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* <Box className="accessMenu_section">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="span">
                Select the menu you want to give access to.
              </Typography>
              <Button
                className="primary_color_button"
                variant="contained"
                onClick={handleUserPermissions}
              >
                Save
              </Button>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              {permissions.accessClient && (
                <Box className="access_box">
                  <Box>
                    <img src={ClientIcon} alt="" />
                    <Typography className="access_box_name" variant="span">
                      Clients
                    </Typography>
                  </Box>
                  <FormControlLabel
                    className="access_box_form_control"
                    control={
                      <Checkbox
                        className="access_checkbox"
                        checked={accessControl?.AccessClientSettings}
                        onChange={e => {
                          if (e.target.checked === false) {
                            setAccessControl({
                              ...accessControl,
                              AccessClientSettings: e.target.checked,
                            })
                          } else {
                            setAccessControl({
                              ...accessControl,
                              AccessClientSettings: e.target.checked,
                            })
                          }
                        }}
                      />
                    }
                  />
                </Box>
              )}

              {permissions.accessStaff && (
                <Box className="access_box">
                  <Box>
                    <img src={StaffIcon} alt="" />
                    <Typography className="access_box_name" variant="span">
                      Staff
                    </Typography>
                  </Box>
                  <FormControlLabel
                    className="access_box_form_control"
                    control={
                      <Checkbox
                        className="access_checkbox"
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
              )}

              {permissions.accessSetting && (
                <Box className="access_box">
                  <Box>
                    <img src={SettingIcon} alt="" />
                    <Typography className="access_box_name" variant="span">
                      Setting
                    </Typography>
                  </Box>

                  <FormControlLabel
                    className="access_box_form_control"
                    control={
                      <Checkbox
                        className="access_checkbox"
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
              )}

              {permissions.accessSetting && (
                <Box className="access_box">
                  <Box>
                    <img src={StatisticsIcon} alt="" />
                    <Typography className="access_box_name" variant="span">
                      Statistics
                    </Typography>
                  </Box>

                  <FormControlLabel
                    className="access_box_form_control"
                    control={
                      <Checkbox
                        className="access_checkbox"
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
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              {permissions?.AccessClientSettings && (
                <Box className="access_control_box">
                  <Typography className="heading_access_box" variant="span">
                    Clients Control
                  </Typography>

                  <Box className="detail_access_control_box">
                    <Typography variant="span">
                      Can Edit a Client Detail ?{' '}
                    </Typography>

                    <Checkbox
                      className="access_checkbox"
                      disableRipple
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

                  <Box className="detail_access_control_box">
                    <Typography variant="span">
                      Can View a Client Detail ?{' '}
                    </Typography>

                    <Checkbox
                      className="access_checkbox"
                      disableRipple
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

                  <Box className="detail_access_control_box">
                    <Typography variant="span">
                      Can Delete a Client Detail ?{' '}
                    </Typography>

                    <Checkbox
                      className="access_checkbox"
                      disableRipple
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

                  <Box className="detail_access_control_box">
                    <Typography variant="span">
                      Give Access to Client ?{' '}
                    </Typography>

                    <Checkbox
                      className="access_checkbox"
                      disableRipple
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

                  <FormControl className="client_type_select">
                    <InputLabel>Select Client Type</InputLabel>
                    <Select
                      label="Select Client Type"
                      value={clientType[accessControl?.client?.clientStage]}
                      onChange={(e, value) => {
                        setAccessControl({
                          ...accessControl,
                          client: {
                            ...accessControl.client,
                            clientStage: e.target.value,
                          },
                        })
                      }}
                    >
                      {clientType.map(data => {
                        return <MenuItem value={data.id}>{data.stage}</MenuItem>
                      })}
                    </Select>
                  </FormControl>
                </Box>
              )}

              {accessControl?.staffControl && permissions.accessStaff && (
                <Box className="access_control_box">
                  <Typography className="heading_access_box" variant="span">
                    Staff Control
                  </Typography>

                  <Box className="detail_access_control_box">
                    <Typography variant="span">
                      Can View a Staff Detail ?{' '}
                    </Typography>
                    <Checkbox
                      className="access_checkbox"
                      disableRipple
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

                  <Box className="detail_access_control_box">
                    <Typography variant="span">
                      Can Edit a Staff Detail ?{' '}
                    </Typography>
                    <Checkbox
                      className="access_checkbox"
                      disableRipple
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

                  <Box className="detail_access_control_box">
                    <Typography variant="span">
                      Can Delete a Staff Detail ?{' '}
                    </Typography>

                    <Checkbox
                      className="access_checkbox"
                      disableRipple
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
                    <Box className="detail_access_control_box">
                      <Typography variant="span">
                        Give Access to Staff ?{' '}
                      </Typography>
                      <Checkbox
                        className="access_checkbox"
                        disableRipple
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
                <Box className="access_control_box">
                  <Typography className="heading_access_box" variant="span">
                    Setting Control
                  </Typography>

                  <Box className="detail_access_control_box">
                    <Typography variant="span">Can View Job role ? </Typography>
                    <Checkbox
                      className="access_checkbox"
                      disableRipple
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

                  <Box className="detail_access_control_box">
                    <Typography variant="span">Can Edit Job role ? </Typography>

                    <Checkbox
                      className="access_checkbox"
                      disableRipple
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

                  <Box className="detail_access_control_box">
                    <Typography variant="span">
                      Can Delete Job role ?{' '}
                    </Typography>
                    <Checkbox
                      className="access_checkbox"
                      disableRipple
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

                  <Box className="detail_access_control_box">
                    <Typography variant="span">Can View Product ? </Typography>
                    <Checkbox
                      className="access_checkbox"
                      disableRipple
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

                  <Box className="detail_access_control_box">
                    <Typography variant="span">Can Edit Product ? </Typography>

                    <Checkbox
                      className="access_checkbox"
                      disableRipple
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

                  <Box className="detail_access_control_box">
                    <Typography variant="span">
                      Can Delete Product ?{' '}
                    </Typography>

                    <Checkbox
                      className="access_checkbox"
                      disableRipple
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
                    <Box className="detail_access_control_box">
                      <Typography variant="span">
                        Give Access to Setting ?{' '}
                      </Typography>
                      <Checkbox
                        className="access_checkbox"
                        disableRipple
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
          </Box> */}

          <Box className="permission_table">
            <Box className="team_overview_heading">
              <Typography
                sx={{ marginBottom: '8px' }}
                className="team_overview_inner_heading"
                variant="span"
              >
                Access Control
              </Typography>
              <Button
                className="primary_color_button"
                variant="contained"
                onClick={handleUserPermissions}
              >
                Save
              </Button>
            </Box>
            <TableContainer component={Paper} className="set_box_shadow">
              <Table sx={{ minWidth: 650, border: '1px solid' }}>
                <TableHead className="team_overview_table_heading">
                  <TableRow>
                    <TableCell sx={{ width: '20%', border: '1px solid' }}>
                      Type
                    </TableCell>
                    <TableCell sx={{ width: '75%', border: '1px solid' }}>
                      Permission
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {inquiryData?.teamWithPoints &&
                    inquiryData?.teamWithPoints.map(data => {
                      return ( */}

                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell className="permission_table_cell">
                      Staff
                    </TableCell>
                    <TableCell className="permission_table_cell">
                      <FormGroup
                        className="table_permission_section"
                        aria-label="position"
                        row
                      >
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.ViewClient}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                ViewClient: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">ViewClient</Typography>
                        </Box>

                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.EditClient}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                EditClient: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">EditClient</Typography>
                        </Box>

                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.DeleteClient}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                DeleteClient: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">DeleteClient</Typography>
                        </Box>
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.AccessClientSettings}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                AccessClientSettings: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">
                            AccessClientSettings
                          </Typography>
                        </Box>
                      </FormGroup>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell className="permission_table_cell">
                      Staff
                    </TableCell>
                    <TableCell className="permission_table_cell">
                      <FormGroup
                        className="table_permission_section"
                        aria-label="position"
                        row
                      >
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.ViewStaff}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                ViewStaff: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">ViewStaff</Typography>
                        </Box>

                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.EditStaff}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                EditStaff: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">EditStaff</Typography>
                        </Box>

                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.DeleteStaff}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                DeleteStaff: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">DeleteStaff</Typography>
                        </Box>
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.AccessStaffSettings}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                AccessStaffSettings: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">
                            AccessStaffSettings
                          </Typography>
                        </Box>
                      </FormGroup>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell className="permission_table_cell">
                      Role
                    </TableCell>
                    <TableCell className="permission_table_cell">
                      <FormGroup
                        className="table_permission_section"
                        aria-label="position"
                        row
                      >
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.ViewRole}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                ViewRole: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">ViewRole</Typography>
                        </Box>

                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.EditRole}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                EditRole: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">EditRole</Typography>
                        </Box>

                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.DeleteRole}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                DeleteRole: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">DeleteRole</Typography>
                        </Box>
                      </FormGroup>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell className="permission_table_cell">
                      Product
                    </TableCell>
                    <TableCell className="permission_table_cell">
                      <FormGroup
                        className="table_permission_section"
                        aria-label="position"
                        row
                      >
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.ViewProduct}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                ViewProduct: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">ViewProduct</Typography>
                        </Box>

                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.EditProduct}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                EditProduct: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">EditProduct</Typography>
                        </Box>

                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.DeleteProduct}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                DeleteProduct: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">DeleteProduct</Typography>
                        </Box>
                      </FormGroup>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell className="permission_table_cell">
                      Setting
                    </TableCell>
                    <TableCell className="permission_table_cell">
                      <FormGroup
                        className="table_permission_section"
                        aria-label="position"
                        row
                      >
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.AccessSetting}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                AccessSetting: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">AccessSetting</Typography>
                        </Box>
                      </FormGroup>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell className="permission_table_cell">
                      Company Profile
                    </TableCell>
                    <TableCell className="permission_table_cell">
                      <FormGroup
                        className="table_permission_section"
                        aria-label="position"
                        row
                      >
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.EditCompanyProfile}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                EditCompanyProfile: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">
                            EditCompanyProfile
                          </Typography>
                        </Box>
                      </FormGroup>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell className="permission_table_cell">
                      Leave
                    </TableCell>
                    <TableCell className="permission_table_cell">
                      <FormGroup
                        className="table_permission_section"
                        aria-label="position"
                        row
                      >
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.EditLeaveDetail}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                EditLeaveDetail: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">
                            EditLeaveDetail
                          </Typography>
                        </Box>
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.DeleteLeave}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                DeleteLeave: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">DeleteLeave</Typography>
                        </Box>
                      </FormGroup>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell className="permission_table_cell">
                      Holiday
                    </TableCell>
                    <TableCell className="permission_table_cell">
                      <FormGroup
                        className="table_permission_section"
                        aria-label="position"
                        row
                      >
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.EditHolidayDetail}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                EditHolidayDetail: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">
                            EditHolidayDetail
                          </Typography>
                        </Box>
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.DeleteHoliday}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                DeleteHoliday: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">DeleteHoliday</Typography>
                        </Box>
                      </FormGroup>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell className="permission_table_cell">
                      Expense
                    </TableCell>
                    <TableCell className="permission_table_cell">
                      <FormGroup
                        className="table_permission_section"
                        aria-label="position"
                        row
                      >
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.ViewExpense}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                ViewExpense: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">ViewExpense</Typography>
                        </Box>

                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.UpdateExpenseApprovalStatus}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                UpdateExpenseApprovalStatus: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">
                            UpdateExpenseApprovalStatus
                          </Typography>
                        </Box>
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.UpdateExpensePaymentStatus}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                UpdateExpensePaymentStatus: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">
                            UpdateExpensePaymentStatus
                          </Typography>
                        </Box>
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.EditExpense}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                EditExpense: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">EditExpense</Typography>
                        </Box>
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.DeleteExpense}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                DeleteExpense: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">DeleteExpense</Typography>
                        </Box>
                      </FormGroup>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell className="permission_table_cell">
                      Integration
                    </TableCell>
                    <TableCell className="permission_table_cell">
                      <FormGroup
                        className="table_permission_section"
                        aria-label="position"
                        row
                      >
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.AccessIntegration}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                AccessIntegration: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">
                            AccessIntegration
                          </Typography>
                        </Box>
                      </FormGroup>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell className="permission_table_cell">
                      Report
                    </TableCell>
                    <TableCell className="permission_table_cell">
                      <FormGroup
                        className="table_permission_section"
                        aria-label="position"
                        row
                      >
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.ViewReport}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                ViewReport: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">ViewReport</Typography>
                        </Box>
                      </FormGroup>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell className="permission_table_cell">
                      Orders
                    </TableCell>
                    <TableCell className="permission_table_cell">
                      <FormGroup
                        className="table_permission_section"
                        aria-label="position"
                        row
                      >
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.ViewOrders}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                ViewOrders: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">ViewOrders</Typography>
                        </Box>
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.UpdateOrderDeliveryStatus}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                UpdateOrderDeliveryStatus: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">
                            UpdateOrderDeliveryStatus
                          </Typography>
                        </Box>
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.UpdateOrderPaymentStatus}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                UpdateOrderPaymentStatus: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">
                            UpdateOrderPaymentStatus
                          </Typography>
                        </Box>
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.PlaceOrder}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                PlaceOrder: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">PlaceOrder</Typography>
                        </Box>
                      </FormGroup>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell className="permission_table_cell">
                      Business Card
                    </TableCell>
                    <TableCell className="permission_table_cell">
                      <FormGroup
                        className="table_permission_section"
                        aria-label="position"
                        row
                      >
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.ViewBusinessCard}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                ViewBusinessCard: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">
                            ViewBusinessCard
                          </Typography>
                        </Box>
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.DeleteBusinessCard}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                DeleteBusinessCard: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">
                            DeleteBusinessCard
                          </Typography>
                        </Box>
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.AddBusinessCard}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                AddBusinessCard: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">
                            AddBusinessCard
                          </Typography>
                        </Box>
                      </FormGroup>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell className="permission_table_cell">PJP</TableCell>
                    <TableCell className="permission_table_cell">
                      <FormGroup
                        className="table_permission_section"
                        aria-label="position"
                        row
                      >
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.ViewPJP}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                ViewPJP: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">ViewPJP</Typography>
                        </Box>
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.DeletePJP}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                DeletePJP: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">DeletePJP</Typography>
                        </Box>
                        <Box className="detail_access_control_box">
                          <Checkbox
                            className="access_checkbox"
                            disableRipple
                            checked={accessControl?.EditPJP}
                            onChange={e => {
                              setAccessControl({
                                ...accessControl,
                                EditPJP: e.target.checked,
                              })
                            }}
                          />
                          <Typography variant="span">EditPJP</Typography>
                        </Box>
                      </FormGroup>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
        <PermissionsGate scopes={['EditClient']}>
          <h1>Private content</h1>
          <p>Must be an editor to view</p>
        </PermissionsGate>
        <EditJobRoleDialog
          editJobRoleDialogControl={editJobRoleDialogControl}
          handleClose={handleClose}
          setEditJobRoleDialogControl={setEditJobRoleDialogControl}
          handleEditJobRole={handleEditJobRole}
        />
        <DeleteJobRoleDialog
          deleteJobRoleDialogControl={deleteJobRoleDialogControl}
          handleClose={handleClose}
          handleSingleRole={handleSingleRole}
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
