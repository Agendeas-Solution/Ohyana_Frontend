import React, { useState, useEffect, useContext } from 'react'
import { Box, Typography, Button, TextField, Checkbox } from '@mui/material'
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
import { EditTaskName, EditDueDate } from '../../services/apiservices/task'
import DeleteTaskDialog from './DeleteTaskDialog'
import DueDateDialog from './DueDateDialog'

const EditDescriptionDialog = React.lazy(() =>
  import('./EditDescriptionDialog'),
)

const EditTitleDialog = React.lazy(() => import('./EditTitleDialog'))

const TaskDetail = () => {
  const [taskDetail, setTaskDetail] = useState([])
  const [checkLists, setCheckLists] = useState([])
  const [addCheckList, setAddCheckList] = useState('')
  const { successSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar } = useContext(ContextSnackbar)
  const [countDoneTask, setCountDoneTask] = useState(null)
  const [taskRatio, setTaskRatio] = useState(0)
  const [editDescriptionDialog, setEditDescriptionDialog] = useState({
    status: false,
    description: '',
    id: null,
  })
  const [editTaskNameDialog, setEditTaskNameDialog] = useState({
    status: false,
    taskName: '',
    id: null,
    description: '',
  })
  const [deleteTaskDialog, setDeleteTaskDialog] = useState({
    status: false,
    id: '',
  })
  const [dueDateDialogControl, setDueDateDialogControl] = useState({
    status: false,
    due_date: '',
    id: '',
  })
  const handleDueDateDialogClose = () => {
    setDueDateDialogControl({ ...dueDateDialogControl, status: false })
  }
  const handleDeleteDialogClose = () => {
    setDeleteTaskDialog({ ...deleteTaskDialog, status: false })
  }
  const navigate = useNavigate()
  let path = window.location.pathname
  console.log('Printing Path of ', path)
  console.log('Printing ', path.split('/').pop())
  path = path.split('/').pop()
  const handleSingleTaskDetail = () => {
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
  }

  useEffect(() => {
    handleSingleTaskDetail()
  }, [])
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
          message: res.message,
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
  const DeleteTask = () => {
    DeleteSingleTask(
      deleteTaskDialog.id,
      res => {
        navigate('/task')
      },
      err => {},
    )
  }
  const handleEditTaskName = () => {
    EditTaskName(
      {
        description: editTaskNameDialog?.description,
        title: editTaskNameDialog?.taskName,
        taskId: editTaskNameDialog?.id,
      },
      res => {
        setTaskDetail({
          ...taskDetail,
          title: res?.data?.title,
        })
        handleSingleTaskDetail()
        handleDialogClose()
      },
      err => {},
    )
  }
  const handleEditDueDate = () => {
    EditDueDate(
      dueDateDialogControl,
      res => {
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.message,
        })
        handleDueDateDialogClose()
      },
      err => {},
    )
  }
  const handleDialogClose = () => {
    setEditDescriptionDialog({ ...editDescriptionDialog, status: false })
    setEditTaskNameDialog({ ...editTaskNameDialog, status: false })
  }
  let completedTask =
    checkLists &&
    checkLists.filter(taskDone => {
      if (taskDone.done === true) {
        return taskDone
      }
    })
  useEffect(() => {
    if (checkLists) {
      let countDone = checkLists.filter(data => {
        let count = 0
        if (data.done === true) {
          count = count + 1
        }
        return count
      })
      setTaskRatio(
        checkLists.length > 0
          ? ((countDone.length / checkLists.length) * 100).toFixed(2)
          : 0,
      )
    }
  }, [checkLists, countDoneTask])

  return (
    <>
      <Box className="main_section">
        <Box className="main_section_header">
          <Typography className="task_card_heading" variant="span">
            {taskDetail?.title || '-'}
          </Typography>
          <Box>
            <Button className="profile_header_button">
              <EditRoundedIcon
                onClick={() => {
                  setEditTaskNameDialog({
                    ...editTaskNameDialog,
                    status: true,
                    id: taskDetail?.id,
                    taskName: taskDetail?.title,
                  })
                }}
              />
            </Button>
            <Button className="profile_header_button">
              <DeleteOutlineRoundedIcon
                onClick={() =>
                  setDeleteTaskDialog({
                    ...deleteTaskDialog,
                    status: true,
                    id: taskDetail.id,
                  })
                }
              />
            </Button>
          </Box>
        </Box>

        <Box className="checklist_duedate_section" sx={{ overflowY: 'hidden' }}>
          <Box className="checklist_section">
            <Box sx={{ padding: '0px 15px' }}>
              <Typography sx={{ color: '#8E8E8E' }} variant="span">
                Checklist
              </Typography>

              <Slider
                value={taskRatio || 0}
                step={1}
                getAriaValueText={() => taskRatio + '%'}
                valueLabelFormat={() => taskRatio + '%'}
                valueLabelDisplay="on"
                sx={{ color: '#2E3591' }}
                className="task_slider"
              />
            </Box>

            <Box
              sx={{
                overflowY: 'auto',
                height: '100%',
                paddingBottom: '80px',
                paddingLeft: '15px',
              }}
            >
              <FormGroup>
                {checkLists &&
                  checkLists.map(checklistData => {
                    if (checklistData.done === false) {
                      return (
                        <Box className="task_list">
                          <FormControlLabel
                            sx={{
                              display: 'flex',
                              alignItems: 'flex-start',
                            }}
                            control={
                              <Checkbox
                                sx={{
                                  padding: 0,
                                  margin: '0px 7px',
                                }}
                                onChange={() => {
                                  updateCheckListStatus(checklistData?.id)
                                }}
                                value={checklistData.done}
                              />
                            }
                            label={checklistData?.task}
                          />
                          <DeleteRoundedIcon
                            sx={{
                              padding: 0,
                              marginRight: '4px',
                            }}
                            onClick={() => handleDeleteTask(checklistData?.id)}
                            className="common_icon"
                          />
                        </Box>
                      )
                    }
                  })}
              </FormGroup>

              <Box sx={{ marginBottom: '10px', marginRight: '15px' }}>
                <TextField
                  sx={{ width: '100%', margin: '10px 0px' }}
                  label="Add item"
                  variant="outlined"
                  value={addCheckList}
                  onChange={e => {
                    setAddCheckList(e.target.value)
                  }}
                />
                <Box>
                  <Button onClick={handleAddItem} className="common_button">
                    Add item
                  </Button>

                  <Button
                    onClick={() => setAddCheckList('')}
                    className="common_button"
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>

              {completedTask.length > 0 && (
                <Typography className="completed_heading" variant="span">
                  Completed
                </Typography>
              )}

              <Box sx={{ marginLeft: '15px' }}>
                <FormGroup className="completed_task_list">
                  {checkLists &&
                    checkLists.map(checklistData => {
                      if (checklistData.done === true) {
                        return (
                          <FormControlLabel
                            sx={{
                              display: 'flex',
                              alignItems: 'flex-start',
                            }}
                            control={
                              <Checkbox
                                sx={{
                                  padding: 0,
                                  margin: '5px',
                                }}
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
            </Box>
          </Box>

          <Box className="task_details_section">
            <Box sx={{ marginBottom: '10px' }}>
              <Box className="common_row">
                <Typography className="common_sub_heading" variant="span">
                  Due Date
                </Typography>
                {/* <Button variant="filled" className="white_button">
                  <CalendarMonthRoundedIcon
                    onClick={() => {
                      setDueDateDialogControl({
                        ...dueDateDialogControl,
                        status: true,
                        id: taskDetail.id,
                      })
                    }}
                    sx={{ color: '#2E3591' }}
                  />
                </Button> */}
                <Button className="task_due_date_edit_button">
                  <EditRoundedIcon
                    onClick={() => {
                      setDueDateDialogControl({
                        ...dueDateDialogControl,
                        status: true,
                        id: taskDetail.id,
                      })
                    }}
                    // className="main_tab_button"
                  />
                </Button>
              </Box>
              <Typography variant="span" className="common_description_text">
                {moment(taskDetail?.due_date).format('MMMM Do YYYY, h:mm:ss a')}
              </Typography>
            </Box>
            <Box sx={{ margin: '10px 0px' }}>
              <Typography className="common_sub_heading" variant="span">
                Description
              </Typography>
              <Typography variant="span" className="common_description_text">
                {taskDetail?.description || '-'}
              </Typography>
            </Box>

            <Box sx={{ margin: '10px 0px' }}>
              <Typography className="common_sub_heading" variant="span">
                Assigned Member
              </Typography>

              {taskDetail?.team?.email ? (
                <Box className="d-flex" sx={{ marginTop: '5px' }}>
                  <Typography className="name_chip" variant="span">
                    {taskDetail?.team?.email &&
                      taskDetail?.team?.email?.charAt(0).toUpperCase()}
                  </Typography>
                  <Typography className="assigned_user_detail" variant="span">
                    {taskDetail?.team?.email || '-'}
                  </Typography>
                </Box>
              ) : (
                <Typography className="common_description_text">
                  Not Assigned
                </Typography>
              )}
            </Box>

            <Box sx={{ margin: '10px 0px' }}>
              <Typography className="common_sub_heading" variant="span">
                Task Create By
              </Typography>

              <Box
                className="d-flex"
                sx={{
                  marginTop: '5px',
                }}
              >
                <Typography
                  className="created_by_icon name_chip"
                  variant="span"
                >
                  {taskDetail?.createdBy &&
                    taskDetail?.createdBy.charAt(0).toUpperCase()}
                </Typography>
                <Typography className="assigned_user_detail" variant="span">
                  {taskDetail?.createdBy || '-'}
                </Typography>
              </Box>
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
          handleEditTaskName={handleEditTaskName}
        />
        <DeleteTaskDialog
          DeleteTask={DeleteTask}
          setDeleteTaskDialog={setDeleteTaskDialog}
          deleteTaskDialog={deleteTaskDialog}
          handleDeleteDialogClose={handleDeleteDialogClose}
        />
        <DueDateDialog
          dueDateDialogControl={dueDateDialogControl}
          handleDueDateDialogClose={handleDueDateDialogClose}
          setDueDateDialogControl={setDueDateDialogControl}
          handleEditDueDate={handleEditDueDate}
        />
      </Box>
    </>
  )
}

export default TaskDetail
