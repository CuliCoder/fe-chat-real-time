import axios from "../../services/configAxios";
import { getCsrfToken } from "../../utils/getCSRF";
export const logout_request = "logout_request";
export const logout_success = "logout_success";
const logout_Request = () => {
  return {
    type: logout_request,
  };
};
const logout_Success = () => {
  return {
    type: logout_success,
  };
};
const Logout = () => {
  return async (dispatch) => {
    dispatch(logout_Request());
    const get_csrf = await getCsrfToken();
    if (get_csrf.status !== 200) {
      return;
    }
    await axios
      .post("/logout", { _csrf: get_csrf.data.csrfToken })
      .then((res) => {
        console.log(res.data);
        dispatch(logout_Success());
        window.location.reload()
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
export default Logout;
