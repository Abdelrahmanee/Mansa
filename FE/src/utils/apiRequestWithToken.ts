import axios from "axios";

const baseUrl: string = "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL: `${baseUrl}`,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Fetch token from localStorage  
    if (token) {
      config.headers["token"] = `${JSON.parse(token)}`; // Attach token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
