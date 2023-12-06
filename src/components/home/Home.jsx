import React, { useEffect, useState } from "react";
import "./home.scss";
import { Button, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import todoService from "./todo-service";
import { useNavigate } from "react-router-dom";
import authService from "../login/auth-service";

const Home = () => {
  const [todo, setTodo] = useState({ title: "", details: "" });
  const [todos, setTodos] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editText, setEditText] = useState({ title: "", details: "" });
  const [current, setCurrent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/");
    }
  }, []);

  const handleAddTodo = () => {
    if (todo?.title && todo?.details) {
      todoService
        .postTodo({ ...todo })
        .then((res) => {
          if (res.status === 201) {
            setTodos((prev) => [{ ...res?.data }, ...prev]);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDelete = (toto) => {
    setTodos((prev) =>
      prev.filter((pre) => {
        return toto?.id !== pre?.id;
      })
    );
  };

  const handleShowEdit = (toto) => {
    setCurrent(toto.id);
    setEditText({ title: toto?.title, details: toto?.details });
    setShowEdit(true);
    setTodo("");
  };

  const handleSubmitEdit = () => {};

  return (
    <div className="home-container">
      <div className="add-todo-box">
        <span className="head">Add Todo</span>
        <div className="add-todo">
          <Input
            value={todo?.title}
            onChange={(e) => {
              setTodo({ title: e.target.value, details: todo.details });
            }}
            className="input-fileld"
            placeholder="Title"
          />
          <Input
            value={todo.details}
            onChange={(e) => {
              setTodo({ details: e.target.value, title: todo.title });
            }}
            className="input-fileld"
            placeholder="Details"
          />
          <Button className="add-button" onClick={handleAddTodo}>
            <span className="label">Add</span>
          </Button>
        </div>
        <div className="list-container">
          {todos.map((todo) => {
            return (
              <div className="todo-element">
                {showEdit && current == todo?.id ? (
                  <>
                    <Input
                      value={editText?.title}
                      onChange={(e) => {
                        setEditText({
                          title: e.target.value,
                          details: editText?.details,
                        });
                      }}
                      className="input-field"
                    />
                    <Input
                      value={editText?.details}
                      onChange={(e) => {
                        setEditText({
                          details: e.target.value,
                          title: editText?.title,
                        });
                      }}
                      className="input-field"
                    />
                  </>
                ) : (
                  <div className="todo-text">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span className="title">{todo?.title}</span>
                      <span>{todo?.date}</span>
                    </div>
                    <span className="details">{todo?.details}</span>
                  </div>
                )}
                {showEdit && current == todo?.id ? (
                  <Button
                    onClick={() => {
                      handleSubmitEdit(todo);
                    }}
                  >
                    save
                  </Button>
                ) : (
                  <>
                    <Button
                      className="delete-button"
                      onClick={() => {
                        handleDelete(todo);
                      }}
                    >
                      <DeleteOutlined />
                    </Button>
                    <Button
                      className="edit-button"
                      onClick={() => handleShowEdit(todo)}
                    >
                      <EditOutlined />
                    </Button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
