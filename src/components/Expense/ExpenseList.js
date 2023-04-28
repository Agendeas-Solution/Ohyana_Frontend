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
import './index.css'
import DeleteIcon from '../../assets/img/Delete_Icon.svg'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import EditWithBorderRound from '../../assets/img/edit_with_border_round.svg'
import DeleteWithBorderRound from '../../assets/img/delete_with_border_round.svg'
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

        <Box className="left_team_profile_section">
          <TableContainer>
            <Table className="job_role_list">
              <TableHead className="client_profile_table_header">
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell></TableCell>
                  {/* <TableCell></TableCell> */}
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
                        <TableCell className="description_text">
                          {data.description || '-'}
                        </TableCell>

                        <TableCell>
                          <Button
                            sx={{
                              marginRight: '10px',
                              color: '#2E3591',
                              borderColor: '#2E3591',
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
