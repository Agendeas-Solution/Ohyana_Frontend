import React from 'react';
import { Dialog, DialogActions, Button, Box, Typography, TextField } from '@mui/material';
import './index.css';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
const CancelAppointmentDialog = (props) => {
    return (
        <>
            <Dialog
                open={props.deleteRemainderDialog}
                onClose={props.CloseDeleteRemainder}
            >
                <Box className="client_appointment_dialog">
                    <Box className="client_appointment_content">
                        <CancelRoundedIcon className="CancelIcon"/>
                        <Typography variant="h5" sx={{fontWeight:"500"}}>Cancel Appointment</Typography>
                        <Typography sx={{marginTop:"10px",marginBottom:"10px"}} variant='span'>Are You Sure you want to Cancel this Appointment?</Typography>
                    </Box>
                    <DialogActions>
                        <Button sx={{ margin: "0 auto", background: "#F11F12", width: "150px", textTransform: "capitalize" }} variant="contained" onClick={props.CloseDeleteRemainder} autoFocus>
                            Ok
                        </Button>
                        <Button sx={{ margin: "0 auto", background: "#2E3591", width: "150px", textTransform: "capitalize" }} variant="contained" onClick={props.CloseDeleteRemainder} autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}

export default CancelAppointmentDialog