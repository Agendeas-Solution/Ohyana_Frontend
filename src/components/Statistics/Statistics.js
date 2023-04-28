import React, { useState } from 'react'
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from '@mui/material'
import './index.css'
import moment from 'moment'
const BarChart = React.lazy(() => import('./BarChart'))
const TeamGraph = React.lazy(() => import('./TeamGraph'))
const ProductGraph = React.lazy(() => import('./ProductGraph'))
const LineChart = React.lazy(() => import('./LineChart'))
const Statistics = () => {
  const [value, setValue] = React.useState('1')

  const [daterange, setDateRange] = useState([
    '7 days',
    '30 days',
    '90 days',
    `${moment().format('MMMM')}`,
    `${moment().subtract(1, 'months').format('MMMM')}`,
    `${moment().subtract(2, 'months').format('MMMM')}`,
    `${moment().format(' YYYY')}`,
  ])
  const [selectedPeriod, setSelectedPeriod] = useState(daterange[0])
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [activeTab, setActiveTab] = useState('product')
  return (
    <>
      <Box
        className="main_section"
        sx={{ overflowY: 'hidden', padding: '0px' }}
      >
        <Box className="header_section">
          <Typography className="sub_heading" variant="span">
            Product
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <Box sx={{ marginRight: '10px' }}>
              <Button
                className={
                  activeTab === 'product'
                    ? 'active_button'
                    : 'custom_tab_background'
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
                  activeTab === 'team'
                    ? 'active_button'
                    : 'custom_tab_background'
                }
                onClick={() => {
                  setActiveTab('team')
                }}
                variant="contained"
              >
                Team
              </Button>
            </Box>

            <FormControl>
              <InputLabel> Select Time</InputLabel>
              <Select
                sx={{ width: '125px', height: '40px' }}
                label=" Select Time"
                value={selectedPeriod}
                onChange={(e, value) => {
                  setSelectedPeriod(e.target.value)
                }}
              >
                {daterange.map(data => {
                  return <MenuItem value={data}>{data}</MenuItem>
                })}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Divider sx={{ margin: '10px' }} />
        <Box>
          {activeTab === 'product' && (
            <ProductGraph selectedPeriod={selectedPeriod} />
          )}
          {activeTab === 'team' && (
            <TeamGraph selectedPeriod={selectedPeriod} />
          )}
        </Box>
      </Box>
    </>
  )
}

export default Statistics
