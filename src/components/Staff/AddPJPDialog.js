import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, TextField, DialogContent, DialogActions, Dialog, Autocomplete, CircularProgress } from '@mui/material'
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
}) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const onChangeHandle = async value => {
    // this default api does not support searching but if you use google maps or some other use the value and post to get back you reslut and then set it using setOptions 
    console.log(value);
    GetAdminClientDetail({ searchQuery: value }, (res) => {
      setOptions(res?.data?.client);
    }, (err) => {
      console.log(err);
    })
  };

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  // searchQuery
  return (
    <>
      <Dialog open={addPJPDetail.dialogStatus} onClose={handleCloseDialog}>
        <div className="px-3 pt-3 text-center">
          <h2>Create PJP</h2>
        </div>
        <DialogContent>
          <div className='row'>
            <div className="col-md-12">
              <Typography variant="span">Date</Typography>
            </div>
            <div className="col-md-12">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  inputFormat="dd/MM/yyyy"
                  value={addPJPDetail.date}
                  onChange={e => {
                    setAddPJPdetail({
                      ...addPJPDetail,
                      date: moment(e).format('YYYY-MM-DD'),
                    })
                  }}
                  renderInput={params => (
                    <TextField className={`w-100`} {...params} />
                  )}
                />
              </LocalizationProvider>
            </div>

          </div>
          <div className="row">
            <div className="col-md-12">
              <Typography variant="span">Customer Name</Typography>
            </div>
            <div className="col-md-12">
              <Autocomplete
                style={{ width: 300 }}
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                onChange={(event,value) => {
                  setAddPJPdetail({
                    ...addPJPDetail,
                    clientId: value.id,
                  })
                }}
                getOptionSelected={(option, value) => option.name === value.name}
                getOptionLabel={option => option.name}
                options={options}
                loading={loading}
                renderInput={params => (
                  <TextField
                    {...params}
                    // label="Select client"
                    variant="outlined"
                    noOptionsText="No Client"
                    onChange={(event) => {
                      // dont fire API if the user delete or not entered anything
                      if (event.target.value !== "" || event.target.value !== null) {
                        onChangeHandle(event.target.value);
                      }
                    }}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      )
                    }}
                  />
                )}
              />
              {/* <Autocomplete
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
              /> */}
            </div>
          </div>
          <div className="row">
            <Box className="col-md-4">
              <div className="col-md-12">
                <Typography variant="span">Latitude</Typography>
              </div>
              <div className="col-md-12">
                <TextField
                  className="w-100"
                  value={addPJPDetail.latitude}
                  onChange={e => {
                    setAddPJPdetail({
                      ...addPJPDetail,
                      latitude: (e.target.value).toString(),
                    })
                  }}
                  type="text"
                  variant="outlined"
                  placeholder="Latitude"
                />
              </div>
            </Box>
            <Box className="col-md-4">
              <div className="col-md-12">
                <Typography variant="span">Longitude</Typography>
              </div>
              <div className="col-md-12">
                <TextField
                  className="w-100"
                  value={addPJPDetail.longitude}
                  onChange={e => {
                    setAddPJPdetail({
                      ...addPJPDetail,
                      longitude: (e.target.value).toString(),
                    })
                  }}
                  type="text"
                  variant="outlined"
                  placeholder="Longitude"
                />
              </div>
            </Box>
            <Box className="col-md-4 align-items-center">
              <Button className="common_button" onClick={getLocation}>
                Get Location
              </Button>
            </Box>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Typography variant="span">Description</Typography>
            </div>
            <div className="col-md-12">
              <TextField
                className="w-100"
                value={addPJPDetail.description}
                onChange={e => {
                  setAddPJPdetail({
                    ...addPJPDetail,
                    description: e.target.value,
                  })
                }}
                type="text"
                variant="outlined"
                placeholder="Description"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions
          sx={{ marginLeft: '13px', marginRight: '13px' }}
          className="mt-1 d-flex justify-content-between"
        >
          <Button
            variant="contained"
            className="ok-btn"
            onClick={handleAddPJPDetail}
          >
            Ok
          </Button>
          <Button onClick={handleCloseDialog} className="cancel-btn" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddPJPDialog
