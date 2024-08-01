import axios from "../../services/configAxios";
import { checkLoginInput } from "../../utils/validate";
export const login_success = "login_success";
export const login_failed = "login_failed";
export const login_request = "login_request";
const login_request_action = () => {
  return {
    type: login_request,
    loading: true,
  };
};
const login_success_action = (error) => {
  return {
    type: login_success,
    loading: false,
    error,
  };
};
const login_failed_action = (error) => {
  return {
    type: login_failed,
    loading: false,
    error,
  };
};
const login = (infor) => {
  return async (dispatch) => {
    dispatch(login_request_action());
    let error = checkLoginInput(infor);
    if (Object.keys(error).length > 0) {
      dispatch(login_failed_action(error));
    } else {
      await axios
        .post("/login", {
          account: infor.account,
          password: infor.password,
        })
        .then((res) => {
          dispatch(login_success_action(res.data.message));
        })
        .catch((err) => {
          dispatch(login_failed_action(err.response.data.message));
        });
    }
  };
};

export default login;
