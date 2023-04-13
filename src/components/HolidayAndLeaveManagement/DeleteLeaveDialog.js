import React, { useContext } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from '@mui/material'
import { Context as ContextSnackbar } from '../../context/pageContext'
const DeleteLeaveDialog = ({ setDeleteLeaveDialogControl, deleteLeaveDialogControl, handleDeleteLeave, handleLeaveDeleteDialog }) => {
    return (
        <>
            <Dialog
                open={deleteLeaveDialogControl.status}
                onClose={handleLeaveDeleteDialog}
            >
                <DialogTitle>Delete Leave</DialogTitle>
                <DialogContent>
                    <Typography variant="span">
                        Are You Sure you want to Delete this Leave ?
                    </Typography>
                </DialogContent>
                <DialogActions className="m-auto">
                    <Button
                        variant="contained"
                        onClick={handleDeleteLeave}
                    >
                        Ok
                    </Button>
                    <Button className="cancel-btn" onClick={handleLeaveDeleteDialog} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteLeaveDialog
