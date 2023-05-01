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
  Tab,
  Tabs,
} from '@mui/material'
import './index.css'
import { REPORT } from '../../constants'
import moment from 'moment'
import { TabContext, TabList, TabPanel } from '@mui/lab'
const BarChart = React.lazy(() => import('./BarChart'))
const TeamGraph = React.lazy(() => import('./TeamGraph'))
const ProductGraph = React.lazy(() => import('./ProductGraph'))
const LineChart = React.lazy(() => import('./LineChart'))
const Statistics = () => {
  const [value, setValue] = React.useState('1')

  const [daterange, setDateRange] = useState(REPORT.PERIODSELECTOR)
  const [selectedPeriod, setSelectedPeriod] = useState(daterange[0].type)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [activeTab, setActiveTab] = useState('product')
  return (
    <>
      <Box className="main_tab_section">
        <Box className="tab_header ">
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Product" value="1" />
            <Tab label="Team" value="2" />
          </Tabs>

          <Select
            sx={{
              marginRight: 'px',
              width: '130px',
              height: '40px',
              background: 'white',
            }}
            value={selectedPeriod}
            onChange={(e, value) => {
              setSelectedPeriod(e.target.value)
            }}
          >
            {daterange.map(data => {
              return <MenuItem value={data.type}>{data.value}</MenuItem>
            })}
          </Select>
        </Box>

        <Box className="below_main_tab_section">
          {value === '1' ? (
            <ProductGraph selectedPeriod={selectedPeriod} />
          ) : (
            <TeamGraph selectedPeriod={selectedPeriod} />
          )}
        </Box>
      </Box>
    </>
  )
}

export default Statistics
