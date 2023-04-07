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
import { EditJobRole } from '../../services/apiservices/adminprofile'
import { Context as ContextSnackbar } from '../../context/pageContext'

const EditJobRoleDialog = props => {
  const [clientType, setClientType] = useState([
    { stage: 'Jr. Sales Person', id: 0 },
    { stage: 'Sr. Sales Person', id: 1 },
    { stage: 'Ass. Sales Person', id: 2 },
    { stage: 'None', id: 3 },
  ])

  const [clientStage, setClientStage] = useState()

  const [jobRoleDetail, setJobRoleDetail] = useState({
    name: props?.editJobRoleDialogControl?.name,
    description: props?.editJobRoleDialogControl.description,
    departmentId: props?.editJobRoleDialogControl?.departmentId,
    id: props?.editJobRoleDialogControl?.roleId,
  })

  const { successSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar } = useContext(ContextSnackbar)

  const handleEditJobRole = () => {
    if (jobRoleDetail.description !== '' && jobRoleDetail.name !== '') {
      EditJobRole(
        jobRoleDetail.id,
        {
          description: jobRoleDetail.description,
          departmentId: jobRoleDetail.departmentId,
          name: jobRoleDetail.name,
        },
        res => {
          props.handleClose()
          setSuccessSnackbar({
            ...successSnackbar,
            status: true,
            message: res.data.message,
          })
        },
        err => {},
      )
    }
  }

  return (
    <>
      <Dialog
        open={props.editJobRoleDialogControl.status}
        onClose={props.handleClose}
      >
        <Box sx={{ margin: '10px' }}>
          <DialogTitle
            sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}
          >
            Job Role
          </DialogTitle>
          <DialogContent>
            <Box>
              <div className="row">
                <div className="col-md-12">
                  <Typography variant="span">Job Role</Typography>
                </div>
                <div className="col-md-12">
                  <TextField
                    value={jobRoleDetail.name}
                    onChange={e => {
                      setJobRoleDetail({
                        ...jobRoleDetail,
                        name: e.target.value,
                      })
                    }}
                    className="w-100"
                    type="text"
                    variant="outlined"
                    placeholder="Job Role"
                  />
                </div>
              </div>
            </Box>

            <div className="col-md-12 pt-4">
              <Typography variant="span">Who is the senior ?</Typography>
            </div>

            <Autocomplete
              className="mt-1 align-items-center d-flex client_type_select justify-content-center "
              options={clientType}
              value={clientStage !== null ? clientType[clientStage] : null}
              sx={{ width: '21rem' }}
              onChange={(e, value) => {
                console.log(value)
                setClientStage(value?.id)
              }}
              getOptionLabel={option => option.stage}
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

            <Box>
              <div className="row my-4">
                <div className="col-md-6">
                  <Typography variant="span">Description</Typography>
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
          </DialogContent>

          <DialogActions className="m-auto">
            <Button
              className="px-5 pe-5"
              variant="contained"
              onClick={handleEditJobRole}
            >
              Save
            </Button>
            {/* <Button className="cancel-btn" onClick={props.handleClose} autoFocus>
            Cancel
          </Button> */}
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default EditJobRoleDialog
