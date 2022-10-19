import axios from "axios";
import { LocalStoreServices } from "../export";

const axiosClient = axios.create({
  // Set base url here
  // baseURL: 'https://jsonplaceholder.typicode.com/',
  baseURL: "https://test-api-webforum.tahitaka.com/api/",

  // Setup header infor here
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: any) {
    // Do something before request is sent
    // config.headers["Authorization"] = "Bearer " + LocalStoreServices.getToken();
    // config.headers["Authorization"] = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjA5Njc5NjF9.y-dswrPtPmrRqN467mAhsCZmu9FiJmaeUDwiSHGqDj0";
    config.headers["Authorization"] = "Bearer " + LocalStoreServices.getToken();
    // console.log(localStorage.getItem('token'));
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response && response.data && response.data.statusCode === 200)
      return response.data;

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
