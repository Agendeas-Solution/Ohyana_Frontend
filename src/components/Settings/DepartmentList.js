import React, { useEffect, useState, useContext } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { GetAdminDepartmentList } from '../../services/apiservices/adminprofile'
import { Context as AuthContext } from '../../context/authContext/authContext'
// import { AddEditDepartmentDialog } from '../../constants/allImportConstant'
const DepartmentList = () => {
  let navigate = useNavigate()
  const [AdminDepartmentList, setAdminDepartmentList] = useState([])
  const [addEditDepartmentDialogControl, setAddEditDepartmentDialogControl] =
    useState(false)
  useEffect(() => {
    GetAdminDepartmentList(
      {},
      res => {
        if (res.success) {
          setAdminDepartmentList(res?.data)
        }
      },
      err => {},
    )
  }, [addEditDepartmentDialogControl])

  return (
    <>
      <div className="add_product_button p-3">
        <Typography variant="span">All Department</Typography>
        <Button
          onClick={() => {
            setAddEditDepartmentDialogControl({
              ...addEditDepartmentDialogControl,
              status: true,
            })
          }}
          className="main_department_button"
        >
          + Add Department
        </Button>
      </div>
      <Box className="department_list_section inner_content">
        {AdminDepartmentList.map(row => {
          return (
            <Box
              onClick={() => navigate(`/jobrolelist/${row.id}`)}
              className="setting_cards"
            >
              <Typography variant="span">{row.name}</Typography>
            </Box>
          )
        })}
      </Box>
    </>
  )
}

export default DepartmentList
