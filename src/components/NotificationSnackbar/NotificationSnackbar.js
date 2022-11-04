import React,
{ useContext, useEffect } from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Context as ContextSnackbar } from "../../context/pageContext";
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import NorthEastIcon from '@mui/icons-material/NorthEast';
const MyApp = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { notificationSnackbar } = useContext(ContextSnackbar)?.state;

    const action = snackbarId => (
        <>
            <NorthEastIcon sx={{marginRight:1}} onClick={() => { navigate("/notification") }} />
            <CancelRoundedIcon sx={{ marginRight: 1 }} onClick={() => { closeSnackbar(snackbarId) }} />
        </>
    );

    useEffect(() => {
        {
            notificationSnackbar.status && enqueueSnackbar(notificationSnackbar?.heading, {
                action
            });
        }
        //debugger;
    }, [notificationSnackbar])

    return (
        <>
        </>
    );

    // const { notificationSnackbar } = useContext(ContextSnackbar)?.state;
    // const { setNotificationSnackbar } = useContext(ContextSnackbar);
    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setNotificationSnackbar({ ...notificationSnackbar, status: false });
    // };
    // return (
    //     <Snackbar open={notificationSnackbar.status} autoHideDuration={6000} onClose={handleClose}>
    //         <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
    //             {notificationSnackbar.heading}
    //             {notificationSnackbar.description}
    //         </Alert>
    //     </Snackbar>
    // )
}
export default function NotificationSnackbar() {

    return (
        <SnackbarProvider autoHideDuration={10000} variant="info" anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }} maxSnack={3}>
            <MyApp />
        </SnackbarProvider>
    );
}
