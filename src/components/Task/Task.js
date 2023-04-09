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
const drawerWidth = 400
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
            sx={{
              width: 2,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
              },
            }}
            // variant="persistent"
            anchor="right"
            open={openDrawer}
          >
            <DrawerHeader>
              <Box className="d-flex justify-content-between column w-100 align-items-center">
                <Box className="d-flex column justify-content-between w-50 align-items-center">
                  <IconButton
                    // sx={{ paddingRight: '10px' }}
                    // sx={{ paddingRight: '12rem' }}
                    // className="pe-5"
                    disableRipple={true}
                    onClick={handleDrawerClose}
                  >
                    {theme.direction === 'rtl' ? (
                      <ChevronLeftIcon sx={{ fontSize: '30px' }} />
                    ) : (
                      <ChevronRightIcon sx={{ fontSize: '30px' }} />
                    )}
                  </IconButton>

                  <Typography
                    sx={{ fontSize: '22px', paddingRight: '60px' }}
                  >
                    Filter By
                  </Typography>
                </Box>
                <Box className=" d-flex justify-content-end row w-50">
                  <Typography sx={{ textAlign: 'end', color: '#2E3591' }}>
                    Clear All
                  </Typography>
                </Box>
              </Box>
            </DrawerHeader>

            <Divider />

            <Box className="py-3">
              <div className="row px-3">
                <div className="col-md-12 mb-1">
                  <Typography variant="span">Task Starting Date</Typography>
                </div>
                <div className="mb-4">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      disablePast
                      className="w-100"
                      value={createTask.due_date}
                      inputFormat="dd/MM/yyyy"
                      onChange={e => {
                        setCreateTask({
                          ...createTask,
                          due_date: moment(e).format('YYYY-MM-DD'),
                        })
                      }}
                      renderInput={params => (
                        <TextField className="w-100" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                <div className="col-md-12">
                  <Typography variant="span">Member</Typography>
                </div>

                <Autocomplete
                  className="mt-1 mx-2 align-items-center d-flex client_type_select justify-content-center"
                  options={clientType}
                  value={
                    clientStage !== null ? clientType[clientStage] : null
                  }
                  // sx={{ width: '30rem' }}
                  onChange={(e, value) => {
                    console.log(value)
                    setClientStage(value?.id)
                  }}
                  getOptionLabel={option => option.stage}
                  renderInput={params => (
                    <TextField
                      // className="m-3"
                      variant="outlined"
                      // sx={{ width: '24rem' }}
                      {...params}
                      placeholder="Member Name"
                    />
                  )}
                />
              </div>
            </Box>
          </Drawer>
        </Box>
      </Box>

      <Box className="below_main_tab_section">
        <div className="inner_container">
          {taskList.length > 0 &&
            taskList.map(taskData => {
              return (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: 'calc(100% / 4 - 1rem)',
                    height: '150px',
                  }}
                >
                  <Box className="task_card">
                    <Box
                      className="row task_card_hover"
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
                    <Box className="common_row">
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
                          className="common_button"
                        >
                          + Member
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Box>
              )
            })}
        </div>
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
