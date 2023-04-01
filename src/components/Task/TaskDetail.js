import React, { useState, useEffect, useContext } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  Checkbox,
  Divider,
} from '@mui/material'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import Slider from '@mui/material/Slider'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import {
  GetSingleTaskDetail,
  UpdateCheckListItemStatus,
  AddItemCheckList,
  DeleteCheckListTask,
  DeleteSingleTask,
} from '../../services/apiservices/task'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { Context as ContextSnackbar } from '../../context/pageContext'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
const EditDescriptionDialog = React.lazy(() => import("./EditDescriptionDialog"));
const EditTitleDialog = React.lazy(() => import("./EditTitleDialog"));

const TaskDetail = () => {
  const [taskDetail, setTaskDetail] = useState([])
  const [checkLists, setCheckLists] = useState([])
  const [addCheckList, setAddCheckList] = useState('')
  const { successSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar } = useContext(ContextSnackbar)
  const [countDoneTask, setCountDoneTask] = useState(null)
  const [taskRatio, setTaskRatio] = useState()
  const [editDescriptionDialog, setEditDescriptionDialog] = useState({
    status: false,
    description: '',
    id: null,
  })
  const [editTaskNameDialog, setEditTaskNameDialog] = useState({
    status: false,
    taskName: '',
    id: null,
  })
  const navigate = useNavigate()
  useEffect(() => {
    let path = window.location.pathname
    console.log('Printing Path of ', path)
    console.log('Printing ', path.split('/').pop())
    path = path.split('/').pop()
    GetSingleTaskDetail(
      path,
      res => {
        setTaskDetail(res?.data)
        setCheckLists(res?.data?.checklists)
      },
      err => {
        console.log(err)
      },
    )
  }, [])
  let path = window.location.pathname
  console.log('Printing Path of ', path)
  console.log('Printing ', path.split('/').pop())
  path = path.split('/').pop()
  const updateCheckListStatus = id => {
    UpdateCheckListItemStatus(
      [id, path],
      res => {
        setCheckLists(res?.data)
      },
      err => {
        console.log(err)
      },
    )
  }
  const handleAddItem = () => {
    AddItemCheckList(
      { id: path, task: addCheckList },
      res => {
        setAddCheckList('')
        setCheckLists(res?.data)
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.data.message,
        })
      },
      err => {
        console.log(err)
      },
    )
  }
  const handleDeleteTask = id => {
    DeleteCheckListTask(
      { taskid: path, id: id },
      res => {
        setCheckLists(res?.data)
      },
      err => {
        console.log(err)
      },
    )
  }
  const DeleteTask = id => {
    DeleteSingleTask(
      id,
      res => {
        navigate('/task')
      },
      err => {},
    )
  }
  const handleDialogClose = () => {
    setEditDescriptionDialog({ ...editDescriptionDialog, status: false })
    setEditTaskNameDialog({ ...editTaskNameDialog, status: false })
  }
  useEffect(() => {
    if (checkLists) {
      let countDone = checkLists.filter(data => {
        let count = 0
        if (data.done === true) {
          count = count + 1
        }
        return count
      })
      setTaskRatio(((countDone.length / checkLists.length) * 100).toFixed(2))
    }
  }, [checkLists, countDoneTask])
  return (
    <>
      <Box className="main_section">
        <Box className="task_heading pb-2">
          <Typography className="task_card_heading" variant="span">
            {taskDetail?.title}
          </Typography>
          <Box>
            <EditRoundedIcon
              // sx={{ padding: '0px', margin: '54px' }}
              sx={{ fontSize: '40px', padding: '4px', marginRight: '10px' }}
              onClick={() => {
                setEditTaskNameDialog({
                  ...editTaskNameDialog,
                  status: true,
                  id: taskDetail?.id,
                  taskName: taskDetail?.title,
                })
              }}
              className="common_button"
            />
            <DeleteOutlineRoundedIcon
              sx={{ fontSize: '40px', marginLeft: '12px', padding: '4px' }}
              onClick={() => DeleteTask(taskDetail.id)}
              className="common_button"
            />
          </Box>
        </Box>

        <Box className="checklist_duedate_section">
          <Box className="checklist_section pt-3 px-2">
            <Typography
              sx={{ color: '#8E8E8E' }}
              className="mx-2"
              variant="span"
            >
              Checklist
            </Typography>

            <Slider
              value={taskRatio ? taskRatio : 0}
              step={1}
              valueLabelDisplay="on"
              sx={{ color: '#2E3591' }}
              className="task_slider"
            />

            <FormGroup>
              {checkLists &&
                checkLists.map(checklistData => {
                  if (checklistData.done === false) {
                    return (
                      <Box className="d-flex justify-content-between">
                        <FormControlLabel
                          className="task_list mx-1"
                          control={
                            <Checkbox
                              onChange={() => {
                                updateCheckListStatus(checklistData?.id)
                              }}
                              value={checklistData.done}
                            />
                          }
                          label={checklistData?.task}
                        />
                        <DeleteRoundedIcon
                          onClick={() => handleDeleteTask(checklistData?.id)}
                          className="common_icon"
                        />
                      </Box>
                    )
                  }
                })}
            </FormGroup>
            <Box className="mx-5 me-3">
              <TextField
                value={addCheckList}
                onChange={e => {
                  setAddCheckList(e.target.value)
                }}
                placeholder="Add an item"
                className="w-100 my-2"
                variant="outlined"
              />
            </Box>
            <Box className="mx-5 me-3 mb-3">
              <Button
                onClick={handleAddItem}
                className="common_button mb-8 mt-5"
              >
                Add an item
              </Button>
              <Button onClick={handleAddItem} className="common_button mb-5">
                Cancel
              </Button>
            </Box>
            <Typography className="completed_heading p-2" variant="span">
              Completed
            </Typography>
            <FormGroup className="completed_task_list mt-2">
              {checkLists &&
                checkLists.map(checklistData => {
                  if (checklistData.done === true) {
                    return (
                      <FormControlLabel
                        className="task_list mx-1"
                        control={
                          <Checkbox
                            onChange={() => {
                              updateCheckListStatus(checklistData?.id)
                            }}
                            value={checklistData.done}
                            defaultChecked
                          />
                        }
                        label={checklistData?.task}
                      />
                    )
                  }
                })}
            </FormGroup>
          </Box>

          <Box className="task_details_section">
            <Box className="common_row">
              <Typography
                className="common_sub_heading mx-3 mt-3"
                variant="span"
              >
                Due Date
              </Typography>
              <Button variant="filled" sx={{ background: '#fff' }}>
                {' '}
                <CalendarMonthRoundedIcon sx={{ color: '#2E3591' }} />
              </Button>
            </Box>
            <Typography className="mx-3 mt-3" variant="span">
              {moment(taskDetail?.due_date).format('MMMM Do YYYY, h:mm:ss a')}
            </Typography>
            <Box className="common_row mx-3 mt-3">
              <Typography className="common_sub_heading" variant="span">
                Description
              </Typography>
              <Button
                className="me-3"
                variant="filled"
                sx={{
                  background: '#fff',
                }}
              >
                {' '}
                <EditRoundedIcon
                  onClick={() =>
                    setEditDescriptionDialog({
                      ...editDescriptionDialog,
                      status: true,
                      description: taskDetail?.description,
                      id: taskDetail.id,
                    })
                  }
                  sx={{ color: '#2E3591' }}
                />
              </Button>
            </Box>
            <Typography className="mx-3 mt-3" variant="span">
              {taskDetail?.description}
            </Typography>
            <Typography className="common_sub_heading mx-3 mt-3" variant="span">
              Assigned Member
            </Typography>
            {taskDetail?.team?.email ? (
              <Box className="mx-3 mt-4">
                <Typography className="name_chip" variant="span">
                  {taskDetail?.team?.email &&
                    taskDetail?.team?.email?.charAt(0)}
                </Typography>
                <Typography className="assigned_user_detail" variant="span">
                  {taskDetail?.team?.email}
                </Typography>
              </Box>
            ) : (
              <Typography className="mx-3 mt-4">Not Assigned</Typography>
            )}
            <Typography className="common_sub_heading mx-3 mt-3" variant="span">
              Task Create By
            </Typography>
            <Box className="mx-3 mt-4 mb-2">
              <Typography className="created_by_icon name_chip" variant="span">
                {taskDetail?.createdBy && taskDetail?.createdBy.charAt(0)}
              </Typography>
              <Typography className="assigned_user_detail" variant="span">
                {taskDetail?.createdBy}
              </Typography>
            </Box>
          </Box>
        </Box>
        <EditDescriptionDialog
          editDescriptionDialog={editDescriptionDialog}
          setEditDescriptionDialog={setEditDescriptionDialog}
          handleDialogClose={handleDialogClose}
        />
        <EditTitleDialog
          editTaskNameDialog={editTaskNameDialog}
          setEditTaskNameDialog={setEditTaskNameDialog}
          handleDialogClose={handleDialogClose}
        />
      </Box>
    </>
  )
}

export default TaskDetail
