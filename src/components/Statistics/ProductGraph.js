import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  InputLabel,
  FormControl,
  Select,
  ListItemText,
  Checkbox,
  MenuItem,
  createFilterOptions,
} from '@mui/material'
import './index.css'
import { UserData } from './Data'
import LineChart from './LineChart'
import { GetProductReport } from '../../services/apiservices/productDetail'
import { GetCityList } from '../../services/apiservices/clientDetail'
import { GetAdminProductList } from '../../services/apiservices/adminprofile'
import {
  GetCity,
  GetState,
} from '../../services/apiservices/country-state-city'
import { FilterList } from '@mui/icons-material'
import { matchSorter } from 'match-sorter'
const ProductGraph = ({ selectedPeriod, customRange }) => {
  const [comparison, setComparison] = useState()
  // const [graphData, setGraphData] = useState([])
  const [graphData, setGraphData] = useState({})
  const [productList, setProductList] = useState([])
  const [selectedProductList, setSelectedProductList] = useState([])
  const [stateList, setStateList] = useState([])
  const [selectedState, setSelectedState] = useState(null)
  const [cityList, setCityList] = useState([])
  const [selectedCity, setSelectedCity] = useState(null)
  const [userData, setUserData] = useState({})
  const [filterCityList, setFilterCityList] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const handleChange = event => {
    const { value } = event.target
    const selectedProduct = value.map(id =>
      productList.find(name => name.id === id),
    )
    setSelectedProductList(selectedProduct)
    console.log('Selected Product:', selectedProduct)
  }

  useEffect(() => {
    let data = cityList.filter(data => {
      if (data.name.toLowerCase().includes(searchQuery)) {
        return data
      }
    })
    setFilterCityList(data)
  }, [searchQuery])
  useEffect(() => {
    GetState(
      {},
      res => {
        setStateList(res)
      },
      err => {},
    )
  }, [])
  useEffect(() => {
    let data = selectedState?.iso2 ? `/${selectedState?.iso2}/cities` : ''
    selectedState &&
      GetCity(
        data,
        res => {
          const uniqueCity = res.reduce((acc, current) => {
            const x = acc.find(item => item.name === current.name)
            if (!x) {
              return acc.concat([current])
            } else {
              return acc
            }
          }, [])
          setCityList(uniqueCity)
        },
        err => {},
      )
  }, [selectedState])
  useEffect(() => {
    let data = {
      period: selectedPeriod,
    }
    if (selectedCity) {
      data['city_id'] = selectedCity.id
    }
    if (selectedProductList.length > 0) {
      data['productIds'] = selectedProductList.map(data => data.id)
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
      GetProductReport(
        data,
        res => {
          setGraphData(res?.data)
        },
        err => {},
      )
    } else if (selectedPeriod !== 'custom') {
      GetProductReport(
        data,
        res => {
          setGraphData(res?.data)
        },
        err => {},
      )
    }
  }, [selectedPeriod, customRange, selectedProductList, selectedCity])
  useEffect(() => {
    GetAdminProductList(
      {},
      res => {
        setProductList(res?.data?.products)
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
    datga &&
      setUserData({
        ...userData,
        datasets: datga,
        labels: graphData.label && Object.keys(graphData.data),
      })
  }, [graphData])

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: option => option?.name,
  })
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
              options={stateList}
              disableClearable
              filterOptions={filterOptions}
              value={selectedState}
              getOptionLabel={option => option.name}
              onChange={(e, value) => {
                setSelectedState(value)
              }}
              renderInput={params => <TextField {...params} label="State" />}
            />
            <Autocomplete
              sx={{ width: '200px', marginLeft: '10px' }}
              options={cityList}
              disabled={!selectedState}
              filterOptions={filterOptions}
              value={selectedCity}
              getOptionLabel={option => option.name}
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
