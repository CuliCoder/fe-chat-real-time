import "./App.scss";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import checkStatusLogin from "./redux/action/statusLogin";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./components/Spinner/Spinner";
function App() {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.statusLogin);
  const [isLogin, setIsLogin] = useState(null);
  useEffect(() => {
    dispatch(checkStatusLogin());
  }, []);
  useEffect(() => {
    setIsLogin(loginStatus.isLogin);
  }, [loginStatus.isLogin]);
  if (isLogin === null || loginStatus.loading) {
    return <Spinner />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={loginStatus.isLogin ? <Home /> : <Navigate to="/Login" />}
        />
        <Route
          path="/Login"
          element={loginStatus.isLogin ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<h1>404 not found</h1>}></Route>
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
