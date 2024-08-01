import { toast } from "react-toastify";
import axios from "../../services/configAxios";
import { checkRegisterInput } from "../../utils/validate";
export const register_success = "register_success";
export const register_failed = "register_failed";
export const register_request = "register_request";
const register_request_action = () => {
  return {
    type: register_request,
    loading: true,
  };
};

const register_success_action = (error) => {
  return {
    type: register_success,
    loading: false,
    error
  };
};
const register_failed_action = (error) => {
  return {
    type: register_failed,
    loading: false,
    error,
  };
};
const register = (infor) => {
  return async (dispatch) => {
    dispatch(register_request_action());
    const error = checkRegisterInput(infor);
    if (Object.keys(error).length > 0) {
      dispatch(register_failed_action(error));
    } else {
      await axios
        .post("/create-user", {
          firstname: infor.firstname,
          surname: infor.surname,
          email: infor.email,
          tel: infor.tel,
          password: infor.password,
          gender: infor.gender,
          DOB: infor.DOB,
        })
        .then((res) => {
          dispatch(register_success_action(res.data.message));
        })
        .catch((err) => {
          console.log(err.response);
          dispatch(register_failed_action(err.response.data.message));
        });
    }
  };
};
export default register;
