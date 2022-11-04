import React, { useState } from 'react'
import './index.css';
import { Box, Typography, Button, TextField } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const StaffAttendance = () => {
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: '',
    });
    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <><Box>
            <Box className="attendance_data_row col-md-12">
                <Box className="total_days_data days_data col-md-2">
                    <Typography variant="span">Total Days</Typography>
                    <Typography variant="span">24</Typography>
                </Box>
                <Box className="Absent_days_data days_data col-md-2">
                    <Typography variant="span">Absent Days</Typography>
                    <Typography variant="span">24</Typography>
                </Box>
                <Box className="Late_days_data days_data col-md-2">
                    <Typography variant="span">Late Days</Typography>
                    <Typography variant="span">24</Typography>
                </Box>
                <Box className="range_days_data days_data col-md-6">
                    <Typography variant="span">Select Date Range</Typography>
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disablePast
                                inputFormat="dd/MM/yyyy"
                                value={dateRange.startDate}
                                onChange={(e) => {
                                    setDateRange({ ...dateRange, startDate: e });
                                }}
                                renderInput={(params) => <TextField className='w-50' {...params} />}
                            />
                            <DatePicker
                                disablePast
                                inputFormat="dd/MM/yyyy"
                                minDate={dateRange.startDate}
                                value={dateRange.endDate}
                                onChange={(e) => {
                                    setDateRange({ ...dateRange, endDate: e });
                                }}
                                renderInput={(params) => <TextField className='w-50' {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>
            </Box>
            <TabContext value={value}>
                <Box className="tab_row">
                    <TabList
                        className="client_profile_tab mb-2"
                        onChange={handleChange}
                    >
                        <Tab label="Present" value="1" />
                        <Tab label="Leave" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    {/* <StaffDetail adminProfileDetail={adminProfileDetail} /> */}
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell align="left">Check In</TableCell>
                                    <TableCell align="left">Check Out</TableCell>
                                    <TableCell align="left">Break Time</TableCell>
                                    <TableCell align="left">Working Hours</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableCell>Date</TableCell>
                                <TableCell align="left">Check In</TableCell>
                                <TableCell align="left">Check Out</TableCell>
                                <TableCell align="left">Break Time</TableCell>
                                <TableCell align="left">Working Hours</TableCell>
                                {/* {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.calories}</TableCell>
                                        <TableCell align="left">{row.fat}</TableCell>
                                        <TableCell align="left">{row.carbs}</TableCell>
                                        <TableCell align="left">{row.protein}</TableCell>
                                    </TableRow>
                                ))} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
                <TabPanel value="2">
                    {/* <StaffAttendance /> */}
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Date</TableCell>
                                    <TableCell align="left">Leave Type</TableCell>
                                    <TableCell align="left">Taken</TableCell>
                                    <TableCell align="left">Remain</TableCell>
                                    <TableCell align="left">Status</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="left">Leave Type</TableCell>
                                <TableCell align="left">Taken</TableCell>
                                <TableCell align="left">Remain</TableCell>
                                <TableCell align="left">Status</TableCell>
                                {/* {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.calories}</TableCell>
                                        <TableCell align="left">{row.fat}</TableCell>
                                        <TableCell align="left">{row.carbs}</TableCell>
                                        <TableCell align="left">{row.protein}</TableCell>
                                    </TableRow>
                                ))} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
            </TabContext>
        </Box></>
    )
}

export default StaffAttendance