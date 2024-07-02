import React, { useEffect, useState } from "react";
import { usePDF } from "react-to-pdf";
import { Link, Navigate, useParams } from "react-router-dom";
import ProtectedRoutes from "../component/ProtectedRoutes";
import { useDispatch } from "react-redux";
import { setLoader } from "../Redux/Slices/Loaderslice";
import { Button, message } from "antd";
import apiInstance from "../apiservice/apiInstance";
import moment from "moment";

function View() {
  const [isSingleData, SetSingleData] = useState();
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const dispatch = useDispatch();
  const { id } = useParams();

  const GetsingleTask = async () => {
    try {
      dispatch(setLoader(true));

      const response = await apiInstance.get(`/curd/get-single-task/${id}`);
      if (response.status == 200) {
        SetSingleData(response?.data);
        dispatch(setLoader(false));
      }
    } catch (error) {
      message.error(error?.response?.data);
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    GetsingleTask();
  }, [0]);
  return (
    <>
      <ProtectedRoutes>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            danger
            type="primary"
            onClick={() => (window.location.href = "/")}
          >
     
            {"<--back"}
          </Button>
          <Button onClick={() => toPDF()} type="primary">
            Export to Pdf
          </Button>
        </div>
        <div className="viewWrapper">
          <div className="viewBox" ref={targetRef}>
            <div className="col">
              <h1>User</h1>
              <p>{isSingleData?.user}</p>
            </div>
            <div className="col">
              <h1>Title</h1>
              <p>{isSingleData?.title}</p>
            </div>
            <div className="col">
              <h1>Date</h1>
              <p>{moment(isSingleData?.duedate).format("DD/MM/YYYY")}</p>
            </div>
            <div className="col">
              <h1>Attachment</h1>
              <Link
                to={`http://localhost:8000/uploads/${isSingleData?.attachment}`}
              >
                {isSingleData?.attachment}
              </Link>
            </div>
          </div>
        </div>
      </ProtectedRoutes>
    </>
  );
}

export default View;
