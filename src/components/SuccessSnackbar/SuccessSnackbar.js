import React,
{ useContext } from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Context as  ContextSnackbar } from "../../context/pageContext";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const SuccessSnackbar = () => {
    const { successSnackbar } = useContext( ContextSnackbar)?.state;
    const { setSuccessSnackbar } = useContext( ContextSnackbar);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessSnackbar({ ...successSnackbar, status: false });
    };
    return (
        <Snackbar open={successSnackbar.status} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {successSnackbar.message}
            </Alert>
        </Snackbar>
    )
}
export default SuccessSnackbar