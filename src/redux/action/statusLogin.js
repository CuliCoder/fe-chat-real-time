import { success } from "toastr";
import axios from "../../services/configAxios";
import { login_failed_action, login_success_action } from "./login";
export const isLogin = "IS_LOGIN";
export const isLogout = "IS_LOGOUT";
export const checkLoginReq = "CHECK_LOGIN_REQ";
const is_Login = (userInfo) => {
  return {
    type: isLogin,
    userInfo,
  };
};
const is_logout = () => {
  return {
    type: isLogout,
  };
};
const check_login_req = () => {
  return {
    type: checkLoginReq,
  };
};
const checkStatusLogin = () => {
  return async (dispatch) => {
    try {
      dispatch(check_login_req());
      const res = await axios.get("/is-login");
      if (res.status === 200) {
        dispatch(is_Login(res.data));
        dispatch(
          login_success_action({ success: "Hello " + res.data.fullname +" !"})
        );
      }
    } catch (err) {
      dispatch(is_logout());
      dispatch(
        login_failed_action({
          error: "log out",
        })
      );
      console.log(err);
    }
  };
};
export default checkStatusLogin;
