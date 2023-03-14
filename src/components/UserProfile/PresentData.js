import React, { useEffect, useState, useContext } from "react";
import ProfileImg from "../../assets/img/profile_logo.png";
import { Box, Tab, Table, TableCell, TableContainer, Paper, TableRow, TableHead } from "@mui/material";
import TabList from "@mui/lab/TabList";
import TableBody from '@mui/material/TableBody';
import { useNavigate } from "react-router-dom";
import { Context as AuthContext } from "../../context/authContext/authContext";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import moment from 'moment';
const PresentData = ({ staffAttendanceList }) => {
    return (
        <><TableContainer sx={{ width: "70%", boxShadow: "none" }} component={Paper}>
            <Table >
                <TableHead className="team_overview_table_heading">
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="left">Check In</TableCell>
                        <TableCell align="left">Check Out</TableCell>
                        <TableCell align="left">Break In</TableCell>
                        <TableCell align="left">Break Out</TableCell>
                        <TableCell align="left">Working Hours</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {staffAttendanceList?.attendancePerUser.length > 0 && staffAttendanceList.attendancePerUser.map((attendanceList) => {
                        return <TableRow
                            key={attendanceList.id}
                            sx={{ '&:last-child td,th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {moment(attendanceList.date).format('D/MM/YY')}
                            </TableCell>
                            <TableCell align="left">{attendanceList.checkIn}</TableCell>
                            <TableCell align="left">{attendanceList.checkOut}</TableCell>
                            <TableCell align="left">{attendanceList.breakIn}</TableCell>
                            <TableCell align="left">{attendanceList.breakOut}</TableCell>
                            <TableCell align="left">{attendanceList.totalHours}</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}

export default PresentData