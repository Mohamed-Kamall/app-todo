import httpClient from "../../helpers/http-client";

const postTodo = (body) => {
  return httpClient.post("/todo/", body);
};

const editTodo = (id, body) => {
  return httpClient.put(`/todo/${id}/`, body);
};

const deleteTodo = (id) => {
  return httpClient.delete(`/todo/${id}/`);
};

const getAllTodos = () => {
  return httpClient.get(`/todo`);
};

const getTodoComments = (id) => {
  return httpClient.get(`/comment/?id_todo=${id}`);
};
export default {
  postTodo,
  editTodo,
  deleteTodo,
  getAllTodos,
  getTodoComments,
};
