import React, { useState, useEffect } from 'react'
import { Box, Typography, Autocomplete, TextField } from '@mui/material'
import './index.css'
import { UserData } from './Data'
import LineChart from './LineChart'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import { GetProductReport } from '../../services/apiservices/productDetail'
import { GetCityList } from '../../services/apiservices/clientDetail'
import { GetAdminProductList } from '../../services/apiservices/adminprofile'
const ProductGraph = ({ selectedPeriod }) => {
  const [graphData, setGraphData] = useState()
  const [productList, setProductList] = useState([])
  const [cityList, setCityList] = useState([]);
  // const [selectedProduct, se] = useState()
  useEffect(() => {
    console.log('selectedPerid', selectedPeriod);
    debugger;
    GetProductReport(
      { selectedPeriod: selectedPeriod },
      res => {
        setGraphData(res?.data)
      },
      err => { },
    )
    GetAdminProductList(
      {},
      res => {
        setProductList(res?.data?.products)
      },
      err => { },
    )
    GetCityList(
      {},
      res => {
        setCityList(res?.data)
      },
      err => { },
    )
  }, [selectedPeriod])
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Shawshank Redemption', year: 1994 },
  ]
  const [userData, setUserData] = useState({
    labels: UserData.map(data => data.year),
  })
  useEffect(() => {
    let datga =
      graphData &&
      graphData.map(value => {
        return {
          data: value?.orders.map(a1 => a1.quantity),
          label: value?.name,
          backgroundColor: [
            'rgba(75,192,192,1)',
            '#ecf0f1',
            '#50AF95',
            '#f3ba2f',
            '#2a71d0',
          ],
          borderColor: [
            'rgba(75,192,192,1)',
            '#ecf0f1',
            '#50AF95',
            '#f3ba2f',
            '#2a71d0',
          ],
          borderWidth: 2,
        }
      })
    // let xlabels = graphData && graphData.map((data) => {
    //     return data?.orders.map((a1) => a1.date)
    // })
    // console.log("Printing xlables", xlabels);
    // ;
    datga && setUserData({ ...userData, datasets: datga })
    debugger;
  }, [graphData])
  return (
    <>
      <Box className="graph_detail_section">
        <Box className="graph_section">
          <Box className="common_row mb-3">
            <Typography
              sx={{ color: '#2E3591', fontSize: '20px', fontWeight: '600' }}
              variant="span"
            >
              Overall
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Autocomplete
                disablePortal
                options={cityList}
                getOptionLabel={option => option}
                sx={{ width: '200px', marginRight: '10px' }}
                renderInput={params => (
                  <TextField
                    className="common_dropdown"
                    {...params}
                    label="City"
                  />
                )}
              />
              <Autocomplete
                disablePortal
                options={productList}
                getOptionLabel={option => option.name}
                sx={{ width: '200px', marginRight: '10px' }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Product"
                  />
                )}
              />
              <Autocomplete
                disablePortal
                options={top100Films}
                sx={{ width: '200px' }}
                renderInput={params => (
                  <TextField
                    className="common_dropdown"
                    {...params}
                    label="City"
                  />
                )}
              />
            </Box>
          </Box>
          <Box
            sx={{
              border: '1px solid #E5E5E5',
              borderRadius: '5px',
              margin: '1px',
            }}
          >
            {userData.datasets && <LineChart chartData={userData} />}
          </Box>
        </Box>
        <Box className="detail_section">
          <Box className=" product_data">
            <Box className="product_name">
              <Box
                sx={{
                  backgroundColor: '#FFAB00',
                  height: '10px',
                  width: '10px',
                  marginRight: '10px',
                }}
              ></Box>
              <Typography variant="span">Pasta Masala Penne</Typography>
            </Box>
            <Box className="sales_parameter">
              <Typography variant="span">2500 Pc </Typography>
              <Typography className="bg-white rounded p-1 m-2" variant="span">
                <TrendingUpRoundedIcon className="common_icon" /> 5%
              </Typography>
            </Box>
          </Box>
          <Box className=" product_data">
            <Box className="product_name">
              <Box
                sx={{
                  backgroundColor: '#FFAB00',
                  height: '10px',
                  width: '10px',
                  marginRight: '10px',
                }}
              ></Box>
              <Typography variant="span">Pasta Masala Penne</Typography>
            </Box>
            <Box className="sales_parameter">
              <Typography variant="span">2500 Pc </Typography>
              <Typography className="bg-white rounded p-1 m-2" variant="span">
                <TrendingUpRoundedIcon className="common_icon" /> 5%
              </Typography>
            </Box>
          </Box>
          <Box className=" product_data">
            <Box className="product_name">
              <Box
                sx={{
                  backgroundColor: '#FFAB00',
                  height: '10px',
                  width: '10px',
                  marginRight: '10px',
                }}
              ></Box>
              <Typography variant="span">Pasta Masala Penne</Typography>
            </Box>
            <Box className="sales_parameter">
              <Typography variant="span">2500 Pc </Typography>
              <Typography className="bg-white rounded p-1 m-2" variant="span">
                <TrendingUpRoundedIcon className="common_icon" /> 5%
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ProductGraph
