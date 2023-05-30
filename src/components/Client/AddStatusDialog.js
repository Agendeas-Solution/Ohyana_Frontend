import React, { useContext, useState } from 'react'
import {
  Dialog,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { AddClientStatus } from '../../services/apiservices/adminprofile'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { CLIENT } from '../../constants/clientConstant'
const AddStatusDialog = ({ setAddStatus, addStatus, businessDetail }) => {
  const [addStatusDetail, setAddStatusDetail] = useState({
    followUpType: '',
    description: '',
    clientId: businessDetail?.clientId,
    callNotReceived: true,
  })
  const [followUpType, setFollowUpType] = useState(CLIENT.FOLLOWUP)
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const AddStatus = e => {
    let data = {
      description: addStatusDetail?.description,
      clientId: addStatusDetail?.clientId,
      callNotReceived: true,
      followUpType: addStatusDetail?.followUpType,
    }
    AddClientStatus(
      data,
      res => {
        setAddStatus({ ...addStatus, status: false })
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
          message: err?.response?.data?.message,
        })
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
            maxRows={3}
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
              onClick={AddStatus}
            >
              Add
            </Button>
            <Button
              className="dialogue_button_nagative"
              variant="contained"
              onClick={() => setAddStatus({ ...addStatus, status: false })}
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default AddStatusDialog
