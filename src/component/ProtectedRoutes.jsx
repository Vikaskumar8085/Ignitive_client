import React, { useEffect } from "react";
import Header from "./Home/Header";

function ProtectedRoutes({ children }) {
  useEffect(() => {
    if (!localStorage.getItem("webToken")) {
      window.location.href = "/login";
    }
  }, [0]);
  return (
    <>
      <Header />
      <div className="wrapper">{children}</div>
    </>
  );
}

export default ProtectedRoutes;
