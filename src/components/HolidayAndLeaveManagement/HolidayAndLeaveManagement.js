import React from 'react'
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
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { MonthPicker } from '@mui/x-date-pickers/MonthPicker';
import { YearPicker } from '@mui/x-date-pickers/YearPicker';
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import './index.css';
const minDate = dayjs('2020-01-01T00:00:00.000');
const maxDate = dayjs('2034-01-01T00:00:00.000');
const HolidayAndLeaveManagement = () => {
    const [date, setDate] = React.useState(dayjs());
    return (
        <>
            <Box className='leave_holiday_section'>
                <Box className="occassional_holiday_section">
                    <Box className="w-50">
                        <Typography className="sub_heading" variant="span">Occasional Holiday</Typography>
                        <TableContainer className="mt-2" component={Paper}>
                            <Table>
                                <TableHead className="leave_holidays_table_header">
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell align="left">Occasion Name</TableCell>
                                        <TableCell align="left">Duration Day</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableCell>11-08-2022</TableCell>
                                    <TableCell align="left">Raksha Bandhan </TableCell>
                                    <TableCell align="left">1</TableCell>
                                    <TableCell align="left"><EditRoundedIcon className="icon" /></TableCell>
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
                    </Box>
                    <Box className="w-50" sx={{ maxHeight: "310px" }}>
                        <Button sx={{float:"right"}} className="leave_holiday_buttons" variant="contained">+ Leave</Button>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Grid item xs={12} md={6}>
                                <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
                            </Grid>
                        </LocalizationProvider>
                    </Box>
                </Box>
                <Box className="row mt-2 leave_holiday_row">
                    <Box className="leave_management_section">
                        <Box className="leave_management_header mb-2 mt-2">
                            <Typography className="sub_heading" variant="span">Leave Management</Typography>
                            <Button className="leave_holiday_buttons" variant="contained">+ Leave</Button>
                        </Box>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead className="leave_holidays_table_header">
                                    <TableRow>
                                        <TableCell>Type</TableCell>
                                        <TableCell align="left">Total</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableCell>Unpaid</TableCell>
                                    <TableCell align="left">3</TableCell>
                                    <TableCell align="right"><EditRoundedIcon className="icon" /></TableCell>
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
                    </Box>
                    <Box className="regular_holiday_section">
                        <Box className="regular_holiday_heading">
                            <Typography className="sub_heading" variant="span">Regular Holiday On</Typography>
                            <Button className="leave_holiday_buttons" variant="contained">+ Add</Button>
                        </Box>
                        <Box className="regular_holiday_heading">
                            <Typography variant="span">Sunday</Typography>
                            <EditRoundedIcon className="icon" />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default HolidayAndLeaveManagement