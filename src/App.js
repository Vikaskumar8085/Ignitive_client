import React from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Loader from "./component/Loader";
import Edit from "./pages/Edit";
import View from "./pages/View";

function App() {
  const load = useSelector((state) => state.loader.loading);
  return (
    <>
      {load && <Loader />}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Edit/:id" element={<Edit />} />
        <Route path="/View/:id" element={<View />} />
      </Routes>
    </>
  );
}

export default App;
