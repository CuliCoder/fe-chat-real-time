import "./App.scss";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
import checkStatusLogin from "./redux/action/statusLogin";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const dispatch = useDispatch();
  const is_Login = useSelector((state) => state.statusLogin.isLogin);
  useEffect(() => {
    dispatch(checkStatusLogin());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route
            exact
            path="/"  
            element={is_Login ? <Home /> : <Navigate to="/Login" />}
          />
          <Route
            path="/Login"
            element={is_Login ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<h1>404 not found</h1>}></Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
