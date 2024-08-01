import "./Login.scss";
import "../Signup/Signup";
import Signup from "../Signup/Signup";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useState, memo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import login from "../../redux/action/login";
import checkStatusLogin from "../../redux/action/statusLogin";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [infor, setInfor] = useState({
    account: "",
    password: "",
  });
  const error = useSelector((state) => state.login.error);
  const loading = useSelector((state) => state.login.loading);
  const changInfor = (e) => {
    setInfor({ ...infor, [e.target.name]: e.target.value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(infor));
  };
  useEffect(() => {
    if (error.success) {
      toast.success(error.success);
      dispatch(checkStatusLogin());
    } else {
      toast.error(Object.values(error)[0]);
    }
  }, [error]);
  return (
    <div className="login-container">
      <div className="container vh-100 d-flex align-items-center justify-content-center">
        <div className="row col-12">
          <div className="content-left d-none col-sm-7 d-sm-flex align-items-center justify-content-center">
            <div>
              <div className="brand fw-bold fs-1 text-primary">TrungNC</div>
              <div className="detail fs-3 fw-bold">Welcome to my project</div>
            </div>
          </div>
          <form className="content-right col-12 col-sm-5 d-grid gap-3 bg-white p-3 shadow-lg rounded">
            <div className="brand fw-bold fs-1 text-primary d-sm-none text-center">
              TrungNC
            </div>
            <input
              name="account"
              className={
                !error.account ? "form-control" : "form-control is-invalid"
              }
              placeholder="Email address or phone number"
              value={infor.account}
              onChange={changInfor}
              required
            />
            <input
              name="password"
              type="password"
              className={
                !error.password ? "form-control" : "form-control is-invalid"
              }
              placeholder="Password"
              required
              value={infor.password}
              onChange={changInfor}
            />
            <button
              type="submit"
              className="btn btn-primary fw-bold "
              onClick={handleLogin}
            >
              Login
            </button>
            <div className="text-center">
              <a className="forgotPassword" href="#">
                Forgotten Password?
              </a>
            </div>
            <div className="d-flex align-items-center justify-content-center pt-3 pb-3 border-top">
              <button
                type="button"
                className="btn btn-success fw-bold"
                data-bs-toggle="modal"
                data-bs-target="#SignUpModal"
              >
                Create new account
              </button>
            </div>
          </form>
        </div>
      </div>
      <Signup />
    </div>
  );
};
export default memo(Login);
