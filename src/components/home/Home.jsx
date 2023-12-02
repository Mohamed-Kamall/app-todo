import React, { useState } from "react";
import "./home.scss";
import { Button, Input } from "antd";

const Home = () => {
  const [todo, setTodo] = useState("");
  return (
    <div className="home-container">
      <div className="add-todo-box">
        <span className="head">Todo App</span>
        <div className="add-todo">
          <Input
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            className="input-fileld"
          />
          <Button>
            <span className="label">Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
