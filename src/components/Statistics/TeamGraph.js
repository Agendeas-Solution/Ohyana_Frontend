import React, { useEffect, useState } from 'react'
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
  ListItemText,
  Checkbox,
  OutlinedInput,
} from '@mui/material'
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
import { GetAdminRole } from '../../services/apiservices/adminprofile'
import { GetAdminStaffDetailList } from '../../services/apiservices/staffDetail'
import { TEAM } from '../../constants'
const TeamGraph = ({ selectedPeriod }) => {
  const top100Films = [{ label: 'The Shawshank Redemption', year: 1994 }]
  const [graphData, setGraphData] = useState()
  const [userData, setUserData] = useState({})
  const [jobRoleList, setJobRoleList] = useState([])
  const [selectedJobRole, setSelectedJobRole] = useState('')
  const [teamMembersList, setTeamMembersList] = useState([])
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([])
  const [comparisonList, setComparisonList] = useState(TEAM.COMPARISONTYPE)
  const [selectedComparison, setSelectedComparison] = useState('points')
  const handleChange = event => {
    const { value } = event.target
    const selectedMembers = value.map(id =>
      teamMembersList.find(name => name.id === id),
    )
    setSelectedTeamMembers(selectedMembers)
    console.log('Selected Member:', selectedMembers)
  }
  const handleJobRole = () => {
    GetAdminRole(
      {},
      res => {
        setJobRoleList(res.data)
      },
      err => {},
    )
  }
  useEffect(() => {
    let data = {
      period: selectedPeriod,
      comparison: selectedComparison,
    }
    if (parseInt(selectedJobRole)) {
      data['roleId'] = parseInt(selectedJobRole)
    }
    if (selectedTeamMembers.length > 0) {
      data['teamIds'] = selectedTeamMembers.map(member => member.id)
    }
    GetTeamReport(
      data,
      res => {
        setGraphData(res?.data)
      },
      err => {},
    )
    handleJobRole()
  }, [selectedPeriod, selectedTeamMembers, selectedComparison])
  const handleGetTeamMemberList = () => {
    let data = {}
    if (parseInt(selectedJobRole)) {
      data['roleId'] = selectedJobRole
    }
    GetAdminStaffDetailList(
      data,
      res => {
        setTeamMembersList(res.data)
      },
      err => {
        setTeamMembersList([])
      },
    )
  }
  useEffect(() => {
    handleGetTeamMemberList()
  }, [selectedJobRole])

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
        a[index] = selectedComparison === 'points' ? value.points : value.amount
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
        <Box className="detail_row mb-3">
          <Box>
            <Typography variant="span" className="report_tab_heading">
              Overall
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <FormControl className="filter_body_inner_section">
              <InputLabel>comparison</InputLabel>
              <Select
                className="report_tab_heading_option"
                label="Select comparison "
                value={selectedComparison}
                onChange={e => {
                  setSelectedComparison(e.target.value)
                }}
              >
                {comparisonList.map(data => {
                  return <MenuItem value={data}>{data}</MenuItem>
                })}
              </Select>
            </FormControl>
            {/* <Autocomplete
              className="report_tab_heading_option"
              disablePortal
              options={top100Films}
              sx={{ marginRight: '10px' }}
              renderInput={params => (
                <TextField
                  className="common_dropdown"
                  {...params}
                  label="Performance"
                />
              )}
            /> */}
            <FormControl className="filter_body_inner_section">
              <InputLabel>Client Type</InputLabel>
              <Select
                className="report_tab_heading_option"
                label="Select Client Type"
                value={selectedJobRole}
                onChange={e => {
                  setSelectedJobRole(e.target.value)
                }}
              >
                {jobRoleList.map(data => {
                  return <MenuItem value={data.id}>{data.name}</MenuItem>
                })}
              </Select>
            </FormControl>
            <FormControl className="filter_body_inner_section">
              <InputLabel>Team Member</InputLabel>
              <Select
                className="report_tab_heading_option"
                label="Select Team Member"
                multiple
                value={selectedTeamMembers.map(member => member.id)}
                onChange={handleChange}
                input={<OutlinedInput label="Team Member" />}
                renderValue={selected =>
                  selected
                    .map(
                      id => teamMembersList.find(name => name.id === id).name,
                    )
                    .join(', ')
                }
              >
                {teamMembersList.map(member => (
                  <MenuItem key={member.id} value={member.id}>
                    <Checkbox
                      checked={selectedTeamMembers.some(
                        tag => tag.id === member.id,
                      )}
                    />
                    <ListItemText primary={member.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box className="report_tab_main_section">
          {userData?.datasets && <BarChart chartData={userData} />}
        </Box>
        <TableContainer component={Paper} className="set_box_shadow">
          <Table
            sx={{
              maxWidth: 300,
              marginTop: '20px',
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
