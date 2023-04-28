import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  OutlinedInput,
  InputLabel,
  FormControl,
  Select,
  ListItemText,
  Checkbox,
  MenuItem,
} from '@mui/material'
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
  const [selectedProductList, setSelectedProductList] = useState([])
  const [cityList, setCityList] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const handleChange = event => {
    const { value } = event.target
    const selectedProduct = value.map(id =>
      productList.find(name => name.id === id),
    )
    setSelectedProductList(selectedProduct)
    console.log('Selected Product:', selectedProduct)
  }
  useEffect(() => {
    let data = {
      period: selectedPeriod,
    }
    if (selectedCity) {
      data['cities'] = [selectedCity]
    }
    if (selectedProductList.length > 0) {
      data['productIds'] = selectedProductList
    }
    GetProductReport(
      data,
      res => {
        setGraphData(res?.data)
      },
      err => {},
    )
    GetAdminProductList(
      {},
      res => {
        setProductList(res?.data?.products)
      },
      err => {},
    )
    GetCityList(
      {},
      res => {
        setCityList(res?.data)
      },
      err => {},
    )
  }, [selectedPeriod])
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Shawshank s', year: 1995 },
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
  }, [graphData])
  return (
    <>
      <Box className="graph_detail_section">
        <Box className="graph_section">
          <Box className="detail_row">
            <Typography className="report_tab_heading" variant="span">
              Overall
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControl className="filter_body_inner_section">
                <InputLabel>Select City</InputLabel>
                <Select
                  className="report_tab_heading_option"
                  label="Select City "
                  value={selectedCity}
                  onChange={e => {
                    setSelectedCity(e.target.value)
                  }}
                >
                  {cityList.map(data => {
                    return <MenuItem value={data}>{data}</MenuItem>
                  })}
                </Select>
              </FormControl>
              <FormControl className="filter_body_inner_section">
                <InputLabel>Select Product</InputLabel>
                <Select
                  className="report_tab_heading_option"
                  label="Select Product"
                  multiple
                  value={selectedProductList.map(product => product.id)}
                  onChange={handleChange}
                  input={<OutlinedInput label="Product" />}
                  renderValue={selected =>
                    selected
                      .map(id => productList.find(name => name.id === id).name)
                      .join(', ')
                  }
                >
                  {productList.map(product => (
                    <MenuItem key={product.id} value={product.id}>
                      <Checkbox
                        checked={selectedProductList.some(
                          tag => tag.id === product.id,
                        )}
                      />
                      <ListItemText primary={product.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Autocomplete
                className="filter_body_inner_section"
                disablePortal
                options={top100Films}
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
          <Box className="report_tab_main_section">
            {userData.datasets && <LineChart chartData={userData} />}
          </Box>
        </Box>
        <Box className="detail_section">
          <Box className=" product_data">
            <Box className="product_name">
              <Box className="product_bullet_point"></Box>
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
              <Box className="product_bullet_point"></Box>
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
              <Box className="product_bullet_point"></Box>
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
