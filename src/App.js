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
import { checkEmail } from "./utils/validate";
import { loading_request, finish_request } from "./redux/action/loading";
function App() {
  const dispatch = useDispatch();
  const is_Login = useSelector((state) => state.statusLogin.isLogin);
  const [loading, setLoading] = useState([
    useSelector((state) => state.statusLogin.loading),
    useSelector((state) => state.login.loading),
    useSelector((state) => state.register.loading),
    useSelector((state) => state.find_user.loading),
    useSelector((state) => state.get_list_conversation.loading),
    useSelector((state) => state.create_conversation.loading),
  ]);
  const is_loading = useSelector((state) => state.loading.loading);
  console.log(loading);
  useEffect(() => {
    loading.forEach((item) => {
      if (item === true) {
        dispatch(loading_request());
        return;
      }
      dispatch(finish_request());
    });
  }, [loading]);
  useEffect(() => {
    dispatch(checkStatusLogin());
  }, []);
  return (
    <BrowserRouter>
      {is_loading &&
        setTimeout(() => console.log("check"), 2000) && <Spinner /> &&
        console.log("loading")}
      <Routes>
        <Route>
          {/* <Route path="/test" element={<Spinner />}></Route> */}
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
