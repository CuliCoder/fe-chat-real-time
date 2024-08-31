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
import { ModeProvider } from "./context/mode";
function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//pl24224074.cpmrevenuegate.com/be/23/b8/be23b8b17f57723bd355b07add3c1ee1.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.statusLogin);

  const get_information_loading = useSelector(
    (state) => state.user.get_information_loading
  );
  const update_information_loading = useSelector(
    (state) => state.user.update_information_loading
  );
  const update_avatar_loading = useSelector(
    (state) => state.user.update_avatar_loading
  );

  const conversation_at_home_loading = useSelector(
    (state) => state.conversation.conversation_at_home_loading
  );
  const conversation_found_loading = useSelector(
    (state) => state.conversation.conversation_found_loading
  );
  const conversation_create_loading = useSelector(
    (state) => state.conversation.conversation_create_loading
  );

  const socket_loading = useSelector((state) => state.Socket.loading);

  const login_loading = useSelector((state) => state.login.loading);
  const register_loading = useSelector((state) => state.register.loading);
  const logout_loading = useSelector((state) => state.logout.loading);

  const message_loading = useSelector((state) => state.message.loading);

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
      <ModeProvider>
        {(get_information_loading ||
          update_information_loading ||
          update_avatar_loading ||
          conversation_at_home_loading ||
          conversation_found_loading ||
          conversation_create_loading ||
          socket_loading ||
          login_loading ||
          register_loading ||
          logout_loading ||
          message_loading) && <Spinner />}
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
      </ModeProvider>
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
