import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ProtectedRoutes from "../component/ProtectedRoutes";
import { setLoader } from "../Redux/Slices/Loaderslice";
import { useDispatch } from "react-redux";
import { Button, message } from "antd";
import apiInstance from "../apiservice/apiInstance";
import EditForm from "../component/Edit/EditForm";

function Edit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [user, setuser] = useState("");
  const [title, setTitle] = useState("");
  const [isFile, setIsfile] = useState(null);

  const GetsingleTask = async () => {
    try {
      dispatch(setLoader(true));
      const response = await apiInstance.get(`/curd/get-single-task/${id}`);
      if (response.status == 200) {
        setuser(response?.data?.user);
        setTitle(response?.data?.title);
        setIsfile(response?.data?.attachment);
        dispatch(setLoader(false));
      }
    } catch (error) {
      message.error(error?.response?.data);
      dispatch(setLoader(false));
    }
  };

  const handleSubmit = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await apiInstance.put(`/curd/update-task/${id}`, values);
      if (response.status == 200) {
        message.success("update data successfully");
        window.location.href = "/";
      }
      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    GetsingleTask();
  }, [0]);
  return (
    <>
      <ProtectedRoutes>
        <Button
          danger
          type="primary"
          onClick={() => (window.location.href = "/")}
        >
          {"<--back"}
        </Button>
        <div className="Edit_wrapper">
          <div className="Form_Wrapper">
            {/* Form Title */}
            <div className="Form_title">
              <h1>Update Task</h1>
            </div>
            {/* Form Title*/}

            <EditForm
              handleSubmit={handleSubmit}
              setuser={setuser}
              user={user}
              setIsfile={setIsfile}
              isFile={isFile}
              setTitle={setTitle}
              title={title}
            />
          </div>
        </div>
      </ProtectedRoutes>
    </>
  );
}

export default Edit;
