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
  AssignMemberParticularTask,
} from '../../services/apiservices/task'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { Context as ContextSnackbar } from '../../context/pageContext'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import { EditTaskName, EditDueDate } from '../../services/apiservices/task'
import DeleteTaskDialog from './DeleteTaskDialog'
import DueDateDialog from './DueDateDialog'
import AssignMemberDialog from './AssignMemberDialog'
import { GetAdminStaffDetailList } from '../../services/apiservices/staffDetail'
const EditDescriptionDialog = React.lazy(() =>
  import('./EditDescriptionDialog'),
)
const EditTitleDialog = React.lazy(() => import('./EditTitleDialog'))
const TaskDetail = () => {
  const [taskDetail, setTaskDetail] = useState([])
  const [checkLists, setCheckLists] = useState([])
  const [addCheckList, setAddCheckList] = useState('')
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const [countDoneTask, setCountDoneTask] = useState(null)
  const [taskRatio, setTaskRatio] = useState(0)
  const [openMemberDialog, setOpenMemberDialog] = useState(false)
  const [member, setMember] = useState({})
  const [memberList, setMemberList] = useState([])
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
    due_date: moment(),
    id: '',
  })
  const handleCloseMemberDialog = () => {
    setOpenMemberDialog(false)
  }
  const handleDueDateDialogClose = () => {
    setDueDateDialogControl({ ...dueDateDialogControl, status: false })
  }
  const handleDeleteDialogClose = () => {
    setDeleteTaskDialog({ ...deleteTaskDialog, status: false })
  }
  const navigate = useNavigate()
  let path = window.location.pathname
  path = path.split('/').pop()
  const handleAssignMember = memberId => {
    AssignMemberParticularTask(
      { taskid: taskDetail.id, memberid: memberId },
      res => {
        setMember()
        handleCloseMemberDialog()
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.message,
        })
        handleSingleTaskDetail()
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
  useEffect(() => {
    GetAdminStaffDetailList(
      {},
      res => {
        setMemberList(res.data)
      },
      err => {},
    )
  }, [])
  const handleSingleTaskDetail = () => {
    GetSingleTaskDetail(
      path,
      {},
      res => {
        setTaskDetail(res?.data)
        setCheckLists(res?.data?.checklists)
      },
      err => {},
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
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
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
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }
  const handleDeleteTask = id => {
    DeleteCheckListTask(
      { taskid: path, id: id },
      res => {
        setCheckLists(res?.data)
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.message,
        })
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
  const DeleteTask = () => {
    DeleteSingleTask(
      deleteTaskDialog.id,
      res => {
        navigate('/task')
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.message,
        })
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
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.message,
        })
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
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
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
            <Button
              onClick={() => {
                setEditTaskNameDialog({
                  ...editTaskNameDialog,
                  status: true,
                  id: taskDetail?.id,
                  taskName: taskDetail?.title,
                  description: taskDetail?.description,
                })
              }}
              className="profile_header_button"
            >
              <EditRoundedIcon />
            </Button>
            <Button
              onClick={() =>
                setDeleteTaskDialog({
                  ...deleteTaskDialog,
                  status: true,
                  id: taskDetail.id,
                })
              }
              className="profile_header_button"
            >
              <DeleteOutlineRoundedIcon />
            </Button>
          </Box>
        </Box>
        <Divider />
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
                paddingBottom: '20px',
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
                              marginBottom: '10px',
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
              <Box sx={{ marginBottom: '16px' }} className="detail_row">
                <Typography
                  className="common_sub_heading task_left_section_heading"
                  variant="span"
                >
                  Due Date
                </Typography>
                <Button
                  onClick={() => {
                    setDueDateDialogControl({
                      ...dueDateDialogControl,
                      status: true,
                      id: taskDetail.id,
                    })
                  }}
                  variant="filled"
                  className="white_button"
                >
                  <CalendarMonthRoundedIcon sx={{ color: '#2E3591' }} />
                </Button>
              </Box>
              <Typography variant="span" className="common_description_text">
                {moment(taskDetail?.due_date).format('MMMM Do YYYY, h:mm:ss a')}
              </Typography>
            </Box>
            <Box sx={{ margin: '10px 0px' }}>
              <Box sx={{ marginBottom: '16px' }}>
                <Typography
                  className="common_sub_heading task_left_section_heading"
                  variant="span"
                >
                  Description
                </Typography>
              </Box>
              <Typography variant="span" className="common_description_text">
                {taskDetail?.description || '-'}
              </Typography>
            </Box>
            <Box sx={{ margin: '10px 0px' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}
              >
                <Typography
                  className="common_sub_heading task_left_section_heading"
                  variant="span"
                >
                  Assigned Member
                </Typography>
                {!taskDetail?.team?.email && (
                  <Button
                    onClick={() => setOpenMemberDialog(true)}
                    className="white_buttons"
                  >
                    + Member
                  </Button>
                )}
              </Box>
              {taskDetail?.team?.email ? (
                <Box
                  className="d-flex"
                  sx={{ marginTop: '5px', alignItems: 'center' }}
                >
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
              <Box sx={{ marginBottom: '16px' }}>
                <Typography
                  className="common_sub_heading task_left_section_heading"
                  variant="span"
                >
                  Task Create By
                </Typography>
              </Box>
              <Box
                className="d-flex"
                sx={{
                  marginTop: '5px',
                  alignItems: 'center',
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
        <AssignMemberDialog
          openMemberDialog={openMemberDialog}
          handleCloseMemberDialog={handleCloseMemberDialog}
          handleAssignMember={handleAssignMember}
          memberList={memberList}
          member={member}
          setMember={setMember}
        />
      </Box>
    </>
  )
}

export default TaskDetail
