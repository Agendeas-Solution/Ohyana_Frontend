import React from 'react'
import { Box, Dialog, Select, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Typography, TextField } from '@mui/material';
import Button from '@mui/material/Button';
const AddNotification = (props) => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <>
            <Dialog
                open={props.AddNotificationDialog}
                onClose={props.handleClose}
            >
                <DialogTitle>
                    Set Notification
                </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText> */}
                    <Box className="input_fields">
                        <Typography variant="span">Department</Typography>
                        <Select
                            id="demo-simple-select"
                            value={age}
                            onChange={handleChange}
                            placeholder="Select Department"
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </Box>
                    <Box className="input_fields">
                        <Typography variant="span">Job Role</Typography>
                        <Select
                            value={age}
                            onChange={handleChange}
                            placeholder="Select Job Role"
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </Box>
                    <Box className="input_fields">
                        <Typography variant="span">Notification Type</Typography>
                        <Select
                            value={age}
                            onChange={handleChange}
                            placeholder="Select Notification Type"
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </Box>
                    <Box className="input_fields">
                        <Typography variant="span">Heading</Typography>
                        <TextField variant="outlined" placeholder="Heading" />
                    </Box>
                    <Box className="input_fields">
                        <Typography variant="span">Description</Typography>
                        <TextField variant="outlined" placeholder="Description Here" />
                    </Box>
                    <Box className="input_fields">
                        <Typography variant="span">Attachment</Typography>
                        <input type="file" multiple/>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ margin: "0 auto", background: "#2E3591", width: "150px" }} variant="contained" onClick={props.handleClose} autoFocus>
                        Sent
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddNotification