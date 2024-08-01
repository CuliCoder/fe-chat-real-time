import _ from "lodash";
import axios from "../../services/configAxios";

// conversation
export const get_list_conversation_request = "get_list_conversation";
export const get_list_conversation_success = "get_list_conversation_success";
const get_list_conversation_Request = () => {
  return {
    type: get_list_conversation_request,
  };
}
const get_list_conversation_Success = (data) => {
  return {
    type: get_list_conversation_success,
    data,
  };
}
export const get_list_conversation = () => {
  return async (dispatch) => {
    dispatch(get_list_conversation_Request());
    await axios
      .get("/get-list-conversation", {
        params: {
        },
      })
      .then((res) => {
        return dispatch(get_list_conversation_Success(res.data.data));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
}
// user
export const find_user_request = "find_user_request";
export const find_user_success = "find_user_success";
export const find_user_close = "find_user_close";
const find_user_Request = () => {
  return {
    type: find_user_request,
  };
};
const find_user_Success = (data) => {
  return {
    type: find_user_success,
    data,
  };
};
export const find_user_Close = () => {
  return {
    type: find_user_close,
  };
};
export const find_user = (text) => {
  return async (dispatch) => {
    text = _.trim(text);
    if(text === "") {
      return dispatch(find_user_Success([]));
    }
    dispatch(find_user_Request());
    await axios
      .get("/find-user", {
        params: {
          text,
        },
      })
      .then((res) => {
        return dispatch(find_user_Success(res.data.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};
