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
  TableBody,
  TableContainer,
  Table,
  makeStyles,
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
        console.log(err)
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
      <Box className="main_section">
        <Box className="main_section_header" sx={{ borderBottom: 'none' }}>
          <Typography className="task_card_heading" variant="span">
            Expense List
          </Typography>
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
        </Box>

        <Box>
          <TableContainer>
            <Table>
              <TableHead className="client_profile_table_header">
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {expenseList.length > 0 &&
                  expenseList?.map((data, index) => (
                    <React.Fragment key={index}>
                      <TableRow
                        style={{
                          border: '1px solid black',
                          padding: '5rem',
                        }}
                        key={data.id}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{data.name || '-'}</TableCell>
                        <TableCell className="job_role_description">
                          {data.description || '-'}
                        </TableCell>

                        <TableCell>
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
                            src={EditIcon}
                          />
                          <img
                            onClick={() => {
                              setDeletexpenseListDialog({
                                ...deletexpenseListDialog,
                                status: true,
                                id: data.id,
                              })
                            }}
                            src={DeleteIcon}
                          />
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
