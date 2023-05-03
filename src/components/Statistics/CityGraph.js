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
import { GetCityProductReport } from '../../services/apiservices/productDetail'
import { GetCityList } from '../../services/apiservices/clientDetail'
import { GetAdminProductList } from '../../services/apiservices/adminprofile'
const CityGraph = ({ selectedPeriod, customRange }) => {
  const [graphData, setGraphData] = useState({})
  const [productList, setProductList] = useState([])
  const [selectedCityList, setSelectedCityList] = useState([])
  const [cityList, setCityList] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [userData, setUserData] = useState({})
  const handleChange = event => {
    const { value } = event.target
    const selectedCity = value.map(id => cityList.find(name => name === id))
    setSelectedCityList(selectedCity)
  }
  useEffect(() => {
    let data = {
      period: selectedPeriod,
    }
    if (selectedCityList.length > 0) {
      data['cities'] = selectedCityList
    }
    if (selectedProduct) {
      data['productIds'] = selectedProduct
    }
    if (selectedPeriod === 'custom') {
      data['dateFrom'] = customRange.startDate
      data['dateTo'] = customRange.endDate
    }
    if (
      selectedPeriod === 'custom' &&
      customRange.startDate &&
      customRange.endDate
    ) {
      GetCityProductReport(
        data,
        res => {
          setGraphData(res?.data)
        },
        err => {},
      )
    } else if (selectedPeriod !== 'custom') {
      GetCityProductReport(
        data,
        res => {
          setGraphData(res?.data)
        },
        err => {},
      )
    }
  }, [selectedPeriod, customRange, selectedProduct, selectedCityList])
  useEffect(() => {
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
        debugger
      },
      err => {},
    )
  }, [])
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
          }}
        >
          <Typography variant="span">Overview</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl sx={{ width: '200px', marginLeft: '10px' }}>
              <InputLabel>Select City</InputLabel>
              <Select
                label="Select Product"
                multiple
                value={selectedCityList.map(city => city)}
                onChange={handleChange}
                renderValue={selected =>
                  selected
                    .map(id => cityList.find(name => name === id))
                    .join(',')
                }
              >
                {cityList.map(city => (
                  <MenuItem key={city} value={city}>
                    <Checkbox
                      checked={selectedCityList.some(tag => tag === city)}
                    />
                    <ListItemText primary={city} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Autocomplete
              sx={{ width: '200px', marginLeft: '10px' }}
              disablePortal
              options={productList}
              value={selectedProduct}
              getOptionLabel={option => option.name}
              onChange={(e, value) => {
                setSelectedProduct(value)
              }}
              renderInput={params => <TextField {...params} label="Product" />}
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

export default CityGraph
