import React, { useState, useEffect, useContext } from 'react'
import {
  Box,
  Typography,
  InputLabel,
  FormControl,
  Select,
  ListItemText,
  Checkbox,
  MenuItem,
  createFilterOptions,
  Autocomplete,
  TextField,
} from '@mui/material'
import './index.css'
import LineChart from './LineChart'
import {
  GetCustomerReport,
  GetProductReport,
} from '../../services/apiservices/productDetail'
import { GetAllClients } from '../../services/apiservices/clientDetail'
import { GetAdminProductList } from '../../services/apiservices/adminprofile'
import { Context as ContextSnackbar } from '../../context/pageContext'

const CustomerGraph = ({ selectedPeriod, customRange }) => {
  const [graphData, setGraphData] = useState({})
  const [productList, setProductList] = useState([])
  const [selectedProductList, setSelectedProductList] = useState([])
  const [userData, setUserData] = useState({})
  const [clientDetail, setClientDetail] = useState(null)
  const [clientList, setClientList] = useState([])
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const [searchQuery, setSearchQuery] = useState('')
  const handleChange = event => {
    const { value } = event.target
    const selectedProduct = value.map(id =>
      productList.find(name => name.id === id),
    )
    setSelectedProductList(selectedProduct)
  }
  useEffect(() => {
    let data = {
      period: selectedPeriod,
    }
    if (selectedProductList.length > 0) {
      data['productIds'] = selectedProductList.map(data => data.id)
    }
    if (clientDetail) {
      data['clientId'] = clientDetail.id
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
      GetCustomerReport(
        data,
        res => {
          setGraphData(res?.data)
        },
        err => {
          setGraphData([])
        },
      )
    } else if (selectedPeriod !== 'custom') {
      GetCustomerReport(
        data,
        res => {
          setGraphData(res?.data)
        },
        err => {
          setGraphData([])
        },
      )
    }
  }, [selectedPeriod, customRange, selectedProductList, clientDetail])
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
    let data = {
      size: 10,
    }
    if (searchQuery !== '') {
      data['searchQuery'] = searchQuery
    }
    GetAllClients(
      data,
      res => {
        if (res?.success) {
          setClientList(res?.data?.client)
        }
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }, [searchQuery])
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
        labels: graphData.label ? Object.keys(graphData.data) : null,
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
          }}
        >
          <Typography variant="span">Overview</Typography>
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
            <FormControl>
              <Autocomplete
                filterSelectedOptions
                options={clientList}
                value={clientDetail || null}
                onChange={(e, value) => {
                  setClientDetail(value)
                }}
                onInputChange={e => {
                  if (e?.target?.value !== '' && e?.target?.value) {
                    setSearchQuery(e.target.value)
                  }
                }}
                getOptionLabel={option => option?.name}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Client Name"
                    className="dialogue_input_fields"
                  />
                )}
              />
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ height: '65vh !important' }}>
          {userData.datasets && <LineChart chartData={userData} />}
        </Box>
      </Box>
    </>
  )
}

export default CustomerGraph
