import React, { useEffect, useState, useContext } from 'react'
import {
  Box,
  Typography,
  Divider,
  Button,
  FormControlLabel,
  Grid,
  Autocomplete,
  TextField,
  Checkbox,
  makeStyles,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Table,
} from '@mui/material'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import './index.css'
import {
  GetAddEditAdminRole,
  GetAdminRole,
} from '../../services/apiservices/adminprofile'
import {
  UpdatePermission,
  getUserPermissions,
} from '../../services/apiservices/adminprofile'
import { Context as ContextSnackbar } from '../../context/pageContext'
import StaffIcon from '../../assets/img/staff.svg'
import ClientIcon from '../../assets/img/Clients.svg'
import SettingIcon from '../../assets/img/setting.svg'
import { Context as AuthContext } from '../../context/authContext/authContext'
import { useNavigate } from 'react-router-dom'

const JobRoleDialog = React.lazy(() => import('./JobRoleDialog'))
const DeleteJobRoleDialog = React.lazy(() => import('./DeleteJobRoleDialog'))
const EditJobRoleDialog = React.lazy(() => import('./EditJobRoleDialog'))

const JobRolesList = () => {
  // const classes = useStyles();
  let navigate = useNavigate()
  const { flagLoader, permissions } = useContext(AuthContext).state
  const [jobRoleDialogControl, setJobRoleDialogControl] = useState(false)

  const [deleteJobRoleDialogControl, setDeleteJobRoleDialogControl] = useState({
    status: false,
    id: null,
  })
  const handleClose = () => {
    setJobRoleDialogControl(false)
    // setAddEditDepartmentDialogControlDummy(false)
  }
  const [deleteDepartmentDialogControl, setDeleteDepartmentControl] = useState({
    status: false,
    id: null,
  })

  const [editJobRoleDialogControl, setEditJobRoleDialogControl] = useState({
    status: false,
    departmentId: null,
    name: '',
    description: '',
    roleId: null,
  })

  const [addEditDepartmentDialogControl, setAddEditDepartmentDialogControl] =
    useState({
      status: false,
      id: null,
      departmentName: '',
    })
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
      err => {
        console.log(err)
      },
    )
  }, [])

  return (
    <>
      <div className="main_section">
        <Box className="main_section_header" sx={{ borderBottom: 'none' }}>
          <Typography className="task_card_heading" variant="span">
            Job Roles
          </Typography>
          <Button
            className="primary_color_button"
            onClick={() => {
              setJobRoleDialogControl(true)
            }}
            variant="contained"
          >
            + Add Job Role
          </Button>
        </Box>

        <Box className="left_team_profile_section">
          <TableContainer>
            <Table className="job_role_list">
              <TableHead className="client_profile_table_header">
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
                      <TableRow className="job_role_list " key={data.id}>
                        <TableCell className="table_row_top_align">
                          {index + 1}
                        </TableCell>
                        <TableCell className="table_row_top_align">
                          {data.name || '-'}
                        </TableCell>
                        <TableCell className="table_row_top_align">
                          {data.name || '-'}
                        </TableCell>
                        <TableCell className="description_text">
                          {data.description || '-'}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() =>
                              navigate(`/jobroleaccess/${data.id}`)
                            }
                            className="button_color"
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
      </div>
      <JobRoleDialog
        jobRoleList={jobRoleList}
        jobRoleDialogControl={jobRoleDialogControl}
        handleClose={handleClose}
      />
    </>
  )
}

export default JobRolesList
