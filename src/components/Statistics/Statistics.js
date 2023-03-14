import React, { useState } from 'react'
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
import TeamGraph from './TeamGraph';
import moment from 'moment';
const Statistics = () => {
    const [value, setValue] = React.useState('1');
    const [selectedPeriod, setSelectedPeriod] = useState();
    const [daterange, setDateRange] = useState([
        "days-7", "days-30", "days-90", `month-${moment().format('MMMM')}`, `month-${moment().subtract(1, 'months').format('MMMM')}`, `month-${moment().subtract(2, 'months').format('MMMM')}`, `year-${moment().format(' YYYY')
        }`
    ])
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [activeTab, setActiveTab] = useState("product");


    return (
        <>
            <Box className="main_section">
                <Box className="statistics_title">
                    <Typography variant="span">Product</Typography>
                    <Box className="column">
                        <Box sx={{ background: "#F1F2F6", borderRadius: "5px" }}>
                            <Button className={activeTab === "product" ? "active_button" : "common_button"} onClick={() => {
                                setActiveTab("product")
                            }} variant="contained">
                                Product
                            </Button>
                            <Button className={activeTab === "team" ? "active_button" : "common_button"}
                                onClick={() => {
                                    setActiveTab("team")
                                }} variant="contained">Team</Button>
                        </Box>
                        <Autocomplete
                            disablePortal
                            options={daterange}
                            value={selectedPeriod}
                            onChange={(e, value) => {
                                console.log(value);
                                setSelectedPeriod(value);
                            }}
                            renderInput={(params) => <TextField className="common_dropdown"  {...params} placeholder="1 Mon" />}
                        />
                    </Box>
                </Box>
                {activeTab === "product" && <ProductGraph selectedPeriod={selectedPeriod} />}
                {activeTab === "team" && <TeamGraph selectedPeriod={selectedPeriod} />}

            </Box>
        </>
    )
}

export default Statistics