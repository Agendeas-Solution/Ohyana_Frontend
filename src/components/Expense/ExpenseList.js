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
import DeleteIcon from '../../assets/img/Delete_Icon.svg'
import EditIcon from '../../assets/img/Edit_Icon.svg'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { Context as AuthContext } from '../../context/authContext/authContext'
import { useNavigate } from 'react-router-dom'
import {
  GetExpenseTypeList,
  CreateExpenseType,
  DeleteExpenseType,
  UpdateExpenseType,
} from '../../services/apiservices/staffDetail'
const DeleteExpenseTypeDialog = React.lazy(() =>
  import('./DeleteExpenseTypeDialog'),
)
const ExpenseType = React.lazy(() => import('./ExpenseType'))

const ExpenseList = () => {
  let navigate = useNavigate()
  const { flagLoader, permissions } = useContext(AuthContext).state
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const [deletexpenseListDialog, setDeletexpenseListDialog] = useState({
    status: false,
    id: null,
  })
  let path = window.location.pathname
  console.log('Printing Path of ', path)
  console.log('Printing ', path.split('/').pop())
  path = path.split('/').pop()
  const [addExpenseType, setAddExpenseType] = useState({
    expenseId: null,
    status: false,
    name: '',
    description: '',
  })

  const [expenseList, setExpenseList] = useState([])

  const GetExpenseList = () => {
    GetExpenseTypeList(
      parseInt(path),
      res => {
        if (res?.success) {
          setExpenseList(res?.data)
        }
      },
      err => {
        console.log(err)
      },
    )
  }
  useEffect(() => {
    GetExpenseList()
  }, [])

  const handleCloseDialog = () => {
    setAddExpenseType({ ...addExpenseType, status: false })
    setDeletexpenseListDialog({ ...deletexpenseListDialog, status: false })
  }
  const handleDelete = id => {
    DeleteExpenseType(
      id,
      res => {
        if (res.success) {
          setSuccessSnackbar({
            ...successSnackbar,
            status: true,
            message: res.data.message,
          })
          handleCloseDialog()
        }
      },
      err => {
        console.log(err)
      },
    )
  }

  const handleAddExpenses = () => {
    let data = addExpenseType
    delete data.status
    delete data.expenseId
    CreateExpenseType(
      data,
      res => {
        if (res?.success) {
          setSuccessSnackbar({
            ...successSnackbar,
            status: true,
            message: res.message,
          })
        }
      },
      err => {
        console.log(err)
      },
    )
  }
  const handleEditExpenses = () => {
    let data = addExpenseType
    delete data.status
    UpdateExpenseType(
      data,
      res => {
        if (res?.success) {
          setSuccessSnackbar({
            ...successSnackbar,
            status: true,
            message: res.message,
          })
          GetExpenseList()
        }
      },
      err => {
        console.log(err)
      },
    )
  }
  return (
    <>
      <div className="main_section p-4">
        <Box className="job_role_title mb-3">
          <Typography variant="span" className="ms-2">
            Expense List
          </Typography>
          {permissions?.editDepartment && (
            <Button
              onClick={() =>
                setAddExpenseType({
                  ...addExpenseType,
                  status: true,
                  name: '',
                  description: '',
                })
              }
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
                <TableCell sx={{ paddingRight: '68px' }}>Sr No.</TableCell>
                <TableCell sx={{ paddingRight: '70px' }} align="left">
                  Name
                </TableCell>
                <TableCell sx={{ paddingLeft: '75px' }} align="center">
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
                  <Grid item xs={2}>
                    <Typography variant="span">{data.name}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="span">{data.description}</Typography>
                  </Grid>
                  <Grid display="inline-flex" item xs={6}>
                    <img
                      onClick={() =>
                        setAddExpenseType({
                          ...addExpenseType,
                          status: true,
                          expenseId: data.id,
                          name: data.name,
                          description: data.description,
                        })
                      }
                      className="me-3 p-2"
                      src={EditIcon}
                      alt=""
                    />
                    <img
                      className="iconn ms-2"
                      onClick={() =>
                        setDeletexpenseListDialog({
                          ...deletexpenseListDialog,
                          status: true,
                          id: data.id,
                        })
                      }
                      src={DeleteIcon}
                      alt=""
                    />
                  </Grid>
                </Grid>
              </Box>
            )
          })}
        <ExpenseType
          addExpenseType={addExpenseType}
          handleCloseDialog={handleCloseDialog}
          setAddExpenseType={setAddExpenseType}
          handleAddExpenses={handleAddExpenses}
          handleEditExpenses={handleEditExpenses}
        />
        <DeleteExpenseTypeDialog
          deletexpenseListDialog={deletexpenseListDialog}
          setDeletexpenseListDialog={setDeletexpenseListDialog}
          handleCloseDialog={handleCloseDialog}
          handleDelete={handleDelete}
        />
      </div>
    </>
  )
}

export default ExpenseList
