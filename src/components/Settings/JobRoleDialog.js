import React, { useState } from 'react'
import {
  Dialog,
  Box,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  TextField,
  TextareaAutosize,
  Autocomplete,
} from '@mui/material'
import Stack from '@mui/material/Stack'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker'
import dayjs from 'dayjs'
import { CreateJobRole } from '../../services/apiservices/adminprofile'
import moment from 'moment'
const JobRoleDialog = props => {
  const [jobRoleDetail, setJobRoleDetail] = useState({
    name: '',
    description: '',
    parentId: '',
    clockIn: dayjs(''),
  })
  const addJobRole = () => {
    if (
      jobRoleDetail.name !== '' &&
      jobRoleDetail.description !== '' &&
      jobRoleDetail.parentId !== '' &&
      jobRoleDetail.clockIn !== ''
    ) {
      debugger
      CreateJobRole(
        jobRoleDetail,
        res => {
          props.handleClose()
        },
        err => {},
      )
    }
  }
  return (
    <>
      <Dialog open={props.jobRoleDialogControl} onClose={props.handleClose}>
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
              options={props?.jobRoleList?.roles}
              // value={jobRoleDetail?.parentId}
              sx={{ width: '21rem' }}
              onChange={(e, value) => {
                console.log(value)
                setJobRoleDetail({ ...jobRoleDetail, parentId: value.id })
                debugger
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopTimePicker
                  label="Clock In"
                  value={jobRoleDetail?.clockIn}
                  onChange={newValue => {
                    setJobRoleDetail({
                      ...jobRoleDetail,
                      clockIn: moment(newValue).format('LT'),
                    })
                  }}
                  renderInput={params => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </Box>
        </DialogContent>
        <DialogActions className="m-auto">
          <Button variant="contained" onClick={addJobRole}>
            Ok
          </Button>
          <Button className="cancel-btn" onClick={props.handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default JobRoleDialog
