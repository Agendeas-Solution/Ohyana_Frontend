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
} from '@mui/material'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import './index.css'
import { GetAddEditAdminRole } from '../../services/apiservices/adminprofile'
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
const DeleteDepartmentDialog = React.lazy(() =>
  import('./DeleteDepartmentDialog'),
)
const AddEditDepartmentDialog = React.lazy(() =>
  import('./AddEditDepartmentDialog'),
)
const EditJobRoleDialog = React.lazy(() => import('./EditJobRoleDialog'))

// const useStyles = makeStyles((theme) => ({
//   // root: {
//   //   flexGrow: 1
//   // },
//   // paper: {
//   //   padding: theme.spacing(2),
//   //   margin: "auto",
//   //   maxWidth: 500
//   // },
//   // outerColumn: {
//   //   borderRight: "1px solid grey",
//   //   borderBottom: "1px solid grey",
//   //   borderLeft: "1px solid grey",
//   //   height: 100
//   // },
//   centerColumn: {
//     borderBottom: "1px solid grey",
//     height: 100,
//   },
// }));

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
    GetAddEditAdminRole(
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
        <Box className="job_role_title mb-3">
          <Typography variant="span" className="ms-2">
            Job Roles
          </Typography>
          <Button
            onClick={() => {
              setJobRoleDialogControl(true)
            }}
            variant="contained"
          >
            + Add Job Role
          </Button>
        </Box>
        <Divider
          sx={{ borderColor: '#8E8E8E' }}
          orientation="horizontal"
          width="100%"
        />
        <Box sx={{ marginTop: '19px', width: 'initial' }}>
          {/* <Grid
            sx={{
              background: "#F1F2F6",
              marginLeft: "1px",
              marginRight: "8px",
            }}
            container
            spacing={2}
            className="align-items-center d-flex justify-content-center"
          >
            <Grid align="left" item xs={1}>
              <Typography variant="span">Sr. No.</Typography>
            </Grid>
            <Grid align="left" item xs={3}>
              <Typography variant="span">Job Role</Typography>
            </Grid>
            <Grid align="left" item xs={3}>
              <Typography variant="span">Senior Post</Typography>
            </Grid>
            <Grid align="left" item xs={3}>
              <Typography variant="span">Description</Typography>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid> */}
          <Box
            sx={{
              backgroundColor: '#F1F2F6',
              marginBottom: '20px',
              borderRadius: '6px',
            }}
          >
            <TableHead
              sx={{ paddingTop: '5px' }}
              className="client_profile_table_header"
            >
              <TableRow>
                <TableCell sx={{ paddingRight: '4px' }}></TableCell>
                <TableCell sx={{ paddingRight: '64px' }}>Sr No.</TableCell>
                <TableCell sx={{ paddingRight: '70px' }} align="left">
                  Job Role
                </TableCell>
                <TableCell sx={{ paddingLeft: '130px' }} align="left">
                  Senior Post
                </TableCell>
                <TableCell sx={{ paddingLeft: '114px' }} align="left">
                  Description
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
          </Box>
        </Box>
        {jobRoleList?.roles &&
          jobRoleList?.roles.map((data, index) => {
            return (
              <Box className="appointment_notification">
                <Grid
                  container
                  spacing={2}
                  className="d-flex justify-content-center"
                >
                  <Grid item xs={1}>
                    <Typography variant="span">{index + 1}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="span">{data.name}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="span">{data.name}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className="job_role_description" variant="span">
                      {data.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/jobroleaccess/${data.id}`)}
                      className="attendance_button"
                    >
                      View
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )
          })}
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
