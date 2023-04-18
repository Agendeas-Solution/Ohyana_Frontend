import React, { useState, useContext } from 'react'
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
} from '@mui/material'
import { CreateJobRole } from '../../services/apiservices/adminprofile'
import moment from 'moment'

import { Context as ContextSnackbar } from '../../context/pageContext'
const JobRoleDialog = ({ handleClose, jobRoleDialogControl, jobRoleList }) => {
  const [jobRoleDetail, setJobRoleDetail] = useState({
    name: '',
    description: '',
    parentId: '',
    clockIn: '',
  })
  const { successSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar } = useContext(ContextSnackbar)
  const addJobRole = () => {
    if (
      jobRoleDetail.name !== '' &&
      jobRoleDetail.description !== '' &&
      jobRoleDetail.parentId !== '' &&
      jobRoleDetail.clockIn !== ''
    ) {
      CreateJobRole(
        jobRoleDetail,
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
  return (
    <>
      <Dialog open={jobRoleDialogControl} onClose={handleClose}>
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
                  value={jobRoleDetail.name}
                  onChange={e => {
                    setJobRoleDetail({
                      ...jobRoleDetail,
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
            <Autocomplete
              className="mt-1 align-items-center d-flex client_type_select justify-content-center "
              options={jobRoleList?.roles}
              sx={{ width: '21rem' }}
              onChange={(e, value) => {
                console.log(value)
                setJobRoleDetail({ ...jobRoleDetail, parentId: value.id })
              }}
              getOptionLabel={option => option?.name}
              renderInput={params => (
                <TextField
                  // className="m-3"
                  variant="outlined"
                  // sx={{ width: '24rem' }}
                  {...params}
                  placeholder="Select Job Role"
                />
              )}
            />
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
                  value={jobRoleDetail.description}
                  onChange={e => {
                    setJobRoleDetail({
                      ...jobRoleDetail,
                      description: e.target.value,
                    })
                  }}
                />
              </div>
            </div>
          </Box>
          <Box>
            <div className="row my-4">
              <TextField
                sx={{ display: 'inline', marginLeft: '18rem' }}
                className="set_date_time_bg"
                type="time"
                value={jobRoleDetail?.clockIn}
                onChange={e => {
                  setJobRoleDetail({
                    ...jobRoleDetail,
                    clockIn: e.target.value,
                  })
                }}
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions className="m-auto">
          <Button variant="contained" onClick={addJobRole}>
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

export default JobRoleDialog
