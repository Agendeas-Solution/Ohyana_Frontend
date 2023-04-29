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
            padding: '10px',
          }}
        >
          <Typography variant="span">Overall</Typography>

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
      </Box>
    </>
  )
}

export default TeamGraph
