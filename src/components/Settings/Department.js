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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
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
  const [expanded, setExpanded] = useState({
    expenseManagement: false,
    officeTimeManagement: false,
  })
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar).state
  const [expensePolicy, setExpensePolicy] = useState()
  const [expensePermissions, setExpensePermissions] = useState()
  let path = window.location.pathname
  path = path.split('/').pop()
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
  }, [
    deleteJobRoleDialogControl.status,
    jobRoleDialogControl,
    editJobRoleDialogControl.status,
  ])

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
    debugger
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
        <Box className="main_section_header" sx={{ padding: '10px' }}>
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

          <Box>
            <Box
              sx={{
                margin: '5px 10px 10px 10px',
              }}
            >
              <Accordion
                sx={{
                  padding: '0px',
                  margin: '0px',
                  boxShadow: 'none',
                  border: '1px solid #E5E6EB',
                }}
                expanded={expanded.officeTimeManagement}
                onChange={() => {
                  setExpanded({
                    ...expanded,
                    officeTimeManagement: !expanded.officeTimeManagement,
                    expenseManagement: expanded.expenseManagement,
                  })
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Office Time Management</Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    padding: ' 10px 20px',
                    margin: '0px',
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '5px',
                    }}
                  >
                    <Box
                      sx={{
                        width: '48%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '10px',
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
                        margin: '10px 0px',
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
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      className="primary_color_button"
                      onClick={handleUpdateClockInOut}
                      variant="contained"
                    >
                      Save
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
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
              {accessControl.clientControl && permissions.accessClient && (
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
          </Box>
        </Box>

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
