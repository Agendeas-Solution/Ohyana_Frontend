import React, { useEffect, useState, useContext } from 'react'
import {
  Box,
  Typography,
  Divider,
  Button,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Table,
} from '@mui/material'
import './index.css'
import { GetAdminRole } from '../../services/apiservices/adminprofile'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { Context as AuthContext } from '../../context/authContext/authContext'
import { useNavigate } from 'react-router-dom'
import PermissionsGate from './PermissionGate'
import { PERMISSION } from '../../constants'
const JobRoleDialog = React.lazy(() => import('./JobRoleDialog'))
const JobRolesList = () => {
  let navigate = useNavigate()
  const [jobRoleDialogControl, setJobRoleDialogControl] = useState(false)
  const handleClose = () => {
    setJobRoleDialogControl(false)
  }
  const [jobRoleList, setJobRoleList] = useState({
    name: '',
    roles: [],
    departmentId: null,
  })
  useEffect(() => {
    GetAdminRole(
      {},
      res => {
        if (res.success) {
          setJobRoleList({
            ...jobRoleList,
            roles: res.data,
          })
        }
      },
      err => {},
    )
  }, [])
  return (
    <>
      <Box className="main_section">
        <Box className="main_header_section">
          <Typography className="task_card_heading" variant="span">
            Job Roles
          </Typography>
          <PermissionsGate scopes={[PERMISSION.PERMISSIONS.EDIT_ROLE]}>
            <Button
              className="primary_color_button"
              onClick={() => {
                setJobRoleDialogControl(true)
              }}
            >
              + Add Job Role
            </Button>
          </PermissionsGate>
        </Box>
        <Divider />
        <Box className="left_team_profile_section" sx={{ marginTop: '10px' }}>
          <TableContainer>
            <Table className="job_role_list">
              <TableHead className="profile_data_table_header">
                <TableRow>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>Job Role</TableCell>
                  <TableCell>Senior Post</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <Divider orientation="vertical" variant="middle" flexItem />
              <TableBody>
                {jobRoleList?.roles &&
                  jobRoleList?.roles.map((data, index) => (
                    <React.Fragment key={index}>
                      <TableRow key={data.id}>
                        <TableCell className="table_row_top_align">
                          {index + 1}
                        </TableCell>
                        <TableCell className="table_row_top_align ">
                          {data.name || '-'}
                        </TableCell>
                        <TableCell className="table_row_top_align">
                          {data?.senior?.name || '-'}
                        </TableCell>
                        <TableCell className="description_text text-wrap">
                          {data.description || '-'}
                        </TableCell>
                        <TableCell>
                          <Button
                            className="button_color"
                            variant="outlined"
                            onClick={() =>
                              navigate(`/jobroleaccess/${data.id}`)
                            }
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                      <Divider
                        sx={{ height: '24px', borderColor: 'transparent' }}
                      />
                    </React.Fragment>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <JobRoleDialog
        jobRoleList={jobRoleList}
        jobRoleDialogControl={jobRoleDialogControl}
        handleClose={handleClose}
      />
    </>
  )
}

export default JobRolesList
