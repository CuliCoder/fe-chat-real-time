import axios from "../../services/configAxios";
export const isLogin = "IS_LOGIN";
export const isLogout = "IS_LOGOUT";
export const checkLoginReq = "CHECK_LOGIN_REQ";
const is_Login = () => {
  return {
    type: isLogin,
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
      const is_login = await axios.get("/is-login");
      if (is_login.status === 200) {
        dispatch(is_Login());
      }
    } catch (err) {
      dispatch(is_logout());
      console.log(err.response);
    }
  };
};
export default checkStatusLogin;
