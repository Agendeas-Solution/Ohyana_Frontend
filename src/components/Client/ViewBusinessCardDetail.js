import React, { useEffect, useState,useContext } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography, Box
} from "@mui/material";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { DeleteBusinessCard, GetBusinessDetail } from '../../services/apiservices/clientDetail';
import { Context as ContextSnackbar } from "../../context/pageContext";
import moment from 'moment';
import AddStatusDialog from './AddStatusDialog';
const ViewBusinessCardDetail = ({ viewBusinessCardDialog, handleDialogClose }) => {
    const [addStatus, setAddStatus] = useState({
        status: false,
    });
    const { successSnackbar } = useContext(ContextSnackbar)?.state;
    const { setSuccessSnackbar } = useContext(ContextSnackbar);
    const [businessDetail, setBusinessDetail] = useState({});
    let imageLink = `${process.env.REACT_APP_API_CALL_URL}/file/${businessDetail?.imageUrl}`
    useEffect(() => {
        {
            viewBusinessCardDialog?.id && GetBusinessDetail(viewBusinessCardDialog?.id, (res) => {
                setBusinessDetail(res.data);
            }, (err) => {
                debugger
            })
        }
    }, [viewBusinessCardDialog?.id])
    const handleDialogOpen = () => {
        setAddStatus({ ...addStatus, status: false })
    }
    const handleDeleteBusinessCard = () => {
        DeleteBusinessCard(viewBusinessCardDialog?.id, (res) => {
            setBusinessDetail(res.data);
            setSuccessSnackbar({ ...successSnackbar, status: true, message: res.data.message })
            handleDialogClose();
        }, (err) => {
            debugger
        })
    }

    return (
        <div>
            <Dialog
                open={viewBusinessCardDialog.status}
                onClose={handleDialogClose}
            >
                <Box className="common_row"> <Typography className="business_detail_dialog_title" variant="span">Card Detail</Typography>
                    <Box>
                        <Button onClick={() => setAddStatus({ ...addStatus, status: true })} disableElevation className="common_button" variant='contained'>Add Status</Button>
                        <Button disableElevation className="common_button" variant='contained' onClick={handleDeleteBusinessCard}><DeleteRoundedIcon /></Button>
                    </Box>
                </Box>
                <DialogContent>
                    <Box className="business_card_dialog_section">
                        <img className="business_card" src={imageLink} alt="" />
                        <Box className="common_row">
                            <Typography className="text-align-center fw-bold" variant="span">Added By: </Typography>
                            <Typography className="text-align-center" variant="span">{businessDetail?.team?.name} </Typography>
                        </Box>
                        <Box className="common_row">
                            <Typography className="text-align-center fw-bo  ld" variant="span">Arrival Date: </Typography>
                            <Typography className="text-align-center" variant="span">{
                                moment(businessDetail?.arrivalDate).format("D/M/YY")
                            }</Typography>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
            {addStatus.status && <AddStatusDialog businessDetail={businessDetail} handleDialogOpen={handleDialogOpen} addStatus={addStatus} setAddStatus={setAddStatus} />}
        </div>
    )
} 

export default ViewBusinessCardDetail