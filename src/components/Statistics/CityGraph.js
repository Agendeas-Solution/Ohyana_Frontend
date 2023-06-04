import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  Checkbox,
  createFilterOptions,
} from '@mui/material'
import './index.css'
import LineChart from './LineChart'
import { GetCityProductReport } from '../../services/apiservices/productDetail'
import {
  GetAdminProductList,
  GetAdminProductListReport,
} from '../../services/apiservices/adminprofile'
import {
  GetCity,
  GetState,
} from '../../services/apiservices/country-state-city'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />
const CityGraph = ({ selectedPeriod, customRange }) => {
  const [graphData, setGraphData] = useState({})
  const [productList, setProductList] = useState([])
  const [selectedCityList, setSelectedCityList] = useState([])
  const [cityList, setCityList] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [userData, setUserData] = useState({})
  const [stateList, setStateList] = useState([])
  const [selectedState, setSelectedState] = useState(null)
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
      data['cities'] = selectedCityList.map(city => city.id)
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
  const handleProductList = () => {
    GetAdminProductListReport(
      {},
      res => {
        setProductList(res?.data?.products)
      },
      err => {},
    )
  }
  const handleStateList = () => {
    GetState(
      {},
      res => {
        setStateList(res)
      },
      err => {},
    )
  }
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
  const handleCityChange = (event, values) => {
    setSelectedCityList(values)
  }
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
            <Autocomplete
              sx={{ width: '200px', marginLeft: '10px' }}
              options={stateList}
              disableClearable
              filterOptions={filterOptions}
              value={selectedState}
              onOpen={stateList.length < 1 ? handleStateList : null}
              getOptionLabel={option => option.name}
              onChange={(e, value) => {
                setSelectedState(value)
              }}
              renderInput={params => <TextField {...params} label="State" />}
            />
            <Autocomplete
              multiple
              disabled={!selectedState}
              options={cityList}
              disableCloseOnSelect
              getOptionLabel={option => option.name}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </li>
              )}
              value={selectedCityList}
              sx={{ width: '200px', marginLeft: '10px' }}
              onChange={handleCityChange}
              renderInput={params => (
                <TextField {...params} label="Select City" />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <span
                    key={option.name}
                    style={{ display: 'inline-block', marginRight: 4 }}
                  >
                    {option.name}
                    {index < value.length - 1 ? ', ' : ''}
                  </span>
                ))
              }
            />
            <Autocomplete
              sx={{ width: '200px', marginLeft: '10px' }}
              disablePortal
              options={productList}
              value={selectedProduct}
              onOpen={productList.length < 1 ? handleProductList : null}
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
