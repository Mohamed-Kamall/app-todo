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

const postComment = (id, body) => {
  return httpClient.post(`/comment/?id_todo=${id}`, body);
};

const updateComment = (id, commentID, body) => {
  return httpClient.put(`/comment/${commentID}/?id_todo=${id}/`, body);
};

const deleteComment = (id, commentID) => {
  return httpClient.delete(`/comment/${commentID}/?id_todo=${id}/`);
};

export default {
  postTodo,
  editTodo,
  deleteTodo,
  getAllTodos,
  getTodoComments,
  postComment,
  updateComment,
  deleteComment,
};
