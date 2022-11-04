import React from 'react'
import {
    Box,
    Typography,
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
const OrderList = () => {
    return (
        <>
            <TableContainer sx={{ height: "50vh" }} component={Paper}>
                <Table stickyHeader sx={{ minWidth: 650 }}>
                    <TableHead className="client_profile_table_header">
                        <TableRow>
                            <TableCell>Sr No.</TableCell>
                            <TableCell align="left">Cart Add By</TableCell>
                            {/* <TableCell align="left">Job Role</TableCell> */}
                            {/* <TableCell align="left">Audio</TableCell> */}
                            <TableCell align="left">Date</TableCell>
                            <TableCell align="left">Total Item</TableCell>
                            <TableCell align="left">Cart Total</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            // key={index}
                            sx={{
                                "&:last-child td, &:last-child th": { border: 0 },
                            }}
                        >
                            <TableCell scope="row">
                                {/* {index + 1} */}
                            </TableCell>
                            <TableCell align="left">row?.team?.name</TableCell>
                            {/* <TableCell align="left">
                          {row?.team?.role?.name}
                        </TableCell> */}
                            {/* <TableCell align="left">
                          <audio controls controlsList="nodownload" >
                            <source src={`${process.env.REACT_APP_API_CALL_URL}/status/audio/${row?.audioUrl}`}
                              type="audio/wav">
                            </source>
                            <source src={`${process.env.REACT_APP_API_CALL_URL}/status/audio/${row?.audioUrl}`}
                              type="audio/amr">
                            </source>
                          </audio>
                        </TableCell> */}
                            <TableCell align="left">row?.date</TableCell>
                            <TableCell align="left">row.time</TableCell>
                            <TableCell className="status_description" align="left">row?.description</TableCell>
                            <TableCell align="left" >
                                <Button className="client_profile_edit_button m-1">
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
                {/*:
                    <p style={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", width: "100%", height: "70%", flexGrow: "auto" }}>No Data Found</p>
                } */}
            </TableContainer>
        </>
    )
}

export default OrderList