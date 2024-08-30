import axios from "../../services/configAxios";
import _ from "lodash";
import { getCsrfToken } from "../../utils/getCSRF";
export const get_list_conversation_at_home = "get_list_conversation_at_home";
export const conversation_loading = "conversation_loading";
export const update_list_conversation_at_home =
  "update_list_conversation_at_home";
export const get_list_conversation_found_success =
  "get_list_conversation_found_success";
export const create_conversation_success = "create_conversation_success";
export const get_list_Conversation_at_home_loading =
  "get_list_Conversation_at_home_loading";
const get_list_Conversation_at_home_loading_action = () => {
  return {
    type: get_list_Conversation_at_home_loading,
  };
};
export const update_list_Conversation_at_home = (data) => {
  return {
    type: update_list_conversation_at_home,
    data,
  };
};
export const get_list_Conversation_at_home = () => {
  return async (dispatch) => {
    dispatch(get_list_Conversation_at_home_loading_action());
    await axios
      .get("/get-list-conversations-at-home")
      .then((res) => {
        dispatch(update_list_Conversation_at_home(res.data.data));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
export const get_list_Conversation_found_loading ="get_list_Conversation_found_loading"
const get_list_Conversation_found_loading_action = () => {
  return {
    type: get_list_Conversation_found_loading,
  };
}
const get_list_Conversation_found_success = (data) => {
  return {
    type: get_list_conversation_found_success,
    data,
  };
};
export const get_list_Conversation_found = (text) => {
  return async (dispatch) => {
    text = _.trim(text);
    if (text === "") {
      return dispatch(get_list_Conversation_found_success([]));
    }
    dispatch(get_list_Conversation_found_loading_action());
    await axios
      .get("/find-user", {
        params: {
          text,
        },
      })
      .then((res) => {
        return dispatch(get_list_Conversation_found_success(res.data.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};
export const close_conversation_found = "close_conversation_found";
export const close_conversation_found_action = () => {
  return {
    type: close_conversation_found,
  };
};
export const create_conversation_loading = "create_conversation_loading";
const create_conversation_loading_action = () => {
  return {
    type: create_conversation_loading,
  };
}
const create_conversation_Success = (data) => {
  return {
    type: create_conversation_success,
    data,
  };
};
export const create_conversation = (user_two) => {
  return async (dispatch) => {
    dispatch(create_conversation_loading_action());
    const id = user_two.user_id;
    const fullname = user_two.fullname;
    const gender = user_two.gender;
    const avatar = user_two.avatar;
    const get_csrf = await getCsrfToken();
    if (get_csrf.status !== 200) {
      return;
    }
    await axios
      .post("/create-conversation", {
        user_two: id,
        _csrf: get_csrf.data.csrfToken,
      })
      .then((res) => {
        const conversation_id = res.data.data;
        dispatch(
          create_conversation_Success({
            conversation_id,
            id,
            fullname,
            gender,
            avatar,
          })
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
export const leave_conversation = "leave_conversation";
export const leave_conversation_action = () => {
  return {
    type: leave_conversation,
  };
};
