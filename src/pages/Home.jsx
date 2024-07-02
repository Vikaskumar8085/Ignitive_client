import React, { useEffect, useState } from "react";
import ProtectedRoutes from "../component/ProtectedRoutes";
import { Button, Form, Input, Modal, message } from "antd";
import apiInstance from "../apiservice/apiInstance";
import { setLoader } from "../Redux/Slices/Loaderslice";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../Redux/Slices/CurdSlice";
import { DeleteOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import HomeTable from "../component/Home/HomeTable";
import HomeForm from "../component/Home/HomeForm";

function Home() {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const tableRef = React.useRef(null);
  // redux
  const dispatch = useDispatch();
  const taskItem = useSelector((state) => state.curd.value);
  // redux

  // delData
  const delData = async (value) => {
    try {
      dispatch(setLoader(true));
      return await apiInstance
        .delete(`/curd//del-task/${value}`)
        .then((response) => {
          if (response.status === 200) {
            getallTask();
            message.success(response?.data);
            dispatch(setLoader(false));
          }
        });
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error?.response?.data);
    }
  };

  // delData
  const handleSubmit = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await apiInstance.post("/curd/add-task", values);
      if (response?.status === 201) {
        message?.success(response?.data);
        form.resetFields();
        getallTask();
        setIsOpen(false);
        dispatch(setLoader(false));
      }
      dispatch(setLoader(false));
    } catch (error) {
      message.error(error?.response?.data);
      dispatch(setLoader(false));
      form.resetFields();
    }
  };

  const getallTask = async () => {
    try {
      dispatch(setLoader(true));
      return await apiInstance.get("/curd/get-all-task").then((response) => {
        if (response.status === 200) {
          dispatch(addTask(response?.data));
        }
        dispatch(setLoader(false));
      });
    } catch (error) {
      message.error(error?.response?.data);
      dispatch(setLoader(false));
    }
  };
  useEffect(() => {
    getallTask();
  }, [dispatch]);

  // columns
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Date",
      dataIndex: "duedate",
      key: "duedate",
      render: (index, record) => {
        return (
          <div key={index}>{moment(record?.duedate).format("DD/MM/YYYY")}</div>
        );
      },
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Attacement",
      dataIndex: "attachment",
      key: "attachment",
      render: (index, record) => {
        return (
          <Link to={`http://localhost:8000/uploads/${record?.attachment}`}>
            {record?.attachment}
          </Link>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (index, record) => {
        return (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <div style={{ margin: "0px 4px", textDecoration: "none" }}>
                <DeleteOutlined
                  values={record._id}
                  onClick={() => delData(record._id)}
                />
              </div>
              <div style={{ margin: "0px 4px", textDecoration: "none" }}>
                <Link to={`/View/${record._id}`} style={{ color: "black" }}>
                  <EyeOutlined />
                </Link>
              </div>
              <div style={{ margin: "0px 4px", textDecoration: "none" }}>
                <Link to={`/Edit/${record._id}`} style={{ color: "black" }}>
                  <EditOutlined />
                </Link>
              </div>
            </div>
          </>
        );
      },
    },
  ];

  // columns

  return (
    <ProtectedRoutes>
      <Button
        style={{ marginRight: "10px" }}
        htmlType="submit"
        onClick={() => setIsOpen(true)}
        type="primary"
        danger
      >
        Add Task +
      </Button>

      {/* modal */}
      <Modal
        open={isOpen}
        title={"Add"}
        onCancel={() => {
          setIsOpen(false);
        }}
        footer={false}
      >
        <HomeForm handleSubmit={handleSubmit} form={form} />
      </Modal>

      {/* modal */}
      <HomeTable taskItem={taskItem} columns={columns} tableRef={tableRef} />
    </ProtectedRoutes>
  );
}

export default Home;
