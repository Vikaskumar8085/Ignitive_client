import { message } from "antd";
import React, { useEffect } from "react";
import { AddUser, setLogout } from "../../Redux/Slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../Redux/Slices/Loaderslice";
import { LogoutOutlined } from "@ant-design/icons";
import apiInstance from "../../apiservice/apiInstance";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const userdata = useSelector((state) => state.user.values);

  const getUser = async () => {
    try {
      dispatch(setLoader(true));
      const response = await apiInstance.get("/user/get-user");
      if (response.status === 200) {
        dispatch(AddUser(response?.data));
      }
      dispatch(setLoader(false));
    } catch (error) {
      message.error("error");
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    getUser();
  }, [0]);
  return (
    <>
      <header>
        <div className="head">
          <div className="header_title">
            <img
              src={`http://localhost:8000/uploads/${userdata?.image}`}
              style={{
                width: "40px",
                height: "40px",
                margin: " 0px 10px",
                borderRadius: "44px",
              }}
              alt="no-img"
            />
            <h2>{userdata?.name}</h2>

            <button>
              <LogoutOutlined
                className="icon"
                onClick={() => {
                  dispatch(setLoader(true));
                  Navigate("/login");
                  dispatch(setLogout());
                  setTimeout(() => {
                    dispatch(setLoader(false));
                  }, 1000);
                }}
              />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
