import axios from "../../services/configAxios";
export const isLogin = "IS_LOGIN";
export const isLogout = "IS_LOGOUT";
const is_Login = () => {
  return {
    type: "IS_LOGIN",
  };
};
const is_logout = () => {
  return {
    type: "IS_LOGOUT",
  };
};

const checkStatusLogin = () => {
  return async (dispatch) => {
    try {
      const is_login = await axios.get("/is-login");
      if (is_login.status === 200) {
        dispatch(is_Login());
      }
    } catch (err) {
      // dispatch(is_logout());
      console.log(err.response);
    }
  };
};
export default checkStatusLogin;
