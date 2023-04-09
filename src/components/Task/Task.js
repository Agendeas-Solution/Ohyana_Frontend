import React, { useEffect, useState, useContext } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  Paper,
  TextareaAutosize,
  Toolbar,
  Drawer,
  Divider,
  Autocomplete,
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
import {
  GetAllMemberList,
  AssignMemberParticularTask,
} from '../../services/apiservices/task'
import { styled, useTheme } from '@mui/material/styles'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
const drawerWidth = 350
const CreateTaskDialog = React.lazy(() => import('./CreateTaskDialog'))
const AssignMemberDialog = React.lazy(() => import('./AssignMemberDialog'))

const Task = () => {
  const navigate = useNavigate()
  const [taskList, setTaskList] = useState([])
  const [openDrawer, setOpenDrawer] = useState(false)
  const [open, setOpen] = useState(false)
  const [openMemberDialog, setOpenMemberDialog] = useState(false)
  const { successSnackbar } = useContext(ContextSnackbar)?.state
  const [taskId, setTaskId] = useState()
  const [clientStage, setClientStage] = useState()
  const { setSuccessSnackbar } = useContext(ContextSnackbar)
  const theme = useTheme()
  const [member, setMember] = useState({})

  const [createTask, setCreateTask] = useState({
    title: '',
    description: '',
    due_date: '2023-03-31',
  })
  const [memberList, setMemberList] = useState([])
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const [clientType, setClientType] = useState([
    { stage: 'john', id: 0 },
    { stage: 'michael', id: 1 },
  ])

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
  const handleOpenMemberDialog = id => {
    setTaskId(id)
    GetAllMemberList(
      {},
      res => {
        setMemberList(res.data)
      },
      err => { },
    )
    setOpenMemberDialog(true)
  }
  const handleCloseMemberDialog = () => {
    setOpenMemberDialog(false)
  }
  const handleApplyFilter = () => {

  }
  const handleClearAllFilter = () => {


  }
  useEffect(() => {
    GetTaskList(
      {},
      res => {
        if (res?.success) {
          setTaskList(res?.data)
        }
      },
      err => {
        console.log(err)
      },
    )
  }, [])
  const handleCreateTask = () => {
    CreateTaskCall(
      createTask,
      res => {
        if (res?.success) {
          setSuccessSnackbar({
            ...successSnackbar,
            status: true,
            message: res.message,
          })
          handleClose()
        }
      },
      err => {
        console.log(err)
      },
    )
  }
  const handleAssignMember = memberId => {
    AssignMemberParticularTask(
      { taskid: taskId, memberid: memberId },
      res => {
        setMember()
        handleCloseMemberDialog()
      },
      err => { },
    )
  }

  return (
    <Box className="main_tab_section">

      <Box className="tab_header">
        <Box>
          <Typography sx={{ color: '#8E8E8E' }} variant="span">
            Overview
          </Typography>
        </Box>

        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FormControl variant="outlined">
              <OutlinedInput
                className="search_field"
                placeholder="Search Here..."
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton>
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
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ ...(openDrawer && { display: 'flex' }) }}
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
            <DrawerHeader sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>

                <IconButton
                  sx={{ color: '#2e3591' }}
                  disableRipple={true}
                  onClick={handleDrawerClose}
                >
                  {theme.direction === 'rtl' ? (
                    <ChevronLeftIcon sx={{ fontSize: '30px' }} />
                  ) : (
                    <ChevronRightIcon sx={{ fontSize: '30px' }} />
                  )}
                </IconButton>

                <Typography sx={{ fontSize: '20px', }}>
                  Filter By
                </Typography>
              </Box>
              <Box >
                <Button onClick={handleApplyFilter} variant="contained">Apply</Button>
                <Button onClick={handleClearAllFilter}>Clear All</Button>
              </Box>

            </DrawerHeader>

            <Divider />

            <Box sx={{ display: 'flex', flexDirection: 'column', margin: '10px' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}  >
                <DatePicker

                  inputFormat="dd/MM/yyyy"
                  value={createTask.due_date}
                  onChange={e => {
                    setCreateTask({
                      ...createTask,
                      due_date: moment(e).format('YYYY-MM-DD'),
                    })
                  }}
                  renderInput={params => (
                    <TextField variant="outlined"
                      {...params}
                      label="Date" sx={{ margin: '10px' }} />
                  )}
                  PopperProps={{
                    placement: 'bottom-start', // Set placement to 'bottom-start'
                  }}
                />
              </LocalizationProvider>

              <Autocomplete
                sx={{ margin: '10px' }}
                disablePortal
                options={clientType}
                value={
                  clientStage !== null ? clientType[clientStage] : null
                }
                onChange={(e, value) => {
                  console.log(value)
                  setClientStage(value?.id)
                }}
                getOptionLabel={option => option.stage}
                renderInput={params => (
                  <TextField
                    variant="outlined"
                    {...params}
                    label="Member Name"
                  />
                )}
              />

            </Box>
          </Drawer>
        </Box>
      </Box>

      <Box className="below_main_tab_section">
        <Box className="inner_container">
          {taskList.length > 0 &&
            taskList.map(taskData => {
              return (
                <Box
                  className='task_card'
                >
                  <Box
                    className="task_card_hover"
                    onClick={() => {
                      navigate(`/taskdetail/${taskData?.id}`)
                    }}
                  >
                    <Typography
                      className="task_card_heading"
                      variant="span"
                    >
                      {taskData.title}
                    </Typography>

                    <Typography className="task_description" variant="span">
                      {taskData.description}
                    </Typography>
                  </Box>

                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <Typography className="task_date" variant="span">
                      {moment(taskData.createdAt).format('Do MMM YY')}
                    </Typography>
                    {taskData?.team?.email ? (
                      <Typography className="name_chip " variant="span">
                        {taskData?.team?.email.toUpperCase().charAt(0)}
                      </Typography>
                    ) : (
                      <Button
                        onClick={() => handleOpenMemberDialog(taskData.id)}
                        className="task_button"
                      >
                        + Member
                      </Button>
                    )}
                  </Box>

                </Box>
              )
            })}
        </Box>
        <CreateTaskDialog
          handleClose={handleClose}
          fullScreen={fullScreen}
          open={open}
          createTask={createTask}
          handleCreateTask={handleCreateTask}
          setCreateTask={setCreateTask}
        />
        <AssignMemberDialog
          handleCloseMemberDialog={handleCloseMemberDialog}
          openMemberDialog={openMemberDialog}
          handleAssignMember={handleAssignMember}
          memberList={memberList}
          member={member}
          setMember={setMember}
        />
      </Box>

    </Box>
  )
}

export default Task
