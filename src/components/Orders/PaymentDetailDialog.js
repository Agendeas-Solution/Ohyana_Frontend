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
  InputLabel,
  Select,
  MenuItem,
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
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Payment Detail</Typography>
          <Box className="order_payment_details">
            <FormControl className="filter_body_inner_section">
              <FormLabel sx={{ marginBottom: '10px', color: '#000000' }}>
                Status
              </FormLabel>
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
                <Box>
                  <FormControlLabel
                    sx={{
                      backgroundColor: '#f1f2f6',
                      borderRadius: '5px',
                      paddingRight: '35px',
                    }}
                    value="PENDING"
                    control={<Radio />}
                    label="Pending"
                  />
                  <FormControlLabel
                    sx={{
                      backgroundColor: '#f1f2f6',
                      borderRadius: '5px',
                      paddingRight: '35px',
                    }}
                    value="CONFIRMED"
                    control={<Radio />}
                    label="Confirmed"
                  />
                </Box>
              </RadioGroup>
            </FormControl>
          </Box>
          <Box>
            <Typography sx={{ marginLeft: '5px' }}>Method</Typography>
            <Autocomplete
              value={paymentDetail.method}
              onChange={(e, value) =>
                setPaymentDetail({ ...paymentDetail, method: value })
              }
              options={paymentMethodList}
              renderInput={params => (
                <TextField
                  className="dialogue_input_fields"
                  sx={{ fontSize: '15px' }}
                  {...params}
                  placeholder="Select Payment Method"
                />
              )}
            />
          </Box>
          <DialogActions className="m-auto">
            <Button
              variant="contained"
              className="dialogue_bottom_button"
              onClick={() => handleUpdatePaymentStatus(paymentDetail)}
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default PaymentDetailDialog
