
import React, { useEffect, useState } from 'react'
import {
    Box,
    Typography,
    Button,
    TextField,
    DialogContent,
    DialogActions,
    Dialog,
    DialogTitle,
    TextareaAutosize,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import './index.css'
import { GetAdminClientDetail, UpdatePJPDetail } from '../../services/apiservices/clientDetail'
import moment from 'moment'
const EditPJPDialog = ({ editPJPDetail,
    setEditPJPDetail, pjpDetail, handlePJPDetail,
    handleEditPJPCloseDialog }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [options, setOptions] = useState([]);
    const [pJPDetail, setPJPDetail] = useState({
        pjpId: pjpDetail?.id,
        date: pjpDetail?.date,
        description: pjpDetail?.description,
    })
    useEffect(() => {
        let data = {
            size: 10
        }
        if (searchQuery !== "") {
            data["searchQuery"] = searchQuery
        }
        GetAdminClientDetail(
            data,
            res => {
                if (res?.success) {
                    setOptions(res?.data?.client)
                }
            },
            err => {
                console.log(err)
            },
        )
    }, [searchQuery])
    const handleEditPJPDetail = () => {
        UpdatePJPDetail(
            pJPDetail,
            res => {
                if (res?.success) {
                    handlePJPDetail();
                    handleEditPJPCloseDialog();
                }
            },
            err => {
                console.log(err)
            },
        )
    }
    return (

        <>
            <Dialog open={editPJPDetail.status} onClose={handleEditPJPCloseDialog}>
                <Box>
                    <DialogTitle
                        sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}
                    >
                        Create PJP
                    </DialogTitle>
                    <DialogContent>
                        <Box>
                            <div className="row my-4">
                                <div className="col-md-6">
                                    <Typography variant="span">Date of Visit</Typography>
                                </div>
                                <div className="col-md-12  ">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            className={`w-100`}
                                            disablePast
                                            inputFormat="dd/MM/yyyy"
                                            value={pJPDetail.date}
                                            onChange={(e) => {
                                                setPJPDetail({ ...pJPDetail, date: e })
                                            }}
                                            renderInput={params => (
                                                <TextField className={`w-100`} {...params} />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </Box>

                        <Box>
                            <div className="row my-4">
                                <div className="col-md-6">
                                    <Typography variant="span">Detail</Typography>
                                </div>
                                <div className="col-md-12">
                                    <TextareaAutosize
                                        style={{ width: 160, borderRadius: '5px' }}
                                        placeholder="Detail Here..."
                                        className="w-100"
                                        value={pJPDetail.description}
                                        onChange={(e) => {
                                            setPJPDetail({
                                                ...pJPDetail,
                                                description: e.target.value,
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                        </Box>
                    </DialogContent>

                    <DialogActions className="m-auto">
                        <Button
                            sx={{ alignContent: 'center', alignItems: 'center' }}
                            variant="contained"
                            onClick={handleEditPJPDetail}
                        >
                            Save
                        </Button>
                        {/* <Button className="cancel-btn" onClick={props.handleClose} autoFocus>
            Cancel
          </Button> */}
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}

export default EditPJPDialog
