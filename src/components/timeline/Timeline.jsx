import React, { useEffect, useState } from "react";
import "./timeline.scss";
import todoService from "../home/todo-service";
import moment from "moment/moment";
import { UserOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    todoService.getAllTodos().then((res) => {
      if (res.status === 200) {
        setPosts(res?.data);
      }
    });
  }, []);

  const handleShowComments = (id) => {
    todoService.getTodoComments(id).then((res) => {
      if (res.status === 200) {
        setComments(res?.data);
      }
    });
  };

  return (
    <div className="container">
      <div className="list-container ">
        {posts?.map((post) => {
          return (
            <div className="todo-element">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "90%",
                  height: 80,
                }}
              >
                <div>
                  <UserOutlined />
                  <span className="username">{post?.user?.username}</span>
                </div>
                <span className="title">{post?.title}</span>
                <span>{moment(post?.date).format("MM/DD  hh:mm")}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "90%",
                  height: 50,
                }}
              >
                <span className="details">{post?.details}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "90%",
                  gap: 20,
                  height: 50,
                }}
              >
                <Input
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  className="input-field"
                  placeholder="add comment"
                />
                <Button
                  onClick={() => {
                    // handleSubmitEdit(todo);
                  }}
                >
                  Add
                </Button>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "90%",
                  height: 50,
                }}
              >
                {current == post.id ? (
                  <Button
                    className="comments-show-button"
                    onClick={() => {
                      setCurrent("");
                    }}
                  >
                    Hide Comments
                  </Button>
                ) : (
                  <Button
                    className="comments-show-button"
                    onClick={() => {
                      handleShowComments(post.id);
                      setCurrent(post.id);
                    }}
                  >
                    Show Comments
                  </Button>
                )}
              </div>
              {current == post.id && (
                <div className="list-container ">
                  {comments.map((comment) => {
                    return (
                      <div className="todo-element comment">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "90%",
                          }}
                        >
                          <div>
                            <UserOutlined />
                            <span className="username">
                              {comment?.user?.username}
                            </span>
                          </div>
                          <span className="title">{comment.description}</span>
                          <span>
                            {moment(post?.date).format("MM/DD  hh:mm")}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
