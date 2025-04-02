import React, { useState } from "react";
import { Form, Input, Radio, message, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/LoginStyles.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(false);

  const onFinishHandler = async (values) => {
    try {
      const loginData = { ...values, role };
      setLoading(true);
      await axios.post("http://localhost:5006/user/login", loginData);
      message.success("Login Successful");

      setTimeout(() => {
        setLoading(false);
        if (role === "user") {
          navigate("/homepage");
        } else if (role === "admin") {
          navigate("/adminhomepage");
        } else if (role === "doctor") {
          navigate("/doctorpage");
        }
      }, 1500); 
    } catch (error) {
      setLoading(false);
      message.error("User credentials are wrong");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="background-image"></div>
        <div className="form-container">
          {loading ? ( 
            <div className="spin-container">
              <Spin size="large" />
            </div>
          ) : (
            <Form layout="" onFinish={onFinishHandler} className="register-form">
              <h1 className="text-center">Login Form</h1>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input
                  type="email"
                  onChange={(value) => {
                    setEmail(value.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter your password" }]}
              >
                <Input
                  type="password"
                  onChange={(value) => {
                    setPassword(value.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item label="Role" name="role">
                <Radio.Group
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                  required
                >
                  <Radio value="user">User</Radio>
                  <Radio value="admin">Admin</Radio>
                  <Radio value="doctor">Doctor</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item>
                <Link to="/register" className="m-2">
                  Not a user? Register here
                </Link>
              </Form.Item>

              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </Form>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
