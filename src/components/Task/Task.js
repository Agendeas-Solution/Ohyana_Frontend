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
// import { useTheme } from '@mui/material/styles'
import { Context as ContextSnackbar } from '../../context/pageContext'
import './index.css'
import CreateTaskDialog from './CreateTaskDialog'
import AssignMemberDialog from './AssignMemberDialog'
import {
  GetAllMemberList,
  AssignMemberParticularTask,
} from '../../services/apiservices/task'
// import styled from '@emotion/styled'
import { styled, useTheme } from '@mui/material/styles'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
const drawerWidth = 400

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
      err => {},
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
      res => {},
      err => {},
    )
  }

  return (
    // <Box className="d-flex flex-row justify-content-between align-items-center mx-2 px-2">
    //     <Typography variant="span">Overview</Typography>
    //     <Box>
    //       <FormControl variant="outlined">
    //         <OutlinedInput
    //           sx={{ background: '#fff' }}
    //           className="mx-2"
    //           placeholder="Search Here..."
    //           startAdornment={
    //             <InputAdornment position="start" sx={{ background: '#fff' }}>
    //               <IconButton>
    //                 <SearchRoundedIcon />
    //               </IconButton>
    //             </InputAdornment>
    //           }
    //           label="Password"
    //         />
    //       </FormControl>
    //       <IconButton edge="end">
    //         <img src={FilterIcon} alt="" />
    //       </IconButton>
    //     </Box>
    //   </Box>
    <>
      <Box className="task_section">
        <Box className=" mt-2 mb-2 mx-2 px-2 common_row d-flex flex-row justify-content-between align-items-center">
          <Typography variant="span">Overview</Typography>
          <Box>
            <div className="d-flex">
              <FormControl variant="outlined">
                <OutlinedInput
                  sx={{ background: '#fff' }}
                  className="search_bar mx-2"
                  placeholder="Search Here..."
                  startAdornment={
                    <InputAdornment
                      position="start"
                      sx={{ background: '#fff' }}
                    >
                      <IconButton>
                        <SearchRoundedIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Button
                // className="mx-2 p-3"
                className="main_button"
                onClick={handleClickOpen}
                sx={{ background: '#fff' }}
                variant="filled"
              >
                + Task
              </Button>

              {/* <div className="d-flex"> */}
              <Toolbar>
                <IconButton
                  edge="end"
                  onClick={handleDrawerOpen}
                  sx={{ ...(openDrawer && { display: 'none' }) }}
                >
                  <img src={FilterIcon} alt="" />
                </IconButton>
              </Toolbar>

              <Drawer
                sx={{
                  width: 2,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: drawerWidth,
                  },
                }}
                variant="persistent"
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
                      className="mt-1 mx-2 align-items-center d-flex client_type_select justify-content-center "
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
              {/* </div> */}
            </div>
          </Box>
        </Box>
        <Box className="task_cards_section" component={Paper}>
          {taskList.length > 0 &&
            taskList.map(taskData => {
              return (
                <Box className="task_card me-3 mx-2 mt-2 p-2">
                  <Box
                    className="d-flex row task_card_hover"
                    onClick={() => {
                      navigate(`/taskdetail/${taskData?.id}`)
                    }}
                  >
                    <Typography className="task_card_heading" variant="span">
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
                      <Typography
                        sx={{
                          height: '30px',
                        }}
                        className="name_chip "
                        variant="span"
                      >
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
              )
            })}
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
          />
        </Box>
      </Box>
    </>
  )
}

export default Task
