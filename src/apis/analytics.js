import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const getAllAnalytics = async () => {
  try {
    const reqUrl = `${backendUrl}/analytics/getAnalytics`;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(reqUrl);
    if (!response.data.success) throw new Error(response.data.data);
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
