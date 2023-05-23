import React, { useState, useEffect, useContext } from 'react'
import {
  Box,
  Dialog,
  TextField,
  Typography,
  TextareaAutosize,
  Autocomplete,
  Select,
  MenuItem,
  DialogActions,
  Button,
} from '@mui/material'
import { Context as ContextSnackbar } from '../../context/pageContext'
import {
  GetAdminRole,
  AddNotificationDetail,
} from '../../services/apiservices/adminprofile'
const ClientStatusCloseDialog = ({
  CloseDeleteRemainder,
  deleteRemainderDialog,
}) => {
  const [addNotificationDetail, setAddNotificationDetail] = useState({
    heading: '',
    description: '',
    departmentId: null,
    roleId: null,
    type: '',
  })
  const [departmentList, setDepartmentList] = useState([])
  const [employeeJobRole, setEmployeeJobRole] = useState([])
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const [notificationType, setNotificationType] = useState([
    'NOTICE',
    'ACHIEVEMENT',
    'INFORMATION',
  ])
  useEffect(() => {
    {
      addNotificationDetail?.departmentId &&
        GetAdminRole(
          parseInt(addNotificationDetail?.departmentId),
          res => {
            if (res.success) {
              setEmployeeJobRole(res.data?.roles)
            }
          },
          err => {
            setErrorSnackbar({
              ...errorSnackbar,
              status: true,
              message: err?.response?.data?.message,
            })
          },
        )
    }
  }, [addNotificationDetail?.departmentId])
  const handleAddNotification = () => {
    AddNotificationDetail(
      addNotificationDetail,
      res => {
        CloseDeleteRemainder()
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
        CloseDeleteRemainder()
      },
    )
  }
  return (
    <>
      <Dialog open={deleteRemainderDialog} onClose={CloseDeleteRemainder}>
        <div className="px-3 py-3">
          <h3>Set Notification</h3>
        </div>
        <Box>
          <div className="row">
            <div className="col-md-6">
              <Typography variant="span">
                Department<span className="required_star">*</span>
              </Typography>
            </div>
            <Autocomplete
              className="align-items-center d-flex justify-content-center  w-100"
              options={departmentList}
              onChange={(e, value) => {
                setAddNotificationDetail({
                  ...addNotificationDetail,
                  departmentId: value?.id,
                })
              }}
              sx={{ width: 300 }}
              getOptionLabel={option => option.name}
              renderInput={params => (
                <TextField {...params} placeholder="Select Department" />
              )}
            />
          </div>
        </Box>
        <Box className="my-3">
          <div className="row">
            <div className="col-md-6">
              <Typography variant="span">
                Job Role<span className="required_star">*</span>
              </Typography>
            </div>
            <div className="col-md-12">
              <Select
                className="w-100"
                value={addNotificationDetail?.roleId}
                onChange={e => {
                  setAddNotificationDetail({
                    ...addNotificationDetail,
                    roleId: e.target.value,
                  })
                }}
              >
                {employeeJobRole &&
                  employeeJobRole.map(data => {
                    return <MenuItem value={data?.id}>{data?.name}</MenuItem>
                  })}
              </Select>
            </div>
          </div>
        </Box>
        <Box className="my-3">
          <div className="row">
            <div className="col-md-12">
              <Typography variant="span">
                Notification Type<span className="required_star">*</span>
              </Typography>
            </div>
            <div className="col-md-12">
              <Select
                className="w-100"
                value={addNotificationDetail?.type}
                onChange={e => {
                  setAddNotificationDetail({
                    ...addNotificationDetail,
                    type: e.target.value,
                  })
                }}
              >
                {notificationType &&
                  notificationType.map(data => {
                    return <MenuItem value={data}>{data}</MenuItem>
                  })}
              </Select>
            </div>
          </div>
        </Box>
        <Box className="my-3">
          <div className="row">
            <div className="col-md-12">
              <Typography className="input_field_label" variant="span">
                Subject<span className="required_star">*</span>
              </Typography>
            </div>
            <div className="col-md-12">
              <TextField
                className="w-100"
                placeholder="Enter Subject"
                onChange={e => {
                  setAddNotificationDetail({
                    ...addNotificationDetail,
                    heading: e.target.value,
                  })
                }}
                value={addNotificationDetail.heading}
                variant="outlined"
              />
            </div>
          </div>
        </Box>
        <Box className="my-3">
          <div className="row">
            <div className="col-md-12">
              <Typography className="input_field_label" variant="span">
                Description<span className="required_star">*</span>
              </Typography>
            </div>
            <div className="col-md-12">
              <TextareaAutosize
                placeholder="Description Here..."
                className="w-100"
                value={addNotificationDetail.description}
                onChange={e => {
                  setAddNotificationDetail({
                    ...addNotificationDetail,
                    description: e.target.value,
                  })
                }}
              />
            </div>
          </div>
        </Box>
        <DialogActions className="m-auto">
          <Button variant="contained" onClick={handleAddNotification}>
            Create
          </Button>
          <Button
            className="cancel-btn"
            onClick={CloseDeleteRemainder}
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ClientStatusCloseDialog
