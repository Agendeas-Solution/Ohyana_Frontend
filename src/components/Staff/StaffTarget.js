import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetTargetList } from '../../services/apiservices/teamcall';
import SetTargetDialog from './SetTargetDialog';
const StaffTarget = () => {
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: '',
    });
    const [targetDetail, setTargetDetail] = useState({
        status: false,
        period: "",
        value: "",
        toAchieve: ""
    })
    const [targetList, setTargetList] = useState([]);

    useEffect(() => {
        let path = window.location.pathname;
        console.log("Printing Path of ", path);
        console.log("Printing ", path.split("/").pop());
        path = path.split("/").pop();
        GetTargetList(
            path,
            (res) => {
                if (res.status === 200) {
                    setTargetList(res?.data);
                    debugger;
                }
            },
            (err) => {
                console.log("Printing ", err);
            }
        );
    }, [])
    return (
        <>
            <Box className="target_section">
                <Box className="attendance_data_row col-md-12">
                    <Box className="col-md-7 attendance_data_row"
                    >
                        <Box className="week_data days_data col-md-3">
                            <Typography variant="span">This Week</Typography>
                            <Typography variant="span">15-07-2022</Typography>
                        </Box>
                        <Box className="target_order_data days_data col-md-3">
                            <Typography variant="span">Target order</Typography>
                            <Typography variant="span">400</Typography>
                        </Box>
                        <Box className="target_achieved_data days_data col-md-3">
                            <Typography variant="span">Achieved</Typography>
                            <Typography variant="span">24</Typography>
                        </Box>
                        <Box className="Late_days_data days_data col-md-3">
                            <Typography variant="span">Days Remain</Typography>
                            <Typography variant="span">24</Typography>
                        </Box>
                    </Box>
                    <Box className="range_days_data col-md-3">
                        <Box>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    disablePast
                                    inputFormat="dd/MM/yyyy"
                                    value={dateRange.startDate}
                                    onChange={(e) => {
                                        setDateRange({ ...dateRange, startDate: e });
                                    }}
                                    renderInput={(params) => <TextField sx={{ border: "transparent" }} {...params} />}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                    <Button onClick={
                       ()=>setTargetDetail({...targetDetail,status:true}) 
                    } className="common_button">Set Target</Button>
                </Box>
                <TableContainer className="mt-2" component={Paper} sx={{ boxShadow: "none" }}>
                    <Table sx={{ minWidth: 650 }} className="table_heading">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="left">Period</TableCell>
                                <TableCell align="left">Type</TableCell>
                                <TableCell align="left">Given</TableCell>
                                <TableCell align="left">Achieve</TableCell>
                                <TableCell align="left">Extra/Left</TableCell>
                                <TableCell align="left">Target</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {targetList.map((targetData) => {
                                return <TableRow>
                                    <TableCell>{moment(targetData?.startDate).format("D-M") + " to " + moment(targetData?.endDate).format("D-M-YY")} </TableCell>
                                    <TableCell align="left">{targetData?.period} days</TableCell>
                                    <TableCell align="left">{targetData?.type}</TableCell>
                                    <TableCell align="left">500Given</TableCell>
                                    <TableCell align="left">{targetData?.achieve}</TableCell>
                                    <TableCell align="left">{targetData?.target}</TableCell>
                                    <TableCell align="left">{targetData?.state}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {targetDetail.status && <SetTargetDialog targetDetail={targetDetail}/>}
            </Box>
        </>
    )
}

export default StaffTarget