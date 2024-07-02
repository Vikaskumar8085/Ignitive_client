import React from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
function LoginForm({ handleSubmit, form }) {
  return (
    <>
      <div className="login_container">
        <div className="login_row">
          <div className="login_title">
            <h1>Login</h1>
          </div>
          <div className="logIn_form">
            <Form
              layout="vertical"
              style={{ maxWidth: "500px" }}
              onFinish={handleSubmit}
              form={form}
            >
              <Form.Item
                label="Email"
                name={"email"}
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name={"password"}
                rules={[
                  {
                    required: true,
                    message: "Please input your Psassword!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">Submit</Button>
              </Form.Item>
            </Form>
          </div>

          <div className="login_link">
            <p>
              Don't have Account ?<Link to="/Register">Register </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
