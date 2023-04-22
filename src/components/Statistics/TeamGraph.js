import React, { useEffect, useState } from 'react'
import { Box, Typography, Autocomplete, TextField, Button } from '@mui/material'
import './index.css'
import { UserData } from './Data'
import LineChart from './LineChart'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import ProductGraph from './ProductGraph'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import BarChart from './BarChart'
import { GetTeamReport } from '../../services/apiservices/productDetail'

const TeamGraph = ({ selectedPeriod }) => {
  const top100Films = [{ label: 'The Shawshank Redemption', year: 1994 }]
  const [graphData, setGraphData] = useState()
  const [userData, setUserData] = useState({
    // labels: UserData.map((data) => data.year),
  })
  useEffect(() => {
    GetTeamReport(
      { selectedPeriod: selectedPeriod },
      res => {
        setGraphData(res?.data)
      },
      err => {},
    )
  }, [selectedPeriod])
  useEffect(() => {
    let color = []
    if (graphData) {
      for (var i = 0; i < graphData.length; i++) {
        color.push('#' + Math.floor(Math.random() * 16777215).toString(16))
      }
    }
    let datga =
      graphData &&
      graphData.map((value, index) => {
        let a = []
        a[index] = value.points
        return {
          data: a,
          label: value?.name,
          backgroundColor:
            '#' + Math.floor(Math.random() * 16777215).toString(16),
          borderWidth: 1,
          barThickness: 20,
          borderSkipped: 'middle',
          circular: true,
        }
      })
    graphData &&
      setUserData({
        ...userData,
        labels: graphData && graphData.map(value => value?.name),
        datasets: datga,
      })
  }, [graphData])
  return (
    <>
      <Box className=" graph_section team_graph">
        <Box className="common_row mb-3">
          <Box>
            <Typography
              variant="span"
              sx={{ color: '#2E3591', fontSize: '20px', fontWeight: '600' }}
            >
              Overall
            </Typography>
          </Box>

          <Box sx={{ display: 'flex' }}>
            <Autocomplete
              disablePortal
              options={top100Films}
              sx={{ width: '200px', marginRight: '10px' }}
              renderInput={params => (
                <TextField
                  className="common_dropdown"
                  {...params}
                  label="Performance"
                />
              )}
            />
            <Autocomplete
              disablePortal
              options={top100Films}
              sx={{ width: '200px', marginRight: '10px' }}
              renderInput={params => (
                <TextField
                  className="common_dropdown"
                  {...params}
                  label="Jr. Sales Person"
                />
              )}
            />
            <Autocomplete
              disablePortal
              options={top100Films}
              sx={{ width: '200px' }}
              renderInput={params => (
                <TextField
                  className="common_dropdown"
                  {...params}
                  label="Benedict Cumberbatch"
                />
              )}
            />
          </Box>
        </Box>
        <Box
          sx={{
            border: '1px solid #E5E5E5',
            borderRadius: '5px',
            // margin: '3px',
          }}
          className="me-3"
        >
          {userData?.datasets && <BarChart chartData={userData} />}
        </Box>
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table
            sx={{
              maxWidth: 300,
              marginTop: '20px',
              // border: '1px solid black',
            }}
          >
            <TableHead className="team_overview_table_heading">
              <TableRow>
                <TableCell>Sr No.</TableCell>
                <TableCell>Team Member</TableCell>
                <TableCell>Points</TableCell>
                <TableCell align="left">Performance</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell>1</TableCell>
                <TableCell>Benedict Cumberbatch</TableCell>
                <TableCell>30</TableCell>
                <TableCell>+ 4%</TableCell>
                <TableCell>
                  <Button
                    // onClick={() => {
                    //   navigate(`/orderDetail/${orderData?.id}`)
                    // }}
                    className="common_button"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>2</TableCell>
                <TableCell> Rober Downey</TableCell>
                <TableCell>20</TableCell>
                <TableCell>- 2%</TableCell>
                <TableCell>
                  <Button className="common_button">View</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default TeamGraph
