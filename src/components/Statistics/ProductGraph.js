import React, { useState, useEffect } from 'react'
import { Box, Typography, Autocomplete, TextField } from '@mui/material'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './index.css'
import { UserData } from "./Data";
import LineChart from "./LineChart";
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { GetProductReport } from '../../services/apiservices/productDetail';
import { GetAdminProductList } from '../../services/apiservices/adminprofile';
const ProductGraph = ({ selectedPeriod }) => {
    const [graphData, setGraphData] = useState();
    const [productList, setProductList] = useState([]);
    const [selectedProduct,se] = useState();
    useEffect(() => {
        GetProductReport({ selectedPeriod: selectedPeriod }, (res) => {
            setGraphData(res?.data?.data);
        }, (err) => {
        })
        GetAdminProductList({}, (res) => {
            setProductList(res?.data?.products);
        }, (err) => {
        })
    }, [selectedPeriod])
    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 }, { label: 'The Shawshank Redemption', year: 1994 }];
    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
    });
    useEffect(() => {
        let datga = graphData && graphData.map((value) => {
            return {
                data: value?.orders.map((a1) => a1.quantity),
                label: value?.name, backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderWidth: 2,
            }
        })
        // let xlabels = graphData && graphData.map((data) => {
        //     return data?.orders.map((a1) => a1.date)
        // })
        // console.log("Printing xlables", xlabels);
        // debugger;
        datga && setUserData({ ...userData, datasets: datga });
        console.log("Printing userData", userData);
    }, [graphData]);
    return (
        <>
            <Box className='graph_detail_section'>
                <Box className=" graph_section">
                    <Box className="common_row">
                        <Typography variant="span">Overall</Typography>
                        <Box className="row">
                            <Autocomplete
                                disablePortal
                                options={productList}
                                getOptionLabel={(option) => option.name}
                                sx={{ width: "200px" }}
                                onChange={(e, value) => {
                                    console.log(value);
                                    // setClientStage(value?.id);
                                }}
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
                                options={productList}
                                getOptionLabel={(option) => option.name}
                                sx={{ width: "200px" }}
                                onChange={(e, value) => {
                                    console.log(value);
                                    // setClientStage(value?.id);
                                }}
                                renderInput={(params) => <TextField className="common_dropdown" {...params} placeholder="Product" />}
                            />
                            <Autocomplete
                                disablePortal
                                options={top100Films}
                                sx={{ width: "200px" }}
                                renderInput={(params) => <TextField className="common_dropdown"  {...params} placeholder="City" />}
                            />
                        </Box>
                    </Box>
                    {userData.datasets && <LineChart chartData={userData} />}
                </Box>
                <Box className="detail_section">
                    <Box className=" product_data">
                        <Box className="product_name">
                            <Box sx={{ backgroundColor: "#FFAB00", height: "10px", width: "10px", marginRight: "10px" }}></Box>
                            <Typography variant="span">Pasta Masala Penne</Typography>
                        </Box>
                        <Box className="sales_parameter">
                            <Typography variant="span">2500 Pc </Typography>
                            <Typography className="bg-white rounded p-1 m-1" variant="span"><TrendingUpRoundedIcon className="common_icon" /> 5%</Typography>
                        </Box>
                    </Box>
                    <Box className=" product_data">
                        <Box className="product_name">
                            <Box sx={{ backgroundColor: "#FFAB00", height: "10px", width: "10px", marginRight: "10px" }}></Box>
                            <Typography variant="span">Pasta Masala Penne</Typography>
                        </Box>
                        <Box className="sales_parameter">
                            <Typography variant="span">2500 Pc </Typography>
                            <Typography className="bg-white rounded p-1 m-1" variant="span"><TrendingUpRoundedIcon className="common_icon" /> 5%</Typography>
                        </Box>
                    </Box>
                    <Box className=" product_data">
                        <Box className="product_name">
                            <Box sx={{ backgroundColor: "#FFAB00", height: "10px", width: "10px", marginRight: "10px" }}></Box>
                            <Typography variant="span">Pasta Masala Penne</Typography>
                        </Box>
                        <Box className="sales_parameter">
                            <Typography variant="span">2500 Pc </Typography>
                            <Typography className="bg-white rounded p-1 m-1" variant="span"><TrendingUpRoundedIcon className="common_icon" /> 5%</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ProductGraph