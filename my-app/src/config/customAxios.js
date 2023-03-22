import axios from "axios";
import { baseUrl } from "./baseAPI";
const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (req) => {
 
  req.headers.Authorization = `Bearer ` + 'aa29cbb8eb4da36f1e5039e3fba38d1a93e98f179d3a8b08de9a9fa8f72dfe6e';
  return req;
});
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      localStorage.clear();
      if (window.location.pathname === "/login") return;
      window.location.pathname = "/login";
    }
    return Promise.reject(err);
  }
);
export default axiosInstance;
