import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
  TextareaAutosize,
  FormControl,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import './index.css'
import {
  GetAllClients,
  UpdatePJPDetail,
} from '../../services/apiservices/clientDetail'
import moment from 'moment'
const EditPJPDialog = ({
  editPJPDetail,
  setEditPJPDetail,
  pjpDetail,
  handlePJPDetail,
  handleEditPJPCloseDialog,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [options, setOptions] = useState([])
  const [pJPDetail, setPJPDetail] = useState({
    pjpId: pjpDetail?.id,
    date: pjpDetail?.date,
    description: pjpDetail?.description,
  })
  useEffect(() => {
    let data = {
      size: 10,
    }
    if (searchQuery !== '') {
      data['searchQuery'] = searchQuery
    }
    GetAllClients(
      data,
      res => {
        if (res?.success) {
          setOptions(res?.data?.client)
        }
      },
      err => {
        console.log(err)
      },
    )
  }, [searchQuery])
  const handleEditPJPDetail = () => {
    UpdatePJPDetail(
      pJPDetail,
      res => {
        if (res?.success) {
          handlePJPDetail()
          handleEditPJPCloseDialog()
        }
      },
      err => {
        console.log(err)
      },
    )
  }
  return (
    <>
      <Dialog open={editPJPDetail.status} onClose={handleEditPJPCloseDialog}>
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Create PJP</Typography>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="dd/MM/yyyy"
              disablePast
              value={pJPDetail.date}
              onChange={e => {
                setPJPDetail({ ...pJPDetail, date: e })
              }}
              renderInput={params => (
                <TextField {...params} className="dialogue_input_fields" />
              )}
            />
          </LocalizationProvider>

          <TextField
            className="dialogue_input_fields"
            multiline
            autoComplete="off"
            label="Detail"
            minRows={3}
            placeholder="Detail Here..."
            value={pJPDetail.description}
            onChange={e => {
              setPJPDetail({
                ...pJPDetail,
                description: e.target.value,
              })
            }}
          />
          <DialogActions>
            <Button
              className="dialogue_bottom_button"
              variant="contained"
              onClick={handleEditPJPDetail}
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

export default EditPJPDialog
