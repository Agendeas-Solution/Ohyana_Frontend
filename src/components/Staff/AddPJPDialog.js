import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  DialogActions,
  Dialog,
  Autocomplete,
  FormControl,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import './index.css'
import { GetAllClients } from '../../services/apiservices/clientDetail'
import { Context as ContextSnackbar } from '../../context/pageContext'

const AddPJPDialog = ({
  addPJPDetail,
  handleCloseDialog,
  setAddPJPDetail,
  handleAddPJPDetail,
}) => {
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const [searchQuery, setSearchQuery] = useState('')
  const [options, setOptions] = useState([])
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
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }, [searchQuery])
  useEffect(() => {
    addPJPDetail.pjpId && setSearchQuery(addPJPDetail.clientId.name)
  }, [])

  return (
    <>
      <Dialog open={addPJPDetail.dialogStatus} onClose={handleCloseDialog}>
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Add PJP</Typography>
          <FormControl>
            <Autocomplete
              filterSelectedOptions
              options={options}
              disabled={addPJPDetail?.pjpId}
              value={addPJPDetail?.clientId || null}
              onChange={(e, value) => {
                setAddPJPDetail({ ...addPJPDetail, clientId: value })
              }}
              onInputChange={e => {
                if (e?.target?.value !== '' && e?.target?.value) {
                  setSearchQuery(e.target.value)
                }
              }}
              getOptionLabel={option => option?.name}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Add Client Name"
                  className="dialogue_input_fields"
                />
              )}
            />
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
                placement: 'bottom-start',
              }}
            />
          </LocalizationProvider>
          <TextField
            className="dialogue_input_fields"
            multiline
            autoComplete="off"
            label="Detail"
            minRows={3}
            maxRows={3}
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
