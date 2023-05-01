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
import { GetProductReport } from '../../services/apiservices/productDetail'
import { GetCityList } from '../../services/apiservices/clientDetail'
import { GetAdminProductList } from '../../services/apiservices/adminprofile'
const ProductGraph = ({ selectedPeriod }) => {
  const [comparison, setComparison] = useState()
  // const [graphData, setGraphData] = useState([])
  const [graphData, setGraphData] = useState({})
  const [productList, setProductList] = useState([])
  const [selectedProductList, setSelectedProductList] = useState([])
  const [cityList, setCityList] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const [userData, setUserData] = useState({})
  const handleChange = event => {
    const { value } = event.target
    const selectedProduct = value.map(id =>
      productList.find(name => name.id === id),
    )
    setSelectedProductList(selectedProduct)
    console.log('Selected Product:', selectedProduct)
  }
  useEffect(() => {
    console.log('graphData', userData)
    debugger
  }, [userData])
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

  useEffect(() => {
    let datga =
      graphData.label &&
      graphData.label.map(value => {
        const colors = '#' + Math.floor(Math.random() * 16777215).toString(16)
        return {
          data: Object.entries(graphData.data)
            .map(([key, product], i) => {
              return product.reduce((acc, productDetail) => {
                if (value.id === productDetail.productId) {
                  acc.push(productDetail.quantity)
                }
                return acc
              }, [])
            })
            .flat()
            .filter(count => count !== undefined && count !== []),
          label: value.name,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 2,
          barThickness: 20,
          borderSkipped: 'middle',
          circular: true,
        }
      })
    console.log(datga)
    datga &&
      setUserData({
        ...userData,
        datasets: datga,
        labels: graphData.label && Object.keys(graphData.data),
      })
    debugger
  }, [graphData])
  return (
    <>
      <Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
          }}
        >
          <Typography variant="span">Overall</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl sx={{ width: '200px', marginLeft: '10px' }}>
              <InputLabel>Compare</InputLabel>
              <Select
                label="Select City "
                value={comparison}
                onChange={e => {
                  setComparison(e.target.value)
                }}
              >
                <MenuItem value="true">Product</MenuItem>
                <MenuItem value="false">City</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: '200px', marginLeft: '10px' }}>
              <InputLabel>Select Product</InputLabel>
              <Select
                label="Select Product"
                multiple
                value={selectedProductList.map(product => product.id)}
                onChange={handleChange}
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
              sx={{ width: '200px', marginLeft: '10px' }}
              disablePortal
              options={cityList}
              value={selectedCity}
              getOptionLabel={option => option}
              onChange={(e, value) => {
                setSelectedCity(value)
              }}
              renderInput={params => <TextField {...params} label="City" />}
            />
          </Box>
        </Box>
        <Box sx={{ height: '65vh !important' }}>
          {userData.datasets && <LineChart chartData={userData} />}
        </Box>
      </Box>
    </>
  )
}

export default ProductGraph
