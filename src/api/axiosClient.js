import axios from "axios";

const axiosClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "dev"
      ? "http://localhost:8080"
      : "https://netcompany-social-suggestion-backend.vercel.app",
  // baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      localStorage.getItem("token_axios") && localStorage.getItem("token_axios")
    }`,
  },
});

// Interceptor
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token_axios");
    if (typeof token === "string" && token != "") {
      config.headers.Authorization = `Bearer ${token}`;
    }

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
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const statusCode = error.response.status;

    const unauthorizedStatusCode = 401;

    if (statusCode === unauthorizedStatusCode) {
      localStorage.removeItem("user");
      localStorage.removeItem("idToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
