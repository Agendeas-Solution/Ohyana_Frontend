import React, { useContext } from 'react'
import { Box, Typography } from '@mui/material'
import './index.css'
import DepartmentIcon from '../../assets/img/department_icon.svg'
import ProductIcon from '../../assets/img/Product.svg'
import PremiumIcon from '../../assets/img/Premium.svg'
import LeaveAndHolidayIcon from '../../assets/img/Leave_and_Holiday.svg'
import ExpensePolicyIcon from '../../assets/img/Expense_Policy.svg'
import IntegrationsIcon from '../../assets/img/Integrations.svg'
import { useNavigate } from 'react-router-dom'
import { Context as AuthContext } from '../../context/authContext/authContext'
import Poll from '../../assets/img/Poll.svg'
import PermissionsGate from './PermissionGate'
import { PERMISSION } from '../../constants'

const Settings = () => {
  const { flagLoader, permissions } = useContext(AuthContext).state
  const navigate = useNavigate()
  return (
    <>
      <Box className="main_section" sx={{ height: '90%', overflowY: 'auto' }}>
        <Box
          className="setting_cards_list"
          onClick={() => {
            navigate('/companyprofile')
          }}
        >
          <img
            className="department_icon"
            src={ProductIcon}
            alt="ProductIcon"
          />
          <Typography variant="span">Company Profile</Typography>
        </Box>
        <PermissionsGate scopes={[PERMISSION.PERMISSIONS.VIEW_ROLE]}>
          <Box
            className="setting_cards_list"
            onClick={() => {
              navigate('/jobrolelist')
            }}
          >
            <img
              className="department_icon"
              src={DepartmentIcon}
              alt="department_icon"
            />
            <Typography variant="span">Team Role</Typography>
          </Box>
        </PermissionsGate>
        {/* permission_control */}
        <PermissionsGate scopes={[PERMISSION.PERMISSIONS.VIEW_PRODUCT]}>
          <Box
            className="setting_cards_list"
            onClick={() => {
              navigate('/productlist')
            }}
          >
            <img
              className="department_icon"
              src={ProductIcon}
              alt="ProductIcon"
            />
            <Typography variant="span">Product</Typography>
          </Box>
        </PermissionsGate>
        <Box
          className="setting_cards_list"
          onClick={() => {
            navigate('/leaveholidaymanagement')
          }}
        >
          <img
            className="leave_holiday_icon"
            src={LeaveAndHolidayIcon}
            alt="DepartmentIcon"
          />
          <Typography variant="span">Leave & Holiday</Typography>
        </Box>
        <PermissionsGate scopes={[PERMISSION.PERMISSIONS.VIEW_EXPENSE]}>
          <Box
            className="setting_cards_list"
            onClick={() => {
              navigate('/expenselist')
            }}
          >
            <img
              className="expense_icon"
              src={ExpensePolicyIcon}
              alt="DepartmentIcon"
            />
            <Typography variant="span">Expense Policy</Typography>
          </Box>
        </PermissionsGate>
        <PermissionsGate scopes={[PERMISSION.PERMISSIONS.ACCESS_INTEGRATION]}>
          <Box
            className="setting_cards_list"
            onClick={() => {
              navigate('/integrations')
            }}
          >
            <img
              className="expense_icon"
              src={IntegrationsIcon}
              alt="DepartmentIcon"
            />
            <Typography variant="span">Integrations</Typography>
          </Box>
        </PermissionsGate>
      </Box>
    </>
  )
}

export default Settings
