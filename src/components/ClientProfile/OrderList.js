import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from "@mui/material";
import moment from "moment";
import { GetSingleClientOrderList } from '../../services/apiservices/orderDetail';
import { useNavigate } from 'react-router-dom';
const OrderList = () => {
    const [orderList, setOrderList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let path = window.location.pathname;
        console.log("Printing Path of ", path);
        console.log("Printing ", path.split("/").pop());
        path = path.split("/").pop();
        GetSingleClientOrderList(parseInt(path), (res) => {
            setOrderList(res.data.orders);
            debugger;
        }, (err) => {
            console.log("Printing OrderList Error", err);
        })
    }, [])
    return (
        <>
            <TableContainer sx={{ height: "50vh" }} component={Paper}>
                <Table stickyHeader sx={{ minWidth: 650 }}>
                    <TableHead className="client_profile_table_header">
                        <TableRow>
                            <TableCell>Order Id.</TableCell>
                            <TableCell align="left">Order By</TableCell>
                            <TableCell align="left">Date</TableCell>
                            <TableCell align="left">Total Item</TableCell>
                            <TableCell align="left">Order Total</TableCell>
                            <TableCell>Delivery</TableCell>
                            <TableCell align="left">Payment</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderList.length > 0 && orderList.map((orderData) => {
                            return <TableRow
                                sx={{
                                    "&:last-child td, &:last-child th": { border: 0 },
                                }}
                            >
                                <TableCell scope="row">
                                    {orderData?.id}
                                </TableCell>
                                <TableCell align="left">{orderData?.team?.name}</TableCell>
                                <TableCell align="left">{moment(orderData?.date).format("Do MMM YY")}</TableCell>
                                <TableCell align="left">{orderData?.total_items}</TableCell>
                                <TableCell align="left">{orderData?.order_total}</TableCell>
                                <TableCell className="status_description" align="left">{orderData?.orderTrackingStatus}</TableCell>
                                <TableCell align="left" >
                                    {orderData?.paymentStatus}
                                </TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => {
                                        navigate(`/orderDetail/${orderData?.id}`)
                                    }} className='common_button'>View</Button>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default OrderList