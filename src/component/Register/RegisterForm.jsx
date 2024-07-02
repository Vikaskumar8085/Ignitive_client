import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

function RegisterForm({ handleSubmit, form }) {
  const [isfile, setIsfile] = useState();
  console.log(isfile);
  const onSubmit = (values) => {
    const value = {
      values,
      isfile,
    };
    console.log(value);
    const formData = new FormData();
    formData.append("name", value?.values?.name);
    formData.append("email", value?.values?.email);
    formData.append("password", value?.values?.password);
    formData.append("image", value?.isfile);

    for (var i of formData) {
      console.log(i);
    }
    handleSubmit(formData);
  };
  return (
    <>
      <div className="Register_container">
        <div className="Register_row">
          <div className="Register_title">
            <h1>Register</h1>
          </div>
          <div className="Register_form">
            <Form
              layout="vertical"
              style={{ maxWidth: "500px" }}
              onFinish={onSubmit}
              form={form}
            >
              <Form.Item
                label="Name"
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Please input your Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
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
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Upload"
                name={"image"}
                rules={[
                  {
                    required: true,
                    message: "Please input your Image!",
                  },
                ]}
              >
                <input
                  type="file"
                  onChange={(e) => {
                    setIsfile(e.target.files[0]);
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Button htmlType="submit">Submit</Button>
              </Form.Item>
            </Form>
          </div>

          <div className="Register_link">
            <p>
              if you aleardy have Account ? please{" "}
              <Link to="/Login">Login </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
