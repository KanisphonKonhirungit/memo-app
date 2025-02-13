import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigator = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = await login(credentials);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", credentials.username);
      message.success("Login successful");
      navigator("/");
    } catch (error) {
      message.error("Login failed");
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: "#181a19", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ backgroundColor: "none", padding: "30px", borderRadius: "8px", width: "300px" }}>
        <h2 style={{ color: "white", textAlign: "start", marginBottom: "5px"}}>เข้าสู่ระบบ</h2>
        <Form onFinish={handleSubmit} labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}>
        <Form.Item
            layout="vertical"
            label="บัญชีพนักงาน"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              color: "white",
            }}
          >

            <Input
              name="username"
              value={credentials.username}
              onChange={handleChange}
              style={{ backgroundColor: "#383a37", color: "white", border: "none", height: "42px", borderRadius: "12px" }}
            />
          </Form.Item>
          <Form.Item
            layout="vertical"
            label="รหัสผ่าน"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              color: "white",
            }}
          >
            <Input.Password
              name="password"
              value={credentials.password}
              onChange={handleChange}
              style={{ backgroundColor: "#383a37", color: "white", border: "none", height: "42px", borderRadius: "12px"}}
            />
          </Form.Item>
          <br />
          <Form.Item
          layout="vertical"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            color: "white",
          }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{ backgroundColor: "white", color: "#181a19", height: "42px", marginTop: "20px" }}
            >
              ค้นหา
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
