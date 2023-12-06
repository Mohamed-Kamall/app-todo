import React, { useEffect } from "react";

import { Button, Form, Input, message } from "antd";

import "./Login.scss";
import AuthService from "./auth-service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("register");
  const navigate = useNavigate();

  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
      style: {
        fontSize: 18,
      },
    });
  };

  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
      style: {
        fontSize: 18,
      },
    });
  };
  const validateMessages = {
    types: {
      email: "not a valid email!",
    },
  };

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      navigate("/timeline");
    }
  }, []);

  const handleSubmit = (values) => {
    if (!form.getFieldsError().some((err) => err.errors.length > 0)) {
      if (mode == "login") {
        let data = {
          email: values.email,
          password: values.password,
        };
        setLoading(true);
        AuthService.login(data)
          .then((res) => {
            if (res.status === 200) {
              success("you're logged in successfully");
              let user = {
                ...res?.data,
                email: values.email,
              };
              localStorage.setItem("todo-user", JSON.stringify(user));
              navigate("/timeline");
            } else {
              error(res.data.messsage);
              setMode("register");
            }
          })
          .catch((err) => {
            console.log(err);
            error(err.message);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        let data = {
          username: values.Username,
          email: values.email,
          password: values.password,
        };
        AuthService.register(data)
          .then((res) => {
            setMode("login");
            form.setFieldsValue({
              email: res?.data.email,
              password: res?.data.password,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      form
        .getFieldsError()
        .map((err) => err.errors.length > 0 && error(err.errors[0]));
    }
  };

  return (
    <div className="login-wrapper">
      {mode == "login" ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "20px",
            fontWeight: 500,
            gap: 10,
          }}
        >
          Don't have account?{" "}
          <Button
            onClick={() => {
              setMode("register");
            }}
          >
            Register
          </Button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "20px",
            fontWeight: 500,
            gap: 10,
          }}
        >
          have account?{" "}
          <Button
            onClick={() => {
              setMode("login");
            }}
          >
            login
          </Button>
        </div>
      )}
      <div className="login-box">
        <Form
          onFinish={handleSubmit}
          form={form}
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          validateMessages={validateMessages}
        >
          {mode == "register" && (
            <Form.Item
              labelAlign="left"
              label="Username"
              name={"Username"}
              rules={[
                {
                  required: true,
                  message: "please enter Username",
                },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
          )}
          <Form.Item
            labelAlign="left"
            label="Email"
            name={"email"}
            rules={[
              {
                required: true,
                message: "please enter valid email",
              },
              {
                type: "email",
              },
            ]}
          >
            <Input placeholder="email" type="email" />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            label="Password"
            name={"password"}
            rules={[
              {
                required: true,
                message: "please enter password",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              className="login-button"
              loading={loading}
              htmlType="submit"
            >
              {mode == "login" ? "Login" : "register"}
            </Button>
          </Form.Item>
        </Form>
      </div>
      {contextHolder}
    </div>
  );
}
