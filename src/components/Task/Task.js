import React, { useEffect, useState, useContext } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  Drawer,
  Divider,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import InputAdornment from '@mui/material/InputAdornment'
import FilterIcon from '../../assets/img/Filter.svg'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useNavigate } from 'react-router-dom'
import { GetTaskList, CreateTaskCall } from '../../services/apiservices/task'
import moment from 'moment'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Context as ContextSnackbar } from '../../context/pageContext'
import './index.css'
import { styled, useTheme } from '@mui/material/styles'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import NoResultFound from '../ErrorComponent/NoResultFound'
import { GetAdminStaffDetailList } from '../../services/apiservices/staffDetail'
const drawerWidth = 350
const CreateTaskDialog = React.lazy(() => import('./CreateTaskDialog'))
const Task = () => {
  const navigate = useNavigate()
  const [taskList, setTaskList] = useState([])
  const [openDrawer, setOpenDrawer] = useState(false)
  const [open, setOpen] = useState(false)
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const theme = useTheme()
  const [member, setMember] = useState({})
  const [filterTask, setFilterTask] = useState({
    due_date: null,
    teamId: '',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(12)
  const [totalResult, setTotalresult] = useState()
  const [numbersToDisplayOnPagination, setNumbersToDisplayOnPagination] =
    useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [createTask, setCreateTask] = useState({
    title: '',
    description: '',
    due_date: moment().format(''),
    teamId: '',
  })
  const [memberList, setMemberList] = useState([])
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }))
  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }
  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleClearAllFilter = () => {
    setFilterTask({
      ...filterTask,
      due_date: null,
      teamId: '',
    })
  }
  const handleTaskList = () => {
    let data = {
      page: currentPage,
      size: rowsPerPage,
    }
    if (searchQuery !== '' && searchQuery) {
      data['searchQuery'] = searchQuery
    }
    if (filterTask.due_date !== '' && filterTask.due_date) {
      data['due_date'] = filterTask.due_date
    }

    if (filterTask.teamId !== '' && filterTask.teamId) {
      data['teamId'] = filterTask.teamId
    }
    GetTaskList(
      data,
      res => {
        if (res?.success) {
          setTaskList(res?.data?.tasks)
          setTotalresult(res?.data?.totalPage)
          let pages =
            res?.data?.totalPage > 0
              ? Math.ceil(res?.data?.totalPage / rowsPerPage)
              : null
          setNumbersToDisplayOnPagination(pages)
        }
      },
      err => {
        setTaskList([])
      },
    )
  }
  useEffect(() => {
    handleTaskList()
  }, [searchQuery, filterTask, currentPage])
  useEffect(() => {
    ;(openDrawer || open) &&
      GetAdminStaffDetailList(
        {},
        res => {
          setMemberList(res.data)
        },
        err => {},
      )
  }, [openDrawer, open])
  const handleCreateTask = () => {
    let data = {
      title: createTask.title,
      description: createTask.description,
      due_date: createTask.due_date,
    }
    if (createTask.teamId !== '' && createTask.teamId) {
      data['teamId'] = createTask.teamId
    }
    CreateTaskCall(
      data,
      res => {
        if (res?.success) {
          setSuccessSnackbar({
            ...successSnackbar,
            status: true,
            message: res.message,
          })
          handleTaskList()
          handleClose()
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
    <Box className="main_task_section">
      <Box className="tab_header">
        <Box>
          <Typography sx={{ color: '#8E8E8E' }} variant="span">
            Overview
          </Typography>
        </Box>
        <Box className="task_header_section">
          <FormControl variant="outlined">
            <OutlinedInput
              className="search_field"
              placeholder="Search Here..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              startAdornment={
                <InputAdornment position="start" sx={{ margin: '0px' }}>
                  <IconButton sx={{ margin: '0px' }}>
                    <SearchRoundedIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            onClick={handleClickOpen}
            className="main_tab_button"
            variant="span"
          >
            + Task
          </Button>
          <IconButton
            className="filter_icon"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{
              ...(openDrawer && { display: 'flex' }),
            }}
          >
            <img src={FilterIcon} alt="" />
          </IconButton>
        </Box>

        <Drawer
          onClose={handleDrawerClose}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
            },
          }}
          anchor="right"
          open={openDrawer}
        >
          <DrawerHeader className="drawer_header_section">
            <Box className="filter_main_heading">
              <IconButton
                sx={{ color: '#2e3591', padding: '0px' }}
                disableRipple={true}
                onClick={handleDrawerClose}
              >
                {theme.direction === 'rtl' ? (
                  <ChevronLeftIcon className="chevron_icon" />
                ) : (
                  <ChevronRightIcon className="chevron_icon" />
                )}
              </IconButton>
              <Typography sx={{ fontSize: '20px' }}>Filter By</Typography>
            </Box>
            <Box>
              <Button onClick={handleClearAllFilter} className="text_button">
                Reset
              </Button>
              <Button
                className="common_button"
                onClick={handleTaskList}
                variant="contained"
              >
                Apply
              </Button>
            </Box>
          </DrawerHeader>
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              sx={{ margin: '10px' }}
            >
              <DatePicker
                inputFormat="dd/MM/yyyy"
                value={filterTask.due_date}
                onChange={e => {
                  setFilterTask({
                    ...filterTask,
                    due_date: moment(e).format('YYYY-MM-DD'),
                  })
                }}
                renderInput={params => (
                  <TextField
                    variant="outlined"
                    {...params}
                    label="Date"
                    sx={{ margin: '10px' }}
                  />
                )}
                PopperProps={{
                  placement: 'bottom-start',
                }}
              />
            </LocalizationProvider>
            <FormControl sx={{ margin: '10px' }}>
              <InputLabel>Select Member</InputLabel>
              <Select
                label="Select Member"
                value={filterTask?.teamId}
                onChange={e => {
                  setFilterTask({ ...filterTask, teamId: e.target.value })
                }}
              >
                {memberList.length > 0 &&
                  memberList.map(data => {
                    return <MenuItem value={data?.id}>{data?.email}</MenuItem>
                  })}
              </Select>
            </FormControl>
          </Box>
        </Drawer>
      </Box>
      <Box className="below_main_tab_section">
        <Box className="inner_container">
          {taskList.length > 0 ? (
            taskList.map(taskData => {
              return (
                <Box
                  className="task_card task_card_hover"
                  onClick={() => {
                    navigate(`/taskdetail/${taskData?.id}`)
                  }}
                >
                  <Box>
                    <Typography className="task_card_heading" variant="span">
                      {taskData.title}
                    </Typography>
                    <Typography className="task_description" variant="span">
                      {taskData.description}
                    </Typography>
                  </Box>
                  <Box className="task_bottom_section">
                    <Typography className="task_date" variant="span">
                      {moment(taskData.createdAt).format('Do MMM YY')}
                    </Typography>
                    {taskData?.team?.email ? (
                      <Typography className="name_chip " variant="span">
                        {taskData?.team?.email.toUpperCase().charAt(0)}
                      </Typography>
                    ) : (
                      <Typography sx={{ color: '#8e8e8e' }}>
                        Not Assigned
                      </Typography>
                    )}
                  </Box>
                </Box>
              )
            })
          ) : (
            <NoResultFound />
          )}
        </Box>
        <Pagination
          className="pagination_style"
          boundaryCount={0}
          siblingCount={0}
          size="small"
          shape="rounded"
          count={numbersToDisplayOnPagination}
          page={currentPage}
          onChange={(e, value) => {
            setCurrentPage(value)
          }}
        />
        <CreateTaskDialog
          handleClose={handleClose}
          fullScreen={fullScreen}
          open={open}
          createTask={createTask}
          handleCreateTask={handleCreateTask}
          setCreateTask={setCreateTask}
          member={member}
          memberList={memberList}
          setMember={setMember}
        />
      </Box>
    </Box>
  )
}

export default Task
