import React,
{ useContext } from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Context as ContextSnackbar } from "../../context/pageContext";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ErrorSnackbar = () => {
    const { errorSnackbar } = useContext(ContextSnackbar)?.state;
    const { setErrorSnackbar } = useContext(ContextSnackbar);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorSnackbar({ ...errorSnackbar, status: false });
    };
    return (
        <Snackbar open={errorSnackbar.status} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {errorSnackbar.message}
            </Alert>
        </Snackbar>
    )
}
export default ErrorSnackbar