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
import { Context as ContextSnackbar } from '../../context/pageContext'
import { Context as AuthContext } from '../../context/authContext/authContext'
import { useNavigate } from 'react-router-dom'
import {
  GetExpenseTypeList,
  CreateExpenseType,
  DeleteExpenseType,
  UpdateExpenseType,
} from '../../services/apiservices/staffDetail'
import PermissionsGate from '../Settings/PermissionGate'
import { PERMISSION } from '../../constants'
const DeleteExpenseTypeDialog = React.lazy(() =>
  import('./DeleteExpenseTypeDialog'),
)

const styles = {
  tableHeading: {
    whiteSpace: 'nowrap',
  },
  tableCell: {
    whiteSpace: 'wrap !important',
  },
}
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
      err => {},
    )
  }
  useEffect(() => {
    GetExpenseList()
  }, [])

  const handleCloseDialog = () => {
    setAddExpenseType({ ...addExpenseType, status: false })
    setDeletexpenseListDialog({ ...deletexpenseListDialog, status: false })
  }
  const handleDelete = () => {
    DeleteExpenseType(
      deletexpenseListDialog.id,
      res => {
        if (res.success) {
          handleCloseDialog()
          setSuccessSnackbar({
            ...successSnackbar,
            status: true,
            message: res.message,
          })
          GetExpenseList()
        }
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

  const handleAddExpenses = () => {
    let data = addExpenseType
    delete data.status
    delete data.expenseId
    CreateExpenseType(
      data,
      res => {
        if (res?.success) {
          setAddExpenseType({
            ...addExpenseType,
            status: false,
            name: '',
            description: '',
          })
          GetExpenseList()
          setSuccessSnackbar({
            ...successSnackbar,
            status: true,
            message: res.message,
          })
        }
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
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }
  return (
    <>
      <Box className="main_section">
        <Box className="main_section_header" sx={{ borderBottom: 'none' }}>
          <Typography className="task_card_heading" variant="span">
            Expense List
          </Typography>
          <PermissionsGate scopes={[PERMISSION.PERMISSIONS.EDIT_EXPENSE]}>
            <Button
              className="primary_color_button"
              variant="contained"
              onClick={() =>
                setAddExpenseType({
                  ...addExpenseType,
                  status: true,
                  name: '',
                  expenseId: '',
                  description: '',
                })
              }
            >
              + Expense Type
            </Button>
          </PermissionsGate>
        </Box>
        <Divider />
        <Box className="left_team_profile_section" sx={{ marginTop: '10px' }}>
          <TableContainer>
            <Table className="job_role_list">
              <TableHead className="profile_data_table_header">
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <Divider orientation="vertical" variant="middle" flexItem />
              <TableBody>
                {expenseList.length > 0 &&
                  expenseList?.map((data, index) => (
                    <React.Fragment key={index}>
                      <TableRow className="job_role_list " key={data.id}>
                        <TableCell className="table_row_top_align">
                          {index + 1}
                        </TableCell>
                        <TableCell className="table_row_top_align">
                          {data.name || '-'}
                        </TableCell>
                        <TableCell className="text-wrap">
                          {data.description || '-'}
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{ display: 'flex', justifyContent: 'flex-end' }}
                          >
                            <PermissionsGate
                              scopes={[PERMISSION.PERMISSIONS.EDIT_EXPENSE]}
                            >
                              <Button
                                sx={{
                                  marginRight: '10px',
                                }}
                                onClick={() =>
                                  setAddExpenseType({
                                    ...addExpenseType,
                                    status: true,
                                    expenseId: data.id,
                                    name: data.name,
                                    description: data.description,
                                  })
                                }
                                className="button_color"
                                variant="outlined"
                              >
                                Edit
                              </Button>
                            </PermissionsGate>
                            <PermissionsGate
                              scopes={[PERMISSION.PERMISSIONS.DELETE_EXPENSE]}
                            >
                              <Button
                                className="button_color"
                                variant="outlined"
                                onClick={() => {
                                  setDeletexpenseListDialog({
                                    ...deletexpenseListDialog,
                                    status: true,
                                    id: data.id,
                                  })
                                }}
                              >
                                Delete
                              </Button>
                            </PermissionsGate>
                          </Box>
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
    </>
  )
}

export default ExpenseList
