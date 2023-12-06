import React, { useEffect, useState } from "react";
import "./timeline.scss";
import todoService from "../home/todo-service";
import moment from "moment/moment";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import AuthService from "../login/auth-service";
import { useNavigate } from "react-router-dom";

const Timeline = () => {
  const [todo, setTodo] = useState({ title: "", details: "" });

  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [current, setCurrent] = useState(null);
  const [currentEdit, setCurrentEdit] = useState("");
  const [showEditComment, setShowEditComment] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);
  const [editComment, setEditComment] = useState("");
  const [editText, setEditText] = useState({ title: "", details: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    todoService.getAllTodos().then((res) => {
      if (res.status === 200) {
        setPosts(res?.data);
      }
    });
  }, []);

  const handleDeleteTodo = (toto) => {
    todoService.deleteTodo(toto.id).then((res) => {
      if (res.status === 204) {
        setPosts((prev) =>
          prev.filter((pre) => {
            return toto?.id !== pre?.id;
          })
        );
      }
    });
  };

  const handleTodoUpdate = () => {
    let data = { ...editText };
    if (currentEdit) {
      todoService.editTodo(currentEdit, data).then((res) => {
        if (res.status === 200) {
          setPosts((prev) => [
            res?.data,
            ...prev.filter((post) => post.id !== current),
          ]);
          setShowEditPost(false);
        }
      });
    }
  };

  const handleAddTodo = () => {
    if (todo?.title && todo?.details) {
      todoService
        .postTodo({ ...todo })
        .then((res) => {
          if (res.status === 201) {
            setPosts((prev) => [...prev, { ...res?.data }]);
            setTodo({});
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleShowComments = (id) => {
    todoService.getTodoComments(id).then((res) => {
      if (res.status === 200) {
        setComments(res?.data);
      }
    });
  };

  const handlePostComment = (id) => {
    let data = {
      description: comment,
    };
    todoService.postComment(id, data).then((res) => {
      if (res?.status === 201) {
        setComments((prev) => [res?.data, ...prev]);
      }
    });
  };
  const handleDelete = (commentID) => {
    todoService.deleteComment(current, commentID).then((res) => {
      if (res?.status === 204) {
        setComments((prev) => [...prev.filter((com) => com.id !== commentID)]);
      }
    });
  };
  const handleEditComment = (commentID) => {
    let data = {
      description: editComment,
    };
    todoService.updateComment(current, commentID, data).then((res) => {
      if (res?.status === 200) {
        setComments((prev) => [
          res?.data,
          ...prev.filter((com) => com.id !== commentID),
        ]);
        setShowEditComment(false);
      }
    });
  };

  return (
    <div className="container">
      <div className="add-todo-box">
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
      </div>

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
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <UserOutlined />
                  <span className="username">{post?.user?.username}</span>
                </div>
                {currentEdit == post.id && showEditPost ? (
                  <></>
                ) : (
                  <span className="title">{post?.title}</span>
                )}
                <span>{moment(post?.date).format("MM/DD  hh:mm")}</span>
                {post?.user?.email == AuthService.getCurrentUser().email && (
                  <div style={{ display: "flex", gap: 10 }}>
                    <Button
                      className="delete-button"
                      onClick={() => {
                        handleDeleteTodo(post);
                      }}
                    >
                      <DeleteOutlined />
                    </Button>
                    <Button
                      className="edit-button"
                      onClick={() => {
                        setShowEditPost(!showEditPost);
                        setCurrentEdit(post.id);
                        setEditText({
                          title: post.title,
                          details: post.details,
                        });
                      }}
                    >
                      <EditOutlined />
                    </Button>
                  </div>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "90%",
                  minHeight: 50,
                  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                  padding: 10,
                }}
              >
                {currentEdit == post.id && showEditPost ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      gap: 10,
                    }}
                  >
                    <Input
                      value={editText?.title}
                      onChange={(e) => {
                        setEditText({
                          title: e.target.value,
                          details: editText?.details,
                        });
                      }}
                      className="input-field"
                      placeholder="title"
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
                      placeholder="details"
                    />
                    <Button
                      className="add-button"
                      onClick={() => {
                        handleTodoUpdate();
                      }}
                    >
                      save
                    </Button>
                  </div>
                ) : (
                  <span className="details">{post?.details}</span>
                )}
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
                <>
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
                        handlePostComment(post.id);
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="list-container ">
                    {comments.map((comment) => {
                      return (
                        <>
                          <div className="todo-element comment">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "90%",
                                flexWrap: "wrap",
                                gap: 50,
                              }}
                            >
                              <div>
                                <UserOutlined />
                                <span className="username">
                                  {comment?.user?.username}
                                </span>
                              </div>
                              {showEditComment &&
                              comment?.user?.email ==
                                AuthService.getCurrentUser().email ? (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "100%",
                                    gap: 10,
                                  }}
                                >
                                  <Input
                                    value={editComment}
                                    onChange={(e) => {
                                      setEditComment(e.target.value);
                                    }}
                                    placeholder="edit comment"
                                  />
                                  <Button
                                    className="add-button"
                                    onClick={() => {
                                      handleEditComment(comment?.id);
                                    }}
                                  >
                                    save
                                  </Button>
                                  <Button
                                    className="delete-button"
                                    onClick={() => {
                                      setShowEditComment(false);
                                    }}
                                  >
                                    cancel
                                  </Button>
                                </div>
                              ) : (
                                <span className="title">
                                  {comment.description}
                                </span>
                              )}
                              <span>
                                {moment(post?.date).format("MM/DD  hh:mm")}
                              </span>
                              {comment?.user?.email ==
                                AuthService.getCurrentUser().email && (
                                <div style={{ display: "flex", gap: 10 }}>
                                  <Button
                                    className="delete-button"
                                    onClick={() => {
                                      handleDelete(comment?.id);
                                    }}
                                  >
                                    <DeleteOutlined />
                                  </Button>
                                  <Button
                                    className="edit-button"
                                    onClick={() => {
                                      setShowEditComment(true);
                                      setEditComment(comment?.description);
                                    }}
                                  >
                                    <EditOutlined />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
