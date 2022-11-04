import { React } from 'react'
import { Dialog, DialogActions, Button, Box, Typography, TextField } from '@mui/material';
import './index.css';

const ClientAppointment = (props) => {
    return (
        <Dialog
            open={props.deleteRemainderDialog}
            onClose={props.CloseDeleteRemainder}
        >
            <Box className="client_appointment_dialog">
                <Box className="client_appointment_content">
                    <Typography variant="h5">Appointment</Typography>
                    <Typography variant="span">Date</Typography>
                    <TextField variant="outlined" />

                    <Typography variant="span">Time</Typography>
                    <TextField variant="outlined" />
                </Box>
                <DialogActions>
                    <Button sx={{ margin: "0 auto", background: "#2E3591", width: "150px", textTransform: "capitalize" }} variant="contained" onClick={props.CloseDeleteRemainder} autoFocus>
                        Request
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}

export default ClientAppointment