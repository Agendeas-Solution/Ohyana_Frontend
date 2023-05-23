import React, { useState, useContext } from 'react'
import {
  Dialog,
  Box,
  DialogActions,
  Button,
  Typography,
  TextField,
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
    clockIn: moment().format(),
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
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Add Job Role</Typography>

          <TextField
            className="dialogue_input_fields"
            label="Job Role"
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

          <Autocomplete
            options={jobRoleList?.roles}
            onChange={(e, value) => {
              setJobRoleDetail({ ...jobRoleDetail, parentId: value.id })
            }}
            getOptionLabel={option => option?.name}
            renderInput={params => (
              <TextField
                className="dialogue_input_fields"
                label="Select Senior Role"
                variant="outlined"
                placeholder="Select Job Role"
                {...params}
              />
            )}
          />

          <TextField
            className="dialogue_input_fields"
            label="Description"
            placeholder="Description here..."
            autoComplete="off"
            multiline
            minRows={3}
            maxRows={3}
            value={jobRoleDetail.description}
            onChange={e => {
              setJobRoleDetail({
                ...jobRoleDetail,
                description: e.target.value,
              })
            }}
          />

          <TextField
            className="dialogue_input_fields"
            label="Clock In"
            type="time"
            autoComplete="off"
            value={jobRoleDetail?.clockIn}
            onChange={e => {
              setJobRoleDetail({
                ...jobRoleDetail,
                clockIn: e.target.value,
              })
            }}
          />

          <DialogActions>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={addJobRole}
            >
              Add
            </Button>
            <Button
              className="dialogue_button_nagative"
              variant="contained"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default JobRoleDialog
