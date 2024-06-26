import React, { useState, useContext, useEffect, useRef } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material'
import { AddClientStatus } from '../../services/apiservices/adminprofile'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { CLIENT } from '../../constants/clientConstant'
var a
const StatusDialog = ({
  clientProfileDetail,
  handleStatusClose,
  statusDialog,
}) => {
  const [audioFile, setAudioFile] = useState(null)
  const inputRef = useRef(null)
  const [addStatusDetail, setAddStatusDetail] = useState({
    clientId: clientProfileDetail.id,
    description: '',
    status_audio_file: {},
    callNotReceived: false,
    followUpType: '',
  })
  const [followUpType, setFollowUpType] = useState(CLIENT.FOLLOWUP)
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const [buttonName, setButtonName] = useState('Play')

  useEffect(() => {
    if (a) {
      a.pause()
      setButtonName('Play')
    }
    if (addStatusDetail.status_audio_file) {
      a = new Audio(addStatusDetail.status_audio_file)
      a.onended = () => {
        setButtonName('Play')
      }
    }
  }, [addStatusDetail.status_audio_file])
  const AddStatus = async e => {
    let blob = await fetch(addStatusDetail.status_audio_file).then(r =>
      r.blob(),
    )
    const formData = new FormData()
    formData.append('clientId', addStatusDetail.clientId)
    formData.append('description', addStatusDetail.description)
    formData.append('followUpType', addStatusDetail.followUpType)
    if (addStatusDetail.callNotReceived === false) {
      formData.append('status_audio_file', blob)
      formData.append('callNotReceived', addStatusDetail.callNotReceived)
    } else {
      formData.append('callNotReceived', addStatusDetail.callNotReceived)
    }
    AddClientStatus(
      formData,
      res => {
        handleStatusClose()
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
      },
    )
  }
  const addFile = e => {
    e.preventDefault()
    if (e.target.files[0]) {
      setAddStatusDetail({
        ...addStatusDetail,
        status_audio_file: URL.createObjectURL(e.target.files[0]),
      })
    }
  }
  const handleClick = () => {
    if (buttonName === 'Play') {
      a.play()
      setButtonName('Pause')
    } else {
      a.pause()
      setButtonName('Play')
    }
  }
  const handleAudioFileChange = event => {
    setAudioFile(event.target.files[0])
  }
  const handleSelectFile = () => {
    inputRef.current.click()
  }

  return (
    <>
      <Dialog open={statusDialog} onClose={handleStatusClose}>
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Add Status</Typography>
          <FormControl className="dialogue_input_fields">
            <InputLabel>Conversation Type</InputLabel>
            <Select
              label="Conversation Type"
              value={addStatusDetail.followUpType}
              onChange={e =>
                setAddStatusDetail({
                  ...addStatusDetail,
                  followUpType: e.target.value,
                  clientId: clientProfileDetail.id,
                })
              }
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
            onChange={e =>
              setAddStatusDetail({
                ...addStatusDetail,
                description: e.target.value,
                clientId: clientProfileDetail.id,
              })
            }
          />
          <TextField
            className="dialogue_input_fields"
            sx={{ marginRight: '5px' }}
            label="Select Audio"
            type="text"
            value={audioFile ? audioFile.name : ''}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    sx={{
                      margin: '0px',
                      backgroundColor: '#2E3591',
                      boxShadow: 'none',
                    }}
                    variant="contained"
                    onClick={handleSelectFile}
                  >
                    Select
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          <input
            type="file"
            accept="status_audio_file/*"
            onChange={handleAudioFileChange}
            style={{ display: 'none' }}
            ref={inputRef}
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
              onClick={handleStatusClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default StatusDialog
