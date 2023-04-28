import React, { useState, useContext } from 'react'
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from '@mui/material'
import { Context as ContextSnackbar } from '../../context/pageContext'
import {
  AddAdminDepartment,
  EditAdminDepartment,
} from '../../services/apiservices/adminprofile'
const AddEditDepartmentDialog = ({
  addEditDepartmentDialogControl,
  handleClose,
}) => {
  const [departmentName, setdepartmentName] = useState(
    addEditDepartmentDialogControl?.id
      ? addEditDepartmentDialogControl?.departmentName
      : '',
  )
  const { successSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar } = useContext(ContextSnackbar)
  const handleAddDepartment = () => {
    if (addEditDepartmentDialogControl?.id) {
      EditAdminDepartment(
        addEditDepartmentDialogControl?.id,
        { name: departmentName },
        res => {
          if (res.success) {
            handleClose()
            setSuccessSnackbar({
              ...successSnackbar,
              status: true,
              message: res.message,
            })
          }
        },
        err => {},
      )
    } else {
      AddAdminDepartment(
        { name: departmentName },
        res => {
          if (res.success) {
            handleClose()
            setSuccessSnackbar({
              ...successSnackbar,
              status: true,
              message: res.message,
            })
          }
        },
        err => {},
      )
    }
  }

  return (
    <>
      <Dialog
        open={addEditDepartmentDialogControl.status}
        onClose={handleClose}
      >
        <div className="px-3 pt-3">
          <h3>Department</h3>
        </div>
        <DialogContent>
          <div className="row my-3">
            <div className="col-md-6">
              <Typography variant="span">
                Department Name<span className="required_star">*</span>
              </Typography>
            </div>
            <div className="col-md-12">
              <TextField
                className="w-100"
                variant="outlined"
                placeholder="Enter Department Name"
                value={departmentName}
                onChange={e => {
                  setdepartmentName(e.target.value)
                }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions className="d-flex w-100 col-md-12">
          <Button
            className="ok-btn"
            variant="contained"
            onClick={handleAddDepartment}
          >
            Ok
          </Button>
          <Button className="cancel-btn" onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddEditDepartmentDialog
