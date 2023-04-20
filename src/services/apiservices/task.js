import {
  handleApiDeleteCall,
  handleApiGetCall,
  handleApiPatchCall,
  handleApiPostCall,
  handleApiPutCall,
} from './api-manager'

export const GetTaskList = async (value, onSuccess, onError) => {
  await handleApiGetCall(`/tasks`, value, onSuccess, onError)
}
export const CreateTaskCall = async (value, onSuccess, onError) => {
  await handleApiPostCall(`/task`, value, onSuccess, onError)
}

export const GetSingleTaskDetail = async (id, value, onSuccess, onError) => {
  await handleApiGetCall(`/task/${id}`, value, onSuccess, onError)
}
export const UpdateCheckListItemStatus = async (id, onSuccess, onError) => {
  await handleApiPutCall(
    `/item/checklist/${id[0]}/${id[1]}`,
    {},
    onSuccess,
    onError,
  )
}
export const AddItemCheckList = async (value, onSuccess, onError) => {
  await handleApiPostCall(
    `/checklist/${value.id}`,
    { task: value.task },
    onSuccess,
    onError,
  )
}
export const DeleteCheckListTask = async (value, onSuccess, onError) => {
  await handleApiDeleteCall(
    `/item/checklist/${value.id}/${value.taskid}`,
    onSuccess,
    onError,
  )
}

export const DeleteSingleTask = async (value, onSuccess, onError) => {
  await handleApiDeleteCall(`/task/${value}`, onSuccess, onError)
}

export const AssignMemberParticularTask = async (value, onSuccess, onError) => {
  await handleApiPutCall(
    `/task/${value.taskid}/${value.memberid}`,
    value,
    onSuccess,
    onError,
  )
}
export const EditTaskDescription = async (value, onSuccess, onError) => {
  await handleApiPatchCall(
    `/description/task/${value.id}`,
    { description: value.description },
    onSuccess,
    onError,
  )
}

export const EditTaskName = async (value, onSuccess, onError) => {
  await handleApiPutCall(`/task`, value, onSuccess, onError)
}

export const EditDueDate = async (value, onSuccess, onError) => {
  await handleApiPatchCall(
    `/due-date/task/${value.id}`,
    { due_date: value.due_date },
    onSuccess,
    onError,
  )
}
