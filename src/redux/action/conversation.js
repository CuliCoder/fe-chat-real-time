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

const conversation_Loading = () => {
  return {
    type: conversation_loading,
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
    dispatch(conversation_Loading());
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
    dispatch(conversation_Loading());
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

const create_conversation_Success = (data) => {
  return {
    type: create_conversation_success,
    data,
  };
};
export const create_conversation = (user_two) => {
  return async (dispatch) => {
    dispatch(conversation_Loading());
    const get_user = await axios.get("/get-user-by-id", {
      params: { id: user_two },
    });
    if (get_user.status !== 200) {
      return;
    }
    const fullname = get_user.data.data.fullname;
    const get_csrf = await getCsrfToken();
    if (get_csrf.status !== 200) {
      return;
    }
    // console.log(get_csrf);
    await axios
      .post("/create-conversation", {
        user_two,
        _csrf: get_csrf.data.csrfToken,
      })
      .then((res) => {
        const conversation_id = res.data.data.id;
        dispatch(
          create_conversation_Success({ conversation_id, user_two, fullname })
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
