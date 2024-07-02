import React, { useEffect } from "react";
import LoginForm from "../component/Login/LoginForm";
import { Form, message } from "antd";
import { useDispatch } from "react-redux";
import { setLoader } from "../Redux/Slices/Loaderslice";
import { setLogin } from "../Redux/Slices/UserSlice";
import apiInstance from "../apiservice/apiInstance";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await apiInstance.post("/user/login", values);
      if (response.status == 200) {
        message.success("login succesfully");
        dispatch(setLogin(response?.data));
        Navigate("/");
        form.resetFields();
      }
      dispatch(setLoader(false));
    } catch (error) {
      message.error(error?.response?.data);
      dispatch(setLoader(false));
      form.resetFields();
      Navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("webToken")) {
      window.location.href = "/";
    }
  });
  return (
    <div>
      <LoginForm handleSubmit={handleSubmit} form={form} />
    </div>
  );
}

export default Login;
