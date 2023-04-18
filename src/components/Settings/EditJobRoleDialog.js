import React, { useState, useContext, useEffect } from 'react'
import {
  Dialog,
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  TextareaAutosize,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { GetAddEditAdminRole } from '../../services/apiservices/adminprofile'
import moment from 'moment'
import { Context as ContextSnackbar } from '../../context/pageContext'
const EditJobRoleDialog = ({
  editJobRoleDialogControl,
  setEditJobRoleDialogControl,
  handleClose,
  handleEditJobRole,
}) => {
  const { successSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar } = useContext(ContextSnackbar)
  const [jobRoleList, setJobRoleList] = useState({})
  const [seniorName, setSeniorName] = useState('')
  useEffect(() => {
    GetAddEditAdminRole(
      {},
      res => {
        if (res.success) {
          setJobRoleList({
            ...jobRoleList,
            roles: res.data,
          })
        }
      },
      err => {
        console.log(err)
      },
    )
  }, [])
  return (
    <>
      <Dialog open={editJobRoleDialogControl.status} onClose={handleClose}>
        <DialogTitle>Job Role</DialogTitle>
        <DialogContent>
          <Box>
            <div className="row">
              <div className="col-md-12">
                <Typography variant="span">
                  Job Role<span className="required_star">*</span>
                </Typography>
              </div>
              <div className="col-md-12">
                <TextField
                  className="w-100"
                  value={editJobRoleDialogControl.name}
                  onChange={e => {
                    setEditJobRoleDialogControl({
                      ...editJobRoleDialogControl,
                      name: e.target.value,
                    })
                  }}
                  type="text"
                  variant="outlined"
                  placeholder="Job Role"
                />
              </div>
            </div>
          </Box>
          <Box>
            <div className="col-md-12 pt-4">
              <Typography variant="span">Who is the senior ?</Typography>
            </div>
            <FormControl>
              <InputLabel>Select jobRole</InputLabel>
              <Select
                label="Select Job Role"
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
          </Box>
          <Box>
            <div className="row my-4">
              <div className="col-md-6">
                <Typography variant="span">
                  Description<span className="required_star">*</span>
                </Typography>
              </div>
              <div className="col-md-12">
                <TextareaAutosize
                  style={{ width: 150 }}
                  placeholder="Description Here..."
                  className="w-100"
                  value={editJobRoleDialogControl.description}
                  onChange={e => {
                    setEditJobRoleDialogControl({
                      ...editJobRoleDialogControl,
                      description: e.target.value,
                    })
                  }}
                />
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions className="m-auto">
          <Button variant="contained" onClick={handleEditJobRole}>
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
export default EditJobRoleDialog
