import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  Checkbox,
  OutlinedInput,
  TableBody,
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  Button,
} from '@mui/material'
import './index.css'
import BarChart from './BarChart'
import Paper from '@mui/material/Paper'
import { GetTeamReport } from '../../services/apiservices/productDetail'
import { GetAdminRole } from '../../services/apiservices/adminprofile'
import { GetAdminStaffDetailList } from '../../services/apiservices/staffDetail'
import { TEAM } from '../../constants'
import StarPerformer from '../../assets/img/star_performer.png'

import { Context as ContextSnackbar } from '../../context/pageContext'
const TeamGraph = ({ selectedPeriod, customRange }) => {
  const [graphData, setGraphData] = useState()
  const [userData, setUserData] = useState({})
  const [jobRoleList, setJobRoleList] = useState([])
  const [selectedJobRole, setSelectedJobRole] = useState('')
  const [teamMembersList, setTeamMembersList] = useState([])
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([])
  const [comparisonList, setComparisonList] = useState(TEAM.COMPARISONTYPE)
  const [selectedComparison, setSelectedComparison] = useState('points')
  const { errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setErrorSnackbar } = useContext(ContextSnackbar)
  const handleChange = event => {
    const { value } = event.target
    const selectedMembers = value.map(id =>
      teamMembersList.find(name => name.id === id),
    )
    setSelectedTeamMembers(selectedMembers)
  }
  const handleJobRole = () => {
    GetAdminRole(
      {},
      res => {
        setJobRoleList(res.data)
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
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
    if (selectedPeriod === 'custom') {
      data['dateFrom'] = customRange.startDate
      data['dateTo'] = customRange.endDate
    }
    if (
      selectedPeriod === 'custom' &&
      customRange.startDate &&
      customRange.endDate
    ) {
      GetTeamReport(
        data,
        res => {
          setGraphData(res?.data)
        },
        err => {
          setErrorSnackbar({
            ...errorSnackbar,
            status: true,
            message: err?.response?.data?.message,
          })
        },
      )
    } else if (selectedPeriod !== 'custom') {
      GetTeamReport(
        data,
        res => {
          setGraphData(res?.data)
        },
        err => {
          setErrorSnackbar({
            ...errorSnackbar,
            status: true,
            message: err?.response?.data?.message,
          })
        },
      )
    }
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
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
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
        const colors = '#' + Math.floor(Math.random() * 16777215).toString(16)
        return {
          data: a,
          label: value?.name,
          backgroundColor: colors,
          borderWidth: 0,
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
              <InputLabel>Compare</InputLabel>
              <Select
                className="report_tab_heading_option"
                label="Compare "
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
            <FormControl sx={{ width: '200px', marginLeft: '10px' }}>
              <InputLabel>Job Role</InputLabel>
              <Select
                className="report_tab_heading_option"
                label="Job Role"
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
            <FormControl sx={{ width: '200px', marginLeft: '10px' }}>
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

        <Box sx={{ height: '65vh !important' }}>
          {userData?.datasets && <BarChart chartData={userData} />}
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <Box sx={{ padding: '0px 10px', width: '50%' }}>
            <TableContainer className="set_box_shadow" component={Paper}>
              <Table
                stickyHeader
                aria-label="sticky table"
                sx={{ minWidth: 500, padding: '0px !important' }}
                className="table_heading"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Sr. No.</TableCell>
                    <TableCell>Team Member</TableCell>
                    <TableCell>Points</TableCell>
                    <TableCell>Performance</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    sx={{
                      '&:last-child td,th': { border: 0 },
                    }}
                  >
                    <TableCell>fds</TableCell>
                    <TableCell>fds </TableCell>
                    <TableCell>fdsf</TableCell>
                    <TableCell>fdsf</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <Button
                          sx={{ marginRight: '10px' }}
                          className="border_button_small"
                        >
                          Edit
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box sx={{ width: '50%', marginLeft: '25px' }} className="detail_row">
            <Box className="star_performers_section">
              <Box className="my_main_section_header">
                <Typography
                  className="bottom_left_panel_heading"
                  variant="span"
                >
                  Star Performers
                </Typography>
              </Box>
              <Box className="a-box">
                <Box className="img-container">
                  <Box className="img-inner">
                    <Box className="inner-skew">
                      <img src={StarPerformer} />
                    </Box>
                  </Box>
                </Box>
                <Box className="text-container">
                  <h3>Paul Walker</h3>
                  <h6>Sr. Sales Person</h6>
                  <h5>Star Performer of the Month.</h5>
                </Box>
              </Box>
              <Box className="a-box">
                <Box className="img-container">
                  <Box className="img-inner">
                    <Box className="inner-skew">
                      <img src={StarPerformer} />
                    </Box>
                  </Box>
                </Box>
                <Box className="text-container">
                  <h3>Paul Walker</h3>
                  <h6>Sr. Sales Person</h6>
                  <h5>Star Performer of the Month.</h5>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default TeamGraph
