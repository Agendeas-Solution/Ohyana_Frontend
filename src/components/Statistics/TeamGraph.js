import React, { useEffect, useState } from 'react'
import { Box, Typography, Autocomplete, TextField, Button } from '@mui/material'
import './index.css'
import { UserData } from "./Data";
import LineChart from "./LineChart";
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import ProductGraph from './ProductGraph';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BarChart from './BarChart';
import { GetTeamReport } from '../../services/apiservices/productDetail';
const TeamGraph = ({selectedPeriod}) => {
    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 }];
    const [graphData, setGraphData] = useState();
    const [userData, setUserData] = useState({
        // labels: UserData.map((data) => data.year),
    });
    useEffect(() => {
        GetTeamReport({selectedPeriod:selectedPeriod}, (res) => {
            setGraphData(res?.data?.data);
            debugger;
        }, (err) => {
        })

    }, [selectedPeriod])
    useEffect(() => {
        let color = [];
        if (graphData) {
            for (var i = 0; i < graphData.length; i++) {
                color.push("#" + Math.floor(Math.random() * 16777215).toString(16));
            }
        }
        let datga = graphData && graphData.map((value, index) => {
            let a = [];
            a[index] = value.points;
            return {
                data: a,
                label: value?.name, backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
                borderWidth: 1,
                barThickness: 20,
                borderSkipped: "middle",
                circular: true
            }
        })
        console.log("Printing userData", userData, datga);
        graphData && setUserData({
            ...userData, labels: graphData && graphData.map((value) => value?.name),
            datasets: datga
        })

    }, [graphData]);
    return (
        <>
            <Box>
                <Box className=" graph_section team_graph">
                    <Box className="common_row">
                        <Typography variant="span">Overall</Typography>
                        <Box className="row">
                            <Autocomplete
                                disablePortal
                                options={top100Films}
                                sx={{ width: "200px" }}
                                renderInput={(params) => <TextField className="common_dropdown" {...params} placeholder="City" />}
                            />
                            <Autocomplete
                                disablePortal
                                options={top100Films}
                                sx={{ width: "200px" }}
                                renderInput={(params) => <TextField className="common_dropdown" {...params} placeholder="City" />}
                            />
                            <Autocomplete
                                disablePortal
                                options={top100Films}
                                sx={{ width: "200px" }}
                                renderInput={(params) => <TextField className="common_dropdown"  {...params} placeholder="City" />}
                            />
                        </Box>
                    </Box>
                    {userData?.datasets && <BarChart chartData={userData} />}
                    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
                        <Table sx={{ maxWidth: 300 }}>
                            <TableHead className="team_overview_table_heading">
                                <TableRow>
                                    <TableCell>Occasion Name</TableCell>
                                    <TableCell align="right">Total Selling(Pc)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right">Instant Noodles </TableCell>
                                    <TableCell align="right">3000</TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right">Instant Noodles </TableCell>
                                    <TableCell align="right">3000</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>
    )
}

export default TeamGraph