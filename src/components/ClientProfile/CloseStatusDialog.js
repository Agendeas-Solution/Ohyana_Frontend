import React, { useState, useContext, useEffect } from 'react'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Typography,
    TextareaAutosize,
} from '@mui/material'
import { AddCloseStatusApiCall } from '../../services/apiservices/adminprofile'
import { Context as ContextSnackbar } from '../../context/pageContext'
const CloseStatusDialog = ({ handleCloseStatusDialogClose,
    closeStatusDialogControl, setCloseStatusDialogControl }) => {
    const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
    const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
    const addCloseStatus = () => {
        let data = closeStatusDialogControl;
        delete data.status;
        debugger;
        AddCloseStatusApiCall(
            data,
            res => {
                setSuccessSnackbar({
                    ...successSnackbar,
                    status: true,
                    message: res.message,
                })
                setCloseStatusDialogControl({ ...closeStatusDialogControl, description: "" })
                handleCloseStatusDialogClose()
            },
            err => {
                console.log(err);
            },
        )
    }

    return (
        <>
            <Dialog open={closeStatusDialogControl.status} onClose={handleCloseStatusDialogClose}>
                <Box style={{ textAlign: 'center' }} className="px-3 pt-3">
                    <h4 style={{ fontWeight: '600' }}>Close Status   </h4>
                </Box>
                <DialogContent>
                    <Box>
                        <Box className="row">
                            <Box className="col-md-12">
                                <Typography variant="span">
                                    Reason<span className="required_star">*</span>
                                </Typography>
                            </Box>
                            <Box className="col-md-12">
                                <TextareaAutosize
                                    value={closeStatusDialogControl.description}
                                    className="w-100"
                                    sx={{ borderRadius: '10px' }}
                                    onChange={e =>
                                        setCloseStatusDialogControl({
                                            ...closeStatusDialogControl,
                                            description: e.target.value,
                                        })
                                    }
                                    placeholder="Reason Here..."
                                />
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" className='ok-btn' onClick={addCloseStatus}>
                        Ok
                    </Button>
                    <Button className='cancel-btn' onClick={handleCloseStatusDialogClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CloseStatusDialog