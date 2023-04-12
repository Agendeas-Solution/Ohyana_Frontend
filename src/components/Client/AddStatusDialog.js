import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextareaAutosize,
  Autocomplete,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import { GetBusinessDetail } from '../../services/apiservices/clientDetail'
import moment from 'moment'
import { AddClientStatus } from '../../services/apiservices/adminprofile'
import { CLIENT } from '../../constants/clientConstant'
const AddStatusDialog = ({
  setAddStatus,
  addStatus,
  handleDialogOpen,
  businessDetail,
}) => {
  const [addStatusDetail, setAddStatusDetail] = useState({
    followUpType: '',
    description: '',
    clientId: businessDetail?.clientId,
    callNotReceived: true,
  })
  const [followUpType, setFollowUpType] = useState(CLIENT.FOLLOWUP)
  const AddStatus = e => {
    AddClientStatus(
      {
        description: addStatusDetail?.description,
        clientId: addStatusDetail?.clientId,
        callNotReceived: true,
        followUpType: addStatusDetail?.followUpType,
      },
      res => {
        setAddStatus({ ...addStatus, status: false })
        // setSuccessSnackbar({ ...successSnackbar, status: true, message: res.data.message })
      },
      err => {
        // setErrorSnackbar({ ...errorSnackbar, status: true, message: err.response.data.error })
      },
    )
  }
  return (
    <>
      <Dialog
        open={addStatus.status}
        onClose={() => setAddStatus({ ...addStatus, status: false })}
      >
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Add Status</Typography>

          <FormControl className="dialogue_input_fields">
            <InputLabel>Conversation Type</InputLabel>
            <Select
              label="Conversation Type"
              value={addStatusDetail.followUpType}
              onChange={(event, newValue) => {
                setAddStatusDetail({
                  ...addStatusDetail,
                  followUpType: event.target.value,
                  clientId: businessDetail?.id,
                })
              }}
            >
              {followUpType.map(data => {
                return <MenuItem value={data.type}>{data.fieldName}</MenuItem>
              })}
            </Select>
          </FormControl>

          <TextField
            className="dialogue_input_fields"
            multiline
            label="Description"
            autoComplete="off"
            placeholder="Description Here..."
            minRows={3}
            value={addStatusDetail.description}
            onChange={e => {
              setAddStatusDetail({
                ...addStatusDetail,
                description: e.target.value,
              })
            }}
          />


          <DialogActions>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={AddStatus}>
              Add
            </Button>
            <Button
              className="dialogue_button_nagative"
              variant="contained"
              onClick={() => setAddStatus({ ...addStatus, status: false })}>
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default AddStatusDialog
