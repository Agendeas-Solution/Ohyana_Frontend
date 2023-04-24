import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  DialogContent,
  DialogActions,
  Dialog,
  Autocomplete,
  CircularProgress,
  DialogTitle,
  TextareaAutosize,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import './index.css'
import { GetAdminClientDetail } from '../../services/apiservices/clientDetail'
import moment from 'moment'

const AddPJPDialog = ({
  addPJPDetail,
  handleCloseDialog,
  setAddPJPDetail,
  handleAddPJPDetail,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [options, setOptions] = useState([])

  useEffect(() => {
    let data = {
      size: 10,
    }
    if (searchQuery !== '') {
      data['searchQuery'] = searchQuery
    }
    GetAdminClientDetail(
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

  return (
    <>
      <Dialog open={addPJPDetail.dialogStatus} onClose={handleCloseDialog}>
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Add PJP</Typography>

          <FormControl>
            <InputLabel className="dialogue_input_fields">
              Client Type
            </InputLabel>
            <Select
              label="Select Client"
              className="dialogue_input_fields"
              value={addPJPDetail?.clientId}
              onChange={e => {
                setAddPJPDetail({ ...addPJPDetail, clientId: e.target.value })
              }}
            >
              {options.map(data => {
                return <MenuItem value={data.id}>{data.name}</MenuItem>
              })}
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="dd/MM/yyyy"
              value={addPJPDetail.date}
              onChange={e => {
                setAddPJPDetail({ ...addPJPDetail, date: e })
              }}
              renderInput={params => (
                <TextField {...params} className="dialogue_input_fields" />
              )}
              PopperProps={{
                placement: 'bottom-start', // Set placement to 'bottom-start'
              }}
            />
          </LocalizationProvider>

          <TextField
            className="dialogue_input_fields"
            multiline
            autoComplete="off"
            label="Detail"
            minRows={3}
            placeholder="Detail Here..."
            value={addPJPDetail.description}
            onChange={e => {
              setAddPJPDetail({
                ...addPJPDetail,
                description: e.target.value,
              })
            }}
          />

          <DialogActions>
            <Button
              className="dialogue_bottom_button"
              variant="contained"
              onClick={handleAddPJPDetail}
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default AddPJPDialog
