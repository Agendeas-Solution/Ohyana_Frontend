import React, { useState, useContext, useEffect, useRef } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  TextareaAutosize,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import { AddClientStatus } from '../../services/apiservices/adminprofile'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { CLIENT } from '../../constants/clientConstant'
import { Folder } from '@mui/icons-material'
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
    audio: {},
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
    if (addStatusDetail.audio) {
      a = new Audio(addStatusDetail.audio)
      a.onended = () => {
        setButtonName('Play')
      }
    }
  }, [addStatusDetail.audio])
  const AddStatus = async e => {
    let blob = await fetch(addStatusDetail.audio).then(r => r.blob())
    const formData = new FormData()
    formData.append('clientId', addStatusDetail.clientId)
    formData.append('description', addStatusDetail.description)
    formData.append('followUpType', addStatusDetail.followUpType)
    if (addStatusDetail.callNotReceived === false) {
      formData.append('audio', blob)
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
        audio: URL.createObjectURL(e.target.files[0]),
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

  const handleUpload = () => {
    // TODO: handle the upload logic here
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
            value={addStatusDetail.description}
            onChange={e =>
              setAddStatusDetail({
                ...addStatusDetail,
                description: e.target.value,
                clientId: clientProfileDetail.id,
              })
            }
          />
          {/* <Box className="dialogue_input_fields" sx={{ flexDirection: 'column' }}> */}
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
            accept="audio/*"
            onChange={handleAudioFileChange}
            style={{ display: 'none' }}
            ref={inputRef}
          />
          {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <Typography>
                Call Recording
              </Typography>
              <PlayArrowRoundedIcon cononClick={handleClick} sx={{ color: '#2E3591' }}></PlayArrowRoundedIcon>
            </Box> */}
          {/* </Box> */}

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
