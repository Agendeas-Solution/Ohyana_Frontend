import React, { useEffect, useState, useContext } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  Paper,
  TextareaAutosize,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useNavigate } from 'react-router-dom'
import { GetTaskList, CreateTaskCall } from '../../services/apiservices/task'
import moment from 'moment'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { Context as ContextSnackbar } from '../../context/pageContext'
import './index.css'
import CreateTaskDialog from './CreateTaskDialog'
import AssignMemberDialog from './AssignMemberDialog'
import {
  GetAllMemberList,
  AssignMemberParticularTask,
} from '../../services/apiservices/task'
const Task = () => {
  const navigate = useNavigate()
  const [taskList, setTaskList] = useState([])
  const [open, setOpen] = React.useState(false)
  const [openMemberDialog, setOpenMemberDialog] = useState(false)
  const { successSnackbar } = useContext(ContextSnackbar)?.state
  const [taskId, setTaskId] = useState()
  const { setSuccessSnackbar } = useContext(ContextSnackbar)
  const theme = useTheme()
  const [createTask, setCreateTask] = useState({
    title: '',
    description: '',
    due_date: '',
  })
  const [memberList, setMemberList] = useState([])
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

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
        setMemberList(res.data.team)
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
            message: res.data.message,
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
            <FormControl variant="outlined">
              <OutlinedInput
                sx={{ background: '#fff' }}
                className="mx-2"
                placeholder="Search Here..."
                startAdornment={
                  <InputAdornment position="start" sx={{ background: '#fff' }}>
                    <IconButton>
                      <SearchRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              className="mx-3 p-3"
              onClick={handleClickOpen}
              sx={{ background: '#fff' }}
              variant="filled"
            >
              + Task
            </Button>
          </Box>
        </Box>
        <Box className="task_cards_section" component={Paper}>
          {taskList.length > 0 &&
            taskList.map(taskData => {
              return (
                <Box className="task_card">
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
