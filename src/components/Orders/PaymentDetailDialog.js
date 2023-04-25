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

  const [options, setOptions] = useState([])

  return (
    <>
      <Dialog open={openPaymentDetailDialog} onClose={handleClosePaymentDialog}>
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Payment Detail</Typography>

          <Box className="filter_body_section">
            <FormControl className="filter_body_inner_section">
              <FormLabel className="filter_body_inner_heading">
                Status
              </FormLabel>

              <RadioGroup
                // className="radio_button"
                row
                value={paymentDetail.status}
                onChange={e => {
                  setPaymentDetail({
                    ...paymentDetail,
                    status: e.target.value,
                  })
                }}
              >
                <Box className="checkbox_section">
                  <FormControlLabel
                    // sx={{
                    //   backgroundColor: '#f1f2f6',
                    //   borderRadius: '5px',
                    //   // width: '50%',
                    // }}
                    className="checkbox_background_color"
                    value="PENDING"
                    control={<Radio />}
                    label="Pending"
                  />
                  <FormControlLabel
                    className="checkbox_background_color"
                    // sx={{ backgroundColor: '#f1f2f6', borderRadius: '5px' }}
                    value="CONFIRMED"
                    control={<Radio />}
                    label="Confirmed"
                  />
                </Box>
              </RadioGroup>
            </FormControl>
          </Box>

          <Box>
            <Typography variant="span">Method</Typography>
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
