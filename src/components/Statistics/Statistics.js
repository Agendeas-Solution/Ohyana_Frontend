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
          <Box
            sx={{
              display: 'flex',
              // alignItems: 'center',
              width: '100%',
              flexDirection: 'column',
            }}
          >
            {/* <Box sx={{ marginRight: '10px' }}>
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
            </Box> */}

            <TabContext value={value}>
              <Box className="tab_row">
                <TabList
                  sx={{ borderBottom: '1px solid #F1F2F6' }}
                  className="client_profile_tab mb-2"
                  onChange={handleChange}
                >
                  <Tab label="Product" value="1" />
                  <Tab label="Team" value="2" />
                </TabList>
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
                      return <MenuItem value={data.type}>{data.value}</MenuItem>
                    })}
                  </Select>
                </FormControl>
              </Box>
              <Box className="below_main_tab_section">
                <TabPanel sx={{ padding: '0' }} value="1">
                  <ProductGraph selectedPeriod={selectedPeriod} />
                </TabPanel>
                <TabPanel sx={{ padding: '0' }} value="2">
                  <TeamGraph selectedPeriod={selectedPeriod} />
                </TabPanel>
              </Box>
            </TabContext>
          </Box>
        </Box>
        <Divider sx={{ margin: '10px' }} />
        {/* <Box>
          {activeTab === 'product' && (
            <ProductGraph selectedPeriod={selectedPeriod} />
          )}
          {activeTab === 'team' && (
            <TeamGraph selectedPeriod={selectedPeriod} />
          )}
        </Box> */}
      </Box>
    </>
  )
}

export default Statistics
