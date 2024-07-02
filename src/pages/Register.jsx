import React, { useState } from "react";
import RegisterForm from "../component/Register/RegisterForm";
import { Form, message } from "antd";
import { useDispatch } from "react-redux";
import { setLoader } from "../Redux/Slices/Loaderslice";
import { useNavigate } from "react-router-dom";
import apiInstance from "../apiservice/apiInstance";

function Register() {
  const disptach = useDispatch();
  const Navigate = useNavigate();

  const [form] = Form.useForm();
  const handleSubmit = async (values) => {
    try {
      disptach(setLoader(true));
      console.log(values);
      const response = await apiInstance.post("/user/register", values);
      console.log(response?.data);
      if (response.status == 201) {
        message.success("register succesfully");
        disptach(setLoader(false));
        Navigate("/login");
        form.resetFields();
      }
      disptach(setLoader(false));
    } catch (error) {
      message.error(error?.response?.data);
      disptach(setLoader(false));
      form.resetFields();
      Navigate("/register");
    }
  };
  return (
    <>
      <RegisterForm handleSubmit={handleSubmit} form={form} />
    </>
  );
}

export default Register;
