import axiosInstance from "./axios";
import Cookie from "js-cookie";
// let BaseUrl = process.env.REACT_APP_API_URL;
const defaultHeaders = {
    "Content-Type": "application/json",
    withCredentials: true,
    Authorization: `Barear ${Cookie.get("userToken")}`,
};
// const authHeaders = { Authorization: `Barear ${getLoginToken()}` };
export const GetTaskList = async (value, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const {data} = await axiosInstance.get(`/tasks`, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of GetTaskList", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - GetTaskList", err);
        onError && onError(err);
    }
};
export const CreateTaskCall = async (value, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const {data} = await axiosInstance.post(`/task`, value, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of CreateTaskCall", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - CreateTaskCall", err);
        onError && onError(err);
    }
};

export const GetSingleTaskDetail = async (value, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const {data} = await axiosInstance.get(`/task/${value}`, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of getSingleTaskDetail", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - getSingleTaskDetail", err);
        onError && onError(err);
    }
};
export const UpdateCheckListItemStatus = async (id, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        //id[0]=checklist id & id[1]=taskid
        const {data} = await axiosInstance.put(`/item/checklist/${id[0]}/${id[1]}`, {}, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of UpdateCheckListItemStatus", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - UpdateCheckListItemStatus", err);
        onError && onError(err);
    }
};
export const AddItemCheckList = async (value, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const {data} = await axiosInstance.post(`/checklist/${value.id}`, { task: value.task }, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of AddItemCheckList", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - AddItemCheckList", err);
        onError && onError(err);
    }
};
export const DeleteCheckListTask = async (value, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const {data} = await axiosInstance.delete(`/item/checklist/${value.id}/${value.taskid}`, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of DeleteCheckListTask", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - DeleteCheckListTask", err);
        onError && onError(err);
    }
};


export const DeleteSingleTask = async (value, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const {data} = await axiosInstance.delete(`/task/${value}`, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of DeleteSingleTask", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - DeleteCheckListTask", err);
        onError && onError(err);
    }
};
export const GetAllMemberList = async (value, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const {data} = await axiosInstance.get(`/member`, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of GetAllMemberList", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - GetAllMemberList", err);
        onError && onError(err);
    }
};
export const AssignMemberParticularTask = async (value, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const {data} = await axiosInstance.put(`/task/${value.taskid}/${value.memberid}`, {}, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of AssignMemberParticularTask", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - AssignMemberParticularTask", err);
        onError && onError(err);
    }
};
export const EditTaskDescription = async (value, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const {data} = await axiosInstance.patch(`/description/task/${value.id}`, { description: value.description }, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of EditTaskDescription", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - EditTaskDescription", err);
        onError && onError(err);
    }
};

export const EditTaskName = async (value, onSuccess, onError) => {
    defaultHeaders.Authorization = `Barear ${Cookie.get("userToken")}`;
    try {
        const {data} = await axiosInstance.patch(`/title/task/${value.id}`, { title: value.title }, {
            headers: { ...defaultHeaders },
        });
        console.log("Printing data of EditTaskName", data);
        onSuccess && onSuccess(data);
    } catch (err) {
        console.log("Got error while calling API - EditTaskName", err);
        onError && onError(err);
    }
};