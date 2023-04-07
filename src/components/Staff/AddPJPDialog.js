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

const AddPJPDialog = ({
  addPJPDetail,
  handleCloseDialog,
  setAddPJPdetail,
  handleAddPJPDetail,
  getLocation,
  props,
}) => {
  const [customerType, setCustomerType] = useState([
    { stage: 'Jr. Sales Person', id: 0 },
    { stage: 'Sr. Sales Person', id: 1 },
    { stage: 'Ass. Sales Person', id: 2 },
    { stage: 'None', id: 3 },
  ])

  const [customerStage, setCustomerStage] = useState()

  const [pjpDetail, setPjpDetail] = useState({
    name: props?.editJobRoleDialogControl?.name,
    description: props?.editJobRoleDialogControl.description,
    departmentId: props?.editJobRoleDialogControl?.departmentId,
    id: props?.editJobRoleDialogControl?.roleId,
  })

  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const loading = open && options.length === 0

  const onChangeHandle = async value => {
    // this default api does not support searching but if you use google maps or some other use the value and post to get back you reslut and then set it using setOptions
    console.log(value)
    GetAdminClientDetail(
      { searchQuery: value },
      res => {
        setOptions(res?.data?.client)
      },
      err => {
        console.log(err)
      },
    )
  }

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  // searchQuery
  return (
    <>
      <Dialog open={addPJPDetail.dialogStatus} onClose={handleCloseDialog}>
        {/* <div className="px-3 pt-3 text-center">
          <h2>Create PJP</h2>
        </div> */}
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
              options={customerType}
              value={
                customerStage !== null ? customerType[customerStage] : null
              }
              sx={{
                width: '21rem',
                border: '1px solid #E5E5E5',
                borderRadius: '5px',
              }}
              onChange={(e, value) => {
                console.log(value)
                setCustomerStage(value?.id)
              }}
              getOptionLabel={option => option.stage}
              renderInput={params => (
                <TextField
                  // className="m-3"
                  variant="outlined"
                  // sx={{ width: '24rem' }}
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
                      value={pjpDetail.date}
                      onChange={e => {
                        setPjpDetail({ ...pjpDetail, date: e })
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
                    value={pjpDetail.description}
                    onChange={e => {
                      setPjpDetail({
                        ...pjpDetail,
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
              // onClick={handleEditJobRole}
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
