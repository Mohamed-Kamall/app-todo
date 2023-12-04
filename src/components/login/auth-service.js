import httpClient from "../../helpers/http-client";

const login = async (data) => {
  const response = await httpClient.post("/api/token/", data);
  return response;
};

const register = async (data) => {
  return await httpClient.post("/api/register/", data);
};

const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("todo-user") || "{}");
  return user && Object.keys(user).length !== 0;
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("todo-user") || "{}");
};

const logout = () => {
  localStorage.removeItem("todo-user");
};

export default {
  login,
  isAuthenticated,
  getCurrentUser,
  register,
  logout,
};
