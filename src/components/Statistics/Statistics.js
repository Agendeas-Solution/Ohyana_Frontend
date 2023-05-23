import React, { useState } from 'react'
import { Box, TextField, Select, MenuItem, Tab, Tabs } from '@mui/material'
import './index.css'
import { REPORT } from '../../constants'
import moment from 'moment'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import CityGraph from './CityGraph'
import CustomerGraph from './CustomerGraph'
const TeamGraph = React.lazy(() => import('./TeamGraph'))
const ProductGraph = React.lazy(() => import('./ProductGraph'))
const Statistics = () => {
  const [value, setValue] = React.useState('1')
  const [customRange, setCustomRange] = useState({
    startDate: null,
    endDate: null,
  })
  const [daterange, setDateRange] = useState(REPORT.PERIODSELECTOR)
  const [selectedPeriod, setSelectedPeriod] = useState(daterange[0].type)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
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
            <Tab label="City" value="3" />
            <Tab label="Customer" value="4" />
            <Tab label="Team" value="2" />
          </Tabs>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                marginRight: '10PX',
                flexDirection: 'row',
              }}
            >
              {selectedPeriod === 'custom' && (
                <>
                  <Box sx={{ marginRight: '10px' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        className="staff_date"
                        inputFormat="dd/MM/yyyy"
                        value={customRange.startDate}
                        onChange={e => {
                          setCustomRange({
                            ...customRange,
                            startDate: moment(e).format('YYYY-MM-DD'),
                          })
                        }}
                        renderInput={params => (
                          <TextField
                            sx={{
                              width: '175px',
                              background: 'white',
                            }}
                            placeholder="Start Date"
                            {...params}
                          />
                        )}
                        PopperProps={{
                          placement: 'bottom-start',
                        }}
                      />
                    </LocalizationProvider>
                  </Box>

                  <Box>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        className="staff_date"
                        inputFormat="dd/MM/yyyy"
                        minDate={customRange.startDate}
                        value={customRange.endDate}
                        onChange={e => {
                          setCustomRange({
                            ...customRange,
                            endDate: moment(e).format('YYYY-MM-DD'),
                          })
                        }}
                        renderInput={params => (
                          <TextField
                            sx={{
                              width: '175px',
                              background: 'white',
                            }}
                            placeholder="End Date"
                            {...params}
                          />
                        )}
                        PopperProps={{
                          placement: 'bottom-start',
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                </>
              )}
            </Box>
            <Select
              sx={{
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
        </Box>

        <Box className="below_main_tab_section">
          {value === '1' && (
            <ProductGraph
              selectedPeriod={selectedPeriod}
              customRange={customRange}
            />
          )}
          {value === '2' && (
            <TeamGraph
              selectedPeriod={selectedPeriod}
              customRange={customRange}
            />
          )}
          {value === '3' && (
            <CityGraph
              selectedPeriod={selectedPeriod}
              customRange={customRange}
            />
          )}
          {value === '4' && (
            <CustomerGraph
              selectedPeriod={selectedPeriod}
              customRange={customRange}
            />
          )}
        </Box>
      </Box>
    </>
  )
}

export default Statistics
