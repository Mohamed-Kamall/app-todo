import axios from "axios";
import authService from "../components/login/auth-service";

const HttpClient = () => {
  let instance = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
  });
  instance.interceptors.request.use((config) => {
    config.headers.authorization = authService.isAuthenticated()
      ? `Bearer ${authService.getCurrentUser()?.access}`
      : "";
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        window.location.href = "/";
        authService.logout();
      } else if (error?.response?.status === 403) {
        window.history.go(-1);
      }
      return error;
    }
  );

  return instance;
};

export default HttpClient();
