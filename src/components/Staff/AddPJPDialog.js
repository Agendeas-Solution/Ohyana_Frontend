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
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import './index.css'
import { GetAdminClientDetail } from '../../services/apiservices/clientDetail'
import moment from 'moment'
import { CreatePJP } from '../../services/apiservices/teamcall'
const AddPJPDialog = ({
  addPJPDetail,
  handleCloseDialog,
  setAddPJPDetail,
  handleAddPJPDetail,
}) => {
  const [customerType, setCustomerType] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const [customerStage, setCustomerStage] = useState()
  const loading = open && options.length === 0
  useEffect(() => {
    let data = {
      size: 10
    }
    if (searchQuery !== "") {
      data["searchQuery"] = searchQuery
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
  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <>
      <Dialog open={addPJPDetail.dialogStatus} onClose={handleCloseDialog}>
        <Box>
          <DialogTitle
            sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}
          >
            Create PJP
          </DialogTitle>
          <DialogContent>
            <div className="col-md-12 pt-4">
              <Typography variant="span">Customer Name</Typography>
            </div>
            <Autocomplete
              className="mt-1 align-items-center d-flex client_type_select justify-content-center w-100"
              options={options}
              value={
                // customerStage !== null ? customerType[customerStage] : null
                options.find(e => e.id == addPJPDetail?.clientId)?.name
              }
              sx={{
                width: '21rem',
                border: '1px solid #E5E5E5',
                borderRadius: '5px',
              }}
              onInputChange={(event, newInputValue) => {
                setSearchQuery(newInputValue);
              }}
              onChange={(e, value) => setAddPJPDetail({ ...addPJPDetail, clientId: value?.id })}
              getOptionLabel={option => option?.name}
              renderInput={params => (
                <TextField
                  variant="outlined"
                  {...params}
                  placeholder="Customer Name"
                />
              )}
            />

            <Box>
              <div className="row my-4">
                <div className="col-md-6">
                  <Typography variant="span">Date of Visit</Typography>
                </div>
                <div className="col-md-12  ">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      className={`w-100`}
                      disablePast
                      inputFormat="dd/MM/yyyy"
                      value={addPJPDetail.date}
                      onChange={e => {
                        setAddPJPDetail({ ...addPJPDetail, date: e })
                      }}
                      renderInput={params => (
                        <TextField className={`w-100`} {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </Box>

            <Box>
              <div className="row my-4">
                <div className="col-md-6">
                  <Typography variant="span">Detail</Typography>
                </div>
                <div className="col-md-12">
                  <TextareaAutosize
                    style={{ width: 160, borderRadius: '5px' }}
                    placeholder="Detail Here..."
                    className="w-100"
                    value={addPJPDetail.description}
                    onChange={e => {
                      setAddPJPDetail({
                        ...addPJPDetail,
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
              sx={{ alignContent: 'center', alignItems: 'center' }}
              variant="contained"
              onClick={handleAddPJPDetail}
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

export default AddPJPDialog

{
  /* <Autocomplete
                filterSelectedOptions
                options={addPJPDetail}
                value={addPJPDetail?.clientId}
                onChange={(e, value) => {
                  console.log(value)
                  setAddPJPdetail({
                    ...addPJPDetail,
                    clientId: value,
                  })
                }}
                getOptionLabel={option => option}
                renderInput={params => (
                  <TextField
                    {...params}
                    className="w-100"
                    placeholder={
                      addPJPDetail.clientId
                        ? ''
                        : 'Add Member'
                    }
                  />
                )}
              /> */
}
