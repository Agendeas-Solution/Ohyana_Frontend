import React from 'react'
import {
    Box, Table,
    TableBody,
    TableCell,
    TableContainer, Button, Paper, TableHead, TableRow
} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const Orders = () => {
    const navigate = useNavigate()
    return (
        <>
            <Box className="main_section">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead stickyHeader>
                            <TableRow>
                                <TableCell align="right">Order Id</TableCell>
                                <TableCell align="right">Order For</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Total</TableCell>
                                <TableCell align="right">Delivery</TableCell>
                                <TableCell align="right">Payment</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow>
                                <TableCell align="right">complaint.id</TableCell>
                                <TableCell align="right">complaint.dealerName</TableCell>
                                <TableCell align="right">complaint.date</TableCell>
                                <TableCell align="right">complaint.description</TableCell>
                                <TableCell align="right">complaint.status</TableCell>
                                <TableCell align="right">
                                    {/* {row.feedback === "like" ? <img src={LikeIcon} alt="" /> : <img src={} alt="" />} */}
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell><Button
                                    className="common_button"
                                    onClick={() => {
                                        navigate("/");
                                    }}>View</Button></TableCell>
                            </TableRow>


                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default Orders