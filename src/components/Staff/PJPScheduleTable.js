import React from 'react'
import { Button } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const PJPScheduleTable = () => {
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Sr No.</TableCell>
                            <TableCell align="left">Customer Name</TableCell>
                            <TableCell align="left">Business Name</TableCell>
                            <TableCell align="left">Contact Number</TableCell>
                            <TableCell align="left">City</TableCell>
                            <TableCell align="left">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableCell align="left">Date</TableCell>
                        <TableCell align="left">Leave Type</TableCell>
                        <TableCell align="left">Taken</TableCell>
                        <TableCell align="left">Remain</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left"><Button className="common_button">View</Button></TableCell>

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default PJPScheduleTable