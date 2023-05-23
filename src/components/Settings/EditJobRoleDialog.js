import React, { useState, useContext, useEffect } from 'react'
import {
  Dialog,
  Box,
  DialogActions,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { GetAdminRole } from '../../services/apiservices/adminprofile'
import { Context as ContextSnackbar } from '../../context/pageContext'
const EditJobRoleDialog = ({
  editJobRoleDialogControl,
  setEditJobRoleDialogControl,
  handleClose,
  handleEditJobRole,
}) => {
  const { errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setErrorSnackbar } = useContext(ContextSnackbar)
  const [jobRoleList, setJobRoleList] = useState({})
  const [seniorName, setSeniorName] = useState('')
  useEffect(() => {
    GetAdminRole(
      { selection: true },
      res => {
        if (res.success) {
          setJobRoleList({
            ...jobRoleList,
            roles: res.data,
          })
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
  }, [])
  return (
    <>
      <Dialog open={editJobRoleDialogControl.status} onClose={handleClose}>
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Update Job Role</Typography>

          <TextField
            className="dialogue_input_fields"
            label="Job Role"
            type="text"
            variant="outlined"
            placeholder="Job Role"
            value={editJobRoleDialogControl.name}
            onChange={e => {
              setEditJobRoleDialogControl({
                ...editJobRoleDialogControl,
                name: e.target.value,
              })
            }}
          />
          <FormControl className="dialogue_input_fields">
            <InputLabel>Select Senior Role</InputLabel>
            <Select
              label="Select Senior Role"
              value={editJobRoleDialogControl?.parentId}
              onChange={e => {
                setEditJobRoleDialogControl({
                  ...editJobRoleDialogControl,
                  parentId: e.target.value,
                })
              }}
            >
              {jobRoleList?.roles &&
                jobRoleList?.roles.map(data => {
                  return <MenuItem value={data?.id}>{data?.name}</MenuItem>
                })}
            </Select>
          </FormControl>
          <TextField
            className="dialogue_input_fields"
            multiline
            placeholder="Description here..."
            autoComplete="off"
            label="Description"
            maxRows={3}
            value={editJobRoleDialogControl.description}
            onChange={e => {
              setEditJobRoleDialogControl({
                ...editJobRoleDialogControl,
                description: e.target.value,
              })
            }}
          />

          <DialogActions>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={handleEditJobRole}
            >
              Ok
            </Button>
            <Button
              className="dialogue_button_nagative"
              onClick={handleClose}
              autoFocus
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}
export default EditJobRoleDialog
