import React, { useEffect, useState, useContext } from "react";
import ProfileImg from "../../assets/img/profile_logo.png";
import { Box, Tab, Table, TableCell, TableContainer, Paper, TableRow, TableHead } from "@mui/material";
import TabList from "@mui/lab/TabList";
import TableBody from '@mui/material/TableBody';
import { useNavigate } from "react-router-dom";
import { Context as AuthContext } from "../../context/authContext/authContext";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
const HolidayData = () => {
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Date</TableCell>
                            <TableCell align="left">Occasion Name</TableCell>
                            <TableCell align="left">Duration Day</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableCell align="left">Date</TableCell>
                        <TableCell align="left">Leave Type</TableCell>
                        <TableCell align="left">Taken</TableCell>
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
        </>
    )
}

export default HolidayData