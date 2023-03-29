import React, { useState } from 'react'

import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from '@mui/material'
import './index.css'

const PaymentDetailDialog = ({
  openPaymentDetailDialog,
  handleClosePaymentDialog,
  paymentMethodList,
  handleUpdatePaymentStatus,
}) => {
  const [paymentDetail, setPaymentDetail] = useState({
    status: '',
    method: '',
  })
  return (
    <>
      <Dialog open={openPaymentDetailDialog} onClose={handleClosePaymentDialog}>
        <DialogTitle
          sx={{ fontWeight: '600', fontSize: '24px' }}
          className="row justify-content-center font-weight-bold"
        >
          Payment Detail
        </DialogTitle>
        <Box className="my-2 mx-5">
          <div className="row">
            <div className="col-md-12">
              <FormControl>
                <FormLabel className="mb-1">Status</FormLabel>
                <RadioGroup
                  row
                  value={paymentDetail.status}
                  onChange={e => {
                    setPaymentDetail({
                      ...paymentDetail,
                      status: e.target.value,
                    })
                  }}
                >
                  <FormControlLabel
                    className="checkbox_button"
                    value="PENDING"
                    control={<Radio />}
                    label="Pending"
                  />
                  <FormControlLabel
                    className="checkbox_button"
                    value="CONFIRMED"
                    control={<Radio />}
                    label="Confirmed"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </Box>
        <Box className="my-2 mx-5">
          <Typography className="col-md-12" variant="span">
            Method
          </Typography>
          <Autocomplete
            // disablePortal
            value={paymentDetail.method}
            onChange={(e, value) =>
              setPaymentDetail({ ...paymentDetail, method: value })
            }
            options={paymentMethodList}
            sx={{
              height: 45,
              width: 350,
              border: '1px solid #E5E5E5',
              borderRadius: '5px',
              marginBottom: '10px',
            }}
            renderInput={params => (
              <TextField
                sx={{ fontSize: '15px' }}
                {...params}
                placeholder="Select Payment Method"
              />
            )}
          />
        </Box>
        <DialogActions className="m-auto">
          <Button
            // sx={{ paddingRight: '15px', paddingLeft: '15px' }}
            variant="contained"
            className="save_btn"
            onClick={() => handleUpdatePaymentStatus(paymentDetail)}
          >
            Save
          </Button>
          {/* <Button
            className="cancel-btn"
            autoFocus
            onClick={handleClosePaymentDialog}
          >
            Cancel
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PaymentDetailDialog
