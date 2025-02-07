import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("token added to request : ", config.headers.Authorization);
    } else {
      console.warn("⚠️ Aucun token trouvé dans localStorage");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
