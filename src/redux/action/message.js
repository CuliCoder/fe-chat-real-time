import _ from "lodash";
import axios from "../../services/configAxios";
import { getCsrfToken } from "../../utils/getCSRF";
export const new_message = "new_message";
export const new_Message = (message) => {
  return {
    type: new_message,
    message,
  };
};
export const load_all_message = "load_all_message";
export const message_loading = "message_loading";
export const load_all_message_success = "load_all_message_success";
const message_Loading = () => {
  return {
    type: message_loading,
  };
};
const load_all_Message_success = (data) => {
  return {
    type: load_all_message_success,
    data,
  };
};
export const load_all_Message = (conversation_id) => {
  return async (dispatch) => {
    dispatch(message_Loading());
    const get_csrf = await getCsrfToken();
    if (get_csrf.status !== 200) {
      return;
    }
    await axios
      .post("/get-all-message-of-conversation", {
        conversation_id,
        _csrf: get_csrf.data.csrfToken,
      })
      .then((res) => {
        dispatch(load_all_Message_success(res.data.data));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
