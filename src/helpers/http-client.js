import axios from "axios";
import authService from "../components/login/auth-service";

const HttpClient = () => {
  let instance = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
  });
  instance.interceptors.request.use((config) => {
    config.headers.authorization = authService.isAuthenticated()
      ? `Bearer ${authService.getCurrentUser()?.access_token}`
      : "";
    return config;
  });

  return instance;
};

export default HttpClient();
