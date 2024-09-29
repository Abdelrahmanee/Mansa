import axios from "axios";


const baseUrl: string = "https://mansa2-7vcs6i13.b4a.run/api/v1";

const api = axios.create({
  baseURL: `${baseUrl}`,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers["token"] = `${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
