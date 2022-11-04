import React from 'react'
import { Dialog, DialogActions, Button, Box, Typography } from '@mui/material';
import DeleteIcon from "../../assets/img/delete.png"
import './index.css';
const DeleteRemainder = (props) => {
    return (
        <>
            <Dialog
                open={props.deleteRemainderDialog}
                onClose={props.CloseDeleteRemainder}
            >
                <Box className="delete_remainder_dialog">
                    <Box className="delete_remainder_content">
                        <img src={DeleteIcon} alt="deleteicon" />
                        <Typography variant="h5">Delete Remainder</Typography>
                        <Typography variant='span'>Are You Sure you want to delete this Remainder?</Typography>
                    </Box>
                    <DialogActions>
                        <Button sx={{ margin: "0 auto", background: "#2E3591", width: "150px",textTransform:"capitalize" }} variant="contained" onClick={props.CloseDeleteRemainder} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}

export default DeleteRemainder