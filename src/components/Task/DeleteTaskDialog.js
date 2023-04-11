import React from 'react'
import {
    Dialog,
    DialogActions,
    Button,
    Box,
    Typography,
    TextField,
} from '@mui/material'
import './index.css'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
const DeleteTaskDialog = ({ DeleteTask, deleteTaskDialog, handleDeleteDialogClose }) => {
    return (
        <>
            <Dialog
                open={deleteTaskDialog.status}
                onClose={handleDeleteDialogClose}
            >
                <Box className="client_appointment_dialog">
                    <Box className="client_appointment_content">
                        <DeleteOutlinedIcon className="delete_Icon" />
                        <Typography variant="h5" sx={{ fontWeight: '500' }}>
                            Delete Task
                        </Typography>
                        <Typography
                            sx={{ marginTop: '10px', marginBottom: '10px' }}
                            variant="span"
                        >Are you sure, you want to delete this task?
                        </Typography>
                    </Box>
                    <DialogActions>
                        <Button
                            sx={{
                                boxShadow: 'none !important',
                                margin: '0 auto',
                                background: '#F11F12',
                                width: '150px',
                                fontSize: '15px',
                                fontWeight: '600',
                                textTransform: 'capitalize',
                            }}
                            variant="contained"
                            onClick={DeleteTask}
                            autoFocus
                        >Ok
                        </Button>
                        <Button
                            sx={{
                                boxShadow: 'none !important',
                                margin: '0 auto',
                                background: '#f1f2f6',
                                color: 'black',
                                width: '150px',
                                fontSize: '15px',
                                fontWeight: '600',
                                textTransform: 'capitalize',
                            }}
                            variant="contained"
                            onClick={handleDeleteDialogClose}
                            autoFocus
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}

export default DeleteTaskDialog
