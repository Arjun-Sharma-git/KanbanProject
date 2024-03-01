import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getAllCards = async (duration) => {
  try {
    const reqUrl = `${backendUrl}/task/getAllTasks/${duration}`;
    console.log(reqUrl);
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(reqUrl);
    console.log(response.data.data);
    if (!response.data.success) throw new Error(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
export const statusChange = async (taskId, status) => {
  try {
    const reqUrl = `${backendUrl}/task/changeStatus`;
    const reqPayload = { taskId, status };
    console.log("request payload ", reqPayload);
    const response = await axios.put(reqUrl, reqPayload);
    if (!response.data.success) throw new Error(response.data.data);
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const editCheckList = async (taskId, checkListId, isCompleted) => {
  try {
    const reqUrl = `${backendUrl}/task/editCheckList`;
    const reqPayload = { taskId, checkListId, isCompleted };
    console.log("request payload ", reqPayload);
    const response = await axios.put(reqUrl, reqPayload);
    if (!response.data.success) throw new Error(response.data.data);
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const deleteCard = async (taskId) => {
  try {
    const reqUrl = `${backendUrl}/task/deleteTask/${taskId}`;
    const response = await axios.delete(reqUrl);
    if (!response.data.success) throw new Error(response.data.data);
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCheckListCount = async (taskId) => {
  try {
    const reqUrl = `${backendUrl}/task/getCheckListCount/${taskId}`;
    console.log(reqUrl);
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(reqUrl);
    console.log(response.data.data);
    if (!response.data.success) throw new Error(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const createCard = async (title, priority, checkList, dueDate) => {
  try {
    const reqUrl = `${backendUrl}/task/createTask`;
    console.log(reqUrl);
    const reqPayload = {
      title,
      priority,
      checkList,
      dueDate,
    };
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.post(reqUrl, reqPayload);
    console.log(response.data.data);
    if (!response.data.success) throw new Error(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const editCard = async (taskId, title, priority, checkList, dueDate) => {
  try {
    const reqUrl = `${backendUrl}/task/editTask`;
    console.log(reqUrl);
    const reqPayload = {
      taskId,
      title,
      priority,
      checkList,
      dueDate,
    };
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.put(reqUrl, reqPayload);
    console.log(response.data.data);
    if (!response.data.success) throw new Error(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const getSingleCard = async (taskId) => {
  try {
    const reqUrl = `${backendUrl}/task/getSingleTask/${taskId}`;
    const response = await axios.get(reqUrl);
    console.log(response.data.data);
    if (!response.data.success) throw new Error(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
