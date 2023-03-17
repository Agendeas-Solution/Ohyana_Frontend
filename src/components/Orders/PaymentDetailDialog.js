import React,{useState} from 'react'
import { Box, Typography, Button, TextField, FormControl, Autocomplete, Dialog, DialogActions, DialogTitle, FormControlLabel, FormLabel, RadioGroup, Radio } from "@mui/material";
const PaymentDetailDialog = ({ openPaymentDetailDialog, handleClosePaymentDialog, paymentMethodList, handleUpdatePaymentStatus }) => {
    const [paymentDetail, setPaymentDetail] = useState({
        status: "",
        method: ""
    })
    return (
        <>
            <Dialog
                open={openPaymentDetailDialog}
                onClose={handleClosePaymentDialog}
            >
                <DialogTitle className="row justify-content-center font-weight-bold">
                    Payment Detail
                </DialogTitle>
                <Box className="my-3">
                    <div className="row">
                        <div className="col-md-12">
                            <FormControl>
                                <FormLabel >Status</FormLabel>
                                <RadioGroup
                                    row
                                    value={paymentDetail.status}
                                    onChange={(e) => {
                                        setPaymentDetail({ ...paymentDetail, status: e.target.value })
                                    }}
                                >
                                    <FormControlLabel value="PENDING" control={<Radio />} label="Pending" />
                                    <FormControlLabel value="CONFIRMED" control={<Radio />} label="Confirmed" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </Box>
                <Box>
                    <Typography className="col-md-12" variant="span">Method</Typography>
                    <Autocomplete
                        disablePortal
                        value={paymentDetail.method}
                        onChange={(e,value) => setPaymentDetail({ ...paymentDetail, method:value })}
                        options={paymentMethodList}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} placeholder="Select Payment Method" />}
                    />
                </Box>
                <DialogActions className="m-auto">
                    <Button
                        variant="contained"
                        className="ok-btn"
                        onClick={() =>
                            handleUpdatePaymentStatus(paymentDetail)
                        }
                    >
                        Ok
                    </Button>
                    <Button
                        className="cancel-btn"
                        autoFocus
                        onClick={handleClosePaymentDialog}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default PaymentDetailDialog