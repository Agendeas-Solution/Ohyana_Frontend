import React, { useState } from 'react'
import { Box, Typography, Autocomplete, TextField, Button } from '@mui/material'
import './index.css'
import moment from 'moment'
const BarChart = React.lazy(() => import('./BarChart'))
const TeamGraph = React.lazy(() => import('./TeamGraph'))
const ProductGraph = React.lazy(() => import('./ProductGraph'))
const LineChart = React.lazy(() => import('./LineChart'))
const Statistics = () => {
  const [value, setValue] = React.useState('1')
  const [selectedPeriod, setSelectedPeriod] = useState()
  const [daterange, setDateRange] = useState([
    'days-7',
    'days-30',
    'days-90',
    `month-${moment().format('MMMM')}`,
    `month-${moment().subtract(1, 'months').format('MMMM')}`,
    `month-${moment().subtract(2, 'months').format('MMMM')}`,
    `year-${moment().format(' YYYY')}`,
  ])
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [activeTab, setActiveTab] = useState('product')
  return (
    <>
      <Box className="main_section">
        <Box className="statistics_title">
          <Box>
            <Typography
              sx={{ fontSize: '22px', fontWeight: '500' }}
              variant="span"
            >
              Product
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <Box
              sx={{
                background: '#F1F2F6',
                borderRadius: '5px',
                height: '35px',
                marginRight: '10px',
              }}
            >
              <Button
                className={
                  activeTab === 'product' ? 'active_button' : 'custom_tab'
                }
                onClick={() => {
                  setActiveTab('product')
                }}
                variant="contained"
              >
                Product
              </Button>
              <Button
                className={
                  activeTab === 'team' ? 'active_button' : 'custom_tab'
                }
                onClick={() => {
                  setActiveTab('team')
                }}
                variant="contained"
              >
                Team
              </Button>
            </Box>

            <Autocomplete
              sx={{ width: '150px' }}
              disablePortal
              options={daterange}
              value={selectedPeriod}
              onChange={(e, value) => {
                console.log(value)
                setSelectedPeriod(value)
              }}
              renderInput={params => (
                <TextField
                  // className="common_dropdown"
                  {...params}
                  label="1 Mon"
                />
              )}
            />
          </Box>
        </Box>
        {activeTab === 'product' && (
          <ProductGraph selectedPeriod={selectedPeriod} />
        )}
        {activeTab === 'team' && <TeamGraph selectedPeriod={selectedPeriod} />}
      </Box>
    </>
  )
}

export default Statistics
