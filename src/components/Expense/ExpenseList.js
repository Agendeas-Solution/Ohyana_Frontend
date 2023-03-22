import React, { useEffect, useState, useContext } from 'react'
import {
  Box,
  Typography,
  Divider,
  Button,
  Grid,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material'
// import "./index.css";
import { GetAdminRole } from '../../services/apiservices/adminprofile'
import { Context as AuthContext } from '../../context/authContext/authContext'
import { useNavigate } from 'react-router-dom'
import {
  GetExpenseList,
  GetExpenseTypeList,
} from '../../services/apiservices/staffDetail'

const ExpenseList = () => {
  let navigate = useNavigate()
  const { flagLoader, permissions } = useContext(AuthContext).state
  const [jobRoleDialogControl, setJobRoleDialogControl] = useState(false)

  const [deleteJobRoleDialogControl, setDeleteJobRoleDialogControl] = useState({
    status: false,
    id: null,
  })

  const [editExpenseListDialog, setEditExpenseListDialog] = useState({
    status: false,
    departmentId: null,
    name: '',
    description: '',
    roleId: null,
  })

  const [expenseList, setExpenseList] = useState([])

  useEffect(() => {
    let path = window.location.pathname
    console.log('Printing Path of ', path)
    console.log('Printing ', path.split('/').pop())
    path = path.split('/').pop()
    GetExpenseTypeList(
      parseInt(path),
      res => {
        if (res.status === 200) {
          //   for (let i = 0; i < res.data.length; i++) {
          //     for (let j = 0; j < res.data.length; j++) {
          //       console.log(res.data[i].name);
          //       console.log(res.data[i].description);
          //       console.log(res.data[i].departmentId);
          //       setExpenseList({
          //         ...expenseList,
          //         name: res.data[i].name,
          //         description: res.data[i].description,
          //         departmentId: res.data[i].id,
          //         // roles: res.data[i].description,
          //         // roles: res.data[i][j],
          //       });
          //     }
          //   }
          setExpenseList(res?.data)
        }
      },
      err => {
        console.log(err)
      },
    )
  }, [
    deleteJobRoleDialogControl.status,
    jobRoleDialogControl,
    editExpenseListDialog.status,
  ])

  return (
    <>
      <div className="main_section p-4">
        <Box className="job_role_title mb-3">
          <Typography variant="span" className="ms-2">
            Expense List
          </Typography>
          {permissions?.editDepartment && (
            <Button
              onClick={() => {
                setJobRoleDialogControl(true)
              }}
              variant="contained"
            >
              + Expense Type
            </Button>
          )}
        </Box>
        <Divider
          sx={{ borderColor: '#8E8E8E' }}
          orientation="horizontal"
          // variant="middle"
          width="100%"
          // flexItem
        />
        <Box sx={{ marginTop: '19px', width: 'initial' }}>
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
                  Name
                </TableCell>
                <TableCell sx={{ paddingLeft: '130px' }} align="left">
                  Description
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
          </Box>
        </Box>
        {expenseList.length > 0 &&
          expenseList?.map((data, index) => {
            return (
              <Box className="appointment_notification">
                <Grid
                  container
                  spacing={2}
                  className="align-items-center d-flex justify-content-center"
                >
                  <Grid item xs={1}>
                    <Typography variant="span">{index + 1}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="span">{data.name}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="span">{data.description}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/jobroleaccess/${data.id}`)}
                      className="attendance_button"
                    >
                      Edit and Delete Icons
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )
          })}
      </div>
    </>
  )
}

export default ExpenseList
