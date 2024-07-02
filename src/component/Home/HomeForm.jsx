import { Button, Form, Input } from "antd";
import React, { useRef, useState } from "react";

function HomeForm({ handleSubmit, form }) {
  const [isFile, setIsfile] = useState(null);
  const formref = useRef(null);

  const OnSubmit = async (values) => {
    const value = {
      values,
      isFile,
    };
    const formData = new FormData();
    formData.append("user", value?.values?.user);
    formData.append("title", value?.values?.title);
    formData.append("Pdffiles", value?.isFile);
    handleSubmit(formData);
    formref.current.value = "";
  };
  return (
    <>
      <Form
        layout="vertical"
        style={{ maxWidth: "500px" }}
        form={form}
        onFinish={OnSubmit}
      >
        <Form.Item
          label="User"
          name={"user"}
          rules={[
            {
              required: true,
              message: "Please input your User Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Title"
          name={"title"}
          rules={[
            {
              required: true,
              message: "Please input your Title",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Attacement">
          <input
            type="file"
            ref={formref}
            onChange={(e) => {
              setIsfile(e.target.files[0]);
            }}
            required
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default HomeForm;
